import { motion, AnimatePresence } from 'framer-motion';
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', loading = false }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}>
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
          <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">{message}</p>
          <div className="flex gap-3">
            <button onClick={onClose} disabled={loading} className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded hover:bg-gray-50 transition-all">Cancel</button>
            <button onClick={onConfirm} disabled={loading} className="flex-1 py-2.5 bg-red-500 text-white text-sm font-semibold rounded hover:bg-red-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
export default ConfirmModal;
