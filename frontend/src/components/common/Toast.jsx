import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  const styles = { success: 'bg-green-50 border-green-200 text-green-700', error: 'bg-red-50 border-red-200 text-red-700', info: 'bg-blue-50 border-blue-200 text-blue-700' };
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
        className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-4 py-3 border rounded-lg shadow-lg max-w-sm ${styles[type]}`}>
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="opacity-60 hover:opacity-100 text-lg">&times;</button>
      </motion.div>
    </AnimatePresence>
  );
};
export default Toast;
