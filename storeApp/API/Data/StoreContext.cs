using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;
// Equivalent code of the above code
// public class StoreContext : DbContext
// {
//     public StoreContext(DbContextOptions options) : base(options)
//     {
//          ...    
//     }
// }
public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options) // primary constructor
// we need to pass options to DbContext constructor to pass our connection string to EF
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }
    public required DbSet<Order> Orders { get; set; }
    public required DbSet<Payment> Payments { get; set; }
    public required DbSet<Address> Addresses { get; set; }
    public required DbSet<Entities.OrderAggregate.Order> Orders2 { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole
                {
                    Id = "afdbaf5e-0791-4739-9847-0f08a1d5906e",
                    Name = "Member",
                    NormalizedName = "MEMBER"
                },
                new IdentityRole
                {
                    Id = "f5288007-745f-410e-b301-675538e852e7",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                }
            );
    }
}

