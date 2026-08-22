import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import api from '../../api/axios';

const statusConfig = {
  confirmed: 'bg-green-50 text-green-600 border-green-100',
  cancelled: 'bg-red-50 text-red-500 border-red-100',
  pending: 'bg-yellow-50 text-yellow-600 border-yellow-100',
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/admin/bookings')
      .then(({ data }) => setBookings(data.bookings))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = bookings.filter(b => {
    const matchSearch = !search ||
      b.passengerName?.toLowerCase().includes(search.toLowerCase()) ||
      b.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.flightId?.flightNumber?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || b.bookingStatus === filter;
    return matchSearch && matchFilter;
  });

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-primary">All Bookings</h1>
          <p className="text-gray-400 text-sm">{bookings.length} bookings total</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <input type="text" placeholder="Search bookings..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-accent rounded w-64" />
          {['all','confirmed','cancelled','pending'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs font-medium rounded capitalize transition-all ${filter === f ? 'bg-accent text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-accent/40'}`}>
              {f} ({f === 'all' ? bookings.length : bookings.filter(b => b.bookingStatus === f).length})
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><div className="w-8 h-8 border-4 border-gray-100 border-t-accent rounded-full animate-spin" /></div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Booking ID','Passenger','User','Flight','Route','Amount','Date','Status'].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(b => (
                    <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs text-gray-400 font-mono">#{b._id?.toString().slice(-8).toUpperCase()}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-primary">{b.passengerName}</p>
                        <p className="text-xs text-gray-400">{b.passengerAge} / {b.passengerGender}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-600">{b.userId?.name || 'N/A'}</p>
                        <p className="text-xs text-gray-400">{b.userId?.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-mono text-gray-600">{b.flightId?.flightNumber || 'N/A'}</p>
                        <p className="text-xs text-gray-400">{b.flightId?.airline}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{b.flightId?.source} → {b.flightId?.destination}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-primary">₹{b.totalAmount?.toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {new Date(b.bookingDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusConfig[b.bookingStatus] || ''}`}>
                          {b.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={8} className="text-center text-gray-300 py-10 text-sm">No bookings found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;
