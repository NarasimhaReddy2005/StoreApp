using System.Text.Json.Serialization;

namespace API.DTOs;

public class PaymentVerificationDto
{
    [JsonPropertyName("razorpay_order_id")]
    public string RazorpayOrderId { get; set; } = null!;
    [JsonPropertyName("razorpay_payment_id")]
    public string RazorpayPaymentId { get; set; } = null!;
    [JsonPropertyName("razorpay_signature")]
    public string RazorpaySignature { get; set; } = null!;
}
