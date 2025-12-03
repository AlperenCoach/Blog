using System.Security.Cryptography;
using System.Text;

namespace API.Services {
    /// <summary>
    /// Service for hashing JWT secret keys using SHA256
    /// </summary>
    public static class SecretKeyHasher {
        /// <summary>
        /// Hashes a secret key using SHA256 algorithm
        /// </summary>
        /// <param name="secretKey">The original secret key to hash</param>
        /// <returns>SHA256 hash of the secret key as a hexadecimal string</returns>
        public static string HashSecretKey(string secretKey) {
            if (string.IsNullOrWhiteSpace(secretKey)) {
                throw new ArgumentException("Secret key cannot be null or empty", nameof(secretKey));
            }

            using (var sha256 = SHA256.Create()) {
                var bytes = Encoding.UTF8.GetBytes(secretKey);
                var hashBytes = sha256.ComputeHash(bytes);
                return Convert.ToHexString(hashBytes);
            }
        }

        /// <summary>
        /// Validates that a secret key meets minimum requirements before hashing
        /// </summary>
        /// <param name="secretKey">The secret key to validate</param>
        /// <returns>True if valid, throws exception if invalid</returns>
        public static bool ValidateSecretKey(string secretKey) {
            if (string.IsNullOrWhiteSpace(secretKey)) {
                throw new ArgumentException("Secret key cannot be null or empty", nameof(secretKey));
            }

            if (secretKey.Length < 32) {
                throw new ArgumentException(
                    $"Secret key must be at least 32 characters long for security. Current length: {secretKey.Length}",
                    nameof(secretKey)
                );
            }

            return true;
        }
    }
}

