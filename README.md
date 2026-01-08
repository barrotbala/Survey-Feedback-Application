# 🎓 Survey / Feedback Application (MERN Stack)

A full-stack Survey & Feedback Application built using **React (Vite)**, **Node.js**, **Express**, **MongoDB**, **JWT Authentication**, and **Socket.io** for real-time updates.

This application allows **Admins** to create surveys and view analytics, while **Students** can register, login, submit survey feedback, and provide general feedback.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Chart.js
- Plain CSS (Custom UI & Animations)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Socket.io

---

## 📂 Project Folder Structure

Survey-Feedback-Application/
│
├── backend/
│ ├── server.js
│ ├── socket.js
│ ├── config/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── middleware/
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── layouts/
│ │ ├── pages/
│ │ ├── components/
│ │ └── styles/
│
└── README.md



---

## ⚙️ Environment Setup

### 🔹 Backend `.env` Configuration

Create a `.env` file inside the **backend** folder:



PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/survey_app
JWT_SECRET=your_jwt_secret_key

---

## ▶️ How to Run the Project

### 1️⃣ Start Backend Server

```bash
cd backend
npm install
npm start


Backend will run on: http://localhost:5000

2️⃣ Start Frontend (Vite)

cd frontend
npm install
npm run dev

Frontend will run on: http://localhost:5173




🔐 Authentication & Roles
👨‍🎓 Student

Register

Login

View available surveys

Submit survey feedback

Submit general student feedback

👨‍💼 Admin

Login only (no public register)

Create surveys

Add multiple question types

View survey analytics & charts

Monitor student responses

👨‍💼 How to Create Admin ID & Password (IMPORTANT)

Admin users are created only via API, not through UI.
This is done to secure admin access.




Create Admin Using Thunder Client / Postman

Open Thunder Client or Postman

Create a POST request

URL:

http://localhost:5000/api/auth/create-admin


Headers:

Content-Type: application/json


Body → JSON → Paste request body

Click Send

🔹 Admin Login
http://localhost:5173/admin/login


Credentials

Email: admin@gmail.com

Password: admin123
