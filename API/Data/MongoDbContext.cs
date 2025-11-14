using MongoDB.Driver;
using API.Models;
using Microsoft.Extensions.Configuration;

namespace API.Data {
    public class MongoDbContext {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration configuration) {
            var connectionString = configuration.GetConnectionString("DefaultConnection") 
                ?? "mongodb://localhost:27017";
            var databaseName = configuration["ConnectionStrings:DatabaseName"] 
                ?? configuration.GetValue<string>("DatabaseName") 
                ?? "BlogDb";
            
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<Blog> Blogs => _database.GetCollection<Blog>("blogs");
        public IMongoCollection<User> Users => _database.GetCollection<User>("users");
    }
}

