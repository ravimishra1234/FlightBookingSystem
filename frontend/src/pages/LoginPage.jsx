import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const MemberIllustration = () => (
  <svg viewBox="0 0 280 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
    {/* Person body */}
    <circle cx="90" cy="80" r="35" fill="#c8e6c9" />
    <circle cx="90" cy="72" r="20" fill="#a5d6a7" />
    {/* Colorful shirt */}
    <path d="M55 110 Q90 95 125 110 L130 160 Q90 170 50 160 Z" fill="#4CAF50" />
    <rect x="60" y="108" width="15" height="45" rx="3" fill="#2E7D32" />
    <rect x="105" y="108" width="15" height="45" rx="3" fill="#2E7D32" />
    {/* Book */}
    <rect x="120" y="100" width="70" height="90" rx="5" fill="#1565C0" />
    <rect x="125" y="105" width="60" height="80" rx="3" fill="#E3F2FD" />
    <rect x="130" y="115" width="50" height="4" rx="2" fill="#90CAF9" />
    <rect x="130" y="125" width="40" height="4" rx="2" fill="#90CAF9" />
    <rect x="130" y="135" width="45" height="4" rx="2" fill="#90CAF9" />
    {/* Stamp/seal on book */}
    <circle cx="160" cy="160" r="15" fill="#1976D2" />
    <text x="153" y="165" fontSize="12" fill="white" fontWeight="bold">✈</text>
    {/* Thought cloud */}
    <circle cx="140" cy="45" r="12" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="1.5" />
    <circle cx="155" cy="35" r="15" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="1.5" />
    <circle cx="172" cy="28" r="18" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="1.5" />
    <circle cx="190" cy="30" r="20" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="1.5" />
    <circle cx="205" cy="40" r="16" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="1.5" />
    <circle cx="212" cy="55" r="14" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="1.5" />
    {/* Plane in cloud */}
    <text x="162" y="42" fontSize="18">✈</text>
    {/* Connection dots */}
    <circle cx="132" cy="56" r="3" fill="#A5D6A7" />
    <circle cx="136" cy="52" r="2" fill="#A5D6A7" />
  </svg>
);

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try { await login(form.email, form.password); navigate(from, { replace: true }); }
    catch (err) { setError(err.response?.data?.message || 'Invalid credentials.'); }
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
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-primary text-2xl leading-none">&times;</button>
      </div>

      <div className="flex flex-1">
        {/* LEFT — illustration */}
        <div className="hidden lg:flex lg:w-2/5 flex-col justify-center px-12 py-12 bg-gray-50 border-r border-gray-100">
          <MemberIllustration />

          <div className="mt-6">
            <h2 className="text-2xl font-bold text-primary mb-2">Not a member yet?</h2>
            <p className="text-gray-500 text-sm mb-6">
              Join now and unlock exclusive travel benefits.{' '}
              <Link to="/signup" className="text-accent font-semibold hover:underline">Sign up</Link>
            </p>

            <div className="space-y-3">
              {[
                'Special offers from SkyJourney and our partners',
                'Instant refunds to your wallet upon cancellation',
                'Earn Reward Miles and Tier Credits',
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-accent font-bold text-sm mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-sm text-gray-600 leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-400">
                Account not activated?{' '}
                <button className="text-accent hover:underline font-medium">Send activation link</button>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — login form */}
        <div className="flex-1 flex items-start justify-center pt-16 px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-primary mb-8">Log in</h1>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded mb-5">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input type="email" placeholder="Email/SkyJourney ID" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-gray-100 border-0 px-4 py-4 text-sm text-primary rounded focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-gray-400"
                  required />
                <div className="text-right mt-1">
                  <button type="button" className="text-xs text-accent hover:underline">Forgot Email or ID?</button>
                </div>
              </div>

              <div>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} placeholder="Password" value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="w-full bg-gray-100 border-0 px-4 py-4 text-sm text-primary rounded focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-gray-400 pr-12"
                    required />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                    {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
                <div className="text-right mt-1">
                  <button type="button" className="text-xs text-accent hover:underline">Forgot password?</button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-accent rounded" />
                  <span className="text-sm text-gray-600">Keep me logged in</span>
                </label>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="submit" disabled={loading}
                  className="bg-accent text-white font-bold px-8 py-3 text-sm hover:bg-accent-light transition-all disabled:opacity-50 flex items-center gap-2 rounded">
                  {loading
                    ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : 'Log in'}
                </motion.button>
              </div>
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400">Or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <p className="text-center text-sm text-gray-500">
              New to SkyJourney?{' '}
              <Link to="/signup" className="text-accent font-semibold hover:underline">Create account</Link>
            </p>
            <p className="text-center text-xs text-gray-400 mt-2">
              Admin?{' '}
              <Link to="/admin/login" className="text-gray-500 hover:text-accent">Admin portal →</Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 px-8 py-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-6 flex-wrap">
          {['Terms & conditions', 'Cookies policy', 'Privacy', 'Accessibility'].map(item => (
            <button key={item} className="text-xs text-gray-400 hover:text-primary transition-colors">{item}</button>
          ))}
        </div>
        <p className="text-xs text-gray-400">© 2025 SkyJourney · All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default LoginPage;
