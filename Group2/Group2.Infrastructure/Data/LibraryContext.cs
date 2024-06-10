using Group2.Domain.Entity;
using Group2.Domain.Enum;
using Microsoft.EntityFrameworkCore;

namespace Group2.Infrastructure.Data
{
    public class LibraryContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>();

            var users = new List<User>()
                {
                        new() { Id= Guid.NewGuid(), Name = "user1", Password = "$2a$12$0NPISodxxD/AH/OGrKghM.xTFgZHmg1MZlDC.FJo6SS7gYSdhdo9i", Role = Role.User, Email = "user1@example.com" , CreatedAt= DateTime.Now, ModifiedAt =DateTime.Now},
                        new() { Id= Guid.NewGuid(), Name = "user2", Password = "$2a$12$0NPISodxxD/AH/OGrKghM.xTFgZHmg1MZlDC.FJo6SS7gYSdhdo9i", Role = Role.User, Email = "user2@example.com" , CreatedAt= DateTime.Now, ModifiedAt =DateTime.Now},
                        new() { Id= Guid.NewGuid(), Name = "admin", Password = "$2a$12$0NPISodxxD/AH/OGrKghM.xTFgZHmg1MZlDC.FJo6SS7gYSdhdo9i", Role = Role.Admin, Email = "admin@example.com" , CreatedAt= DateTime.Now, ModifiedAt =DateTime.Now},
                        new() { Id= Guid.NewGuid(), Name = "user3", Password = "$2a$12$0NPISodxxD/AH/OGrKghM.xTFgZHmg1MZlDC.FJo6SS7gYSdhdo9i", Role = Role.User, Email = "user3@example.com" , CreatedAt= DateTime.Now, ModifiedAt =DateTime.Now},
                        new() { Id= Guid.NewGuid(), Name = "user4", Password = "$2a$12$0NPISodxxD/AH/OGrKghM.xTFgZHmg1MZlDC.FJo6SS7gYSdhdo9i", Role = Role.User, Email = "user4@example.com" , CreatedAt= DateTime.Now, ModifiedAt =DateTime.Now},
                };
            modelBuilder.Entity<User>().HasData(users);

            base.OnModelCreating(modelBuilder);
        }

    }
}
