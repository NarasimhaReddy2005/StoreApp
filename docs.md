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
  </StrictMode>,
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
  id ? parseInt(id) : 0,
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
  extraOptions: object,
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
        (item) => item.productId == product.id,
      );
      if (existingItem) existingItem.quantity += quantity;
      // else create basketItem
      else draft.items.push(new Item(product, quantity));
    }),
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
  id ? parseInt(id) : 0,
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
    : { ...product, productId: product.id, quantity },
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

```tsx
let isNewBasket = false;
if (!draft?.basketId) isNewBasket = true;

if (!isNewBasket) {
  // push items logic here
}
```

Now this simply resolves this and we push dispatch function into try block after await of onQueryFullfilled.

This might take very first add to cart, some time to update ui.

Done with basket.

# Paging, sorting, filtering and searching.

Linqueries.  
We can use them to fetch paginated, sorted, filtered, and searched data from the server.

Deffered execution: LINQ queries are not executed until you iterate over them or call a method that forces execution (like ToListAsync(), FirstOrDefault(), etc.). This allows you to build complex queries without hitting the database until you're ready.

We build an expression tree that represents the query, and then we can execute it later.

## What is Pagination?

Pagination is the process of dividing a large dataset into smaller, manageable chunks or pages. This is useful for displaying data in a user-friendly way, especially when dealing with large datasets.

## Starting with API

Product controller:
To `GetProducts()` in products controller we use a query variable to store query to use it whenever we are ready.

### First lets add sorting

```csharp
public async Task<ActionResult<List<Product>>> GetProducts(string orderBy)
{
    var query = context.Products.AsQueryable();

    query = orderBy switch
    {
        "price" => query.OrderBy(x => x.Price),
        "priceDesc" => query.OrderByDescending(x => x.Price),
        _ => query.OrderBy(x => x.Name) // default
    };
    return await query.ToListAsync();
}
```

` url: /api/products?orderBy=priceDesc`

Ways to seperate logic API:

- Repository Method
- Extension Method

We use extension method

## Searching

public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
It tells the compiler:

“This is an extension method.”

“It can be called as if it’s a method of the type you’re extending (IQueryable<Product> here).”

So now you can call it like:

```csharp
var query = context.Products.Sort("price");
```

`IQueryable<T>`

`IQueryable<T>` means:
"A queryable collection of objects of type `T`."

But action will be done in database itself, not in memory like `IEnumerable<T>`.

## Filtering

Taking brands and types as single string (comma seperated values).

```csharp
query = query.Where(x => brandList.Count == 0 || brandList.Contains(x.Brand.ToLower()));
query = query.Where(x => typeList.Count == 0 || typeList.Contains(x.Type.ToLower()));
```

`.Contains` checks the value given is present in list or not.

ASP.NET Core’s model binding is case-insensitive by default for query string keys.

That means all of these work the same:

GET /api/products?pageNumber=2&pageSize=5
GET /api/products?PageNumber=2&PageSize=5
GET /api/products?pagenumber=2&pagesize=5

```csharp
public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] ProductParams productParams)
{
    var query = context.Products.AsQueryable();

    query = query.Filter(productParams.SearchTerm);
    query = query.Sort(productParams.OrderBy);
    query = query.Paginate(productParams.PageNumber, productParams.PageSize);

    return await query.ToListAsync();
}
```

```csharp
using System;

namespace API.RequestHelpers;
public class ProductParams
{
    public string? OrderBy { get; set; }
    public string? SearchTerm { get; set; }
    public string? Brands { get; set; }
    public string? Types { get; set; }
}
```

Simple types (primitives) → automatically bound from query string, route, or form → [FromQuery] optional.

Complex types (your classes like ProductParams) → default is [FromBody], so you must specify [FromQuery] if it comes from query string.

## Pagination

```csharp
using System;

namespace API.RequestHelpers;

public class PaginationParams
{
    private const int MaxPageSize = 50; // no fo products to be displayed
    public int PageNumber { get; set; } = 1;
    private int _pageSize;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
    }
}
```

To make it applicable for filters:

```csharp
using System;

namespace API.RequestHelpers;
public class ProductParams : PaginationParams
{
    public string? OrderBy { get; set; }
    public string? SearchTerm { get; set; }
    public string? Brands { get; set; }
    public string? Types { get; set; }
}
```

Now creating pagination metadata object so that on client side we can make use of this data to format and display.

```csharp
public class PaginationMetadata
{
    public int TotalCount { get; set; }
    public int PageSize { get; set; }
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
}
```

Next we create paged List tat soores products per page. Consists of Metadata + list of items corresponding to that page.

```csharp
using System;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers;

public class PagedList<T> : List<T> //Product
{
    public PaginationMetaData MetaData { get; set; }
    public PagedList(List<T> items, int count, int PageNumber, int pageSize)
    {
        MetaData = new PaginationMetaData
        {
            TotalCount = count,
            PageSize = pageSize,
            CurrentPage = PageNumber,
            TotalPages = (int)Math.Ceiling(count / (double)pageSize)
        };
        AddRange(items);
    }
    public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize)
    {
        var count = await query.CountAsync(); // returns count of products
        var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

        return new PagedList<T>(items, count, pageNumber, pageSize);
    }
}
```

Using it in `GetProducts` method:

```csharp
public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] ProductParams productParams)
{
    var query = context.Products
                        .Sort(productParams.OrderBy)
                        .Search(productParams.SearchTerm)
                        .Filter(productParams.Brands, productParams.Types)
                        .AsQueryable(); // sort is an extension we made

    var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

    return Ok(new {Items = products, products.MetaData});
}
```

```csharp
public static class HttpExtensions
{
    public static void AddPaginationHeader(this HttpResponse response, PaginationMetaData metadata)
    {
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        response.Headers.Append("Pagination", JsonSerializer.Serialize(metadata, options));
        response.Headers.Append(HeaderNames.AccessControlExposeHeaders, "Pagination");
    }
}
```

`JsonSerializerOptions`

Configures serialization. Here it forces JSON camelCase naming (totalPages instead of TotalPages).

`response.Headers.Append("Pagination", ...)`

Adds a custom HTTP header named Pagination to the response.

The value is the serialized metadata object (in JSON).

`response.Headers.Append(HeaderNames.AccessControlExposeHeaders, "Pagination");`

By default, browsers block custom headers unless explicitly exposed.

This line makes sure the Pagination header is visible to the browser’s JavaScript (CORS stuff).

## Filters

### Lets make a way to access what and all brands and types available for filtering

`[HttpGet("filters")]` -> such that we reach this end point on adding "filters" to end point.

## Front end part

Slice for catalog filters

```csharp
// catalogSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import type { ProductParams } from "../../app/Models/productParams";

const initialState: ProductParams = {
  pageNumber: 1,
  pageSize: 8,
  types: [],
  brands: [],
  searchTerm: "",
  orderBy: "name",
};

export const catalogSlice = createSlice({
  name: "catalogSlice",
  initialState,
  reducers: {
    setPageNumber(state, action) {
      state.pageNumber = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setOrderBy(state, action) {
      state.orderBy = action.payload;
      state.pageNumber = 1;
    },
    setTypes(state, action) {
      state.types = action.payload;
      state.pageNumber = 1;
    },
    setBrands(state, action) {
      state.brands = action.payload;
      state.pageNumber = 1;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.pageNumber = 1;
    },
    resetParams() {
      return initialState;
    },
  },
});

export const {setBrands, setOrderBy, setPageNumber, setPageSize, setSearchTerm, setTypes} = catalogSlice.actions;
```

Update store.ts

```csharp
// productParams.ts

export type ProductParams = {
  orderBy: string;
  searchTerm?: string;
  types?: string[];
  brands?: string[];
  pageNumber: number;
  pageSize: number;
};
```

Using it:

```csharp
// As an endpoint in catalogAPI.ts

fetchProducts: builder.query<Product[], ProductParams>({
      query: (productParams) => {
        return { url: "product", params: productParams };
      },
    }),
```

What params means here

In RTK Query, the query function can return an object instead of just a string. That object supports several keys like:

`url → the endpoint path ("product" here).`

`method → HTTP verb (default = "GET").`

`params → an object that RTK Query will serialize into query string parameters for the request.`

So if:

`productParams = { pageNumber: 2, pageSize: 10 }`

then the request sent is:

GET /product?pageNumber=2&pageSize=10

** Since we have made chances in method calling we need some changes in Catalog.tsx **

```csharp
... Catalog(){
  const productParams = useAppSelector(state => state.catalog); // using slice
  const { data, isLoading } = useFetchProductsQuery(productParams);
  ...
}
```

## Searching

Since, we are sending parameters "productParams" to the API, we can easily implement a search feature by updating the "searchTerm" in the Redux state.

```csharp
// Search.tsx
import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setSearchTerm } from "./catalogSlice";

const Search = () => {
  const {searchTerm} = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      type="search"
      value={searchTerm}
      onChange={e => dispatch(setSearchTerm(e.target.value))}
    />
  );
};

export default Search;
```

Thus when dispatching the `setSearchTerm` action, the `searchTerm` in the Redux state is updated, which in turn updates the `productParams` sent to the API. This allows for a seamless search experience as the user types in the search field.

## Making Radio button functionality re-usable

```csharp
// RadioButtonGroup.tsx

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { ChangeEvent } from "react";

type Props = {
  options: { value: string; label: string }[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedValue: string;
};

export default function RadioButtonGroup({
  options,
  onChange,
  selectedValue,
}: Props) {
  return (
    <FormControl>
      <RadioGroup onChange={onChange} value={selectedValue} sx={{ my: 0 }}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={label}
            control={<Radio color="secondary" sx={{ py: 0.7 }} />}
            label={label}
            value={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
```

```csharp
// Filters.tsx
<Paper sx={{ p: 3 }}>
  <RadioButtonGroup
    selectedValue={orderBy}
    options={sortOptions}
    onChange={(e) => dispatch(setOrderBy(e.target.value))}
  />
</Paper>
```

## Check Box

```csharp
import { FormControlLabel, FormGroup } from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";

type Props = {
  items: string[];
  checked: string[];
  onChange: (items: string[]) => void;
};

export default function CheckboxButtons({ items, checked, onChange }: Props) {
  const [checkedItems, setCheckedItems] = useState(checked);
  useEffect(() => {
    setCheckedItems(checked);
  }, [checked]);

  const handleToggle = (value: string) => {
    const updatedChecked = checkedItems?.includes(value)
      ? checkedItems.filter((item) => item !== value) // filters all items excrpt the one toggled
      : [...checkedItems, value];

    setCheckedItems(updatedChecked);
    onChange(updatedChecked);
  };

  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <CheckBox
              checked={checkedItems.includes(item)}
              onClick={() => handleToggle(item)}
              color="secondary"
              sx={{ py: 0.7, fontSize: 40 }}
            />
          }
          label={item}
        />
      ))}
    </FormGroup>
  );
}
```

Also for array of brands to use in api, we have

```csharp
fetchFilters: builder.query<{ brands: string[]; types: string[] }, void>({
  query: () => "products/filters",
})
```

which will automatically generate url like this

```bash
GET /products/filters?brands=Nike,Adidas&types=Shoes,Apparel
```

So we now need to just `setBrands`

```html
<Paper sx={{ p: 3 }}>
  <CheckboxButtons
    items={data?.brands}
    checked={brands}
    onChange={(items: string[]) => dispatch(setBrands(items))}
  />
</Paper>
```

## Pagination Component

Pagination Model

```typescript
export type Pagination = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
};
```

### Retrieving pagination info

Previously we only fetched products without pagination info:

```typescript
fetchProducts: builder.query<Product[], ProductParams>({
      query: (productParams) => {
        return { url: "products", params: filterEmptyValues(productParams) };
      },
    }),
```

Since we have added pagination to header:

```typescript
    fetchProducts: builder.query<
      { items: Product[]; pagination: Pagination },
      ProductParams
    >({
      query: (productParams) => {
        return { url: "products", params: filterEmptyValues(productParams) };
      },
      transformResponse: (items: Product[], meta) => {
        const paginationHeader = meta?.response?.headers.get('Pagination');
        const pagination = paginationHeader ? JSON.parse(paginationHeader):null;
        return {items, pagination};
      }
    }),
```

items → the raw JSON array returned by the API (res.json()).
meta → metadata about the HTTP response (headers, status, etc.)

**1. Why meta.response includes the raw response**

Even though RTK Query already parses the body and gives it to you as items, there are a few reasons why having the raw Response object in meta is useful:

- Access to headers
- HTTP headers are part of the raw response, not the body.
- You often want something like X-Pagination or ETag without modifying your server payload.
- Access to status and metadata
- meta.response.status → 200, 404, 500 etc.
- meta.response.ok → boolean success/failure
- Advanced debugging or logging

You can inspect things like redirected URLs, content length, or even read the raw body again if needed.

Flexibility

Some APIs return both body and important info in headers. Without giving the raw Response, you’d need another mechanism to expose that info.

So yes, it’s technically “redundant” to have the raw body in meta.response.body, but it’s mostly about keeping access to headers, status, and the complete Fetch response.

**2. About meta.response.headers**

headers are indeed part of the raw HTTP response, not the parsed JSON body.<br>
So when you do:

`meta?.response?.headers.get('Pagination')`

You’re reading the raw header value. It’s not part of the parsed items; it’s still “metadata about the response”.<br>
Even if RTK Query parsed the JSON body, headers remain untouched and only accessible through the raw response.

## Pagination component

```typescript
import { Box, Pagination, Typography } from "@mui/material";
import type { data } from "react-router-dom";
import type { Pagination as PaginationType } from "../../Models/pagination";

type Props = {
  metadata: PaginationType;
  onPageChange: (page: number) => void;
};

export default function AppPagination({ metadata, onPageChange }: Props) {
  const { currentPage, totalPages, pageSize, totalCount } = metadata;
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginTop={3}
    >
      <Typography>
        Displaying {startItem} - {endItem} of {totalCount} items
      </Typography>
      <Pagination
        color="secondary"
        size="large"
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)} // on change sends event and page no
      />
    </Box>
  );
}
```

To use it

```Html
<AppPagination
  metadata={data.pagination}
  onPageChange={(page: number) => dispatch(setPageNumber(page))}
/>
```

### Scroll Restoration by router

In App.tsx just below theme provider add `<ScrollRestoration />`.

# Identity

- Password hashing
- Password validation
- User storage
- Role management

There are many resources available from Entity Framework and ASP.NET Core Identity endpoints that can help you implement these features.

We are not going to use JWT tokens here, instead we will use cookies.

## What is provides as end points

POST:

- /register
- /login
- /refresh (for JWT tokens)
- /resendConfirmationEmail
- /forgotPassword
- /resetPassword
- /manage/2fa
- /manage/info

GET:

- /confirmEmail
- /manage/info

Microsoft specifically recommend to use `app.MapIdentityApi<User>();` to secure a WebAPI for SPAs.

It also provides us security defaults

## Cookie Authentication

- Sent with every request to API server
- Http only. (Not accessible via JavaScript)
- Only available in browser-based clients not mobile apps
- Microsoft recommended for SPAs

## Installition of identitp packages (NuGet)

- Microsoft.AspNetCore.Identity.EntityFrameworkCore

Add to API.csproj

Just extend IdentityUser in User class

```csharp
public class User : IdentityUser{ ... }
```

**DbContext** <br>
This is the base class in Entity Framework Core used to interact with your database.

- **Purpose**: Manages your application's data models and handles CRUD operations.
- **Use Case**: Ideal for custom entities like Product, Order, BlogPost, etc.
- **Customization**: You define your own DbSet<T> properties and configure relationships, keys, etc.

**IdentityDbContext**
This is a specialized version of DbContext that includes all the tables and configurations needed for ASP.NET Identity.

- **Purpose**: Manages user authentication and authorization data.
- **Use Case**: Automatically includes tables like AspNetUsers, AspNetRoles, AspNetUserClaims, etc.
- **Customization**: You can extend it with your own user class and additional entities.

So we change our StoreContext to extend IdentityDbContext

```csharp
public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options) { ... }
```

User is our class that extends IdentityUser so that DbContext can recognize it as a valid user entity.

Lets make some configurations in StoreContext.cs

```csharp
protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole {Id= "afdbaf5e-0791-4739-9847-0f08a1d5906e", Name = "Member", NormalizedName = "MEMBER" },
                new IdentityRole {Id= "f5288007-745f-410e-b301-675538e852e7", Name = "Admin", NormalizedName = "ADMIN" }
            );

    }
```

**builder.Entity<IdentityRole>().HasData(...)**

- You're telling EF Core to prepopulate the AspNetRoles table with two roles: Member and Admin.
- This is called data seeding—it happens during migrations.

### Id, Name, NormalizedName

- Id: A fixed GUID for each role. Required for seeding because EF Core needs explicit primary keys.
- Name: The display name of the role.
- NormalizedName: Uppercase version used for case-insensitive lookups.

- `Entity<IdentityRole>` Specifies that we're configuring the IdentityRole entity, which represents roles in ASP.NET Identity (e.g., Admin, Member).
- `HasData(...)`: By calling .HasData(...), you're inserting two predefined records into that table:
  One with the role name "Member" <br>
  One with the role name "Admin" <br>

- `IdentityRole`: Built-in class in ASP.NET Identity representing a role.

Seeding, in the context of Entity Framework Core (EF Core), means preloading your database with initial data—like default roles, admin users, or lookup tables—when the database is first created or updated via migrations

## Configuring Identity in Program.cs

Among bulder Services add:

```csharp
builder.Services.AddIdentityApiEndpoints<User>(
    opt =>
    {
        opt.User.RequireUniqueEmail = true;
        // some rules for passwords are default by .Net. So we need not specify them
    }
).AddRoles<IdentityRole>().AddEntityFrameworkStores<StoreContext>();
```

- The options parameter is injected by the ASP.NET Core framework.
- It comes from the Options pattern, which is how .NET handles configuration for services like Identity.

`AddEntityFrameworkStores<StoreContext>()` tells ASP.NET Identity to use Entity Framework Core and your custom StoreContext class to persist identity data like users, roles, claims, logins, and tokens.

### Among UseSomethings add:

```csharp
app.UseAuthentication();
app.UseAuthorization();
```

### Below MapControllers add:

`app.MapGroup("api").MapIdentityApi<User>();`

`app.MapControllers();`
This line enables attribute routing for your MVC or API controllers.
What It Does:

- Scans your app for classes decorated with [ApiController] or [Controller].
- Maps routes based on [Route], [HttpGet], [HttpPost], etc.
- Adds endpoints to the routing table so requests like GET /products or POST /orders hit the right controller methods.

`app.MapGroup("api").MapIdentityApi<User>();`
This line sets up built-in Identity endpoints under the /api route group.

What It Does:

- Registers endpoints like:
- POST /api/login
- POST /api/register
- POST /api/forgotpassword
- Uses the User class (your Identity model) to handle authentication and user management.
- These endpoints are auto-wired to UserManager, SignInManager, and token services.

Why Use MapGroup("api")?

- It scopes all Identity endpoints under /api, keeping your URL structure clean and RESTful.
- You could later add other grouped endpoints like app.MapGroup("api/products").

In DbInitializer, if database is empty, we seed an admin and a user using userManager and its inbuilts.

```csharp
public static void InitDb(WebApplication app)
{
    ...
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>()
            ?? throw new InvalidOperationException("Failed to retrieve user Manager");
    _ = SeedData(context, userManager); // discarding what ever returning
}
private static async Task SeedData(StoreContext context, UserManager<User> userManager)
    {
        context.Database.Migrate();

        if (!userManager.Users.Any())
        {
            // Seed some users in
            var user = new User
            {
                UserName = "bob@test.com",
                Email = "bob@test.com"
            };

            await userManager.CreateAsync(user, "Pa##w0rd"); // some complex password
            await userManager.AddToRoleAsync(user, "Member");

            var admin = new User
            {
                UserName = "admin@test.com",
                Email = "admin@test.com"
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd"); // some complex password
            await userManager.AddToRolesAsync(admin, ["Member", "Admin"]);
        }
        ...
    }
```

UserManager is a service provided by ASP.NET Identity that helps manage user accounts. It provides methods for creating, updating, deleting, and retrieving users, as well as managing passwords (hashing), roles, and claims.

### Next stop app and migrate

```bash
dotnet ef migrations add IdentityAdded
```

** Wait, why have we given name and emails both as emails?**

If we look in <a>https://github.com/dotnet/aspnetcore/blob/main/src/Identity/Core/src/IdentityApiEndpointRouteBuilderExtensions.cs</a> (freesource code of what our internal Identity api uses) for login part API, we see that it uses signin manager to signIn user. Here Email and Password are passed to signInManager.

```csharp
routeGroup.MapPost("/login", async Task<Results<Ok<AccessTokenResponse>, EmptyHttpResult, ProblemHttpResult>>
    ([FromBody] LoginRequest login, [FromQuery] bool? useCookies, [FromQuery] bool? useSessionCookies, [FromServices] IServiceProvider sp) =>
{
    var signInManager = sp.GetRequiredService<SignInManager<TUser>>();

    var useCookieScheme = (useCookies == true) || (useSessionCookies == true);
    var isPersistent = (useCookies == true) && (useSessionCookies != true);
    signInManager.AuthenticationScheme = useCookieScheme ? IdentityConstants.ApplicationScheme : IdentityConstants.BearerScheme;

    var result = await signInManager.PasswordSignInAsync(login.Email, login.Password, isPersistent, lockoutOnFailure: true);

    ...
});
```

Every thing seem fine, but if we look at `PasswordSignInAsync` method of SignInManager class, we see that it uses `FindByNameAsync` method of UserManager class to find user by name.

<a>https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.identity.signinmanager-1.passwordsigninasync?view=aspnetcore-9.0</a>

```csharp
public virtual System.Threading.Tasks.Task<Microsoft.AspNetCore.Identity.SignInResult> PasswordSignInAsync(string userName, string password, bool isPersistent, bool lockoutOnFailure);
```

It expects userName as first parameter, not email. Which is weird. So we have to give email as username too.

### Verifying url

Since earlier we have decided upon using cookies we need to pass `useCookies=true` in query string to make it work.

```bash
/api/login?useCookies=true
```

Also it is Http only cookie, so we cant see it in Application tab of inspect element. But we can see it in network tab. This is more secure cause we can't access it from javascript.

## AccountController

To address above mentioned "Weird" issue, we will do a custom registration endpoint.

**ModelState**

- Each HTTP request → the framework creates a new controller instance.
- That controller instance has its own fresh ModelState property (a new ModelStateDictionary).
- The Model Binder runs before your action method, filling ModelState with binding/validation results.
- Then your action executes and you read/write ModelState.
- When the request ends, the controller instance (and its ModelState) is discarded.

**New DTO**

```csharp
namespace API.DTOs;

public class RegisterDto
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}
```

```csharp
public class AccountController(SignInManager<User> signInManager) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
    {
        var user = new User { UserName = registerDto.Email, Email = registerDto.Email };
        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return ValidationProblem();
        }
        await signInManager.UserManager.AddToRoleAsync(user, "Member");
        return Ok();
    }
}
```

`ValidationProblem()`

- This method generates a 400 Bad Request response with a standardized problem details format.
- It includes validation errors from ModelState in the response body.

The `Required` decorator tells the framework that:
“This property must have a non-null and non-empty value when the model is validated.”

Else throws error in ModelState which we return as BadRequest using `ValidationProblem()` method.

instead of required keyword we can also use `[Required]` attribute from `System.ComponentModel.DataAnnotations` namespace.

`[Required]`<br>
`
public string Email { get; set; } = string.Empty;

## Endpoint for User Info

The default endpoint given by dotnet is `{{url}}/api/manage/info`, which simpily returns user's `{email:string,  isEmailConfrimed: Boolean}`.

But we would like more like roles etc.

```csharp
    [HttpGet("user-info")]
    public async Task<IActionResult> GetUserInfo() //no params needed
    {
        if (User.Identity?.IsAuthenticated == false) return NoContent(); // Not an error, just no user

        var user = await signInManager.UserManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var roles = await signInManager.UserManager.GetRolesAsync(user);
        return Ok(new
        {
            user.Email,
            user.UserName,
            Roles = roles
        });
    }
```

In program.cs we added `app.UseAuthentication();` which enables authentication middleware that processes authentication for incoming requests. It includes setting the User property on HttpContext based on the authentication cookie or token.

In the above code `User` is the shorthand for `HttpContext.User`, which represents the currently authenticated user making the request.

A Principal represents the security context of the current user. It answers two key questions:

- Who is the user? → via IIdentity
- What roles or permissions do they have? → via role membership

ClaimsPrincipal is an nothing but the principal that contains a collection of claims(here roles, emails) about the user. It's like a mapping of user to their attributes.

## Log out end point

```csharp
[HttpPost("logout")]
public async Task<ActionResult> Logout()
{
    await signInManager.SignOutAsync();
    return NoContent();
}
```

## User Address endpoint

Creating Address entity

```csharp
using System;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Address
{
    [JsonIgnore]
    public int Id { get; set; } // we dont want to send Id back
    public required string Name { get; set; }
    public required string Line1 { get; set; }
    public string? Line2 { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }
    // there will be '_' in b/w postal code name in stripe etc which differs from C# namming convention
    [JsonPropertyName("postal_code")]
    public required string PostalCode { get; set; }
    public required string Country { get; set; }
}
```

Also here, we are going to use 1-1 relationship b/w User and Address.

Add address field to User class in User.cs

```csharp
public class User : IdentityUser
{
    public int? AddressId { get; set; }
    public Address? Address { get; set; } // not forcing to add address
}
```

**Since we have used the same User in DbContext, we need to make migration again.**

```csharp
var user = await context.Users
    .Include(u => u.Address)
    .FirstOrDefaultAsync(u => u.UserName == "karri@example.com");
```

This tells EF Core to:

- Query the Users table
- Join with the Addresses table
- Return a User object with its Address property already populated

## Address Endpoints

// Nothing special, check in AccountController.cs

# Identity Client side

## Creating RTK query for identity

As a new feature accounts, create a new file accountAPI.ts

`object` type is used when we want to represent a non-primitive type, such as an object with properties or a complex data structure. It's just a general placeholder for "some kind of object".

builder.mutation is for operations that change data (POST, PUT, DELETE).
builder.query is for operations that fetch data (GET).

** Nothing special, check in accountAPI.ts and user.ts **

Also add accounts Api reducer path to store.ts

## Creating form for login

Auto focus keeps the cursor in email field when page loads.

Link from react router dom is used to navigate b/w pages without reloading whole page.

Refer LoginForm.tsx.

Add this route to router i.e., Routes.tsx

## Introducing React Hook Form + Zod

**What's Zod?**
Zod is a TypeScript-first schema declaration and validation library. It allows you to define the shape of your data using a fluent API, and then validate that data at runtime on both the client and server sides.

```bash
npm install react-hook-form
npm install zod @hookform/resolvers
```

**What are react-hook-form?**
It simply provides many hooks like register, handleSubmit, formState etc to manage forms in react.
register (from useForm) → Connects input fields to the form.

#### register

```typescript
import { useForm } from "react-hook-form";

// in login form function

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LoginSchema>();
```

Later in TextField of MUI

```typescript
<TextField
  fullWidth
  label="Email"
  autoFocus
  {...register("email", { required: "Email is required" })}
  error={!!errors.email}
  helperText={errors.email?.message}
/>
```

`{...register("email", { required: "Email is required" })}` : will add some props to TextField like onChange, onBlur, name, ref etc. `required` is for validation.

#### formState

formState (from useForm) → Provides state info like:

- isDirty → if any field has changed
- isValid → if form passes validation
- isSubmitting → while submitting
- errors → validation errors
- touchedFields → which fields have been touched

out of them we can also only use errors for now.

#### handleSubmit

Given to form's onSubmit. It:

- Wraps your form submission handler.
- Automatically runs validation for all registered fields.
- If validation passes → calls your onSubmit function with form data.
- If validation fails → skips your onSubmit and instead puts errors into formState.errors.

```tsx
<Box
  component="form"
  onSubmit={handleSubmit(onSubmit)}
  width="100%"
  display="flex"
  flexDirection="column"
  gap={3}
  my={3}
>
{children...}
</Box>
```

We can inject our schema to useForm by just passing it as generic type parameter like `useForm<LoginSchema>()` and a resolver that uses Zod for validation. Also we can add mode so that validation happens as we type.

```typescript
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LoginSchema>({
  mode: "onTouched",
  resolver: zodResolver(loginSchema),
});
```

In this way our form validation logic is abstracted away from UI code.

## Our LoginSchema

```typescript
import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
```

z.infer is a utility that extracts the TypeScript type from a Zod schema. It allows you to derive the static type representation of the schema, ensuring type safety and consistency between your validation logic and TypeScript types.

Now we can remove required validation from register method of react-hook-form since it is already handled by zod schema.

For email and etc we can see we already have some built in validation methods in zod like email(), min(), max() etc.

## Login logic

we pass data to login mutation. First give valid type to useLoginMutation `login: builder.mutation<void, LoginSchema>`.

Also we can use isLoading from useLoginMutation and give it to MUI to disable button while submitting and also it automatically adds a loading bar we implemented.

```typescript
const [login, { isLoading }] = useLoginMutation();
```

```html
<button disabled="{isLoading}" variant="contained" type="submit">
  Sign in
</button>
```

## Adding user menu

Copying user menu code in MUI to Layouts/UserMenu.tsx.

changes: added user prop to use it to show menu items or login/register button accordingly.

see UserMenu.tsx and navbar in Layout.tsx for implementation details.

To get user info lets tweek login Api a bit.

We know:
Summary Table
| **Concept** | **Role in RTK Query** |
|--------------------|--------------------------------------------------------|
| `tagTypes` | Declares valid tag categories |
| `providesTags` | Labels cached query data with tags |
| `invalidatesTags` | Marks tags as stale after a mutation |

so using tag we can later access it in cache and use it to invalidate it.

See for userInfo and login's (onQueryStarted method in it) endpoints in accountApi.ts for more details.

## Register

To mentain complexity of password from user lets use regex.
From `regxlibrary` in web lets find an expression for password.
`https://www.regexlib.com/?AspxAutoDetectCookieSupport=1`

Search for expression with our needs (atleast: 1 capital, 1 small, 1 special char, b/w 6-10 char long...), the one microsoft uses.

Here is the regular expression we will use:

```regex
(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$
```

**Refer** `registerSchema.ts` for complete code. Similar changes in `accountApi.ts` and `RegisterForm.tsx`.

### Notifying about failures (Error handling)

We are using setError hook from react-hook-form to set error manually.

```typescript
const onSubmit = async (data: RegisterSchema) => {
  try {
    await registerUser(data).unwrap(); // to access whats inside by getting raw object
  } catch (error) {
    const apiError = error as { message: string };
    if (apiError.message && typeof apiError.message === "string") {
      const errorArray = apiError.message.split(",");
      errorArray.forEach((e) => {
        if (e.includes("Password")) {
          setError("password", { message: e }); // sets error regarding password field
        } else if (e.includes("Email")) {
          setError("email", { message: e }); // sets error regarding email field
        }
      });
    }
  }
};
```

## Adding Private Routes

create a new component RequireAuth.tsx

```typescript
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserInfoQuery } from "../../features/account/accountApi";

export default function RequireAuth() {
  const { data: user, isLoading } = useUserInfoQuery();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return (
    <Outlet /> // our component is usually loaded up here
  );
}
```

Now wrap private routes in Routes.tsx with `<Route element={<RequireAuth />}> ... </Route>`.

Refer to routes.tsx for more details.

To persist the page from where user left off, we use `useLocation` hook to get current location and pass it to login page using state prop of Navigate component.

Since we added this line: `<Navigate to="/login" state={{ from: location }} />`, we can access this state in login page using `useLocation` hook.

```typescript
const onSubmit = async (data: LoginSchema) => {
  await login(data);
  navigate(location.state?.from || "/catalog");
};
```

But now we are staying in same login page rather.

So we will use userInfo in LoginForm also but here we use LazyQuery. Why LazyQuery?
Lazy queries are used when you want to manually trigger a query based on some event or condition, rather than having it automatically execute when the component renders.

#### How does it helps?

By ChatGPT:

The key is state synchronization between your backend and your frontend store/cache (likely Redux Toolkit Query, since you’re using useLoginMutation and useLazyUserInfoQuery).

login() only returns auth tokens (or sets cookies).
It doesn’t automatically update your frontend state with "this is the current user". At this point, your app technically doesn’t know you’re logged in.

Your app probably has some auth guard logic (like a ProtectedRoute or a useEffect that checks isAuthenticated / currentUser).
That logic depends on userInfo being in the Redux store. If it’s null, the guard assumes you’re unauthenticated and redirects you right back to /login.

fetchUserInfo() fixes that.
After login, it calls an endpoint like /me or /user/profile to fetch the logged-in user’s info. This populates Redux state (user slice), so your app now knows: "Yes, the user is authenticated."
With that in place, when you call navigate(...), the route guard lets you through instead of bouncing you back to /login.

# Payments ₹ $ ¥

This is going to be handled by stripe and is also going to be a serious section.
PCI Compliance is documentation that we should follow to ensure that we are handling payment information securely. Using a trusted third-party like Stripe offloads much of that burden.

Stripe takes 2.9% + 30¢ (cents) per successful transaction.

3DS - 3D Secure is an additional layer of authentication for online credit and debit card transactions. It helps prevent fraud by requiring the cardholder to complete an extra verification step, such as entering a password or a code sent to their phone, during the checkout process.

We use SCA - Strong Customer Authentication, a requirement under the European Union's Revised Payment Services Directive (PSD2). It mandates multi-factor authentication for online payments to enhance security and reduce fraud.

The one that is used in canada is, when payment is done stripe generates a token. This token is sent to client and client sends it to server. Server then uses this token to confirm payment.

But in SCA, the flow is different. Here,

- When user went to checkout page, before the user actually confirm the order, we will request API to create a **payment intent** (An intent to pay at feature point).
- Then will send that payment intent request to stripe and stripe will create and retuen **PaymentIntentId** and **ClientSecret**.
- We keep Clientsecret into shoping cart and return it to user.

At this point user can still add remove items from cart. When at any time user come back to checkout page we will update the payment intent with latest amount and keep repeating it up until the point where the user decides they can pay the order.

- Here user will enter card details and we will send the card details along with client secret directly to stripe to confirm the payment. Stripe will return the success or failure of payment to client.
- At this point order can be created and API will acknowledge the order and successfull payment. But we can trust client side. So order will be in a pending payment state up until we get a webhook from stripe saying payment is successfull.
- Stripe will use a secret webhook key to sign the webhook request so that API can trust it. And we could then update the order status to paid or payment recieved and then notify user thet therir order is on the way.

## Setting up stripe

Not possible in india

## Trying to switch to Razorpay

Flow in Razorpay

- Backend creates Order → gets order_id.
- Frontend opens Razorpay Checkout with order_id.
- Customer pays → Razorpay returns payment_id, order_id, signature to client.
- Client sends details → Backend verifies signature.
- Razorpay webhook confirms capture → Backend marks order as paid.
- Setup my variables in appsettings.Development.json.

Create a Services folder in API project and add a new class PaymentsService.cs and into that class inject IConfiguration to access the keys.

## creating a Payment Entity

```csharp
namespace API.Entities;

public class Payment
{
    public int Id { get; set; }
    public string OrderId { get; set; } = null!;      // Razorpay order id
    public string? PaymentId { get; set; }            // Razorpay payment id (filled after verification)
    public long Amount { get; set; }                  // stored in paise
    public string Status { get; set; } = "created";   // created / paid / failed
    public string? BasketId { get; set; }             // link to your basket (string based on your existing basket id)
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
```

Add DbSet in StoreContext.cs

Next lets have a Dto for creating order CreateOrderDto.cs

```csharp
using System;

namespace API.DTOs;

public class CreateOrderDto
{
    public string BasketId { get; set; } = null!;
}
```

Next lets have a Dto for payment so that we can use it for verifying payment PaymentVerifyDto.cs

```csharp
using System;

namespace API.DTOs;

public class PaymentVerifyDto
{
    // all these are returned by razorpay to client after payment
    public string RazorpayOrderId { get; set; } = null!;
    public string RazorpayPaymentId { get; set; } = null!;
    public string RazorpaySignature { get; set; } = null!;
}
```

Lets keep our logic in PaymentsService.cs

First we need to create an order in razorpay

```csharp
public async Task<Entities.Order> CreateOrderAsync(string basketId, long amount)
{
    // 1. Convert to paise
    var amountInPaise = amount * 100;

    // 2. Create Razorpay client
    var client = new RazorpayClient(_keyId, _keySecret);

    // 3. Razorpay order options
    var options = new Dictionary<string, object>
    {
        { "amount", amountInPaise },
        { "currency", "INR" },
        { "receipt", Guid.NewGuid().ToString() }
    };

    // 4. Create Razorpay order
    var razorpayOrder = client.Order.Create(options);

    // 5. Persist order in DB
    var order = new Entities.Order
    {
        OrderId = razorpayOrder["id"].ToString(),
        Amount = amountInPaise,
        Status = "created",
        BasketId = basketId
    };

    _context.Orders.Add(order);
    await _context.SaveChangesAsync();

    return order;
}
```

Next we need to verify payment

```csharp
public async Task<bool> VerifyPaymentAsync(string orderId, string paymentId, string signature)
{
    var attributes = new Dictionary<string, string>
    {
        { "razorpay_order_id", orderId },
        { "razorpay_payment_id", paymentId },
        { "razorpay_signature", signature }
    };

    try
    {
        Utils.verifyPaymentSignature(attributes);

        // Next steps (soon)
        var order = await _context.Orders
            .FirstOrDefaultAsync(x => x.OrderId == orderId);

        if (order == null) return false;

        order.PaymentId = paymentId;
        order.Status = "paid";

        await _context.SaveChangesAsync();
        return true;
    }
    catch
    {
        return false;
    }
}
```

Next create PaymentsController.cs and inject PaymentsService into it.

We also created DTOs for creating order and verifying payment as CreateOrderDto.cs and PaymentVerifyDto.cs respectively.

Added DBsets in StoreContext.cs for Orders and Payments.

Added CurrencyService.cs to convert from INR to USD for product prices.

3️⃣ Razorpay Webhook (VERY IMPORTANT)
4️⃣ Clear basket after payment
5️⃣ Frontend Razorpay checkout
6️⃣ Prevent duplicate payments (idempotency)

## Razorpay Webhook

This happens even if:

- User closes browser
- Network drops
- Frontend never calls /verify
- Someone tampers with client code

👉 Webhooks are the final source of truth.

Go to razorpay dashboard and create a webhook endpoint at: `https://storistq.com/api/payments/webhook`
and select "Payment captured" event.

But we can't. We need a publickly accessible url for that. So we will use ngrok for that.

### Using ngrok for webhook testing

#### setting up ngrok

First install ngrok from `https://ngrok.com/download`. Running that application opens a terminal like window.

Go to ngrok dash board and copy cmd line that has authtoken configured to you, and run it in terminal.

Then run this command in terminal to expose local server running at 5001 port.

```bash
ngrok http https://localhost:5001
```

This will give you a public url like `https://unshaking-nonesoterically-darcie.ngrok-free.dev/api/payments/webhook` that tunnels to your localhost:5001.

Secret is kept in appsettings.Development.json.

We are using webhook instead of verify endpoint to mark order as paid because webhook is called by razorpay directly and is more secure.

Frontend /verify is now OPTIONAL

```csharp
[HttpPost("webhook")]
public async Task<IActionResult> RazorpayWebhook()
{
    using var reader = new StreamReader(Request.Body); // Reads raw JSON payload sent by Razorpay
    //Required for signature verification
    var body = await reader.ReadToEndAsync();

    var signature = Request.Headers["X-Razorpay-Signature"].ToString();
    // Razorpay sends an HMAC signature in this header
    // Used to verify authenticity

    if (!VerifyWebhookSignature(body, signature))
        return Unauthorized();

    await _paymentsService.HandleWebhookAsync(body);

    return Ok();
}
```

** Verifying signature: ** <br>
We recreate Razorpay’s signature locally and compares it.

```csharp
private bool VerifyWebhookSignature(string payload, string signature)
{
    // Converts webhook secret to bytes
    var secretBytes = System.Text.Encoding.UTF8.GetBytes(_webhookSecret);

    // create hash value of payload using HMACSHA256 and convert to hex string
    using var hmac = new HMACSHA256(secretBytes);
    var hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(payload));
    var expectedSignature = Convert.ToHexString(hash).ToLower();

    // compare signatures
    return expectedSignature == signature;
}
```

## Handling webhook payload

How payload looks like:

```json
{
  // --> root
  "entity": "event",
  "account_id": "acc_XXXXXXXXXXXXXX",
  "event": "payment.captured",
  "contains": ["payment"],
  "payload": {
    "payment": {
      "entity": {
        // id: The unique payment ID (e.g., pay_XXXXXXXXXXXXXX).
        // amount: The payment amount in the smallest currency unit (e.g., paise for INR).
        // currency: The currency code (e.g., INR).
        // status: The status of the payment (which will be captured for this event).
        // order_id: The associated order ID, if the payment was made against an order.
        // method: The payment method used (e.g., card, netbanking, upi).
        // description: A description of the payment.
        // card: Details about the card used (if applicable and available).
      }
    }
  },
  "created_at": 1678881295
}
```

```csharp
public async Task HandleWebhookAsync(string payload)
{
    // parsing JSON payload to structured
    using var doc = JsonDocument.Parse(payload);
    var root = doc.RootElement;

    var eventType = root.GetProperty("event").GetString();

    if (eventType != "payment.captured")
        return;

    var payment = root
        .GetProperty("payload")
        .GetProperty("payment")
        .GetProperty("entity");

    var razorpayOrderId = payment.GetProperty("order_id").GetString();
    var razorpayPaymentId = payment.GetProperty("id").GetString();
    var amount = payment.GetProperty("amount").GetInt64();

    // Idempotency check (exists or not in our database)
    var existingPayment = await _context.Payments
        .FirstOrDefaultAsync(p => p.PaymentId == razorpayPaymentId);

    // if there => replay attack
    if (existingPayment != null)
        return;

    // update order status to paid
    var order = await _context.Orders
        .FirstOrDefaultAsync(o => o.OrderId == razorpayOrderId);

    if (order == null)
        return;

    order.Status = "paid";
    order.PaymentId = razorpayPaymentId;

    var newPayment = new Entities.Payment
    {
        OrderId = razorpayOrderId!,
        PaymentId = razorpayPaymentId,
        Amount = amount,
        Status = "paid",
        BasketId = order.BasketId
    };

    _context.Payments.Add(newPayment);
    await _context.SaveChangesAsync();
}
```

## Clearing basket after payment

After a payment is confirmed (via webhook or verification):

- Order is marked paid
- Payment is recorded
- Basket must be cleared
- Basket must NOT be cleared before payment confirmation!

This ensures:

- No duplicate orders
- No accidental re-payments
- Clean user experience

Also in PaymentsService.cs inside HandleWebhookAsync method after adding new payment and before saving changes to DB, we will clear basket.

## Checkout page with a stepper

Check features/checkout folder.

Updated .env file to have:
`VITE_RAZORPAY_KEY_ID=your_key_id_here`

Vite only exposes environment variables to browser code if they start with VITE\_.

# Modifying order entity

## DDD-style Order Aggregate

Created many entities related to order inside Order Aggregate.
Next we created a claims principle extension method to get name of user. We have name and email both as email only. No we use them interchangeably.

To use User.Identity to fetch orders in OrdersController.cs we have created an extension method in Extensions/ClaimsPrincipalExtensions.cs that gaurntees non null value.

```csharp
return user.Identity?.Name ?? throw new UnauthorizedAccessException();
```

## Adding OrderController

We need 2 functionalities here:
First is to get all orders of logged in user and second is to get specific order by id of logged in user.

First we create Backend version of Order.
We no longer need to send basketId too. We will fetch order based on user only.

```csharp
    public async Task<ActionResult<int>> CreateOrder(OrderDto orderDto)
    {
        var basket = await _context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);

        if (basket == null || basket.Items.Count == 0)
            return BadRequest("Basket is empty or not found");

        var items = CreateOrderItems(basket.Items);
        var subtotal = items.Sum(item => item.price * item.Quantity);
        var deliveryFee = CalculatreDeliveryFee(subtotal);
        var order = new Entities.OrderAggregate.Order
        {
            BuyerEmail = User.GetUsername(),
            OrderItems = items,
            ShippingAddress = orderDto.ShippingAddress, // Placeholder
            Subtotal = subtotal,
            DeliveryFee = (long)deliveryFee,
            PaymentSummary = orderDto.PaymentSummary // Placeholder
        };

        _context.Orders2.Add(order);
        _context.Baskets.Remove(basket);
        Response.Cookies.Delete("basketId");
        var result = await _context.SaveChangesAsync() > 0;

        if(!result) return BadRequest("Problem creating order");
        return CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }); // Placeholder return
    }
```

Here CreatedAtAction method produces a 201 Created response, which is the standard HTTP status code for indicating that a new resource has been successfully created on the server. This is also appropriate here since we are creating a new order resource.

We will now also update our PaymentService's CreateOrderAsync accordingly to remove basketId from Payment entity.

Well what we did earlier is basically creating an payment intent.

Now we are dealing with actual order creation.

## ActionResult<T> and CreatedAtAction (Notes from Implementation)

While implementing the Orders API, I ran into runtime issues related to response types and routing.
This section documents how `ActionResult<T>` and `CreatedAtAction` work and how to use them correctly.

---

### ActionResult<T>

In Web APIs, an endpoint may return:

- Success data
- Validation errors
- Authorization errors
- Not found responses

A single return type is not sufficient for all cases.

`ActionResult<T>` solves this by allowing an action to return:

- A value of type `T`, or
- An HTTP response (`BadRequest`, `NotFound`, etc.)

Example:

```csharp
public async Task<ActionResult<int>> CreateOrder(OrderDto orderDto)
```

If a value of `T` is returned:

```csharp
return order.Id;
```

ASP.NET Core automatically converts it to:

```
200 OK
```

If an HTTP result is returned:

```csharp
return BadRequest("Basket is empty");
```

The framework sends the corresponding status code and message.

---

### CreatedAtAction

When creating a new resource, REST conventions recommend:

- Returning `201 Created`
- Including a `Location` header pointing to the new resource

`CreatedAtAction` is used for this purpose.

Signature:

```csharp
CreatedAtAction(string actionName, object routeValues, object value)
```

Example:

```csharp
return CreatedAtAction(
    nameof(GetOrderDetails),
    new { id = order.Id },
    order.Id
);
```

This produces:

- HTTP 201
- A `Location` header resolved using the target action’s route
- A response body containing the supplied value

---

### Common Pitfall

`CreatedAtAction` **must include a response body**.

Incorrect usage:

```csharp
CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id });
```

This causes a runtime error because ASP.NET Core expects a value to serialize for `ActionResult<T>`.

---

### When to Use CreatedAtAction

Use it when:

- A new resource is created
- A corresponding GET endpoint exists
- The resource should be discoverable via a URL

Examples:

- Orders
- Products
- Users

---

### When Not to Use It

Do not use `CreatedAtAction` for:

- Login or logout
- Payments
- Webhooks
- Command-style endpoints

In these cases, returning `Ok()` or `NoContent()` is sufficient.

---

## Shapping Order JSON data

OrderDto.cs && OrderItemDto.cs

Also added an extension method to map Order to OrderDto in MappingProfiles/OrderMappingProfile.cs where we map Objects to DTOs mannually.

### Eager loading vs Projection

```csharp
public async Task<ActionResult<List<Entities.OrderAggregate.Order>>> GetOrders()
{
    var email = User.Identity?.Name;
    var orders = await context.Orders2
        .Include(o => o.OrderItems)
        .Where(o => o.BuyerEmail == User.GetUsername())
        .ToListAsync();

    return Ok(orders);
}
```

We first load all order items related to the order using eager loading with Include.
However, this fetches entire OrderItem entities, which may contain unnecessary data.

So we use projection to directly shape the data into OrderDto and OrderItemDto:

```csharp
using System;
using API.DTOs;

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
        });
    }
}
```

Now we directly project the query results into the desired DTO shape, fetching only the necessary fields.

```csharp
public async Task<ActionResult<List<OrderDto>>> GetOrders()
{
    var email = User.Identity?.Name;
    var orders = await context.Orders2
        .ProjectToDto()
        .Where(o => o.BuyerEmail == User.GetUsername())
        .ToListAsync();

    return orders;
}
```

This returned ones are much lighter and efficient.

Right after this we got:

```json
{
 "title": "A tracking query is attempting to project an owned entity without a corresponding owner in its result, but owned entities cannot be tracked without their owner. Either include the owner entity in the result or make the query non-tracking using 'AsNoTracking'.",
    "status": 500,
    ...
}
```

This error occurs because Entity Framework Core requires that owned entities be tracked along with their owners. When projecting owned entities without including their owners, EF Core cannot track them properly.

So we use `.AsNoTracking()` to make the query non-tracking.

## Client Side of Orders

First create order model.ts in features/orders folder.
Then create ordersApi.ts in features/orders folder.

Updated CheckoutPage.tsx to create order after payment is successful.

When Razorpay succeeds, you typically get:

handler: function (response) {
response.razorpay_order_id
response.razorpay_payment_id
response.razorpay_signature
}

Since we create order right after payment success, we continue from there.

### Razorpay vs Stripe – Card Details Summary

❌ Razorpay does NOT support frontend card previews

There is no equivalent to Stripe’s:

confirmationToken.payment_method_preview.card

Razorpay never exposes:

card brand

last 4 digits

expiry month/year
on the frontend, at any stage.

This is intentional for PCI compliance.

✅ What Razorpay gives on the frontend

Only this, after checkout success:

{
razorpay_payment_id,
razorpay_order_id,
razorpay_signature
}

No card metadata. Ever.

Thus, we are changing PaymentSummary to only have paymentId, OrderId, and status in backend as well.

```csharp
using System;
using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate;

[Owned]
public class PaymentSummary
{
    public required string RzpPaymentId { get; set; }
    public required string RzpOrderId { get; set; }
    public required string RzpSignature { get; set; }
}
```

npm install js-cookie

To remove basketId cookie after order creation in CheckoutPage.tsx

```typescript
clearBasket: builder.mutation<void, void>({
  queryFn: () => ({data: undefined}),
  onQueryStarted: async (_, {dispatch}) => {
    dispatch(
      basketAPI.util.updateQueryData("fetchBasket", undefined, (draft) => {
        draft.items = [];
        draft.basketId = '';
      })
    );
    Cookies.remove('basketId');;
  }
}),
```

We pass payment details in order to create order via CreateOrder mutation, from within PaymentStep.tsx and invalidate cache using clearBasket.

We use state to pass order data received to CheckoutSuccessPage.tsx to show order details.

we use unwrap, because we get response usually wrapped in an object (wrapper) by default, and to get original structure back we unwrap it.

Added a checker to verify payment while creating order.

```csharp
public async Task<bool> ConfirmRazorpayPaymentAsync(PaymentSummary paymentSummary)
    {
        var razorpayOrderId = paymentSummary.RzpOrderId;
        var razorpayPaymentId = paymentSummary.RzpPaymentId;
        var razorpaySignature = paymentSummary.RzpSignature;
        try
        {
            // 1Verify Razorpay signature (authenticity)
            var attributes = new Dictionary<string, string>
        {
            { "razorpay_order_id", razorpayOrderId },
            { "razorpay_payment_id", razorpayPaymentId },
            { "razorpay_signature", razorpaySignature }
        };

            Utils.verifyPaymentSignature(attributes);
            var _razorpayClient = new RazorpayClient(_keyId, _keySecret);

            //  Fetch payment from Razorpay (authority check)
            var payment = _razorpayClient.Payment.Fetch(razorpayPaymentId);

            // 3Ensure payment belongs to this order
            if (payment["order_id"]?.ToString() != razorpayOrderId)
                return false;

            // Ensure money was actually captured
            if (payment["status"]?.ToString() != "captured")
                return false;

            //  Load your store order
            var order = await context.Orders
                .FirstOrDefaultAsync(o => o.OrderId == razorpayOrderId);

            if (order == null)
                return false;

            // 6️Verify amount (paise)
            if ((int)payment["amount"] != order.Amount)
                return false;

            // 7 Idempotency check (already paid)
            if (order.Status == "paid")
                return true;
            return true;
        }
        catch
        {
            return false;
        }
    }
```

# Finally: Publishing

Azure + CI/CD

## Added home page

## Creating Production build

We're going to use .Net kestral server, the web API server to host our client application.
We make sure that when clientbrowser goes to localhost 5001, we're going to configure our API to return contents of a root folder and client will effectively download our react application and then use that downloaded code.

Go to `vite.congig.ts` and specify build property. inside config

```ts
build:{
    outDir: '../API/wwwroot'
  },
```

Create production version of env file `.env.production`.

```ts
VITE_RAZORPAY_KEY_ID=rzp_test_Rr3UQO6CfSeK0N
VITE_API_URL=/api
```

Before this we need to update customBaseQuery in `baseAPI.ts` to:

```ts
const customBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
});
```

also over there we introduced delay using `sleep()`, which we don't need any more in production mode.
So we let it happen in dev mode only.

```ts
if (import.meta.env.DEV) await sleep();
```

Now lets build our application...

If we check in `package.json` to see cmd to compile our script to js code.

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build", <this one>
    "lint": "eslint .",
    "preview": "vite preview"
  },
```

So we just do `npm run build`

I got some silent errors that i left before, highlighted. Resolved them.

Now translation is done and got new dir at `API/wwwroot` and a single page as this is SPA sitting in index.html.

But we still got some warnings:

```cmd
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
✓ built in 1m 46s
```

So we tweek `vite.config.ts` more.

```ts
build: {
    outDir: "../API/wwwroot",
    chunkSizeWarningLimit: 1024,
    emptyOutDir: true
  },
```

and run again.

We will get different index .js and .css files imported in index.html, if we update code.

```html
<script type="module" crossorigin src="/assets/index-65pj7xft.js"></script>
<link rel="stylesheet" crossorigin href="/assets/index-De7bnZP4.css" />
```

## How to run that from API

But all those are static assets and our API server is not configured to return static assets from here.
So for now 5001 don't return anything.

So we now need few more tweeks in Program.cs. Ordering is very important here.

We need to add 2 middlewares:

- Just after adding Exception Middleware. Add `app.UseDefaultFiles();`. This Enables default file mapping on the current path. Files are served from the path specified in IWebHostEnvironment.WebRootPath or IWebHostEnvironment.WebRootFileProvider which defaults to the 'wwwroot' subfolder.
- And we also need to tell it to return static files. Next to the previous one, add `app.UseStaticFiles()`.

Now we can see thing loaded. But if we navigate to anywhere and refresh, it colapses.

```
This localhost page can’t be found
No webpage was found for the web address: https://localhost:5001/catalog
HTTP ERROR 404
```

Only `https://localhost:5001` works.

We need to tell our api to use a fall back option if it does not recognise the root, then it need to pass that to react application which dos have react router and can handle that particular root. So a typical approach to do this is to use a fall back controller.

Back to API controllers, lets create new class file. This is not a API endpoint controller.

Microsoft.AspNetCore.Mvc's Controller base class for an MVC controller with view support. and index.html is basically a view.

This controllers purpose is to return only index.html view.

```cs
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[AllowAnonymous]
public class FallbackController: Controller //  base class for an MVC controller with view support.
{
    public IActionResult Index()
    {
        return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
    }
}
```

And we specify this when to be triggered in `program.cs`.

Just before DB initialization, keep this (among mappers):

```cs
app.MapFallbackToController("Index", "Fallback");
```

## Sitching to SQL server

Lets use docker desktop.
Create in root directory, `docker-compose.yml` where we specify which file to run. yml files are fussy.

```yml
version: "3.9"

services:
  sql:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: storeapp-sql
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: "Password@1"
    ports:
      - "1433:1433"
    volumes:
      - sql-data:/var/opt/mssql

volumes:
  sql-data:
```

and in root dir run `docker compose up -d`.

Image created.

Now update connection string in appsettings.Development.json to:

```json
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=shop;User Id=sa;Password=Password@1;TrustServerCertificate=True;"
  },
```

because we are using self-signed certificates here.

We now need new nuget package for SQL server. `Microsoft.EntityFrameworkCore.SqlServer`.
We can also remove Sqlite package now in API.csproj.

Since our project is based on dotnet 9, we need to install version 9.0.4 of that package.

```xml
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="9.0.4" />
```

And in program.cs class, we need to update DB context to use Sql server.

```csharp
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
```

If we check migrations, they do used sqlite specific data types and functions. so we neet to remove existing migrations and create new migrations for sql server.
So delete Migrations folder in API project.

Then run:

```cmd
dotnet ef migrations add SqlServerInitial -o Data/Migrations
```

and migration is created.

check docker desktop to see if sql server container is running.
or run `docker ps` in cmd.
If no container is running, run `docker compose up -d` again.

Restart application.

Now we see many logs showing many tables created in sql server database.

We did few errors in initdb that we kept return type for async method as void instead of Task. Which failed silently and we didn't get db initialized and no products are shown in catalog page.

Also keep await in front of initdb method call in Program.cs `await DbInitializer.InitDb(app);`.

No first lets drop existing database and let application create new one with tables. From API terminal run:

```cmd
dotnet ef database drop
```

And run dotnet watch again.

Now we see many logs showing more than before, tables created in sql server database.

And success! We see products in catalog page.

## AZURE

We are going to use free Azure Services available with free account.

Azure>Pricing>Free services>Databases>SQL Database

**Limits:** 100000 vCore Seconds (Last for only 2 days) /month, but can be paused when not in use. 32GB storage. Don't charge, just stops after limit is reached.

We are also gonna use Azure App Service to host our API and Client application.

**Limits:** 10 web, mobile, or API apps with 1 GB storage each 1hr per day.

Go to azure portal and click on creat resource

I got an issue

```txt
Selected user account does not exist in tenant 'Microsoft Services' and cannot access the application '0a2057a8-149c-40ca-859e-98de032535fb' in that tenant. The account needs to be added as an external user in the tenant first. Please use a different account.:
```

For this i refered youtube...

- search for MS business basic
- Try for free
- Fill details
- set up a new account
- company name etc as your wish
- then it might ask PAN card details
- Then it creates account
- Then we are thaken to payment page, which we can skip for now as we are using free services.
- `karrilakshminarasimhareddy@storistiq.onmicrosoft.com`
  **Didn't work**

- Search microsoft devoloper program
- Click `join now`

- go to azure portal

`Nothing Worked!`

Password@1

### Why?

Microsoft is no longer accepting non tenant accounts to do anything with their services. So we may need to shift to other cloud services. "Microsoft (MS) is increasingly restricting access for non-tenant (external/guest) accounts to specific organizational services for better security, primarily through Microsoft Entra Tenant Restrictions (TR), which blocks unwanted tenants and allows controlled access to specific apps or resources, meaning external users can't just access anything unless explicitly invited or allowed via guest accounts or Multi-Tenant Organizations (MTOs)"

### Alternative: AWS Free Tier

- Go to aws.amazon.com
- New account `NarasimhaAsDev`
- choose free plan
- Fill details etc...
- Taken to Console
- Search for IAM and click it
- Setup MFA (Named RootMFA)
- Create an admin user via IAM>Users>Create user
  - Given user name `NarasimhaAsDEV`
  - toogle `provide user access to AWS Management Console`
  - StoristiqDev@1
  - attach policies `AdministratorAccess`
  - Next>create user
  - Link in bookmarks
- Now we see Console Sign-in link. Copy that for future use.
- `https://165690631062.signin.aws.amazon.com/console`
- Enable billing alarms
  - To do this follow `https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started-account-iam.html?icmpid=docs_iam_console#tutorial-billing-step1`
  - Bills > Billing preferences > toogle `Receive Billing Alerts` > save preferences

  for more follow `https://www.youtube.com/watch?v=CjKhQoYeR4Q&t=105s`

## Configuring AWS

2nd. Following steps from `https://www.youtube.com/watch?v=tfjAE6hiN5c&t=1s` to deploy ASP.NET Core app to AWS EC2 instance.

- name of user in priniple given to .pem file with all permissions: 'NITHISH/laksh'
- Connection process:
  - Open terminal
  - cd to .pem file location
  - run `ssh -i "Storistiq-store-keypair.pem" ec2-user@ec2-54-221-175-89.compute-1.amazonaws.com`
- Install dotnet 9.0.11 sdk and runtime
- Directory created: Storistiq
-

1st. And to create a sql server: `https://www.youtube.com/watch?v=rtLZWtGO7uE`.

- Name given: Storistiq-store
- Master username: NarasimhaAsAdmin
- Password: StoristiqStoreMA

- We can connect sql server to an EC2 instance from here.
- First create EC2 instance.
  - Name given: Storistiq-EC2
  - AWS linux 2023 AMI
  - created key pair name: Storistiq-store-keypair
  - .pem, RSA stored in :D/Storistiq AWS
  - Instance created.
  - aws kms key: aws/rds
  - ID: alias/aws/rds
  - Make Modify > connectivity > Additional configuration > Public accessibility: Yes
  - Security group inbound rules:
    - Type: MS SQL, Protocol: TCP, Port range: 1433, Source: My IP

Testing connection from EC2 to RDS sql server:

```cmd
   18  ssh -i "Storistiq-store-keypair.pem" ec2-user@ec2-54-221-175-89.compute-1.amazonaws.com
   19  sudo yum install -y mssql-tools unixODBC-devel
   20  exec bash
   21  sudo curl -o /etc/yum.repos.d/mssql-release.repo https://packages.microsoft.com/config/rhel/9/prod.repo
   22  sudo yum install -y unixODBC unixODBC-devel
   23  sudo ACCEPT_EULA=Y yum install -y mssql-tools
   24  echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> .bash_profile
   25  exec bash
   26  sqlcmd -?
   27  echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
   28  exec bash
   29  sqlcmd -?
   30  nc -vz storistiq-store.cctam8oaaezv.us-east-1.rds.amazonaws.com 1433
   31  sudo yum install -y nmap-ncat
   32  nc -vz storistiq-store.cctam8oaaezv.us-east-1.rds.amazonaws.com 1433
   33  history
```

Connection successful.

```cs
[ec2-user@ip-172-31-31-83 ~]$ nc -vz storistiq-store.cctam8oaaezv.us-east-1.rds.amazonaws.com 1433
Ncat: Version 7.93 ( https://nmap.org/ncat )
Ncat: Connected to 172.31.96.59:1433.
Ncat: 0 bytes sent, 0 bytes received in 0.02 seconds.
```

While reconnecting: Go to `Instance>Connect` copy paste cmd in your terminal.

- Security group, that sql server is attached to `rds-ec2-1 (sg-05dc2360b224ac96c)`

In order to permantly stop sql server, we can take a snapshot of sql server and delete it. It can be later restored.

- When restored select `rds-ec2-1 (sg-05dc2360b224ac96c)` as security groups
- In `appsettings.Production.json` change `Connection String` to `storistiq-store-restored.xxxxxx.rds.amazonaws.com`...

## Publishing

Run: `dotnet publish -c Release -r linux-x64 -o ./bin/publish`
in API project folder.

As our ec2 instance is linux based.

Then copy files to ec2 instance using scp.

```cmd
scp -r -i .\Storistiq-store-keypair.pem .\API\bin\publish\* ec2-user@ec2-54-221-175-89.compute-1.amazonaws.com:~/Storistiq
```

```cmd
sudo yum install -y icu
```

```cmd
nano appsettings.Production.json
```

Then:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=storistiq-store.cctam8oaaezv.us-east-1.rds.amazonaws.com,1433;Database=storistiq-store;User Id=NarasimhaAsAdmin;Password=StoristiqStoreMA;TrustServerCertificate=True;"
  },
  "RazorpaySettings": {
    "KeyId": "rzp_test_Rr3UQO6CfSeK0N",
    "SecretKey": "5BPPkSBL2d1DFlKHBeb1Vwye",
    "WebhookSecret": "BCS0028-store-20201086"
  }
}
```

```cmd
export ASPNETCORE_ENVIRONMENT=Production
export ASPNETCORE_URLS=http://0.0.0.0:5000
echo $ASPNETCORE_ENVIRONMENT
dotnet API.dll
```

Adding into security group related to `Launch-wizard-1` inbound rules:

- Type: Custom TCP, Protocol: TCP, Port range: 5000, Source: 0.0.0.0/0

### to avoid costs

- Took a snapshot of sql server.
- Deleted sql server.
- Stoped EC2 instance
  No more aws billing headaches.

## Deploying in Render

Configuring app to accept postgress

```cmd
docker pull postgres:16-alpine
```

Updated Compose file:

```docker
version: "3.9"

services:
  postgres:
    image: postgres:16-alpine
    container_name: storeapp-postgres
    environment:
      POSTGRES_DB: storedb
      POSTGRES_USER: storeuser
      POSTGRES_PASSWORD: pgStore@1
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

`docker compose up -d`

In `appsettings.Development.json`:

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=storedb;Username=storeuser;Password=pgStore@1;"
  },
  "RazorpaySettings": {
    "KeyId": "rzp_test_Rr3UQO6CfSeK0N",
    "SecretKey": "5BPPkSBL2d1DFlKHBeb1Vwye",
    "WebhookSecret": "BCS0028-store-20201086"
  }
}
```

Added new nuget for postgress and removed sql related ones.

Also update this:

```cs
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
```

then apply migrations.

## Continuing with CI/CD setup and Render

- Create PostgreSQL on Render
- Go to Render
- New → PostgreSQL
- Choose:
  - Free / Starter
  - Region close to users
- Create DB
  After creation, copy:
- Internal Database URL

storistiq-store
Dbname: storistiq_store_1
Dbuser: storeuser
Copy internal database url: \*\*\*

**NOTE**: This database only exist for one month.

Create new web service.

- Keep copied URL in env variables as ConnectionStrings\_\_DefaultConnection, and all other variables too
  - RazorpaySettings\_\_WebhookSecret
  - RazorpaySettings\_\_SecretKey
  - RazorpaySettings\_\_KeyId
- Dockerfile path: `storeApp/Dockerfile`

Dockerfile:

```c
# ---------- Build stage ----------
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY . .
WORKDIR /src/API
RUN dotnet publish API.csproj -c Release -o /app/publish

# ---------- Runtime stage ----------
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

COPY --from=build /app/publish .

# Render uses port 10000
ENV ASPNETCORE_URLS=http://0.0.0.0:10000
ENV ASPNETCORE_ENVIRONMENT=Production

EXPOSE 10000

ENTRYPOINT ["dotnet", "API.dll"]

```

set connection string:

Take:

```yaml
postgres://user:password@host/dbname
```

Convert to:

```cs
Host=host;Port=5432;Database=dbname;Username=user;Password=password;SSL Mode=Require;Trust Server Certificate=true
```

# The final part: CRUD operations and Roles

Installed `Oh my posh`.

To not kickoff render to use new code without testing, lets create a new branch.

```cmd
git checkout -b Inventory
```

## Creating Product

DTOs>CreateProductDto

Adding new endpoint in ProductsController.cs

```cs
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Product>> CreateProduct(CreateProductDto createProductDto)
    {
        var product = new Product
        {
            Name = createProductDto.Name,
            Description = createProductDto.Description,
            Price = createProductDto.Price,
            PictureUrl = createProductDto.PictureUrl,
            Brand = createProductDto.Brand,
            Type = createProductDto.Type,
            QuantityInStock = createProductDto.QuantityInStock
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }
```

But now lets use auto mapper for this:

- Install Nugget Automappper 13.0.0 (Version is important)
- Configure in Program.cs add new service just below add CORS:

```cs
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
```

Now in ProductsController.cs add IMapper mapper; and initialize in constructor and use that in CreateProduct method.

```cs
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Product>> CreateProduct(CreateProductDto createProductDto)
    {
        var product = _mapper.Map<Product>(createProductDto);

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }
```

In API call,

https://picsum.photos/500 is a placeholder image URL from the Picsum Photos service.

Here’s what it means:

picsum.photos is a free service that provides random placeholder images — commonly used by developers and designers when they need a quick image to fill space in layouts, mockups, or prototypes.

When you visit https://picsum.photos/500 in your browser, it returns:

A 500 × 500 pixel image

The image is randomly chosen each time you load the link

So the URL doesn’t point to one specific photo — it dynamically gives you a different random photo of the specified size (500 × 500) on each request.

`{{$randomProductName}}` is a Postman Dynamic Variable

- Built into Postman
- Evaluated at request-send time
- Replaced with a generated value before the HTTP request is sent
- You don’t define it. Postman does.

### similar built-in Postman dynamic variables

| Variable                 | Example output                         |
| ------------------------ | -------------------------------------- |
| `{{$randomUUID}}`        | `7a5d9f9e-2c1a-4bcb-b9e4-0e5f9b0a6f3d` |
| `{{$randomInt}}`         | `4832`                                 |
| `{{$randomEmail}}`       | `alice23@test.com`                     |
| `{{$randomProductName}}` | `Fantastic Rubber Table`               |
| `{{$timestamp}}`         | `1705408234`                           |

## Editing Product

Refer to API/DTOs/UpdateProductDto.cs and ProductsController.cs > UpdateProduct method.

In mapping profiles create new profile for UpdateProduct to Product mapping.

## Deleting a Product

Refer to ProductsController.cs > DeleteProduct method.

## Adding Photo Uploading Capability

Cloudinary.com

We will get 25GiB storage and 25,000 transformations free per month. Thus we can store our product images here.

Go to dashboard and get:

- Cloud name
- API secret
- API keys
  into appsettings.json

```json
  "Cloudinary": {
    "CloudName": "dmyt1j6dj",
    "ApiKey": "123456789012345",
    "ApiSecret": "ABCDEFGHIJKLMNO-PQRSTUVWXYZ"
  },
```

To access these, we use a new RequestHelper class `CloudinarySettings`. Using it, we can bind configuration values to a strongly typed class. This allows us to easily access Cloudinary settings throughout the application.

In Program.cs, we register this configuration binding:

```csharp
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("Cloudinary"));
```

Add a new nuget package `CloudinaryDotNet` version 1.27.9

Create new service `ImageService.cs` to handle photo uploads to Cloudinary.

- We can use `IOptions<CloudinarySettings>` to access Cloudinary configuration settings injected via dependency injection.
- `IFormFile` represents a file sent with the HTTP request. It is commonly used in ASP.NET Core to handle file uploads from clients.
- `using` keyword ensures that the `stream` object is properly disposed of after use, releasing any resources it holds.
- Cloudinary provides the parameters object to specify upload options like file, folder, transformation, etc.
- It also provides `UploadAsync` method to upload file asynchronously.
- It also provides deletion of image by publicId via `DestroyAsync`.

Add this service in Program.cs

## Using image service in ProductsController

Mentioning of publicId, we do get that from Cloudinary when we upload an image. It is a unique identifier for each uploaded image in Cloudinary. We store this publicId in our database along with the image URL. This allows us to easily reference, manage, and delete the image later if needed.

So we need to update Product entity to have PublicId property. It must be optional in our case, since our existing products don't have images uploaded to Cloudinary yet while seeding.

The add migrations and also update controller methods to use ImageService for uploading and deleting images when creating, updating, or deleting products.

Also in CreateProduct dto, allow it to take IFormFile for image upload instead of URL string.

CreateProduct controller method update:

```cs
if(productDto.File != null)
{
    var imageResult = await imageService.AddImageAsync(productDto.File);
    if(imageResult.Error != null) return BadRequest(imageResult.Error.Message);

    product.PictureUrl = imageResult.SecureUrl.ToString();
    product.PublicId = imageResult.PublicId;
}
```

## Edit and delete image options

- Bring in properties of CreateProductDto into UpdateProductDto.cs
- Make file upload optional
- use similar code as in CreateProduct, in UpdateProduct method of ProductsController.cs to upload new image if provided.
- also delete existing image from Cloudinary if publicId exists.

```cs
if(productDto.File != null)
{
    var imageResult = await imageService.AddImageAsync(productDto.File);
    if(imageResult.Error != null) return BadRequest(imageResult.Error.Message);

    if(!string.IsNullOrEmpty(product.PublicId))
    {
        var deleteResult = await imageService.DeleteImageAsync(product.PublicId);
        if(deleteResult.Error != null) return BadRequest(deleteResult.Error.Message); // Or we can ignore
    }

    product.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
    product.PublicId = imageResult.PublicId;
}
```

# To the Client side of CRUD operations

- Create new feature folder `admin` in src/features.
- Inside it create `inventoryPage.tsx` for managing products.
- Add it to routes.

## Adding zod schema

Refer admin/ProductForm.tsx

- create new schema `lib/schemas/createProductSchema.ts` for product form validation using zod.
- Create a form component `admin/ProductForm.tsx` to handle both create and edit product forms.
- Using react-hook-form with zod resolver for form validation.
- Using useState, add editmode to toggle between create and edit modes.
- Created a one liner utility component `app/shared/components/AppTextInput` to make a reusable component for text inputs with labels and error messages.
  - it takes label, name and zod controller as props.
  - Also we need to deal with props (ts)

```ts
type Props<T extends FieldValues> = {
  label: string;
  name: keyof T;
} & UseControllerProps<T> &
  TextFieldProps;
```

## Reusable select input

Again new shared component `app/shared/components/AppSelectInput.tsx` to make a reusable component for select inputs with labels and error messages.

Similar to AppTextInput but we will also have list of items to show in select dropdown.

## Dropzone for image upload

We have react-dropzone package for that.

```cmd
npm install react-dropzone
```

Similar to previous 2 components, create new shared component `app/shared/components/AppDropzone.tsx` for image upload using dropzone.

```tsx
type Props<T extends FieldValues> = {
  name: keyof T;
} & UseControllerProps<T>;

export default function AppDropzone<T extends FieldValues>(props: Props<T>) {
  const { fieldState, field } = useController({ ...props });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
        const fileWithPreview = Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0])
        });
        field.onChange(fileWithPreview);
    }
  }, [field]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  ...
```

What this means

- T extends FieldValues
  - FieldValues comes from react-hook-form
  - It represents the shape of your form data (e.g. { image: File; name: string })
  - Using a generic T makes this component form-agnostic and reusable

- name: keyof T
  - Ensures the name prop must be a valid field name from the form

### How `keyof T` Controls String Names (Brief)

- `keyof T` creates a **union of allowed string literals** from the keys of type `T`

  ```ts
  type Form = { image: File; price: number };
  type Keys = keyof Form; // "image" | "price"
  ```

- When used as a prop:

  ```ts
  name: keyof T
  ```

  TypeScript **only allows those exact strings** at compile time.

- Valid usage:

  ```tsx
  <AppDropzone<Form> name="image" />
  ```

- Invalid usage (compile-time error):

  ```tsx
  <AppDropzone<Form> name="thumbnail" />
  ```

- This works **only at TypeScript compile time**, not at JavaScript runtime.
  - JavaScript sees all values as plain strings.
  - TypeScript blocks invalid strings before the app runs.

- Think of `keyof T` as:

  > **A restricted vocabulary of allowed string literals, not runtime validation**

* `& UseControllerProps<T>`
  - Merges all props required by useController
  - Includes things like:
    - control
    - rules
    - defaultValue

Connecting to React Hook Form (useController)

It returns:

- field
  - { value, onChange, onBlur, ref }
  - Used to read/write form state

- fieldState
  - { error, invalid, isTouched }
  - Used for validation feedback

Step-by-step

1. useCallback
   - Memoizes the function
   - Prevents unnecessary re-renders
   - Dependency: [field]

2. acceptedFiles[0]
   - Dropzone allows multiple files
   - You only care about the first one

3. Adding preview
   - We are creating a new Object, with image and a url field `preview`
   - `URL.createObjectURL(file)`
   - Creates a temporary local URL
   - Lets you show an image preview instantly
   - No server upload needed

Also add this transformation in create product schema

```tsx
const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0, {
    message: "A file must be uploaded",
  })
  .transform((file) => ({ ...file, preview: URL.createObjectURL(file) }));
```

4. field.onChange(fileWithPreview)
   - Updates React Hook Form state
   - This is equivalent to typing in a normal <input />

React hook Forms also provides us with `watch` functionality, that lets us observe form field values.

- What it does
  - Reads current form values without causing re-renders
  - Reacts to user input instantly
  - Useful for conditional UI, previews, or derived logic

## Editing functionality

Same form but prefilled text

## Creating RTK queries

refetch: forces query to be refetched.

```ts
const { data, refetch } = useFetchProductsQuery(productParams);
```

Also added a clean up function to clear form, after the job is done.

By default, the query goes to backend as `application.json`, but we need it as form-data, as e did in postman before.

So it failed, Silently!

## Avoiding silent failure

Before that, we shold not let it fail silently. We notify it to the admin. We did this for register form, already. But this time, we make it, reusable.

In `client/lib/util.tsx`, lets implement this.

- This is bit specific to react hook forms

```ts
export function handleApiError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  fieldNames: Path<T>[], // array of strings represinting schemes present in that createProductSchema
) {
  const apiError = (error as { message: string }) || {};
  // take message from string or we don't know what format it came

  if (apiError.message && typeof apiError.message === "string") {
    const errorArray = apiError.message.split(","); // we get as CSV list

    errorArray.forEach((e) => {
      const matchedField = fieldNames.find((fieldName) =>
        e.toLowerCase().includes(fieldName.toString().toLowerCase()),
      );

      if (matchedField) setError(matchedField, { message: e.trim() });
    });
  }
}
```

And use it like this:

```ts
 catch (error) {
      console.log(error);
      handleApiError<CreateProductSchema>(error, setError, [
        "brand",
        "description",
        "file",
        "name",
        "pictureUrl",
        "price",
        "quantityInStock",
        "type",
      ]);
    }
```

`setError` by react-hook-forms lets you:

- Add an error programmatically
- Trigger errors from:
  - API responses
  - Business rules
  - Cross-field logic
- Show the error exactly like a validation error

Now we are getting all the errors, back.

## Setting up format

As mentioned before:
"By default, the query goes to backend as `application.json`, but we need it as form-data, as e did in postman before."

Lets create a helper function to do this:

```ts
const createFormData = (items: FieldValues) => {
  const formData = new FormData();
  for (const key in items) {
    formData.append(key, items[key]);
  }
};
```

Instead of passing data to [update/create]ProductMutation, lets use this formData.

Also specify it's type `FormData` in adminApi as we are passing it to those mutations.

Also instead of `{...data, id}` use `data.append('id', id.toString());`. Otherwise we cant surely say how it is formatting that data.

## Removing form data persistence

We need to `setSelectedProduct` to null, which is used in InventoryPage. Lets bring that here to ProductForm.

I have also added option to type the brand and type by selecting the option `Other` in AppSelectInput.

For that i have use this simple helper function:

```tsx
const handleChange = (value: string) => {
  if (value === "Other") {
    setShowInput(true);
    field.onChange("");
  } else {
    setShowInput(false);
    field.onChange(value);
  }
};
```

## At last: Protecting admin routes on the client

Adding 403 forbidden case into baseApi. Since it returns absolute null, we need to specify info manually.

We need to update `RequireAuth.tsx`

``` ts
  const adminRoutes = [
    '/inventory',
    '/admin-dashboard' // does not exist
  ]

  if(adminRoutes.includes(location.pathname) && !user.roles.includes('Admin')){
    return <Navigate to='/' replace /> // clicking back may take to inventory
    // so we are replacing url itself (kicks to homepage)
  }
```

Lets also remove option that shows this link in non admin user.

## Last Git commit with course

Pushed, Created Pull Request, Git-hub Checked Pull request, and Merged Pull request.

# Wrapping up

I started this project sometime around June 2025, and today—19 January 2026—I’m finally wrapping it up.

Although there are still a few unimplemented features like profile, contact, and coupons, I’ve covered everything that felt essential. More importantly, this project taught me a lot—about full-stack architecture, state management, authentication, payments, deployment, and, frankly, patience.

At this point, I’m a bit tired of the project (or maybe just a little lazy 😅). I might come back in the future to clean things up or finish what’s left—especially the Razorpay payment flow, where I currently create the rzpayOrder and handle payment linking inside the same function, which I know isn’t ideal.

The application was deployed on Render, but since the free-tier database expires every month, I’d have to recreate the database regularly just to keep it alive. Because of that, I’ve decided not to include a live deployment link here. Sorry about that!

If you’ve scrolled this far—thank you.

And if you explored the GitHub repo or went through the project files, I really appreciate the time you took.

Hope you have a great day.
