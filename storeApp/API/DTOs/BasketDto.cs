namespace API.DTOs;

public class BasketDto
{
    public required string BasketId { get; set; } // cookie in users browser
    // we can use this to persist items in user's basket
    public List<BasketItemDto> Items { get; set; } = [];
}

