using System;
using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate;

[Owned]
public class PaymentSummary
{
    public required string RzpPaymentId { get; set; }
    public required string RzpOrderId { get; set; }
    public required string RzpSignature { get; set; }
}   
