import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookingStepper from '../components/flights/BookingStepper';
import FlightCard from '../components/flights/FlightCard';
import FareAlertCard from '../components/flights/FareAlertCard';
import api from '../api/axios';

const NoFlights = ({ source, destination, onEdit }) => (
  <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
    {/* Illustration SVG */}
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mb-6 opacity-30">
      <circle cx="60" cy="60" r="58" stroke="#1D6B43" strokeWidth="2" strokeDasharray="8 4"/>
      <text x="60" y="68" textAnchor="middle" fontSize="40">✈</text>
    </svg>
    <h3 className="text-xl font-bold text-primary mb-2">
      No flights found from {source} → {destination}
    </h3>
    <p className="text-gray-500 text-sm mb-6">
      Select alternative dates or{' '}
      <button onClick={onEdit} className="text-accent underline font-medium">edit search</button>
      {' '}and try again.
    </p>
    <button
      onClick={onEdit}
      className="bg-accent text-white font-semibold px-8 py-3 text-sm hover:bg-accent-light transition-all"
    >
      Edit Search
    </button>
  </div>
);

const SkeletonCard = () => (
  <div className="bg-white border border-gray-200 p-5 animate-pulse rounded-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-gray-200 rounded" />
        <div className="flex items-center gap-4">
          <div className="space-y-2">
            <div className="w-20 h-6 bg-gray-200 rounded" />
            <div className="w-14 h-3 bg-gray-100 rounded" />
          </div>
          <div className="w-24 h-8 bg-gray-100 rounded" />
          <div className="space-y-2">
            <div className="w-20 h-6 bg-gray-200 rounded" />
            <div className="w-14 h-3 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
      <div className="space-y-2 text-right">
        <div className="w-24 h-8 bg-gray-200 rounded ml-auto" />
        <div className="w-20 h-9 bg-gray-100 rounded ml-auto" />
      </div>
    </div>
  </div>
);

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const source = searchParams.get('source') || '';
  const destination = searchParams.get('destination') || '';
  const departureDate = searchParams.get('departureDate') || '';

  useEffect(() => {
    if (source && destination && departureDate) fetchFlights();
  }, [source, destination, departureDate]);

  const fetchFlights = async () => {
    setLoading(true); setError('');
    try {
      const { data } = await api.get('/flights/search', { params: { source, destination, departureDate } });
      setFlights(data.flights);
      setSearched(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed.');
    } finally { setLoading(false); }
  };

  const handleEdit = () => navigate('/');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stepper header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-primary">✈</span>
            <span className="font-bold text-primary">Sky<span className="text-accent">Journey</span></span>
          </div>
          <BookingStepper currentStep={0} />
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className="bg-accent text-white text-sm font-semibold px-4 py-2 hover:bg-accent-light transition-all"
            >
              Edit search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        {/* Results header */}
        {searched && !loading && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary">
              {source} → {destination}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {new Date(departureDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              {' · '}{flights.length} flight{flights.length !== 1 ? 's' : ''} found
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-16">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {/* No results */}
        {searched && !loading && !error && flights.length === 0 && (
          <NoFlights source={source} destination={destination} onEdit={handleEdit} />
        )}

        {/* Flights */}
        {!loading && flights.length > 0 && (
          <div className="space-y-3">
            <FareAlertCard
              source={source}
              destination={destination}
              departureDate={departureDate}
              currentPrice={Math.min(...flights.map(f => f.price))}
            />
            {flights.map((flight, i) => (
              <FlightCard key={flight._id} flight={flight} index={i} />
            ))}
          </div>
        )}

        {/* Idle */}
        {!searched && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="text-5xl mb-4 opacity-30">✈</div>
            <p className="text-gray-400 text-sm">Enter your search details to find available flights</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
