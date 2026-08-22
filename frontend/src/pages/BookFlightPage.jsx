import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookingStepper from '../components/flights/BookingStepper';
import SeatMap from '../components/flights/SeatMap';
import { useAuth } from '../context/AuthContext';
import { formatTime, formatDate } from '../utils/formatters';
import { generateBoardingPass } from '../utils/boardingPass';
import api from '../api/axios';

const BookFlightPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingRef, setBookingRef] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [form, setForm] = useState({ passengerName: user?.name || '', passengerAge: '', passengerGender: 'male' });

  useEffect(() => {
    api.get(`/flights/${id}`)
      .then(({ data }) => setFlight(data.flight))
      .catch(() => setError('Flight not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const seatExtra = selectedSeat?.price || 0;

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setSubmitting(true);
    try {
      const { data } = await api.post('/bookings', { flightId: id, ...form, passengerAge: Number(form.passengerAge) });
      setBookingRef(data?.booking?._id || data?._id || null);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed.');
    } finally { setSubmitting(false); }
  };

  const handleDownloadPass = async () => {
    setDownloading(true);
    try {
      await generateBoardingPass({
        passengerName: form.passengerName,
        flight,
        seatId: selectedSeat?.id,
        bookingRef: bookingRef?.toString().slice(-8) || 'SJ' + Date.now().toString().slice(-6),
      });
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-gray-100 border-t-accent rounded-full animate-spin" />
    </div>
  );

  if (success) return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✓</span>
        </div>
        <h2 className="text-3xl font-bold text-primary mb-2">Booking Confirmed!</h2>
        <p className="text-gray-500 text-sm mb-1">Your flight has been successfully booked.</p>
        {selectedSeat && (
          <p className="text-sm text-gray-500 mb-1">Your selected seat: <span className="font-bold text-accent">{selectedSeat.id}</span></p>
        )}
        <p className="text-accent text-sm mb-8">Confirmation sent to <strong>{user?.email}</strong></p>
        <div className="flex flex-col gap-3">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleDownloadPass} disabled={downloading}
            className="w-full bg-primary text-white font-semibold py-3 text-sm hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-60">
            {downloading
              ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <>🎫 Download Boarding Pass</>}
          </motion.button>
          <button onClick={() => navigate('/my-bookings')} className="w-full bg-accent text-white font-semibold py-3 text-sm hover:bg-accent-light transition-all">
            View My Bookings →
          </button>
          <button onClick={() => navigate('/')} className="w-full border border-gray-200 text-gray-600 font-medium py-3 text-sm hover:bg-gray-50 transition-all">
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-bold text-primary">Sky<span className="text-accent">Journey</span></span>
          <BookingStepper currentStep={1} />
          <div />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-primary mb-6">Complete your booking</h1>

          {/* Flight summary */}
          {flight && (
            <div className="bg-white border border-gray-200 p-5 mb-5 rounded-sm">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-3">Flight Details</p>
              <div className="flex items-center gap-4 mb-3">
                <div>
                  <p className="text-2xl font-bold text-primary">{flight.source}</p>
                  <p className="text-xs text-gray-400">{formatTime(flight.departureTime)}</p>
                </div>
                <div className="flex-1 flex items-center gap-1">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-accent">✈</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{flight.destination}</p>
                  <p className="text-xs text-gray-400">{formatTime(flight.arrivalTime)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-400">{flight.airline} · {flight.flightNumber} · {formatDate(flight.departureTime)}</span>
                <span className="text-xl font-bold text-primary">₹{flight.price?.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Seat map */}
          <div className="mb-5">
            <SeatMap onSelect={setSelectedSeat} selectedSeat={selectedSeat?.id} />
            {selectedSeat && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 mt-3">
                <p className="text-sm text-primary">
                  Selected seat <span className="font-bold text-accent">{selectedSeat.id}</span>
                  {selectedSeat.price > 0 && <span className="text-gray-500"> (+₹{selectedSeat.price})</span>}
                </p>
                <button onClick={() => setSelectedSeat(null)} className="text-xs text-gray-400 hover:text-red-500">Clear</button>
              </motion.div>
            )}
          </div>

          {/* Passenger form */}
          <div className="bg-white border border-gray-200 p-5 rounded-sm">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-4">Passenger Details</p>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded mb-4">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Full Name</label>
                <input type="text" value={form.passengerName}
                  onChange={e => setForm({ ...form, passengerName: e.target.value })}
                  className="w-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-accent rounded" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Age</label>
                  <input type="number" min="1" max="120" placeholder="25" value={form.passengerAge}
                    onChange={e => setForm({ ...form, passengerAge: e.target.value })}
                    className="w-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-accent rounded" required />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Gender</label>
                  <select value={form.passengerGender} onChange={e => setForm({ ...form, passengerGender: e.target.value })}
                    className="w-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-accent rounded">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Payment placeholder */}
              <div className="bg-yellow-50 border border-yellow-200 px-4 py-3 rounded text-sm text-yellow-700">
                💳 Payment gateway integration ready — currently in demo mode.
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                type="submit" disabled={submitting}
                className="w-full bg-accent text-white font-bold py-4 text-sm hover:bg-accent-light transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : `Confirm Booking · ₹${(flight?.price + seatExtra)?.toLocaleString()}`}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookFlightPage;
