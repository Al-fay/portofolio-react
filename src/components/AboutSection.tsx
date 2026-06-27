import React from "react";
import { motion } from "motion/react";
import {
  User,
  Sparkles,
  Zap,
  Layers,
  MapPin,
  CheckCircle2,
  Terminal,
  ShieldCheck,
} from "lucide-react";
import { TranslationDict } from "../types";

interface AboutSectionProps {
  lang: "en" | "id";
  dict: TranslationDict;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang, dict }) => {
  if (!dict.about) return null;

  const { title, subtitle, heading, bioParagraph1, bioParagraph2, highlights } =
    dict.about;

  const highlightIcons = [
    <Layers className="w-5 h-5 text-amber-500" />,
    <Zap className="w-5 h-5 text-amber-500" />,
    <Terminal className="w-5 h-5 text-amber-500" />,
  ];

  return (
    <section
      className="py-16 lg:py-24 bg-neutral-50 dark:bg-[#0C0C0E] border-y border-neutral-200/60 dark:border-white/5 relative overflow-hidden"
      id="about-section"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-mono tracking-widest uppercase mb-3"
          >
            <User className="w-3 h-3" />
            <span>{title}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white"
          >
            {heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 dark:text-neutral-400 text-xs mt-2 font-mono uppercase tracking-wider"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Profile Card (Col 4) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 rounded-3xl bg-white dark:bg-[#131316] p-8 border border-neutral-200/80 dark:border-white/10 shadow-xl flex flex-col justify-between relative group overflow-hidden"
            id="owner-profile-card"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {lang === "en" ? "Verified Owner" : "Pemilik Resmi"}
                </span>
                <ShieldCheck className="w-5 h-5 text-neutral-400 dark:text-white/30" />
              </div>

              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 p-[2px] mb-6 shadow-lg shadow-amber-500/15">
                <div className="w-full h-full bg-white dark:bg-[#0A0A0B] rounded-[14px] flex items-center justify-center text-amber-500 font-mono text-2xl md:text-3xl font-bold">
                  DA
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Diva Alfahrizy
              </h3>
              <p className="text-amber-600 dark:text-amber-400 text-xs font-mono font-medium mt-1">
                Mid-Level Fullstack & UI/UX
              </p>

              <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-xs mt-3">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>Indonesia (UTC+7)</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-white/5 space-y-3 font-mono text-xs text-neutral-600 dark:text-neutral-300">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 dark:text-white/40">
                  EXPERIENCE
                </span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  Intermediate / Mid
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 dark:text-white/40">
                  SPECIALTY
                </span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  0ms SPA & APIs
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 dark:text-white/40">
                  STATUS
                </span>
                <span className="text-emerald-500 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Bio & Highlights (Col 8) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
            {/* Bio Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-white dark:bg-[#131316] p-8 md:p-10 border border-neutral-200/80 dark:border-white/10 shadow-xl relative"
              id="owner-bio-content"
            >
              <div className="flex items-center gap-2 text-neutral-400 dark:text-white/40 text-[10px] font-mono uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {lang === "en" ? "Personal Statement" : "Pernyataan Pribadi"}
                </span>
              </div>

              <p className="text-neutral-700 dark:text-neutral-200 text-sm md:text-base leading-relaxed mb-4 font-normal">
                {bioParagraph1}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed font-light">
                {bioParagraph2}
              </p>
            </motion.div>

            {/* Highlights Grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              id="owner-highlights-grid"
            >
              {highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl bg-white dark:bg-[#131316] p-6 border border-neutral-200/70 dark:border-white/10 hover:border-amber-500/40 transition-all duration-300 shadow-sm flex flex-col justify-between"
                  id={`highlight-card-${idx}`}
                >
                  <div className="mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3.5">
                      {highlightIcons[idx] || (
                        <Zap className="w-5 h-5 text-amber-500" />
                      )}
                    </div>
                    <h4 className="font-bold text-neutral-900 dark:text-white text-sm mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                  <div className="h-0.5 w-8 bg-amber-500/40 rounded-full mt-2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
