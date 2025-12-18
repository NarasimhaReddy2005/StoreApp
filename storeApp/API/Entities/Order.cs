namespace API.Entities;

public class Order
{
    public int Id { get; set; }
    public string? OrderId { get; set; }
    public string? PaymentId { get; set; }
    public long Amount { get; set; }
    public string Status { get; set; } = "created";
    public string? BasketId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int ShippingAddressId { get; set; }
}
