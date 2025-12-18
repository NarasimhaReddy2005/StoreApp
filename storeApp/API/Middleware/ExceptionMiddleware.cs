using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware(IHostEnvironment env, ILogger<ExceptionMiddleware> logger) : IMiddleware
// Added parameters manually
// One to inject environment other to log info into console
// A logger is a tool or component in a program that is used to 
// record information (called logs) about the program’s execution
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context); //Next middleware
        }
        catch (Exception ex)
        {

            await HandleException(context, ex);
        }
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message);

        // Log inner exceptions explicitly
        if (ex.InnerException != null)
        {
            logger.LogError("INNER EXCEPTION: {Message}", ex.InnerException.Message);
        }

        if (ex.InnerException?.InnerException != null)
        {
            logger.LogError("INNER INNER EXCEPTION: {Message}",
                ex.InnerException.InnerException.Message);
        }

        context.Response.ContentType = "application/json"; // converting to JSON
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; // Getting status code

        var response = new ProblemDetails
        {
            Status = 500,
            Detail = env.IsDevelopment() ? ex.StackTrace?.ToString() : null, //Stacktrace can be null
            Title = ex.Message
        };
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }; // since we use it
        var json = JsonSerializer.Serialize(response, options);

        await context.Response.WriteAsync(json);
    }
}
