using System;
using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate;

[Owned]
public class PaymentSummary
{
    public int Last4 {get; set; } // last 4 digits of card number
    public string? Brand {get; set; } // visa, mastercard etc
    public int ExpMonth {get; set; }
    public int ExpYear {get; set; }
}   
