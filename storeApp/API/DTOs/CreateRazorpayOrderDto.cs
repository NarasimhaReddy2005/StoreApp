using API.Entities;

namespace API.DTOs;

public class CreateRazorpayOrderDto
{
    public string BasketId { get; set; } = null!;
    // public long Amount { get; set; }
    // will be calculated in the service for security regions
    public Address Address { get; set; } = null!;
}
