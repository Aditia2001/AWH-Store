# AWH Store API

Backend REST API developed for the **PT. Adhikari Inovasi Indonesia (AWH) Fullstack Developer Take Home Test**.

The application is built using **Laravel 12** and follows a clean architecture by implementing the **Repository Pattern**, **Service Layer**, and **Dependency Injection**. Authentication is handled using **JWT**, while API responses are standardized through a custom `ApiResponse` helper.

---

## Overview

The API provides features for managing products, customer checkout, order history, and sales reports with role-based authorization.

### Available Roles

- **Admin**
  - Manage products (CRUD)
  - View sales reports

- **Customer**
  - Browse products
  - Checkout products
  - View order history
  - View order details

  ***

## Features

### Authentication

- User Registration
- JWT Login
- Logout
- Get Authenticated User

### Product Management

- Create Product
- Update Product
- Delete Product
- Product Listing
- Product Detail
- Product Search
- Pagination

### Order Management

- Checkout
- Order History
- Order Detail

### Reporting

- Sales Summary
- Top Selling Products
- Recent Orders

### Security

- JWT Authentication
- Role-based Authorization
- Request Validation
- Database Transactions

---

## Tech Stack

| Category             | Technology                           |
| -------------------- | ------------------------------------ |
| Backend Framework    | Laravel 12                           |
| Language             | PHP 8.2+                             |
| Database             | MySQL                                |
| Authentication       | JWT (php-open-source-saver/jwt-auth) |
| API Style            | REST API                             |
| Dependency Injection | Laravel Service Container            |
| Design Pattern       | Repository Pattern, Service Layer    |
| ORM                  | Eloquent ORM                         |
| Validation           | Form Request Validation              |
| Version Control      | Git                                  |
| API Testing          | Postman                              |

---

## Architecture

This project follows a layered architecture to separate responsibilities between business logic and data access.

```text
Client
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository Interface
   │
   ▼
Repository
   │
   ▼
Eloquent Model
   │
   ▼
MySQL
```

### Layer Responsibilities

#### Controller

- Receives HTTP requests
- Calls the appropriate service
- Returns standardized API responses

#### Service

- Contains business logic
- Coordinates application workflow
- Does not access the database directly

#### Repository

- Handles database queries
- Encapsulates Eloquent operations
- Implements repository interfaces

#### Model

- Represents database entities
- Manages relationships using Eloquent ORM

---

## Design Decisions

The project intentionally applies the following architectural decisions:

- Service Layer does not use interfaces to keep the business layer simple.
- Repository Layer uses interfaces to support dependency injection and loose coupling.
- ProductRepository extends BaseRepository to reuse common CRUD operations.
- AuthRepository, OrderRepository, and ReportRepository do not extend BaseRepository because they contain custom business queries rather than generic CRUD operations.
- All API responses are standardized using a custom `ApiResponse` helper.

---

## Project Structure

```text
app
├── Helpers
│   └── ApiResponse.php
│
├── Http
│   ├── Controllers
│   └── Requests
│
├── Interfaces
│
├── Models
│
├── Repositories
│   ├── BaseRepository.php
│   ├── AuthRepository.php
│   ├── ProductRepository.php
│   ├── OrderRepository.php
│   └── ReportRepository.php
│
├── Services
│
└── Providers
```

The project structure is organized using the Repository Pattern and Service Layer to improve maintainability, readability, and scalability.

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the backend project:

```bash
cd backend/awh-store-api
```

Install dependencies:

```bash
composer install
```

Copy the environment file:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

Generate JWT secret:

```bash
php artisan jwt:secret
```

---

## Environment Variables

Configure your `.env` file.

Example:

```env
APP_NAME=AWH Store API
APP_ENV=local
APP_DEBUG=true

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=awh_store
DB_USERNAME=root
DB_PASSWORD=

JWT_SECRET=your_generated_secret
```

---

## Database Migration

Run database migrations:

```bash
php artisan migrate
```

If seeders are available:

```bash
php artisan db:seed
```

Or:

```bash
php artisan migrate --seed
```

---

## Running the Application

Start the development server:

```bash
php artisan serve
```

The API will be available at:

```
http://127.0.0.1:8000
```

---

---

## API Documentation

API testing and documentation are provided through Postman.

### Postman Collection

```
docs/AWH Store API.postman_collection.json
```

### Postman Environment

```
docs/AWH Store Local.postman_environment.json
```

Import both files into Postman before testing the API.

---

## API Endpoints

### Authentication

| Method | Endpoint           | Access        |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Public        |
| POST   | /api/auth/login    | Public        |
| GET    | /api/auth/me       | Authenticated |
| POST   | /api/auth/logout   | Authenticated |

### Products

| Method | Endpoint           | Access |
| ------ | ------------------ | ------ |
| GET    | /api/products      | Public |
| GET    | /api/products/{id} | Public |
| POST   | /api/products      | Admin  |
| PUT    | /api/products/{id} | Admin  |
| DELETE | /api/products/{id} | Admin  |

### Orders

| Method | Endpoint             | Access   |
| ------ | -------------------- | -------- |
| POST   | /api/orders/checkout | Customer |
| GET    | /api/orders          | Customer |
| GET    | /api/orders/{id}     | Customer |

### Reports

| Method | Endpoint           | Access |
| ------ | ------------------ | ------ |
| GET    | /api/reports/sales | Admin  |

---

## Authentication

This project uses **JWT Authentication**.

To access protected endpoints:

1. Login using:

```
POST /api/auth/login
```

2. Copy the JWT token.

3. Send the token using the Authorization header.

Example:

```
Authorization: Bearer <your_token>
```

---

## Response Format

All endpoints return a standardized response using the custom `ApiResponse` helper.

Example success response:

```json
{
  "success": true,
  "message": "Request completed successfully.",
  "data": {}
}
```

Example error response:

```json
{
  "success": false,
  "message": "Something went wrong."
}
```

---

## Database Schema

### users

- id
- name
- email
- password
- role

### products

- id
- name
- description
- price
- stock
- image

### orders

- id
- user_id
- total_amount
- status

### order_items

- id
- order_id
- product_id
- quantity
- price

## Author

Developed by **Aditia Rafli Ilyasa**

As part of the **PT. Adhikari Inovasi Indonesia (AWH) Fullstack Developer Take Home Test**.
