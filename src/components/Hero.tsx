import React from "react";
import { motion } from "motion/react";
import { Language, TranslationDict } from "../types";
import { ArrowUpRight, CheckCircle, Award } from "lucide-react";
import avatarImg from "../assets/images/developer_avatar_1779937938255.png"; // Correctly import the generated avatar

interface HeroProps {
  lang: Language;
  dict: TranslationDict;
  scrollToContact: () => void;
  scrollToProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  dict,
  scrollToContact,
  scrollToProjects,
}) => {
  const getFormattedTitle = () => {
    if (lang === "en") {
      return (
        <>
          Engineering{" "}
          <span className="italic font-serif text-neutral-500 dark:text-white/60 font-normal">
            Global-Scale Products
          </span>{" "}
          Users Love and Investors Back
        </>
      );
    }
    return (
      <>
        Membangun{" "}
        <span className="italic font-serif text-neutral-500 dark:text-white/60 font-normal">
          Produk Skala Global
        </span>{" "}
        yang Dicintai Pengguna & Investor
      </>
    );
  };

  return (
    <section
      className="relative min-h-0 lg:min-h-[750px] xl:min-h-[850px] lg:max-h-[1000px] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white dark:bg-[#0A0A0B] transition-colors duration-300"
      id="hero-section"
    >
      {/* Background elegant architectural line elements */}
      <div
        className="absolute top-0 inset-x-0 h-[1000px] bg-[linear-gradient(to_right,rgba(120,119,198,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,119,198,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
        id="grid-lines"
      ></div>
      <div
        className="absolute top-20 left-1/4 w-96 h-96 bg-neutral-100/40 dark:bg-neutral-800/5 rounded-full blur-3xl pointer-events-none"
        id="glow-orange"
      ></div>

      <div
        className="w-full max-w-7xl mx-auto px-6 md:px-8 relative grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
        id="hero-content-grid"
      >
        {/* Left Column - Main Intro */}
        <div
          className="md:col-span-8 flex flex-col items-start text-left"
          id="hero-text-col"
        >
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-transparent border border-neutral-200 dark:border-white/10 mb-6 text-[10px] uppercase tracking-wider text-neutral-500 dark:text-white/50 font-mono"
            id="availability-badge"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>{dict.hero.badge}</span>
          </motion.div>

          {/* Bilingual Big Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-sans font-light text-neutral-900 dark:text-white leading-[1.08] tracking-tight mb-6"
            id="hero-main-title"
          >
            {getFormattedTitle()}
          </motion.h1>

          {/* Bilingual Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[17px] text-neutral-500 dark:text-white/40 font-sans leading-relaxed mb-8 max-w-2xl font-light italic"
            id="hero-subtitle"
          >
            {dict.hero.subtitle}
          </motion.p>

          {/* Bilingual Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8"
            id="hero-cta-buttons"
          >
            <button
              onClick={scrollToContact}
              className="px-8 py-3.5 rounded-xl text-white bg-neutral-900 dark:bg-white dark:text-neutral-950 font-medium hover:opacity-90 active:scale-98 transition-all text-center cursor-pointer flex items-center justify-center gap-2 group"
              id="cta-primary-btn"
            >
              {dict.hero.ctaPrimary}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button
              onClick={scrollToProjects}
              className="px-8 py-3.5 rounded-xl text-neutral-850 dark:text-white bg-transparent border border-neutral-200 dark:border-white/10 font-medium hover:bg-neutral-50 dark:hover:bg-white/5 active:scale-98 transition-all text-center cursor-pointer"
              id="cta-secondary-btn"
            >
              {dict.hero.ctaSecondary}
            </button>
          </motion.div>

          {/* Startup Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex items-center gap-2.5 border-t border-neutral-100 dark:border-white/5 pt-6 w-full text-neutral-400 dark:text-white/30 font-mono text-xs tracking-wider"
            id="trust-indicators"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></div>
            <span>{dict.hero.subtext}</span>
          </motion.div>
        </div>

        {/* Right Column - Avatar Photo - HIDDEN ON MOBILE (rules specifically dictate this!) */}
        <div
          className="hidden md:flex md:col-span-4 justify-center"
          id="hero-photo-col"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-64 h-80 bg-gradient-to-tr from-neutral-100 to-neutral-200 dark:from-[#1A1A1C] to-[#2A2A2E] rounded-2xl border border-neutral-200 dark:border-white/10 overflow-hidden"
            id="avatar-image-container"
          >
            <img
              src={avatarImg}
              alt="Mid-level Technical Architect Avatar"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-95 contrast-105 hover:grayscale-0 transition-all duration-700"
              id="avatar-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/75 dark:bg-[#0A0A0B]/60 backdrop-blur-md p-3 rounded-xl border border-neutral-200/50 dark:border-white/5 z-20">
              <div className="text-[11px] text-neutral-800 dark:text-white/80 font-medium mb-0.5">
                Based in Pekalongan, Indonesia
              </div>
              <div className="text-[9px] text-neutral-400 dark:text-white/40 uppercase tracking-widest">
                GMT +07:00
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
