import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const JoinIllustration = () => (
  <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
    {/* Globe */}
    <circle cx="140" cy="120" r="80" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="2" />
    <ellipse cx="140" cy="120" rx="40" ry="80" fill="none" stroke="#81C784" strokeWidth="1.5" />
    <line x1="60" y1="120" x2="220" y2="120" stroke="#81C784" strokeWidth="1.5" />
    <line x1="70" y1="90" x2="210" y2="90" stroke="#81C784" strokeWidth="1" strokeDasharray="4 3" />
    <line x1="70" y1="150" x2="210" y2="150" stroke="#81C784" strokeWidth="1" strokeDasharray="4 3" />
    {/* Airplane flying around globe */}
    <g transform="translate(195, 65) rotate(35)">
      <path d="M0 0 L-20 -6 L-20 6 Z" fill="#1D6B43" />
      <path d="M-10 -6 L-10 -14 L-18 -6 Z" fill="#1D6B43" />
      <path d="M-10 6 L-10 14 L-18 6 Z" fill="#1D6B43" />
    </g>
    {/* Location pins */}
    <circle cx="110" cy="95" r="5" fill="#1D6B43" />
    <circle cx="175" cy="140" r="5" fill="#4CAF50" />
    <circle cx="130" cy="155" r="4" fill="#81C784" />
    {/* Dotted path */}
    <path d="M110 95 Q145 70 175 140" stroke="#1D6B43" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
    {/* Stars */}
    <text x="55" y="60" fontSize="14" fill="#FFC107">★</text>
    <text x="210" y="170" fontSize="10" fill="#FFC107">★</text>
    <text x="195" y="55" fontSize="8" fill="#FFC107">★</text>
    {/* Miles badge */}
    <circle cx="200" cy="100" r="22" fill="#1D6B43" />
    <text x="188" y="97" fontSize="8" fill="white" fontWeight="bold">MILES</text>
    <text x="192" y="109" fontSize="10" fill="#FFD700" fontWeight="bold">★★★</text>
  </svg>
);

const SignupPage = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    setLoading(true);
    try {
      const { name, phone, email, password } = form;
      await signup({ name, phone, email, password });
      navigate('/');
    } catch (err) { setError(err.response?.data?.message || 'Signup failed.'); }
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
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-primary text-2xl">&times;</button>
      </div>

      <div className="flex flex-1">
        {/* LEFT — illustration */}
        <div className="hidden lg:flex lg:w-2/5 flex-col justify-center px-12 py-12 bg-gray-50 border-r border-gray-100">
          <JoinIllustration />
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-primary mb-2">Join SkyJourney</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Receive exclusive rewards and earn Miles on every trip booked.
            </p>
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-accent font-semibold hover:underline">Log in</Link>
            </p>
            <div className="mt-6 space-y-3">
              {['Exclusive member fares', 'Earn Miles on every booking', 'Priority customer support', 'Free cancellation benefits'].map((b, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="text-accent font-bold text-sm flex-shrink-0">✓</span>
                  <span className="text-sm text-gray-600">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="flex-1 flex items-start justify-center pt-10 px-6 overflow-y-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg py-6">
            <h1 className="text-3xl font-bold text-primary mb-6">Create your account</h1>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded mb-5">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-gray-100 px-4 py-4 text-sm text-primary rounded focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-gray-400"
                required />

              <div className="flex gap-2">
                <select className="bg-gray-100 px-3 py-4 text-sm text-primary rounded focus:outline-none w-28 flex-shrink-0">
                  <option>🇮🇳 +91</option>
                  <option>🇺🇸 +1</option>
                  <option>🇬🇧 +44</option>
                  <option>🇦🇪 +971</option>
                </select>
                <input type="tel" placeholder="Phone number" value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="flex-1 bg-gray-100 px-4 py-4 text-sm text-primary rounded focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-gray-400"
                  required />
              </div>

              <input type="email" placeholder="Email address" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-gray-100 px-4 py-4 text-sm text-primary rounded focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-gray-400"
                required />

              <input type="password" placeholder="Password (min 6 characters)" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full bg-gray-100 px-4 py-4 text-sm text-primary rounded focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-gray-400"
                required />

              <input type="password" placeholder="Confirm password" value={form.confirm}
                onChange={e => setForm({ ...form, confirm: e.target.value })}
                className="w-full bg-gray-100 px-4 py-4 text-sm text-primary rounded focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-gray-400"
                required />

              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                type="submit" disabled={loading}
                className="w-full bg-accent text-white font-bold py-4 text-sm hover:bg-accent-light transition-all disabled:opacity-50 flex items-center justify-center gap-2 rounded mt-2">
                {loading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : 'Create Account →'}
              </motion.button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-4">
              By creating an account, you agree to our{' '}
              <button className="text-accent hover:underline">Terms & Conditions</button>{' '}and{' '}
              <button className="text-accent hover:underline">Privacy Policy</button>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-gray-100 px-8 py-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-6">
          {['Terms & conditions', 'Privacy', 'Accessibility'].map(item => (
            <button key={item} className="text-xs text-gray-400 hover:text-primary">{item}</button>
          ))}
        </div>
        <p className="text-xs text-gray-400">© 2025 SkyJourney · All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default SignupPage;
