using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using API.Models;
using API.Data;
using API.Services;
using MongoDB.Driver;

namespace API.Controller {
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase {
        private readonly MongoDbContext _context;
        private readonly ILogger<ContactController> _logger;
        private readonly EmailService _emailService;

        public ContactController(MongoDbContext context, ILogger<ContactController> logger, EmailService emailService) {
            _context = context;
            _logger = logger;
            _emailService = emailService;
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

                // Save to database
                await _context.ContactMessages.InsertOneAsync(message);

                // Send email to info@alpidev.com
                var emailSent = await _emailService.SendContactEmailAsync(
                    message.Name,
                    message.Email,
                    message.Subject,
                    message.Message
                );

                if (!emailSent) {
                    _logger.LogWarning("Contact message saved to database but email sending failed for message {Id}", message.Id);
                }

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
        [Authorize(Policy = "AdminOnly")]
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

        // GET: api/contact/{id} (Admin only)
        [HttpGet("{id}")]
        [Authorize(Policy = "AdminOnly")]
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

        // PATCH: api/contact/{id}/read - Toggle read/unread status (Admin only)
        [HttpPatch("{id}/read")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> ToggleReadStatus(string id) {
            try {
                var message = await _context.ContactMessages.Find(m => m.Id == id).FirstOrDefaultAsync();
                if (message == null) {
                    return NotFound(new { message = "Contact message not found." });
                }

                message.IsRead = !message.IsRead;
                await _context.ContactMessages.ReplaceOneAsync(m => m.Id == id, message);

                return Ok(new { 
                    id = message.Id, 
                    isRead = message.IsRead 
                });
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error toggling read status for contact message {Id}", id);
                return StatusCode(500, new { message = "Internal server error" });
            }
        }
    }
}

