using API.Services;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using System.Security.Cryptography;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly PaymentsService _paymentsService;
        private readonly string _webhookSecret;

        public PaymentsController(PaymentsService paymentsService, IConfiguration config)
        {
            _paymentsService = paymentsService;
            _webhookSecret = config["RazorpaySettings:WebhookSecret"]!;
        }

        // 1️⃣ Create Razorpay Order
        [HttpPost("create-rzp-order")]
        public async Task<IActionResult> CreateRazorpayOrder(CreateRazorpayOrderDto dto)
        {
            if (string.IsNullOrEmpty(dto.BasketId))
                return BadRequest("BasketId is required");

            var order = await _paymentsService.CreateOrderAsync(
                dto.BasketId,
                dto.Address
            );

            return Ok(new
            {
                orderId = order.OrderId,
                amount = order.Amount,
                status = order.Status
            });
        }

        // 2️⃣ Verify Razorpay Payment (Now optional)
        [HttpPost("verify")]
        public async Task<IActionResult> VerifyPayment(PaymentVerificationDto dto)
        {
            var isValid = await _paymentsService.VerifyPaymentAsync(
                dto.RazorpayOrderId,
                dto.RazorpayPaymentId,
                dto.RazorpaySignature
            );

            if (!isValid)
                return BadRequest("Invalid payment signature");

            return Ok();
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> RazorpayWebhook()
        {
            using var reader = new StreamReader(Request.Body); // read raw body
            var body = await reader.ReadToEndAsync();

            var signature = Request.Headers["X-Razorpay-Signature"].ToString();
            // Razorpay sends an HMAC signature in this header
            // Used to verify authenticity

            if (!VerifyWebhookSignature(body, signature))
                return Unauthorized();

            await _paymentsService.HandleWebhookAsync(body);

            return Ok();
        }

        private bool VerifyWebhookSignature(string payload, string signature)
        {
            var secretBytes = System.Text.Encoding.UTF8.GetBytes(_webhookSecret);
            using var hmac = new HMACSHA256(secretBytes);
            var hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(payload));
            var expectedSignature = Convert.ToHexString(hash).ToLower();

            return expectedSignature == signature;
        }
    }
}
