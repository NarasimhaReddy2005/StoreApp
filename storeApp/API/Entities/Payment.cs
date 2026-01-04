namespace API.Entities;

public class Payment
{
    public int Id { get; set; }
    public string OrderId { get; set; } = null!;      // Razorpay order id
    public required string PaymentId { get; set; }            // Razorpay payment id (filled after verification)
    public long Amount { get; set; }                  // stored in paise
    public string Status { get; set; } = "created";   // created / paid / failed
    public string? BasketId { get; set; }             // link to your basket (string based on your existing basket id)
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
