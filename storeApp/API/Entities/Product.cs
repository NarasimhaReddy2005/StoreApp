namespace API.Entities; // logical location of the file

public class Product
{
    public int Id { get; set; } // public to be accessible by entity framework 
    public required string  Name { get; set; }
    public required string Description { get; set; }
    public required string PictureUrl { get; set; }
    public long Price { get; set; }
    public required string Type { get; set; }
    public required string Brand { get; set; } 
    public int QuantityInStock { get; set; }
    public string? PublicId { get; set; } // to store public id of image in cloudinary
}
