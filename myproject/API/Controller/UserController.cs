using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Data;
using API.Utils;
using MongoDB.Driver;
using System.Linq;

namespace API.Controller {
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase {
        private readonly MongoDbContext _context;
        private readonly ILogger<UserController> _logger;

        public UserController(MongoDbContext context, ILogger<UserController> logger) {
            _context = context;
            _logger = logger;
        }

        // GET: api/user
        [HttpGet]
        public async Task<IActionResult> Get() {
            try {
                var users = await _context.Users.Find(_ => true).ToListAsync();
                // Şifreleri response'dan çıkar
                var usersWithoutPassword = users.Select(u => new UserResponse {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    FullName = u.FullName,
                    PhoneNumber = u.PhoneNumber,
                    Bio = u.Bio,
                    ProfilePicture = u.ProfilePicture,
                    IsActive = u.IsActive,
                    CreatedAt = u.CreatedAt,
                    UpdatedAt = u.UpdatedAt
                });
                return Ok(usersWithoutPassword);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error getting users");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/user/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id) {
            try {
                var user = await _context.Users.Find(u => u.Id == id).FirstOrDefaultAsync();
                if (user == null) {
                    return NotFound();
                }
                // Şifreyi response'dan çıkar
                var userWithoutPassword = new UserResponse {
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
                };
                return Ok(userWithoutPassword);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error getting user with id {Id}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/user/email/{email}
        [HttpGet("email/{email}")]
        public async Task<IActionResult> GetByEmail(string email) {
            try {
                var user = await _context.Users.Find(u => u.Email == email).FirstOrDefaultAsync();
                if (user == null) {
                    return NotFound(new { message = "User not found." });
                }
                // Şifreyi response'dan çıkar
                var userResponse = new UserResponse {
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
                };
                return Ok(userResponse);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error getting user with email {Email}", email);
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // POST: api/user
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user) {
            try {
                if (!ModelState.IsValid) {
                    return BadRequest(ModelState);
                }

                // Email kontrolü
                var existingUser = await _context.Users.Find(u => u.Email == user.Email).FirstOrDefaultAsync();
                if (existingUser != null) {
                    return BadRequest("Email already exists");
                }

                // Username kontrolü
                var existingUsername = await _context.Users.Find(u => u.Username == user.Username).FirstOrDefaultAsync();
                if (existingUsername != null) {
                    return BadRequest("Username already exists");
                }

                user.CreatedAt = DateTime.Now;
                user.UpdatedAt = DateTime.Now;
                user.IsActive = true;
                user.Password = PasswordHelper.Hash(user.Password);

                await _context.Users.InsertOneAsync(user);
                
                // Şifreyi response'dan çıkar
                var userWithoutPassword = new {
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
                };
                
                return CreatedAtAction(nameof(Get), new { id = user.Id }, userWithoutPassword);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error creating user");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/user/{id} - Profile Update (EditProfile)
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] EditProfileRequest request) {
            try {
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

                var existingUser = await _context.Users.Find(u => u.Id == id).FirstOrDefaultAsync();
                if (existingUser == null) {
                    return NotFound(new { message = "User not found." });
                }

                // Email değişiyorsa kontrol et
                if (!string.IsNullOrEmpty(request.Email) && request.Email != existingUser.Email) {
                    var emailExists = await _context.Users.Find(u => u.Email == request.Email && u.Id != id).AnyAsync();
                    if (emailExists) {
                        return BadRequest(new { message = "Email already exists." });
                    }
                }

                // Username değişiyorsa kontrol et
                if (!string.IsNullOrEmpty(request.Username) && request.Username != existingUser.Username) {
                    var usernameExists = await _context.Users.Find(u => u.Username == request.Username && u.Id != id).AnyAsync();
                    if (usernameExists) {
                        return BadRequest(new { message = "Username already exists." });
                    }
                }

                // Update only provided fields (password is not updated through this endpoint)
                existingUser.Username = !string.IsNullOrEmpty(request.Username) ? request.Username : existingUser.Username;
                existingUser.Email = !string.IsNullOrEmpty(request.Email) ? request.Email : existingUser.Email;
                existingUser.FullName = !string.IsNullOrEmpty(request.FullName) ? request.FullName : existingUser.FullName;
                existingUser.PhoneNumber = request.PhoneNumber ?? existingUser.PhoneNumber;
                existingUser.Bio = request.Bio ?? existingUser.Bio;
                existingUser.ProfilePicture = !string.IsNullOrEmpty(request.ProfilePicture) ? request.ProfilePicture : existingUser.ProfilePicture;
                existingUser.UpdatedAt = DateTime.UtcNow;

                await _context.Users.ReplaceOneAsync(u => u.Id == id, existingUser);
                
                // Return updated user without password
                var userResponse = new UserResponse {
                    Id = existingUser.Id,
                    Username = existingUser.Username,
                    Email = existingUser.Email,
                    FullName = existingUser.FullName,
                    PhoneNumber = existingUser.PhoneNumber,
                    Bio = existingUser.Bio,
                    ProfilePicture = existingUser.ProfilePicture,
                    IsActive = existingUser.IsActive,
                    CreatedAt = existingUser.CreatedAt,
                    UpdatedAt = existingUser.UpdatedAt
                };
                
                return Ok(userResponse);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error updating user with id {Id}", id);
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // DELETE: api/user/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id) {
            try {
                var result = await _context.Users.DeleteOneAsync(u => u.Id == id);
                if (result.DeletedCount == 0) {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error deleting user with id {Id}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        // PATCH: api/user/{id}/activate - Kullanıcıyı aktif/pasif yap
        [HttpPatch("{id}/activate")]
        public async Task<IActionResult> ToggleActive(string id) {
            try {
                var user = await _context.Users.Find(u => u.Id == id).FirstOrDefaultAsync();
                if (user == null) {
                    return NotFound();
                }

                user.IsActive = !user.IsActive;
                user.UpdatedAt = DateTime.Now;

                await _context.Users.ReplaceOneAsync(u => u.Id == id, user);
                return Ok(new { id = user.Id, isActive = user.IsActive });
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error toggling active status for user {Id}", id);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}

