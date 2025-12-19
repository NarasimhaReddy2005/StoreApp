using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class BasketExtension
{
    public static BasketDto ToDto(this Basket basket) // Basket to dto
    {
        return new BasketDto
        {
            BasketId = basket.BasketId,
            Items = [.. basket.Items.Select(x => new BasketItemDto
            {
                productId = x.ProductId,
                Name = x.Product.Name,
                Price = x.Product.Price,
                Brand = x.Product.Brand,
                Type = x.Product.Type,
                PictureUrl = x.Product.PictureUrl,
                Quantity = x.Quantity
            })]
        };
    }
    public static async Task<Basket> GetBasketWithItems(this IQueryable<Basket> query, string? basketId)
    {
        return await query
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BasketId == basketId) ?? throw new Exception("Cannot get basket");
    }
}
