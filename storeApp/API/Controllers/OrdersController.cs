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
using Org.BouncyCastle.Crypto.Parameters;
using Razorpay.Api;

namespace API.Controllers;

[Authorize]
public class OrdersController(StoreContext context, IConfiguration config) : BaseApiController
{
    private readonly string _webhookSecret = config["RazorpaySettings:WebhookSecret"]!;
    private readonly string _keyId = config["RazorpaySettings:KeyId"]
            ?? throw new InvalidOperationException("Razorpay KeyId is not configured.");
    private readonly string _keySecret = config["RazorpaySettings:SecretKey"]
            ?? throw new InvalidOperationException("Razorpay KeySecret is not configured.");
    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetOrders()
    {
        var email = User.Identity?.Name;
        var orders = await context.Orders2
            .ProjectToDto()
            .Where(o => o.BuyerEmail == User.GetUsername())
            .ToListAsync();

        return orders;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderDto>> GetOrderDetails(int id)
    {
        var order = await context.Orders2
            .ProjectToDto()
            .Where(o => o.BuyerEmail == User.GetUsername() && o.Id == id)
            .FirstOrDefaultAsync();

        if (order == null) return NotFound();

        return order;
    }
    [HttpPost]
    public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);

        if (basket == null || basket.Items.Count == 0)
            return BadRequest("Basket is empty or not found");


        var payconf = await ConfirmRazorpayPaymentAsync(orderDto.PaymentSummary);
        if (!payconf) return BadRequest("PAYMENT NOT RECEIVED OR ERROR AT PAYMENTS");


        var items = await CreateOrderItemsAsync(basket.Items);
        var subtotal = items.Sum(item => item.Price * item.Quantity);
        var deliveryFee = CalculatreDeliveryFee(subtotal);
        var order = new Entities.OrderAggregate.Order
        {
            BuyerEmail = User.GetUsername(),
            OrderItems = items,
            ShippingAddress = orderDto.ShippingAddress, // Placeholder
            Subtotal = subtotal,
            DeliveryFee = deliveryFee,
            PaymentSummary = orderDto.PaymentSummary, // Placeholder
            RazorpayOrderId = orderDto.RazorpayOrderId,
            OrderStatus = OrderStatus.PaymentReceived
        };

        context.Orders2.Add(order);
        context.Baskets.Remove(basket);
        Response.Cookies.Delete("basketId");
        var result = await context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Problem creating order");
        return CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }, order.ToDto()); // Placeholder return
    }

    private static long CalculatreDeliveryFee(long subtotal)
    {
        return subtotal > 10000 ? 0 : 500;
    }

    private async Task<List<OrderItem>> CreateOrderItemsAsync(List<BasketItem> items)
    {
        var orderItems = new List<OrderItem>();
        foreach (var item in items)
        {
            var product = await context.Products.FindAsync(item.ProductId) ?? throw new InvalidOperationException($"Product with ID {item.ProductId} not found");
            var itemOrdered = new ProductItemOrder
            {
                ProductId = product.Id,
                Name = product.Name,
                PictureUrl = product.PictureUrl
            };

            var orderItem = new OrderItem
            {
                ItemOrdered = itemOrdered,
                Price = product.Price,
                Quantity = item.Quantity
            };

            orderItems.Add(orderItem);
        }
        return orderItems;
    }
    public async Task<bool> ConfirmRazorpayPaymentAsync(PaymentSummary paymentSummary)
    {
        var razorpayOrderId = paymentSummary.RzpOrderId;
        var razorpayPaymentId = paymentSummary.RzpPaymentId;
        var razorpaySignature = paymentSummary.RzpSignature;
        try
        {
            // 1Verify Razorpay signature (authenticity)
            var attributes = new Dictionary<string, string>
        {
            { "razorpay_order_id", razorpayOrderId },
            { "razorpay_payment_id", razorpayPaymentId },
            { "razorpay_signature", razorpaySignature }
        };

            Utils.verifyPaymentSignature(attributes);
            var _razorpayClient = new RazorpayClient(_keyId, _keySecret);

            //  Fetch payment from Razorpay (authority check)
            var payment = _razorpayClient.Payment.Fetch(razorpayPaymentId);

            // 3Ensure payment belongs to this order
            if (payment["order_id"]?.ToString() != razorpayOrderId)
                return false;

            // Ensure money was actually captured
            if (payment["status"]?.ToString() != "captured")
                return false;

            //  Load your store order
            var order = await context.Orders
                .FirstOrDefaultAsync(o => o.OrderId == razorpayOrderId);

            if (order == null)
                return false;

            // 6️Verify amount (paise)
            if ((int)payment["amount"] != order.Amount)
                return false;

            // 7 Idempotency check (already paid)
            if (order.Status == "paid")
                return true;
            return true;
        }
        catch
        {
            return false;
        }
    }
}
