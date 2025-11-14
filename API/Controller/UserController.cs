using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Data;
using MongoDB.Driver;

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
                var usersWithoutPassword = users.Select(u => new {
                    u.Id,
                    u.Username,
                    u.Email,
                    u.FullName,
                    u.ProfilePicture,
                    u.IsActive,
                    u.CreatedAt,
                    u.UpdatedAt
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
                var userWithoutPassword = new {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.FullName,
                    user.ProfilePicture,
                    user.IsActive,
                    user.CreatedAt,
                    user.UpdatedAt
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
                    return NotFound();
                }
                // Şifreyi response'dan çıkar
                var userWithoutPassword = new {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.FullName,
                    user.ProfilePicture,
                    user.IsActive,
                    user.CreatedAt,
                    user.UpdatedAt
                };
                return Ok(userWithoutPassword);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error getting user with email {Email}", email);
                return StatusCode(500, "Internal server error");
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

                await _context.Users.InsertOneAsync(user);
                
                // Şifreyi response'dan çıkar
                var userWithoutPassword = new {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.FullName,
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

        // PUT: api/user/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] User user) {
            try {
                if (!ModelState.IsValid) {
                    return BadRequest(ModelState);
                }

                var existingUser = await _context.Users.Find(u => u.Id == id).FirstOrDefaultAsync();
                if (existingUser == null) {
                    return NotFound();
                }

                // Email değişiyorsa kontrol et
                if (user.Email != existingUser.Email) {
                    var emailExists = await _context.Users.Find(u => u.Email == user.Email && u.Id != id).FirstOrDefaultAsync();
                    if (emailExists != null) {
                        return BadRequest("Email already exists");
                    }
                }

                // Username değişiyorsa kontrol et
                if (user.Username != existingUser.Username) {
                    var usernameExists = await _context.Users.Find(u => u.Username == user.Username && u.Id != id).FirstOrDefaultAsync();
                    if (usernameExists != null) {
                        return BadRequest("Username already exists");
                    }
                }

                user.Id = id;
                user.UpdatedAt = DateTime.Now;
                // Şifre değişmediyse eski şifreyi koru
                if (string.IsNullOrEmpty(user.Password)) {
                    user.Password = existingUser.Password;
                }

                await _context.Users.ReplaceOneAsync(u => u.Id == id, user);
                return NoContent();
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error updating user with id {Id}", id);
                return StatusCode(500, "Internal server error");
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

