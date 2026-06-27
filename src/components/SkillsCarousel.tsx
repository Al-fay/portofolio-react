import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { skillsList } from '../data';
import { TechIcon } from './TechIcon';

interface SkillsCarouselProps {
  lang: 'en' | 'id';
}

export const SkillsCarousel: React.FC<SkillsCarouselProps> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive items count observer
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth >= 1280) {
        setVisibleCount(5);
      } else if (window.innerWidth >= 1024) {
        setVisibleCount(4);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };
    
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const totalItems = skillsList.length;
  const maxIndex = Math.max(0, totalItems - visibleCount);

  // Reset index if it exceeds maxIndex on scale-change
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCount, maxIndex, currentIndex]);

  // Autoplay Logic
  useEffect(() => {
    if (isPlaying && maxIndex > 0) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 3500);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, maxIndex, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Helper to format category labels delicately
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'frontend':
        return {
          bg: 'bg-blue-50 dark:bg-blue-500/10',
          text: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-100 dark:border-blue-500/20'
        };
      case 'backend':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-500/10',
          text: 'text-emerald-600 dark:text-emerald-400',
          border: 'border-emerald-100 dark:border-emerald-500/20'
        };
      case 'tools':
        return {
          bg: 'bg-amber-50 dark:bg-amber-500/10',
          text: 'text-amber-600 dark:text-amber-400',
          border: 'border-amber-100 dark:border-amber-500/20'
        };
      case 'devops':
        return {
          bg: 'bg-[#9333EA]/5 dark:bg-[#9333EA]/15',
          text: 'text-[#9333EA] dark:text-[#C084FC]',
          border: 'border-[#9333EA]/10 dark:border-[#9333EA]/30'
        };
      default:
        return {
          bg: 'bg-neutral-50 dark:bg-white/5',
          text: 'text-neutral-500 dark:text-neutral-400',
          border: 'border-neutral-100 dark:border-white/10'
        };
    }
  };

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto px-6 md:px-8 py-4 select-none" 
      id="skills-carousel-container"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Outer Slider Wrapper containing viewports */}
      <div className="relative overflow-visible" id="carousel-viewport-wrapper">
        <div className="overflow-hidden px-1 py-6" id="carousel-inner-overflow">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            id="carousel-slider-track"
          >
            {skillsList.map((skill, idx) => {
              const catTheme = getCategoryTheme(skill.category);
              const isActive = idx >= currentIndex && idx < currentIndex + visibleCount;

              return (
                <div
                  key={`${skill.name}-${idx}`}
                  style={{ minWidth: `${100 / visibleCount}%`, padding: '0 10px' }}
                  className="flex-shrink-0 transition-opacity duration-500"
                  id={`carousel-slide-${idx}`}
                >
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`h-full flex flex-col justify-between bg-white dark:bg-[#111113] p-6 rounded-2xl border transition-all duration-300 ${
                      isActive 
                        ? 'border-neutral-200 dark:border-white/10 shadow-sm opacity-100' 
                        : 'border-neutral-100 dark:border-white/5 opacity-40 blur-[1px]'
                    } hover:border-neutral-400 dark:hover:border-amber-400/35 hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(245,158,11,0.04)] group`}
                  >
                    <div>
                      {/* Technical visual category indicator */}
                      <div className="flex justify-between items-start mb-5">
                        <div className="text-neutral-400 dark:text-white/30 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300">
                          <TechIcon name={skill.icon} className="w-8 h-8 md:w-9 md:h-9" />
                        </div>
                        <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-md border ${catTheme.bg} ${catTheme.text} ${catTheme.border}`}>
                          {skill.category}
                        </span>
                      </div>

                      {/* Title and details */}
                      <h3 className="font-sans font-semibold text-neutral-850 dark:text-white/90 text-sm md:text-base mb-1.5 transition-colors duration-200 group-hover:text-neutral-950 dark:group-hover:text-white">
                        {skill.name}
                      </h3>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-neutral-400 dark:text-white/30">
                      <span>VERIFIED ✓</span>
                      <span className="scale-75 group-hover:scale-100 group-hover:text-amber-500 transition-all duration-300">●</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Floating Manual Slide Navigation Controls */}
        {maxIndex > 0 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white dark:bg-[#111113] border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-600 dark:text-white/65 hover:bg-neutral-50 dark:hover:bg-[#18181b] hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer shadow-md"
              aria-label="Previous skill"
              id="carousel-btn-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white dark:bg-[#111113] border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-600 dark:text-white/65 hover:bg-neutral-50 dark:hover:bg-[#18181b] hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer shadow-md"
              aria-label="Next skill"
              id="carousel-btn-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Pagination Dot Navigation and Playback indicator controls */}
      {maxIndex > 0 && (
        <div className="flex items-center justify-center gap-5 mt-4" id="carousel-bullet-navigation">
          {/* Autoplay Stop/Play Toggle button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg border border-neutral-200 dark:border-white/5 bg-neutral-50 dark:bg-white/[0.02] text-neutral-400 dark:text-white/40 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            title={isPlaying ? (lang === 'en' ? 'Pause Autoplay' : 'Jeda Otomatis') : (lang === 'en' ? 'Start Autoplay' : 'Mulai Otomatis')}
            id="carousel-btn-play-pause"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Indicator dots mapping inside limits */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 h-1.5 rounded-full cursor-pointer ${
                  index === currentIndex
                    ? 'w-6 bg-amber-500'
                    : 'w-1.5 bg-neutral-300 dark:bg-white/20 hover:bg-neutral-400 dark:hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                id={`carousel-dot-${index}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
