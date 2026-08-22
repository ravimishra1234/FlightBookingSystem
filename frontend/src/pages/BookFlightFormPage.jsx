import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdFlightTakeoff, MdFlightLand, MdCalendarToday, MdSwapHoriz } from 'react-icons/md';
import { BsPeopleFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout';

const indianCities = [
  { city: 'Bengaluru', airport: 'Kempegowda International', code: 'BLR' },
  { city: 'Mumbai', airport: 'Chhatrapati Shivaji Maharaj International', code: 'BOM' },
  { city: 'Delhi', airport: 'Indira Gandhi International', code: 'DEL' },
  { city: 'Chennai', airport: 'Chennai International', code: 'MAA' },
  { city: 'Hyderabad', airport: 'Rajiv Gandhi International', code: 'HYD' },
  { city: 'Kolkata', airport: 'Netaji Subhas Chandra Bose International', code: 'CCU' },
  { city: 'Goa', airport: 'Goa International', code: 'GOI' },
  { city: 'Kochi', airport: 'Cochin International', code: 'COK' },
  { city: 'Jaipur', airport: 'Jaipur International', code: 'JAI' },
  { city: 'Srinagar', airport: 'Sheikh ul-Alam International', code: 'SXR' },
  { city: 'Port Blair', airport: 'Veer Savarkar International', code: 'IXZ' },
  { city: 'London', airport: 'Heathrow Airport', code: 'LHR' },
  { city: 'Dubai', airport: 'Dubai International', code: 'DXB' },
  { city: 'Singapore', airport: 'Changi Airport', code: 'SIN' },
  { city: 'Bangkok', airport: 'Suvarnabhumi Airport', code: 'BKK' },
];

const BookFlightFormPage = () => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [tripType, setTripType] = useState('Round trip');
  const [from, setFrom] = useState('Bengaluru (BLR)');
  const [to, setTo] = useState('');
  const [fromQuery, setFromQuery] = useState('Bengaluru (BLR)');
  const [toQuery, setToQuery] = useState('');
  const [showFromDrop, setShowFromDrop] = useState(false);
  const [showToDrop, setShowToDrop] = useState(false);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [showPassenger, setShowPassenger] = useState(false);
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });

  useEffect(() => {
    const handleClick = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setShowFromDrop(false); setShowToDrop(false); setShowPassenger(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filteredFrom = indianCities.filter(c =>
    c.city.toLowerCase().includes(fromQuery.toLowerCase()) || c.code.toLowerCase().includes(fromQuery.toLowerCase())
  );
  const filteredTo = indianCities.filter(c =>
    c.city.toLowerCase().includes(toQuery.toLowerCase()) || c.code.toLowerCase().includes(toQuery.toLowerCase())
  );

  const handleSwap = () => {
    const tf = from; const tfq = fromQuery;
    setFrom(to); setFromQuery(toQuery);
    setTo(tf); setToQuery(tfq);
  };

  const passengerLabel = () => {
    const total = passengers.adults + passengers.children + passengers.infants;
    return `${total} Passenger${total > 1 ? 's' : ''}, Guest Class`;
  };

  const adjustPassenger = (type, delta) => {
    setPassengers(prev => ({ ...prev, [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + delta) }));
  };

  const handleSearch = () => {
    if (!from || !to || !departureDate) return;
    const fromCity = from.split(' (')[0];
    const toCity = to.split(' (')[0];
    const params = new URLSearchParams({ source: fromCity, destination: toCity, departureDate });
    navigate(`/search?${params.toString()}`);
  };

  const CityDropdown = ({ items, onSelect, selected }) => (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-xl z-50 max-h-72 overflow-y-auto mt-0.5 rounded-b-lg">
      {items.map((c, i) => (
        <div key={i} onClick={() => onSelect(`${c.city} (${c.code})`)}
          className={`flex items-center justify-between px-5 py-3.5 hover:bg-green-50 cursor-pointer border-b border-gray-50 transition-colors ${selected === `${c.city} (${c.code})` ? 'bg-green-50' : ''}`}>
          <div>
            <p className={`text-sm font-semibold ${selected === `${c.city} (${c.code})` ? 'text-accent' : 'text-primary'}`}>{c.city}</p>
            <p className="text-xs text-gray-400 mt-0.5">{c.airport}</p>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded ${selected === `${c.city} (${c.code})` ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500'}`}>{c.code}</span>
        </div>
      ))}
    </motion.div>
  );

  return (
    <MainLayout>
      <div className="min-h-screen pt-16" style={{ background: '#EEF5F0' }}>
        {/* Heading */}
        <div className="text-center py-14">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black text-primary" style={{ fontWeight: 900 }}>
            Book a flight
          </motion.h1>
        </div>

        {/* Form card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-20" ref={cardRef}>
          <div className="bg-white rounded-lg shadow-sm overflow-visible">

            {/* Trip type row */}
            <div className="px-8 pt-7 pb-5 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-8">
                {['Round trip', 'One way', 'Multi-city'].map(type => (
                  <label key={type} className="flex items-center gap-2.5 cursor-pointer">
                    <input type="radio" name="tripType" checked={tripType === type}
                      onChange={() => setTripType(type)} className="w-4 h-4 accent-accent" />
                    <span className="text-sm font-medium text-primary">{type}</span>
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm" />
                </div>
                <span className="text-sm text-accent font-medium">Book with Miles</span>
              </div>
            </div>

            <div className="px-8 py-6">
              {/* From / To */}
              <div className="flex items-stretch gap-0 mb-4">
                {/* FROM */}
                <div className="flex-1 relative">
                  <div onClick={() => { setShowFromDrop(true); setShowToDrop(false); setShowPassenger(false); }}
                    className="bg-gray-50 border border-gray-200 rounded-l-lg px-5 py-4 cursor-text h-full">
                    <p className="text-xs text-gray-400 mb-1">From</p>
                    <div className="flex items-center justify-between">
                      <input value={fromQuery} onChange={e => { setFromQuery(e.target.value); setShowFromDrop(true); }}
                        placeholder="City or airport"
                        className="bg-transparent text-lg font-bold text-primary focus:outline-none w-full placeholder:text-gray-300 placeholder:font-normal placeholder:text-base" />
                      <MdFlightTakeoff size={22} className={from ? 'text-accent' : 'text-gray-300'} />
                    </div>
                  </div>
                  <AnimatePresence>
                    {showFromDrop && <CityDropdown items={filteredFrom} selected={from}
                      onSelect={v => { setFrom(v); setFromQuery(v); setShowFromDrop(false); }} />}
                  </AnimatePresence>
                </div>

                {/* Swap */}
                <button onClick={handleSwap}
                  className="flex-shrink-0 w-12 bg-white border-t border-b border-gray-200 flex items-center justify-center text-gray-400 hover:text-accent transition-colors">
                  <MdSwapHoriz size={22} />
                </button>

                {/* TO */}
                <div className="flex-1 relative">
                  <div onClick={() => { setShowToDrop(true); setShowFromDrop(false); setShowPassenger(false); }}
                    className="bg-gray-50 border border-gray-200 rounded-r-lg px-5 py-4 cursor-text h-full">
                    <p className="text-xs text-gray-400 mb-1">To</p>
                    <div className="flex items-center justify-between">
                      <input value={toQuery} onChange={e => { setToQuery(e.target.value); setShowToDrop(true); }}
                        placeholder="To"
                        className="bg-transparent text-lg font-bold text-primary focus:outline-none w-full placeholder:text-gray-300 placeholder:font-normal placeholder:text-base" />
                      <MdFlightLand size={22} className={to ? 'text-gray-400' : 'text-gray-200'} />
                    </div>
                  </div>
                  <AnimatePresence>
                    {showToDrop && <CityDropdown items={filteredTo} selected={to}
                      onSelect={v => { setTo(v); setToQuery(v); setShowToDrop(false); }} />}
                  </AnimatePresence>
                </div>
              </div>

              {/* Dates + Passenger */}
              <div className="flex items-stretch gap-3 mb-6">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-5 py-4">
                  <p className="text-xs text-gray-400 mb-1">Departing</p>
                  <div className="flex items-center justify-between">
                    <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="bg-transparent text-base font-bold text-primary focus:outline-none" style={{ colorScheme: 'light' }} />
                    <MdCalendarToday size={18} className="text-accent" />
                  </div>
                </div>

                {tripType === 'Round trip' && (
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-5 py-4">
                    <p className="text-xs text-gray-400 mb-1">Returning</p>
                    <div className="flex items-center justify-between">
                      <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)}
                        min={departureDate || new Date().toISOString().split('T')[0]}
                        className="bg-transparent text-base font-bold text-primary focus:outline-none" style={{ colorScheme: 'light' }} />
                      <MdCalendarToday size={18} className="text-accent" />
                    </div>
                  </div>
                )}

                {/* Passenger */}
                <div className="flex-1 relative">
                  <div onClick={() => { setShowPassenger(!showPassenger); setShowFromDrop(false); setShowToDrop(false); }}
                    className={`bg-gray-50 border rounded-lg px-5 py-4 cursor-pointer transition-all ${showPassenger ? 'border-accent' : 'border-gray-200'}`}>
                    <p className="text-xs text-gray-400 mb-1">Passenger and class</p>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-primary">{passengerLabel()}</span>
                      <BsPeopleFill size={16} className="text-gray-400" />
                    </div>
                    <p className="text-xs text-accent mt-1 underline">Tell me more</p>
                  </div>

                  <AnimatePresence>
                    {showPassenger && (
                      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="absolute top-full right-0 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50 mt-1 p-5">
                        <p className="text-sm font-bold text-primary mb-4">Passengers</p>
                        {[
                          { key: 'adults', label: 'Adults', sub: '12 years and up' },
                          { key: 'children', label: 'Children', sub: 'Ages 2-11' },
                          { key: 'infants', label: 'Infants', sub: 'Under 2 years' },
                        ].map(({ key, label, sub }) => (
                          <div key={key} className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0">
                            <div>
                              <p className="text-sm font-medium text-primary">{label}</p>
                              <p className="text-xs text-gray-400">{sub}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button onClick={() => adjustPassenger(key, -1)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all font-bold text-lg">−</button>
                              <span className="text-sm font-bold text-primary w-4 text-center">{passengers[key]}</span>
                              <button onClick={() => adjustPassenger(key, 1)}
                                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-accent transition-all font-bold text-lg">+</button>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Promo + Search */}
              <div className="flex items-center justify-between pt-2 pb-2">
                <button className="flex items-center gap-1.5 text-sm text-accent font-medium hover:underline">
                  <span className="text-lg leading-none">⊕</span> Add a promo code
                </button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleSearch}
                  className="flex items-center gap-2 bg-accent text-white font-bold px-10 py-4 text-sm hover:bg-accent-light transition-all rounded">
                  <FiSearch size={16} /> Search Flights
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default BookFlightFormPage;
