"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CONTACT_EMAIL,
  COMPLAINT_EMAIL,
  SUGGESTION_EMAIL,
  SOCIAL_LINKS,
} from "@/lib/constants";

/* ── Types ── */
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;
type FormStatus = "idle" | "submitting" | "submitted";

/* ── Validation ── */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s+\-()]{0,20}$/;

function validateField(name: keyof FormData, value: string): string {
  switch (name) {
    case "name":
      return value.trim().length < 2
        ? "Name must be at least 2 characters"
        : "";
    case "email":
      return !EMAIL_REGEX.test(value)
        ? "Please enter a valid email address"
        : "";
    case "phone":
      return value && !PHONE_REGEX.test(value)
        ? "Please enter a valid phone number"
        : "";
    case "subject":
      return value.trim().length < 3
        ? "Subject must be at least 3 characters"
        : "";
    case "message":
      return value.trim().length < 10
        ? "Message must be at least 10 characters"
        : "";
    default:
      return "";
  }
}

function validateAll(data: FormData): FormErrors {
  const errors: FormErrors = {};
  for (const key of Object.keys(data) as (keyof FormData)[]) {
    const err = validateField(key, data[key]);
    if (err) errors[key] = err;
  }
  return errors;
}

/* ── Icons (inline SVG to avoid external deps) ── */
function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <motion.path
        d="m9 12 2 2 4-4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.3, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ── Contact Info data ── */
const EMAIL_CONTACTS = [
  {
    label: "General Inquiries",
    email: CONTACT_EMAIL,
    description: "For general questions, orders, and product information",
  },
  {
    label: "Customer Support",
    email: COMPLAINT_EMAIL,
    description: "For order issues, returns, and complaints",
  },
  {
    label: "Suggestions",
    email: SUGGESTION_EMAIL,
    description: "We'd love to hear your ideas and feedback",
  },
] as const;

const LOCATIONS = [
  {
    title: "India — Warehouse",
    lines: [
      "Warehouse 1,",
      "Hullahalli Industrial Area,",
      "Bangalore, Karnataka",
    ],
  },
  {
    title: "Dubai — International Office",
    lines: [
      "#Office 213, Prime Tower — 20th Floor,",
      "Business Bay,",
      "Dubai, United Arab Emirates",
    ],
  },
] as const;

/* ── Stagger animation variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ── Helper: Form Field wrapper ── */
function FormField({
  label,
  required,
  optional,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-primary mb-1.5">
        {label}
        {required && <span className="text-gold ml-0.5">*</span>}
        {optional && (
          <span className="text-primary/30 font-normal ml-1.5 text-xs">
            (optional)
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

/* ── Helper: input class styles ── */
function inputStyles(hasError: boolean): string {
  const base =
    "w-full px-4 py-3 rounded-xl border bg-off-white text-primary " +
    "placeholder:text-primary/30 text-sm " +
    "transition-all duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold";

  const errorBorder = hasError
    ? "border-error focus:ring-error/20 focus:border-error"
    : "border-sand-dark/50 hover:border-gold/30";

  return `${base} ${errorBorder}`;
}

/* ── Main Component ── */
export default function ContactUsClient() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [status, setStatus] = useState<FormStatus>("idle");

  /* ---- Handlers ---- */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (touched[name as keyof FormData]) {
        const err = validateField(name as keyof FormData, value);
        setErrors((prev) => ({ ...prev, [name]: err }));
      }
    },
    [touched],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const key = name as keyof FormData;
      setTouched((prev) => ({ ...prev, [key]: true }));
      const err = validateField(key, value);
      setErrors((prev) => ({ ...prev, [key]: err }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const allTouched = Object.keys(formData).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Record<keyof FormData, boolean>,
      );
      setTouched(allTouched);

      const allErrors = validateAll(formData);
      setErrors(allErrors);

      if (Object.keys(allErrors).length > 0) return;

      setStatus("submitting");

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1800));

      setStatus("submitted");
    },
    [formData],
  );

  const handleReset = useCallback(() => {
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setErrors({});
    setTouched({});
    setStatus("idle");
  }, []);

  /* ---- Derived ---- */
  const getFieldProps = (name: keyof FormData) => ({
    name,
    value: formData[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] ? errors[name] : undefined,
  });

  const hasFieldError = (name: keyof FormData): boolean =>
    !!(touched[name] && errors[name]);

  return (
    <main className="min-h-screen bg-sand">
      {/* ================================================================
            Hero Section
          ================================================================ */}
      <section className="relative overflow-hidden bg-primary pt-24 pb-20 sm:pt-32 sm:pb-28">
        {/* Subtle gold gradient overlay */}
        <div className="absolute inset-0 opacity-[0.04] bg-gradient-to-br from-gold/40 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="section-container relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="type-overline-gold inline-block mb-4"
          >
            Get in Touch
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-playfair leading-tight"
          >
            We'd Love to Hear
            <br className="hidden sm:block" /> From You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5 text-white/60 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Have a question, feedback, or just want to say hello? Our team is
            here to help. Reach out and we'll get back to you within 24 hours.
          </motion.p>

          {/* Decorative gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 h-0.5 w-16 bg-gold mx-auto rounded-full origin-center"
          />
        </div>
      </section>

      {/* ================================================================
            Main Content — Contact Info + Form
          ================================================================ */}
      <section className="section-container py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* ── Left Column: Contact Info ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-2 space-y-10"
          >
            {/* Emails */}
            <div>
              <h2 className="type-h4 text-primary mb-6">Email Us</h2>
              <div className="space-y-4">
                {EMAIL_CONTACTS.map((contact) => (
                  <motion.a
                    key={contact.email}
                    href={`mailto:${contact.email}`}
                    variants={itemVariants}
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-white 
                               border border-sand-dark/40 hover:border-gold/30 
                               hover:shadow-gold/10 hover:shadow-md 
                               transition-all duration-300"
                  >
                    <div
                      className="shrink-0 w-10 h-10 rounded-xl bg-gold/10 flex items-center 
                                  justify-center text-gold group-hover:bg-gold 
                                  group-hover:text-primary transition-colors duration-300"
                    >
                      <MailIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-primary">
                        {contact.label}
                      </p>
                      <p className="text-gold text-sm font-mono break-all mt-0.5">
                        {contact.email}
                      </p>
                      <p className="text-xs text-primary/50 mt-0.5">
                        {contact.description}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h2 className="type-h4 text-primary mb-6">Follow Us</h2>
              <motion.div variants={itemVariants} className="flex gap-4">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white border border-sand-dark/40 
                             flex items-center justify-center text-primary/50 
                             hover:text-gold hover:border-gold/30 hover:shadow-gold/10 
                             hover:shadow-md transition-all duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white border border-sand-dark/40 
                             flex items-center justify-center text-primary/50 
                             hover:text-gold hover:border-gold/30 hover:shadow-gold/10 
                             hover:shadow-md transition-all duration-300"
                  aria-label="Follow us on Facebook"
                >
                  <FacebookIcon />
                </a>
              </motion.div>
            </div>

            {/* Locations */}
            <div>
              <h2 className="type-h4 text-primary mb-6">Visit Us</h2>
              <div className="space-y-4">
                {LOCATIONS.map((loc) => (
                  <motion.div
                    key={loc.title}
                    variants={itemVariants}
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-white 
                               border border-sand-dark/40 hover:border-gold/30 
                               hover:shadow-gold/10 hover:shadow-md 
                               transition-all duration-300"
                  >
                    <div
                      className="shrink-0 w-10 h-10 rounded-xl bg-gold/10 flex items-center 
                                  justify-center text-gold"
                    >
                      <MapPinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary mb-1">
                        {loc.title}
                      </p>
                      {loc.lines.map((line, i) => (
                        <p
                          key={i}
                          className="text-sm text-primary/60 leading-relaxed"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right Column: Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-base border border-sand-dark/30">
              <h2 className="type-h3 text-primary mb-2">Send Us a Message</h2>
              <p className="text-sm text-primary/50 mb-8">
                Fill out the form below and we'll respond as soon as possible.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Row: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="Full Name" required>
                    <input
                      {...getFieldProps("name")}
                      type="text"
                      placeholder="John Doe"
                      className={inputStyles(hasFieldError("name"))}
                    />
                  </FormField>

                  <FormField label="Email Address" required>
                    <input
                      {...getFieldProps("email")}
                      type="email"
                      placeholder="john@example.com"
                      className={inputStyles(hasFieldError("email"))}
                    />
                  </FormField>
                </div>

                {/* Phone */}
                <FormField label="Phone Number" optional>
                  <input
                    {...getFieldProps("phone")}
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className={inputStyles(hasFieldError("phone"))}
                  />
                </FormField>

                {/* Subject */}
                <FormField label="Subject" required>
                  <input
                    {...getFieldProps("subject")}
                    type="text"
                    placeholder="How can we help you?"
                    className={inputStyles(hasFieldError("subject"))}
                  />
                </FormField>

                {/* Message */}
                <FormField label="Message" required>
                  <textarea
                    {...getFieldProps("message")}
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    className={`${inputStyles(hasFieldError("message"))} resize-none min-h-[120px]`}
                  />
                </FormField>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary w-full sm:w-auto px-10 py-3.5 text-base"
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <SendIcon />
                        Send Message
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
            Thank You Modal
          ================================================================ */}
      <AnimatePresence>
        {status === "submitted" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center 
                       bg-black/50 backdrop-blur-sm px-4"
            onClick={handleReset}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-10 sm:p-14 max-w-lg w-full 
                         shadow-2xl text-center relative overflow-hidden"
            >
              {/* Decorative top gradient */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 
                            bg-gradient-to-r from-gold via-gold-light to-gold"
              />

              {/* Checkmark */}
              <div className="mx-auto w-20 h-20 mb-6 text-gold">
                <CheckIcon />
              </div>

              {/* Texts */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="type-h2 text-primary mb-3"
              >
                Thank You! 🎉
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-primary/60 text-base leading-relaxed mb-8"
              >
                Your message has been received successfully. Our team will
                review it and get back to you within 24 hours. We appreciate you
                reaching out!
              </motion.p>

              {/* Reset button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={handleReset}
                className="btn-secondary px-8 py-3 text-sm"
              >
                Send Another Message
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
