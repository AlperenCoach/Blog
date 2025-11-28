using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models {
    public class User {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        [BsonElement("username")]
        public string Username { get; set; } = string.Empty;
        
        [BsonElement("email")]
        public string Email { get; set; } = string.Empty;
        
        [BsonElement("password")]
        public string Password { get; set; } = string.Empty;
        
        [BsonElement("fullName")]
        public string FullName { get; set; } = string.Empty;
        
        [BsonElement("phoneNumber")]
        public string? PhoneNumber { get; set; }
        
        [BsonElement("bio")]
        public string? Bio { get; set; }
        
        [BsonElement("profilePicture")]
        public string ProfilePicture { get; set; } = string.Empty;
        
        [BsonElement("isActive")]
        public bool IsActive { get; set; } = true;

        [BsonElement("role")]
        public string Role { get; set; } = "User"; // Default role: "User" or "Admin"
        
        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }
        
        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; }
    }
}

