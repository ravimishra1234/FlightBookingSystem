import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import BookingCard from '../components/bookings/BookingCard';
import ConfirmModal from '../components/common/ConfirmModal';
import Toast from '../components/common/Toast';
import api from '../api/axios';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings/my-bookings');
      setBookings(data.bookings);
    } catch { setToast({ message: 'Failed to load bookings.', type: 'error' }); }
    finally { setLoading(false); }
  };

  const handleCancel = async () => {
    setCancelling(true);
    try {
      await api.put(`/bookings/${cancelTarget._id}/cancel`);
      setBookings(prev => prev.map(b => b._id === cancelTarget._id ? { ...b, bookingStatus: 'cancelled' } : b));
      setToast({ message: 'Booking cancelled successfully.', type: 'success' });
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Cancellation failed.', type: 'error' });
    } finally { setCancelling(false); setCancelTarget(null); }
  };

  const counts = {
    all: bookings.length,
    confirmed: bookings.filter(b => b.bookingStatus === 'confirmed').length,
    cancelled: bookings.filter(b => b.bookingStatus === 'cancelled').length,
  };
  const filtered = bookings.filter(b => filter === 'all' || b.bookingStatus === filter);

  return (
    <MainLayout>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <ConfirmModal
        isOpen={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancel}
        loading={cancelling}
        title="Cancel Booking"
        message={`Are you sure you want to cancel your booking for ${cancelTarget?.flightId?.flightNumber || 'this flight'}? This action cannot be undone.`}
        confirmText="Yes, Cancel Booking"
      />

      <div className="min-h-screen bg-gray-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

            {/* Page header */}
            <div className="py-8 border-b border-gray-200 mb-6">
              <h1 className="text-3xl font-bold text-primary">My Bookings</h1>
              <p className="text-gray-500 text-sm mt-1">Manage your flight reservations</p>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-0 border-b border-gray-200 mb-6">
              {[['all', 'All'], ['confirmed', 'Confirmed'], ['cancelled', 'Cancelled']].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setFilter(val)}
                  className={`pb-3 px-4 text-sm font-medium border-b-2 -mb-px transition-all ${
                    filter === val
                      ? 'border-accent text-accent'
                      : 'border-transparent text-gray-500 hover:text-primary'
                  }`}
                >
                  {label} ({counts[val]})
                </button>
              ))}
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-gray-100 border-t-accent rounded-full animate-spin" />
              </div>
            )}

            {/* Empty state */}
            {!loading && filtered.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
                <div className="text-5xl mb-4 opacity-30">🎫</div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {filter === 'all' ? 'No bookings yet' : `No ${filter} bookings`}
                </h3>
                <p className="text-gray-400 text-sm">
                  {filter === 'all' ? 'Start searching for flights to book your journey.' : 'Switch tabs to see other bookings.'}
                </p>
              </motion.div>
            )}

            {/* Booking cards */}
            {!loading && filtered.length > 0 && (
              <div className="space-y-4">
                {filtered.map((booking, i) => (
                  <BookingCard key={booking._id} booking={booking} index={i} onCancel={setCancelTarget} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyBookingsPage;
