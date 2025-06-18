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
