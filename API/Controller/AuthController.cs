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

        [HttpPost("google")]
        public async Task<IActionResult> GoogleOAuth([FromBody] GoogleOAuthRequest request) {
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
                var sanitizedEmail = InputSanitizer.Sanitize(request.Email);
                var sanitizedFullName = InputSanitizer.Sanitize(request.FullName);
                var sanitizedProfilePicture = !string.IsNullOrWhiteSpace(request.ProfilePicture) 
                    ? InputSanitizer.Sanitize(request.ProfilePicture) 
                    : string.Empty;

                // Check if user already exists
                var existingUser = await _context.Users.Find(u => u.Email == sanitizedEmail).FirstOrDefaultAsync();
                if (existingUser != null) {
                    // User exists, return token for login
                    if (!existingUser.IsActive) {
                        return Unauthorized(new { message = "Account is inactive." });
                    }
                    var token = _jwtService.GenerateToken(existingUser);
                    return Ok(BuildAuthResponse(existingUser, token));
                }

                // Generate username from email if not provided
                var username = !string.IsNullOrWhiteSpace(request.Username) ? request.Username : sanitizedEmail.Split('@')[0];
                
                // Ensure username meets requirements (only letters, numbers, underscores)
                username = System.Text.RegularExpressions.Regex.Replace(username, @"[^a-zA-Z0-9_]", "_");
                
                // Ensure minimum length
                if (username.Length < 3) {
                    username = username + DateTime.UtcNow.Ticks.ToString().Substring(0, Math.Min(5, DateTime.UtcNow.Ticks.ToString().Length));
                }
                
                // Ensure maximum length
                if (username.Length > 50) {
                    username = username.Substring(0, 50);
                }
                
                var sanitizedUsername = InputSanitizer.Sanitize(username);

                // Check if username already exists
                var usernameExists = await _context.Users.Find(u => u.Username == sanitizedUsername).AnyAsync();
                if (usernameExists) {
                    sanitizedUsername = sanitizedUsername + DateTime.UtcNow.Ticks.ToString().Substring(0, 5);
                }

                // Create new user with OAuth (no password needed)
                // Generate a random secure password that will never be used
                var randomPassword = System.Guid.NewGuid().ToString() + DateTime.UtcNow.Ticks.ToString();
                var user = new User {
                    Username = sanitizedUsername,
                    Email = sanitizedEmail,
                    Password = PasswordHelper.Hash(randomPassword), // Store a hashed random password
                    FullName = sanitizedFullName,
                    PhoneNumber = null,
                    ProfilePicture = sanitizedProfilePicture ?? string.Empty,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    IsActive = true,
                    Role = "User"
                };

                await _context.Users.InsertOneAsync(user);

                var newToken = _jwtService.GenerateToken(user);
                return Ok(BuildAuthResponse(user, newToken));
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error processing Google OAuth for user {Email}", request.Email);
                return StatusCode(500, new { message = "Internal server error" });
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


