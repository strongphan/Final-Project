using Group2.Domain.Entities;
using Group2.Domain.Entity;
using Microsoft.EntityFrameworkCore;

namespace Group2.Infrastructure.Data
{
    public class AssetContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.StaffCode)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.UserName)
                .IsUnique();

            modelBuilder.Entity<Assignment>()
                .HasOne(a => a.User)
                .WithMany()
                .HasForeignKey(a => a.UserId);

            modelBuilder.Entity<Assignment>()
                .HasOne(a => a.Asset)
                .WithMany()
                .HasForeignKey(a => a.AssetId);
            modelBuilder.Entity<Asset>()
               .HasOne(b => b.Category)
               .WithMany(c => c.Assets)
               .HasForeignKey(b => b.CategoryId);
        }
    }
}
