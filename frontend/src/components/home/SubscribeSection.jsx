import { useState } from 'react';
import { motion } from 'framer-motion';

const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail('');
  };

  return (
    <section className="py-12 px-6 lg:px-10 bg-white border-t border-gray-100">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-primary">Subscribe, be inspired, travel</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-sm">
              Subscribe to our newsletter to receive exclusive information about new destinations and offers.
            </p>
          </div>

          {done ? (
            <p className="text-accent font-semibold text-sm">✓ Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-0 w-full lg:w-auto lg:min-w-[460px]">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-primary focus:outline-none focus:border-accent"
                required
              />
              <button
                type="submit"
                className="bg-accent text-white font-semibold px-6 py-3 text-sm hover:bg-accent-light transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SubscribeSection;
