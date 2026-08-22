import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiX, FiMessageCircle, FiMic, FiMicOff } from 'react-icons/fi';
import api from '../../api/axios';

const QUICK_REPLIES = [
  'Find flights to Goa',
  'Track my booking',
  'Baggage allowance?',
  'How to cancel a flight?',
];

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi there! 👋 I'm Sky, your SkyJourney travel assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const scrollRef = useRef(null);

  const speechSupported = typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    if (!speechSupported) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, [speechSupported]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Auto-open after 6 seconds on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAutoOpened) {
        setShowBadge(true);
        setHasAutoOpened(true);
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [hasAutoOpened]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendMessage = async (text) => {
    const userText = text || input;
    if (!userText.trim()) return;

    const newMessages = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const history = newMessages.slice(0, -1).map(m => ({ role: m.role, text: m.text }));
      const { data } = await api.post('/chatbot/message', { message: userText, history });
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again shortly." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowBadge(false);
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
        <AnimatePresence>
          {showBadge && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl px-4 py-3 max-w-xs border border-gray-100 cursor-pointer"
              onClick={handleOpen}
            >
              <p className="text-sm text-primary font-medium">Need help with your trip? I'm here! ✈️</p>
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-gray-100 transform rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl relative"
          style={{ background: '#1D6B43' }}
        >
          {!isOpen && !hasAutoOpened === false && showBadge === false && (
            <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
          )}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <FiX size={24} className="text-white" />
              </motion.span>
            ) : (
              <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <FiMessageCircle size={24} className="text-white" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-[95] w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 flex-shrink-0" style={{ background: '#0D1F1A' }}>
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                ✈
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">Sky — SkyJourney Assistant</p>
                <p className="text-white/50 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Online now
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <FiX size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: '#fafafa' }}>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' ? 'text-white rounded-br-sm' : 'bg-white text-primary border border-gray-100 rounded-bl-sm'
                    }`}
                    style={msg.role === 'user' ? { background: '#1D6B43' } : {}}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400"
                        animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Quick replies — show only at start */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {QUICK_REPLIES.map(q => (
                    <button key={q} onClick={() => sendMessage(q)}
                      className="text-xs border border-accent/30 text-accent px-3 py-1.5 rounded-full hover:bg-accent/5 transition-all">
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-3 border-t border-gray-100 flex-shrink-0 bg-white">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder={isListening ? 'Listening...' : 'Type your message...'}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm text-primary focus:outline-none placeholder:text-gray-400"
              />
              {speechSupported && (
                <motion.button
                  onClick={toggleListening}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ background: isListening ? '#ef4444' : '#f3f4f6' }}
                >
                  {isListening ? (
                    <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                      <FiMic size={15} className="text-white" />
                    </motion.span>
                  ) : (
                    <FiMic size={15} className="text-gray-500" />
                  )}
                </motion.button>
              )}
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-all"
                style={{ background: '#1D6B43' }}
              >
                <FiSend size={15} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
