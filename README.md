# 🚀 Jasper Colin Assignment - Project Setup Guide

## 📌 Clone the Repository
```sh
# Clone the project
git clone https://github.com/divyanshtiwari19/Jasper-Collin.git
cd Jasper-Collin
```

---

## 🛠 Backend Setup

### 1️⃣ Navigate to the backend directory:
```sh
cd server
```

### 2️⃣ Install dependencies:
```sh
npm install
```

### 3️⃣ Set up environment variables:
Create a `.env` file in the `server` directory with the following content:

```env
PORT=8000
DATABASE_URL=######
DATABASE_NAME=jasper_colin

# secrets
JWT_SECRET="JasperColin2b1f8e23c64f1a98d77d4c6e0f2b89a1b4d6e3f8a2c5e7d9f0b2d3c4e6f7a8b9c"
SESSION_SECRET='Jasper Colin'
```
Add necessary environment variables like database URL, API keys, etc.

### 4️⃣ Run the backend server:
```sh
npm run dev
```

*(Ensure MongoDB is running before starting the server.)*

---

## 🎨 Frontend Setup

### 1️⃣ Navigate to the frontend directory:
```sh
cd client
```

### 2️⃣ Install dependencies (Force installation due to ShadCN UI components and React 19 compatibility):
```sh
npm i -f
```

### 3️⃣ Run the frontend application:
```sh
npm run dev
```

---

## 🏃 Running the Application
After setting up both the frontend and backend:
- Open your browser and visit: **http://localhost:3000** (for frontend).
- The backend API should be running on: **http://localhost:8000**.
- The **frontend proxy** is configured in `next.config.js`, meaning all API calls to `localhost:3000/api/` will be automatically redirected to `localhost:8000/api/`.

---

## 📌 Features Implemented
### ✅ Backend
- Node.js with Express.js
- MongoDB with Mongoose
- CRUD API for Products
- Rate Limiting for API Security
- Authentication using JWT
- Node Clustering for Performance

### ✅ Frontend
- Next.js with React
- Product List, Search, Pagination
- Authentication (Login/Register with JWT)
- Protected Routes "/dashboard"
- ShadCN UI Components for Styling

---

## 📌 API Routes
### 🔹 Product Routes
- **POST** `/api/products` - Create a product
- **GET** `/api/products` - Retrieve all products
- **GET** `/api/products/:id` - Get product by ID
- **PUT** `/api/products/:id` - Update product by ID
- **DELETE** `/api/products/:id` - Delete product by ID

### 🔹 Authentication Routes
- **POST** `/api/register` - User Registration
- **POST** `/api/login` - User Login
- **POST** `/api/login` - User Logout

---

## 🛠 Additional Notes
- Ensure MongoDB is running locally or provide a **MongoDB Atlas** connection string.
- If any package installation issue arises, try running `npm install --legacy-peer-deps`.
- **Frontend requires force installation (`npm i -f`)** due to **ShadCN UI and React 19 compatibility issues**.

---


