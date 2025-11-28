using Microsoft.AspNetCore.Authorization;

namespace API.Authorization {
    public static class AuthorizationPolicies {
        public const string AdminOnly = "AdminOnly";
        public const string UserOrAdmin = "UserOrAdmin";

        public static void ConfigurePolicies(AuthorizationOptions options) {
            options.AddPolicy(AdminOnly, policy => {
                policy.RequireClaim("role", "Admin");
            });

            options.AddPolicy(UserOrAdmin, policy => {
                policy.RequireAssertion(context => 
                    context.User.HasClaim("role", "User") || 
                    context.User.HasClaim("role", "Admin"));
            });
        }
    }
}

