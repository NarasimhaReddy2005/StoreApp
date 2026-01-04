using Razorpay.Api;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace API.Services;

public class PaymentsService(IConfiguration config, StoreContext context)
{
    private readonly string _keyId = config["RazorpaySettings:KeyId"]
            ?? throw new InvalidOperationException("Razorpay KeyId is not configured.");
    private readonly string _keySecret = config["RazorpaySettings:SecretKey"]
            ?? throw new InvalidOperationException("Razorpay KeySecret is not configured.");
    private readonly StoreContext _context = context;

    private CurrencyService _currencyService = new CurrencyService(new HttpClient());

    private async Task<long> CalculateBasketAmountAsync(string basketId)
    {
        var basket = await _context.Baskets
            .Include(b => b.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(b => b.BasketId == basketId);

        if (basket == null)
            throw new InvalidOperationException("Basket not found");

        var total = basket.Items.Sum(item =>
            item.Product.Price * item.Quantity
        );

        return total; // assume price already in rupees
    }

    public async Task<Entities.Order> CreateOrderAsync(string basketId, Address address)
    {
        long amount = await CalculateBasketAmountAsync(basketId);

        // 1. Convert to paise
        var rate = await _currencyService.GetUsdToInrRate();
        var inrAmount = (long)Math.Round(amount * rate, 2, MidpointRounding.AwayFromZero);
        // var amountInPaise = (long)(inrAmount * 100);

        // 2. Create Razorpay client
        var client = new RazorpayClient(_keyId, _keySecret);

        // 3. Razorpay order options
        var options = new Dictionary<string, object>
        {
            { "amount", inrAmount },
            { "currency", "INR" },
            { "receipt", Guid.NewGuid().ToString() }
        };

        // 4. Create Razorpay order
        var razorpayOrder = client.Order.Create(options);

        // 3. Persist address FIRST
        _context.Addresses.Add(address);
        await _context.SaveChangesAsync(); // ensures address.Id is generated

        // 5. Persist order in DB
        var order = new Entities.Order
        {
            OrderId = razorpayOrder["id"].ToString(),
            Amount = inrAmount,
            Status = "created",
            BasketId = basketId,
            ShippingAddressId = address.Id
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return order;
    }

    public async Task<bool> VerifyPaymentAsync(string orderId, string paymentId, string signature)
    {
        var attributes = new Dictionary<string, string>
        {
            { "razorpay_order_id", orderId },
            { "razorpay_payment_id", paymentId },
            { "razorpay_signature", signature }
        };

        try
        {
            Utils.verifyPaymentSignature(attributes);

            // Next steps (soon)
            var order = await _context.Orders
                .FirstOrDefaultAsync(x => x.OrderId == orderId);

            if (order == null) return false;

            order.PaymentId = paymentId;
            order.Status = "paid";
            // 4️⃣ Create payment record
            var payment = new Entities.Payment
            {
                OrderId = order.OrderId!,   // Razorpay order id
                PaymentId = paymentId,
                Amount = order.Amount,      // already in paise
                Status = "paid",
                BasketId = order.BasketId
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return true;
        }
        catch
        {
            return false;
        }
    }
    public async Task HandleWebhookAsync(string payload)
    {
        using var doc = JsonDocument.Parse(payload);
        var root = doc.RootElement;

        var eventType = root.GetProperty("event").GetString();

        if (eventType != "payment.captured")
            return;

        var payment = root
            .GetProperty("payload")
            .GetProperty("payment")
            .GetProperty("entity");

        var razorpayOrderId = payment.GetProperty("order_id").GetString();
        var razorpayPaymentId = payment.GetProperty("id").GetString();
        var amount = payment.GetProperty("amount").GetInt64();

        if (string.IsNullOrEmpty(razorpayOrderId) || string.IsNullOrEmpty(razorpayPaymentId))
            return;

        // Idempotency check
        var existingPayment = await _context.Payments
            .FirstOrDefaultAsync(p => p.PaymentId == razorpayPaymentId);

        if (existingPayment != null)
            return;

        var order = await _context.Orders
            .FirstOrDefaultAsync(o => o.OrderId == razorpayOrderId);

        if (order == null)
            return;

        order.Status = "paid";
        order.PaymentId = razorpayPaymentId;

        var newPayment = new Entities.Payment
        {
            OrderId = razorpayOrderId!,
            PaymentId = razorpayPaymentId,
            Amount = amount,
            Status = "paid",
            BasketId = order.BasketId
        };

        _context.Payments.Add(newPayment);

        //  Clear basket
        if (!string.IsNullOrEmpty(order.BasketId))
        {
            await ClearBasketAsync(order.BasketId);
        }
        await _context.SaveChangesAsync();
    }
    private async Task ClearBasketAsync(string basketId)
    {
        var basket = await _context.Baskets
            .Include(b => b.Items)
            .FirstOrDefaultAsync(b => b.BasketId == basketId);

        if (basket == null) return;

        _context.Baskets.Remove(basket);
        await _context.SaveChangesAsync();
    }
}
