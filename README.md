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

UseSqlite function is added to opt by microsoft.EntityFrameworkCore.Sqlite dependency. This function configures the DbContext to use SQLite as the database provider. It takes a connection string as a parameter, which specifies the location of the SQLite database file.
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

Defines a path to the database file. The Data source parameter specifies the location of the SQLite database file. In this case, it is set to store.db, which means the database file will be created in the same directory as the application. If you want to specify a different location, you can provide an absolute or relative path to the database file.
<br>

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

# Single Page Application (SPA)

### What is a Single Page Application (SPA)?

A Single Page Application (SPA) is a web application or website that interacts with the user by dynamically rewriting the current page, rather than loading entire new pages from the server. This approach allows for a more fluid and responsive user experience, similar to that of a desktop application.

## Basic React Elements

Components <br> Events <br> State <br> Virtual DOM (Document Object Model)

### How to interact with elements outside of React

#### Effects:

Effects are a way to perform side effects in functional components. They are used to handle things like data fetching, subscriptions, and manual DOM manipulations. Effects are executed after the component has rendered, allowing you to interact with the DOM or perform asynchronous operations.

Now to get info via API we first need to allow CORS (Cross-Origin Resource Sharing) in our API. This is a security feature that restricts web applications from making requests to a different domain than the one that served the web page. By enabling CORS, we allow our API to accept requests from different origins, such as our React application.
<br>
We need to two things: <br>

1. Add CORS to the services collection in Program.cs file.
2. Additional middleware to the HTTP request pipeline.

In Program.cs file, add the following code following services to enable CORS:

```csharp
builder.Services.AddCors();
```

Then right after building app in Program.cs file, add the following code to configure CORS:

```csharp
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000");
});
```

This code configures CORS to allow any header and any method from the specified origin (in this case, https://localhost:3000). This means that requests from this origin will be accepted by the API, while requests from other origins will be blocked.

Now since react usually run on http instead of https, we need to do some changes in vite configurations.
<br>
Open new terminal and go to client directory.

```cmd
npm install vite-plugin-mkcert -D
```

-D tells it is a development dependency and does not compile into production env.

Now go to vite.config.js file and add the following code:

```javascript
import mkcert from 'vite-plugin-mkcert';
...
plugins: [..., mkcert()],
```

Now we will get connection is secure in browser but still wont get any data.
To get data we need to restart the server.

If still not working try installing mkcert in your computer.
Make sure certificate is trusted.

```cmd
mkcert -install
```

This command installs the mkcert root CA in the system's trust store, allowing mkcert to create trusted certificates for local development.
<br>
Also make sure to run the following command in API folder to trust the certificate.

```cmd
dotnet dev-certs https --trust
```

Now we have to keep going with application.
<br> This is out app.tsx

```tsx
import { useState, useEffect } from "react";
import type { Product } from "../../product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // fetch returns Promise<Response>
    fetch("https://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  // When dependencies change useEffect will try to sync with external state of API

  const addProduct = () => {
    // rather than taking products obj directly, we let setProducts assign the latest state of products
    // which helps in scalability of code
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: "product" + (prevState.length + 1),
        price: prevState.length * 50 + 100,
        quantityInStock: 100,
        description: "test",
        pictureUrl: "https://picsum.photo/200",
        type: "test",
        brand: "test",
      },
    ]);
  };
  return (
    <>
      <h1 style={{ color: "green" }}>Store-App</h1>
      <ul>
        {products.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add product</button>
    </>
  );
}

export default App;
```

### What is a Promise?

A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It allows you to write asynchronous code in a more manageable way, avoiding callback hell and making it easier to handle errors.

Products.ts file... (we used JSON to TS tool in browser)

```tsx
export type Product = {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  price: number;
  type: string;
  brand: string;
  quantityInStock: number;
};
```

## Folder structure

Add folder named app.
Inside app folder create new folders named layout and models.
Move App.tsx, index.css file to layout folder and products.ts to models.

Also in SRC folder create new folder named features.

Now in features lets create a new folder with file with catalog/Catalog.tsx.

## Introduction to material UI

Material-UI is a popular React UI framework that provides a set of pre-designed components and styles based on Google's Material Design guidelines. It allows developers to create responsive and visually appealing user interfaces quickly and easily. Material-UI offers a wide range of components, such as buttons, forms, navigation, and more, along with built-in theming and customization options.

```bash
npm install @mui/material @emotion/react @emotion/styled
```

For fonts sake we need to pass libraries to main.tsx file.

```tsx
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
```

Images folder is kept in client side itself. We can use any image from internet or local machine.

# Routing in React

What is Routing?
Routing is the process of determining how an application responds to a client request for a specific endpoint, which is a URI (Uniform Resource Identifier) and a specific HTTP request method (GET, POST, PUT, DELETE, etc.). In web applications, routing is used to navigate between different views or components based on the URL.
<br>
We refer map of path and component as router.
We provide these routes via `<RouterProvider router={router} />` from any component in app.
<Outlet /> is used to render the child routes inside the parent route.

React dont come with routing by default. We need to install react-router-dom package to use routing in react.
<br>

```bash
npm install react-router-dom
```

Create a new folder named routes in app folder.
Inside routes folder create a new file named routes.tsx.

Now add routes in routes.tsx file.

```tsx
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/catalog", element: <Catalog /> },
      { path: "/catalog/:id", element: <ProductDetails /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
]);
```

<br>
Now in main.tsx file we need to replace app with routerProvider.

```tsx
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

<br>

So the app component is now triggered by the router (not directly).

Now in app.tsx instead of catalog component we keep the router outlet.
So this outlet will render the children via child routes inside the parent route.
That means based on url, the respective component will be rendered replacing the outlet.

```tsx
<Container maxWidth="xl" sx={{ mt: 12 }}>
  <Outlet />
</Container>
```

## Adding routing via web pages

<br>
Go to navbar component. Create a list named midlinks and rightlinks.

```tsx
const midlinks = [
  { title: "Home", path: "/" },
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];
const rightlinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];
```

Now we need to add these links to the navbar using Listitem component (from MUI).
React router package provides us with navlink component to navigate between pages.
It has 3 states: active, inactive, hover.
Pass this navlink to the list item component along with its props.
Navlink has 2 props: to and style.
<br>

```tsx
<List sx={{ display: "flex" }}>
  {rightlinks.map(({ title, path }) => (
    <ListItem
      component={NavLink}
      to={path}
      key={path}
      sx={{ color: "inherit", typography: "h7" }} // inherits from parent
    >
      {title.toUpperCase()}
    </ListItem>
  ))}
</List>
```

<br>

Now for shopping cart like button we need to add a badge to the cart icon.
<br>

```tsx
<Badge badgeContent="4" color="secondary">
  <ShoppingCart></ShoppingCart>
</Badge>
```

### Styling the navbar

Styling is bit tricky with MUI.
<br>

```tsx
<ListItem
  component={NavLink}
  to={path}
  key={path}
  sx={{
    color: "inherit",
    typography: "h7",
    textDecoration: "none",
    "&:hover": {
      color: "grey.500",
    },
    "&.active": {
      color: "secondary.main",
    },
  }} // inherits from parent
>
```

## Fetching an individual product from API

Using View Button in our cards as link to the product details page.
Give Link component from `react dom` not mui to Button component we used for View .
Pass the link using `to` prop.

```tsx
<Button component={Link} to={`/catalog/${product.id}`}>
  View
</Button>
```

IN ProductDetails component we need to get the id from the url.
useParams hook from react-router-dom will help us to get the id from the url.
Since we gave path like `/catalog/:id` in routes.tsx, we can get the id from the url using useParams hook.
But for id product may not exist in the database. So we need to handle that case as well.
We use union type for storing product or null.
<br>

```tsx
const { id } = useParams();
const [product, setProduct] = useState<Product | null>(null);
useEffect(() => {
  fetch(`https://localhost:5001/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => setProduct(data))
    .catch((error) => console.log(error));
}, [id]); // When id changes component reloads
```

## using grid and table to present product details

Using Grid we can seperate screen into rows (horizontal sections) and adding container to split into columns (vertial sections).
Each grid consists of 12 columns. So we can use the grid to split the screen into multiple sections.

For table we have to use TableContainer, Table, TableHead, TableRow, TableCell, TableBody components from MUI.

```tsx
<TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Property</TableCell>
        <TableCell>Value</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>{product.name}</TableCell>
      </TableRow>
      {/* Add more rows as needed */}
    </TableBody>
  </Table>
```

## COMMIT

# Redux - Global State Management

## What is Redux?

A store for application. Specifically for client side applications.
Accessable from any component in the application. One redux store per application.
We will get provider and some hooks to access the store.
<br>

### Reducer

A reducer is a pure function that takes the current state and an action as arguments and returns a new state. It is responsible for updating the state based on the action dispatched. Reducers are used in Redux to manage the state of the application in a predictable way.

Redux Flow
The flow of data in Redux is unidirectional, meaning that data flows in one direction. The flow can be summarized as follows:

1. Action: An action is dispatched to the store.
2. Reducer: The reducer receives the action and the current state, and returns a new state.
3. Store: The store updates its state with the new state returned by the reducer.
4. Component: The component re-renders with the new state.

All this is abstracted away from us by redux toolkit.

![alt text](ReadmeImg/image4.png)

##### Note: In picture above we start from action in component and come around back to component with new state + re-render.

### Best Practices

1. Don't try to mutate state. Create a clone instead and replace with original state.
2. Reducers must not have side effects. They should only return a new state based on the action and current state.
3. Do not have non-serialized values in state. Redux uses JSON.stringify to serialize the state, so non-serializable values will cause issues.
4. One store per application. This is a best practice to keep the state management simple and predictable.
5. Using Redux itself is best practice.

Redux has library called Redux Toolkit which is a set of tools and best practices for using Redux. It provides a simple and efficient way to manage the state of the application.

For #1 we use immer library which is a part of redux toolkit. It allows us to write mutable code that is converted to immutable code under the hood.

We have less boilerplate code to write with redux toolkit. It provides us with a set of functions to create actions, reducers, and selectors.

## Redux basics...

Sits anywhere in client app and can be accessed from any component.

### Install tool-kit

```bash
npm install @reduxjs/toolkit react-redux
```

In redux a small part of redux store is called slice.

For sake of Demo, let us create a .ts fil in features/contact folder called contactReducer.ts.

```tsx
export type CounterState = {
  data: number;
};

const initialState: CounterState = {
  data: 42,
};
export default function counterReducer(state = initialState) {
  return state;
}
```

Now we need to create a store. For that we need to create a new file in features folder called store.ts in src/app.

```tsx
import { legacy_createStore } from "@reduxjs/toolkit";
import counterReducer from "../../features/contact/counterReducer";

export function configureTheStore() {
  return legacy_createStore(counterReducer);
}
```

Now we need to provide the store to the application. For that we need to wrap the App component with Provider component from react-redux package.

Since we already wrapped it within routerProvider, we can wrap it with provider in main.tsx file.

```tsx
<Provider store={store}>
  <RouterProvider router={router} />
</Provider>
```

Now for store variable

```tsx
const store = configureTheStore();
console.log(store.getState());
```

This will log the initial state of the store to the console, which should be `{ data: 42 }` as defined in the initialState of the counterReducer.

Since we are experimenting in contact directory, we implement usage in contactPage.tsx.

```tsx
import { Typography } from "@mui/material";
import type { CounterState } from "./counterReducer";
import { useSelector } from "react-redux";

export default function ContactPage() {
  const data = useSelector((state: CounterState) => state.data);
  return (
    <>
      <Typography variant="h2">Content page</Typography>
      <Typography variant="body1">The data is: {data}</Typography>
    </>
  );
}
```

Now lets add an action of type string. Using that string we use switch action to return new state.
Since we are not using any tool kit, inorder to create state following best practice, we use spread operator. {...state} -> is itself a clone of state. If we specify data: state.data + 1, it will create a new object with data incremented by 1.

```tsx
return {
  ...state,
  data: state.data + 1,
};
```

Now we define a dispatch function to dispatch the action. We can use useDispatch hook from react-redux package to dispatch the action.

```tsx
const dispatch = useDispatch();

// return ...
<ButtonGroup>
  <Button onClick={() => dispatch({ type: "increment" })} color="secondary">
    Increment
  </Button>
  <Button onClick={() => dispatch({ type: "decrement" })} color="warning">
    Decrement
  </Button>
</ButtonGroup>;
/// ...
```

Done, we have creted a simple counter application using redux global state.

### Dispatcher

A dispatcher is a function that sends actions to the store. It is used to update the state of the application by dispatching actions. In Redux, the dispatcher is provided by the `useDispatch` hook from the `react-redux` package. It allows you to dispatch actions from your components to update the state in the store.
When dispatching an action, you can pass an object with a type property that describes the action being performed. This is how Redux knows which reducer to call to update the state.

### Redux action creators

Action creators are functions that create and return action objects. They are used to encapsulate the logic of creating actions, making it easier to manage and maintain the code. Action creators can take parameters and return an action object with a type and payload.

```tsx
// encapsulating action
export function incrementLegacy(amount = 1) {
  return {
    type: "increment",
    payload: amount,
  };
}
export function decrementLegacy(amount = 1) {
  return {
    type: "decrement",
    payload: amount,
  };
}
```

## Using tool kit

We have a global store that can be sliced for different features of the application.
We can use createSlice function from @reduxjs/toolkit package to create a slice of the store. It will automatically generate action creators and reducers for us.

```tsx
const initialState: CounterState = {
  data: 42,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.data += action.payload;
    },
    decrement: (state, action) => {
      state.data -= action.payload;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
```

In Redux Toolkit (RTK), yes — actions created using createAction or createSlice do have a payload attribute by default.

Since we created a slice lets go to store.ts file and apply the slice configurations. We just need to give reducer function to the store configuration.

```tsx
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
```

Just configure reducer in seperate file and import it in store using `configStore` function.

Now we need to change state in useSlector hook in contactPage.tsx file for the new slice.
Along with it let's `define typed hooks` for useSelector and useDispatch to avoid type errors.
According to redux dev in store.ts:

```tsx
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

This gives us a better type safety and autocompletion in our components.

Now instead of using useSelector and useDispatch from react-redux, we will use our own hooks.
To get data we simply need to do the following in ContactPage.tsx file:

```tsx
const { data } = useAppSelector((state) => state.counter);
const dispatch = useAppDispatch();
```

`state => state.counter` Here, state is the whole store, and state.counter accesses the counter slice.
From that we are destructuring using {} to get data property.

Also in reducer

```tsx
export const { increment, decrement } = counterSlice.actions;
```

Destructures actions that are automatically generated by createSlice.
Now we can use these actions in our component to dispatch actions.

```tsx
dispatch(increment(1));
```

## Redux dev kit

Install Redux DevTools Extension in chrome to monitor the state of the application in real-time.

Now using it we can check what and all actions are dispatched and what is the state of the application at any point in time.
Also we can do time travel debugging, which means we can go back to any previous state of the application and see how the state has changed over time.
Plus we also have a play action feature which allows us to replay the actions that were dispatched in the application.

## RTK Query

"Redusers must not have side effects. They should only return a new state based on the action and current state."
RTK Query is a powerful data fetching and caching library that is part of Redux Toolkit. It simplifies the process of making API requests, managing server state, and caching responses. RTK Query provides a set of tools to define endpoints, fetch data, and automatically handle caching, invalidation, and re-fetching.
Redux is synchronous store.

### Thunks

However, api calls are asynchronous. To handle this, we use thunk, which is a function returned by another function and can be executed later. It allows action creators to return a function instead of an action object. This function can then perform asynchronous operations, such as API calls, and dispatch actions based on the result.

We now need thunk creators and extra reducers. This would add new boilerplate code to the application which can be huge.
To avoid this, we can use RTK Query which provides a simple way to define endpoints and fetch data without writing extra code.

#### Other benifits of RTK Query include:

- Inbuilt data fetching and caching:
  Otherwise, we need to use libraries like axios or fetch to make API calls and update redux store manually.
- Typescript support:
  RTK Query provides built-in TypeScript support, making it easier to work with APIs and ensuring type safety.
- Optimistic updates:
  RTK Query allows you to optimistically update the UI while waiting for a response from the server, providing a smoother user experience. It also handels rollbacks if the request fails.
- Automating caching:
  RTK Query automatically caches responses and manages cache invalidation, reducing the need for manual cache management.
- Server state focused:
  RTK Query is designed to handle server state, making it easier to manage data fetched from APIs and keeping the UI in sync with the server.

In manual way we need to create an API service file, define endpoints, create actions, and reducers to handle the API responses. This can be time-consuming and error-prone, especially for larger applications with multiple API endpoints.

For this demo lets use Catalog.
For this lets create a new file in Catalog folder named catalogApi.ts.

```tsx
import { createApi } from "@reduxjs/toolkit/query/react";
```

Be cautious about importing from react, not from redux.

```tsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/Models/product";

export const catalogAPI = createApi({
  reducerPath: "catalogAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5001/api" }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({
      query: () => ({ url: "products" }),
    }),
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => `products/${productId}`,
    }),
  }),
});

export const { useFetchProductDetailsQuery, useFetchProductsQuery } =
  catalogAPI;
```

Endpoints are functions that define how to fetch data from the API. They are created using the `builder.query` method, which takes a type parameter for the response data and an object with a `query` function that returns the API endpoint URL.

Normally, JavaScript thinks curly braces {} mean a function body, not an object.

So if you wrote:<br>
`() => { url: 'abc' }  // ❌ Wrong!`
It would be interpreted as a function with a block, and url: 'abc' is treated as a label, not an object.

To make it return an object directly, you must wrap the object in parentheses:<br>
`() => ({ url: 'abc' })  // ✅ Correct!`

### What's builder and query?

In the context of RTK Query, `builder` is an object that provides methods to define endpoints for your API. It allows you to create queries and mutations for fetching and modifying data.
we get several methods from builder, such as `query`, `mutation`, and `subscription`. These methods are used to define how to interact with the API.
<br>
Query: Used to fetch data from the API. <br>
For builder.query we need to pass `result type` parameter and `query args` parameter.

We wil automatically get hooks for these queries like useFetch, useLazyFetch for all endpoints mentioned.

##### From where we can get reducers and how are they created?

In the `createApi` function, we specified a `reducerPath`, which is the key under which the API slice will be stored in the Redux store. This is where the RTK Query reducers will be added.<br>
The `createApi` function automatically generates the necessary reducers and actions for the defined endpoints. These reducers are responsible for managing the state of the API data, including caching, loading states, and error handling.

### Adding reducers to the store

Now we need to add reducers to the store. For that we need to import the `catalogAPI` in store.ts file and add it to the reducer object using key 'catalogAPI.reducerPath'.

```tsx
reducer: {
        [catalogAPI.reducerPath]: catalogAPI.reducer,
        ...otherReducers
},
```

Also we need to add the `catalogAPI.middleware` to the store using `getDefaultMiddleware` function which is a default function provided by Redux Toolkit to get the default middleware for the store. This is necessary for RTK Query to work properly, as it handles caching, invalidation, and other features automatically.
It will automatically add the necessary middleware for RTK Query to work properly with API.

```tsx
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(catalogAPI.middleware);
```

Now we can remove useState, useEffect etc from ProductDetails.tsx and Catalog.tsx files and use the hooks generated by RTK Query to fetch data from the API.

### Using the generated hooks

Back into Catalog.tsx file, we can use the `useFetchProductsQuery` hook to fetch the products from the API.

Instead of the following code:

```tsx
const [products, setProducts] = useState<Product[]>([]);
useEffect(() => {
  // fetch returns Promise<Response>
  fetch("https://localhost:5001/api/products")
    .then((response) => response.json())
    .then((data) => setProducts(data));
}, []);
```

We can use the generated hook like this:

```tsx
const { data, isLoading } = useFetchProductsQuery(); // data = products
if (isLoading || !data) return <h3>Loading...</h3>; //!data ensures that data is fetched before implementing the code of products.map ...
```

Additionally, previously using useEffect we can see that data is fetched 2 times. But with RTK Query, it will only fetch data once and cache it for future use. This means that if the same data is requested again, it will be returned from the cache instead of making another API call.

##### Now we can see loading in initial render and then products are displayed. Later on whild navigating to the page, it will not show loading again as data is cached.

Now lets do the same for ProductDetails.tsx file.

```tsx
const { id } = useParams(); // Type is string | undefined (since it comes from the URL we can't
// guarantee that it will always be defined)

const { data: product, isLoading } = useFetchProductDetailsQuery(
  id ? parseInt(id) : 0
);

if (!product || isLoading) return <div>Loading...</div>;
```

By the way `useParams()` is a React Router hook that lets you access the dynamic parts of the URL (called route parameters).

Suppose we have a route like this `<Route path="/user/:id" element={<UserPage />} />`.
Then, if the URL is `/user/123`, `useParams()` will return an object like `{ id: '123' }`. With type string | undefined. Since our `useFetchProductDetailsQuery` expects a number, we need to convert it using `parseInt(id)` or 0 in case of undefined object.

### Introducing fake delay to highlight loading + Custom base Query

In app folder, create a new directory named `api/baseAPI.ts` to simulate a delay in API response. This is useful for testing loading states in your application.

```tsx
import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:5001/api",
});

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  await sleep();
  const results = await customBaseQuery(args, api, extraOptions);
  if (results.error) {
    const { status, data } = results.error;
    console.log({ status, data });
  }
  return results;
};
```

Here `customBaseQuery` is a function that fetches data from the API using the `fetchBaseQuery` function from RTK Query. It takes the API endpoint as an argument and returns a promise that resolves to the response data.
It is given a base URL of the API, which is used to construct the full URL for the request. Thus we now only need to give the base of url here itself.<br>
Next we have sleep function that returns a promise that resolves after 1 second. This is used to simulate a delay in the API response.

Finally, we have `baseQueryWithErrorHandling` function that takes the API endpoint, BaseQueryApi, and extra options as arguments. It first waits for the sleep function to resolve, then calls the customBaseQuery function to fetch data from the API. If there is an error, it logs the status and data of the error to the console. Otherwise, it returns the results of the API call.

What are args, api, and extraOptions?

- `args`: This is the API endpoint or request parameters that you want to fetch data from or send data to. It can be a string representing the URL or an object containing the request options.
- `api`: This is an object that contains information about the current state of the API, such as the current request, response, and error.
- `extraOptions`: This is an object that contains any additional options you want to pass to the API call, such as headers or query parameters.

Now we are gonna use this `baseQueryWithErrorHandling` in our `catalogApi.ts` file.
Instead of:

```tsx
baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5001/api" }),
```

do this:

```tsx
baseQuery: baseQueryWithErrorHandling,
```

### Adding a common loading state and loading indications

Since this is something related to UI, lets create a new uiSlice in layout folder. Also it is not going to be asyncronous.
<br>Lets create a simple slice with a boolean state named `loading` and actions to set and unset the loading state. Then configure the store to include this slice.

Now use this to start and stop loadings in baseQueryWithErrorHandling function in baseAPI.

```tsx
api.dispatch(startLoading()); // start loading
await sleep();
const results = await customBaseQuery(args, api, extraOptions);
api.dispatch(stopLoading);
```

Note that api argument is passed to the baseQueryWithErrorHandling function, which gives access to the Redux store and allows us to dispatch actions to update the loading state.
Who is passing this api argument?
The `baseQueryWithErrorHandling` function is called by RTK Query internally, and it automatically passes the `api` argument to the function when it is invoked. This is how RTK Query provides access to the Redux store and allows you to dispatch actions from within the base query function.

#### Lets add a loading indicator to the UI.

From MUI we can use linear progress component to show loading state.
In Navbar component, we can use the `useAppSelector` hook to get the loading state from the UI slice and conditionally render the LinearProgress component.

Then at bottom of the Navbar component, we can add the LinearProgress component like this:

```tsx
...after toolbar
{isLoading && (
        <Box>
          <LinearProgress color ="success" />
        </Box>
      )}
...just before end of app bar
```

### Finally making dark and light modes persistent

We need to store the theme mode outside of the component so that it persists across page reloads. We can use localStorage to achieve this. One such place is our browser storage. There in we can have key and value pairs. We can see them from `application` tab in dev tools.

Go to App.tsx.
To get what's in localStorage do this:

```tsx
const getInitialDarkMode = () => {
  const storedDarkMode = localStorage.getItem("darkMode");
  return storedDarkMode ? JSON.parse(storedDarkMode) : true; // browser use JSON
};
```

Next we also need to toggle according to change of modes by user or any other.
So we just add the following line in original toggle function:

```tsx
const themeToggle = () => {
  localStorage.setItem("darkMode", JSON.stringify(!darkMode)); // this line
  setDarkMode(!darkMode);
};
```

We keep it above setDarkMode so that it is executed before the state is updated (Avoiding timing BUG).

Now lets remove useState and use useAppSelector and useAppDispatch hooks to get the darkMode state and dispatch the toggle action.
<br> First up lets move the entire getInitialDarkMode function to the uiSlice.ts file in layout folder.
Then add darkMode variable to the initialState of the uiSlice. Now all we need is some reducer functions.

```tsx
setDarkMode: (state) => {
  localStorage.setItem("darkMode", JSON.stringify(!state.darkMode)); // store in browser
  state.darkMode = !state.darkMode; // toggle dark mode
};
```

Now we got toggle functionality into the uiSlice. So we can cleanup the App.tsx file.
It includes removing toggle function and useState for darkMode. Stop passing them to navbar component.
Add useAppSelector and useAppDispatch hooks to get the darkMode state and dispatch the toggle action.
Get the darkMode variable from the uiSlice state using useAppSelector hook.

Inside Navbar we can remove props we are passing in and use the useAppSelector hook to get the darkMode state. To toggle we can use the useAppDispatch hook to dispatch the toggle action.

```tsx
<IconButton onClick={() => dispatch(setDarkMode())}>
  {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
</IconButton>
```

# Error Handling

-Error handling and exceptions
-Middleware
-HTTP response errors
-Client side errors

We need to send information of any exception to the client so user know something went wrong. We use middleware for this whish resides in program.cs file.

First up we are going to use exception handler middleware to catch any unhandled exceptions and log them to the console. We exceptions happen in http request pipeline there are several middleware that can catch them and thrown up the middleware tree until it reaches the exception handler middleware.

Middleware pipeline: starts wit request going through the middleware all the way the following in order and backwards in reverse order giving response:
-Exception handler
-Routing
-CORS
-Authentication
-Authorization
-Endpoint

Here are few ranges of responses indicating the status of the request:
200 Range: Ok
300 Range: Redirection
400 Range: Client Error
500 Range: Server Error

## Creating a controller that has endpoints just to return error responses

### !! Back to server side !!

In MVC view basically is html sent in response to the client.

Create a new controller - BaseApiController.cs
We will get a boilerplate code for the controller. We will use this controller to return error responses.

### [Route("api/[controller]")]

This is a Route Attribute, used to define the base route for the controller.

- Route(...) tells ASP.NET Core how to map HTTP requests to this controller.<br>
- `api/[controller]` is a placeholder route.

- `[controller]` is a token that gets replaced at runtime with the controller's class name without the "Controller" suffix.<br>
- In this case, class name is BaseApiController, so [controller] becomes baseapi (case-insensitive by convention).

- Full route becomes: api/baseapi

### [ApiController]

This is an attribute that:

- Marks the class as an API controller.
- Enables automatic model validation, binding source inference, and 400 Bad Request responses on validation failures.
- This attribute is required to use many of the "Web API" features of ASP.NET Core (like [FromBody], [FromQuery], etc., without explicitly specifying them).

[Something] is shorthand for using an attribute class named SomethingAttribute.
The square brackets [] are used to apply the attribute.

### Coming back

We want to centralize api error handling in this controller. So we make this as base controller for all other controllers i.e., we make them inherit from this controller.

Now lets create a new class for all end points:

```csharp
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
```

To check the endpoints we can use Postman and check for {{url}}/api/buggy/not-found, {{url}}/api/buggy/bad-request, etc. Url is the base url of the API given as global variable in Postman.

## Getting the needed part of server error (Exception)

In mordern versions of .net we have hidden 'app.UseDeveloperExceptionPage()' middleware.<br>
This middleware is used to display detailed error information in the browser when an unhandled exception occurs during the request processing pipeline. It is typically used in development environments to help developers diagnose and fix issues in their code.<br>
It is not recommended to use this middleware in production environments, as it can expose sensitive information about the application and its configuration.

Thus we need to create a custom middleware to handle exceptions and return a standardized error response and override the default exception handling behavior.

Plus we can send problem details in JSON format for easy usage to display on client side.

## Middleware (Middleware Pipeline)

Exception handling middleware will be at starting so that when any exception is thrown we will finally get back to here.
![alt text](ReadmeImg/image5.png)

Create a new folder `Middleware` to keep this. As mentioned first lets create an exception middleware.
<br>
ASP.Net provides an interface and using quick fix we can get snippet.

```csharp
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
        throw new NotImplementedException();
    }
}

```

Injecting env: Supplying environment variables to a program
Environment: Key-value settings affecting a process

- Keeps config out of code (no hardcoded secrets)

HttpContext is an object that holds all the information about a single HTTP request and response in a web application. It includes request, response, user, session, items, and connection.

Here is our HandleException Implementation

```csharp

    private async Task HandleException(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message); // logs exception into stacktrace
        context.Response.ContentType = "application/json"; // response returned as JSON
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; // Getting status code

        var response = new ProblemDetails
        {
            Status = 500, // Specially for Exceptions (Server side) since this is reached after error in inside oprations
            Detail = env.IsDevelopment() ? ex.StackTrace?.ToString() : null, //Stacktrace can be null
            Title = ex.Message
        };
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }; // since we use it
        var json = JsonSerializer.Serialize(response, options);

        await context.Response.WriteAsync(json); //Sends the JSON error response back to the client.
    }
```

#### NOTE:

Now this middle ware has to be declared as a service in program.cs file even though we are implementing IMiddleware, because we are triying to injecting env and logger and we can only inject if it is a service.

#### How are we doing it

Scoped means service is created when requested and stays for entirity of request
Transient means service is created and used where it is needed and then disposed
Other is singleton => Service created and start of application and stops with application

```csharp
builder.Services.AddTransient<ExceptionMiddleware>();
```

Must be right after building app so any exception will be caught

```csharp
app.UseMiddleware<ExceptionMiddleware>();
```

All we are doing here is displaying error.

### Back to Client Side

Writing error handling demo in about page.

```ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseAPI";

export const errorApi = createApi({
  reducerPath: "errorApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    get400Error: builder.query<void, void>({
      query: () => ({ url: "buggy/bad-request" }),
    }),
    get401Error: builder.query<void, void>({
      query: () => ({ url: "buggy/unauthorized" }),
    }),
    get404Error: builder.query<void, void>({
      query: () => ({ url: "buggy/not-found" }),
    }),
    get500Error: builder.query<void, void>({
      query: () => ({ url: "buggy/server-error" }),
    }),
    getValidationError: builder.query<void, void>({
      query: () => ({ url: "buggy/validation-error" }),
    }),
  }),
});

export const {
  useLazyGet400ErrorQuery,
  useGet401ErrorQuery,
  useLazyGet404ErrorQuery,
  useGet500ErrorQuery,
  useLazyGetValidationErrorQuery,
} = errorApi;
```

Add this to store.

## Creating a component to test API response errors

(In aboutPage.tsx)

Create button for each hook to test this.
For each error to be notified we use `NPM Toastify` to notify errors to user.

<a>https://www.npmjs.com/package/react-toastify</a>

In client folder

```bash
$ npm install --save react-toastify
```

To use it anywhere in application we need to add it to main.tsx

```tsx
<StrictMode>
  <Provider store={store}>
    <ToastContainer position="bottom-right" theme="coloured" />
    <RouterProvider router={router} />
  </Provider>
</StrictMode>
```

Also we need to check in npm modules for react-toastify/dist/ReactToastify.css and import it to main.tsx.

Now in baseAPI instead of just printing error to console, lets add a switch to display.
for adding tosts we simply do this:

```ts
if (results.error) {
  const { status, data } = results.error;
  console.log(results.error);
  switch (status) {
    case 400:
      toast.error(data.title);
      break;
    case 401:
      toast.error(data.title);
      break;
    default:
      break;
  }
}
```

Now check 401 button, and it works. But 400 don't. This's because it has folling format:

```console
{status: 'PARSING_ERROR',
originalStatus: 400,
data: 'This is not a good request',
error: `SyntaxError: Unexpected token 'T', "This is no"... is not valid JSON`}
```

We got a PARSING_ERROR since RTK Query uses JSON and we are returning formatting response as text.

But we still have original status, so we can use combanation of that number and data to get result...

```ts
const originalStatus =
  results.error.status === "PARSING_ERROR" && results.error.originalStatus
    ? results.error.originalStatus
    : results.error.status;
console.log(originalStatus);
const responseData = results.error.data;
switch (originalStatus) {
  case 400:
    toast.error(responseData as string);
    break;
  case 401:
    toast.error(responseData.title);
    break;
  default:
    break;
}
```

It works but we have to deal with typescript error norms near responseData.title. This is because type script does not know what is comming in with responseData. So we look at log again so that we can define a type for it and specify what it could be and depending on type how to handle that thing. We call it `type gaurd`.

Looking at all 5 types we get following types:

```ts
type ErrorResponse = string | { title: string } | { errors: string[] };
```

Plus for 401 error and 500.

```ts
if (typeof responseData === "object" && "title" in responseData)
  toast.error(responseData.title);
```

Type script shows error for title otherwise.<br>
For 400 and vaidation error

```tsx
case 400:
if (typeof responseData === "string") toast.error(responseData);
else if ("errors" in responseData) {
  toast.error("Validation error");
} else toast.error(responseData.title);
break;
```

For 404 data is null

```tsx
case 404:
  if (responseData === null) toast.error("Not found");
  break;
```

### Validation error

Instead of just say that it is validation error lets throw an error objects.

```tsx
throw Object.values(responseData.errors).flat().join(", ");
```

Here values are extracted from key value pairs and are then made into an array (flat), which are joined with ', '. This is thrown here and caught in `AboutPage.tsx` where it is logged into console.
<br> But if we look in web console we can see that this error is coming from `page bundle` instead of our `AboutPage` component which is not what we want. So in AboutPage.tsx we will `unwrap` trigerValidationError's return in Aboutpage itself.
<br> Now we gotcha make errors iteratable again. So in AboutPage lets create a asynchronous helper function since errors are asynchronus in nature and we had the error line in error.message.

```tsx
const getValidationError = async () => {
  try {
    await triggerValidationError().unwrap();
  } catch (error: any) {
    const errorArray = error.message.split(", ");
    console.log(errorArray);
  }
};
```

The any keyword in TypeScript is a special type that effectively opts out of type checking for a variable. It tells the compiler:
<br>
"Trust me, I know what I'm doing."

But since it is better to give a type instead. We change it to unknown and we will now get error at error in `error.message.split(", ")`. So we again need to keep typegaurd here.

To remove it we wrap spliting and logging into following if condition:

```tsx
if (error && typeof error === "object" && "message" in error)
```

Now new error pops that 'error.message' is unknown. So we need add the following to if condition:

```tsx
typeof (error as { message: unknown }).message === "string";
```

| Part                                      | Explanation                                                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `error as { message: unknown }`           | You’re telling TypeScript to treat `error` as an object that has a `message` property of type `unknown` |
| `(error as { message: unknown }).message` | Accessing the `message` property after casting                                                          |
| `typeof ... === "string"`                 | Checks if the type of `message` at runtime is a string                                                  |

Also we need to tell Type script to treet error as an object having message attribute of type string.
<br>
Finally the code block looks like this:

```tsx
const getValidationError = async () => {
  try {
    await triggerValidationError().unwrap();
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message: unknown }).message === "string"
    ) {
      const errorArray = (error as { message: string }).message.split(", ");
      console.log(errorArray);
    }
  }
};
```

#### Why not simply throwing entire error.messages object??

Yes, you absolutely can throw an object in JavaScript or TypeScript — and it's valid syntax.

⚠️ BUT — Why It’s Not Recommended
Although valid, throwing a plain object instead of an Error instance breaks standard error handling:

- Stack traces are missing or unclear
- IDE/debugger tools work better with Error objects
- Some tools assume errors are instanceof Error

Lets display them directly to user. For instance we can use useState.

```tsx
const [validationErrors, setValidationErrors] = useState<string[]>([]);

{
  validationErrors.length > 0 && (
    <Alert severity="error">
      <AlertTitle>Validation errors</AlertTitle>
      <List>
        {validationErrors.map((err) => (
          <ListItem key={err}>{err}</ListItem>
        ))}
      </List>
    </Alert>
  );
}
```

## Redirecting error into seperate component (instead of toast)

Inside app folder lets create new folder/file errors. Instead of toasting 500 error, we navigate to ServerError.tsx using router. It allows us to pass states to the navigated component through second parameter.

```tsx
  case 500:
    if (typeof responseData === "object")
      router.navigate('/server-error', {state: {error: responseData}})
    break;
```

Then add route to Routes.tsx. For displying error ServerError.tsx lools like this

```tsx
import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const ServerError = () => {
  const { state } = useLocation();

  return (
    <Paper>
      {state.error ? (
        <>
          <Typography
            gutterBottom
            variant="h3"
            sx={{ px: 4, pt: 2 }}
            color="secondary"
          >
            {state.error.title}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ p: 4 }}>
            {state.error.detail}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server error
        </Typography>
      )}
    </Paper>
  );
};

export default ServerError;
```

#### NOTE:

If your backend is something like ASP.NET Core, Django, Flask, etc., and a 500 Internal Server Error happens, the error response might look like:

```json
{
  "title": "Internal Server Error",
  "detail": "An unexpected error occurred on the server."
}
```

So in your frontend (RTK Query):

```tsx
results.error.data = {
  title: "Internal Server Error",
  detail: "An unexpected error occurred on the server.",
};
```

And then:

```tsx
const responseData = results.error.data as ErrorResponse;
```

So when passed in `router.navigate('/server-error', {state: {error: responseData}})` it still ha details in it. Which is what we had in here (ServerError):

```tsx
<Typography variant="body1" sx={{ p: 4 }}>
  {state.error.detail}
</Typography>
```

### Not Found error component

```tsx
import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Paper
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center ",
        p: 6, //padding
      }}
    >
      <SearchOff sx={{ fontSize: 100 }} color="primary" />
      <Typography gutterBottom variant="h3">
        Oops! we could not find what you were looking for
      </Typography>
      <Button fullWidth component={Link} to="/catalog">
        Go back to shop
      </Button>
    </Paper>
  );
};

export default NotFound;
```

By setting `component={Link}`, you're telling the button to behave like a React Router <Link />.
`to="/catalog" `defines the route to navigate to.

We do this for every component not present including any route. So along with NotFound component's route we will add following at bottom of paths list, to go to not found page on no available route.

```tsx
{ path: "*", element: <Navigate replace to="/not-found" /> },
```

Where Navigate is react-dom-element that redirects to given link.

Also replace toast to route to NotFound element.

```tsx
if (responseData === null) router.navigate("/not-found");
```

## Setting Up Debugger in vscode

launch C# debug file:

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "C#: API Debug",
      "type": "dotnet",
      "request": "launch",
      "projectPath": "${workspaceFolder}/API.csproj"
    },
    {
      "name": ".NET Core Attach",
      "type": "coreclr",
      "request": "attach"
    }
  ]
}
```

Attach C#: API Debugger to debugging session.
Our running process is API.exe.

#### What's ModelState

In React (especially in UI libraries like Material UI or apps using Redux), when you hear “mode state”, it generally refers to a piece of state that tracks the current UI mode or application behavior mode.

Also added server not found error. For this we added if condition outside the switch:

```tsx
if (results.error.status === "FETCH_ERROR") {
  router.navigate("/server-not-found");
  return results;
}
```

# Adding the shopping cart feature

## Where we store the data of cart?

### Localstorage? Nope...

Pros: Simplest, Persistant, Easily accessable, Works offline
Cons: Server unaware, Limited storage, Security Risks

### Database? Yep...

Pros: Persistent, Secure, Scalable, Analytics (to Marketing team), Event type behavior.
Cons: Complexity, Server Load, Online only.

### Cookies? Nope...

Pros: Server side access, controlled persistance (period of existance)
Cons: Far les storage (4 kb), Performance impact (sends every update back and forward to server)

## Entity Framework Relationships

`Basket`---Has many--->`Items` (One to many relationship)<br>
`BasketItem`---Has one--->`Product` (one to one relationship)

## Create Basket.cs

We will initially have `Id` for basket, a cookie `basketId` and a list `Items` of `BasketItems`.<br>
For basket items we have another id, Quantity of items, and one to one relationship (navigation) with products.

A cookie is a small piece of data stored in the user's browser by a website.

It helps the website remember information about the user across sessions or page visits — such as login status, preferences, or tracking activity.

Basket

```tsx
namespace API.Entities;

public class Basket
{
    public int Id { get; set; }
    public required string BasketId { get; set; } // cookie in users browser
    // we can use this to persist items in user's basket
    public List<BasketItem> Items { get; set; } = [];
}
```

BasketItem

```tsx
namespace API.Entities;

public class BasketItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }

    // navigation properties
    public int ProductId { get; set; }
    public required Product Product { get; set; }

}
```

Add and remove functionalities:

```tsx
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
```

Here we are not doing anything with database. We have memory in Entity Framework and Entity Frame work tracks state of this object until we call a save changes method.

## updating DbContext

We already habe a products DbSet. Now lets create another DbSet in StoreContext for Basket.

Now lets stop Dotnet build and add migrations: BasketEntityAdded.

```bash
dotnet ef migrations add BasketEntityAdded
```

We now got new migrations folder `BasketEntityAdded`. Then EF looks in StoreContext.cs (because it inherits dbContext) and when found new DbSet it will procced to create migration for it.

Look at this in Basket Migration:

```tsx
// in migrationBuilder.CreateTable
 name: "BasketItem",
columns: table => new
{
    Id = table.Column<int>(type: "INTEGER", nullable: false)
        .Annotation("Sqlite:Autoincrement", true),
    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
    ProductId = table.Column<int>(type: "INTEGER", nullable: false),
    BasketId = table.Column<int>(type: "INTEGER", nullable: true) // not good we don't want bucketId Null
},
constraints: table =>
{
  // We have relation b/w BasketItem and (product, basket) tables
  table.PrimaryKey("PK_BasketItem", x => x.Id);
  table.ForeignKey(
      name: "FK_BasketItem_Baskets_BasketId",
      column: x => x.BasketId,
      principalTable: "Baskets",
      principalColumn: "Id");
  table.ForeignKey(
      name: "FK_BasketItem_Products_ProductId",
      column: x => x.ProductId,
      principalTable: "Products",
      principalColumn: "Id",
      onDelete: ReferentialAction.Cascade);
});
```

### Tweeks Needed

First up we don't want BucketId "NULL". If it is then if there are basketItems inside it, it's just pointless.<br>
Here we can see relation b/w BasketItem and Products we have a `Cascade` delete behavior that when product is removed. <br>

- Cascade ensures tha all children are removed when parent is removed ensuring no orphaned nodes or unreachable objects that may waste space.
- But we can't see it b/w basket and basketItem. Infact there is no delete operation for Basket item and if basket is removed, basketItems will be left as orphans.

#### One way of doing this

We create an override method called OnModelCreating and we can configure entities and relations in it.

#### For now

We gonna use conventions.

The [Table("BasketItems")] attribute in C# (specifically in Entity Framework) tells the ORM (Object-Relational Mapper):

👉 “Map this C# class to a database table named BasketItems.”

Since BasketId is compulsory to BasketItem we will add BasketId and required Basket props to make sure next time we create migration it won't make table that will let BasketItems orphaned.

But, if we make it required, we need to give basket attribute to Items we add in Basket.cs with some value. Which wont work in this case.
So we are gonna remove required property and keep basket initialized to null in BasketItem.cs. Again this will throw error because of Nulable reference type settings. so we add ! to null `null!` to over ride it. This is solution to this case.

Now we undo and redo migration.<br>
CAUTION: we can only apply `ef migrations remove` if no changes are applied to data base.

## Creating Basket Controller

Should allow to create, modify, retrieve the basket.
<br> Getting Basket.

```tsx
var basket = await context.Baskets.Include((x) => x.Items)
  .ThenInclude((x) => x.Product)
  .FirstOrDefaultAsync((x) => x.BasketId == Request.Cookies["basketId"]);
```

We want some things to be included, Thus we use include for eager loading to include related entities, which is provided by ef. And we use FirstOrDefault to fetch first basket that matches id of basketId from userside obtained using cookie and null otherwise.

### 🍪 What is a Cookie?

A cookie is a small piece of data that a server sends to the user's browser. The browser stores it and sends it back with future requests to the same server.

If basket is null we will return no-content signal (204 status signal) else return basket.

Other functionalities...

```tsx
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<Basket>> GetBasket()
    {
        var basket = await context.Baskets
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);

        if (basket == null) return NoContent();
        return basket;
    }
    [HttpPost] // sends request to server
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {
        // get basket from database
        // else create basket
        // get product
        // add item to basket
        // save changes

        return StatusCode(201); // represents an "created" response.
    }
    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        // get basket
        // remove the item or reduce its quantity
        // save changes
        return Ok();
    }
}
```

Get basket is common in both so let's create get basket function.

```tsx
private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
    }
```

For basketId in create Basket we use Guid. A GUID (also called UUID) is a 128-bit number used to uniquely identify something — such as an object, user, session, file, etc. — across systems without duplication.

```tsx
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
```

```tsx
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
      {
          basket.AddItem(product, quantity);
      }
      else
      {
          return BadRequest("Problem creating basket");
      }
      // save changes
      var result = await context.SaveChangesAsync(); // includes failure checks and roll back
      // returns no of changes
      if (result > 0) return CreatedAtAction(nameof(GetBasket), basket);
      // CreatedAtAction returns 201 response (indicating entity created)
      // sends location header of basket to GetBasket function

      return BadRequest("Problem updating basket");
  }
```

`CreatedAtAction` — ASP.NET Core Function (C#):<br>
In ASP.NET Core Web API, the CreatedAtAction method is used to return a 201 Created response along with a Location header that points to a newly created resource.

- Indicates a resource was successfully created.
- Includes a route to access the newly created resource (via Location header).
- Typically used in POST endpoints.

Using postman, request a get request for basket. Since no basket is initialized it sends 204 no content signal. API: `{{url}}/api/basket`.

API request to add content to basket: `{{url}}/api/basket?productId=2&quantity=1` <br>
We have to match variables in req with parameters of 'AddItemstoBasket' function. Then API controler automatically binds to them. It checks parameters of functions and if matches it binds.

The following attribute `[APIController]` was the reason we get all these.

If another action method in the same controller has the same attributr ([same this]) attribute and matches the same route, then you have a routing conflict, and the framework won't know which method to invoke.

### Solution: Disambiguate with [Route] or parameter sources

Option 1: Different routes

```tsx
[HttpPost("add-item")]
public IActionResult AddItemsToBasket(int productId, int quantity) { ... }

[HttpPost("add-coupon")]
public IActionResult AddCoupon(string code) { ... }
```

Now:
`POST /api/basket/add-item?productId=2&quantity=1`

`POST /api/basket/add-coupon?code=SAVE20`

Option 2: Use [FromBody] or [FromQuery] explicitly
Still useful for clarity and to avoid conflicts.

With a class we may need to do following:

```tsx
public class FilterParams
{
    public string Category { get; set; }
    public int Page { get; set; }
}

[HttpGet("search")]
public IActionResult Search([FromQuery] FilterParams filter)
{
    return Ok(filter);
}
```

API request: `GET /api/products/search?category=shoes&page=2`

```tsx
[HttpGet("tags")]
public IActionResult GetByTags([FromQuery] List<string> tags)
{
    return Ok(tags);
}
```

API Request: `GET /api/products/tags?tags=summer&tags=sale`

In debugger we can find cookies in this>HttpContext>Request>Cookies. Using debugger we can check every object being created.
We can see basketId get created, cookieoptions created but for basket Id = 0, because it is set when we save changes.

### This seems to work, but... aaaaaaaaaaaaaaagggggggggg

We get cycic error + Internal server error (500) response.
What is happening here is API controller is attempting to serialize the obj into json format. But because we defined basketItem like this:

```tsx
    public int BasketId { get; set; }
    public Basket Basket { get; set; } = null!;
```

and in basket:

```tsx
public class Basket
{
    public int Id { get; set; }
    public required string BasketId { get; set; } // cookie in users browser
    // we can use this to persist items in user's basket
    public List<BasketItem> Items { get; set; } = [];
    ...
}
```

What happens is when it want to serialize basket object it is gonna go to basketItem and go to Basket object and try to serialize it which again has basketItems list which has the same basketItem and again try to serialize itand over and over again resulting this:

```json
           },
            "basketId": 1,
            "basket": {
                "id": 1,
                "basketId": "b8f86222-33f8-4842-b20b-0278fe3e8d45",
                "items": [
                    {
                        "id": 1,
                        "quantity": 2,
                        "productId": 2,
                        "product": {...},
                        "basketId": 1,
                        "basket": {
                            "id": 1,
                            "basketId": "b8f86222-33f8-4842-b20b-0278fe3e8d45",
                            "items": [
                              ...
```

## Introducing DTOs

So to overcome it, we use DTO (a data transfet object). Create a new folder DTOs under API folder.
Create `BasketDTO.cs` and copy the Basket variables. And in basket items we remove those components that are causing cycles. Instead lets fill basket item with details of products in it.

BasketDto

```tsx
namespace API.DTOs;

public class BasketDto
{
    public required string BasketId { get; set; } // cookie in users browser
    // we can use this to persist items in user's basket
    public List<BasketItemDto> Items { get; set; } = [];
}

```

BasketItemsDto

```tsx
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace API.DTOs;

public class BasketItemDto
{
    public int ProductId { get; set; }
    public required string Name { get; set; }
    public long Price { get; set; }
    public required string PictureUrl { get; set; }
    public required string Brand { get; set; }
    public required string Type { get; set; }
    public int Quantity { get; set; }
}
```

Now how to make use of dto's. The problem is initiated originally in `BasketController` while creating or retrieving a basket, we are trying to return basket. So here instead return basketDto instead. We create a basket and return dto instead. Similarly to basketItems also.

Simply basket Dto contains BasketId and Items list, and each basket items need to have just the info of product, rest we don't need.

Now the API request works to add basket.

```tsx
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NoContent();
        return new BasketDto
        {
            BasketId = basket.BasketId,
            Items = basket.Items.Select(x => new BasketItemDto
            {
                productId = x.ProductId,
                Name = x.Product.Name,
                Price = x.Product.Price,
                Brand = x.Product.Brand,
                Type = x.Product.Type,
                PictureUrl = x.Product.PictureUrl,
                Quantity = x.Quantity
            }).ToList()
        };
    }
```

We can simplify this using extension methods. Lets create an Extensions folder and extension for basket. Extensions are better static and can be used without initializing and we don't need to also.

```tsx
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NoContent();
        return basket.ToDto();
    }
```

All the implementation goes to Basket Extension:

```tsx
using API.DTOs;
using API.Entities;

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
}
```

By the way, `Select` is a LINQ method used for projection.

It means:<br>
Take each element (x) from the original collection (basket.Items) and transform it into another shape — in this case, a BasketItemDto.

We do this to basket in CreateAtAction method also. And now problemo solved!.

## Back to client.

First up create basketApi.ts and add create reducer path and end points:

```tsx
 reducerPath: "basketApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Basket"],
  endpoints: (builder) => ({
    fetchBasket: builder.query<Basket, void>({
      query: () => "basket",
    }),
    addBasketItem: builder.mutation<
      Basket,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `basket?productId=${productId}&quantity=${quantity}`,
        method: "POST",
      }),
      invalidatesTags: ["Basket"],
    }),
    removeBasketItem: builder.mutation<
      void,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `basket?productId=${productId}&quantity=${quantity}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Basket"],
    }),
  }),
```

update reducers and middleware in store.tsx and add route to new file BasketPage. Sopping kart lies in nav bar, so next stop is navbar.

Initially we kept shoppingkart button here where we should give link (as component) to basketpage.

Next fetch basket query from basket page and display whether or not there are products in it.

When you use a query or mutation hook, it gives you status flags automatically.

```tsx
const { data, error, isLoading, isSuccess, isError } = useFetchBasketQuery();
```

### Next: Add to kart function.

Go to Product card program and find Add to kart function and add AddToKartMutation hook to it.

Now this seems to work but no basket will be created. When the "Add to cart" button is clicked, the frontend triggers the addBasketItem mutation, which sends a POST request to the backend.

The backend responds with a Set-Cookie header containing a new basketId, but since the request did not include credentials, the browser ignores the cookie. As a result, the basketId is not stored, and subsequent requests do not include the cookie.

In a fetch or API request, credentials refers to whether the browser should include cookies, authorization headers, or TLS client certificates in the request.

By default, browsers do not send or accept cookies across different domains or ports, like from:

So even if the server sends a cookie using Set-Cookie, the browser won't store it unless you explicitly tell it to include credentials.

Which is why we cant see cookie in response header.

### ✅ Scenario: Displaying Basket Items

Let’s say a user clicks "Add to Cart":

- Server creates a basket (if none exists).
- Server sends back Set-Cookie: basketId=abc123.
- Browser stores basketId — only if credentials: 'include' is set.
- Later, you call GET /api/basket to display the cart.
- Browser includes Cookie: basketId=abc123 in the request.
- Server uses that cookie to find and return the right basket items.

### ❌ If Cookie is Missing

The request to GET /api/basket has no way to know which basket belongs to the user.<br>
The server might return an empty basket or null.

To fix this we need to do two things:

- In API program.cs in use.CORS we also allow credentials.

```csharp
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:3000");
});
```

- In baseAPI inside while fetching base query:

```tsx
const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:5001/api",
  credentials: "include",
});
```

Now click Add to cart and go to cookies in inspect>Application options and there we can see our cookie for basket. But this straight up wont come to us whe we click on basket, because of caching provided by redux given that we opened that page before (Prev state).

## Styling Basket Page

Source code in BasketPage and BasketItem

Here components are not updated on screen due to caching. One method, simpler one to do this is invalidating RTK query.

## Invalidating RTK Query

Head over to basketAPI and since problem is with adding and removal of items, we make changes here.

- Add tagTypes while calling createApi, like this: `tagTypes: ["Basket"]`
  Think of it like saying:

“Hey RTK, I want to track changes related to Basket data.”

It’s just a label for a group of related cache entries.

- In endpoints for fetchBasket along with query provide tag "Basket" like this:
  ```tsx
  fetchBasket: builder.query<Basket, void>({
      query: () => "basket",
      providesTags: ["Basket"],
    }),
  ```

##### What is providesTags?

Used in a query or mutation, it tells RTK:

“This API endpoint provides data for this tag (e.g., Basket) — cache this!”

##### What is invalidateTags?

Used in mutations, it tells RTK:

“Yo, something just changed. Go refetch anything related to this tag.”

Parameters of onQueryStarted:

```tsx
onQueryStarted(arg, {
  dispatch,
  getState,
  queryFulfilled,
  requestId,
  extra,
  getCacheEntry,
});
```

```tsx
addBasketItem: builder.mutation<
      Basket,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `basket?productId=${productId}&quantity=${quantity}`,
        method: "POST",
      }),
      onQueryStarted: async(_, {dispatch, queryFulfilled}) => {
        try{
          await queryFulfilled;
          dispatch(basketAPI.util.invalidateTags(['Basket']));
        } catch (error) {
          console.log(error);
        }
      }
    }),
```

##### What's happening?

You added an item to the basket. After it's successful (await queryFulfilled), RTK says:

“Let’s refetch anything tagged with 'Basket'.”

`onQueryStarted`<br>
This is a lifecycle hook used in RTK Query, specifically inside a mutation. It runs automatically when the mutation is initiated, before the actual fetch completes.

At this moment:
-onQueryStarted(...) is triggered before the actual network request
-RTK gives it the following parameters:

Parameters explained:

- \_: The argument passed into the mutation — you're ignoring it here.
- dispatch: Redux's dispatch function — lets you dispatch actions.
- queryFulfilled: A promise that resolves when the request is done (fulfilled or rejected).

##### Visual Flow

- User ->> useAddBasketItemMutation: call mutation
- RTK Query ->> onQueryStarted: runs it before fetch
- onQueryStarted ->> queryFulfilled: waits for success
- onQueryStarted ->> dispatch: invalidates cache
- RTK Query ->> any query with 'Basket' tag: auto refetched

Now we can successfully add item to basket.

The second argument — { dispatch, queryFulfilled, ... } — is injected by RTK Query and contains tools you can use inside onQueryStarted.

## Getting number on basket according to items

Since we will have our updated basket cached now, lets fetch basket and count number of items present in it.

In navbar.ts:

Retrieve basket using useFetchBasketQuery and using reduce gather the sum of number of items present.

```tsx
const { data: basket } = useFetchBasketQuery();
const itemCount =
  basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
```

But when we click "Add to kart" now, we are getting 2 loadings to see number updated and items in cart to update. To make it spontaneous we do updation in basketAPI:

We update when add to cart was clicked. If update was successfull, it stays in place otherwise it will roll back. `onQueryStarted` we update number. This is done right away when clicked. Now we need access to product and quantity.

### updateQueryData

In Redux Toolkit Query (RTK Query), updateQueryData is a utility method provided to directly manipulate cached data in the Redux store for a specific query.

This method is part of the api.util object and is commonly used inside:

- onQueryStarted lifecycle handler (to optimistically update cache)
- Components via dispatch
- createListenerMiddleware for reactive logic

✅ updateQueryData Syntax:

```tsx
updateQueryData(endpointName, args, updateFn);
```

`endpointName`: Specifies which query endpoint's cache you want to update. <br>
`args`: The parameters that were passed to the query when it was called. If nothing, pass `undefined`.<br>
`updateFn`: A function that receives a mutable draft of the cached data for the given endpointName + args. You directly mutate draft, and RTK Query will create an immutable update using Immer.

When you use updateQueryData, you're mutating the cached data (in Redux store) that was returned by a query endpoint — not the server data, just the client-side cached data.

Immer is a JavaScript library that allows you to write code that appears to "mutate" objects, but actually produces a new, immutable copy under the hood.

On using it we remove invalidate tag, and when encountered an error, we will undo it.

Here we try to update quantity in cache of redux if item already exists (by retrieving it), else creating new basket item instance.
<br> But, we created a type for basketItem on user side not a class to instantiate.

So we convert basket to class with constructor. It acts as both type and instantiable class. Which is when we need entire product as parameter to create Item.

```tsx
onQueryStarted: async ({ product, quantity }, { dispatch, queryFulfilled }) => {
  const patchResult = dispatch(
    basketAPI.util.updateQueryData("fetchBasket", undefined, (draft) => {
      const existingItem = draft.items.find(
        (item) => item.productId == product.id
      );
      if (existingItem) existingItem.quantity += quantity;
      // else create basketItem
      else draft.items.push(new Item(product, quantity));
    })
  );

  try {
    await queryFulfilled;
  } catch (error) {
    console.log(error);
    patchResult.undo();
  }
};
```

And make sure everywhere where this is used updated.

Now new error is poping in console while adding a new Item that was not already in basket. Also if baskett was not there yet, this wont work.

## Removing items from cart

Similarly, using updateQueryData method get cache memory of Items and find items whose index equals ProductId (we dont need product here since we won't create one), and get itemIndex. We decrement it and in case it equals to 0 or less we use splice to remove Item at itemIndex from list of items in cache.

## Incrementing count of item

We can't simplay pass productId straight forward like in case of reduction. To do that we can introduce an or type like `product | Item` using type safety.

#### Type gaurd

```tsx
function isBasketItem(product: Product | Item) : product is Item {
  return(product as Item).quantity !== undefined;
}

// For addBasketItem endpoint:
query: ({ product, quantity }) => {
        const productId = isBasketItem(product) ? product.productId : product.id; // use this wherever needed
        return {
          url: `basket?productId=${productId}&quantity=${quantity}`,
          method: "POST",
        }
      },
```

## Lib/util.ts... to format currencies...

## shared/components/OrderSummary.tsx

Provided by Neil Cummings...

## Fixing other uncontrolled components

Add to basket and quantit in view page...

React hooks cant be inside conditional statements,

```tsx
const { id } = useParams(); // Type is string | undefined (since it comes from the URL we can't
// guarantee that it will always be defined)

const [removeBasketItem] = useRemoveBasketItemMutation();
const [addBasketItem] = useAddBasketItemMutation();
const { data: basket } = useFetchBasketQuery();
const item = basket?.items.find((x) => x.productId === +id!);
const [quantity, setQuantity] = useState(0);
useEffect(() => {
  if (item) setQuantity(item.quantity);
}, [item]);

const { data: product, isLoading } = useFetchProductDetailsQuery(
  id ? parseInt(id) : 0
);

if (!product || isLoading) return <div>Loading...</div>;

// here we deside no of items that are going to be present in basket
const handleUpdateBasket = () => {
  const updatedQuantity = item ? Math.abs(quantity - item.quantity) : quantity;
  if (!item || quantity > item.quantity) {
    // we need more
    addBasketItem({ product, quantity: updatedQuantity });
  } else {
    // need lesser
    removeBasketItem({ productId: product.id, quantity: updatedQuantity });
  }
};

// canging value according to click
const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  const value = +event.currentTarget.value; // to number

  if (value >= 0) setQuantity(value); // only if greater than 0
};
```

## Additional

Added EmptyBasket component.

## Checkout page

Some text

## Issue with non-serializable state

This is because we have used class for Item which may have methods and not serializable.<br>
It is angry with using new, creating new whole object:

```tsx
draft.items.push(isBasketItem(product) ? product : new Item(product, quantity));
```

Change to this:

```tsx
draft.items.push(
  isBasketItem(product)
    ? product
    : { ...product, productId: product.id, quantity }
);
```

We has to specify `productId: product.id` because rest all are having same names except for them is those two types (product, item).

### New Bug

Delete cookie and try to add items.

```bash
basketAPI.ts:41 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'items')
    at basketAPI.ts:41:40
```
meaning that in your basketAPI.ts file at line 41, you're trying to access .items on a variable that is currently null.

We will lose our basket, so new basket will be created. But we will also get this error. So this also shows up when a brand new user adds first item to basket. Backend is fine although.

This is occuring because we are trying to find some thing in draft.item but no such thing exists (null). so first we need to check weather basket exists or not using draft = null or not.

updates:
``` tsx
let isNewBasket = false;
if (!draft?.basketId) isNewBasket = true;

if (!isNewBasket){
  // push items logic here
}
```

Now this simply resolves this and we push dispatch function into try block after await of onQueryFullfilled.

This might take very first add to cart, some time to update ui.

Done with basket.

