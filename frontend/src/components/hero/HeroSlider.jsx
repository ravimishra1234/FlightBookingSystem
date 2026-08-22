import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80',
    heading: 'Fly Beyond The Ordinary',
    subheading: 'Experience world-class air travel from Bengaluru to everywhere',
    cta: 'Book now',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1920&q=80',
    heading: 'Soaring in Excellence',
    subheading: 'Crowned Best Airline 5 years in a row — your comfort is our priority',
    cta: 'Book now',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80',
    heading: 'Discover Incredible India',
    subheading: 'From Kashmir to Kerala — explore the best of India with SkyJourney',
    cta: 'Explore routes',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
    heading: 'Your Journey Begins Here',
    subheading: 'Premium comfort, seamless booking, unforgettable destinations',
    cta: 'Book now',
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (!isPlaying || isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, isPaused, next]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-primary">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, rgba(5,15,10,0.85) 0%, rgba(5,15,10,0.5) 50%, rgba(5,15,10,0.2) 100%)'
          }} />
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-48" style={{
            background: 'linear-gradient(to top, rgba(13,31,26,0.9), transparent)'
          }} />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="max-w-2xl"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                  {slides[current].heading}
                </h1>
                <p className="text-white/75 text-lg mb-8 leading-relaxed">
                  {slides[current].subheading}
                </p>
                <button className="bg-accent text-white font-semibold px-7 py-3.5 text-base hover:bg-accent-light transition-all duration-200 active:scale-95">
                  {slides[current].cta}
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls — bottom right */}
      <div className="absolute bottom-36 right-8 flex items-center gap-3 z-10">
        {/* Slide indicators */}
        <div className="flex items-center gap-2 mr-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-8 h-1.5 bg-white' : 'w-5 h-1 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Prev */}
        <button
          onClick={prev}
          className="w-9 h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
        >
          ←
        </button>

        {/* Next */}
        <button
          onClick={next}
          className="w-9 h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
        >
          →
        </button>

        {/* Play/Pause */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="w-9 h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all text-xs"
        >
          {isPaused ? '▶' : '⏸'}
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
