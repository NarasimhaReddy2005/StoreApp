namespace API.Entities.OrderAggregate;

public class OrderItem
{
    public int Id { get; set; }
    public required ProductItemOrder ItemOrdered { get; set; }
    public long price { get; set; }
    public int Quantity { get; set; }
}
