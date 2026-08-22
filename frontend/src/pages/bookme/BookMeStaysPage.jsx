import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import BookMeNavbar from '../../components/bookme/BookMeNavbar';
import BookMeFooter from '../../components/bookme/BookMeFooter';

const ScrollRow = ({ id, children }) => {
  const ref = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const scroll = (dir) => {
    ref.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
    setTimeout(() => setShowLeft(ref.current.scrollLeft > 0), 350);
  };
  return (
    <div className="relative group">
      {showLeft && (
        <button onClick={() => scroll(-1)}
          className="absolute left-0 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 border border-gray-200">
          <FiChevronLeft size={18} />
        </button>
      )}
      <div ref={ref} className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {children}
      </div>
      <button onClick={() => scroll(1)}
        className="absolute right-0 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
        <FiChevronRight size={18} />
      </button>
    </div>
  );
};

const BookMeStaysPage = () => {
  const [destination, setDestination] = useState('');
  const [workTrip, setWorkTrip] = useState(false);
  const [activeTab, setActiveTab] = useState('Historical Tours');

  const propertyTypes = [
    { label: 'Hotels', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80' },
    { label: 'Apartments', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80' },
    { label: 'Resorts', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80' },
    { label: 'Villas', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&q=80' },
    { label: 'Cabins', img: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=500&q=80' },
    { label: 'Cottages', img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=500&q=80' },
    { label: 'Glamping Sites', img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&q=80' },
    { label: 'Serviced Apartments', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80' },
  ];

  const tripDestinations = [
    { city: 'Lucknow', dist: '1,580 km away', img: 'https://images.unsplash.com/photo-1601122700899-5dba35d23c69?w=400&q=80' },
    { city: 'Udaipur', dist: '1,354 km away', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80' },
    { city: 'Kolkata', dist: '1,561 km away', img: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=400&q=80' },
    { city: 'Hyderabad', dist: '502 km away', img: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=400&q=80' },
    { city: 'Agra', dist: '1,580 km away', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&q=80' },
    { city: 'New Delhi', dist: '1,742 km away', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80' },
  ];

  const homes = [
    { name: 'New Sugar Loft Apartments', loc: 'Santa Teresa, Brazil, Rio de Janeiro', rating: '7.8', label: 'Good', reviews: '826 reviews', price: '1,800', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&q=80' },
    { name: 'The Apartments by The Sloane Club', loc: 'Kensington and Chelsea, United Kingdom, London', rating: '9.0', label: 'Superb', reviews: '257 reviews', price: '47,500', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80' },
    { name: 'Luxury Apartments Villa Klara', loc: 'Znjan, Croatia, Split', rating: '9.1', label: 'Superb', reviews: '230 reviews', price: '15,800', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80' },
    { name: 'Flora Chiado Apartments', loc: 'Santa Maria Maior, Portugal, Lisbon', rating: '9.7', label: 'Exceptional', reviews: '166 reviews', price: '39,400', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <BookMeNavbar />

      {/* Partnership banner */}
      <div className="bg-white py-5 text-center border-b border-gray-100">
        <p className="text-xs text-gray-400 mb-1">In partnership with</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl">✈</span>
          <span className="text-lg font-bold" style={{ color: '#1D6B43' }}>Sky<span style={{ color: '#0D1F1A' }}>Journey</span></span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: '#003580' }} className="pb-32 pt-12 px-6 lg:px-10">
        <div className="max-w-screen-xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-white mb-3">Find your next stay</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xl text-white/90">Search low prices on hotels, homes and much more...</motion.p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 -mt-24 relative z-10">
        {/* Search bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-lg overflow-hidden shadow-2xl" style={{ background: '#febb02' }}>
          <div className="px-5 pt-4 pb-1 grid grid-cols-3 gap-1 text-sm font-medium text-gray-800">
            <span>Destination, property name or address:</span>
            <span>Check-in — Check-out</span>
            <span>Travellers</span>
          </div>
          <div className="p-3 flex flex-col md:flex-row gap-2">
            <div className="flex-[2] flex items-center gap-2 bg-white rounded px-4 py-3.5">
              <FiSearch className="text-gray-400 flex-shrink-0" size={18} />
              <input value={destination} onChange={e => setDestination(e.target.value)}
                placeholder="Where are you going?"
                className="flex-1 text-sm text-primary focus:outline-none placeholder:text-gray-400" />
            </div>
            <div className="flex-1 flex items-center gap-2 bg-white rounded px-4 py-3.5">
              <FiCalendar className="text-gray-400 flex-shrink-0" size={16} />
              <span className="text-sm text-gray-500">Check-in — Check-out</span>
            </div>
            <div className="flex-1 flex items-center gap-2 bg-white rounded px-4 py-3.5">
              <FiUser className="text-gray-400 flex-shrink-0" size={16} />
              <span className="text-sm text-gray-700">2 adults · 0 children · 1 room</span>
            </div>
            <button className="text-white font-bold px-8 py-3.5 rounded text-base flex-shrink-0" style={{ background: '#006ce4' }}>
              Search
            </button>
          </div>
        </motion.div>

        {/* Work trip */}
        <div className="bg-white px-2 py-4 flex items-center gap-2">
          <input type="checkbox" checked={workTrip} onChange={() => setWorkTrip(!workTrip)} className="w-4 h-4 accent-blue-600" />
          <span className="text-sm text-gray-700">I'm travelling for work</span>
        </div>

        {/* Promo card */}
        <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col md:flex-row mb-12">
          <div className="flex-1 p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">✈</span>
              <span className="font-bold text-sm" style={{ color: '#1D6B43' }}>SkyJourney <span className="text-gray-500 font-normal">Miles</span></span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">Earn 1 mile per ₹100 spent</h3>
            <button className="border text-sm font-medium px-5 py-2 rounded hover:bg-gray-50 transition-all w-fit" style={{ borderColor: '#006ce4', color: '#006ce4' }}>
              See promotion details
            </button>
          </div>
          <div className="md:w-2/5 h-44 md:h-auto">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" alt="Travel" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Why BookMe */}
        <h2 className="text-3xl font-bold text-primary mb-6">Why BookMe.com?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { icon: '📅', title: 'Book now, pay at the property', desc: 'FREE cancellation on most rooms' },
            { icon: '👍', title: '300M+ reviews from fellow travellers', desc: 'Get trusted information from guests like you' },
            { icon: '🌍', title: '2+ million properties worldwide', desc: 'Hotels, guest houses, apartments, and more...' },
            { icon: '🎧', title: 'Trusted customer service you can rely on, 24/7', desc: "We're always here to help" },
          ].map((c, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-5">
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="text-sm font-bold text-primary mb-1 leading-snug">{c.title}</h3>
              <p className="text-xs text-gray-500">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Trending destinations */}
        <h2 className="text-3xl font-bold text-primary mb-1">Trending destinations</h2>
        <p className="text-gray-500 text-sm mb-5">Most popular choices for travellers from India</p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { city: 'New Delhi', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80' },
            { city: 'Bengaluru', img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80', highlight: true },
          ].map(item => (
            <div key={item.city} className={`relative rounded-lg overflow-hidden cursor-pointer ${item.highlight ? 'ring-2 ring-yellow-400' : ''}`} style={{ height: '360px' }}>
              <img src={item.img} alt={item.city} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="text-white font-bold text-2xl">{item.city}</span>
                <span className="text-xl">🇮🇳</span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 mb-14">
          {[
            { city: 'Mumbai', img: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80' },
            { city: 'Chennai', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80' },
            { city: 'Hyderabad', img: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=600&q=80' },
          ].map(item => (
            <div key={item.city} className="relative rounded-lg overflow-hidden cursor-pointer" style={{ height: '240px' }}>
              <img src={item.img} alt={item.city} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="text-white font-bold text-xl">{item.city}</span>
                <span>🇮🇳</span>
              </div>
            </div>
          ))}
        </div>

        {/* Browse by property type */}
        <h2 className="text-3xl font-bold text-primary mb-6">Browse by property type</h2>
        <div className="mb-14">
          <ScrollRow id="property-scroll">
            {propertyTypes.map(item => (
              <div key={item.label} className="flex-shrink-0 cursor-pointer" style={{ width: '240px' }}>
                <div className="rounded-lg overflow-hidden" style={{ height: '200px' }}>
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover hover:opacity-95 transition-opacity" />
                </div>
                <p className="text-base font-bold text-primary mt-3">{item.label}</p>
              </div>
            ))}
          </ScrollRow>
        </div>

        {/* Quick and easy trip planner */}
        <h2 className="text-3xl font-bold text-primary mb-1">Quick and easy trip planner</h2>
        <p className="text-gray-500 text-sm mb-5">Pick a vibe and explore the top destinations in India</p>
        <div className="flex items-center gap-2 mb-5 overflow-x-auto scrollbar-hide pb-1">
          {['Historical Tours', 'Crafts & Artisans', 'Historical Expeditions', 'Festivals & Events', 'Gastronomic Experiences', 'Beach Trips'].map(tag => (
            <button key={tag} onClick={() => setActiveTab(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${
                activeTab === tag ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-700 hover:bg-gray-50'
              }`}>
              {tag}
            </button>
          ))}
          <button className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap flex items-center gap-1">More ⌄</button>
        </div>
        <div className="mb-14">
          <ScrollRow id="trip-scroll">
            {tripDestinations.map(item => (
              <div key={item.city} className="flex-shrink-0 cursor-pointer" style={{ width: '180px' }}>
                <div className="rounded-lg overflow-hidden" style={{ height: '175px' }}>
                  <img src={item.img} alt={item.city} className="w-full h-full object-cover" />
                </div>
                <p className="text-base font-bold text-primary mt-3">{item.city}</p>
                <p className="text-sm text-gray-500">{item.dist}</p>
              </div>
            ))}
          </ScrollRow>
        </div>

        {/* Homes guests love */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-3xl font-bold text-primary">Homes guests love</h2>
          <button className="text-sm font-medium hover:underline" style={{ color: '#006ce4' }}>Discover homes</button>
        </div>
        <div className="mb-14">
          <ScrollRow id="homes-scroll">
            {homes.map(hotel => (
              <div key={hotel.name} className="flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden" style={{ width: '260px' }}>
                <div className="relative" style={{ height: '190px' }}>
                  <img src={hotel.img} alt={hotel.name} className="w-full h-full object-cover" />
                  <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors text-lg">♡</button>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-primary leading-snug mb-1">{hotel.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{hotel.loc}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-white text-xs font-bold px-2 py-0.5 rounded" style={{ background: '#003580' }}>{hotel.rating}</span>
                    <div>
                      <p className="text-xs font-semibold text-primary leading-none">{hotel.label}</p>
                      <p className="text-xs text-gray-400">{hotel.reviews}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-right">Starting from <span className="text-base font-bold text-primary">₹ {hotel.price}</span></p>
                </div>
              </div>
            ))}
          </ScrollRow>
        </div>

        {/* Travel more spend less */}
        <h2 className="text-3xl font-bold text-primary mb-5">Travel more, spend less</h2>
        <div className="border border-gray-200 rounded-lg p-6 flex items-center justify-between mb-16">
          <div>
            <h3 className="text-base font-bold text-primary mb-1">Sign in, save money</h3>
            <p className="text-sm text-gray-600 mb-4">Save 10% or more at participating properties - just look for the blue Genius label</p>
            <div className="flex items-center gap-4">
              <button className="text-white font-semibold px-5 py-2 rounded text-sm" style={{ background: '#006ce4' }}>Sign in</button>
              <button className="text-sm font-medium" style={{ color: '#006ce4' }}>Register</button>
            </div>
          </div>
          <div className="hidden sm:flex w-20 h-20 rounded-xl items-center justify-center text-3xl flex-shrink-0" style={{ background: '#003580' }}>🎁</div>
        </div>
      </div>

      <BookMeFooter />
    </div>
  );
};

export default BookMeStaysPage;
