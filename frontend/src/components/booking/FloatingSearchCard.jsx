import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { MdFlightTakeoff, MdFlightLand, MdCalendarToday, MdSwapHoriz } from 'react-icons/md';
import { BsPeopleFill } from 'react-icons/bs';

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

const tabs = ['Book', 'Manage', 'Check-in', 'Flight status', 'Flight schedule'];

const FloatingSearchCard = () => {
  const [activeTab, setActiveTab] = useState('Book');
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
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('skyjourney_recent');
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

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
    const tempFrom = from; const tempFromQ = fromQuery;
    setFrom(to); setFromQuery(toQuery);
    setTo(tempFrom); setToQuery(tempFromQ);
  };

  const passengerLabel = () => {
    const total = passengers.adults + passengers.children + passengers.infants;
    return `${total} Passenger${total > 1 ? 's' : ''}, Economy`;
  };

  const handleSearch = () => {
    if (!from || !to || !departureDate) return;
    const fromCity = from.split(' (')[0];
    const toCity = to.split(' (')[0];
    const search = { from: fromCity, to: toCity, date: departureDate };
    const updated = [search, ...recentSearches.filter(r => r.from !== fromCity || r.to !== toCity)].slice(0, 3);
    setRecentSearches(updated);
    localStorage.setItem('skyjourney_recent', JSON.stringify(updated));
    const params = new URLSearchParams({ source: fromCity, destination: toCity, departureDate });
    navigate(`/search?${params.toString()}`);
  };

  const removeRecent = (i) => {
    const updated = recentSearches.filter((_, idx) => idx !== i);
    setRecentSearches(updated);
    localStorage.setItem('skyjourney_recent', JSON.stringify(updated));
  };

  const adjustPassenger = (type, delta) => {
    setPassengers(prev => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + delta)
    }));
  };

  return (
    <div className="relative z-20 mx-4 lg:mx-10 xl:mx-auto max-w-screen-xl -mt-20" ref={cardRef}>
      <div className="bg-white rounded-lg shadow-2xl overflow-visible">

        {/* Tabs row */}
        <div className="px-6 pt-1 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-0">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-4 text-sm font-medium border-b-2 transition-all -mb-px whitespace-nowrap ${
                  activeTab === tab ? 'border-accent text-primary font-bold' : 'border-transparent text-gray-500 hover:text-primary'
                }`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-5 pb-1">
            <button className="text-sm text-accent font-medium hover:underline whitespace-nowrap">Stopover &gt;</button>
            <button className="text-sm text-accent font-medium hover:underline">Hotels ↗</button>
            <button className="text-sm text-accent font-medium hover:underline">Cars ↗</button>
          </div>
        </div>

        {activeTab === 'Book' && (
          <div className="px-6 py-5">
            {/* Trip type */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-6">
                {['Round trip', 'One way', 'Multi-city'].map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="tripType" checked={tripType === type}
                      onChange={() => setTripType(type)} className="w-4 h-4 accent-accent" />
                    <span className="text-sm font-medium text-primary">{type}</span>
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm" />
                </div>
                <span className="text-sm text-accent font-medium">Book with Miles</span>
              </div>
            </div>

            {/* From / To */}
            <div className="flex items-stretch gap-0 mb-3 relative">
              {/* FROM */}
              <div className="flex-1 relative">
                <div
                  onClick={() => { setShowFromDrop(true); setShowToDrop(false); setShowPassenger(false); }}
                  className="bg-gray-50 border border-gray-200 rounded-l px-4 py-3 cursor-text"
                >
                  <p className="text-xs text-gray-400 mb-0.5">From</p>
                  <div className="flex items-center justify-between">
                    <input
                      value={fromQuery}
                      onChange={e => { setFromQuery(e.target.value); setShowFromDrop(true); }}
                      placeholder="City or airport"
                      className="bg-transparent text-base font-semibold text-primary focus:outline-none w-full placeholder:text-gray-300 placeholder:font-normal"
                    />
                    <MdFlightTakeoff size={20} className={from ? 'text-accent' : 'text-gray-300'} />
                  </div>
                </div>

                {/* From dropdown */}
                <AnimatePresence>
                  {showFromDrop && (
                    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b shadow-xl z-50 max-h-64 overflow-y-auto mt-0.5">
                      {filteredFrom.map((c, i) => (
                        <div key={i} onClick={() => { setFrom(`${c.city} (${c.code})`); setFromQuery(`${c.city} (${c.code})`); setShowFromDrop(false); }}
                          className={`flex items-center justify-between px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-50 ${from === `${c.city} (${c.code})` ? 'bg-green-50' : ''}`}>
                          <div>
                            <p className={`text-sm font-semibold ${from === `${c.city} (${c.code})` ? 'text-accent' : 'text-primary'}`}>{c.city}</p>
                            <p className="text-xs text-gray-400">{c.airport}</p>
                          </div>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${from === `${c.city} (${c.code})` ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500'}`}>{c.code}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Swap */}
              <button onClick={handleSwap}
                className="flex-shrink-0 w-10 bg-white border-t border-b border-gray-200 flex items-center justify-center text-gray-400 hover:text-accent transition-colors z-10">
                <MdSwapHoriz size={20} />
              </button>

              {/* TO */}
              <div className="flex-1 relative">
                <div onClick={() => { setShowToDrop(true); setShowFromDrop(false); setShowPassenger(false); }}
                  className="bg-gray-50 border border-gray-200 rounded-r px-4 py-3 cursor-text h-full">
                  <p className="text-xs text-gray-400 mb-0.5">To</p>
                  <div className="flex items-center justify-between">
                    <input value={toQuery} onChange={e => { setToQuery(e.target.value); setShowToDrop(true); }}
                      placeholder="City or airport"
                      className="bg-transparent text-base font-semibold text-primary focus:outline-none w-full placeholder:text-gray-300 placeholder:font-normal" />
                    <MdFlightLand size={20} className={to ? 'text-gray-400' : 'text-gray-200'} />
                  </div>
                </div>

                {/* To dropdown */}
                <AnimatePresence>
                  {showToDrop && (
                    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b shadow-xl z-50 max-h-64 overflow-y-auto mt-0.5">
                      {recentSearches.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-400 font-semibold px-4 py-2 bg-gray-50">Recent Airports</p>
                          {recentSearches.map((r, i) => {
                            const city = indianCities.find(c => c.city === r.to);
                            return city ? (
                              <div key={i} onClick={() => { setTo(`${city.city} (${city.code})`); setToQuery(`${city.city} (${city.code})`); setShowToDrop(false); }}
                                className="flex items-center justify-between px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-50 bg-green-50/40">
                                <div>
                                  <p className="text-sm font-semibold text-accent">{city.city}</p>
                                  <p className="text-xs text-gray-400">{city.airport}</p>
                                </div>
                                <span className="text-xs font-bold px-2 py-1 rounded bg-accent/10 text-accent">{city.code}</span>
                              </div>
                            ) : null;
                          })}
                          <p className="text-xs text-gray-400 font-semibold px-4 py-2 bg-gray-50">All Destinations</p>
                        </div>
                      )}
                      {filteredTo.map((c, i) => (
                        <div key={i} onClick={() => { setTo(`${c.city} (${c.code})`); setToQuery(`${c.city} (${c.code})`); setShowToDrop(false); }}
                          className="flex items-center justify-between px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-50">
                          <div>
                            <p className="text-sm font-semibold text-primary">{c.city}</p>
                            <p className="text-xs text-gray-400">{c.airport}</p>
                          </div>
                          <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-500">{c.code}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Dates + Passenger */}
            <div className="flex items-stretch gap-3 mb-4">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded px-4 py-3">
                <p className="text-xs text-gray-400 mb-0.5">Departing</p>
                <div className="flex items-center justify-between">
                  <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="bg-transparent text-sm font-semibold text-primary focus:outline-none" style={{ colorScheme: 'light' }} />
                  <MdCalendarToday size={16} className="text-accent" />
                </div>
              </div>

              {tripType === 'Round trip' && (
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded px-4 py-3">
                  <p className="text-xs text-gray-400 mb-0.5">Returning</p>
                  <div className="flex items-center justify-between">
                    <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)}
                      min={departureDate || new Date().toISOString().split('T')[0]}
                      className="bg-transparent text-sm font-semibold text-primary focus:outline-none" style={{ colorScheme: 'light' }} />
                    <MdCalendarToday size={16} className="text-accent" />
                  </div>
                </div>
              )}

              {/* Passenger dropdown */}
              <div className="flex-1 relative">
                <div onClick={() => { setShowPassenger(!showPassenger); setShowFromDrop(false); setShowToDrop(false); }}
                  className={`bg-gray-50 border rounded px-4 py-3 cursor-pointer transition-all ${showPassenger ? 'border-accent' : 'border-gray-200'}`}>
                  <p className="text-xs text-gray-400 mb-0.5">Passenger and class</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">{passengerLabel()}</span>
                    <BsPeopleFill size={14} className="text-gray-400" />
                  </div>
                  <p className="text-xs text-accent mt-0.5 underline cursor-pointer">Tell me more</p>
                </div>

                <AnimatePresence>
                  {showPassenger && (
                    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="absolute top-full right-0 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50 mt-1 p-5">
                      <p className="text-sm font-semibold text-primary mb-4">Passengers</p>
                      {[
                        { key: 'adults', label: 'Adults', sub: '12 years and up' },
                        { key: 'children', label: 'Children', sub: 'Ages 2-11' },
                        { key: 'infants', label: 'Infants', sub: 'Under 2 years' },
                      ].map(({ key, label, sub }) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                          <div>
                            <p className="text-sm font-medium text-primary">{label}</p>
                            <p className="text-xs text-gray-400">{sub}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button onClick={() => adjustPassenger(key, -1)}
                              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all text-lg font-bold">−</button>
                            <span className="text-sm font-bold text-primary w-4 text-center">{passengers[key]}</span>
                            <button onClick={() => adjustPassenger(key, 1)}
                              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-accent transition-all text-lg font-bold">+</button>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-primary mb-2">Recent searches</p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((r, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-green-50 border border-green-100 text-accent text-sm px-3 py-1.5 rounded-full">
                      <span>{r.from} → {r.to} · {r.date}</span>
                      <button onClick={() => removeRecent(i)} className="text-accent/60 hover:text-accent ml-1">
                        <FiX size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Promo + Search */}
            <div className="flex items-center justify-between pt-1">
              <button className="flex items-center gap-1.5 text-sm text-accent font-medium hover:underline">
                <span className="text-lg leading-none">⊕</span> Add a promo code
              </button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSearch}
                className="flex items-center gap-2 bg-accent text-white font-bold px-8 py-3 text-sm hover:bg-accent-light transition-all rounded-sm">
                <FiSearch size={15} /> Search Flights
              </motion.button>
            </div>
          </div>
        )}

        {activeTab !== 'Book' && (
          <div className="px-6 py-10 text-center text-gray-400 text-sm">{activeTab} — coming soon</div>
        )}

        {/* Blue travel info banner */}
        <div className="bg-blue-600 px-6 py-3 flex items-center justify-between rounded-b-lg">
          <div className="flex items-center gap-2 text-sm text-white">
            <span className="w-5 h-5 rounded-full border border-white/60 flex items-center justify-center text-xs flex-shrink-0">i</span>
            <span>Read more about the latest travel requirements for your next destination</span>
          </div>
          <button className="text-sm text-white font-medium hover:underline whitespace-nowrap ml-4">Learn more →</button>
        </div>
      </div>
    </div>
  );
};

export default FloatingSearchCard;
