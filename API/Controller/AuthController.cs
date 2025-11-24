using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using API.Models;
using API.Data;
using API.Utils;
using MongoDB.Driver;
using System.Linq;

namespace API.Controller {
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase {
        private readonly MongoDbContext _context;
        private readonly ILogger<AuthController> _logger;

        public AuthController(MongoDbContext context, ILogger<AuthController> logger) {
            _context = context;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            try {
                var user = await _context.Users.Find(u => u.Email == request.Email).FirstOrDefaultAsync();
                if (user == null) {
                    return Unauthorized("Invalid email or password.");
                }

                if (!PasswordHelper.Verify(request.Password, user.Password)) {
                    return Unauthorized("Invalid email or password.");
                }

                return Ok(BuildAuthResponse(user));
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error logging in user {Email}", request.Email);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest request) {
            if (!ModelState.IsValid) {
                var errors = ModelState
                    .Where(x => x.Value?.Errors.Count > 0)
                    .SelectMany(x => x.Value.Errors.Select(e => e.ErrorMessage))
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

                return Ok(BuildAuthResponse(user));
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error signing up user {Email}", request.Email);
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        private static AuthResponse BuildAuthResponse(User user) {
            return new AuthResponse {
                Token = Convert.ToBase64String(Guid.NewGuid().ToByteArray()),
                User = new {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.FullName,
                    user.PhoneNumber,
                    user.Bio,
                    user.ProfilePicture,
                    user.IsActive,
                    user.CreatedAt,
                    user.UpdatedAt
                }
            };
        }
    }
}


