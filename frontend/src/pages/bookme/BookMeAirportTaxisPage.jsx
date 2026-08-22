import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiChevronDown, FiUser } from 'react-icons/fi';
import { MdSwapHoriz } from 'react-icons/md';
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
      {open && <p className="text-sm text-gray-500 pb-4 leading-relaxed">More details about this would appear here once connected to live booking data.</p>}
    </div>
  );
};

const BookMeAirportTaxisPage = () => {
  const [tripType, setTripType] = useState('One-way');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [passengerFilter, setPassengerFilter] = useState('1 – 3 passengers');

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

      {/* Hero + search */}
      <div style={{ background: '#f5f5f5' }} className="pt-12 pb-16 px-6 lg:px-10">
        <div className="max-w-screen-xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-primary mb-2">Book your airport taxi</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 mb-6">Easy airport transfers to and from your accommodation</motion.p>

          {/* Trip type */}
          <div className="flex items-center gap-6 mb-4">
            {['One-way', 'Return'].map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={tripType === type} onChange={() => setTripType(type)} className="w-4 h-4 accent-blue-600" />
                <span className="text-base text-primary">{type}</span>
              </label>
            ))}
          </div>

          {/* Search bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-lg p-1 mb-10" style={{ background: '#febb02' }}>
            <div className="flex flex-col lg:flex-row gap-1">
              <div className="flex-[1.6] flex items-center gap-2 bg-white rounded px-4 py-3.5">
                <input value={pickup} onChange={e => setPickup(e.target.value)}
                  placeholder="Enter pick-up location"
                  className="flex-1 text-sm text-primary focus:outline-none placeholder:text-gray-400" />
                <MdSwapHoriz className="text-gray-400 flex-shrink-0" size={18} />
                <input value={dropoff} onChange={e => setDropoff(e.target.value)}
                  placeholder="Enter destination"
                  className="flex-1 text-sm text-primary focus:outline-none placeholder:text-gray-400" />
              </div>
              <div className="flex-1 flex items-center gap-2 bg-white rounded px-4 py-3.5">
                <FiCalendar className="text-gray-400 flex-shrink-0" size={16} />
                <span className="text-sm text-primary">Fri 26, Jun, 12:00</span>
              </div>
              {tripType === 'Return' && (
                <div className="flex-1 flex items-center gap-2 bg-white rounded px-4 py-3.5">
                  <FiCalendar className="text-gray-400 flex-shrink-0" size={16} />
                  <span className="text-sm text-gray-400">Add a return</span>
                </div>
              )}
              {tripType === 'One-way' && (
                <div className="flex-1 flex items-center gap-2 bg-white rounded px-4 py-3.5">
                  <FiCalendar className="text-gray-400 flex-shrink-0" size={16} />
                  <span className="text-sm text-gray-400">Add a return</span>
                </div>
              )}
              <div className="flex-shrink-0 flex items-center gap-2 bg-white rounded px-4 py-3.5">
                <FiUser className="text-gray-400 flex-shrink-0" size={16} />
                <span className="text-sm text-primary">2</span>
                <FiChevronDown className="text-gray-400" size={14} />
              </div>
              <button className="flex-shrink-0 text-white font-bold px-10 py-3.5 rounded text-base flex items-center justify-center gap-2" style={{ background: '#006ce4' }}>
                Search
              </button>
            </div>
          </motion.div>

          {/* Feature icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: '🌍', title: 'Flight tracking', desc: "Your driver tracks your flight and waits for you if it's delayed" },
              { emoji: '🪙', title: 'One clear price', desc: 'Your price is confirmed upfront – no extra costs, no cash required' },
              { emoji: '🎧', title: 'Tried and trusted', desc: 'We work with professional drivers and have 24/7 customer care' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-3xl flex-shrink-0">{f.emoji}</div>
                <div>
                  <h4 className="text-base font-bold text-primary mb-1">{f.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12">
        {/* Your account, your travel */}
        <h2 className="text-3xl font-bold text-primary mb-5">Your account, your travel</h2>
        <div className="border border-gray-200 rounded-lg p-6 flex items-center justify-between mb-16">
          <div>
            <h3 className="text-base font-bold text-primary mb-1">All your trip details in one place</h3>
            <p className="text-sm text-gray-600 mb-4">Sign in to book faster and manage your trip with ease</p>
            <div className="flex items-center gap-4">
              <button className="text-white font-semibold px-5 py-2 rounded text-sm" style={{ background: '#006ce4' }}>Sign in</button>
              <button className="text-sm font-medium" style={{ color: '#006ce4' }}>Register</button>
            </div>
          </div>
          <div className="hidden sm:flex w-20 h-20 rounded-xl items-center justify-center text-3xl flex-shrink-0" style={{ background: '#003580' }}>🎁</div>
        </div>

        {/* Airport transfers made easy */}
        <h2 className="text-3xl font-bold text-primary text-center mb-12">Airport transfers made easy</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          {/* Left list */}
          <div className="space-y-8">
            {[
              { icon: '🚗', title: 'Booking your airport taxi', desc: 'Confirmation is immediate. If your plans change, you can cancel for free up to 24 hours before your scheduled pick-up time' },
              { icon: '🧍', title: 'Meeting your driver', desc: "Instructions for finding your meeting point are provided as soon as you've booked. When you add flight tracking, your driver will track your arrival and adjust your pick-up time if you're delayed – or early!" },
              { icon: '🏢', title: 'Arriving at your destination', desc: 'Get to your destination quickly and safely – no waiting in line for a taxi, no figuring out public transport' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h4 className="text-base font-bold text-primary mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right flow diagram */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 text-sm text-primary px-4 py-2 rounded-lg mb-4 self-start ml-4">How does it work?</div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-10 text-center">
              {[
                ['🖥️', 'Book online'],
                ['📱', 'Receive confirmation'],
                ['🏢', 'Arrive at your destination'],
                ['🧍', 'Meet your driver'],
              ].map(([icon, label], i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center text-2xl mb-2 bg-white">{icon}</div>
                  <p className="text-sm text-primary font-medium">{label}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-6">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <p className="text-sm font-medium text-primary">Enjoy your trip!</p>
            </div>
          </div>
        </div>

        {/* Airport taxis for any kind of trip */}
        <div style={{ background: '#f5f5f5', margin: '0 -1000px', padding: '0 1000px' }} className="py-12 mb-16">
          <h2 className="text-3xl font-bold text-primary mb-5">Airport taxis for any kind of trip</h2>
          <div className="flex items-center gap-3 mb-6">
            {['1 – 3 passengers', '4 – 7 passengers', 'All taxis'].map((tab, i) => (
              <button key={tab} onClick={() => setPassengerFilter(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  passengerFilter === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-700 hover:bg-gray-100'
                } ${i === 2 ? 'border-l border-gray-300 rounded-none pl-4' : ''}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { name: 'Standard', car: 'Skoda Octavia or similar' },
              { name: 'Executive', car: 'Mercedes-Benz E-Class or similar' },
            ].map(taxi => (
              <div key={taxi.name} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-1">{taxi.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{taxi.car}</p>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FiUser size={14} className="text-gray-400" /> 3 passengers
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-gray-400">💼</span> 2 standard bags
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#006ce4' }}>
                    <span>✓</span> Meet & Greet included
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                    <span>✓</span> Free cancellation
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <h2 className="text-3xl font-bold text-primary mb-1">Find out more about our airport taxi service</h2>
        <p className="text-gray-500 text-sm mb-6">See more FAQs on our <button className="hover:underline" style={{ color: '#006ce4' }}>help page</button></p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-12">
          <div className="border border-gray-200 rounded-lg px-5">
            <FAQItem q="What happens if my flight is early or delayed?" />
            <FAQItem q="What's included in the price?" />
          </div>
          <div className="border border-gray-200 rounded-lg px-5 mt-4 md:mt-0">
            <FAQItem q="How do I pay?" />
            <FAQItem q="Can I cancel my booking?" />
          </div>
        </div>

        {/* Bottom link list */}
        <div className="border-t border-gray-100 pt-6 mb-2">
          <p className="text-xs text-gray-400 leading-relaxed">
            {['Countries', 'Regions', 'Cities', 'Districts', 'Airports', 'Hotels', 'Places of interest', 'Holiday Homes', 'Apartments', 'Resorts', 'Villas', 'Hostels', 'B&Bs', 'Guest Houses', 'Unique places to stay', 'All destinations'].map((l, i) => (
              <span key={l}>{l} {i < 15 ? '· ' : ''}</span>
            ))}
          </p>
          <p className="text-xs text-gray-400 leading-relaxed mt-1">
            {['All flight destinations', 'All car hire locations', 'All holiday destinations', 'Discover', 'Discover monthly stays'].map((l, i) => (
              <span key={l}>{l} {i < 4 ? '· ' : ''}</span>
            ))}
          </p>
        </div>
      </div>

      <BookMeFooter />
    </div>
  );
};

export default BookMeAirportTaxisPage;
