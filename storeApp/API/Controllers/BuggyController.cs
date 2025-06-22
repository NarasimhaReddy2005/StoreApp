using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController
{
    // endpoint 1
    [HttpGet("not-find")] // When tried to fetch a product that was not in database
    public IActionResult GetNotFound() // don't return a specific type thus used for Http request
    {
        return NotFound(); // returns not found API
    }

    // endpoint 2
    [HttpGet("bad-request")] // a client side error that occurs in API server (consequences in server side)
    public IActionResult GetBadRequest()
    {
        return BadRequest("This is not a good request"); // returns along with msg
    }

    // endpoint 3
    [HttpGet("unauthorized")]
    public IActionResult GetUnauthorized()
    {
        return Unauthorized();
    }

    // endpoint 4
    [HttpGet("validation-error")]
    public IActionResult GetValidationError() // for validating CURD operations
    // [ApiController] -> actually has this included that validates parameters from client
    // But for now lets simulate
    {
        // ModelState is an object that tracks errors for validation. 
        // Used by api controller.
        // Stores errors as key value pairs
        ModelState.AddModelError("Problem1", "This is err1");
        ModelState.AddModelError("Problem2", "This is err2");
        return ValidationProblem();
    }

    [HttpGet("server-error")] // An actual exception
    public IActionResult GetServerError()
    {
        throw new Exception("This is a server error");
    }
}
