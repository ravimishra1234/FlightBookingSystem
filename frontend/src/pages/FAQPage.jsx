import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { FiChevronDown, FiSearch } from 'react-icons/fi';

const faqData = {
  Booking: [
    { q: 'How do I book a flight on SkyJourney?', a: 'Search for your desired route on our homepage, select your preferred flight, fill in passenger details, and confirm your booking. You will receive a confirmation email instantly.' },
    { q: 'Can I book a flight for someone else?', a: 'Yes, you can book flights for other passengers. Simply enter their details in the passenger information section during booking.' },
    { q: 'What payment methods are accepted?', a: 'We accept all major credit/debit cards, UPI, net banking, and wallet payments. Payment gateway integration is currently in demo mode.' },
    { q: 'How far in advance can I book a flight?', a: 'You can book flights up to 365 days in advance on SkyJourney.' },
  ],
  Payment: [
    { q: 'Is my payment information secure?', a: 'Yes, all payment transactions are secured with bank-grade SSL encryption. We never store your card details.' },
    { q: 'When will I be charged for my booking?', a: 'Your payment is processed immediately upon booking confirmation.' },
    { q: 'What currencies are accepted?', a: 'We accept INR (Indian Rupees) as our primary currency. International cards are also accepted.' },
  ],
  'Stopover Visa': [
    { q: 'What are the benefits of a stopover program?', a: 'A stopover allows you to spend time in a transit city at no extra airfare cost, letting you explore an additional destination on your journey.' },
    { q: 'How can I book a stopover on my trip?', a: 'During the flight search, select the multi-city option and add your stopover destination as an intermediate stop.' },
  ],
  Seats: [
    { q: 'How do I select my seat?', a: 'You can select your preferred seat during the booking process or manage your booking after confirmation through the My Bookings section.' },
    { q: 'Is seat selection free?', a: 'Standard seats are complimentary. Premium seats with extra legroom may carry an additional charge.' },
  ],
  Cancellation: [
    { q: 'How do I cancel my booking?', a: 'Go to My Bookings, find the booking you wish to cancel, and click "Cancel Booking". A cancellation email will be sent automatically.' },
    { q: 'What is the cancellation policy?', a: 'Cancellation policies vary by fare type. Full-flex tickets allow free cancellation. Promotional fares may be non-refundable.' },
    { q: 'When will I receive my refund?', a: 'Refunds are typically processed within 5-7 business days to your original payment method.' },
  ],
  Baggage: [
    { q: 'What is the baggage allowance?', a: 'Economy class allows 1 carry-on bag (7kg) and 1 checked bag (20kg). Business class allows 2 checked bags (32kg each).' },
    { q: 'What items are prohibited in baggage?', a: 'Dangerous goods, flammable materials, sharp objects, and lithium batteries above threshold are prohibited.' },
  ],
};

const topics = Object.keys(faqData);

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group">
        <span className="text-base text-primary font-medium group-hover:text-accent transition-colors pr-4">{q}</span>
        <FiChevronDown size={18} className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <p className="text-sm text-gray-500 leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage = () => {
  const [activeTopic, setActiveTopic] = useState('Booking');
  const [search, setSearch] = useState('');

  const filtered = faqData[activeTopic]?.filter(item =>
    !search || item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <MainLayout>
      <div className="min-h-screen bg-white pt-16">
        {/* Breadcrumb */}
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-accent">SkyJourney</Link>
            <span>›</span>
            <Link to="/support" className="hover:text-accent">Help & Support</Link>
            <span>›</span>
            <span className="text-primary">FAQs</span>
          </div>
        </div>

        {/* Header */}
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 pb-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-primary mb-8">
            Frequently Asked Questions
          </motion.h1>
          <div className="max-w-xl mx-auto">
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-5 py-4">
              <FiSearch size={16} className="text-gray-400 flex-shrink-0" />
              <input type="text" placeholder="Search keywords, support & more..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-primary focus:outline-none placeholder:text-gray-400" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 pb-20">
          <div className="flex gap-12">
            {/* LEFT — topics */}
            <div className="w-56 flex-shrink-0">
              {topics.map(topic => (
                <button key={topic} onClick={() => setActiveTopic(topic)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all mb-1 ${
                    activeTopic === topic
                      ? 'bg-green-50 text-accent border-l-4 border-accent'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary border-l-4 border-transparent'
                  }`}>
                  <span>{topic}</span>
                  {activeTopic === topic && <span className="text-accent">›</span>}
                </button>
              ))}
            </div>

            {/* RIGHT — questions */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-primary mb-2">{activeTopic}</h2>
              <div className="mt-4">
                {filtered.length > 0 ? (
                  filtered.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)
                ) : (
                  <p className="text-gray-400 text-sm py-8">No results found for "{search}"</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQPage;
