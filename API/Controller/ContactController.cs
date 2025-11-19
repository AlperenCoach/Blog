using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Data;
using MongoDB.Driver;

namespace API.Controller {
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase {
        private readonly MongoDbContext _context;
        private readonly ILogger<ContactController> _logger;

        public ContactController(MongoDbContext context, ILogger<ContactController> logger) {
            _context = context;
            _logger = logger;
        }

        // POST: api/contact
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ContactMessage message) {
            try {
                if (!ModelState.IsValid) {
                    return BadRequest(ModelState);
                }

                message.CreatedAt = DateTime.UtcNow;
                message.IsRead = false;

                await _context.ContactMessages.InsertOneAsync(message);

                return Ok(new { 
                    message = "Your message has been sent successfully!",
                    id = message.Id 
                });
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error creating contact message");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/contact (Admin only - get all messages)
        [HttpGet]
        public async Task<IActionResult> Get() {
            try {
                var messages = await _context.ContactMessages
                    .Find(_ => true)
                    .SortByDescending(m => m.CreatedAt)
                    .ToListAsync();
                return Ok(messages);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error getting contact messages");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/contact/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id) {
            try {
                var message = await _context.ContactMessages.Find(m => m.Id == id).FirstOrDefaultAsync();
                if (message == null) {
                    return NotFound();
                }
                return Ok(message);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error getting contact message with id {Id}", id);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}

