import { motion } from 'framer-motion';

const PlanTripSection = () => (
  <section className="py-14 px-6 lg:px-10" style={{ background: '#0D1F1A' }}>
    <div className="max-w-screen-2xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8">Plan your next trip</h2>

      <div className="grid grid-cols-3 gap-3" style={{ height: '480px' }}>
        {/* Large card — luxury cabin girls sipping wine */}
        <motion.div whileHover={{ scale: 1.01 }} className="col-span-2 relative overflow-hidden rounded-lg cursor-pointer group">
          <img
            src="https://images.unsplash.com/photo-1540339832862-474599807836?w=900&q=80"
            alt="Business Class Upgrade"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white font-bold text-2xl mb-2 group-hover:underline">Let's get you upgraded</h3>
            <p className="text-white/75 text-sm max-w-md leading-relaxed">Here's your chance to upgrade to a higher class. Place a bid and experience the best in comfort, services, and entertainment.</p>
            <button className="mt-4 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white text-xl hover:bg-accent-light transition-all">→</button>
          </div>
        </motion.div>

        {/* Right column */}
        <div className="flex flex-col gap-3">
          <motion.div whileHover={{ scale: 1.01 }} className="flex-1 relative overflow-hidden rounded-lg cursor-pointer group">
            <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&q=80"
              alt="Hot Deals" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
              <h3 className="text-white font-bold text-xl group-hover:underline">Hot deals</h3>
              <button className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white flex-shrink-0">→</button>
            </div>
          </motion.div>

          <div className="flex gap-3" style={{ height: '45%' }}>
            {[
              { title: 'Travel insurance', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&q=80' },
              { title: 'Flight Pass', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&q=80' },
            ].map(card => (
              <motion.div key={card.title} whileHover={{ scale: 1.02 }}
                className="flex-1 relative overflow-hidden rounded-lg cursor-pointer group">
                <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
                  <h3 className="text-white font-bold text-sm leading-tight group-hover:underline">{card.title}</h3>
                  <button className="w-7 h-7 rounded-full bg-accent flex-shrink-0 flex items-center justify-center text-white text-xs">→</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PlanTripSection;
