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
                var user = await _context.Users.Find(u => u.Email == request.Email).FirstOrDefaultAsync();
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
                // Validate required fields
                if (string.IsNullOrWhiteSpace(request.Username)) {
                    return BadRequest(new { message = "Username is required." });
                }
                if (string.IsNullOrWhiteSpace(request.Email)) {
                    return BadRequest(new { message = "Email is required." });
                }
                if (string.IsNullOrWhiteSpace(request.Password)) {
                    return BadRequest(new { message = "Password is required." });
                }

                var emailExists = await _context.Users.Find(u => u.Email == request.Email).AnyAsync();
                if (emailExists) {
                    return BadRequest(new { message = "Email already exists." });
                }

                var usernameExists = await _context.Users.Find(u => u.Username == request.Username).AnyAsync();
                if (usernameExists) {
                    return BadRequest(new { message = "Username already exists." });
                }

                var user = new User {
                    Username = request.Username,
                    Email = request.Email,
                    Password = PasswordHelper.Hash(request.Password),
                    FullName = request.FullName,
                    PhoneNumber = request.PhoneNumber,
                    ProfilePicture = request.ProfilePicture,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    IsActive = true
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
                    CreatedAt = user.CreatedAt,
                    UpdatedAt = user.UpdatedAt
                }
            };
        }
    }
}


