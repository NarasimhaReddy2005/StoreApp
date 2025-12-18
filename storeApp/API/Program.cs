using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// since db context is used in many parts of our application, we are adding it as a service here
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// A connection string is a specially formatted string of 
// text that specifies how an application should connect to a database.
builder.Services.AddCors(); // enable Cross-Origin Resource Sharing (CORS) (A web future for security)
builder.Services.AddTransient<ExceptionMiddleware>();

builder.Services.AddIdentityApiEndpoints<User>(
    opt =>
    {
        opt.User.RequireUniqueEmail = true;
        // some rules for passwords are default by .Net. So we need not specify them
    }
).AddRoles<IdentityRole>().AddEntityFrameworkStores<StoreContext>();
builder.Services.AddScoped<PaymentsService>();
builder.Services.AddHttpClient<CurrencyService>();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>(); // must be right after building app so any exception will be caught
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:3000");
});
app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();

DbInitializer.InitDb(app);

app.Run();
