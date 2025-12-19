using System;
using API.Entities.OrderAggregate;

namespace API.DTOs;

public class OrderDto
{
    public required ShippingAddress ShippingAddress { get; set; }
    public required PaymentSummary PaymentSummary { get; set; }
}
