using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.AspNetCore.Server.IIS;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using API.Data;
using API.Services;
using API.Middleware;
using API.Authorization;
using Scalar.AspNetCore;
using AspNetCoreRateLimit;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(options => {
        // Request size limits
        options.MaxModelBindingCollectionSize = 100;
    })
    .AddJsonOptions(options => {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.WriteIndented = true;
    });

// Configure request size limits
builder.Services.Configure<IISServerOptions>(options => {
    options.MaxRequestBodySize = 10 * 1024 * 1024; // 10 MB
});

builder.Services.Configure<KestrelServerOptions>(options => {
    options.Limits.MaxRequestBodySize = 10 * 1024 * 1024; // 10 MB
    });

// MongoDB Configuration
builder.Services.AddSingleton<MongoDbContext>();

// JWT Service
builder.Services.AddSingleton<JwtService>();

// Email Service
builder.Services.AddSingleton<API.Services.EmailService>();

// Rate Limiting Configuration
builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>(builder.Configuration.GetSection("IpRateLimiting"));
builder.Services.AddInMemoryRateLimiting();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();

// JWT Authentication Configuration
// Priority: Environment Variable > Configuration > Default (Development only)
var jwtSecretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY") 
    ?? builder.Configuration["Jwt:SecretKey"] 
    ?? (builder.Environment.IsDevelopment() ? "DevelopmentSecretKeyThatShouldBeAtLeast32CharactersLongForHS256!" : null);

// Validate JWT Secret Key
if (string.IsNullOrWhiteSpace(jwtSecretKey)) {
    throw new InvalidOperationException(
        "JWT Secret Key is required. Set JWT_SECRET_KEY environment variable or configure it in appsettings.json"
    );
}

if (jwtSecretKey.Length < 32) {
    throw new InvalidOperationException(
        "JWT Secret Key must be at least 32 characters long for security. Current length: " + jwtSecretKey.Length
    );
}

var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") 
    ?? builder.Configuration["Jwt:Issuer"] 
    ?? "AlpiDevAPI";

var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") 
    ?? builder.Configuration["Jwt:Audience"] 
    ?? "AlpiDevClient";

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey)),
        ValidateIssuer = true,
        ValidIssuer = jwtIssuer,
        ValidateAudience = true,
        ValidAudience = jwtAudience,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization(options => {
    AuthorizationPolicies.ConfigurePolicies(options);
});

// Health Checks
builder.Services.AddHealthChecks();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.SwaggerDoc("v1", new OpenApiInfo {
        Title = "Blog API",
        Version = "v1",
        Description = "Blog API Documentation - Blog, User, Auth, and Contact endpoints",
        Contact = new OpenApiContact {
            Name = "API Support"
        }
    });

    // Add JWT Authentication to Swagger
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });

    // Allow file upload parameters to be described correctly
    options.MapType<IFormFile>(() => new OpenApiSchema {
        Type = "string",
        Format = "binary"
    });
    options.MapType<IEnumerable<IFormFile>>(() => new OpenApiSchema {
        Type = "array",
        Items = new OpenApiSchema {
            Type = "string",
            Format = "binary"
        }
    });
});

// CORS configuration for React frontend
// Priority: Environment Variable > Configuration > Default (Development only)
var allowedOrigins = Environment.GetEnvironmentVariable("CORS_ALLOWED_ORIGINS")?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
    ?? builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? (builder.Environment.IsDevelopment() 
        ? new[] { "http://localhost:5173", "http://localhost:3000" } 
        : Array.Empty<string>());

if (allowedOrigins.Length == 0 && builder.Environment.IsProduction()) {
    throw new InvalidOperationException(
        "CORS allowed origins must be configured for production. Set CORS_ALLOWED_ORIGINS environment variable or configure it in appsettings.json"
    );
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    
    // Scalar API Documentation
    app.MapScalarApiReference(options => {
        options
            .WithTitle("Blog API Documentation")
            .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient)
            .WithTheme(ScalarTheme.BluePlanet);
    });
}

// HTTPS Redirection - only in production or when HTTPS is explicitly configured
// This prevents the warning when running with HTTP-only profile in development
if (app.Environment.IsProduction() || 
    builder.Configuration.GetValue<string>("ASPNETCORE_URLS")?.Contains("https://") == true)
{
    app.UseHttpsRedirection();
}

// Global Exception Handler (must be early in pipeline)
app.UseMiddleware<GlobalExceptionHandler>();

// Rate Limiting Middleware (must be before other middleware)
app.UseIpRateLimiting();

app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

// Health Check endpoint
app.MapHealthChecks("/health");

app.MapControllers();

app.Run();

