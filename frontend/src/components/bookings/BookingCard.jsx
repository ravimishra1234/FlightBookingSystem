import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatTime, formatDate } from '../../utils/formatters';
import { generateBoardingPass } from '../../utils/boardingPass';

const statusConfig = {
  confirmed: { cls: 'bg-green-50 text-green-700 border-green-200', label: 'Confirmed' },
  cancelled: { cls: 'bg-red-50 text-red-600 border-red-200', label: 'Cancelled' },
  pending: { cls: 'bg-yellow-50 text-yellow-700 border-yellow-200', label: 'Pending' },
};

const BookingCard = ({ booking, onCancel, index = 0 }) => {
  const { flightId: flight, passengerName, passengerAge, passengerGender, bookingStatus, bookingDate, totalAmount, seatNumber, _id } = booking;
  if (!flight) return null;
  const status = statusConfig[bookingStatus] || statusConfig.pending;
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await generateBoardingPass({
        passengerName,
        flight,
        seatId: seatNumber,
        bookingRef: _id?.toString().slice(-8),
      });
    } finally { setDownloading(false); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-white border border-gray-200 rounded-sm hover:border-accent/30 hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent/10 flex items-center justify-center text-accent font-bold text-sm rounded">
            {flight.airline?.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">{flight.airline}</p>
            <p className="text-xs text-gray-400 font-mono">{flight.flightNumber}</p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${status.cls}`}>
          {status.label}
        </span>
      </div>

      <div className="p-5">
        {/* Route */}
        <div className="flex items-center gap-4 mb-4">
          <div>
            <p className="text-xl font-bold text-primary">{flight.source}</p>
            <p className="text-xs text-gray-400 mt-0.5">{formatTime(flight.departureTime)}</p>
          </div>
          <div className="flex-1 flex items-center gap-1">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-accent text-sm">✈</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-primary">{flight.destination}</p>
            <p className="text-xs text-gray-400 mt-0.5">{formatTime(flight.arrivalTime)}</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-t border-b border-gray-100 mb-4">
          {[
            ['Passenger', passengerName],
            ['Age / Gender', `${passengerAge} / ${passengerGender}`],
            ['Seat', seatNumber || 'TBA'],
            ['Amount', `₹${totalAmount?.toLocaleString()}`],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs text-gray-400 mb-0.5">{label}</p>
              <p className="text-sm font-semibold text-primary">{value}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Booking ref</p>
            <p className="text-xs font-mono text-gray-500">{_id?.toString().slice(-10).toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs text-gray-400 hidden sm:block">
              Booked {formatDate(bookingDate)}
            </p>
            {bookingStatus === 'confirmed' && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  disabled={downloading}
                  className="text-xs text-accent border border-accent/30 hover:bg-accent/5 px-4 py-2 rounded transition-all font-medium disabled:opacity-50"
                >
                  {downloading ? '...' : '🎫 Pass'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onCancel(booking)}
                  className="text-xs text-red-500 border border-red-200 hover:bg-red-50 px-4 py-2 rounded transition-all font-medium"
                >
                  Cancel booking
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;
