using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using API.Models;
using API.Data;
using API.Services;
using API.Utils;
using MongoDB.Driver;
using System.Linq;

namespace API.Controller {
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase {
        private readonly MongoDbContext _context;
        private readonly ILogger<AuthController> _logger;
        private readonly JwtService _jwtService;

        public AuthController(MongoDbContext context, ILogger<AuthController> logger, JwtService jwtService) {
            _context = context;
            _logger = logger;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request) {
            if (request == null) {
                return BadRequest(new { message = "Request body cannot be null." });
            }
            if (!ModelState.IsValid) {
                var errors = ModelState
                    .Where(x => x.Value != null && x.Value.Errors.Count > 0)
                    .SelectMany(x => x.Value!.Errors.Select(e => e.ErrorMessage))
                    .ToList();
                return BadRequest(new { message = string.Join(" ", errors) });
            }

            try {
                // Sanitize email input
                var sanitizedEmail = InputSanitizer.Sanitize(request.Email);
                
                var user = await _context.Users.Find(u => u.Email == sanitizedEmail).FirstOrDefaultAsync();
                if (user == null) {
                    return Unauthorized(new { message = "Invalid email or password." });
                }

                if (!PasswordHelper.Verify(request.Password, user.Password)) {
                    return Unauthorized(new { message = "Invalid email or password." });
                }

                if (!user.IsActive) {
                    return Unauthorized(new { message = "Account is inactive." });
                }

                var token = _jwtService.GenerateToken(user);
                return Ok(BuildAuthResponse(user, token));
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error logging in user {Email}", request.Email);
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest request) {
            if (request == null) {
                return BadRequest(new { message = "Request body cannot be null." });
            }
            if (!ModelState.IsValid) {
                var errors = ModelState
                    .Where(x => x.Value != null && x.Value.Errors.Count > 0)
                    .SelectMany(x => x.Value!.Errors.Select(e => e.ErrorMessage))
                    .ToList();
                return BadRequest(new { message = string.Join(" ", errors) });
            }

            try {
                // Sanitize inputs to prevent XSS attacks
                var sanitizedEmail = InputSanitizer.Sanitize(request.Email);
                var sanitizedUsername = InputSanitizer.Sanitize(request.Username);
                var sanitizedFullName = InputSanitizer.Sanitize(request.FullName);
                var sanitizedPhoneNumber = InputSanitizer.Sanitize(request.PhoneNumber);
                var sanitizedProfilePicture = InputSanitizer.Sanitize(request.ProfilePicture);

                // Validate email format (already done by data annotations, but double-check)
                var emailValidator = new System.ComponentModel.DataAnnotations.EmailAddressAttribute();
                if (!emailValidator.IsValid(sanitizedEmail)) {
                    return BadRequest(new { message = "Invalid email format." });
                }

                var emailExists = await _context.Users.Find(u => u.Email == sanitizedEmail).AnyAsync();
                if (emailExists) {
                    return BadRequest(new { message = "Email already exists." });
                }

                var usernameExists = await _context.Users.Find(u => u.Username == sanitizedUsername).AnyAsync();
                if (usernameExists) {
                    return BadRequest(new { message = "Username already exists." });
                }

                var user = new User {
                    Username = sanitizedUsername,
                    Email = sanitizedEmail,
                    Password = PasswordHelper.Hash(request.Password), // Don't sanitize password
                    FullName = sanitizedFullName,
                    PhoneNumber = sanitizedPhoneNumber,
                    ProfilePicture = sanitizedProfilePicture,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    IsActive = true,
                    Role = "User" // Default role for new users
                };

                await _context.Users.InsertOneAsync(user);

                var token = _jwtService.GenerateToken(user);
                return Ok(BuildAuthResponse(user, token));
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error signing up user {Email}", request.Email);
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        private static AuthResponse BuildAuthResponse(User user, string token) {
            return new AuthResponse {
                Token = token,
                User = new UserResponse {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    FullName = user.FullName,
                    PhoneNumber = user.PhoneNumber,
                    Bio = user.Bio,
                    ProfilePicture = user.ProfilePicture,
                    IsActive = user.IsActive,
                    Role = user.Role,
                    CreatedAt = user.CreatedAt,
                    UpdatedAt = user.UpdatedAt
                }
            };
        }
    }
}


