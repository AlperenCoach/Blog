using System.Security.Cryptography;
using System.Text;

namespace API.Utils {
    public static class PasswordHelper {
        public static string Hash(string password) {
            if (string.IsNullOrWhiteSpace(password)) {
                return string.Empty;
            }

            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        public static bool Verify(string password, string hashedPassword) {
            if (string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(hashedPassword)) {
                return false;
            }

            return Hash(password) == hashedPassword;
        }
    }
}
