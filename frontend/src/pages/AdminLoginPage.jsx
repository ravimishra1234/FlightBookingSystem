import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const AdminIllustration = () => (
  <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
    {/* Dashboard screen */}
    <rect x="40" y="40" width="200" height="140" rx="8" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="2"/>
    <rect x="40" y="40" width="200" height="25" rx="8" fill="#1D6B43"/>
    <circle cx="58" cy="52" r="5" fill="#ff5f56"/>
    <circle cx="74" cy="52" r="5" fill="#ffbd2e"/>
    <circle cx="90" cy="52" r="5" fill="#27c93f"/>
    {/* Charts inside */}
    <rect x="55" y="80" width="40" height="60" rx="3" fill="#C8E6C9"/>
    <rect x="55" y="95" width="40" height="45" rx="3" fill="#81C784"/>
    <rect x="105" y="80" width="40" height="60" rx="3" fill="#C8E6C9"/>
    <rect x="105" y="100" width="40" height="40" rx="3" fill="#4CAF50"/>
    <rect x="155" y="80" width="40" height="60" rx="3" fill="#C8E6C9"/>
    <rect x="155" y="88" width="40" height="52" rx="3" fill="#1D6B43"/>
    {/* Stat labels */}
    <rect x="55" y="145" width="40" height="5" rx="2" fill="#A5D6A7"/>
    <rect x="105" y="145" width="40" height="5" rx="2" fill="#A5D6A7"/>
    <rect x="155" y="145" width="40" height="5" rx="2" fill="#A5D6A7"/>
    {/* Lock icon */}
    <rect x="115" y="190" width="50" height="38" rx="5" fill="#1D6B43"/>
    <path d="M125 190 V178 Q140 165 155 178 V190" stroke="#1D6B43" strokeWidth="6" fill="none" strokeLinecap="round"/>
    <circle cx="140" cy="207" r="6" fill="white"/>
    <rect x="137" y="207" width="6" height="8" rx="2" fill="white"/>
    {/* Stars */}
    <text x="38" y="200" fontSize="14" fill="#FFC107">★</text>
    <text x="230" y="60" fontSize="10" fill="#FFC107">★</text>
    <text x="225" y="195" fontSize="12" fill="#FFC107">★</text>
  </svg>
);

const AdminLoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await adminLogin(form.email, form.password);
      navigate('/admin/dashboard');
    } catch (err) { setError(err.response?.data?.message || 'Invalid admin credentials.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Mini navbar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#0D1F1A">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
          <span className="font-bold text-lg text-primary">Sky<span className="text-accent">Journey</span></span>
        </Link>
        <button onClick={() => navigate('/')} className="text-gray-400 hover:text-primary text-2xl">&times;</button>
      </div>

      <div className="flex flex-1">
        {/* LEFT — illustration */}
        <div className="hidden lg:flex lg:w-2/5 flex-col justify-center px-12 py-12 bg-gray-50 border-r border-gray-100">
          <AdminIllustration />
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-primary mb-2">Admin Dashboard</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              Manage flights, bookings, users and monitor revenue from one powerful dashboard.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[['✈', 'Flights'], ['🎫', 'Bookings'], ['👥', 'Users'], ['📊', 'Analytics']].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                  <span className="text-base">{icon}</span>
                  <span className="text-xs font-medium text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full text-accent text-xs font-semibold mb-6">
              🔐 Admin Portal — Authorized Access Only
            </div>
            <h1 className="text-4xl font-bold text-primary mb-8">Admin Login</h1>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded mb-5">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Admin Email</label>
                <input type="email" placeholder="admin@skyjourney.com" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-gray-100 px-4 py-4 text-sm text-primary rounded focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-gray-400"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Password</label>
                <input type="password" placeholder="••••••••" value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-gray-100 px-4 py-4 text-sm text-primary rounded focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-gray-400"
                  required />
              </div>

              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                type="submit" disabled={loading}
                className="w-full bg-accent text-white font-bold py-4 text-sm hover:bg-accent-light transition-all disabled:opacity-50 flex items-center justify-center gap-2 rounded mt-2">
                {loading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : '🔐 Access Dashboard'}
              </motion.button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              Regular user?{' '}
              <Link to="/login" className="text-accent hover:underline font-medium">User login →</Link>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-gray-100 px-8 py-4">
        <p className="text-xs text-gray-400 text-center">© 2025 SkyJourney · All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
