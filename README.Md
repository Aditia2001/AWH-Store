# AWH Store - Fullstack Developer Take Home Test

AWH Store is a Fullstack web application developed for the **PT. Adhikari Inovasi Indonesia (AWH) Fullstack Developer Take Home Test**.

The project consists of:

- **Backend** built with Laravel 12 REST API
- **Frontend** built with React + Vite

The backend follows a layered architecture using **Repository Pattern**, **Service Layer**, and **Dependency Injection**, while authentication is implemented using **JWT Authentication**.

---

# Tech Stack

## Backend

- Laravel 12
- PHP 8.2+
- MySQL
- JWT Authentication (php-open-source-saver/jwt-auth)
- Repository Pattern
- Service Layer
- Dependency Injection
- Eloquent ORM

## Frontend

- React 19
- Vite
- Axios
- React Router DOM
- React Hook Form
- React Hot Toast
- Context API
- Plain CSS

## Development Tools

- Git
- Postman
- Visual Studio Code

---

# Project Structure

```text
Backend/
└── awh-store-api

Frontend/
└── awh-store-frontend

docs/
├── AWH Store API.postman_collection.json
└── AWH Store Local.postman_environment.json
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

Go to backend project

```bash
cd Backend/awh-store-api
```

Install dependencies

```bash
composer install
```

Copy environment file

```bash
cp .env.example .env
```

Generate application key

```bash
php artisan key:generate
```

Generate JWT secret

```bash
php artisan jwt:secret
```

Configure your database inside `.env`

```env
APP_NAME=AWH Store
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

Run migration

```bash
php artisan migrate
```

---

## Frontend Setup

Go to frontend project

```bash
cd ../awh-store-frontend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

---

# Running the Application

## Run Backend

```bash
cd Backend/awh-store-api

php artisan serve
```

Backend URL

```
http://127.0.0.1:8000
```

---

## Run Frontend

```bash
cd Frontend/awh-store-frontend

npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# API Documentation

API documentation is available through the provided Postman Collection.

```
docs/
├── AWH Store API.postman_collection.json
└── AWH Store Local.postman_environment.json
```

Import both files into Postman before testing the API.

---

# Available Features

## Authentication

- Register
- Login
- Logout
- Get Authenticated User

## Product

- Product List
- Product Detail
- Product Search
- Create Product
- Update Product
- Delete Product

## Order

- Checkout
- Order History
- Order Detail

## Report

- Sales Report

---

# Author

**Aditia Rafli Ilyasa**

Fullstack Developer Take Home Test – PT. Adhikari Inovasi Indonesia (AWH)
