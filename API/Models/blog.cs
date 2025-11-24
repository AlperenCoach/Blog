using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models {
    public class Blog {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        [BsonElement("title")]
        public string Title { get; set; } = string.Empty;
        
        [BsonElement("content")]
        public string Content { get; set; } = string.Empty;
        
        [BsonElement("author")]
        public string Author { get; set; } = string.Empty;
        
        [BsonElement("authorId")]
        public string? AuthorId { get; set; }
        
        [BsonElement("summary")]
        public string? Summary { get; set; }
        
        [BsonElement("category")]
        public string? Category { get; set; }
        
        [BsonElement("imageUrl")]
        public string? ImageUrl { get; set; }
        
        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }
        
        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; }
    }
}