import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';

const supportCards = [
  { icon: '👤', title: 'Manage Booking', desc: 'Modify your trip, select seats, and submit special requests.', to: '/my-bookings' },
  { icon: '✅', title: 'Online Check-in', desc: 'Access your booking to check-in online and update flight details.', to: '#' },
  { icon: '🏛', title: 'Contact Us', desc: 'Reach our support team via phone, email, or live chat.', to: '#' },
  { icon: '🔄', title: 'Report Lost or Mishandled Baggage', desc: 'Access your booking to report baggage issues and manage flights.', to: '#' },
  { icon: '💳', title: 'Refunds', desc: 'Submit a refund request for your cancelled or changed booking.', to: '#' },
  { icon: '📋', title: 'FAQ', desc: 'Find answers to frequently asked questions about travel.', to: '/faq' },
  { icon: '🧳', title: 'Baggage Policy', desc: 'Learn about our baggage allowance, fees, and restrictions.', to: '#' },
  { icon: '♿', title: 'Special Assistance', desc: 'Request special assistance for passengers with disabilities.', to: '#' },
];

const SupportPage = () => (
  <MainLayout>
    <div className="min-h-screen bg-white pt-16">
      {/* Breadcrumb */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-accent transition-colors">SkyJourney</Link>
          <span>›</span>
          <span className="text-primary">Help & Support</span>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 pb-12 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-primary mb-8">
          Help & Support
        </motion.h1>

        {/* Search bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-5 py-4">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm flex-shrink-0">✈</div>
            <input type="text" placeholder="Find Help: Chat or Search with AI"
              className="flex-1 bg-transparent text-sm text-primary focus:outline-none placeholder:text-gray-400" />
            <span className="text-gray-400">🔍</span>
          </div>
        </motion.div>
      </div>

      {/* Cards grid */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {supportCards.map((card, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Link to={card.to}
                className="block border border-gray-200 rounded-lg p-6 hover:border-accent/30 hover:shadow-md transition-all duration-300 h-full group">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl mb-4 group-hover:bg-accent/10 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-primary mb-2 leading-snug">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{card.desc}</p>
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white ml-auto group-hover:bg-accent-light transition-all">
                  →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </MainLayout>
);

export default SupportPage;
