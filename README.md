<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description



# 🛒 E-Commerce Inventory API

A RESTful API for managing products, categories, and authentication in an e-commerce inventory system.
Built with **NestJS**, **TypeScript**, **PostgreSQL**, and **TypeORM**.

---

## 🚀 Features

* **Authentication & Authorization**

  * Register new users with email, username, and hashed password.
  * Login with JWT-based authentication.
  * Protected routes.

* **Product Management**

  * Create, update, delete, and list products.
  * Filter by category, price range, pagination.
  * Search products by name/description.
  * Products linked to categories via one-to-many relationship.

* **Category Management**

  * Create, update, delete, and list categories.
  * View categories with product counts.
  * Restrict deletion if products are linked.

* **API Documentation**

  * Auto-generated with **Swagger** (`/api/docs`).

---

## 🏗️ Tech Stack

* **Backend:** NestJS (Node.js + TypeScript)
* **Database:** PostgreSQL (Supabase)
* **ORM:** TypeORM
* **Auth:** JWT
* **Hosting:** Vercel (Backend)


---

## 📌 API Endpoints

### 🔐 Auth

* `POST /api/auth/register` → Register new user
  ```
  {
  "name": "Tareq Hasan",
  "email": "tareq@gmail.com",
  "password": "securepassword123"
}
  ```
* `POST /api/auth/login` → Login & get JWT
  ```
  {
  "email": "tareq@gmail.com",
  "password": "securepassword123"
}
  ```

### 📦 Products

* `POST /api/products` → Create product
  ```
 {
  "name": "Gaming Laptop",
  "description": "High performance laptop",
  "price": 1500.99,
  "stock": 10,
  "image": "https://example.com/laptop.jpg",
  "categoryId": 1
}
  ```
* `GET /api/products` → List all products (filters: category, price range, pagination)
  ```
 http://localhost:3000/api/products?categoryId=1&minPrice=10&maxPrice=100&page=1&limit=10
  ```
* `GET /api/products/:id` → Get product by ID
  ```
 http://localhost:3000/api/products/1
  ```
* `PUT /api/products/:id` → Update product
  ```
 http://localhost:3000/api/products/1

 {
  "name": "Gaming Laptop",
  "description": "High performance laptop",
  "price": 1500.99,
  "stock": 10
}
  ```
* `DELETE /api/products/:id` → Delete product
  ```
 http://localhost:3000/api/products/search?q=laptop
  ```
* `GET /api/products/search?q=keyword` → Search products
  ```
 

### 🗂 Categories

* `POST /api/categories` → Create category
* `GET /api/categories` → List all categories with product counts
* `GET /api/categories/:id` → Get category by ID
* `PUT /api/categories/:id` → Update category
* `DELETE /api/categories/:id` → Delete category (if no products linked)
 

## 📖 Swagger Docs

Swagger UI is available at:

```
{BASE_URL}/api/docs
```

Example:
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/tareqhasan382/nestjs-ecommerce-inventory-api
cd ecommerce-inventory-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in root:

```env
DATABASE_URL="postgresql://postgres................"
JWT_SECRET="your_jwt_secret"
JWT_REFRESH_SECRET="your_jwt_refresh_secret"
```

### 4️⃣ Run Migrations

```bash
npm run migration:run

```

### 5️⃣ Start Server

```bash
npm run start:dev
```

Server will run on:

```
http://localhost:3000
```


---

## ✅ Evaluation Checklist

* [x] Authentication (Register/Login with JWT)
* [x] Secure CRUD for Products & Categories
* [x] Filters, Pagination, Search
* [x] Swagger API Docs
* [x] Deployment (Backend + DB)


