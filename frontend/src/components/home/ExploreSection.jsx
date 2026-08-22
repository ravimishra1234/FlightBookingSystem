import { motion } from 'framer-motion';

const ExploreSection = () => (
  <section className="px-6 lg:px-10 py-6 bg-white">
    <div className="max-w-screen-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-sm"
        style={{ minHeight: 300 }}
      >
        <div className="grid grid-cols-2 h-full" style={{ minHeight: 300 }}>
          {/* Left — green content */}
          <div
            className="flex flex-col justify-between p-10"
            style={{ background: '#1D6B43' }}
          >
            <div>
              <h2 className="text-3xl font-bold text-white leading-snug mb-3">
                The best that India<br />has to offer
              </h2>
              <p className="text-white/70 text-sm">Explore our curated travel calendar</p>
            </div>
            <button className="flex items-center gap-3 bg-primary text-white font-semibold px-6 py-3 w-fit hover:bg-primary-2 transition-all mt-6">
              Explore →
            </button>
          </div>

          {/* Right — image */}
          <div className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80"
              alt="India destinations"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ExploreSection;
