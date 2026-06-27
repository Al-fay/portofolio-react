import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Language, TranslationDict } from "../types";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

interface ContactFormProps {
  lang: Language;
  dict: TranslationDict;
}

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ lang, dict }) => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    // Trigger touched for all inputs on final attempt
    setTouched({
      name: true,
      email: true,
      company: true,
      message: true,
    });

    if (!form.name.trim()) {
      tempErrors.name = dict.contact.errorRequired;
      isValid = false;
    }

    if (!form.email.trim()) {
      tempErrors.email = dict.contact.errorRequired;
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        tempErrors.email = dict.contact.errorEmail;
        isValid = false;
      }
    }

    if (!form.message.trim()) {
      tempErrors.message = dict.contact.errorRequired;
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);

    // Simulate reliable API processing (Express endpoint / Supabase proxy flow state simulator)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSending(false);
    setIsSuccess(true);
    setForm({ name: "", email: "", company: "", message: "" });
    setTouched({});
  };

  const validateField = (name: string, value: string) => {
    let error: string | undefined = undefined;

    if (name === "name") {
      if (!value.trim()) {
        error = dict.contact.errorRequired;
      }
    } else if (name === "email") {
      if (!value.trim()) {
        error = dict.contact.errorRequired;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = dict.contact.errorEmail;
        }
      }
    } else if (name === "message") {
      if (!value.trim()) {
        error = dict.contact.errorRequired;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Validate instantly if the field has already been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  return (
    <section
      className="py-24 bg-neutral-50 dark:bg-[#0A0A0B] border-t border-neutral-100 dark:border-white/5 transition-colors duration-300"
      id="contact-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8" id="contact-wrapper">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
          id="contact-header"
        >
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-white/50 border border-neutral-200 dark:border-white/10 px-3.5 py-1 rounded-full">
            {dict.nav.contact}
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-sans font-light text-neutral-900 dark:text-white mt-4 tracking-tight"
            id="contact-title"
          >
            {dict.contact.title}
          </h2>
          <p
            className="text-neutral-500 dark:text-white/40 mt-3 font-sans max-w-2xl mx-auto font-light text-sm italic"
            id="contact-subtitle"
          >
            {dict.contact.subtitle}
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          id="contact-inner-grid"
        >
          {/* Info Panels column (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
            id="contact-info-col"
          >
            <div
              className="bg-white dark:bg-[#111113] p-8 rounded-2xl border border-neutral-200/60 dark:border-white/5 shadow-2xs"
              id="info-card-main"
            >
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-white/40 mb-8">
                {lang === "en" ? "Direct Channels" : "Saluran Langsung"}
              </h3>

              <div className="space-y-8" id="info-channel-items">
                <div className="flex items-start gap-4" id="channel-email">
                  <div className="p-2.5 bg-neutral-50 dark:bg-white/5 border border-neutral-200/60 dark:border-white/5 rounded-xl text-neutral-600 dark:text-white/60 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 dark:text-white/30">
                      Email Address
                    </h4>
                    <p className="font-sans font-medium text-neutral-850 dark:text-white text-sm mt-1">
                      divaalfahrizy02878@gmail.com
                    </p>
                    <span className="text-[11px] font-sans text-neutral-400 dark:text-white/30 block mt-0.5 font-light">
                      Typical response under 12 hours.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4" id="channel-location">
                  <div className="p-2.5 bg-neutral-50 dark:bg-white/5 border border-neutral-200/60 dark:border-white/5 rounded-xl text-neutral-600 dark:text-white/60 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 dark:text-white/30">
                      Operating base
                    </h4>
                    <p className="font-sans font-medium text-neutral-850 dark:text-white text-sm mt-1">
                      Pekalongan, Indonesia
                    </p>
                    <span className="text-[11px] font-sans text-neutral-400 dark:text-white/30 block mt-0.5 font-light">
                      Providing technical leadership from SEA timezone.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro FAQ panel for trust */}
            <div
              className="bg-white dark:bg-[#111113] p-6 rounded-2xl border border-neutral-200/60 dark:border-white/5 shadow-2xs"
              id="contact-faq-panel"
            >
              <h4 className="font-medium text-neutral-900 dark:text-white text-xs mb-2 uppercase tracking-wide font-mono">
                🔒 NDAs & IP Protection
              </h4>
              <p className="text-neutral-500 dark:text-white/40 text-xs leading-relaxed font-sans font-light">
                {lang === "en"
                  ? "All initial communications and code consultations are protected under mutual non-disclosure agreements. Intellectual property is fully assigned upon milestones."
                  : "Seluruh komunikasi awal dan konsultasi kode dilindungi oleh klausul kerahasiaan bersama. Hak Kekayaan Intelektual dialihkan penuh setelah milestone selesai."}
              </p>
            </div>
          </motion.div>

          {/* Form Interactive Container Column (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-7"
            id="contact-form-col"
          >
            <div
              className="bg-white dark:bg-[#111113] p-8 rounded-2xl border border-neutral-200/60 dark:border-white/5 shadow-2xs relative overflow-hidden"
              id="form-card-main"
            >
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form-node"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                    id="communication-form"
                  >
                    {/* Name Input */}
                    <div id="fg-name">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-white/45">
                          {dict.contact.name}{" "}
                          <span className="text-neutral-400 dark:text-white/30">
                            *
                          </span>
                        </label>
                        <AnimatePresence>
                          {touched.name && (
                            <motion.span
                              initial={{ opacity: 0, x: 5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 5 }}
                              className={`text-[9px] font-mono uppercase tracking-wider ${
                                errors.name
                                  ? "text-red-500"
                                  : "text-emerald-500"
                              }`}
                            >
                              {errors.name
                                ? lang === "en"
                                  ? "Required"
                                  : "Wajib diisi"
                                : lang === "en"
                                  ? "Complete ✓"
                                  : "Lengkap ✓"}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder={dict.contact.placeholderName}
                          disabled={isSending}
                          className={`w-full pl-4 pr-11 py-3 rounded-xl border bg-transparent font-sans text-xs md:text-sm text-neutral-800 dark:text-white placeholder-neutral-400 dark:placeholder-white/20 focus:outline-none transition-all font-light ${
                            touched.name
                              ? errors.name
                                ? "border-red-500/50 dark:border-red-500/30 bg-red-50/[0.01] dark:bg-red-500/[0.005] focus:border-red-500 focus:ring-1 focus:ring-red-500/10"
                                : "border-emerald-500/50 dark:border-emerald-500/20 bg-emerald-50/[0.01] dark:bg-emerald-500/[0.005] focus:border-emerald-500/80 dark:focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/10"
                              : "border-neutral-200 dark:border-white/10 focus:border-neutral-400 dark:focus:border-white/20"
                          }`}
                          id="input-name"
                        />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                          <AnimatePresence mode="wait">
                            {touched.name &&
                              (errors.name ? (
                                <motion.div
                                  key="name-error-icon"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  className="text-red-500"
                                >
                                  <AlertCircle className="w-4 h-4" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="name-success-icon"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  className="text-emerald-500"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </motion.div>
                              ))}
                          </AnimatePresence>
                        </div>
                      </div>
                      <AnimatePresence>
                        {touched.name && errors.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-1.5 mt-2 text-red-500 text-[10px] font-mono overflow-hidden"
                            id="error-name"
                          >
                            <AlertCircle className="w-3 h-3 animate-pulse" />
                            <span>{errors.name}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Email Input */}
                    <div id="fg-email">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-white/45">
                          {dict.contact.email}{" "}
                          <span className="text-neutral-400 dark:text-white/30">
                            *
                          </span>
                        </label>
                        <AnimatePresence>
                          {touched.email && (
                            <motion.span
                              initial={{ opacity: 0, x: 5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 5 }}
                              className={`text-[9px] font-mono uppercase tracking-wider ${
                                errors.email
                                  ? "text-red-500"
                                  : "text-emerald-500"
                              }`}
                            >
                              {errors.email
                                ? lang === "en"
                                  ? "Invalid"
                                  : "Tidak valid"
                                : lang === "en"
                                  ? "Complete ✓"
                                  : "Lengkap ✓"}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder={dict.contact.placeholderEmail}
                          disabled={isSending}
                          className={`w-full pl-4 pr-11 py-3 rounded-xl border bg-transparent font-sans text-xs md:text-sm text-neutral-800 dark:text-white placeholder-neutral-400 dark:placeholder-white/20 focus:outline-none transition-all font-light ${
                            touched.email
                              ? errors.email
                                ? "border-red-500/50 dark:border-red-500/30 bg-red-50/[0.01] dark:bg-red-500/[0.005] focus:border-red-500 focus:ring-1 focus:ring-red-500/10"
                                : "border-emerald-500/50 dark:border-emerald-500/20 bg-emerald-50/[0.01] dark:bg-emerald-500/[0.005] focus:border-emerald-500/80 dark:focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/10"
                              : "border-neutral-200 dark:border-white/10 focus:border-neutral-400 dark:focus:border-white/20"
                          }`}
                          id="input-email"
                        />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                          <AnimatePresence mode="wait">
                            {touched.email &&
                              (errors.email ? (
                                <motion.div
                                  key="email-error-icon"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  className="text-red-500"
                                >
                                  <AlertCircle className="w-4 h-4" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="email-success-icon"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  className="text-emerald-500"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </motion.div>
                              ))}
                          </AnimatePresence>
                        </div>
                      </div>
                      <AnimatePresence>
                        {touched.email && errors.email && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-1.5 mt-2 text-red-500 text-[10px] font-mono overflow-hidden"
                            id="error-email"
                          >
                            <AlertCircle className="w-3 h-3 animate-pulse" />
                            <span>{errors.email}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Company Input */}
                    <div id="fg-company">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-white/45">
                          {dict.contact.company}
                        </label>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 dark:text-white/30 animate-pulse">
                          {lang === "id" ? "Opsional" : "Optional"}
                        </span>
                      </div>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder={dict.contact.placeholderCompany}
                        disabled={isSending}
                        className={`w-full px-4 py-3 rounded-xl border bg-transparent font-sans text-xs md:text-sm text-neutral-800 dark:text-white placeholder-neutral-400 dark:placeholder-white/20 focus:outline-none transition-all font-light ${
                          touched.company && form.company.trim().length > 0
                            ? "border-emerald-500/40 dark:border-emerald-500/25 bg-emerald-50/[0.01] dark:bg-emerald-500/[0.005] focus:border-emerald-500/80 dark:focus:border-emerald-500/35 focus:ring-1 focus:ring-emerald-500/10"
                            : "border-neutral-200 dark:border-white/10 focus:border-neutral-400 dark:focus:border-white/20"
                        }`}
                        id="input-company"
                      />
                    </div>

                    {/* Message Textarea */}
                    <div id="fg-message">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-white/45">
                          {dict.contact.message}{" "}
                          <span className="text-neutral-400 dark:text-white/30">
                            *
                          </span>
                        </label>
                        <AnimatePresence>
                          {touched.message && (
                            <motion.span
                              initial={{ opacity: 0, x: 5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 5 }}
                              className={`text-[9px] font-mono uppercase tracking-wider ${
                                errors.message
                                  ? "text-red-500"
                                  : "text-emerald-500"
                              }`}
                            >
                              {errors.message
                                ? lang === "en"
                                  ? "Required"
                                  : "Wajib diisi"
                                : lang === "en"
                                  ? "Complete ✓"
                                  : "Lengkap ✓"}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="relative">
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder={dict.contact.placeholderMessage}
                          disabled={isSending}
                          rows={4}
                          className={`w-full pl-4 pr-11 py-3 rounded-xl border bg-transparent font-sans text-xs md:text-sm text-neutral-800 dark:text-white placeholder-neutral-400 dark:placeholder-white/20 focus:outline-none transition-all font-light resize-none ${
                            touched.message
                              ? errors.message
                                ? "border-red-500/50 dark:border-red-500/30 bg-red-50/[0.01] dark:bg-red-500/[0.005] focus:border-red-500 focus:ring-1 focus:ring-red-500/10"
                                : "border-emerald-500/50 dark:border-emerald-500/20 bg-emerald-50/[0.01] dark:bg-emerald-500/[0.005] focus:border-emerald-500/80 dark:focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/10"
                              : "border-neutral-200 dark:border-white/10 focus:border-neutral-400 dark:focus:border-white/20"
                          }`}
                          id="input-message"
                        ></textarea>
                        <div className="absolute right-3.5 top-6 flex items-center gap-1.5 pointer-events-none">
                          <AnimatePresence mode="wait">
                            {touched.message &&
                              (errors.message ? (
                                <motion.div
                                  key="msg-error-icon"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  className="text-red-500"
                                >
                                  <AlertCircle className="w-4 h-4" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="msg-success-icon"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  className="text-emerald-500"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </motion.div>
                              ))}
                          </AnimatePresence>
                        </div>
                      </div>
                      <AnimatePresence>
                        {touched.message && errors.message && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-1.5 mt-1 text-red-500 text-[10px] font-mono overflow-hidden"
                            id="error-message"
                          >
                            <AlertCircle className="w-3 h-3 animate-pulse" />
                            <span>{errors.message}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3.5 rounded-xl text-white dark:text-neutral-950 bg-neutral-900 dark:bg-white font-medium flex items-center justify-center gap-2 hover:opacity-90 active:scale-99 disabled:opacity-50 transition-all shadow-sm cursor-pointer"
                      id="submit-contact-btn"
                    >
                      <Send
                        className={`w-3.5 h-3.5 ${isSending ? "animate-pulse" : ""}`}
                      />
                      <span className="font-mono text-xs tracking-wider uppercase">
                        {isSending ? dict.contact.sending : dict.contact.send}
                      </span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-form-node"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="py-12 flex flex-col items-center text-center space-y-6"
                    id="success-panel-form"
                  >
                    <div
                      className="w-14 h-14 rounded-full bg-transparent border border-emerald-500/40 flex items-center justify-center text-emerald-500 animate-bounce"
                      id="success-icon-wrapper"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <h3
                        className="text-xl font-medium text-neutral-900 dark:text-white"
                        id="success-title-text"
                      >
                        {dict.contact.successTitle}
                      </h3>
                      <p
                        className="text-neutral-500 dark:text-white/40 text-xs md:text-sm max-w-md font-sans leading-relaxed font-light"
                        id="success-body-text"
                      >
                        {dict.contact.successMessage}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 rounded-xl border border-neutral-200 dark:border-white/10 text-[10px] font-mono text-neutral-500 dark:text-white/50 hover:bg-neutral-50 dark:hover:bg-white/5 cursor-pointer uppercase tracking-wider"
                      id="reset-form-btn"
                    >
                      {lang === "en"
                        ? "Transmit Another Inquiry"
                        : "Kirim Pesan Lainnya"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
