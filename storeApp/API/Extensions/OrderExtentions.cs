using System;
using API.DTOs;
using Microsoft.EntityFrameworkCore;
using Razorpay.Api;

namespace API.Extensions;

public static class OrderExtentions
{
    public static IQueryable<OrderDto> ProjectToDto(this IQueryable<Entities.OrderAggregate.Order> query)
    {
        return query.Select(order => new OrderDto
        {
            Id = order.Id,
            BuyerEmail = order.BuyerEmail,
            OrderDate = order.OrderDate,
            ShippingAddress = order.ShippingAddress,
            Subtotal = order.Subtotal,
            DeliveryFee = order.DeliveryFee,
            Discount = order.Discount,
            OrderStatus = order.OrderStatus.ToString(),
            PaymentSummary = order.PaymentSummary,
            Total = order.GetTotal(),
            OrderItems = order.OrderItems.Select(item => new OrderItemDto
            {
                ProductId = item.ItemOrdered.ProductId,
                Name = item.ItemOrdered.Name,
                PictureUrl = item.ItemOrdered.PictureUrl,
                Price = item.Price,
                Quantity = item.Quantity
            }).ToList()
        }).AsNoTracking();
    }
    public static OrderDto ToDto(this Entities.OrderAggregate.Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            BuyerEmail = order.BuyerEmail,
            OrderDate = order.OrderDate,
            ShippingAddress = order.ShippingAddress,
            Subtotal = order.Subtotal,
            DeliveryFee = order.DeliveryFee,
            Discount = order.Discount,
            OrderStatus = order.OrderStatus.ToString(),
            PaymentSummary = order.PaymentSummary,
            Total = order.GetTotal(),
            OrderItems = [.. order.OrderItems.Select(item => new OrderItemDto
            {
                ProductId = item.ItemOrdered.ProductId,
                Name = item.ItemOrdered.Name,
                PictureUrl = item.ItemOrdered.PictureUrl,
                Price = item.Price,
                Quantity = item.Quantity
            })]
        };
    }
}
