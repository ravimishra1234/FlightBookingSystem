import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ compact = false, initialValues = {} }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    source: initialValues.source || '',
    destination: initialValues.destination || '',
    departureDate: initialValues.departureDate || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.source || !form.destination || !form.departureDate) return;
    navigate(`/search?${new URLSearchParams(form).toString()}`);
  };

  const inputCls = `w-full border-0 border-b text-white placeholder-white/25 bg-transparent px-0 py-2.5 text-sm tracking-wide focus:outline-none transition-all duration-300`;

  return (
    <form onSubmit={handleSubmit} className={compact ? 'flex flex-wrap gap-4 items-end' : 'grid grid-cols-1 md:grid-cols-4 gap-6 items-end'}>
      
      <div className={`relative group ${compact ? 'flex-1 min-w-[130px]' : ''}`}>
        {!compact && <label className="block text-accent text-[10px] uppercase tracking-[0.3em] mb-3 font-medium">From</label>}
        <div className="flex items-center gap-3">
          <span className="text-accent/60 text-sm">✈</span>
          <input
            type="text"
            placeholder="Departure city"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            className={inputCls}
            style={{ borderBottomColor: 'rgba(201,168,76,0.2)' }}
            onFocus={e => e.target.style.borderBottomColor = '#C9A84C'}
            onBlur={e => e.target.style.borderBottomColor = 'rgba(201,168,76,0.2)'}
            required
          />
        </div>
      </div>

      <div className={`relative group ${compact ? 'flex-1 min-w-[130px]' : ''}`}>
        {!compact && <label className="block text-accent text-[10px] uppercase tracking-[0.3em] mb-3 font-medium">To</label>}
        <div className="flex items-center gap-3">
          <span className="text-accent/60 text-sm">📍</span>
          <input
            type="text"
            placeholder="Destination city"
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            className={inputCls}
            style={{ borderBottomColor: 'rgba(201,168,76,0.2)' }}
            onFocus={e => e.target.style.borderBottomColor = '#C9A84C'}
            onBlur={e => e.target.style.borderBottomColor = 'rgba(201,168,76,0.2)'}
            required
          />
        </div>
      </div>

      <div className={`relative group ${compact ? 'flex-1 min-w-[130px]' : ''}`}>
        {!compact && <label className="block text-accent text-[10px] uppercase tracking-[0.3em] mb-3 font-medium">Date</label>}
        <div className="flex items-center gap-3">
          <span className="text-accent/60 text-sm">📅</span>
          <input
            type="date"
            value={form.departureDate}
            onChange={(e) => setForm({ ...form, departureDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className={`${inputCls} text-white/60`}
            style={{ borderBottomColor: 'rgba(201,168,76,0.2)', colorScheme: 'dark' }}
            onFocus={e => e.target.style.borderBottomColor = '#C9A84C'}
            onBlur={e => e.target.style.borderBottomColor = 'rgba(201,168,76,0.2)'}
            required
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(201,168,76,0.3)' }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        className="font-semibold tracking-widest uppercase transition-all duration-300 text-primary text-xs"
        style={{
          background: 'linear-gradient(135deg, #C9A84C, #F0C040)',
          padding: compact ? '10px 20px' : '14px 28px',
          clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
        }}
      >
        {compact ? '🔍' : 'Search Flights →'}
      </motion.button>
    </form>
  );
};

export default SearchForm;
