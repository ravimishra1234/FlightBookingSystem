import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AssistanceModal = ({ show, onDismiss }) => {
  const [selected, setSelected] = useState('Email');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const methods = [
    { id: 'Phone', icon: '📞' },
    { id: 'SMS', icon: '💬' },
    { id: 'Email', icon: '✉' },
    { id: 'WhatsApp', icon: '📱' },
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={onDismiss}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-primary">How may we help you today?</h3>
                <p className="text-gray-400 text-xs mt-0.5">Choose your preferred contact method</p>
              </div>
              <button onClick={onDismiss} className="text-gray-400 hover:text-primary text-xl leading-none">&times;</button>
            </div>

            <div className="px-6 py-5">
              {/* Contact methods */}
              <div className="grid grid-cols-4 gap-2 mb-5">
                {methods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelected(m.id)}
                    className={`flex flex-col items-center gap-1.5 py-3 rounded border text-xs font-medium transition-all ${
                      selected === m.id
                        ? 'border-accent bg-accent/5 text-accent'
                        : 'border-gray-200 text-gray-500 hover:border-accent/40'
                    }`}
                  >
                    <span className="text-xl">{m.icon}</span>
                    {m.id}
                  </button>
                ))}
              </div>

              {/* Form */}
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-accent rounded"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-accent rounded"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-accent rounded"
                />
                <textarea
                  placeholder="How can we help?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-accent rounded resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-5">
                <button className="flex-1 bg-accent text-white font-semibold py-3 text-sm hover:bg-accent-light transition-all rounded">
                  Contact Me
                </button>
                <button
                  onClick={onDismiss}
                  className="flex-1 border border-gray-200 text-gray-500 font-medium py-3 text-sm hover:bg-gray-50 transition-all rounded"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AssistanceModal;
