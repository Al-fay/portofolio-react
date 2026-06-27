import React from 'react';
import { motion } from 'motion/react';
import { testimonialsList } from '../data';
import { Language } from '../types';
import { Quote } from 'lucide-react';

interface TestimonialsMarqueeProps {
  lang: Language;
}

export const TestimonialsMarquee: React.FC<TestimonialsMarqueeProps> = ({ lang }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Duplicate the list multiple times to guarantee seamless scrolling
  const duplicatedTestimonials = [
    ...testimonialsList,
    ...testimonialsList,
    ...testimonialsList,
    ...testimonialsList,
  ];

  const handleMouseEnter = () => {
    if (scrollRef.current) {
      const animations = scrollRef.current.getAnimations();
      animations.forEach(anim => anim.pause());
    }
  };

  const handleMouseLeave = () => {
    if (scrollRef.current) {
      const animations = scrollRef.current.getAnimations();
      animations.forEach(anim => anim.play());
    }
  };

  return (
    <div 
      className="relative w-full overflow-hidden bg-neutral-50 dark:bg-[#0A0A0B] border-y border-neutral-200/50 dark:border-white/5 py-10" 
      id="testimonials-marquee-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Soft gradient masks for smooth fade-out look at the edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-r from-neutral-50 to-transparent dark:from-[#0A0A0B] z-10 pointer-events-none" id="testimonials-gradient-left"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-l from-neutral-50 to-transparent dark:from-[#0A0A0B] z-10 pointer-events-none" id="testimonials-gradient-right"></div>

      <div className="flex w-max" id="testimonials-inner-container">
        <motion.div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 pr-6 md:pr-8 items-stretch"
          animate={{ x: [0, -1200] }}
          transition={{
            ease: "linear",
            duration: 45,
            repeat: Infinity,
            repeatType: "loop"
          }}
          id="testimonials-scroll-motion"
        >
          {duplicatedTestimonials.map((item, idx) => (
            <div 
              key={`${item.id}-${idx}`} 
              className="flex flex-col justify-between w-[280px] sm:w-[350px] bg-white dark:bg-[#111113] p-5 md:p-6 rounded-2xl border border-neutral-200/60 dark:border-white/5 shadow-2xs hover:border-neutral-350 dark:hover:border-white/10 hover:scale-[1.03] hover:shadow-md dark:hover:shadow-black/40 transition-all duration-300 group cursor-default transform"
              id={`testimonial-item-${idx}`}
            >
              <div className="flex flex-col gap-3.5" id={`testimonial-content-${idx}`}>
                <div className="flex items-center justify-between" id={`testimonial-header-${idx}`}>
                  <div className="flex flex-col" id={`testimonial-author-${idx}`}>
                    <span className="font-sans font-semibold text-neutral-800 dark:text-white text-xs sm:text-sm whitespace-nowrap">
                      {item.name}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-neutral-400 dark:text-white/40 uppercase tracking-wider mt-0.5">
                      {item.role}
                    </span>
                  </div>
                  <Quote className="w-4 h-4 text-neutral-300 dark:text-white/10 group-hover:text-amber-500/30 transition-colors duration-300" />
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 text-xs font-sans leading-relaxed italic" id={`testimonial-text-${idx}`}>
                  "{item.text[lang]}"
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
