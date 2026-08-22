import { useState, useEffect } from 'react';

const useAssistanceTimer = (delay = 30000) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('assistanceShown')) return;
    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem('assistanceShown', 'true');
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const dismiss = () => setShow(false);

  return { show, dismiss };
};

export default useAssistanceTimer;
