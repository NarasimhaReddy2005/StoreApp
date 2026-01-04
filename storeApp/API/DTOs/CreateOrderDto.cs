using System;
using API.Entities.OrderAggregate;

namespace API.DTOs;

public class CreateOrderDto
{
    public required string RazorpayOrderId { get; set; }
    public required ShippingAddress ShippingAddress { get; set; }
    public required PaymentSummary PaymentSummary { get; set; }
}
