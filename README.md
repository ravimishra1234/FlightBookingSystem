# ✈ SkyJourney — Full Stack Flight Booking System

A production-quality MERN stack flight booking application with role-based authentication, email notifications, admin dashboard with charts, and a premium airline-themed UI.

---

## 📁 Project Structure

```
FlightBookingSystem/
├── backend/
│   ├── config/         → database.js, mailer.js
│   ├── controllers/    → auth, flight, booking, admin
│   ├── middleware/     → auth, admin, error
│   ├── models/         → User, Flight, Booking
│   ├── routes/         → auth, flight, booking, admin
│   ├── services/       → emailService, paymentService
│   ├── utils/          → generateToken, emailTemplates
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/        → axios instance
    │   ├── components/ → Navbar, Footer, FlightCard, BookingCard, Modals...
    │   ├── context/    → AuthContext
    │   ├── layouts/    → MainLayout, AdminLayout
    │   ├── pages/      → Home, Search, Login, Signup, Book, MyBookings
    │   ├── pages/admin → Dashboard, Flights, Bookings, Users
    │   ├── routes/     → ProtectedRoute, AdminRoute, PublicOnlyRoute
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Gmail account with App Password for emails

---

### 1. Clone & Setup Backend

```bash
cd FlightBookingSystem/backend
npm install
```

Edit `.env` with your values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/flightbooking
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

ADMIN_EMAIL=admin@skyjourney.com
ADMIN_PASSWORD=Admin@123456
```

> **Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords → Generate one for "Mail".

Start backend:
```bash
npm run dev
```

---

### 2. Seed Admin Account

After the backend starts, run this **once** to create the admin user:

```bash
curl -X POST http://localhost:5000/api/admin/seed
```

Or open in browser: `http://localhost:5000/api/admin/seed` (POST via Postman/Thunder Client)

Admin credentials will be whatever you set in `.env`:
- Email: `admin@skyjourney.com`
- Password: `Admin@123456`

---

### 3. Setup Frontend

```bash
cd FlightBookingSystem/frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/signup` | Public | Register user |
| POST | `/api/auth/login` | Public | User login |
| GET | `/api/auth/me` | Private | Get profile |

### Flights
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/flights` | Public | All flights |
| GET | `/api/flights/search?source=&destination=&departureDate=` | Public | Search flights |
| GET | `/api/flights/:id` | Public | Single flight |
| POST | `/api/flights` | Admin | Create flight |
| PUT | `/api/flights/:id` | Admin | Update flight |
| DELETE | `/api/flights/:id` | Admin | Delete flight |

### Bookings
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/bookings` | User | Create booking |
| GET | `/api/bookings/my-bookings` | User | My bookings |
| GET | `/api/bookings/:id` | User/Admin | Single booking |
| PUT | `/api/bookings/:id/cancel` | User | Cancel booking |

### Admin
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/admin/login` | Public | Admin login |
| POST | `/api/admin/seed` | Public | Create admin (once) |
| GET | `/api/admin/dashboard` | Admin | Stats + charts data |
| GET | `/api/admin/users` | Admin | All users |
| GET | `/api/admin/bookings` | Admin | All bookings |

---

## 👥 Roles & Features

### User
- Sign up / Login / Logout
- Search flights by source, destination, date
- Book a flight with passenger details
- View booking history (filter by status)
- Cancel booking with confirmation modal
- Automatic confirmation & cancellation emails

### Admin
- Separate admin login portal
- Dashboard with stats (flights, users, bookings, revenue)
- Area chart — monthly booking trends
- Bar chart — monthly revenue
- Top routes ranking
- Add / Edit / Delete flights
- View all users
- View all bookings with filters

---

## 🎨 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, Bcrypt |
| Email | Nodemailer (Gmail SMTP) |
| HTTP Client | Axios |

---

## 🎨 Color Theme

| Name | Hex |
|------|-----|
| Primary | `#0F172A` |
| Secondary | `#2563EB` |
| Accent | `#38BDF8` |
| White | `#FFFFFF` |

---

## 📧 Email System

Two beautiful HTML email templates are included:

1. **Booking Confirmation** — Sent on successful booking
   - Passenger name, flight details, route, booking ID, amount

2. **Booking Cancellation** — Sent on cancellation
   - Booking ID, flight number, route, cancellation date, refund info

---

## 💳 Payment Integration (Placeholder)

`backend/services/paymentService.js` is ready for payment gateway integration.

To integrate Razorpay:
```bash
npm install razorpay
```
Then replace the placeholder in `paymentService.js` with actual Razorpay API calls.

---

## 🛠 Seed Sample Flights (Optional)

Run this in MongoDB shell or Compass to add sample flights:

```js
db.flights.insertMany([
  {
    airline: "IndiGo",
    flightNumber: "6E-201",
    source: "Mumbai",
    destination: "Delhi",
    departureTime: new Date("2025-08-01T06:00:00"),
    arrivalTime: new Date("2025-08-01T08:10:00"),
    price: 4999,
    totalSeats: 180,
    availableSeats: 180,
    status: "scheduled"
  },
  {
    airline: "Air India",
    flightNumber: "AI-302",
    source: "Delhi",
    destination: "Bangalore",
    departureTime: new Date("2025-08-01T10:00:00"),
    arrivalTime: new Date("2025-08-01T12:45:00"),
    price: 6499,
    totalSeats: 200,
    availableSeats: 200,
    status: "scheduled"
  },
  {
    airline: "Vistara",
    flightNumber: "UK-801",
    source: "Mumbai",
    destination: "Chennai",
    departureTime: new Date("2025-08-01T14:00:00"),
    arrivalTime: new Date("2025-08-01T16:15:00"),
    price: 5299,
    totalSeats: 150,
    availableSeats: 150,
    status: "scheduled"
  }
])
```

---

## ✅ Production Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Use MongoDB Atlas for production database
- [ ] Set up Gmail App Password for email
- [ ] Run `npm run build` in frontend for production build
- [ ] Set `NODE_ENV=production` in backend `.env`
- [ ] Deploy backend on Railway / Render / EC2
- [ ] Deploy frontend on Vercel / Netlify

---

Built with ❤ — SkyJourney Flight Booking System
