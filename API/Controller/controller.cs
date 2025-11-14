using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Data;
using MongoDB.Driver;

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

        // GET: api/blog
        [HttpGet]
        public async Task<IActionResult> Get() {
            try {
                var blogs = await _context.Blogs.Find(_ => true).ToListAsync();
                return Ok(blogs);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error getting blogs");
                return StatusCode(500, "Internal server error");
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

        // POST: api/blog
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Blog blog) {
            try {
                if (!ModelState.IsValid) {
                    return BadRequest(ModelState);
                }

                blog.CreatedAt = DateTime.Now;
                blog.UpdatedAt = DateTime.Now;

                await _context.Blogs.InsertOneAsync(blog);
                return CreatedAtAction(nameof(Get), new { id = blog.Id }, blog);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error creating blog");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/blog/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Blog blog) {
            try {
                if (!ModelState.IsValid) {
                    return BadRequest(ModelState);
                }

                var existingBlog = await _context.Blogs.Find(b => b.Id == id).FirstOrDefaultAsync();
                if (existingBlog == null) {
                    return NotFound();
                }

                blog.Id = id;
                blog.UpdatedAt = DateTime.Now;

                await _context.Blogs.ReplaceOneAsync(b => b.Id == id, blog);
                return NoContent();
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error updating blog with id {Id}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/blog/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id) {
            try {
                var result = await _context.Blogs.DeleteOneAsync(b => b.Id == id);
                if (result.DeletedCount == 0) {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error deleting blog with id {Id}", id);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}