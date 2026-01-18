using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController(StoreContext context, IMapper mapper, ImageService imageService) : BaseApiController
    {   // context is implicitly read-only and private
        // This is how we can use dependency injection in ASP.NET Core
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = context.Products
                                .Sort(productParams.OrderBy)
                                .Search(productParams.SearchTerm)
                                .Filter(productParams.Brands, productParams.Types)
                                .AsQueryable(); // sort is an extension we made

            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
            Response.AddPaginationHeader(products.MetaData); // first setting header
            return products;
        }
        [HttpGet("{id}")] // http://localhost:5000/api/products/1
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await context.Products.Select(x => x.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(x => x.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Product>> CreateProduct(CreateProductDto productDto)
        {
            var product = mapper.Map<Product>(productDto);

            if(productDto.File != null)
            {
                var imageResult = await imageService.AddImageAsync(productDto.File);
                if(imageResult.Error != null) return BadRequest(imageResult.Error.Message);

                product.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                product.PublicId = imageResult.PublicId;
            }   

            context.Products.Add(product);
            var result = await context.SaveChangesAsync();

            if (result > 0)
                return CreatedAtAction("GetProduct", new { id = product.Id }, product);
            return BadRequest("Problem creating product");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult> UpdateProduct(UpdateProductDto productDto)
        {
            var product = await context.Products.FindAsync(productDto.Id);
            if (product == null) return NotFound();

            mapper.Map(productDto, product);

            if(productDto.File != null)
            {
                var imageResult = await imageService.AddImageAsync(productDto.File);
                if(imageResult.Error != null) return BadRequest(imageResult.Error.Message);

                if (!string.IsNullOrEmpty(product.PublicId))
                    await imageService.DeleteImageAsync(product.PublicId);

                product.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                product.PublicId = imageResult.PublicId;
            }

            var result = await context.SaveChangesAsync();
            if (result > 0)
                return NoContent();
            return BadRequest("Problem updating product");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await context.Products.FindAsync(id);
            if (product == null) return NotFound();

            if (!string.IsNullOrEmpty(product.PublicId))
                await imageService.DeleteImageAsync(product.PublicId);

            context.Products.Remove(product);
            var result = await context.SaveChangesAsync();
            if (result > 0)
                return Ok();
            return BadRequest("Problem deleting product");
        }
    }
}