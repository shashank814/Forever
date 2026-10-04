# 🛍️ Forever — E-Commerce Web Application

Forever is a full-stack e-commerce web application built using the MERN stack. It provides a complete online shopping experience with modern UI, secure authentication, admin controls, and multiple payment options.

---

## 🚀 Features

### 👤 User Side

* 🔐 User Authentication (Login / Signup)
* 🛒 Add to Cart & Cart Management
* 📦 Product Listing & Filtering
* 📄 Product Details Page
* 💳 Multiple Payment Methods:

  * Razorpay (Online Payment)
  * Stripe (Online Payment)
  * Cash on Delivery (COD)
* 📍 Order Placement & Order History
* 🧾 Secure Payment Verification
* 📱 Fully Responsive UI (Tailwind CSS)

---

### 🛠️ Admin Panel

* 📦 Add / Update / Delete Products
* 🏷️ Manage Categories & Inventory
* 📊 View and Manage Orders
* 🔄 Update Order Status (Pending, Shipped, Delivered)
* 📁 Image Upload for Products
* 🔐 Protected Admin Routes

---

## 🛠️ Tech Stack

### Frontend:

* React.js (Vite)
* Tailwind CSS
* Axios

### Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)

### Integrations:

* Razorpay Payment Gateway
* Stripe Payment Gateway

---

## 📁 Project Structure

```
Forever/
│
├── frontend/        # User React App
├── admin/           # Admin Panel (React)
├── backend/         # Express + MongoDB Backend
├── vercel.json
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```
PORT=5000
MONGODB_URI=your_mongodb_connection

RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret

STRIPE_SECRET_KEY=your_stripe_secret

JWT_SECRET=your_jwt_secret
```

---

### Frontend (.env)

```
VITE_API_URL=your_backend_url
VITE_RAZORPAY_KEY_ID=your_key_id
```

---

## 💳 Payment Flow

### Razorpay / Stripe:

1. User selects products and proceeds to checkout
2. Backend creates order/session
3. Frontend opens payment gateway
4. Payment is completed
5. Backend verifies payment and confirms order

### Cash on Delivery (COD):

1. User places order directly
2. Order is stored without online payment
3. Payment is collected at delivery

---

## 🧪 Running Locally

### 1. Clone the repository

```
git clone https://github.com/your-username/forever-ecommerce.git
cd forever-ecommerce
```

### 2. Setup Backend

```
cd backend
npm install
npm run dev
```

### 3. Setup Frontend (User)

```
cd frontend
npm install
npm run dev
```

### 4. Setup Admin Panel

```
cd admin
npm install
npm run dev
```

---

## 🌐 Deployment

* Frontend (User) → Vercel
* Admin Panel → Vercel
* Backend → Vercel / Render

---

## 🔐 Security Notes

* Sensitive keys are stored in environment variables
* Razorpay & Stripe secrets are never exposed on frontend
* Payment verification handled securely on backend
* Admin routes are protected with authentication

---

## 📌 Future Improvements

* 📦 Real-time inventory tracking
* 📧 Email notifications (order confirmation)
* ⭐ Product reviews & ratings
* 📊 Analytics dashboard for admin

---

## 👨‍💻 Author

Shashank Singh
Full Stack Developer (MERN)

---

## ⭐ Acknowledgement

This project was built to simulate a real-world e-commerce platform with secure payment integration and admin-based inventory and order management.
