import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute, PublicOnlyRoute } from './routes/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
import BookFlightPage from './pages/BookFlightPage';
import BookFlightFormPage from './pages/BookFlightFormPage';
import MyBookingsPage from './pages/MyBookingsPage';
import NotFoundPage from './pages/NotFoundPage';
import SupportPage from './pages/SupportPage';
import FAQPage from './pages/FAQPage';
import BookMeStaysPage from './pages/bookme/BookMeStaysPage';
import BookMeCarsPage from './pages/bookme/BookMeCarsPage';
import BookMeAirportTaxisPage from './pages/bookme/BookMeAirportTaxisPage';
import BookMeLoginPage from './pages/bookme/BookMeLoginPage';
import BookMeRegisterPage from './pages/bookme/BookMeRegisterPage';

import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminFlights from './pages/admin/AdminFlights';
import AdminBookings from './pages/admin/AdminBookings';
import AdminUsers from './pages/admin/AdminUsers';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/book-flight" element={<BookFlightFormPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/bookme" element={<BookMeStaysPage />} />
        <Route path="/bookme/cars" element={<BookMeCarsPage />} />
        <Route path="/bookme/airport-taxis" element={<BookMeAirportTaxisPage />} />
        <Route path="/bookme/login" element={<BookMeLoginPage />} />
        <Route path="/bookme/register" element={<BookMeRegisterPage />} />

        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />
        <Route path="/admin/login" element={<PublicOnlyRoute><AdminLoginPage /></PublicOnlyRoute>} />

        <Route path="/book/:id" element={<ProtectedRoute><BookFlightPage /></ProtectedRoute>} />
        <Route path="/my-bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />

        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/flights" element={<AdminRoute><AdminFlights /></AdminRoute>} />
        <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
