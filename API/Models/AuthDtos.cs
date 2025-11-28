using System.ComponentModel.DataAnnotations;
using API.Utils;

namespace API.Models {
    public class LoginRequest {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; } = string.Empty;
    }

    public class SignupRequest {
        [Required(ErrorMessage = "Username is required.")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters.")]
        [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "Username can only contain letters, numbers, and underscores.")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        [StringLength(255, ErrorMessage = "Email must not exceed 255 characters.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required.")]
        [PasswordPolicy(ErrorMessage = "Password does not meet security requirements.")]
        public string Password { get; set; } = string.Empty;

        [StringLength(100, ErrorMessage = "Full name must not exceed 100 characters.")]
        public string FullName { get; set; } = string.Empty;

        [RegularExpression(@"^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$", 
            ErrorMessage = "Invalid phone number format.")]
        [StringLength(20, ErrorMessage = "Phone number must not exceed 20 characters.")]
        public string PhoneNumber { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "Profile picture URL must not exceed 500 characters.")]
        [Url(ErrorMessage = "Invalid URL format for profile picture.")]
        public string ProfilePicture { get; set; } = string.Empty;
    }

    public class UserResponse {
        public string? Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? Bio { get; set; }
        public string ProfilePicture { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public string Role { get; set; } = "User";
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class GoogleOAuthRequest {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Full name is required.")]
        [StringLength(100, ErrorMessage = "Full name must not exceed 100 characters.")]
        public string FullName { get; set; } = string.Empty;

        [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters.")]
        [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "Username can only contain letters, numbers, and underscores.")]
        public string? Username { get; set; }

        [StringLength(500, ErrorMessage = "Profile picture URL must not exceed 500 characters.")]
        [Url(ErrorMessage = "Invalid URL format for profile picture.")]
        public string? ProfilePicture { get; set; }
    }

    public class AuthResponse {
        public string Token { get; set; } = string.Empty;
        public UserResponse User { get; set; } = default!;
    }
}






