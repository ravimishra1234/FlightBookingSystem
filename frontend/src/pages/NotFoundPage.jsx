import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => (
  <div className="min-h-screen bg-white flex items-center justify-center px-6">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-7xl mb-6 opacity-30">✈</motion.div>
      <p className="text-8xl font-black text-gray-100 mb-4">404</p>
      <h2 className="text-2xl font-bold text-primary mb-2">Flight Not Found</h2>
      <p className="text-gray-500 text-sm mb-8">This route doesn't exist. Let's get you back on track.</p>
      <Link to="/">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="bg-accent text-white font-semibold px-8 py-3 text-sm hover:bg-accent-light transition-all">
          ← Back to Home
        </motion.button>
      </Link>
    </motion.div>
  </div>
);

export default NotFoundPage;
