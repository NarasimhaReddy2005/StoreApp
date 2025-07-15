using System;
using API.Entities;
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
public class StoreContext(DbContextOptions options) : DbContext(options) // primary constructor
// we need to pass options to DbContext constructor to pass our connection string to EF
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set;  }
}

