using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate;

[Owned] // won't create separate table for ShippingAddress in DB
public class ShippingAddress
{
    public required string Name { get; set; }
    public required string Line1 { get; set; }
    public string? Line2 { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }
    // there will be '_' in b/w postal code name in stripe etc which differs from C# namming convention
    [JsonPropertyName("postal_code")]
    public required string PostalCode { get; set; }
    public required string Country { get; set; }
}