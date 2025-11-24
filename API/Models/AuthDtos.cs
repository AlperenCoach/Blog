namespace API.Models {
    public class LoginRequest {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class SignupRequest {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string ProfilePicture { get; set; } = string.Empty;
    }

    public class AuthResponse {
        public string Token { get; set; } = string.Empty;
        public object User { get; set; } = default!;
    }
}






