namespace API.Entities;

public class Basket
{
    public int Id { get; set; }
    public required string BasketId { get; set; } // cookie in users browser
    // we can use this to persist items in user's basket
    public List<BasketItem> Items { get; set; } = [];

    public string? ClientSecret { get; set; } 

    public void AddItem(Product product, int quantity)
    {
        if (product == null) ArgumentNullException.ThrowIfNull(product);
        if (quantity <= 0) throw new ArgumentException("Quantity should be greater than zero",
             nameof(quantity));

        var existingItem = FindItem(product.Id);
        if (existingItem == null)
        {
            Items.Add(new BasketItem
            {
                Product = product,
                Quantity = quantity,
            });
        }
        else
        {
            existingItem.Quantity += quantity;
        }
    }

    public void RemoveItems(int productId, int quantity) // assuming this method is used only when item exists
    {
        if (quantity <= 0) throw new ArgumentException("Quantity to be removed should be greater than 0", nameof(quantity));
        var item = FindItem(productId);
        if (item == null) return; // just stopping exec of this method

        item.Quantity -= quantity;
        if (item.Quantity <= 0)
        {
            Items.Remove(item);
        }
    }

    private BasketItem? FindItem(int productId)
    {
        // Default is null
        return Items.FirstOrDefault(item => item.ProductId == productId);
    }
}
