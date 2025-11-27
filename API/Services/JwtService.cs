using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using API.Models;

namespace API.Services {
    public class JwtService {
        private readonly string _secretKey;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly int _expirationMinutes;

        public JwtService(IConfiguration configuration, IWebHostEnvironment environment) {
            // Priority: Environment Variable > Configuration > Default (Development only)
            _secretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY") 
                ?? configuration["Jwt:SecretKey"] 
                ?? (environment.IsDevelopment() ? "DevelopmentSecretKeyThatShouldBeAtLeast32CharactersLongForHS256!" : null)!;

            // Validate JWT Secret Key
            if (string.IsNullOrWhiteSpace(_secretKey)) {
                throw new InvalidOperationException(
                    "JWT Secret Key is required. Set JWT_SECRET_KEY environment variable or configure it in appsettings.json"
                );
            }

            if (_secretKey.Length < 32) {
                throw new InvalidOperationException(
                    $"JWT Secret Key must be at least 32 characters long for security. Current length: {_secretKey.Length}"
                );
            }

            _issuer = Environment.GetEnvironmentVariable("JWT_ISSUER") 
                ?? configuration["Jwt:Issuer"] 
                ?? "AlpiDevAPI";

            _audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") 
                ?? configuration["Jwt:Audience"] 
                ?? "AlpiDevClient";

            _expirationMinutes = configuration.GetValue<int>("Jwt:ExpirationMinutes", 1440); // 24 hours default
        }

        public string GenerateToken(User user) {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_secretKey);

            var claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, user.Id ?? ""),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim("fullName", user.FullName),
                new Claim("userId", user.Id ?? ""),
                new Claim("role", user.Role ?? "User")
            };

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(_expirationMinutes),
                Issuer = _issuer,
                Audience = _audience,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public ClaimsPrincipal? ValidateToken(string token) {
            try {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_secretKey);

                var validationParameters = new TokenValidationParameters {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = _issuer,
                    ValidateAudience = true,
                    ValidAudience = _audience,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                return principal;
            }
            catch {
                return null;
            }
        }
    }
}

