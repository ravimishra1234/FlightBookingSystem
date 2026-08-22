import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const destinations = [
  { city: 'Goa', price: '₹4,299', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80', dest: 'Goa' },
  { city: 'Kashmir', price: '₹6,199', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80', dest: 'Srinagar' },
  { city: 'Jaipur', price: '₹3,899', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&q=80', dest: 'Jaipur' },
  { city: 'Kerala', price: '₹2,799', image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=500&q=80', dest: 'Kochi' },
  { city: 'Andaman', price: '₹8,499', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80', dest: 'Port Blair' },
  { city: 'London', price: '₹42,999', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&q=80', dest: 'London' },
  { city: 'Dubai', price: '₹18,499', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80', dest: 'Dubai' },
];

const BestFaresSection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const handleClick = (dest) => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    const params = new URLSearchParams({ source: 'Bengaluru', destination: dest, departureDate: today.toISOString().split('T')[0] });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="py-14 px-6 lg:px-10" style={{ background: '#0D1F1A' }}>
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Best fares from Bengaluru</h2>
            <p className="text-white/40 text-sm mt-1">Fares include taxes</p>
          </div>
          <button className="text-sm font-medium whitespace-nowrap" style={{ color: '#4ade80' }}>
            Explore all destinations →
          </button>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex-shrink-0 cursor-pointer group"
              style={{ width: '240px' }}
            >
              {/* Image */}
              <div className="overflow-hidden rounded-lg" style={{ height: '300px' }}>
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Info below card */}
              <div className="mt-3">
                <button
                  onClick={() => handleClick(dest.dest)}
                  className="block text-white font-bold text-lg hover:underline text-left"
                >
                  {dest.city}
                </button>
                <button
                  onClick={() => handleClick(dest.dest)}
                  className="block font-bold text-base hover:underline text-left mt-0.5"
                  style={{ color: '#4ade80' }}
                >
                  From {dest.price}
                </button>
                <p className="text-white/40 text-xs mt-0.5">Round trip From Bengaluru</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
};

export default BestFaresSection;
