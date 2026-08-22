import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/'); };

  const links = [
    { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { to: '/admin/flights', icon: '✈', label: 'Flights' },
    { to: '/admin/bookings', icon: '🎫', label: 'Bookings' },
    { to: '/admin/users', icon: '👥', label: 'Users' },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: '#f8f9fa' }}>
      {/* Sidebar */}
      <div className="w-60 fixed h-full flex flex-col border-r border-gray-200 bg-white">
        <div className="px-5 py-5 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <span className="text-xl">✈</span>
            <span className="font-bold text-base text-primary">Sky<span className="text-accent">Journey</span></span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 rounded text-accent text-xs font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Admin Panel
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-all ${
                location.pathname === link.to
                  ? 'bg-accent/10 text-accent'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gray-100">
          <div className="flex items-center gap-2 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">{user?.name}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded transition-all">
            ← Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 ml-60 p-8 overflow-auto">
        {children}
      </motion.div>
    </div>
  );
};

export default AdminLayout;
