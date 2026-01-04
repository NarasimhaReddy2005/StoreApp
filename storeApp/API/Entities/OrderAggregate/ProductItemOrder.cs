using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate;

[Owned]
public class ProductItemOrder
{
    public int ProductId { get; set; }
    public required string Name { get; set; }
    public required string PictureUrl { get; set; }
}
