import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiClock, FiChevronDown } from 'react-icons/fi';
import { HiOutlineAdjustments } from 'react-icons/hi';
import BookMeNavbar from '../../components/bookme/BookMeNavbar';
import BookMeFooter from '../../components/bookme/BookMeFooter';

const FAQItem = ({ q }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left">
        <span className="text-base font-bold text-primary pr-4">{q}</span>
        <FiChevronDown size={18} className={`text-gray-500 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="text-sm text-gray-500 pb-4 leading-relaxed">More details about this would appear here once connected to live rental data.</p>}
    </div>
  );
};

const BookMeCarsPage = () => {
  const [diffLocation, setDiffLocation] = useState(false);
  const [ageRange, setAgeRange] = useState(true);
  const [destTab, setDestTab] = useState('Cities worldwide');

  const cities = [
    { name: 'El Segundo', locs: '103 car hire locations', price: '£46.59', img: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=200&q=80' },
    { name: 'Dania Beach', locs: '92 car hire locations', price: '£35.09', img: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=200&q=80' },
    { name: 'Coolangatta', locs: '22 car hire locations', price: '£40.30', img: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a5d8?w=200&q=80' },
    { name: 'Phoenix', locs: '78 car hire locations', price: '£49.10', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=200&q=80' },
    { name: 'Jamaica', locs: '79 car hire locations', price: '£60.69', img: 'https://images.unsplash.com/photo-1580541631971-808c7adb6c50?w=200&q=80' },
    { name: 'Irving', locs: '81 car hire locations', price: '£46.15', img: 'https://images.unsplash.com/photo-1545194445-379a93b5f021?w=200&q=80' },
    { name: 'Madrid', locs: '108 car hire locations', price: '£37.06', img: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=200&q=80' },
    { name: 'Calgary', locs: '46 car hire locations', price: '£49.05', img: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=200&q=80' },
    { name: 'San Diego', locs: '87 car hire locations', price: '£41.87', img: 'https://images.unsplash.com/photo-1538256962235-2bc8c8d1d3b8?w=200&q=80' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <BookMeNavbar />

      <div className="bg-white py-5 text-center border-b border-gray-100">
        <p className="text-xs text-gray-400 mb-1">In partnership with</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg">✈</span>
          <span className="text-lg font-bold" style={{ color: '#1D6B43' }}>Sky<span style={{ color: '#0D1F1A' }}>Journey</span></span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: '#003580' }} className="pb-20 pt-12 px-6 lg:px-10">
        <div className="max-w-screen-xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-white mb-3">Car hire for any kind of trip</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xl text-white/90 mb-8">Great cars at great prices, from the biggest car rental companies</motion.p>

          {/* Yellow search bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-lg p-1" style={{ background: '#febb02' }}>
            <div className="flex flex-col md:flex-row gap-1">
              <div className="flex-[1.6] flex items-center gap-2 bg-white rounded px-4 py-3.5">
                <FiSearch className="text-gray-400 flex-shrink-0" size={16} />
                <div>
                  <p className="text-xs text-gray-400">Pick-up location</p>
                  <input placeholder="Airport, city or station" className="text-sm font-medium text-primary focus:outline-none placeholder:text-gray-400 placeholder:font-normal" />
                </div>
              </div>
              <div className="flex-1 flex items-center gap-2 bg-white rounded px-4 py-3.5">
                <FiCalendar className="text-gray-400 flex-shrink-0" size={16} />
                <div>
                  <p className="text-xs text-gray-400">Pick-up date</p>
                  <p className="text-sm font-medium text-primary">Sun 21 Jun</p>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center gap-2 bg-white rounded px-4 py-3.5">
                <FiClock className="text-gray-400 flex-shrink-0" size={16} />
                <div>
                  <p className="text-xs text-gray-400">Time</p>
                  <p className="text-sm font-medium text-primary">10:00</p>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-2 bg-white rounded px-4 py-3.5">
                <FiCalendar className="text-gray-400 flex-shrink-0" size={16} />
                <div>
                  <p className="text-xs text-gray-400">Drop-off date</p>
                  <p className="text-sm font-medium text-primary">Wed 24 Jun</p>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center gap-2 bg-white rounded px-4 py-3.5">
                <FiClock className="text-gray-400 flex-shrink-0" size={16} />
                <div>
                  <p className="text-xs text-gray-400">Time</p>
                  <p className="text-sm font-medium text-primary">10:00</p>
                </div>
              </div>
              <button className="flex-shrink-0 text-white font-bold px-8 py-3.5 rounded text-base" style={{ background: '#006ce4' }}>
                Search
              </button>
            </div>
          </motion.div>

          {/* Checkboxes */}
          <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={diffLocation} onChange={() => setDiffLocation(!diffLocation)} className="w-4 h-4 accent-blue-600" />
                <span className="text-sm text-white">Drop car off at different location</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={ageRange} onChange={() => setAgeRange(!ageRange)} className="w-4 h-4 accent-blue-600" />
                <span className="text-sm text-white">Driver aged between 30 - 65?</span>
              </label>
            </div>
            <button className="flex items-center gap-2 text-sm font-medium text-white hover:underline">
              <HiOutlineAdjustments size={16} /> Quick filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-10">
        {/* Travel more spend less */}
        <h2 className="text-3xl font-bold text-primary mb-5">Travel more, spend less</h2>
        <div className="border border-gray-200 rounded-lg p-6 flex items-center justify-between mb-12">
          <div>
            <h3 className="text-base font-bold text-primary mb-1">Sign in, save money</h3>
            <p className="text-sm text-gray-600 mb-4">Save 10% on select rental cars - just look for the blue Genius label</p>
            <div className="flex items-center gap-4">
              <button className="text-white font-semibold px-5 py-2 rounded text-sm" style={{ background: '#006ce4' }}>Sign in</button>
              <button className="text-sm font-medium" style={{ color: '#006ce4' }}>Register</button>
            </div>
          </div>
          <div className="hidden sm:flex w-20 h-20 rounded-xl items-center justify-center text-3xl flex-shrink-0" style={{ background: '#003580' }}>🎁</div>
        </div>

        {/* Feature badges */}
        <div className="bg-gray-50 rounded-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {[
            { icon: '🎧', title: "We're here for you", desc: 'Customer support in over 30 languages' },
            { icon: '📅', title: 'Free cancellation', desc: 'Up to 48 hours before pick-up, on most bookings' },
            { icon: '👍', title: '5 million+ reviews', desc: 'By real, verified customers' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl flex-shrink-0">{f.icon}</div>
              <div>
                <h4 className="text-base font-bold text-primary">{f.title}</h4>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="text-3xl font-bold text-primary mb-6">Frequently asked questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-16">
          <div className="border border-gray-200 rounded-lg px-5">
            <FAQItem q="Why should I book a car rental in India with BookMe.com?" />
            <FAQItem q="What do I need to rent a car?" />
            <FAQItem q="Am I old enough to rent a car?" />
          </div>
          <div className="border border-gray-200 rounded-lg px-5 mt-4 md:mt-0">
            <FAQItem q="Can I book a car for my partner, friend, colleague, etc?" />
            <FAQItem q="Any tips on choosing the right car?" />
            <FAQItem q="Is the rental price all inclusive?" />
          </div>
        </div>

        {/* Popular car hire destinations */}
        <h2 className="text-3xl font-bold text-primary mb-1">Popular car hire destinations</h2>
        <p className="text-gray-500 text-sm mb-5">Explore more options to hire a car for cheap</p>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setDestTab('Cities worldwide')}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              destTab === 'Cities worldwide' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-700 hover:bg-gray-50'
            }`}>
            Cities worldwide
          </button>
          <button onClick={() => setDestTab('Airports worldwide')}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              destTab === 'Airports worldwide' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-700 hover:bg-gray-50'
            }`}>
            Airports worldwide
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mb-6">
          {cities.map(c => (
            <div key={c.name} className="flex items-center gap-3">
              <div className="w-14 h-14 rounded overflow-hidden flex-shrink-0">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">{c.name}</p>
                <p className="text-xs text-gray-500">{c.locs}</p>
                <p className="text-xs text-gray-500">Average price of <span className="font-bold text-primary">{c.price}</span> per day</p>
              </div>
            </div>
          ))}
        </div>
        <button className="flex items-center gap-1 text-sm font-medium mb-16" style={{ color: '#006ce4' }}>
          <span className="text-lg leading-none">+</span> Show more
        </button>
      </div>

      <BookMeFooter />
    </div>
  );
};

export default BookMeCarsPage;
