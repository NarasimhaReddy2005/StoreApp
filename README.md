# NOTES

## Razor Pages

Razor Pages is a server-side, page-focused web development framework introduced as part of ASP.NET Core. It enables developers to build dynamic, data-driven web applications using a simple and intuitive model that emphasizes clean separation of concerns and ease of use. Razor Pages is built on top of the ASP.NET Core MVC framework and uses the same underlying principles, but it simplifies the development process by allowing developers to work with individual pages rather than controllers and actions.

## Starting .Net project

create new solution file

```cmd
dotnet new sln
```

create new webapi

```cmd
dotnet new webapi -h (to check for help)[not needed]
dotnet new webapi -n API -controllers
```

Add the created API.csproj file to solution.

```cmd
dotnet sln add API
```

To check current application is working or not

<br> go to API directory

```cmd
dotnet run
```

Initially the provided link wont show anything, but if you modify url by adding `/WeatherForecast`
we will get an array of data showing API is working.

Additional requirements of Extensions:
<br> SqLite
<br> Sqlite Viewer
<br> NuGet Gallery
<br>

Troubleshooting suggestion: In command pallette select Developer: Reload Window. This will reload the window and apply any changes made to the extensions.

### Program class:

Entry point to our application.

What Is OpenAPI?
OpenAPI, formerly known as Swagger, is an interoperable, machine-readable, and human-friendly specification format that is used to define HTTP APIs. It relies on JSON Schema to describe the API’s underlying data. OpenAPI documents can be created with a code editor or an API design tool in the early phases of the API lifecycle, or they can be generated from existing API code, live traffic, or logs.

We dont use it here now.

```csharp
builder.Services.AddOpenApi();
```

Next we have

```csharp
builder.Services.AddControllers();
```

This line registers the default set of services for controllers in ASP.NET Core. This includes support for model binding, validation, and action filters. By default, it also adds support for JSON serialization using System.Text.Json.

```csharp
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
```

This line maps the OpenAPI endpoints to the application when running in a development environment. This allows you to access the OpenAPI documentation and UI for your API.

Its job is to receive http requests and return http responses.

## API..csproj

Any packages that we install that help us develop our application will be added to this file. This is a project file that contains information about the project, such as its dependencies, build settings, and other configuration options.

In solution explorer click on API to get to API.csproj file.

#### needed code in Program.cs

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapControllers();

app.Run();
```

Needed code in API.csprog

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable> <!-- we need this to enable nullable reference types like strings -->
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

</Project>
```

Nullable reference types are a feature in C# that helps developers avoid null reference exceptions by providing compile-time warnings when a nullable reference type is dereferenced without a null check. This feature allows developers to specify whether a reference type can be null or not, and the compiler will enforce these rules during development.

<br>
Configurations are reffered from appsettings.json file. and appsettings.Development.json file. These files are used to store configuration settings for the application, such as connection strings, logging settings, and other application-specific settings. The appsettings.json file is the default configuration file, while the appsettings.Development.json file is used for development-specific settings. The settings in the appsettings.Development.json file will override any settings in the appsettings.json file when the application is running in the development environment.

Our final appsettings.Development.json file looks like this:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Information"
    }
  }
}
```

Controllers will receve http requests and return http responses. They are responsible for handling incoming requests, processing data, and returning the appropriate response to the client. In ASP.NET Core, controllers are typically implemented as classes that inherit from the ControllerBase class or the Controller class. The ControllerBase class provides a set of methods and properties that are commonly used in web API development, while the Controller class adds support for views and Razor pages.
<br>
Razor Pages is a server-side, page-focused web development framework introduced as part of ASP.NET Core. It enables developers to build dynamic, data-driven web applications using a simple and intuitive model that emphasizes clean separation of concerns and ease of use. Razor Pages is built on top of the ASP.NET Core MVC framework and uses the same underlying principles, but it simplifies the development process by allowing developers to work with individual pages rather than controllers and actions.
<br>

```cmd
dotnet dev-certs https --trust
```

This command is used to trust the HTTPS development certificate for ASP.NET Core applications. When you run an ASP.NET Core application with HTTPS, a self-signed development certificate is created to enable secure communication over HTTPS. This command allows you to trust that certificate on your local machine, so you won't receive security warnings when accessing your application in a web browser.

# Starting the project

Create a new folder in API directory called Entities.
Select "add new file" and create a new class called Product.cs.
<br>
Each class has a name space defined allowing us to use the same class name in different files. This is useful when we have multiple classes with the same name but in different folders. The name space is defined at the top of the file and is usually the same as the folder name.

## Entity Framework

![alt text](ReadmeImg/image.png)

Entity Framework translates our C# code into SQL code. It is an Object-Relational Mapper (ORM) that allows developers to work with databases using .NET objects, eliminating the need for most of the data-access code that developers usually need to write. Entity Framework provides a set of tools and libraries that enable developers to interact with databases in a more intuitive and efficient way, using LINQ (Language Integrated Query) to query and manipulate data.
<br>

![alt text](ReadmeImg/image-1.png)
DBContext maintains the connection blw code and the database on our behalf. Provides methods to query and save data.
<br>

### Code without DBContext (EFCore)

![alt text](ReadmeImg/image2.png)

### Code with DBContext (EFCore)

![alt text](ReadmeImg/image3.png)

Along with these we also get modelling, querying, change tracking, saving, concurrency, transactions, caching, builtin conventions(reduces needs of configurations), and migrations(manage database schema, also incremental version control to database).

## Downloading Dependencies

With previously installed extension "NuGet" we should be able to see the NuGet option along side terminal, output ... options. From there browse microsoft.EntityFrameworkCore.Sqlite and select 9.0.4 version and add it to API.csproj via API.csproj name and add button shown to right.
<br>
Similarly add Microsoft.EntityFrameworkCore.Design 9.0.4 version to API.csproj.
This let us use the command line to create migrations and update the database.

## Setting up StoreContext

<br>
Now Right click on API in solution explorer and create new folder named Data to do data related codes.
<br>
In it create a new class called StoreContext.cs.
<br>

There we will create a constructor that takes in DbContextOptions<StoreContext> and passes it to the base class constructor. This allows us to configure the DbContext with options such as the database provider, connection string, and other settings.

Add storeContext to the constructor of the Program.cs file. This will allow us to use the StoreContext class in our application and access the database using Entity Framework Core.

```csharp
builder.Services.AddDbContext<StoreContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
```

<br>

## Setting up the connection string

### What is a Connection String?

A connection string is a specially formatted string of text that specifies how an application should connect to a database. It contains key-value pairs that define details such as the database type, location, authentication information, and other options required to establish the connection.

Go to appsettings.Development.json file and add the connection string to it. This will allow us to connect to the SQLite database using Entity Framework Core.

```json
{ ...,
  "ConnectionStrings": {
    "DefaultConnection": "Data source = store.db"
  }
}
```

## Setting up functionality for migrations

Now we need to create migrations. For that .Net sdk don't provide any tools by default. We need to install the tools first.
<br>
Go to browser and search dotnet nugets.
<br>
Ofen the pirst link provided and it will provide a command.

```cmd
dotnet tool install --global dotnet-ef --version 9.0.4
```

Again, run this in API directory.
<br>

Now we should stop the application to run command;

```cmd
dotnet ef
```

This command is used to run Entity Framework Core commands from the command line. It allows you to perform various tasks related to database migrations, such as creating new migrations, applying migrations to the database, and updating the database schema.
<br>
Now run following cmd

```cmd
dotnet ef migrations add InitialCreate -o Data/Migrations
```

This will create some classes that define the database schema based on entities/code we created so far.
Let the output classes be in separate folder called Migrations in data folder.
<br>
The generated files helps us to roll back to earlier migrations if needed.

### What is a Migration?

<br>
A database schema is a structured framework that defines the organization, structure, and constraints of data within a database. It acts as a blueprint for how the data is stored, accessed, and managed.
<br>
Migration refers to the structured and controlled way of updating, modifying, or transforming the database schema and sometimes data itself as part of the backend development process. It is a crucial aspect of maintaining a consistent and scalable backend.
<br>
Key Aspects of Migrations:

Schema Changes:
Adding, removing, or modifying tables, columns, indexes, and relationships.
<br>
Example: Adding a new column last_login to the users table.

Data Transformation:
Moving or transforming existing data to match the new schema.
<br>
Example: Splitting a single name column into first_name and last_name.

Version Control:
Migrations are often version-controlled to track changes over time.
<br>
Tools like Flyway, Liquibase, or ORM-based tools like Django Migrations (Python) and Sequelize (Node.js) are commonly used.

Rollback and Forward:
Migrations should be reversible to allow rolling back in case of errors.
<br>
Example: If a column is added and causes issues, it should be easy to remove it.

#### A Partial Class in C# is a special feature that allows you to split the definition of a single class, struct, or interface into multiple files. This is especially useful in large projects where a single class might have a lot of members (methods, properties, fields) and you want to organize the code for better readability and maintainability.

Initial Create migration file tells us what is going to happen if we run that migration.

```csharp
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          // create a table called Products if not already present
            migrationBuilder.CreateTable(
                name: "Products", // This convention was taken from  storeContext.cs file
                // This is the name of the DbSet that we created in storeContext.cs.
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    PictureUrl = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<long>(type: "INTEGER", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    Brand = table.Column<string>(type: "TEXT", nullable: false),
                    QuantityInStock = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
```

We have got 2 functions UP and Down. With up we create the table and with down we drop the table. This is useful when we want to roll back to an earlier migration.

### Applying the migration

```cmd
dotnet ef database update
```

This is gonna look at the migrations folder and apply the migration to the database. This will create the database and the table in it.
<br>

## Now build DbInitializer class

Context in .NET just means the “situation” or “environment” your code is running in. It’s like a box that holds all the information your code needs to do its job.
DbContext:When a new HTTP request arrives, ASP.NET Core:

The CreateScope() method in ASP.NET Core is used to create a temporary container for resolving scoped services.
<br>
Creates a new scope.
<br>
Instantiates the DbContext for that scope.

```csharp
var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
                ?? throw new InvalidOperationException("Failed to retrieve StoreContext service.");
```

scope.ServiceProvider: The service provider within the created scope.
<br>
GetRequiredService<StoreContext>(): Attempts to retrieve the StoreContext service.
<br>
If the service is not registered or not available, it throws an InvalidOperationException.

<br>
The controller uses this instance to perform database operations.
<br>
When the request ends, the scope is disposed, and the DbContext instance is also cleaned up.
Think of it as a helper that knows how to talk to your database. It keeps track of what data you’re working with and helps you save changes.
<br>
Scoping in ASP.NET Core refers to controlling the lifetime and visibility of services. It defines how long a service instance should live and where it should be available.
<br>
The CreateScope() method in ASP.NET Core is used to create a temporary container for resolving scoped services.
<br>

```csharp
void DbSet<Product>.AddRange(IEnumerable<Product> entities) (+ 1 overload)
```

Begins tracking the given entities, and any other reachable entities that are not already being tracked, in the EntityState.Added state such that they will be inserted into the database when `DbContext.SaveChanges()` is called.
<br>
Saves all changes made in this context to the database.
This method will automatically call Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.DetectChanges() to discover any changes to entity instances before saving to the underlying database.

#### SeedData method here does not depend on any instance-specific data and can be marked as static.

Now in the Program.cs file we need to add the following code before just before app.run() to call the SeedData method. This will ensure that the database is seeded with initial data when the application starts.

```csharp
DbInitializer.InitDb(app);
```

## Lets create the API controller

```csharp
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")] // http://localhost:5000/api/products
    [ApiController]
    public class ProductsController(StoreContext context) : ControllerBase
    {   // context is implicitly read-only and private
        // This is how we can use dependency injection in ASP.NET Core
        [HttpGet]
        public ActionResult<List<Product>> GetProducts()
        {
            return context.Products.ToList();
        }
        [HttpGet("{id}")] // http://localhost:5000/api/products/1
        public ActionResult<Product> GetProduct(int id)
        {
            var product = context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }
    }
}
```

### Asyncronizing for Scalability

```csharp
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")] // http://localhost:5000/api/products
    [ApiController]
    public class ProductsController(StoreContext context) : ControllerBase
    {   // context is implicitly read-only and private
        // This is how we can use dependency injection in ASP.NET Core
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await context.Products.ToListAsync();
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
    }
}
```

# Uploading to git

### prerequisites

- Create git account
- Install git bash
- Add username and email to git bash

```cmd
$ git config --global user.name "NarasimhaReddy2005"
$ git config --global user.email lakshminarasimhareddy2005@gmail.com
```

Using '+' symbol at the top right of terminal in vscode, open git bash.
Now go to project repository and run the following commands.

```cmd
$ dotnet new gitignore
```

This will create a .gitignore file in the project directory. This file is used to specify files and directories that should be ignored by Git when committing changes. It helps keep the repository clean by excluding unnecessary files, such as build artifacts, temporary files, and sensitive information.

We also better remove API/appsettings.json file from the repository. This file contains sensitive information such as connection strings and API keys, which should not be shared publicly. To do this, we can add the appsettings.json file to the .gitignore file.

We can do this using source control option in vscode. (In left navbar, click on the 3rd icon from top to open source control option)
<br>
Right click on appsettings.json file and select "add to gitignore". This will add the file to the .gitignore file and remove it from the repository.

### Committing changes

Click on commit changes icon in source control option.
Now it will ask for a commit message. Type in the message and click on check mark icon to commit the changes.
Before publishing branch, we need to create a new branch.

### Creating a new branch

Go to your git account
<br>
Click on the '+' icon next to branches and create a new branch.
Now it will ask for a branch name. Type in the name and click on create branch.
<br>
It will give commands including cmd to add remote origin.\
Run the command in git bash to add remote origin.

```cmd
$ git remote add origin <<your git repo link>>
```

Now we can proceed to publish the branch.

Done.
