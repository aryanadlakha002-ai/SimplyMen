"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The assessment took 3 minutes, products arrived in plain packaging, and a doctor actually called me. Discreet, professional, genuinely helpful.",
    name: "Rahul M.",
    age: 34,
    location: "Mumbai",
    stars: 5,
  },
  {
    quote: "Everything online — assessment to medication — without anyone knowing. Exactly what I needed. The products actually work.",
    name: "Arjun K.",
    age: 42,
    location: "Bengaluru",
    stars: 5,
  },
  {
    quote: "My score showed mild ED. They recommended lifestyle changes + a supplement instead of pushing expensive medication. That integrity matters.",
    name: "Vikrant S.",
    age: 29,
    location: "Delhi",
    stars: 4,
  },
  {
    quote: "The doctor was empathetic and knowledgeable. The combination treatment plan has been a game changer for my relationship.",
    name: "Sameer P.",
    age: 37,
    location: "Pune",
    stars: 5,
  },
];

const stats = [
  { value: "10,000+", label: "Men assessed" },
  { value: "87%", label: "Report improvement" },
  { value: "4.7/5", label: "Average rating" },
  { value: "100%", label: "Confidential" },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-28 lg:py-36 bg-primary-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4 block">
            Real Results
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white leading-tight">
            Trusted by <span className="text-accent">thousands</span> of men
          </h2>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center py-6">
              <div className="text-3xl sm:text-4xl font-display text-gold">
                {s.value}
              </div>
              <div className="text-sm text-white/50 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="rounded-2xl bg-white/[0.06] border border-white/[0.08] p-6 hover:bg-white/[0.09] transition-colors"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className={`h-4 w-4 ${
                      j < t.stars
                        ? "fill-gold text-gold"
                        : "fill-white/10 text-white/10"
                    }`}
                  />
                ))}
              </div>

              <div className="relative mb-5">
                <Quote className="absolute -top-1 -left-1 h-5 w-5 text-accent/20" />
                <p className="text-sm text-white/70 leading-relaxed pl-5 italic">
                  {t.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <p className="text-sm font-semibold text-white">
                  {t.name}, {t.age}
                </p>
                <p className="text-xs text-white/40">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
