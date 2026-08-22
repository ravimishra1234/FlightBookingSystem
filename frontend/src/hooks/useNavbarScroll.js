import { useState, useEffect, useRef } from 'react';

/**
 * Returns 'dark' when in hero/dark sections
 * Returns 'white' when Exceptional Experiences section enters viewport
 * Smooth transition 900ms ease-in-out
 */
const useNavbarScroll = () => {
  const [theme, setTheme] = useState('dark');
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTheme('white');
        } else {
          // Only go back to dark if scrolled above the section
          if (entry.boundingClientRect.top > 0) {
            setTheme('dark');
          }
        }
      },
      { threshold: 0.05 }
    );

    const el = document.getElementById('exceptional-experiences');
    if (el) {
      sectionRef.current = el;
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return theme;
};

export default useNavbarScroll;
