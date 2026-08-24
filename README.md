# ✈️ SkyJourney — Full Stack Flight Booking System

A full-stack MERN flight booking platform with **JWT authentication, role-based authorization, flight search, booking management, email notifications, admin dashboard, analytics, and AWS EC2 deployment**.

SkyJourney provides separate experiences for **users and administrators**, allowing users to search and book flights while administrators can manage flights, users, and bookings through a dedicated dashboard.

---

## ✨ Features

### ✈️ Flight Search & Discovery

- 🔎 Search flights by source, destination, and departure date
- 🎫 View available flights with pricing and seat availability
- ✈️ Flight details including airline, timings, route, and seats
- 📱 Responsive airline-themed interface

### 🔐 Authentication & Authorization

- 👤 User signup and login
- 🔑 JWT-based authentication
- 🛡️ Protected routes
- 👨‍💼 Role-based authorization
- 🚪 Logout functionality
- 🔒 Separate user and admin access

### 🎫 Flight Booking

- 🧑‍💼 Passenger information management
- 💺 Seat availability tracking
- 🧾 Booking confirmation
- 📋 View booking history
- 🔎 Filter bookings by status
- ❌ Cancel bookings with confirmation

### 📧 Email Notifications

Automated HTML email notifications using **Nodemailer**:

- ✅ Booking confirmation emails
- ❌ Booking cancellation emails
- 📋 Passenger, flight, booking, and payment details

### 👨‍💼 Admin Dashboard

Dedicated admin portal with:

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
       React Router                    Express.js API
              │                             │
       State Management          ┌─────────┴─────────┐
              │                   │                   │
              │                   ↓                   ↓
              │              MongoDB Atlas        Nodemailer
              │
              ↓
        User Interface
🔄 Booking Flow
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
👨‍💼 Admin Flow
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
📁 Project Structure
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
🛠️ Tech Stack
Layer	Technologies
Frontend	React 18, Vite, Tailwind CSS, Framer Motion, Recharts
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Authentication	JWT, Bcrypt
Email	Nodemailer, Gmail SMTP
HTTP Client	Axios
Web Server	Nginx
Process Manager	PM2
Deployment	AWS EC2
Database Hosting	MongoDB Atlas
🔑 API Endpoints
Authentication
Method	Endpoint	Access	Description
POST	/api/auth/signup	Public	Register user
POST	/api/auth/login	Public	User login
GET	/api/auth/me	Private	Get current user
Flights
Method	Endpoint	Access	Description
GET	/api/flights	Public	Get all flights
GET	/api/flights/search	Public	Search flights
GET	/api/flights/:id	Public	Get flight details
POST	/api/flights	Admin	Create flight
PUT	/api/flights/:id	Admin	Update flight
DELETE	/api/flights/:id	Admin	Delete flight
Bookings
Method	Endpoint	Access	Description
POST	/api/bookings	User	Create booking
GET	/api/bookings/my-bookings	User	Get user's bookings
GET	/api/bookings/:id	User/Admin	Get booking
PUT	/api/bookings/:id/cancel	User	Cancel booking
Admin
Method	Endpoint	Access	Description
POST	/api/admin/login	Public	Admin login
POST	/api/admin/seed	Public	Create initial admin
GET	/api/admin/dashboard	Admin	Dashboard statistics
GET	/api/admin/users	Admin	Get all users
GET	/api/admin/bookings	Admin	Get all bookings
🚀 Getting Started
Prerequisites
Node.js 18+
MongoDB / MongoDB Atlas
Gmail account with App Password
1. Clone Repository
git clone <your-repository-url>
cd FlightBookingSystem
2. Setup Backend
cd backend
npm install

Create a .env file:

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

⚠️ Never commit .env files, API keys, passwords, or other sensitive credentials to GitHub.

Start the backend:

npm run dev
3. Seed Admin Account

After starting the backend, create the initial admin account:

curl -X POST http://localhost:5000/api/admin/seed

The admin credentials are taken from:

ADMIN_EMAIL
ADMIN_PASSWORD

The seed endpoint creates an admin only when an admin account does not already exist.

4. Setup Frontend
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
☁️ Production Deployment

SkyJourney is deployed on AWS EC2 using Nginx, PM2, and MongoDB Atlas.

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
Production Infrastructure
☁️ AWS EC2 — Application server
🌐 Nginx — Web server and reverse proxy
⚙️ PM2 — Node.js process manager
🗄️ MongoDB Atlas — Production database
⚛️ React + Vite — Production frontend

Nginx serves the React production build and forwards /api requests to the Node.js backend running on port 5000.

PM2 keeps the backend process running independently of the SSH session and restores the process after server reboot.

🧠 Key Concepts Demonstrated
⚛️ React component architecture
🧭 React Router
🎨 Tailwind CSS
🔐 JWT authentication
🛡️ Role-based authorization
🛣️ Protected routes
🔄 REST API development
🗄️ MongoDB & Mongoose
📧 Transactional email notifications
📊 Data visualization with Recharts
⚡ Asynchronous API handling
🏗️ MVC backend architecture
🌐 Nginx reverse proxy
⚙️ PM2 process management
☁️ AWS EC2 deployment
🔒 Environment variable management
📦 Production build and deployment
🔮 Future Improvements
💳 Real payment gateway integration
💺 Advanced seat selection
🔔 Real-time booking notifications
📱 Progressive Web App support
📈 Advanced analytics
🔄 Automated CI/CD deployment
🔒 HTTPS with custom domain
👨‍💻 Author
Ravi Prakash Mishra

MERN Stack Developer | React.js | JavaScript | Node.js | Generative AI

Built with ❤️ for learning, development and production deployment.

⭐ If you find this project useful, consider giving the repository a star.
