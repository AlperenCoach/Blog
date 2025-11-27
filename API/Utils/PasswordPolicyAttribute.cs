using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace API.Utils {
    /// <summary>
    /// Validates password strength: minimum 8 characters, at least one uppercase, one lowercase, one digit, and one special character
    /// </summary>
    public class PasswordPolicyAttribute : ValidationAttribute {
        private const int MinLength = 8;
        private const int MaxLength = 128;

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext) {
            if (value == null || value is not string password) {
                return new ValidationResult("Password is required.");
            }

            if (password.Length < MinLength) {
                return new ValidationResult($"Password must be at least {MinLength} characters long.");
            }

            if (password.Length > MaxLength) {
                return new ValidationResult($"Password must not exceed {MaxLength} characters.");
            }

            // Check for at least one uppercase letter
            if (!Regex.IsMatch(password, @"[A-Z]")) {
                return new ValidationResult("Password must contain at least one uppercase letter.");
            }

            // Check for at least one lowercase letter
            if (!Regex.IsMatch(password, @"[a-z]")) {
                return new ValidationResult("Password must contain at least one lowercase letter.");
            }

            // Check for at least one digit
            if (!Regex.IsMatch(password, @"[0-9]")) {
                return new ValidationResult("Password must contain at least one digit.");
            }

            // Check for at least one special character
            if (!Regex.IsMatch(password, @"[!@#$%^&*()_+\-=\[\]{};':""\\|,.<>\/?]")) {
                return new ValidationResult("Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>/?).");
            }

            return ValidationResult.Success;
        }
    }
}

