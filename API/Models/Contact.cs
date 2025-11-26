using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models {
    public class ContactMessage {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;
        
        [BsonElement("email")]
        public string Email { get; set; } = string.Empty;
        
        [BsonElement("subject")]
        public string Subject { get; set; } = string.Empty;
        
        [BsonElement("message")]
        public string Message { get; set; } = string.Empty;
        
        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }
        
        [BsonElement("isRead")]
        public bool IsRead { get; set; } = false;
    }
}

