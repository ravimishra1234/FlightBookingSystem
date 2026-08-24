# ✈️ SkyJourney

## 🛫 Full Stack Flight Booking System

SkyJourney is a **full-stack MERN flight booking platform** designed to provide a complete airline booking experience with **JWT authentication, role-based authorization, flight search, booking management, email notifications, admin analytics, and AWS EC2 deployment**.

The application provides separate experiences for **users and administrators**, allowing users to search and book flights while administrators can manage flights, users, and bookings through a dedicated dashboard.

---

# ✨ Features

## ✈️ Flight Discovery

- 🔎 Search flights by source, destination, and departure date
- 🎫 View available flights with pricing and seat availability
- ✈️ Flight details including airline, timings, route, and seats
- 📱 Responsive airline-themed interface
- 🔄 Dynamic flight search and filtering

---

## 🔐 Authentication & Authorization

- 👤 User signup and login
- 🔑 JWT-based authentication
- 🛡️ Protected routes
- 👨‍💼 Role-based authorization
- 🚪 Logout functionality
- 🔒 Separate user and admin access

---

## 🎫 Flight Booking

- 🧑‍💼 Passenger information management
- 💺 Seat availability tracking
- 🧾 Booking confirmation
- 📋 View booking history
- 🔎 Filter bookings by booking status
- ❌ Cancel bookings with confirmation
- 📧 Booking confirmation emails

---

## 📧 Email Notifications

Automated HTML email notifications using **Nodemailer**.

### Booking Confirmation

- Passenger details
- Flight details
- Route information
- Booking information
- Fare details

### Booking Cancellation

- Booking information
- Flight details
- Cancellation details
- Refund information

---

## 👨‍💼 Admin Dashboard

A dedicated admin portal for managing the complete booking platform.

- 📊 Dashboard statistics
- 👥 User statistics
- ✈️ Flight statistics
- 🎫 Booking statistics
- 💰 Revenue statistics
- 📈 Monthly booking trends
- 📊 Monthly revenue charts
- 🏆 Top routes
- ➕ Add flights
- ✏️ Edit flights
- 🗑️ Delete flights
- 👥 Manage users
- 🎫 Manage bookings

---

# 🏗️ Application Architecture

```text
                         SkyJourney
                             │
              ┌──────────────┴──────────────┐
              │                             │
        React Frontend                Node.js Backend
              │                             │
              ↓                             ↓
        React Router                   Express.js API
              │                             │
              │                    ┌────────┴────────┐
              │                    │                 │
              │                    ↓                 ↓
              │               MongoDB Atlas      Nodemailer
              │
              ↓
        User Interface
```

---

# 🔄 Booking Flow

```text
User
  ↓
Search Flights
  ↓
Select Flight
  ↓
Enter Passenger Details
  ↓
Confirm Booking
  ↓
Backend API
  ↓
MongoDB Atlas
  ↓
Booking Created
  ↓
Confirmation Email
  ↓
My Bookings
```

---

# 👨‍💼 Admin Flow

```text
Admin Login
     ↓
JWT Authentication
     ↓
Admin Authorization
     ↓
Admin Dashboard
     │
     ├── Flight Management
     │      ├── Add Flight
     │      ├── Edit Flight
     │      └── Delete Flight
     │
     ├── User Management
     │
     └── Booking Management
```

---

# 📁 Project Structure

```text
FlightBookingSystem/
│
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── mailer.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── flightController.js
│   │   ├── bookingController.js
│   │   └── adminController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Flight.js
│   │   └── Booking.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── flightRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── services/
│   │   ├── emailService.js
│   │   └── paymentService.js
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── emailTemplates.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── layouts/
    │   ├── pages/
    │   │   └── admin/
    │   ├── routes/
    │   ├── App.jsx
    │   └── main.jsx
    │
    └── package.json
```

---

# 🛠️ Tech Stack

## Frontend

![React](https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge&logo=chartdotjs&logoColor=white)

## Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

## Database

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

## Authentication & Security

![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-3388FF?style=for-the-badge&logo=letsencrypt&logoColor=white)

## APIs & Services

![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-22B573?style=for-the-badge&logo=gmail&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=googlegemini&logoColor=white)

## Deployment & DevOps

![AWS](https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![PM2](https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=pm2&logoColor=white)

## Development Tools

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

---

# 🎨 Technology Overview

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,js,vite,tailwind,nodejs,express,mongodb,git,github,aws,nginx" />
</p>

---

# 🔑 API Endpoints

## Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/auth/signup` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | User login |
| `GET` | `/api/auth/me` | Private | Get current authenticated user |

---

## Flights

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/flights` | Public | Get all flights |
| `GET` | `/api/flights/search` | Public | Search flights |
| `GET` | `/api/flights/:id` | Public | Get flight details |
| `POST` | `/api/flights` | Admin | Create a flight |
| `PUT` | `/api/flights/:id` | Admin | Update a flight |
| `DELETE` | `/api/flights/:id` | Admin | Delete a flight |

---

## Bookings

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/bookings` | User | Create a booking |
| `GET` | `/api/bookings/my-bookings` | User | Get user's bookings |
| `GET` | `/api/bookings/:id` | User/Admin | Get booking details |
| `PUT` | `/api/bookings/:id/cancel` | User | Cancel a booking |

---

## Admin

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/admin/login` | Public | Admin login |
| `POST` | `/api/admin/seed` | Public | Create initial admin |
| `GET` | `/api/admin/dashboard` | Admin | Get dashboard statistics |
| `GET` | `/api/admin/users` | Admin | Get all users |
| `GET` | `/api/admin/bookings` | Admin | Get all bookings |

---

# 🚀 Getting Started

## Prerequisites

- Node.js 18+
- MongoDB or MongoDB Atlas
- Gmail account with App Password

---

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd FlightBookingSystem
```

---

## 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

GEMINI_API_KEY=your_gemini_api_key

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

> ⚠️ **Never commit `.env` files, API keys, passwords, or other sensitive credentials to GitHub.**

Start the backend:

```bash
npm run dev
```

---

## 3. Seed Admin Account

After starting the backend, create the initial admin account:

```bash
curl -X POST http://localhost:5000/api/admin/seed
```

The admin credentials are read from:

```env
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

The seed endpoint creates an admin only when an admin account does not already exist.

---

## 4. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# ☁️ Production Deployment

SkyJourney is deployed on **AWS EC2** using **Nginx, PM2, and MongoDB Atlas**.

```text
                         Internet
                            │
                            ↓
                     EC2 Public IP
                            │
                            ↓
                          Nginx
                         Port 80
                            │
                   ┌────────┴────────┐
                   │                 │
                /api/*                /
                   │                 │
                   ↓                 ↓
             Node.js / Express    React Build
                Port 5000        /var/www/flightbooking
                   │
                   ↓
              MongoDB Atlas
```

### Production Infrastructure

- ☁️ **AWS EC2** — Application server
- 🌐 **Nginx** — Web server and reverse proxy
- ⚙️ **PM2** — Node.js process manager
- 🗄️ **MongoDB Atlas** — Production database
- ⚛️ **React + Vite** — Production frontend

### Reverse Proxy

Nginx handles incoming HTTP requests and routes them accordingly:

```text
Browser
   │
   ↓
Nginx :80
   │
   ├── /api/* ──────→ Node.js :5000
   │
   └── /* ──────────→ React Production Build
```

PM2 keeps the Node.js backend running independently of the SSH session and restores the process after server reboot.

---

# 📸 Screenshots

## 🏠 Home Page

<!-- Add screenshot here -->

## 🔎 Flight Search

<!-- Add screenshot here -->

## 🎫 Flight Booking

<!-- Add screenshot here -->

## 📋 My Bookings

<!-- Add screenshot here -->

## 👨‍💼 Admin Dashboard

<!-- Add screenshot here -->

## 📊 Admin Analytics

<!-- Add screenshot here -->

---

# 🧠 Key Concepts Demonstrated

- ⚛️ React component architecture
- 🧭 React Router
- 🎨 Tailwind CSS
- 🔐 JWT authentication
- 🛡️ Role-based authorization
- 🛣️ Protected routes
- 🔄 REST API development
- 🗄️ MongoDB & Mongoose
- 📧 Transactional email notifications
- 📊 Data visualization with Recharts
- ⚡ Asynchronous API handling
- 🏗️ MVC backend architecture
- 🌐 Nginx reverse proxy
- ⚙️ PM2 process management
- ☁️ AWS EC2 deployment
- 🔒 Environment variable management
- 📦 Production build and deployment

---

# 🔮 Future Improvements

- 💳 Real payment gateway integration
- 💺 Advanced seat selection
- 🔔 Real-time booking notifications
- 📱 Progressive Web App support
- 📈 Advanced analytics
- 🔄 Automated CI/CD deployment
- 🔒 HTTPS with custom domain

---

# 👨‍💻 Author

## Ravi Prakash Mishra

**MERN Stack Developer | React.js | JavaScript | Node.js | Generative AI**

Built with ❤️ for learning, development and production deployment.

⭐ If you find this project useful, consider giving the repository a star.
