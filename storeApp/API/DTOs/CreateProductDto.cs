using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CreateProductDto
{
    [Required]
    public string  Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public IFormFile File { get; set; } = null!;

    [Required]
    [Range(100, double.PositiveInfinity, ErrorMessage = "Price must be at least 100.")]
    public long Price { get; set; }

    [Required]
    public string Type { get; set; } = string.Empty;

    [Required]
    public string Brand { get; set; } = string.Empty;

    [Required]
    [Range(0, 200, ErrorMessage = "Quantity in stock cannot be negative.")]
    public int QuantityInStock { get; set; }
}   