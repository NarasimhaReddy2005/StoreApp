# StoreApp — Full-Stack E-Commerce Application

StoreApp is a full-stack e-commerce web application built as a learning-driven, production-style project using **ASP.NET Core** and **React**.  
The goal of this project was to design and implement a real-world system covering backend APIs, frontend state management, authentication, payments, and deployment.

> ⚠️ This repository focuses on **architecture, implementation, and learning**, rather than being a continuously hosted live product.

---

## What This Project Includes

### Backend (ASP.NET Core)
- RESTful Web API with clean architecture
- Entity Framework Core with migrations
- PostgreSQL / SQL Server support (environment-based)
- Cookie-based authentication using ASP.NET Identity
- Role-based authorization (Admin / Member)
- Global exception handling middleware
- DTOs, AutoMapper, and projection for performance
- Shopping basket & order domain modeling
- Razorpay payment integration with webhook verification
- Production-ready configuration & CI/CD-friendly setup

### Frontend (React + TypeScript)
- Single Page Application (SPA)
- React Router for routing
- Redux Toolkit + RTK Query for state & server data
- Material UI for UI components
- React Hook Form + Zod for form handling & validation
- Admin inventory management (CRUD)
- Cart, checkout, and order flow
- Persistent theme (dark/light mode)
- Error handling and protected routes

---

## Why This Project Exists

This project was built to:
- Understand **end-to-end full-stack architecture**
- Practice **real production patterns**, not tutorials
- Learn **state management, auth, payments, and deployment**
- Gain confidence working across **frontend + backend**

It evolved incrementally and intentionally mirrors how real applications grow.

---

## 📚 Documentation

All detailed explanations, setup notes, architecture decisions, and step-by-step implementation details have been moved to:

👉 **`docs.md`**

If you want to understand *how* and *why* things were built, start there.

---

## 🛠 Tech Stack

- **Backend:** ASP.NET Core 9, Entity Framework Core
- **Frontend:** React, TypeScript, Vite
- **State:** Redux Toolkit, RTK Query
- **UI:** Material UI
- **Database:** PostgreSQL / SQL Server
- **Auth:** ASP.NET Identity (Cookies)
- **Payments:** Razorpay
- **Deployment:** Docker, Render / AWS (tested)

---

## Project Status

This project is **feature-complete for learning purposes**.

Some features (profile, coupons, minor refinements) are intentionally left out.  
The application was deployed during development, but no permanent live URL is provided due to free-tier database limitations.

---

## 🙌 Final Note

This project represents months of consistent learning and iteration.  
If you’re reviewing this repository—thank you for taking the time.

For the full journey, design reasoning, and deep dives → **read `docs.md`**.

Happy coding 🚀
