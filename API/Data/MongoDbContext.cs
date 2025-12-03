using MongoDB.Driver;
using API.Models;
using Microsoft.Extensions.Configuration;

namespace API.Data {
    public class MongoDbContext {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration configuration) {
            // Priority: Environment Variable > Configuration > Default
            var connectionString = Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING")
                ?? configuration.GetConnectionString("DefaultConnection") 
                ?? "mongodb://localhost:27017";
            var databaseName = Environment.GetEnvironmentVariable("DATABASE_NAME")
                ?? configuration["ConnectionStrings:DatabaseName"] 
                ?? configuration.GetValue<string>("DatabaseName") 
                ?? "BlogDb";
            
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
            
            // Create indexes for better query performance
            CreateIndexes();
        }

        public IMongoCollection<Blog> Blogs => _database.GetCollection<Blog>("blogs");
        public IMongoCollection<User> Users => _database.GetCollection<User>("users");
        public IMongoCollection<ContactMessage> ContactMessages => _database.GetCollection<ContactMessage>("contactMessages");

        private void CreateIndexes() {
            try {
                // User indexes
                var userEmailIndex = Builders<User>.IndexKeys.Ascending(u => u.Email);
                var userUsernameIndex = Builders<User>.IndexKeys.Ascending(u => u.Username);
                var userEmailUniqueIndex = new CreateIndexModel<User>(userEmailIndex, new CreateIndexOptions { Unique = true });
                var userUsernameUniqueIndex = new CreateIndexModel<User>(userUsernameIndex, new CreateIndexOptions { Unique = true });
                Users.Indexes.CreateMany(new[] { userEmailUniqueIndex, userUsernameUniqueIndex });

                // Blog indexes
                var blogAuthorIdIndex = Builders<Blog>.IndexKeys.Ascending(b => b.AuthorId);
                var blogCreatedAtIndex = Builders<Blog>.IndexKeys.Descending(b => b.CreatedAt);
                Blogs.Indexes.CreateMany(new[] {
                    new CreateIndexModel<Blog>(blogAuthorIdIndex),
                    new CreateIndexModel<Blog>(blogCreatedAtIndex)
                });

                // Contact message indexes
                var contactCreatedAtIndex = Builders<ContactMessage>.IndexKeys.Descending(c => c.CreatedAt);
                var contactIsReadIndex = Builders<ContactMessage>.IndexKeys.Ascending(c => c.IsRead);
                ContactMessages.Indexes.CreateMany(new[] {
                    new CreateIndexModel<ContactMessage>(contactCreatedAtIndex),
                    new CreateIndexModel<ContactMessage>(contactIsReadIndex)
                });
            }
            catch {
                // Indexes might already exist, ignore errors
            }
        }
    }
}

