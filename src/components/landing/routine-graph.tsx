"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Pill, Wallet, Clock, Check, ArrowRight } from "lucide-react";

const cards = [
  {
    icon: Pill,
    label: "PRODUCTS USED",
    oldValue: "Was 12+ Products",
    newValue: "Now 1 Treatment Program",
    percent: 83,
    caption: "Reduction",
    pillText: "One Personalized Program",
  },
  {
    icon: Wallet,
    label: "MONTHLY COST",
    oldValue: "Was ₹4,600",
    newValue: "Now ₹1,999",
    percent: 57,
    caption: "Savings",
    pillText: "One Simple Price",
  },
  {
    icon: Clock,
    label: "TIME INVESTED",
    oldValue: "Was 45 Min/Day",
    newValue: "Now 5 Min/Day",
    percent: 89,
    caption: "Less Time",
    pillText: "More Time for You",
  },
];

const RING_RADIUS = 46;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function ProgressRing({ percent }: { percent: number }) {
  return (
    <div className="relative h-[120px] w-[120px]">
      <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
        <circle
          cx="55"
          cy="55"
          r={RING_RADIUS}
          fill="none"
          stroke="var(--surface)"
          strokeWidth="10"
        />
        <motion.circle
          cx="55"
          cy="55"
          r={RING_RADIUS}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          initial={{ strokeDashoffset: RING_CIRCUMFERENCE }}
          whileInView={{ strokeDashoffset: RING_CIRCUMFERENCE * (1 - percent / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center font-display text-2xl text-primary-dark"
      >
        {percent}%
      </motion.span>
    </div>
  );
}

function RoutineCard({ card, index }: { card: (typeof cards)[number]; index: number }) {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center rounded-3xl bg-white p-8 shadow-[0_2px_12px_rgba(28,32,36,0.05)] hover:shadow-[0_20px_40px_rgba(28,32,36,0.12)] hover:-translate-y-1.5 transition-all duration-300"
    >
      <span className="flex items-center justify-center h-12 w-12 rounded-full bg-surface mb-5">
        <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
      </span>

      <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted mb-2">
        {card.label}
      </span>
      <span className="text-xs text-muted/70 line-through mb-1">{card.oldValue}</span>
      <span className="font-display text-xl text-primary-dark mb-6">{card.newValue}</span>

      <ProgressRing percent={card.percent} />
      <span className="text-xs font-medium text-muted mt-2 mb-6">{card.caption}</span>

      <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 text-success px-4 py-2 text-xs font-semibold">
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
        {card.pillText}
      </span>
    </motion.div>
  );
}

export default function RoutineGraph() {
  return (
    <section className="relative overflow-hidden">
      {/* Layered background — soft ivory top fading into page background, subtle corner glows + faint contour lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--surface) 0%, var(--surface) 45%, var(--background) 100%)",
          }}
        />
        <div
          className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)", filter: "blur(140px)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)", filter: "blur(140px)" }}
        />
        <svg className="absolute top-0 right-0 w-[480px] h-[360px] opacity-[0.07]" viewBox="0 0 480 360" fill="none">
          <path d="M480 60C380 20 300 110 200 60C130 24 60 60 0 30" stroke="var(--accent)" strokeWidth="2" fill="none" />
          <path d="M480 140C390 100 310 190 210 140C140 104 70 140 10 110" stroke="var(--accent)" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4 block">
              Better Routine. Better You.
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-primary-dark leading-tight">
              Simplify Your Health Routine
            </h2>
            <p className="mt-4 text-lg text-muted">
              Personalized treatment that fits your life.
            </p>
          </div>

          <div className="-mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <RoutineCard key={card.label} card={card} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 rounded-3xl bg-primary-dark shadow-lg px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-5"
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-accent shrink-0" />
              <p className="text-sm sm:text-base text-white">
                Join <span className="text-accent font-semibold">50,000+</span> men who simplified their health routine
              </p>
            </div>
            <Link
              href="/assessment"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent/90 transition-all shrink-0"
            >
              Start Free Assessment
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
