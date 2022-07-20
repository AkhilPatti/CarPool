using Microsoft.EntityFrameworkCore;
using System;
using MySql.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Threading.Tasks;
using CarPool.Models;

namespace CarPool.Services
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<User> UserDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(connectionString: @"server=localhost;Uid=root;database=carpool;port=3306;Pwd=Pass@123");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>(entity =>
           {
               entity.Property(m => m.emailId);
               entity.Property(m => m.password);
           });
            modelBuilder.Entity<User>().HasKey(o => o.emailId);
        }
    }
}

