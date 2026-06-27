import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Language, TranslationDict } from "./types";
import { translations } from "./data";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { SkillsCarousel } from "./components/SkillsCarousel";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { ProjectGallery } from "./components/ProjectGallery";
import { StatsDashboard } from "./components/StatsDashboard";
import { TestimonialsMarquee } from "./components/TestimonialsMarquee";
import { ContactForm } from "./components/ContactForm";
import { AIAssistant } from "./components/AIAssistant";
import {
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  Terminal,
  BookOpen,
  ArrowUp,
  FileDown,
} from "lucide-react";

export default function App() {
  // Splash Screen State
  const [showSplash, setShowSplash] = useState(true);

  // Scroll progress state for color-changing bar
  const [scrollProgress, setScrollProgress] = useState(0);

  // Locale State
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("portfolio-lang");
    return saved === "id" || saved === "en" ? saved : "en";
  });

  // Dark/Light Theme State
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Theme Toggling Animation States
  const [activeTransitionTheme, setActiveTransitionTheme] = useState<
    "light" | "dark" | null
  >(null);
  const [transitionOrigin, setTransitionOrigin] = useState({
    x: "50%",
    y: "50%",
  });

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navbar Visibility State
  const [visible, setVisible] = useState(true);

  // Scroll to Top Button Visibility State
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Active translation dictionary
  const dict: TranslationDict = translations[lang];

  // Language switcher active handler
  const toggleLanguage = () => {
    const nextLang: Language = lang === "en" ? "id" : "en";
    setLang(nextLang);
    localStorage.setItem("portfolio-lang", nextLang);
  };

  // Theme Toggler
  const toggleTheme = (e?: React.MouseEvent) => {
    const nextTheme = theme === "light" ? "dark" : "light";

    // Set originating center coordinates for circular clip-path expansion
    if (e && e.clientX && e.clientY) {
      setTransitionOrigin({
        x: `${e.clientX}px`,
        y: `${e.clientY}px`,
      });
    } else {
      setTransitionOrigin({ x: "50%", y: "50%" });
    }

    // Trigger full screen visual expansion state
    setActiveTransitionTheme(nextTheme);

    // Apply the theme change 150ms into the wave so it flips seamlessly
    setTimeout(() => {
      setTheme(nextTheme);
      localStorage.setItem("portfolio-theme", nextTheme);
    }, 150);

    // Fade overlay and allow user interaction again after transition completes
    setTimeout(() => {
      setActiveTransitionTheme(null);
    }, 600);
  };

  // Turn off splash screen after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Apply theme to HTML tag
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Dynamic SEO meta updates based on active language (react-helmet lightweight equivalent)
  useEffect(() => {
    // 1. Language HTML Attribute
    document.documentElement.lang = lang;

    // 2. SEO Content Definitions
    const seoData = {
      en: {
        title:
          "Diva Alfahrizy | Mid-level Fullstack Engineer & UI/UX Architect",
        description:
          "Mid-level Fullstack Engineer & UI/UX Architect specializing in high-performance real-time applications, serverless architecture, and modern landing pages.",
        keywords:
          "Mid-level Fullstack Engineer, UI/UX Architect, Diva Alfahrizy, React, Next.js, TypeScript, Portfolio, Web Developer, Web Designer, Technical Architect",
      },
      id: {
        title: "Diva Alfahrizy | Mid-level Fullstack Engineer & UI/UX Arsitek",
        description:
          "Mid-level Fullstack Engineer & UI/UX Architect berspesialisasi dalam membangun aplikasi real-time berkinerja tinggi, arsitektur serverless, dan landing page modern.",
        keywords:
          "Mid-level Fullstack Engineer, UI/UX Architect, Diva Alfahrizy, React, Next.js, TypeScript, Portofolio, Web Developer, Arsitek Teknis",
      },
    };

    const currentSeo = seoData[lang];

    // 3. Document Title
    document.title = currentSeo.title;

    // Helper to query and update meta tag attributes safely
    const setMetaTagValue = (selector: string, value: string) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute("content", value);
      }
    };

    // 4. Synchronize Meta Tags
    setMetaTagValue('meta[name="description"]', currentSeo.description);
    setMetaTagValue('meta[name="keywords"]', currentSeo.keywords);
    setMetaTagValue('meta[property="og:title"]', currentSeo.title);
    setMetaTagValue('meta[property="og:description"]', currentSeo.description);
    setMetaTagValue('meta[name="twitter:title"]', currentSeo.title);
    setMetaTagValue('meta[name="twitter:description"]', currentSeo.description);
  }, [lang]);

  // Scroll listener to hide/show navbar & track scroll status
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY;

      // Calculate scroll progress for the progress bar
      const winScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);

      // Show scroll-to-top button if scrolled down past 300px
      if (currentScrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Always show navbar near the top of the page (within 50px)
      if (currentScrollY < 50) {
        setVisible(true);
      } else if (Math.abs(difference) > 8) {
        // scroll threshold in pixels
        if (difference > 0) {
          // scrolling down -> hide navbar
          setVisible(false);
          setMobileMenuOpen(false);
        } else {
          // scrolling up -> show navbar
          setVisible(true);
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Smooth scroll back to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="min-h-screen bg-white dark:bg-[#0A0A0B] text-neutral-800 dark:text-[#E2E2E2] transition-colors duration-300 font-sans selection:bg-amber-500/20"
      id="portfolio-app-root"
    >
      {/* Immersive Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[100] transition-all duration-75 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 dark:from-amber-400 dark:via-orange-400 dark:to-rose-500 origin-left"
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-indicator"
      ></div>

      {/* Splash Screen */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#0A0A0B] flex flex-col items-center justify-center p-6 text-white"
            id="app-splash-screen"
          >
            {/* Ambient glowing fields */}
            <div className="absolute inset-x-0 top-1/4 -translate-y-1/2 flex justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] rounded-full bg-amber-500/10 blur-[80px]"></div>
            </div>

            <div className="relative flex flex-col items-center max-w-sm text-center">
              {/* Monogram DA */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-mono font-bold text-xl shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                id="splash-monogram"
              >
                DA
              </motion.div>

              {/* Designer Information */}
              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-6 font-sans text-xl md:text-2xl font-light tracking-tight text-white/90"
              >
                Diva Alfahrizy
              </motion.h1>

              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-1.5 font-mono text-[10px] text-amber-500/85 uppercase tracking-widest"
              >
                {lang === "en"
                  ? "Technical Architect Portfolio"
                  : "Portofolio Arsitek Teknis"}
              </motion.p>

              {/* Progress animation line */}
              <div className="mt-10 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                ></motion.div>
              </div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="mt-3.5 font-mono text-[9px] text-white/50 tracking-wider"
              >
                {lang === "en"
                  ? "INITIALIZING SYSTEM..."
                  : "MEMPERSIAPKAN SISTEM..."}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Header Navbar */}
      <header
        className={`fixed top-0 inset-x-0 bg-white/85 dark:bg-[#0A0A0B]/85 backdrop-blur-md border-b border-neutral-200/50 dark:border-white/5 z-40 transition-all duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
        id="main-navigation-header"
      >
        <div
          className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between"
          id="navbar-container"
        >
          {/* Brand/Signature */}
          <button
            onClick={() => scrollToSection("hero-section")}
            className="flex items-center gap-2.5 font-bold text-lg text-neutral-900 dark:text-white cursor-pointer group"
            id="nav-logo"
          >
            <div
              className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white/5 border dark:border-white/15 flex items-center justify-center text-white dark:text-white font-mono font-bold group-hover:rotate-6 transition-transform text-xs"
              id="logo-icon"
            >
              DA
            </div>
            <div className="text-left leading-none" id="logo-text">
              <span className="block font-sans tracking-tight">
                Diva Alfahrizy
              </span>
              <span className="block text-[10px] font-mono text-neutral-400 dark:text-white/30 font-normal mt-0.5 uppercase tracking-wider">
                TECHNICAL ARCHITECT
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider uppercase font-medium"
            id="desktop-links"
          >
            <button
              onClick={() => scrollToSection("about-section")}
              className="text-neutral-500 hover:text-neutral-900 dark:text-white/40 dark:hover:text-white transition-colors cursor-pointer"
            >
              {dict.nav.about}
            </button>
            <button
              onClick={() => scrollToSection("tech-skills-anchor")}
              className="text-neutral-400 hover:text-neutral-900 dark:text-white/40 dark:hover:text-white transition-colors cursor-pointer"
            >
              {dict.nav.skills}
            </button>
            <button
              onClick={() => scrollToSection("experience-section")}
              className="text-neutral-500 hover:text-neutral-900 dark:text-white/40 dark:hover:text-white transition-colors cursor-pointer"
            >
              {dict.nav.experience}
            </button>
            <button
              onClick={() => scrollToSection("projects-section")}
              className="text-neutral-500 hover:text-neutral-900 dark:text-white/40 dark:hover:text-white transition-colors cursor-pointer"
            >
              {dict.nav.projects}
            </button>
            <button
              onClick={() => scrollToSection("contact-section")}
              className="text-neutral-500 hover:text-neutral-900 dark:text-white/40 dark:hover:text-white transition-colors cursor-pointer"
            >
              {dict.nav.contact}
            </button>
          </nav>

          {/* Configuration Utilities (Language & Theme switches) */}
          <div
            className="hidden lg:flex items-center gap-35"
            id="utility-switches"
          >
            {/* Bilingual toggle button (ID|EN) */}
            <button
              onClick={toggleLanguage}
              className="p-2 px-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-white/5 text-neutral-500 dark:text-white/40 font-mono text-xs transition-all cursor-pointer flex items-center gap-1.5 border border-neutral-200 dark:border-white/10"
              title={lang === "en" ? "Ganti Bahasa" : "Switch Language"}
              id="lang-toggler-btn"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "EN" : "ID"}</span>
            </button>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 px-2.5 rounded-lg hover:bg-neutral-50 dark:hover:bg-white/5 text-neutral-500 dark:text-white/40 transition-all cursor-pointer border border-neutral-200 dark:border-white/10"
              title={
                theme === "light"
                  ? "Activate dark theme"
                  : "Activate light theme"
              }
              id="theme-toggler-btn"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>
          </div>

          {/* Mobile Right Controls Menu Toggle */}
          <div
            className="flex lg:hidden items-center gap-2"
            id="mobile-controls-row"
          >
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-400"
              id="mobile-theme-toggler-btn"
            >
              {theme === "light" ? (
                <Moon className="w-4.5 h-4.5" />
              ) : (
                <Sun className="w-4.5 h-4.5 text-amber-400" />
              )}
            </button>
            <button
              onClick={toggleLanguage}
              className="p-2 font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400"
              id="mobile-lang-toggler-btn"
            >
              {lang === "en" ? "EN" : "ID"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-700 dark:text-gray-200"
              id="mobile-hamburger-btn"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Smooth backdrop overlay with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 top-20 bg-neutral-950/20 dark:bg-black/40 backdrop-blur-md z-30 lg:hidden cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
              id="mobile-drawer-overlay"
            />

            {/* Elevated mobile menu container with layout animation */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="fixed inset-x-0 top-20 bg-white/95 dark:bg-[#111113]/95 border-b border-neutral-200 dark:border-white/5 z-35 shadow-2xl lg:hidden flex flex-col p-6 space-y-4"
              id="mobile-drawer-menu"
            >
              <button
                onClick={() => scrollToSection("about-section")}
                className="text-left py-2 font-medium text-neutral-600 dark:text-white/75 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-sm font-sans"
              >
                {dict.nav.about}
              </button>
              <button
                onClick={() => scrollToSection("tech-skills-anchor")}
                className="text-left py-2 font-medium text-neutral-600 dark:text-white/75 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-sm font-sans"
              >
                {dict.nav.skills}
              </button>
              <button
                onClick={() => scrollToSection("experience-section")}
                className="text-left py-2 font-medium text-neutral-600 dark:text-white/75 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-sm font-sans"
              >
                {dict.nav.experience}
              </button>
              <button
                onClick={() => scrollToSection("projects-section")}
                className="text-left py-2 font-medium text-neutral-600 dark:text-white/75 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-sm font-sans"
              >
                {dict.nav.projects}
              </button>
              <button
                onClick={() => scrollToSection("contact-section")}
                className="text-left py-2 font-medium text-neutral-600 dark:text-white/75 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-sm font-sans"
              >
                {dict.nav.contact}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Sections Core Layout */}
      <main id="portfolio-main-layout">
        {/* Hero Landing */}
        <Hero
          lang={lang}
          dict={dict}
          scrollToContact={() => scrollToSection("contact-section")}
          scrollToProjects={() => scrollToSection("projects-section")}
        />

        {/* Owner Introduction About Section */}
        <AboutSection lang={lang} dict={dict} />

        {/* Anchor point for skills */}
        <div id="tech-skills-anchor" className="scroll-mt-24"></div>

        {/* Tech skills marquee */}
        <section
          className="py-12 bg-white dark:bg-neutral-950"
          id="skills-section"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {dict.skills.title}
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-1 font-mono uppercase tracking-widest">
                {dict.skills.subtitle}
              </p>
            </div>
          </div>
          <SkillsCarousel lang={lang} />
        </section>

        {/* Subtle, animated horizontal divider with aesthetic visual accents */}
        <div
          className="relative max-w-5xl mx-auto px-6 py-6 md:py-10 flex items-center justify-center overflow-hidden"
          id="skills-experience-divider"
        >
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-neutral-200/60 dark:border-white/5"></div>
          </div>
          <div className="relative flex justify-center">
            {/* Ambient glowing core with decorative markers */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "120px", opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-[2px] bg-gradient-to-r from-transparent via-amber-500/80 to-transparent absolute -top-[1px]"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 5 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="bg-white dark:bg-[#0A0A0B] border border-neutral-200 dark:border-white/10 px-3.5 py-1 rounded-full flex items-center gap-2 shadow-sm transition-colors duration-150"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-white/35 uppercase">
                {lang === "en" ? "BIO & TIMELINE" : "RIWAYAT & PERJALANAN"}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/30" />
            </motion.div>
          </div>
        </div>

        {/* Structured Experience list timeline */}
        <ExperienceTimeline lang={lang} dict={dict} />

        {/* Project grid selection */}
        <ProjectGallery lang={lang} dict={dict} />

        {/* Operational execution stats dashboard below the project section */}
        <StatsDashboard lang={lang} dict={dict} />

        {/* Testimonials Marquee Section */}
        <section
          className="py-16 bg-neutral-50/50 dark:bg-neutral-950/20 border-t border-neutral-200/50 dark:border-white/5 scroll-mt-24"
          id="testimonials-section"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8 mb-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                {dict.testimonials?.title}
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-1.5 font-mono uppercase tracking-widest max-w-lg mx-auto">
                {dict.testimonials?.subtitle}
              </p>
            </div>
          </div>
          <TestimonialsMarquee lang={lang} />
        </section>

        {/* Secure validated contact center */}
        <ContactForm lang={lang} dict={dict} />
      </main>

      {/* Footer Branding section */}
      <footer
        className="bg-neutral-50 dark:bg-[#0A0A0B] border-t border-neutral-200 dark:border-white/5 py-16 transition-colors duration-300"
        id="portfolio-standard-footer"
      >
        <div
          className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8"
          id="footer-container"
        >
          <div
            className="text-center md:text-left space-y-2"
            id="footer-branding-block"
          >
            <div className="flex items-center justify-center md:justify-start gap-2 text-neutral-900 dark:text-white font-bold">
              <Terminal className="w-4 h-4 text-neutral-400 dark:text-white/40" />
              <span className="font-sans leading-none tracking-tight">
                Muhammad Diva Alfahrizy
              </span>
            </div>
            <p className="text-neutral-400 dark:text-white/30 text-xs max-w-md font-sans font-light">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Social Badges and details */}
          <div
            className="flex flex-col items-center md:items-end gap-4"
            id="footer-links-block"
          >
            <div
              className="flex flex-wrap items-center justify-center md:justify-end gap-3.5"
              id="footer-social-logos"
            >
              {/* Premium Interactive Resume Download Action Button */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="/diva_alfahrizy_resume.pdf"
                download="Diva_Alfahrizy_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 text-white dark:text-amber-400 border border-amber-500 dark:border-amber-400/20 text-xs font-mono tracking-wide transition-all shadow-xs cursor-pointer"
                title={
                  lang === "en" ? "Download PDF Resume" : "Unduh Resume PDF"
                }
                id="footer-resume-download-btn"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>{dict.footer.downloadResume}</span>
              </motion.a>

              <span className="w-[1px] h-4 bg-neutral-200 dark:bg-white/10 self-center hidden sm:inline-block"></span>

              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Al-Fay"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-550 dark:text-white/40 hover:text-neutral-900 dark:hover:text-white transition-all shadow-xs cursor-pointer"
                id="social-github-link"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/muhammad-diva-alfahrizy-1422ba208/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-550 dark:text-white/40 hover:text-neutral-950 dark:hover:text-blue-400 transition-all shadow-xs cursor-pointer"
                id="social-linkedin-link"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:divaalfahrizy02878@gmail.com"
                className="p-2 rounded-lg bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-550 dark:text-white/40 hover:text-neutral-950 dark:hover:text-amber-500 transition-all shadow-xs cursor-pointer"
                id="social-email-link"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </div>
            <p
              className="text-neutral-400 dark:text-white/30 text-[10px] font-mono tracking-wider whitespace-nowrap"
              id="copyright-text"
            >
              © {new Date().getFullYear()} Diva Alfahrizy. {dict.footer.rights}
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-24 right-8 z-45 p-3 bg-white dark:bg-[#111113] text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white border border-neutral-300 dark:border-white/10 rounded-xl shadow-lg hover:bg-neutral-50 dark:hover:bg-white/5 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center"
            title={lang === "en" ? "Back to Top" : "Kembali ke Atas"}
            id="scroll-to-top-btn"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Dynamic Gemini AI Assistant */}
      <AIAssistant lang={lang} />

      {/* Floating Theme Switcher (Bottom-Left) */}
      <motion.button
        key="floating-theme-switcher"
        onClick={toggleTheme}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 left-8 z-40 p-3 bg-white dark:bg-[#111113] text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white border border-neutral-300 dark:border-white/15 rounded-xl shadow-md hover:bg-neutral-50 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer flex items-center justify-center"
        title={
          theme === "light" ? "Activate dark theme" : "Activate light theme"
        }
        id="floating-theme-toggle-btn"
      >
        <motion.div
          animate={{ rotate: theme === "dark" ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          )}
        </motion.div>
      </motion.button>

      {/* Premium Swipe Theme Transition Overlay */}
      <AnimatePresence>
        {activeTransitionTheme && (
          <motion.div
            key="theme-transition-lock"
            initial={{
              clipPath: `circle(0% at ${transitionOrigin.x} ${transitionOrigin.y})`,
            }}
            animate={{
              clipPath: `circle(150% at ${transitionOrigin.x} ${transitionOrigin.y})`,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center ${
              activeTransitionTheme === "dark" ? "bg-[#0A0A0B]" : "bg-white"
            }`}
            id="premium-theme-transition-overlay"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 0.9, 0], scale: [0.8, 1.1, 1, 1.15] }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className={`w-60 h-60 rounded-full flex flex-col items-center justify-center font-mono text-[9px] tracking-widest uppercase transition-colors duration-150 ${
                activeTransitionTheme === "dark"
                  ? "bg-amber-400/5 text-amber-400 border border-amber-400/15 shadow-[0_0_50px_rgba(245,158,11,0.15)]"
                  : "bg-neutral-900/5 text-neutral-800 border border-neutral-800/10 shadow-lg"
              }`}
            >
              {activeTransitionTheme === "dark" ? (
                <>
                  <Moon className="w-5 h-5 mb-2.5 animate-pulse" />
                  <span>DARKING SYSTEM</span>
                </>
              ) : (
                <>
                  <Sun
                    className="w-5 h-5 mb-2.5 text-amber-500 animate-spin"
                    style={{ animationDuration: "3s" }}
                  />
                  <span>LIGHTING SYSTEM</span>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
