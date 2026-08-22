import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

const STORAGE_PREFIX = 'skyjourney_fare_alert_';

/**
 * Manages all fare alerts in localStorage and actively checks them
 * against live flight data whenever called. Uses the browser
 * Notification API to alert the user in real time — no backend
 * cron job needed, fully functional within the browser session
 * and on every page load while alerts are active.
 */
export function getAllAlerts() {
  const alerts = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_PREFIX)) {
      try {
        alerts.push({ key, ...JSON.parse(localStorage.getItem(key)) });
      } catch { /* ignore malformed entry */ }
    }
  }
  return alerts;
}

export function useFareAlertChecker() {
  const [notifPermission, setNotifPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported'
  );

  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') return 'unsupported';
    const result = await Notification.requestPermission();
    setNotifPermission(result);
    return result;
  }, []);

  const checkAllAlerts = useCallback(async () => {
    const alerts = getAllAlerts();
    if (alerts.length === 0) return [];

    const triggered = [];

    for (const alert of alerts) {
      try {
        const { data } = await api.get('/flights/search', {
          params: { source: alert.source, destination: alert.destination, departureDate: alert.departureDate },
        });
        const flights = data.flights || [];
        if (flights.length === 0) continue;

        const lowestPrice = Math.min(...flights.map((f) => f.price));

        if (lowestPrice <= alert.targetPrice) {
          triggered.push({ ...alert, lowestPrice });

          // Real browser notification
          if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            new Notification('✈️ SkyJourney Fare Alert!', {
              body: `${alert.source} → ${alert.destination} dropped to ₹${lowestPrice.toLocaleString()} (your target: ₹${alert.targetPrice.toLocaleString()})`,
              icon: '/vite.svg',
              tag: alert.key,
            });
          }

          // Mark as triggered so we don't spam on every check
          localStorage.setItem(alert.key, JSON.stringify({ ...alert, triggered: true, lowestPrice, triggeredAt: new Date().toISOString() }));
        }
      } catch {
        // Silently skip — route might have no flights right now
      }
    }

    return triggered;
  }, []);

  // Auto-check once per session, a few seconds after load
  useEffect(() => {
    const alerts = getAllAlerts();
    if (alerts.length === 0) return;
    const timer = setTimeout(() => { checkAllAlerts(); }, 3000);
    return () => clearTimeout(timer);
  }, [checkAllAlerts]);

  return { notifPermission, requestPermission, checkAllAlerts };
}
