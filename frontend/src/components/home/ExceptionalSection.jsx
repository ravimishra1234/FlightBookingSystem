import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=700&q=80',
    title: 'Time Flies with BEYOND',
    desc: 'Discover our new entertainment experience BEYOND and learn more about the various entertainment channels and services available on your flight.',
  },
  {
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=700&q=80',
    title: 'SkyJourney Named Best Airline Staff Service at the 2025 Skytrax Awards',
    desc: 'The airline climbs to 17th place in global ranking, reflecting excellence across the guest journey.',
  },
  {
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=700&q=80',
    title: 'SkyJourney Travel',
    desc: 'Plan a complete trip — flights, hotels, and more. Your perfect holiday is just a few clicks away.',
  },
  {
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=700&q=80',
    title: 'Exclusive Destinations from Bengaluru',
    desc: 'Explore our curated selection of routes connecting Bengaluru to the world\'s most sought-after destinations.',
  },
];

const ExceptionalSection = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (windowH - rect.top) / (windowH * 0.6)));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const r1 = 13, g1 = 31, b1 = 26;
  const r2 = 255, g2 = 255, b2 = 255;
  const bg = `rgb(${Math.round(r1+(r2-r1)*scrollProgress)},${Math.round(g1+(g2-g1)*scrollProgress)},${Math.round(b1+(b2-b1)*scrollProgress)})`;
  const textColor = scrollProgress > 0.5 ? '#0D1F1A' : '#ffffff';
  const subColor = scrollProgress > 0.5 ? '#6b7280' : 'rgba(255,255,255,0.6)';
  const borderColor = scrollProgress > 0.5 ? '#e5e7eb' : 'rgba(255,255,255,0.1)';

  return (
    <section id="exceptional-experiences" ref={sectionRef} style={{ background: bg, transition: 'background 0.1s linear' }}>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-20">
        <div className="experiences-grid">
          <div className="experiences-left">
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-5" style={{ color: textColor, transition: 'color 0.3s ease' }}>
              Exceptional<br />experiences<br />with<br />SkyJourney
            </h2>
            <p className="text-base leading-relaxed max-w-xs" style={{ color: subColor, transition: 'color 0.3s ease' }}>
              Explore the world, earn rewards and live the best adventures with SkyJourney.
            </p>
          </div>

          <div className="pt-2">
            {experiences.map((exp, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 pb-10 mb-10"
                style={{ borderBottom: `1px solid ${borderColor}` }}
              >
                <div className="flex-shrink-0 w-60 h-40 overflow-hidden rounded-sm bg-gray-100">
                  <img src={exp.image} alt={exp.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80'; }}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-2 leading-snug" style={{ color: textColor, transition: 'color 0.3s ease' }}>
                    {exp.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: subColor, transition: 'color 0.3s ease' }}>
                    {exp.desc}
                  </p>
                  <button className="text-sm font-medium flex items-center gap-1 w-fit hover:underline" style={{ color: '#1D6B43' }}>
                    Learn more →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExceptionalSection;
