import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiBellOff, FiCheckCircle } from 'react-icons/fi';
import { useFareAlertChecker } from '../../hooks/useFareAlerts';

const FareAlertCard = ({ source, destination, departureDate, currentPrice }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [savedAlert, setSavedAlert] = useState(null);
  const [checking, setChecking] = useState(false);
  const [justTriggered, setJustTriggered] = useState(false);
  const { notifPermission, requestPermission, checkAllAlerts } = useFareAlertChecker();

  const alertKey = `skyjourney_fare_alert_${source}_${destination}_${departureDate}`;

  useEffect(() => {
    const stored = localStorage.getItem(alertKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      setSavedAlert(parsed);
      setIsTracking(true);
      if (parsed.triggered) setJustTriggered(true);
    } else {
      setIsTracking(false);
      setSavedAlert(null);
      setJustTriggered(false);
    }
  }, [alertKey]);

  const handleCreate = async () => {
    if (notifPermission !== 'granted') {
      await requestPermission();
    }
    const price = Number(targetPrice) || Math.round(currentPrice * 0.85);
    const alert = {
      source, destination, departureDate,
      targetPrice: price, currentPrice,
      triggered: false,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(alertKey, JSON.stringify(alert));
    setSavedAlert(alert);
    setIsTracking(true);
    setShowForm(false);
  };

  const handleStop = () => {
    localStorage.removeItem(alertKey);
    setSavedAlert(null);
    setIsTracking(false);
    setJustTriggered(false);
  };

  const handleManualCheck = async () => {
    setChecking(true);
    const triggered = await checkAllAlerts();
    if (triggered.some((t) => t.key === alertKey)) {
      setJustTriggered(true);
      const updated = JSON.parse(localStorage.getItem(alertKey));
      setSavedAlert(updated);
    }
    setChecking(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
      <AnimatePresence mode="wait">
        {!isTracking ? (
          <motion.div key="create" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {!showForm ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <FiBell size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">Track this fare</p>
                    <p className="text-xs text-gray-500">Get a real browser notification when {source} → {destination} drops in price</p>
                  </div>
                </div>
                <button onClick={() => setShowForm(true)}
                  className="text-sm font-semibold text-accent border border-accent/30 px-4 py-2 rounded hover:bg-accent/5 transition-all flex-shrink-0">
                  Set alert
                </button>
              </div>
            ) : (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                <p className="text-sm font-bold text-primary mb-3">Notify me when price drops below</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-4 py-2.5 min-w-[140px]">
                    <span className="text-gray-500 text-sm">₹</span>
                    <input
                      type="number"
                      value={targetPrice}
                      onChange={e => setTargetPrice(e.target.value)}
                      placeholder={Math.round(currentPrice * 0.85).toString()}
                      className="flex-1 bg-transparent text-sm text-primary focus:outline-none"
                    />
                  </div>
                  <button onClick={handleCreate}
                    className="bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-accent-light transition-all flex-shrink-0">
                    Create alert
                  </button>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-primary text-sm flex-shrink-0">
                    Cancel
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Current lowest fare: ₹{currentPrice?.toLocaleString()}</p>
                {notifPermission === 'denied' && (
                  <p className="text-xs text-amber-600 mt-1">⚠️ Browser notifications are blocked — you'll still see status here on this page, but won't get a popup alert.</p>
                )}
              </motion.div>
            )}
          </motion.div>
        ) : justTriggered ? (
          <motion.div key="triggered" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                <FiCheckCircle size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-green-700">Price dropped! 🎉</p>
                <p className="text-xs text-gray-600">
                  {source} → {destination} is now <span className="font-semibold">₹{savedAlert?.lowestPrice?.toLocaleString()}</span> — below your target of ₹{savedAlert?.targetPrice?.toLocaleString()}
                </p>
              </div>
            </div>
            <button onClick={handleStop}
              className="text-sm font-medium text-gray-400 hover:text-red-500 px-3 py-2 transition-all flex items-center gap-1.5 flex-shrink-0">
              <FiBellOff size={14} /> Dismiss
            </button>
          </motion.div>
        ) : (
          <motion.div key="tracking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                <FiBell size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">
                  Tracking {source} → {destination}
                </p>
                <p className="text-xs text-gray-500">
                  We'll alert you if price drops below <span className="font-semibold text-accent">₹{savedAlert?.targetPrice?.toLocaleString()}</span>
                  {notifPermission === 'granted' && <span className="text-green-600"> · Notifications on ✓</span>}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={handleManualCheck} disabled={checking}
                className="text-xs font-medium text-accent border border-accent/30 px-3 py-2 rounded hover:bg-accent/5 transition-all disabled:opacity-50">
                {checking ? 'Checking...' : 'Check now'}
              </button>
              <button onClick={handleStop}
                className="text-sm font-medium text-gray-400 hover:text-red-500 px-3 py-2 transition-all flex items-center gap-1.5">
                <FiBellOff size={14} /> Stop
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FareAlertCard;
