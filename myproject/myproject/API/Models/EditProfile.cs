using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models {
    public class EditProfileRequest {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? Bio { get; set; }
        public string ProfilePicture { get; set; } = string.Empty;
    }
}






