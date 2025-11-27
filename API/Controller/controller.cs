using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using API.Models;
using API.Data;
using MongoDB.Driver;
using System.Linq;
using System.Security.Claims;

namespace API.Controller {
    [ApiController]
    [Route("api/[controller]")]
    public class BlogController : ControllerBase {
        private readonly MongoDbContext _context;
        private readonly ILogger<BlogController> _logger;

        public BlogController(MongoDbContext context, ILogger<BlogController> logger) {
            _context = context;
            _logger = logger;
        }

        // GET: api/blog?pageNumber=1&pageSize=10
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10) {
            try {
                if (pageNumber < 1) pageNumber = 1;
                if (pageSize < 1) pageSize = 10;
                if (pageSize > 100) pageSize = 100; // Max page size

                var totalCount = (int)await _context.Blogs.CountDocumentsAsync(_ => true);
                var blogs = await _context.Blogs
                    .Find(_ => true)
                    .SortByDescending(b => b.CreatedAt)
                    .Skip((pageNumber - 1) * pageSize)
                    .Limit(pageSize)
                    .ToListAsync();

                var pagedResponse = new PagedResponse<Blog>(blogs, pageNumber, pageSize, totalCount);
                return Ok(pagedResponse);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error getting blogs");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // GET: api/blog/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id) {
            try {
                var blog = await _context.Blogs.Find(b => b.Id == id).FirstOrDefaultAsync();
                if (blog == null) {
                    return NotFound();
                }
                return Ok(blog);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error getting blog with id {Id}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/blog - Create Blog (Requires Authentication)
        [HttpPost]
        [Microsoft.AspNetCore.Authorization.Authorize]
        public async Task<IActionResult> Post([FromBody] Blog blog) {
            try {
                if (blog == null) {
                    return BadRequest(new { message = "Request body cannot be null." });
                }

                if (!ModelState.IsValid) {
                    var errors = ModelState
                        .Where(x => x.Value != null && x.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value!.Errors.Select(e => e.ErrorMessage))
                        .ToList();
                    return BadRequest(new { message = string.Join(" ", errors) });
                }

                // Validate required fields
                if (string.IsNullOrWhiteSpace(blog.Title)) {
                    return BadRequest(new { message = "Title is required." });
                }

                if (string.IsNullOrWhiteSpace(blog.Content)) {
                    return BadRequest(new { message = "Content is required." });
                }

                // Get user ID from JWT token claims
                var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim)) {
                    return Unauthorized(new { message = "User not authenticated." });
                }

                // Get user information for author name
                var user = await _context.Users.Find(u => u.Id == userIdClaim).FirstOrDefaultAsync();
                if (user == null) {
                    return Unauthorized(new { message = "User not found." });
                }

                // Set blog properties
                blog.Author = !string.IsNullOrWhiteSpace(blog.Author) ? blog.Author : (user.FullName ?? user.Username);
                blog.AuthorId = userIdClaim;
                blog.CreatedAt = DateTime.UtcNow;
                blog.UpdatedAt = DateTime.UtcNow;

                // Generate summary from content if not provided
                if (string.IsNullOrWhiteSpace(blog.Summary) && !string.IsNullOrWhiteSpace(blog.Content)) {
                    blog.Summary = blog.Content.Length > 200 
                        ? blog.Content.Substring(0, 200) + "..." 
                        : blog.Content;
                }

                await _context.Blogs.InsertOneAsync(blog);
                return CreatedAtAction(nameof(Get), new { id = blog.Id }, blog);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error creating blog");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // PUT: api/blog/{id} - Update Blog (Requires Authentication)
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(string id, [FromBody] Blog blog) {
            try {
                if (blog == null) {
                    return BadRequest(new { message = "Request body cannot be null." });
                }

                if (!ModelState.IsValid) {
                    var errors = ModelState
                        .Where(x => x.Value != null && x.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value!.Errors.Select(e => e.ErrorMessage))
                        .ToList();
                    return BadRequest(new { message = string.Join(" ", errors) });
                }

                var existingBlog = await _context.Blogs.Find(b => b.Id == id).FirstOrDefaultAsync();
                if (existingBlog == null) {
                    return NotFound(new { message = "Blog not found." });
                }

                // Verify ownership: Only the author or admin can edit
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var userRole = User.FindFirst("role")?.Value;

                if (string.IsNullOrEmpty(userIdClaim)) {
                    return Unauthorized(new { message = "User not authenticated." });
                }

                if (existingBlog.AuthorId != userIdClaim && userRole != "Admin") {
                    return Forbid("You can only edit your own blogs.");
                }

                // Update blog properties
                blog.Id = id;
                blog.CreatedAt = existingBlog.CreatedAt; // Preserve original creation date
                blog.AuthorId = existingBlog.AuthorId; // Preserve author ID
                blog.UpdatedAt = DateTime.UtcNow;
                
                // Preserve author if not provided
                if (string.IsNullOrWhiteSpace(blog.Author)) {
                    blog.Author = existingBlog.Author;
                }

                await _context.Blogs.ReplaceOneAsync(b => b.Id == id, blog);
                return Ok(blog);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error updating blog with id {Id}", id);
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // DELETE: api/blog/{id} - Delete Blog (Requires Authentication)
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(string id) {
            try {
                var blog = await _context.Blogs.Find(b => b.Id == id).FirstOrDefaultAsync();
                if (blog == null) {
                    return NotFound(new { message = "Blog not found." });
                }

                // Verify ownership: Only the author or admin can delete
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var userRole = User.FindFirst("role")?.Value;

                if (string.IsNullOrEmpty(userIdClaim)) {
                    return Unauthorized(new { message = "User not authenticated." });
                }

                if (blog.AuthorId != userIdClaim && userRole != "Admin") {
                    return Forbid("You can only delete your own blogs.");
                }

                var result = await _context.Blogs.DeleteOneAsync(b => b.Id == id);
                if (result.DeletedCount == 0) {
                    return NotFound(new { message = "Blog not found." });
                }
                return NoContent();
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error deleting blog with id {Id}", id);
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        
    }
}