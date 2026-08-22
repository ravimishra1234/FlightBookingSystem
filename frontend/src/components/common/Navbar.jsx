import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import useNavbarScroll from '../../hooks/useNavbarScroll';

const megaMenus = {
  'Book & Manage': {
    columns: [
      { title: 'Book', links: [{ label: 'Flights', to: '/book-flight' }, { label: 'Hotels ↗', to: '/bookme' }, { label: 'Cars ↗', to: '/bookme/cars' }, { label: 'Travel Insurance', to: '#' }] },
      { title: 'Manage', links: [{ label: 'My Bookings', to: '/my-bookings' }, { label: 'Change flights', to: '#' }, { label: 'Upgrade', to: '#' }, { label: 'Refund', to: '#' }, { label: 'Check-in', to: '#' }, { label: 'Extra baggage', to: '#' }, { label: 'Seat reservation', to: '#' }, { label: 'Meal selection', to: '#' }] },
      { title: 'Business & Governmental Travel', links: [{ label: 'Corporate travel services', to: '#' }, { label: 'MICE travel request', to: '#' }, { label: 'Private aircrafts', to: '#' }] },
      { title: 'Additional travel services', links: [] },
    ],
  },
  Experience: {
    columns: [
      { title: 'Travel Classes', links: [{ label: 'Business Class', to: '#' }, { label: 'Economy Class', to: '#' }] },
      { title: 'On Board', links: [{ label: 'In-flight Entertainment', to: '#' }, { label: 'Meals & Dining', to: '#' }] },
      { title: 'At the Airport', links: [{ label: 'Lounges', to: '#' }, { label: 'Special Assistance', to: '#' }] },
    ],
  },
  Loyalty: {
    columns: [
      { title: 'AlFursan', links: [{ label: 'Join AlFursan', to: '/signup' }, { label: 'Earn Miles', to: '#' }, { label: 'Redeem Miles', to: '#' }] },
      { title: 'Partners', links: [{ label: 'Airline Partners', to: '#' }, { label: 'Hotel Partners', to: '#' }] },
    ],
  },
  Support: {
    columns: [
      { title: 'Help', links: [{ label: 'Help & Support', to: '/support' }, { label: 'FAQ', to: '/faq' }, { label: 'Contact Us', to: '/support' }, { label: 'Baggage Policy', to: '#' }] },
      { title: 'Feedback', links: [{ label: 'Send Feedback', to: '#' }, { label: 'Complaint', to: '#' }, { label: 'Compliment', to: '#' }] },
    ],
  },
};

const countries = [
  { flag: '🇮🇳', name: 'India', langs: ['English', 'हिंदी'], active: true },
  { flag: '🇸🇦', name: 'Saudi Arabia', langs: ['English', 'العربية'] },
  { flag: '🇺🇸', name: 'United States', langs: ['English'] },
  { flag: '🇬🇧', name: 'United Kingdom', langs: ['English'] },
  { flag: '🇦🇪', name: 'UAE', langs: ['English', 'العربية'] },
  { flag: '🇩🇪', name: 'Germany', langs: ['Deutsch'] },
  { flag: '🇸🇬', name: 'Singapore', langs: ['English'] },
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCountry, setShowCountry] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const navbarTheme = useNavbarScroll();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const isHomePage = location.pathname === '/';
  const isDark = isHomePage && navbarTheme === 'dark';

  useEffect(() => { setActiveMenu(null); setMobileOpen(false); }, [location]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') { setActiveMenu(null); setShowCountry(false); } };
    const handleClick = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setActiveMenu(null); };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => { document.removeEventListener('keydown', handleKey); document.removeEventListener('mousedown', handleClick); };
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };
  const toggleMenu = (name) => setActiveMenu(activeMenu === name ? null : name);
  const navLinks = ['Book & Manage', 'Experience', 'Loyalty', 'Support'];
  const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()));

  return (
    <>
      <motion.nav
        ref={menuRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 navbar-transition"
        style={{
          background: isDark ? 'rgba(13,31,26,0.55)' : '#ffffff',
          backdropFilter: isDark ? 'blur(16px)' : 'none',
          borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
          boxShadow: isDark ? 'none' : '0 2px 20px rgba(0,0,0,0.06)',
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-16 gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              {/* Airplane icon — white on dark, black on white */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill={isDark ? '#ffffff' : '#0D1F1A'}>
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
              <span className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-primary'}`}>
                Sky<span className="text-accent">Journey</span>
              </span>
            </Link>

            {/* Nav links — NO arrows */}
            {!isAdmin && (
              <div className="hidden lg:flex items-center gap-1 flex-1">
                {navLinks.map((name) => (
                  <button
                    key={name}
                    onClick={() => toggleMenu(name)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeMenu === name
                        ? isDark ? 'bg-white/20 text-white' : 'bg-gray-100 text-primary'
                        : isDark ? 'text-white/90 hover:bg-white/15 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}

            {isAdmin && (
              <div className="hidden lg:flex items-center gap-1 flex-1">
                {['/admin/dashboard', '/admin/flights', '/admin/bookings', '/admin/users'].map((path, i) => (
                  <Link key={path} to={path}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${isDark ? 'text-white/90 hover:bg-white/15' : 'text-gray-700 hover:bg-gray-100'}`}>
                    {['Dashboard', 'Flights', 'Bookings', 'Users'][i]}
                  </Link>
                ))}
              </div>
            )}

            {/* Right section */}
            <div className="hidden lg:flex items-center gap-2 ml-auto">
              <button className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full border transition-all ${
                isDark ? 'border-white/30 text-white hover:bg-white/10' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}>
                <FiSearch size={14} />
                <span>Search</span>
              </button>

              {/* Country — only flag + EN, no "IN" */}
              <button onClick={() => setShowCountry(true)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-full border transition-all ${
                  isDark ? 'border-white/30 text-white hover:bg-white/10' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}>
                <span className="text-base">🇮🇳</span>
                <span className="font-medium text-xs">EN</span>
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link to="/my-bookings"
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border transition-all ${isDark ? 'border-white/30 text-white hover:bg-white/10' : 'border-gray-200 text-primary hover:bg-gray-50'}`}>
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
                      {user?.name?.charAt(0)}
                    </div>
                    <span>{user?.name?.split(' ')[0]}</span>
                  </Link>
                  <Link to="/my-bookings"
                    className={`text-sm px-3 py-1.5 rounded-full border transition-all hidden xl:block ${isDark ? 'border-white/30 text-white hover:bg-white/10' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                    My Bookings
                  </Link>
                  <button onClick={handleLogout}
                    className={`text-sm px-3 py-1.5 rounded-full border transition-all ${isDark ? 'border-white/30 text-white hover:bg-white/10' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-accent text-white text-sm font-bold px-6 py-2.5 rounded hover:bg-accent-light transition-all">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden ml-auto p-2 ${isDark ? 'text-white' : 'text-primary'}`}>
              <div className="w-5 space-y-1.5">
                <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {activeMenu && megaMenus[activeMenu] && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl z-50"
            >
              <div className="max-w-screen-2xl mx-auto px-8 py-8">
                <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${megaMenus[activeMenu].columns.length}, 1fr)` }}>
                  {megaMenus[activeMenu].columns.map((col, i) => (
                    <div key={i}>
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">{col.title}</p>
                      <ul className="space-y-3">
                        {col.links.map((link, j) => (
                          <li key={j}>
                            <Link to={link.to} onClick={() => setActiveMenu(null)}
                              className="text-sm text-gray-500 hover:text-accent transition-colors">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-100">
              <div className="px-6 py-4 space-y-2">
                {navLinks.map(name => (
                  <div key={name} className="py-2 border-b border-gray-100 text-sm font-medium text-primary">{name}</div>
                ))}
                <div className="pt-2">
                  {isAuthenticated
                    ? <button onClick={handleLogout} className="text-sm text-red-500">Logout</button>
                    : <Link to="/login" className="bg-accent text-white text-sm font-semibold px-4 py-2 rounded inline-block">Login</Link>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Country Modal */}
      <AnimatePresence>
        {showCountry && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowCountry(false)}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-lg shadow-2xl w-full max-w-sm max-h-[75vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-primary">Select country/territory and language</h3>
                <button onClick={() => setShowCountry(false)} className="text-gray-400 hover:text-primary"><FiX size={18} /></button>
              </div>
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2">
                  <FiSearch size={14} className="text-gray-400" />
                  <input type="text" placeholder="Search country/territory" value={countrySearch}
                    onChange={e => setCountrySearch(e.target.value)} autoFocus
                    className="flex-1 bg-transparent text-sm text-primary focus:outline-none placeholder:text-gray-400" />
                </div>
              </div>
              <div className="overflow-y-auto flex-1">
                {filteredCountries.map((c, i) => (
                  <div key={i} onClick={() => setShowCountry(false)}
                    className={`flex items-center justify-between px-5 py-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${c.active ? 'bg-green-50/50' : ''}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{c.flag}</span>
                      <div>
                        <p className="text-sm font-medium text-primary">{c.name}</p>
                        <div className="flex gap-2 mt-0.5">
                          {c.langs.map((lang, j) => (
                            <span key={j} className={`text-xs ${j === 0 ? 'text-accent font-medium' : 'text-gray-400'}`}>{lang}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {c.active && <span className="text-accent text-base font-bold">✓</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
