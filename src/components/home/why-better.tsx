"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Pill,
  Search,
  Store,
  FlaskConical,
  CreditCard,
  User,
  XCircle,
  Package,
  ShieldCheck,
  Truck,
  Activity,
  Calendar,
  HeartHandshake,
  CheckCircle2,
  Shield,
  Lock,
  Users,
  ArrowRight,
} from "lucide-react";

const traditionalItems = [
  { text: "Multiple medicines from different brands", icon: Pill },
  { text: "Self-diagnosis from internet search", icon: Search },
  { text: "Awkward pharmacy visits", icon: Store },
  { text: "Trial-and-error with random products", icon: FlaskConical },
  { text: "Buying supplements separately", icon: CreditCard },
  { text: "No medical guidance or follow-up", icon: User },
];

const simplyMenItems = [
  { text: "One personalized treatment program", icon: Package },
  { text: "Doctor-reviewed clinical assessment", icon: ShieldCheck },
  { text: "Discreet home delivery", icon: Truck },
  { text: "Personalized protocol for your needs", icon: Activity },
  { text: "Complete treatment system", icon: Calendar },
  { text: "Continuous doctor guidance & follow-up", icon: HeartHandshake },
];

const trustBar = [
  { icon: Shield, title: "Doctor Curated", subtitle: "by Medical Experts" },
  { icon: Lock, title: "100% Confidential", subtitle: "Secure Portal" },
  { icon: Truck, title: "Discreet Delivery", subtitle: "Plain Packaging" },
  { icon: Users, title: "50,000+ Men", subtitle: "Successfully Treated" },
];

const ROW_COUNT = 6;

function TraditionalRow({ item, index }: { item: (typeof traditionalItems)[number]; index: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group grid grid-cols-[1fr_auto_auto] items-center gap-3 h-full"
    >
      <span className="text-sm text-muted text-left group-hover:text-foreground/70 transition-colors">
        {item.text}
      </span>
      <XCircle className="h-4 w-4 text-[color:var(--danger)] shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" strokeWidth={2} />
      <span className="flex items-center justify-center h-10 w-10 rounded-full bg-white border border-border shrink-0 group-hover:opacity-100 opacity-80 transition-opacity">
        <Icon className="h-4 w-4 text-muted" strokeWidth={1.75} />
      </span>
    </motion.div>
  );
}

function SimplyMenRow({ item, index }: { item: (typeof simplyMenItems)[number]; index: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group flex items-center gap-3 h-full"
    >
      <span className="flex items-center justify-center h-10 w-10 rounded-full bg-white border border-accent/40 shrink-0">
        <Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
      </span>
      <CheckCircle2 className="h-4 w-4 text-success shrink-0" strokeWidth={2} />
      <span className="text-sm font-medium text-foreground group-hover:text-primary-dark transition-colors">
        {item.text}
      </span>
    </motion.div>
  );
}

export default function WhyBetter() {
  return (
    <section className="py-24 lg:py-36 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4 block">
            The Simply Men Difference
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary-dark leading-tight">
            Why Our Treatment Programs Work Better
          </h2>
          <p className="mt-4 text-lg text-muted">
            Clinically guided care designed for better outcomes—not trial and error.
          </p>
        </motion.div>

        {/* Desktop / tablet spider comparison */}
        <div className="hidden lg:block relative">
          <div className="absolute left-0 top-0 w-[40%] text-left">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted">
              Traditional Approach
            </span>
          </div>
          <div className="absolute right-0 top-0 w-[40%] pl-[80px] text-left">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
              The Simply Men Way
            </span>
          </div>

          <div className="relative pt-14 h-[560px]">
            {/* Connector lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {traditionalItems.map((_, i) => {
                const y = ((i + 0.5) / ROW_COUNT) * 100;
                return (
                  <motion.line
                    key={`left-${i}`}
                    x1="41" y1={y} x2="50" y2="50"
                    stroke="var(--border)"
                    strokeWidth="0.3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.06 }}
                  />
                );
              })}
              {simplyMenItems.map((_, i) => {
                const y = ((i + 0.5) / ROW_COUNT) * 100;
                return (
                  <motion.line
                    key={`right-${i}`}
                    x1="50" y1="50" x2="59" y2={y}
                    stroke="var(--accent)"
                    strokeWidth="0.3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.06 }}
                  />
                );
              })}
            </svg>

            {/* Left column */}
            <div className="absolute left-0 top-0 w-[40%] h-full flex flex-col justify-between">
              {traditionalItems.map((item, i) => (
                <TraditionalRow key={item.text} item={item} index={i} />
              ))}
            </div>

            {/* Right column */}
            <div className="absolute right-0 top-0 w-[40%] h-full flex flex-col justify-between">
              {simplyMenItems.map((item, i) => (
                <SimplyMenRow key={item.text} item={item} index={i} />
              ))}
            </div>

            {/* Center circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute left-1/2 top-[calc(50%-14px)] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center h-[210px] w-[210px] rounded-full shadow-lg"
              style={{ background: "linear-gradient(180deg, var(--surface), var(--background))" }}
            >
              <span className="flex items-center justify-center h-14 w-14 rounded-full bg-white shadow-sm mb-3">
                <Package className="h-6 w-6 text-accent" strokeWidth={1.75} />
              </span>
              <p className="font-display text-lg font-bold text-primary-dark leading-snug px-6">
                Personalized Care
                <br />
                That Works
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mobile / tablet stacked fallback */}
        <div className="lg:hidden space-y-12">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-6 block">
              Traditional Approach
            </span>
            <div className="space-y-4">
              {traditionalItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="flex items-center justify-center h-10 w-10 rounded-full bg-white border border-border shrink-0">
                      <Icon className="h-4 w-4 text-muted" strokeWidth={1.75} />
                    </span>
                    <XCircle className="h-4 w-4 text-[color:var(--danger)] shrink-0" strokeWidth={2} />
                    <span className="text-sm text-muted">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="flex flex-col items-center justify-center text-center h-[180px] w-[180px] rounded-full shadow-lg"
              style={{ background: "linear-gradient(180deg, var(--surface), var(--background))" }}
            >
              <span className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-sm mb-2">
                <Package className="h-5 w-5 text-accent" strokeWidth={1.75} />
              </span>
              <p className="font-display text-base font-bold text-primary-dark leading-snug px-5">
                Personalized Care
                <br />
                That Works
              </p>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-6 block">
              The Simply Men Way
            </span>
            <div className="space-y-4">
              {simplyMenItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="flex items-center justify-center h-10 w-10 rounded-full bg-white border border-accent/40 shrink-0">
                      <Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                    </span>
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" strokeWidth={2} />
                    <span className="text-sm font-medium text-foreground">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 lg:mt-16 rounded-3xl bg-primary-dark px-8 sm:px-14 py-8 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6"
        >
          {trustBar.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.title}
                className="flex items-center gap-3 hover:-translate-y-0.5 transition-transform duration-300"
              >
                <Icon className="h-6 w-6 text-accent shrink-0" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">{t.title}</p>
                  <p className="text-xs text-white/60 leading-tight">{t.subtitle}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/assessment"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-10 py-4 text-base font-semibold text-white hover:bg-accent/90 transition-all"
          >
            Start Free Assessment
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-4 text-sm text-muted">
            Clinically reviewed • 100% confidential • Takes only 4 minutes
          </p>
        </div>
      </div>
    </section>
  );
}
