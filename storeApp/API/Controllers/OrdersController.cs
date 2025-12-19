using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class OrdersController(StoreContext context, IConfiguration config) : BaseApiController
{
    private readonly string _webhookSecret = config["RazorpaySettings:WebhookSecret"]!;

    [HttpGet]
    public async Task<ActionResult<List<Entities.OrderAggregate.Order>>> GetOrders()
    {
        var email = User.Identity?.Name;
        var orders = await context.Orders2
            .Include(o => o.OrderItems)
            .Where(o => o.BuyerEmail == User.GetUsername())
            .ToListAsync();

        return Ok(orders);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Entities.OrderAggregate.Order>> GetOrderDetails(int id)
    {
        var order = await context.Orders2
            .Where(o => o.BuyerEmail == User.GetUsername() && o.Id == id)
            .FirstOrDefaultAsync();

        if (order == null) return NotFound();

        return order;
    }
    [HttpPost]
    public async Task<ActionResult<int>> CreateOrder(OrderDto orderDto)
    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);

        if (basket == null || basket.Items.Count == 0) 
            return BadRequest("Basket is empty or not found");
        
        var items = CreateOrderItems(basket.Items);
        var subtotal = items.Sum(item => item.price * item.Quantity);
        var deliveryFee = CalculatreDeliveryFee(subtotal);
        var order = new Entities.OrderAggregate.Order
        {
            BuyerEmail = User.GetUsername(),
            OrderItems = items,
            ShippingAddress = orderDto.ShippingAddress, // Placeholder
            Subtotal = subtotal,
            DeliveryFee = (long)deliveryFee,
            PaymentSummary = orderDto.PaymentSummary // Placeholder
        };

        context.Orders2.Add(order);
        context.Baskets.Remove(basket);
        Response.Cookies.Delete("basketId");
        var result = await context.SaveChangesAsync() > 0;
    
        if(!result) return BadRequest("Problem creating order");
        return CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }); // Placeholder return
    }

    private object CalculatreDeliveryFee(long subtotal)
    {
        throw new NotImplementedException();
    }

    private List<OrderItem> CreateOrderItems(List<BasketItem> items)
    {
        throw new NotImplementedException();
    }
}
