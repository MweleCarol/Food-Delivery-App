

---

```markdown
# 🍔 Food Delivery App

A full-stack food delivery platform built with React (frontend), Express & MongoDB (backend), and a custom Admin dashboard for managing food items, orders, and users.

## 📦 Project Structure

```

Food-Delivery-App/
├── admin/          # Admin dashboard (React or simple frontend)
├── backend/        # Node.js/Express API with MongoDB
├── frontend/       # Customer-facing React UI
└── lint.config.js  # Shared linting config

````

---

## 🚀 Features

### ✅ Customer Side (Frontend)
- Browse available food items
- Add to cart and checkout
- Place orders with delivery details
- View order status updates

### ✅ Admin Panel
- Add/edit/remove food items
- View and manage all customer orders
- Update order statuses (e.g., Processing → Delivered)

### ✅ Backend API
- RESTful endpoints for food, orders, users
- MongoDB for data storage
- File/image upload support (e.g., food images)
- Environment-based configuration

---

## ⚙️ Technologies Used

- **Frontend**: React, Axios, React Toastify, Tailwind CSS / CSS Modules
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Multer (file upload)
- **Admin**: React / Vanilla JS (custom admin panel)
- **Other Tools**: Git, ESLint, Prettier

---

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Food-Delivery-App.git
cd Food-Delivery-App
````

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

#### Admin Panel (Optional)

```bash
cd ../admin
npm install
```

---

## 🔧 Environment Variables

Create a `.env` file inside `/backend`:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
```

---

## 🧪 Running the App Locally

### 1. Start the Backend

```bash
cd backend
npm run dev
```

### 2. Start the Frontend

```bash
cd ../frontend
npm start
```

> You can optionally run the admin panel as a separate frontend if needed.

---

## 🖼️ Screenshots

> Add some screenshots of your UI here:

* Homepage
* ![image](https://github.com/user-attachments/assets/8e87cfe1-0319-452c-a3e4-b2592bc736d2)

* Cart/Checkout
* ![image](https://github.com/user-attachments/assets/26c2e853-c019-4087-8a8a-9e86576766cb)

* Admin dashboard
* ![image](https://github.com/user-attachments/assets/154a55bd-f360-4c2b-ba32-925625302651)


---

## 📦 Deployment

You can deploy the backend (e.g., on **Render**, **Railway**, or **Heroku**) and frontend on **Netlify** or **Vercel**.

> If serving React from Express:

* Run `npm run build` in `/frontend`
* Serve `frontend/build` statically from the backend

---

 the order can be tracked as well 
 admin can set the status on the order delivery 
  user authentication is provided 




