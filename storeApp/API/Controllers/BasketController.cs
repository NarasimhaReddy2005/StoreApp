using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NoContent();
        return basket.ToDto();
    }
    [HttpPost] // sends request to server
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {
        // get basket from database        
        var basket = await RetrieveBasket();
        // else create basket
        basket ??= CreateBasket(); // compound assignment if basket is null it calls CreateBasket

        // get product
        var product = await context.Products.FindAsync(productId);
        if (product == null) return BadRequest("Problem adding item to basket");
        // add item to basket
        if (basket != null)
            basket.AddItem(product, quantity);
        else
            return BadRequest("Problem creating basket");

        // save changes
        var result = await context.SaveChangesAsync(); // includes failure checks and roll back
        // returns no of changes
        if (result > 0) return CreatedAtAction(nameof(GetBasket), basket.ToDto());
        // CreatedAtAction returns 201 response (indicating entity created)
        // sends location header of basket to GetBasket function

        return BadRequest("Problem updating basket");
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        // get basket
        var basket = await RetrieveBasket();
        // remove the item or reduce its quantity
        if (basket != null)
            basket.RemoveItems(productId, quantity);
        else
            return BadRequest("Unable to retrieve basket");
        
        // save changes
        var result = await context.SaveChangesAsync();
        if (result > 0) return Ok();
        return BadRequest("Problem updating basket");
    }

    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
    }

    private Basket? CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.UtcNow.AddDays(30)
        };
        Response.Cookies.Append("basketId", basketId, cookieOptions);
        var basket = new Basket { BasketId = basketId };
        context.Baskets.Add(basket); // giving ef basket to get it tracked
        return basket;
    }
}

