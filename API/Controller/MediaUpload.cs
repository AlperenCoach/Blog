using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using API.Models;
using API.Data;
using MongoDB.Driver;

namespace API.Controller {
    [ApiController]
    [Route("api/[controller]")]
    public class MediaUploadController : ControllerBase {
        private readonly MongoDbContext _context;
        private readonly ILogger<MediaUploadController> _logger;

        public MediaUploadController(MongoDbContext context, ILogger<MediaUploadController> logger) {
            _context = context;
            _logger = logger;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload([FromForm] IFormFile file) {
            try {
                if (file == null || file.Length == 0) {
                    return BadRequest("No file uploaded.");
                }
                
                // TODO: Implement file upload logic
                return Ok(new { message = "File upload functionality not yet implemented." });
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error uploading file");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}