import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Language, TranslationDict, Project } from '../types';
import { projectsList } from '../data';
import { Code, ExternalLink, Calendar, Layers, X, Globe, UserCheck, ChevronLeft, ChevronRight, Maximize2, Images, BookOpen } from 'lucide-react';

interface ProjectGalleryProps {
  lang: Language;
  dict: TranslationDict;
}

const calculateReadingTime = (text: string) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const seconds = Math.ceil((words / 200) * 60);
  if (seconds < 60) {
    return { value: seconds, unitLabel: { en: 'sec read', id: 'detik baca' } };
  }
  const mins = Math.ceil(words / 200);
  return { value: mins, unitLabel: { en: 'min read', id: 'menit baca' } };
};

const AnimatedCounter: React.FC<{ value: number; duration?: number; suffix?: string; isDecimal?: boolean }> = ({ value, duration = 1200, suffix = '', isDecimal = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentVal = progress * value;
      setCount(currentVal);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span>
      {isDecimal ? count.toFixed(1) : Math.floor(count)}
      {suffix}
    </span>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 90,
      damping: 15,
    },
  },
};

interface ProjectCardProps {
  proj: Project;
  lang: Language;
  dict: TranslationDict;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ proj, lang, dict, onClick }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [7, -7]);
  const rotateY = useTransform(x, [0, 1], [-7, 7]);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const scale = useMotionValue(1);
  const scaleSpring = useSpring(scale, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const relativeX = (e.clientX - rect.left) / width;
    const relativeY = (e.clientY - rect.top) / height;

    x.set(relativeX);
    y.set(relativeY);
    scale.set(1.025);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    scale.set(1);
  };

  const readingTime = calculateReadingTime(proj.description[lang]);

  return (
    <motion.div
      layout
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        scale: scaleSpring,
      }}
      className="group relative flex flex-col h-full bg-white dark:bg-[#111113] rounded-2xl border border-neutral-200/60 dark:border-white/5 overflow-hidden cursor-pointer shadow-3xs hover:border-neutral-350 dark:hover:border-white/10 transition-colors duration-300 select-none"
      onClick={onClick}
      id={`project-card-${proj.id}`}
    >
      {/* Visual Image container */}
      <div 
        className="relative w-full aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-900/60" 
        id={`p-image-container-${proj.id}`}
        style={{ transform: 'translateZ(20px)' }}
      >
        {/* Category chip & Framer Motion Badges */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 flex-wrap max-w-[80%]" id={`p-badges-container-${proj.id}`}>
          <span className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase font-normal tracking-widest bg-neutral-950/85 text-white/80 border border-white/5">
            {proj.category}
          </span>
          {proj.featured && (
            <motion.span
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-mono uppercase font-bold tracking-widest bg-amber-500 text-neutral-950 shadow-[0_0_12px_rgba(245,158,11,0.25)] dark:shadow-[0_0_16px_rgba(245,158,11,0.15)] border border-amber-400"
              id={`featured-badge-${proj.id}`}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-950 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neutral-950"></span>
              </span>
              <span>{lang === 'en' ? 'Case Study' : 'Studi Kasus'}</span>
            </motion.span>
          )}
        </div>

        {/* Multiple Images Indicator Badge */}
        {proj.images && proj.images.length > 1 && (
          <span 
            className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-mono font-medium tracking-wider bg-neutral-950/85 text-white border border-white/10 shadow-xs"
            title={lang === 'en' ? `${proj.images.length} screenshots available` : `${proj.images.length} gambar tersedia`}
          >
            <Images className="w-3" />
            <span>{proj.images.length} {lang === 'en' ? 'Photos' : 'Gambar'}</span>
          </span>
        )}

        <img
          src={proj.image}
          alt={proj.title[lang]}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 grayscale brightness-95 opacity-90 group-hover:grayscale-0 group-hover:opacity-100"
          id={`p-image-${proj.id}`}
        />
        
        {/* Rollover view accent */}
        <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" id={`p-rollover-${proj.id}`}>
          <span className="px-5 py-2 rounded-xl bg-white text-neutral-950 font-normal text-xs shadow-lg uppercase tracking-wider font-mono">
            {dict.projects.viewProject}
          </span>
        </div>
      </div>

      {/* Content body */}
      <div 
        className="p-6 flex flex-col flex-1" 
        id={`p-content-${proj.id}`}
        style={{ transform: 'translateZ(10px)' }}
      >
        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-white/30 block mb-1">
          {proj.year} • {proj.role[lang]} • {readingTime.value} {lang === 'en' ? readingTime.unitLabel.en : readingTime.unitLabel.id}
        </span>
        
        <h3 className="text-lg font-medium text-neutral-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-350" id={`p-title-${proj.id}`}>
          {proj.title[lang]}
        </h3>
        
        <p className="text-neutral-500 dark:text-white/60 text-xs md:text-sm font-sans mt-2 line-clamp-2 leading-relaxed flex-1 font-light" id={`p-desc-${proj.id}`}>
          {proj.description[lang]}
        </p>

        {/* Tag chips */}
        <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-neutral-100 dark:border-white/5" id={`p-tags-${proj.id}`}>
          {proj.tags.slice(0, 4).map((tag, tIdx) => (
            <span 
              key={tIdx} 
              className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-neutral-50 dark:bg-white/5 text-neutral-500 dark:text-white/40 border border-neutral-150/50 dark:border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ lang, dict }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile' | 'ai'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Hook for Keyboard Arrow keys page switching and Escape closing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (zoomImage) {
        const projectImages = selectedProject?.images && selectedProject.images.length > 0
          ? selectedProject.images
          : selectedProject ? [selectedProject.image] : [];
        
        if (projectImages.length > 1) {
          const currentZoomIdx = projectImages.indexOf(zoomImage);
          if (e.key === 'ArrowRight') {
            const nextIdx = currentZoomIdx === projectImages.length - 1 ? 0 : currentZoomIdx + 1;
            setZoomImage(projectImages[nextIdx]);
            setActiveImageIndex(nextIdx);
          } else if (e.key === 'ArrowLeft') {
            const prevIdx = currentZoomIdx === 0 ? projectImages.length - 1 : currentZoomIdx - 1;
            setZoomImage(projectImages[prevIdx]);
            setActiveImageIndex(prevIdx);
          }
        }
        if (e.key === 'Escape') {
          setZoomImage(null);
        }
      } else if (selectedProject) {
        const projectImages = selectedProject.images && selectedProject.images.length > 0
          ? selectedProject.images
          : [selectedProject.image];
          
        if (projectImages.length > 1) {
          if (e.key === 'ArrowRight') {
            setActiveImageIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1));
          } else if (e.key === 'ArrowLeft') {
            setActiveImageIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1));
          }
        }
        if (e.key === 'Escape') {
          setSelectedProject(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, zoomImage]);

  const filteredProjects = projectsList.filter(proj => {
    if (activeFilter === 'all') return true;
    return proj.category === activeFilter;
  });

  const categoryLabels = {
    all: dict.projects.all,
    web: 'Web Apps',
    mobile: 'Mobile Apps',
    ai: 'AI & Cloud Platform',
  };

  return (
    <section 
      className="py-24 bg-white dark:bg-[#0A0A0B] border-t border-neutral-100 dark:border-white/5 transition-colors duration-300"
      id="projects-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16" 
          id="projects-header"
        >
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-white/50 border border-neutral-200 dark:border-white/10 px-3.5 py-1 rounded-full">
            {dict.nav.projects}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light text-neutral-900 dark:text-white mt-4 tracking-tight" id="projects-title">
            {dict.projects.title}
          </h2>
          <p className="text-neutral-500 dark:text-white/40 mt-3 font-sans max-w-2xl mx-auto font-light text-sm italic" id="projects-subtitle">
            {dict.projects.subtitle}
          </p>
        </motion.div>

        {/* Interactive Stats Component */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 px-4" id="projects-stats-grid">
          {[
            {
              label: lang === 'en' ? 'Total Projects Completed' : 'Total Proyek Selesai',
              value: 42,
              suffix: '+',
              isDecimal: false,
              desc: lang === 'en' ? 'SaaS, Mobile, & Open Source' : 'SaaS, Mobile, & Terbuka'
            },
            {
              label: lang === 'en' ? 'Years of Experience' : 'Tahun Pengalaman',
              value: 4,
              suffix: '+',
              isDecimal: false,
              desc: lang === 'en' ? 'Professional Engineering' : 'Rekayasa Profesional'
            },
            {
              label: lang === 'en' ? 'System & SLA Reliability' : 'Keandalan & SLA Sistem',
              value: 99.9,
              suffix: '%',
              isDecimal: true,
              desc: lang === 'en' ? 'Fault-tolerant server availability' : 'Ketersediaan server bebas downtime'
            }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-neutral-50 dark:bg-white/2 border border-neutral-200/60 dark:border-white/5 rounded-2xl p-6 text-center hover:border-neutral-350 dark:hover:border-white/10 transition-colors duration-300"
            >
              <div className="text-3xl md:text-4xl font-mono text-amber-500 dark:text-amber-400 font-bold mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} />
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-white/80 font-medium">
                {stat.label}
              </div>
              <div className="text-[11px] text-neutral-450 dark:text-white/40 mt-1 font-light">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2.5 mb-16" 
          id="filter-controls"
        >
          {(['all', 'web', 'mobile', 'ai'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                activeFilter === filter
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-2xs'
                  : 'bg-transparent text-neutral-500 dark:text-white/40 border-neutral-200 dark:border-white/10 hover:border-neutral-450 dark:hover:border-white/20 hover:text-neutral-800 dark:hover:text-white'
              }`}
              id={`filter-${filter}`}
            >
              {categoryLabels[filter]}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid Grid */}
        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="project-cards-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <ProjectCard
                key={proj.id}
                proj={proj}
                lang={lang}
                dict={dict}
                onClick={() => {
                  setSelectedProject(proj);
                  setActiveImageIndex(0);
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detailed Modal/Drawer overlay */}
        <AnimatePresence>
          {selectedProject && (() => {
            const projectImages = selectedProject.images && selectedProject.images.length > 0 
              ? selectedProject.images 
              : [selectedProject.image];
            
            return (
              <div 
                className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex justify-center items-center p-4 md:p-6"
                onClick={() => setSelectedProject(null)}
                id="details-modal-overlay"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-2xl max-h-[85vh] bg-white dark:bg-[#111113] rounded-2xl border border-neutral-300 dark:border-white/5 overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col"
                  onClick={e => e.stopPropagation()}
                  id="details-modal-card"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-35 p-2 rounded-full bg-neutral-950/60 text-white/95 hover:bg-neutral-950 hover:scale-105 border border-white/5 shadow-md cursor-pointer transition-all"
                    id="close-modal-btn"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Interactive Slideshow Cover Image */}
                  <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] bg-neutral-950 group/carousel overflow-hidden flex-shrink-0" id="modal-cover-container">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeImageIndex}
                        src={projectImages[activeImageIndex]}
                        alt={`${selectedProject.title[lang]} - Screenshot ${activeImageIndex + 1}`}
                        referrerPolicy="no-referrer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full object-cover brightness-95 cursor-zoom-in"
                        onClick={() => setZoomImage(projectImages[activeImageIndex])}
                        id="modal-cover-image"
                      />
                    </AnimatePresence>

                    {/* Gradient Overlay for Title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none"></div>

                    {/* Top Header / Badges */}
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      <span className="text-[10px] font-mono font-normal tracking-widest text-neutral-300 uppercase bg-neutral-950/80 border border-white/10 px-2.5 py-1 rounded-md">
                        {selectedProject.category}
                      </span>
                      <span className="text-[10px] font-mono text-white/90 bg-neutral-950/80 border border-white/10 px-2.5 py-1 rounded-md">
                        {activeImageIndex + 1} / {projectImages.length}
                      </span>
                    </div>

                    {/* Right Header Controls: Zoom Image */}
                    <button
                      onClick={() => setZoomImage(projectImages[activeImageIndex])}
                      className="absolute top-4 right-14 z-20 p-2 rounded-full bg-neutral-950/60 text-white/95 hover:bg-neutral-955 hover:scale-105 border border-white/5 shadow-md cursor-pointer transition-all"
                      title={lang === 'en' ? 'Zoom Image' : 'Perbesar Gambar'}
                      id="zoom-image-btn"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>

                    {/* Navigation Arrows for multi-image project */}
                    {projectImages.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1));
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-25 p-2 rounded-full bg-neutral-950/60 text-white hover:bg-neutral-950 hover:scale-105 transition-all cursor-pointer border border-white/5 shadow-md md:opacity-0 group-hover/carousel:opacity-100"
                          id="prev-image-btn"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1));
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-25 p-2 rounded-full bg-neutral-950/60 text-white hover:bg-neutral-955 hover:scale-105 transition-all cursor-pointer border border-white/5 shadow-md md:opacity-0 group-hover/carousel:opacity-100"
                          id="next-image-btn"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Title Overlay in Carousel bottom */}
                    <div className="absolute bottom-6 left-6 z-10" id="modal-cover-title-group">
                      <h3 className="text-xl md:text-2xl font-light text-white tracking-tight" id="modal-project-title">
                        {selectedProject.title[lang]}
                      </h3>
                    </div>
                  </div>

                  {/* Interactive Thumbnail Gallery Row */}
                  {projectImages.length > 1 && (
                    <div className="px-6 md:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-none border-b border-neutral-100 dark:border-white/5 bg-neutral-50/50 dark:bg-white/2 flex-shrink-0" id="modal-thumbnails-container">
                      {projectImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative aspect-video w-20 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all duration-200 ${
                            activeImageIndex === idx
                              ? 'border-amber-500 scale-102 shadow-xs'
                              : 'border-transparent hover:border-neutral-300 dark:hover:border-white/10'
                          }`}
                          id={`thumbnail-selector-${idx}`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            referrerPolicy="no-referrer"
                            className={`w-full h-full object-cover transition-all ${
                              activeImageIndex === idx ? 'brightness-100' : 'brightness-75 hover:brightness-100'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Modal Detail Content */}
                  <div className="pl-6 pr-4 md:pl-8 md:pr-6 py-6 md:py-8 space-y-6 overflow-y-auto flex-1 modal-scrollbar" id="modal-body-content">
                    <p className="text-neutral-600 dark:text-white/70 text-xs md:text-sm font-sans leading-relaxed font-light" id="modal-project-description">
                      {selectedProject.description[lang]}
                    </p>

                    {(() => {
                      const modalReadingTime = calculateReadingTime(selectedProject.description[lang]);
                      return (
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 border-y border-neutral-100 dark:border-white/5 py-4 font-mono text-[10px] sm:text-[11px] text-neutral-500 dark:text-white/40" id="modal-metadata-grid">
                          <div className="flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-neutral-400 dark:text-white/30 flex-shrink-0" />
                            <div className="min-w-0">
                              <span className="block text-[8px] uppercase tracking-wider text-neutral-400 dark:text-white/30">{dict.projects.roleLabel}</span>
                              <span className="font-medium text-neutral-800 dark:text-white/80 line-clamp-1">{selectedProject.role[lang]}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-neutral-400 dark:text-white/30 flex-shrink-0" />
                            <div>
                              <span className="block text-[8px] uppercase tracking-wider text-neutral-400 dark:text-white/30">{dict.projects.yearLabel}</span>
                              <span className="font-medium text-neutral-800 dark:text-white/80">{selectedProject.year}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-amber-500 dark:text-amber-400 flex-shrink-0" />
                            <div>
                              <span className="block text-[8px] uppercase tracking-wider text-neutral-400 dark:text-white/30">{lang === 'en' ? 'READ TIME' : 'WAKTU BACA'}</span>
                              <span className="font-medium text-neutral-800 dark:text-white/80 whitespace-nowrap">{modalReadingTime.value} {lang === 'en' ? modalReadingTime.unitLabel.en.split(' ')[0] : modalReadingTime.unitLabel.id.split(' ')[0]}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Core specifications specs and action link */}
                    <div className="space-y-3" id="modal-tech-stack-group">
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-white/30">Engineered with</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="font-mono text-[10px] text-neutral-700 dark:text-white/75 px-2.5 py-0.5 bg-neutral-50 dark:bg-white/5 border border-neutral-200/50 dark:border-white/5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-2" id="modal-action-row">
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-normal hover:opacity-90 active:scale-98 transition-all font-mono text-[11px] shadow-sm cursor-pointer"
                        id="modal-external-link"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'Open Live App' : 'Buka Aplikasi'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })()}
        </AnimatePresence>

        {/* Full-Screen Immersive Lightbox Zoom Modal */}
        <AnimatePresence>
          {zoomImage && selectedProject && (() => {
            const projectImages = selectedProject.images && selectedProject.images.length > 0 
              ? selectedProject.images 
              : [selectedProject.image];
            const currentZoomIdx = projectImages.indexOf(zoomImage);

            return (
              <div 
                className="fixed inset-0 bg-neutral-950/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
                onClick={() => setZoomImage(null)}
                id="fullscreen-lightbox-overlay"
              >
                {/* Top Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomImage(null);
                  }}
                  className="absolute top-6 right-6 z-55 p-3 rounded-full bg-neutral-900/80 text-white/90 hover:bg-neutral-800 border border-white/10 shadow-lg cursor-pointer transition-all"
                  id="lightbox-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Lightbox Main Image & Navigation controls */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="relative max-w-5xl max-h-[82vh] w-full h-full flex items-center justify-center"
                  onClick={e => e.stopPropagation()}
                  id="lightbox-content-container"
                >
                  <img
                    src={zoomImage}
                    alt="Enlarged detailed screenshot"
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/15"
                    id="lightbox-main-img"
                  />

                  {/* Left Navigation Arrow in Lightbox */}
                  {projectImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const prevIdx = currentZoomIdx === 0 ? projectImages.length - 1 : currentZoomIdx - 1;
                          setZoomImage(projectImages[prevIdx]);
                          setActiveImageIndex(prevIdx);
                        }}
                        className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 z-55 p-3 rounded-full bg-neutral-900/80 text-white/90 hover:bg-white hover:text-neutral-950 border border-white/10 shadow-lg cursor-pointer transition-all"
                        id="lightbox-prev-btn"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const nextIdx = currentZoomIdx === projectImages.length - 1 ? 0 : currentZoomIdx + 1;
                          setZoomImage(projectImages[nextIdx]);
                          setActiveImageIndex(nextIdx);
                        }}
                        className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 z-55 p-3 rounded-full bg-neutral-900/80 text-white/90 hover:bg-white hover:text-neutral-950 border border-white/10 shadow-lg cursor-pointer transition-all"
                        id="lightbox-next-btn"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </motion.div>

                {/* Status bar */}
                <div className="absolute bottom-6 text-white/65 font-mono text-xs select-none bg-neutral-900/80 border border-white/5 py-1 px-4 rounded-full" id="lightbox-counter">
                  {currentZoomIdx + 1} / {projectImages.length} • {selectedProject.title[lang]}
                </div>
              </div>
            );
          })()}
        </AnimatePresence>

      </div>
    </section>
  );
};
