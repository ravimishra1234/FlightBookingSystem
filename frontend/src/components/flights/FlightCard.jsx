import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { formatTime, formatDuration, formatDate } from '../../utils/formatters';

const FlightCard = ({ flight, index = 0 }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleBook = () => {
    if (!isAuthenticated) return navigate('/login');
    navigate(`/book/${flight._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-white border border-gray-200 rounded-sm hover:border-accent/40 hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-center justify-between">
          {/* Left — airline + route */}
          <div className="flex items-center gap-6">
            {/* Airline badge */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded bg-accent/10 flex items-center justify-center text-accent font-black text-xl">
                {flight.airline?.charAt(0)}
              </div>
              <p className="text-xs text-gray-400 text-center mt-1 font-mono">{flight.flightNumber}</p>
            </div>

            {/* Route */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{formatTime(flight.departureTime)}</p>
                <p className="text-sm font-semibold text-accent mt-0.5">{flight.source}</p>
              </div>

              <div className="flex flex-col items-center gap-1 min-w-[100px]">
                <p className="text-xs text-gray-400">{formatDuration(flight.departureTime, flight.arrivalTime)}</p>
                <div className="flex items-center w-full gap-1">
                  <div className="flex-1 h-px bg-gray-300" />
                  <span className="text-accent text-sm">✈</span>
                  <div className="flex-1 h-px bg-gray-300" />
                </div>
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Non-stop</span>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{formatTime(flight.arrivalTime)}</p>
                <p className="text-sm font-semibold text-accent mt-0.5">{flight.destination}</p>
              </div>
            </div>

            {/* Date + seats */}
            <div className="hidden lg:block ml-4">
              <p className="text-xs text-gray-400">{formatDate(flight.departureTime)}</p>
              <p className={`text-xs mt-1 font-medium ${flight.availableSeats < 10 ? 'text-red-500' : 'text-gray-400'}`}>
                {flight.availableSeats} seats left
              </p>
            </div>
          </div>

          {/* Right — price + button */}
          <div className="text-right flex-shrink-0 ml-6">
            <p className="text-xs text-gray-400 mb-0.5">From</p>
            <p className="text-2xl font-bold text-primary">₹{flight.price?.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mb-3">per person</p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBook}
              disabled={flight.availableSeats === 0}
              className="bg-accent text-white font-semibold px-6 py-2.5 text-sm hover:bg-accent-light transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {flight.availableSeats === 0 ? 'Sold out' : 'Select →'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-400">
        <span>✈ {flight.airline}</span>
        <span>·</span>
        <span>Economy Class</span>
        <span>·</span>
        <span>Carry-on included</span>
      </div>
    </motion.div>
  );
};

export default FlightCard;
