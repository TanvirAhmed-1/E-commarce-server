# 🛒 Trendy Products BD - E-commerce Backend

This is the backend server of **Trendy Products BD**, a simple e-commerce platform built with **Node.js**, **Express.js**, and **MongoDB**.

---

## 🔗 Live Site & Repositories

- 🌐 **Live Site:** [https://trendyproductsbd.netlify.app/](https://trendyproductsbd.netlify.app/)
- 💻 **Client Repository:** [TanvirAhmed-1/E-commarce-client](https://github.com/TanvirAhmed-1/E-commarce-client)

---

## 🚀 Features

- 🔐 User Authentication & Management
- 📦 Product Management (CRUD)
- 🛍️ Add to Cart System
- ❤️ Add to Favorites
- 🧾 Order Placement and Admin View
- 🧑‍💼 Admin Dashboard Stats
- 📦 Filter, Sort, Search & Price Range Queries
- 🌐 RESTful API with MongoDB Atlas
- 📁 Environment variable support with `dotenv`

---

## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **dotenv**
- **CORS**
- **Postman** (for testing)

---

## 📁 Folder Structure


---

## 🧪 API Endpoints

### ✅ User Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/users`            | Register new user |
| GET    | `/users`            | Get all users |
| PATCH  | `/users/:id`        | Update a user |
| DELETE | `/users/:id`        | Delete a user |

### 📦 Product Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/products`                 | Get all products (with search, filter, sort) |
| GET    | `/products/:id`             | Get single product |
| POST   | `/products`                 | Add a new product |
| PATCH  | `/update/product/:id`       | Update a product |
| DELETE | `/products/delete/:id`      | Delete a product |

### 🛒 Cart & Order
| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/addToCard`                | Add product to cart |
| GET    | `/addToCard/:email`         | Get user cart |
| DELETE | `/addToCard/delete/:id`     | Remove from cart |
| POST   | `/order`                    | Place an order |
| GET    | `/user/admin/order`         | Admin get all orders |
| PATCH  | `/user/admin/order/:id`     | Update order status |
| DELETE | `/user/admin/order/:id`     | Delete order |

### ❤️ Favorites
| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/favorite`                 | Add to favorites |
| GET    | `/favorite/:email`          | Get favorite items |
| DELETE | `/favorite/delete/:id`      | Remove from favorites |

### 🧑‍💼 Admin Stats
| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/admin/home`              | Get total users & products count |

---

## ⚙️ Environment Setup

Create a `.env` file in the root and add:

```env
PORT=5000
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password


🧾 Run Locally
git clone https://github.com/your-username/ecommerce-backend.git
cd ecommerce-backend

##Install dependencies
npm install

Server will run at http://localhost:5000

📬 Contact
If you have any questions or suggestions, feel free to reach out.

Email: tanvirahmed1078@gmail.com

GitHub: TanvirAhmed-1