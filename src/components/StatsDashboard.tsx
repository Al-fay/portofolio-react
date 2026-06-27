import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Language, TranslationDict } from "../types";
import {
  Briefcase,
  Layers,
  Workflow,
  Building2,
  Globe2,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  ChevronRight,
  Database,
} from "lucide-react";

const AnimatedCounter: React.FC<{
  value: number;
  duration?: number;
  suffix?: string;
  isDecimal?: boolean;
}> = ({ value, duration = 1000, suffix = "", isDecimal = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(progress * value);
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

interface StatsDashboardProps {
  lang: Language;
  dict: TranslationDict;
}

type TabType = "projects" | "experience" | "integrations";

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  lang,
  dict,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("projects");

  // Interactive translations specific to statistics
  const dashboardContent = {
    en: {
      sectionTitle: "Operational Execution Dashboard",
      sectionSubtitle:
        "Performance metrics, real-time workload division, and architectural execution highlights.",
      tabs: {
        projects: "Projects Breakdown",
        experience: "Career Milestones",
        integrations: "System & SLA",
      },
      projectsBreakdown: {
        title: "Project Allocations & Contributions",
        subtitle:
          "Breakdown of 42+ completed platforms and mobile products across distinct markets.",
        webApps: "Web Applications",
        webAppsDesc:
          "Fullstack CMS portals, Bapperida correspondence system, civic report portals, and welfare trackers.",
        mobileApps: "Mobile Banking & Apps",
        mobileAppsDesc:
          "iOS Mobile Banking features, finance tracking, and user transaction portals.",
        openSource: "Open Source & API Tools",
        openSourceDesc:
          "Virtual Account automated gateways, IT ticketers, and developer utilities.",
        metricsHeader: "Distribution Share",
      },
      milestones: {
        title: "Professional Progression & Engineering Speed",
        subtitle:
          "Chronological development and real impact created per epoch.",
        kopsYear: "2024 - Present",
        kopsTitle: "Mid-level Fullstack Developer & UI/UX Architect",
        kopsCompany: "Kospin Jasa Syariah",
        kopsPoints: [
          "Reduced IT ticket latency through custom ticket systems, streamlining cross-division approvals.",
          "Integrated secure automated billing linked to corporate bank Virtual Accounts.",
          "Maintained high-availability iOS m-Banking edits for cooperative cash flows.",
        ],
        freelanceYear: "2022 - 2024",
        freelanceTitle: "Freelance Fullstack Developer & Designer",
        freelanceCompany: "Self-Employed Contracts",
        freelancePoints: [
          "Engineered civic feedback websites for village transparency, gaining high local adoption.",
          "Developed welfare tracking platforms directly benefiting public aid distribution.",
          "Successfully built responsive, custom CMS business suites for diverse enterprises.",
        ],
      },
      integrations: {
        title: "System Security, SLA, & Digital Efficiency",
        subtitle:
          "99.9% uptime reliability and enterprise-grade SLA service resolution.",
        vaCardTitle: "Bank Virtual Account (VA) Gateway",
        vaCardDesc:
          "Full automated billing matching with corporate banks. Zero manual ledger updates needed.",
        indexingTitle: "Ultra-Fast File Indexing",
        indexingDesc:
          "Bapperida record lookup system retrieving letters and archives in less than 400 milliseconds.",
        slaTitle: "IT Ticketing SLA",
        slaDesc:
          "Fast issue resolution and inter-department request automation with full activity tracking.",
      },
    },
    id: {
      sectionTitle: "Dasbor Eksekusi Operasional",
      sectionSubtitle:
        "Metrik kinerja nyata, distribusi beban kerja langsung, dan poin-poin rekayasa sistem.",
      tabs: {
        projects: "Distribusi Proyek",
        experience: "Tonggak Karier",
        integrations: "Keandalan & SLA",
      },
      projectsBreakdown: {
        title: "Alokasi Proyek & Spesialisasi",
        subtitle:
          "Analisis dari 42+ website dan aplikasi mobile yang dibuat untuk berbagai kebutuhan pasar.",
        webApps: "Aplikasi Web Fullstack",
        webAppsDesc:
          "Website profil bisnis kustom, sistem surat-menyurat Bapperida, portal Dinsos & pengaduan desa.",
        mobileApps: "Aplikasi & Fitur Mobile",
        mobileAppsDesc:
          "Pengembangan m-Banking iOS, pelacak finansial koperasi, dan UI transaksi ringkas.",
        openSource: "Gerbang API & Sistem Internal",
        openSourceDesc:
          "Integrasi Virtual Account perbankan, IT ticketing desk, dan tools otomatisasi pengembang.",
        metricsHeader: "Proporsi Distribusi",
      },
      milestones: {
        title: "Progres Portofolio & Kecepatan Rekayasa",
        subtitle:
          "Pencapaian profesional dan dampak arsitektur sistem dari tahun ke tahun.",
        kopsYear: "2024 - Sekarang",
        kopsTitle: "Developer Fullstack Mid-level",
        kopsCompany: "Kospin Jasa Syariah",
        kopsPoints: [
          "Memangkas waktu birokrasi request IT antar divisi menggunakan IT Desk kustom.",
          "Menyatukan pembayaran SPP digital langsung ke jaringan Virtual Account perbankan komersial.",
          "Mengambil alih peningkatan performa dan penambahan fitur m-Banking iOS anggota.",
        ],
        freelanceYear: "2022 - 2024",
        freelanceTitle: "Freelance Fullstack Developer & Designer",
        freelanceCompany: "Kontrak Mandiri",
        freelancePoints: [
          "Menciptakan sistem pelaporan sarpras Desa Gandu guna mewujudkan transparansi penuh kelurahan.",
          "Membuat web pemohon bansos terpadu untuk Dinsos Kab. Pekalongan secara aman & tepat sasaran.",
          "Menerapkan website company profile dinamis berbasis CMS kustom yang modern dan ramah SEO.",
        ],
      },
      integrations: {
        title: "Keamanan Sistem, SLA, & Efisiensi Digital",
        subtitle:
          "Sertifikasi 99.9% keandalan sistem bebas gangguan dan pemenuhan layanan IT prima.",
        vaCardTitle: "Gerbang Virtual Account Bank",
        vaCardDesc:
          "Pencocokan pembayaran otomatis realtime dengan bank. Eliminasi total rekonsiliasi manual.",
        indexingTitle: "Indeks Arsip Super Cepat",
        indexingDesc:
          "Sistem pencarian surat nirkertas Bapperida yang menyaring dokumen dalam waktu di bawah 400ms.",
        slaTitle: "SLA IT Ticketing",
        slaDesc:
          "Pemberian solusi cepat dan otomatisasi alur kerja departemen dengan audit log transparan.",
      },
    },
  };

  const content = lang === "id" ? dashboardContent.id : dashboardContent.en;

  return (
    <section
      className="py-20 bg-neutral-50/80 dark:bg-[#070708] border-t border-neutral-200/50 dark:border-white/5 scroll-mt-24"
      id="stats-dashboard-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 border border-amber-500/20 dark:border-amber-400/20 px-3.5 py-1 rounded-full bg-amber-500/5"
          >
            SYSTEM STATISTICS & ANALYTICS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-sans font-light text-neutral-950 dark:text-white mt-4 tracking-tight"
          >
            {content.sectionTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-neutral-500 dark:text-neutral-400 text-xs mt-2 max-w-2xl mx-auto font-light font-sans"
          >
            {content.sectionSubtitle}
          </motion.p>
        </div>

        {/* 3 columns Highlight Cards (Interactive Tabs) */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          id="stats-hero-grid"
        >
          {/* Card 1: Total Projects */}
          <motion.button
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setActiveTab("projects")}
            className={`text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between h-44 ${
              activeTab === "projects"
                ? "bg-neutral-900 border-neutral-800 dark:bg-white text-white dark:text-neutral-950 shadow-lg"
                : "bg-white dark:bg-[#111113] border-neutral-200 dark:border-white/5 text-neutral-900 dark:text-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`p-2 rounded-xl text-xs font-mono select-none ${
                  activeTab === "projects"
                    ? "bg-white/10 dark:bg-neutral-100 text-amber-400 dark:text-amber-600"
                    : "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}
              >
                <Layers className="w-4 h-4" />
              </span>
              <span
                className={`text-[10px] font-mono uppercase tracking-wider ${activeTab === "projects" ? "text-neutral-300 dark:text-neutral-600" : "text-neutral-400 dark:text-white/30"}`}
              >
                {content.tabs.projects}
              </span>
            </div>

            <div className="mt-4">
              <div className="text-4xl md:text-5xl font-mono font-bold tracking-tight">
                <AnimatedCounter value={42} suffix="+" />
              </div>
              <p
                className={`text-xs mt-1 font-sans ${activeTab === "projects" ? "text-neutral-300 dark:text-neutral-600" : "text-neutral-500 dark:text-white/40"}`}
              >
                {lang === "en"
                  ? "Total Projects Executed"
                  : "Total Proyek Diselesaikan"}
              </p>
            </div>

            {activeTab === "projects" && (
              <motion.div
                layoutId="active-indicator"
                className="absolute right-3 bottom-3 text-amber-500 dark:text-amber-600"
              >
                <CheckCircle2 className="w-5 h-5 fill-current text-white dark:text-neutral-950 stroke-amber-500 dark:stroke-amber-600" />
              </motion.div>
            )}
          </motion.button>

          {/* Card 2: Years of Experience */}
          <motion.button
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setActiveTab("experience")}
            className={`text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between h-44 ${
              activeTab === "experience"
                ? "bg-neutral-900 border-neutral-800 dark:bg-white text-white dark:text-neutral-950 shadow-lg"
                : "bg-white dark:bg-[#111113] border-neutral-200 dark:border-white/5 text-neutral-900 dark:text-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`p-2 rounded-xl text-xs font-mono select-none ${
                  activeTab === "experience"
                    ? "bg-white/10 dark:bg-neutral-100 text-amber-400 dark:text-amber-600"
                    : "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}
              >
                <Briefcase className="w-4 h-4" />
              </span>
              <span
                className={`text-[10px] font-mono uppercase tracking-wider ${activeTab === "experience" ? "text-neutral-300 dark:text-neutral-600" : "text-neutral-400 dark:text-white/30"}`}
              >
                {content.tabs.experience}
              </span>
            </div>

            <div className="mt-4">
              <div className="text-4xl md:text-5xl font-mono font-bold tracking-tight">
                <AnimatedCounter value={4} suffix="+" />
              </div>
              <p
                className={`text-xs mt-1 font-sans ${activeTab === "experience" ? "text-neutral-300 dark:text-neutral-600" : "text-neutral-500 dark:text-white/40"}`}
              >
                {lang === "en"
                  ? "Years of Practical Coding"
                  : "Tahun Pengalaman Kerja"}
              </p>
            </div>

            {activeTab === "experience" && (
              <motion.div
                layoutId="active-indicator"
                className="absolute right-3 bottom-3 text-amber-500 dark:text-amber-600"
              >
                <CheckCircle2 className="w-5 h-5 fill-current text-white dark:text-neutral-950 stroke-amber-500 dark:stroke-amber-600" />
              </motion.div>
            )}
          </motion.button>

          {/* Card 3: Integration Rates */}
          <motion.button
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setActiveTab("integrations")}
            className={`text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between h-44 ${
              activeTab === "integrations"
                ? "bg-neutral-900 border-neutral-800 dark:bg-white text-white dark:text-neutral-950 shadow-lg"
                : "bg-white dark:bg-[#111113] border-neutral-200 dark:border-white/5 text-neutral-900 dark:text-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`p-2 rounded-xl text-xs font-mono select-none ${
                  activeTab === "integrations"
                    ? "bg-white/10 dark:bg-neutral-100 text-amber-400 dark:text-amber-600"
                    : "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}
              >
                <Workflow className="w-4 h-4" />
              </span>
              <span
                className={`text-[10px] font-mono uppercase tracking-wider ${activeTab === "integrations" ? "text-neutral-300 dark:text-neutral-600" : "text-neutral-400 dark:text-white/30"}`}
              >
                {content.tabs.integrations}
              </span>
            </div>

            <div className="mt-4">
              <div className="text-4xl md:text-5xl font-mono font-bold tracking-tight">
                <AnimatedCounter value={99.9} suffix="%" isDecimal={true} />
              </div>
              <p
                className={`text-xs mt-1 font-sans ${activeTab === "integrations" ? "text-neutral-300 dark:text-neutral-600" : "text-neutral-500 dark:text-white/40"}`}
              >
                {lang === "en"
                  ? "Core Support SLA & Uptime"
                  : "Uptime Sistem & SLA IT"}
              </p>
            </div>

            {activeTab === "integrations" && (
              <motion.div
                layoutId="active-indicator"
                className="absolute right-3 bottom-3 text-amber-500 dark:text-amber-600"
              >
                <CheckCircle2 className="w-5 h-5 fill-current text-white dark:text-neutral-950 stroke-amber-500 dark:stroke-amber-600" />
              </motion.div>
            )}
          </motion.button>
        </div>

        {/* Informative Stats Details Window (Borders and soft contrast, matching styling guidelines) */}
        <div
          className="bg-white dark:bg-[#111113] border border-neutral-200 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-xs"
          id="stats-dashboard-container"
        >
          <AnimatePresence mode="wait">
            {/* Projects Tab Details */}
            {activeTab === "projects" && (
              <motion.div
                key="projects-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-mono uppercase text-amber-500 dark:text-amber-400 font-semibold tracking-wider">
                      {content.projectsBreakdown.title}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-sans font-light text-neutral-900 dark:text-white tracking-tight leading-snug">
                    {lang === "en"
                      ? "Robust allocation across platforms"
                      : "Alokasi kokoh di berbagai platform"}
                  </h3>
                  <p className="text-neutral-500 dark:text-white/50 text-xs font-light font-sans leading-relaxed">
                    {content.projectsBreakdown.subtitle}
                  </p>

                  {/* List items with hover state micro-animations */}
                  <div className="space-y-4 pt-2">
                    {[
                      {
                        title: content.projectsBreakdown.webApps,
                        desc: content.projectsBreakdown.webAppsDesc,
                        val: "24",
                      },
                      {
                        title: content.projectsBreakdown.mobileApps,
                        desc: content.projectsBreakdown.mobileAppsDesc,
                        val: "10",
                      },
                      {
                        title: content.projectsBreakdown.openSource,
                        desc: content.projectsBreakdown.openSourceDesc,
                        val: "8",
                      },
                    ].map((item, idx) => (
                      <motion.div
                        whileHover={{ x: 3 }}
                        key={idx}
                        className="flex items-start gap-3.5"
                      >
                        <div className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-white/5 font-mono text-[10px] flex items-center justify-center font-bold text-neutral-700 dark:text-neutral-300 mt-0.5">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-mono font-bold text-neutral-900 dark:text-white">
                              {item.title}
                            </h4>
                            <span className="px-2 py-0.5 rounded-md bg-neutral-50 dark:bg-neutral-800 text-[9px] font-mono text-neutral-500 text-amber-500 dark:text-amber-400 font-bold">
                              {item.val} Proj
                            </span>
                          </div>
                          <p className="text-neutral-500 dark:text-white/40 text-[11px] font-light font-sans mt-0.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Simulated Custom CSS Micro Chart (Dynamic Loading Animations) */}
                <div className="bg-neutral-50/50 dark:bg-neutral-950/20 rounded-2xl p-6 border border-neutral-150 dark:border-white/3 flex flex-col justify-center h-full">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-white/40 mb-6 font-semibold">
                    {content.projectsBreakdown.metricsHeader}
                  </h4>
                  <div className="space-y-5">
                    {[
                      {
                        name: content.projectsBreakdown.webApps,
                        percentage: 57,
                        color: "bg-amber-500 text-amber-600",
                      },
                      {
                        name: content.projectsBreakdown.mobileApps,
                        percentage: 24,
                        color:
                          "bg-neutral-800 dark:bg-white text-neutral-800 dark:text-white",
                      },
                      {
                        name: content.projectsBreakdown.openSource,
                        percentage: 19,
                        color:
                          "bg-neutral-400 dark:bg-neutral-600 text-neutral-500",
                      },
                    ].map((bar, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-neutral-800 dark:text-white/80">
                            {bar.name}
                          </span>
                          <span className="font-bold text-neutral-900 dark:text-white">
                            {bar.percentage}%
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-200/50 dark:bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${bar.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: idx * 0.1,
                              ease: "easeOut",
                            }}
                            className={`h-full rounded-full ${bar.color.split(" ")[0]}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-5 border-t border-neutral-200/50 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-white/20">
                    <span>STATUS: HIGH ACCURACY</span>
                    <span>COREDATA SECURED</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Experience Career Milestone Panel */}
            {activeTab === "experience" && (
              <motion.div
                key="experience-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-mono uppercase text-amber-500 dark:text-amber-400 font-semibold tracking-wider">
                    {content.milestones.title}
                  </span>
                </div>
                <p className="text-neutral-500 dark:text-white/50 text-xs font-light font-sans max-w-xl">
                  {content.milestones.subtitle}
                </p>

                {/* Professional History Visual Milestones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative mt-4">
                  {/* Milestones Card 1: Kospin Jasa Syariah */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-5 rounded-2xl bg-neutral-50/50 dark:bg-neutral-950/20 border border-neutral-150 dark:border-white/3 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-mono font-bold text-neutral-800 dark:text-white">
                          {content.milestones.kopsCompany}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded-md font-semibold">
                        {content.milestones.kopsYear}
                      </span>
                    </div>

                    <h4 className="text-xs font-sans font-medium text-neutral-500 dark:text-white/40 italic">
                      {content.milestones.kopsTitle}
                    </h4>

                    <div className="space-y-1.5 pt-2 border-t border-neutral-200/50 dark:border-white/5">
                      {content.milestones.kopsPoints.map((pt, i) => (
                        <div
                          key={i}
                          className="flex gap-2 text-[11px] text-neutral-600 dark:text-white/50 font-light font-sans items-start"
                        >
                          <span className="text-amber-500 mt-0.5">•</span>
                          <span className="leading-relaxed">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Milestones Card 2: Freelancer */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-5 rounded-2xl bg-neutral-50/50 dark:bg-neutral-950/20 border border-neutral-150 dark:border-white/3 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                        <span className="text-xs font-mono font-bold text-neutral-800 dark:text-white">
                          {content.milestones.freelanceCompany}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono bg-neutral-200 dark:bg-white/5 text-neutral-400 dark:text-white/30 px-2.5 py-0.5 rounded-md font-semibold">
                        {content.milestones.freelanceYear}
                      </span>
                    </div>

                    <h4 className="text-xs font-sans font-medium text-neutral-500 dark:text-white/40 italic">
                      {content.milestones.freelanceTitle}
                    </h4>

                    <div className="space-y-1.5 pt-2 border-t border-neutral-200/50 dark:border-white/5">
                      {content.milestones.freelancePoints.map((pt, i) => (
                        <div
                          key={i}
                          className="flex gap-2 text-[11px] text-neutral-600 dark:text-white/50 font-light font-sans items-start"
                        >
                          <span className="text-neutral-400 dark:text-neutral-600 mt-0.5">
                            •
                          </span>
                          <span className="leading-relaxed">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Integrations & Security SLA Panel */}
            {activeTab === "integrations" && (
              <motion.div
                key="integrations-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* VA Integration Card */}
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-neutral-50/50 dark:bg-neutral-950/20 border border-neutral-150 dark:border-white/3 rounded-2xl p-6 flex flex-col justify-between h-full"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 animate-pulse" />
                    </div>
                    <h4 className="text-xs font-mono font-extrabold uppercase text-green-600 dark:text-green-400 tracking-wider">
                      {content.integrations.vaCardTitle}
                    </h4>
                    <p className="text-[11px] font-sans font-light text-neutral-500 dark:text-white/40 leading-relaxed">
                      {content.integrations.vaCardDesc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-200/50 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400 dark:text-white/20 font-bold">
                    <span>VA PAYMENTS</span>
                    <span className="text-green-500">100% ONLINE</span>
                  </div>
                </motion.div>

                {/* Document Paperless Indexing */}
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-neutral-50/50 dark:bg-neutral-950/20 border border-neutral-150 dark:border-white/3 rounded-2xl p-6 flex flex-col justify-between h-full"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-mono font-extrabold uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                      {content.integrations.indexingTitle}
                    </h4>
                    <p className="text-[11px] font-sans font-light text-neutral-500 dark:text-white/40 leading-relaxed">
                      {content.integrations.indexingDesc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-200/50 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400 dark:text-white/20 font-bold">
                    <span>INDEX SEARCH</span>
                    <span className="text-amber-500">&lt; 400MS</span>
                  </div>
                </motion.div>

                {/* IT SLA ticketing dashboard */}
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-neutral-50/50 dark:bg-neutral-950/20 border border-neutral-150 dark:border-white/3 rounded-2xl p-6 flex flex-col justify-between h-full"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900/10 dark:bg-white/10 text-neutral-905 dark:text-white flex items-center justify-center">
                      <Database className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-mono font-extrabold uppercase text-neutral-800 dark:text-white/80 tracking-wider">
                      {content.integrations.slaTitle}
                    </h4>
                    <p className="text-[11px] font-sans font-light text-neutral-500 dark:text-white/40 leading-relaxed">
                      {content.integrations.slaDesc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-200/50 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400 dark:text-white/20 font-bold">
                    <span>TICKETS SLA</span>
                    <span className="text-neutral-800 dark:text-neutral-300">
                      100% DONE
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
