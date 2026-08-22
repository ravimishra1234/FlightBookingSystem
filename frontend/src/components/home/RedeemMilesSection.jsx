import { motion } from 'framer-motion';

const categories = [
  { label: 'Electronics', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80' },
  { label: 'Jewelry', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80' },
  { label: 'Home & Appliances', img: '' },
  { label: 'Gift Cards & more', img: '' },
];

const RedeemMilesSection = () => (
  <section className="py-6 px-6 lg:px-10" style={{ background: '#0D1F1A' }}>
    <div className="max-w-screen-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-lg"
        style={{ minHeight: '320px' }}
      >
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=1400&q=80"
          alt="Redeem Miles"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(13,20,30,0.92) 0%, rgba(13,20,30,0.75) 45%, rgba(13,20,30,0.2) 100%)'
        }} />

        {/* Content */}
        <div className="relative z-10 flex items-center h-full p-10" style={{ minHeight: '320px' }}>
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-white mb-6">Redeem with Miles</h2>
            <button className="flex items-center gap-3 bg-primary text-white font-semibold px-6 py-3 hover:bg-black transition-all">
              Bengaluru Store →
            </button>
          </div>

          {/* Category cards floating */}
          <div className="grid grid-cols-2 gap-3 mr-16" style={{ width: '280px' }}>
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="relative overflow-hidden cursor-pointer group"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  padding: '12px',
                  height: '100px',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-xs font-medium">{cat.label}</span>
                  <span className="text-white text-xs">→</span>
                </div>
                {cat.img && (
                  <img src={cat.img} alt={cat.label}
                    className="w-12 h-12 object-contain mx-auto mt-1" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default RedeemMilesSection;
