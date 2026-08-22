import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../layouts/AdminLayout';
import Toast from '../../components/common/Toast';
import ConfirmModal from '../../components/common/ConfirmModal';
import api from '../../api/axios';

const defaultForm = { airline:'', flightNumber:'', source:'', destination:'', departureTime:'', arrivalTime:'', price:'', totalSeats:'' };

const FlightModal = ({ isOpen, onClose, onSave, editFlight }) => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editFlight) {
      setForm({ ...editFlight,
        departureTime: new Date(editFlight.departureTime).toISOString().slice(0,16),
        arrivalTime: new Date(editFlight.arrivalTime).toISOString().slice(0,16),
      });
    } else { setForm(defaultForm); }
    setError('');
  }, [editFlight, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try { await onSave(form); onClose(); }
    catch (err) { setError(err.response?.data?.message || 'Failed to save.'); }
    finally { setLoading(false); }
  };

  const fields = [
    { key:'airline', label:'Airline Name', type:'text', placeholder:'IndiGo' },
    { key:'flightNumber', label:'Flight Number', type:'text', placeholder:'6E-201' },
    { key:'source', label:'Source City', type:'text', placeholder:'Mumbai' },
    { key:'destination', label:'Destination City', type:'text', placeholder:'Delhi' },
    { key:'departureTime', label:'Departure Time', type:'datetime-local', placeholder:'' },
    { key:'arrivalTime', label:'Arrival Time', type:'datetime-local', placeholder:'' },
    { key:'price', label:'Price (₹)', type:'number', placeholder:'4999' },
    { key:'totalSeats', label:'Total Seats', type:'number', placeholder:'180' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={onClose}>
          <motion.div initial={{ scale:0.95, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.95, opacity:0 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-primary">{editFlight ? 'Edit Flight' : 'Add New Flight'}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-primary text-xl">&times;</button>
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {fields.map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs text-gray-500 mb-1">{label}</label>
                    <input type={type} placeholder={placeholder} value={form[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      className="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:border-accent rounded" required />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm rounded hover:bg-gray-50 transition-all">Cancel</button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-2.5 bg-accent text-white text-sm font-semibold rounded hover:bg-accent-light transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (editFlight ? 'Update' : 'Add Flight')}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editFlight, setEditFlight] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchFlights(); }, []);

  const fetchFlights = async () => {
    try { const { data } = await api.get('/flights'); setFlights(data.flights); }
    catch { setToast({ message:'Failed to load flights.', type:'error' }); }
    finally { setLoading(false); }
  };

  const handleSave = async (form) => {
    if (editFlight) {
      const { data } = await api.put(`/flights/${editFlight._id}`, form);
      setFlights(prev => prev.map(f => f._id === editFlight._id ? data.flight : f));
      setToast({ message:'Flight updated!', type:'success' });
    } else {
      const { data } = await api.post('/flights', form);
      setFlights(prev => [...prev, data.flight]);
      setToast({ message:'Flight added!', type:'success' });
    }
    setEditFlight(null);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/flights/${deleteTarget._id}`);
      setFlights(prev => prev.filter(f => f._id !== deleteTarget._id));
      setToast({ message:'Flight deleted.', type:'success' });
    } catch { setToast({ message:'Delete failed.', type:'error' }); }
    finally { setDeleting(false); setDeleteTarget(null); }
  };

  const filtered = flights.filter(f => !search ||
    f.airline?.toLowerCase().includes(search.toLowerCase()) ||
    f.flightNumber?.toLowerCase().includes(search.toLowerCase()) ||
    f.source?.toLowerCase().includes(search.toLowerCase()) ||
    f.destination?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <FlightModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditFlight(null); }} onSave={handleSave} editFlight={editFlight} />
      <ConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} loading={deleting}
        title="Delete Flight" message={`Delete ${deleteTarget?.flightNumber}? This is permanent.`} confirmText="Delete" />

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Flights</h1>
            <p className="text-gray-400 text-sm">{flights.length} flights total</p>
          </div>
          <button onClick={() => { setEditFlight(null); setModalOpen(true); }}
            className="bg-accent text-white font-semibold text-sm px-5 py-2.5 rounded hover:bg-accent-light transition-all">
            + Add Flight
          </button>
        </div>

        <input type="text" placeholder="Search flights..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-accent rounded w-64" />

        {loading ? (
          <div className="flex justify-center py-16"><div className="w-8 h-8 border-4 border-gray-100 border-t-accent rounded-full animate-spin" /></div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Airline','Flight No.','Route','Departure','Price','Seats','Status','Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(flight => (
                  <tr key={flight._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">{flight.airline?.charAt(0)}</div>
                        <span className="text-sm font-medium text-primary">{flight.airline}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono">{flight.flightNumber}</td>
                    <td className="px-4 py-3 text-sm text-primary">{flight.source} → {flight.destination}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {new Date(flight.departureTime).toLocaleDateString('en-IN',{day:'numeric',month:'short'})} {new Date(flight.departureTime).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-primary">₹{flight.price?.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{flight.availableSeats}/{flight.totalSeats}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${flight.status === 'scheduled' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                        {flight.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => { setEditFlight(flight); setModalOpen(true); }}
                          className="text-xs text-blue-500 border border-blue-100 hover:bg-blue-50 px-2.5 py-1.5 rounded transition-all">Edit</button>
                        <button onClick={() => setDeleteTarget(flight)}
                          className="text-xs text-red-500 border border-red-100 hover:bg-red-50 px-2.5 py-1.5 rounded transition-all">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="text-center text-gray-300 py-10 text-sm">No flights found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminFlights;
