using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Encodings.Web;
using System.Text.Unicode;
using System.Text.RegularExpressions;
using System.Text;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// MongoDB Configuration
builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS configuration for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
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
}

// HTTPS Redirection - only in production or when HTTPS is explicitly configured
// This prevents the warning when running with HTTP-only profile in development
if (app.Environment.IsProduction() || 
    builder.Configuration.GetValue<string>("ASPNETCORE_URLS")?.Contains("https://") == true)
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();

