namespace API.Entities.OrderAggregate;

public class ProductItemOrder
{
    public int ProductId { get; set; }
    public required string Name { get; set; }
    public required string PictureUrl { get; set; }
}
