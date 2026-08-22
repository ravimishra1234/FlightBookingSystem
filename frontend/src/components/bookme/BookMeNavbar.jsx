import { Link, useLocation } from 'react-router-dom';
import { FiHelpCircle } from 'react-icons/fi';
import { MdOutlineLocalTaxi, MdOutlineDirectionsCar } from 'react-icons/md';
import { BsBuildingFill } from 'react-icons/bs';

const tabs = [
  { label: 'Stays', icon: <BsBuildingFill size={15} />, to: '/bookme' },
  { label: 'Car rental', icon: <MdOutlineDirectionsCar size={17} />, to: '/bookme/cars' },
  { label: 'Airport taxis', icon: <MdOutlineLocalTaxi size={17} />, to: '/bookme/airport-taxis' },
];

const BookMeNavbar = () => {
  const location = useLocation();

  return (
    <div style={{ background: '#003580' }}>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        {/* Top row */}
        <div className="flex items-center justify-between h-16">
          <Link to="/bookme" className="text-white font-extrabold text-2xl tracking-tight">
            BookMe<span className="text-yellow-400">.</span>com
          </Link>

          <div className="flex items-center gap-5">
            <span className="text-white text-sm font-medium hidden sm:block">INR</span>
            <button className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-white/30">
              <span className="text-base leading-none">🇮🇳</span>
            </button>
            <button className="text-white hover:bg-white/10 p-1.5 rounded-full transition-all">
              <FiHelpCircle size={18} />
            </button>
            <button className="text-white text-sm font-medium hover:underline hidden md:block">
              List your property
            </button>
            <Link to="/bookme/register" className="bg-white text-[#003580] text-sm font-semibold px-4 py-2 rounded hover:bg-gray-100 transition-all">
              Register
            </Link>
            <Link to="/bookme/login" className="text-white text-sm font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        {/* Tabs row */}
        <div className="flex items-center gap-3 pb-4">
          {tabs.map((tab) => {
            const active = location.pathname === tab.to;
            return (
              <Link
                key={tab.label}
                to={tab.to}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-white/15 text-white border border-white/40'
                    : 'text-white/90 border border-transparent hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {tab.icon}
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookMeNavbar;
