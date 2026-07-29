"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, UserCheck, Clock, Lock } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Take Assessment",
    description: "Complete our clinically validated 4-minute health assessment.",
    image: "/How it works/step1.svg",
  },
  {
    step: "02",
    title: "Doctor Review",
    description: "A licensed physician carefully reviews your assessment.",
    image: "/How it works/step2.svg",
  },
  {
    step: "03",
    title: "Personalized Treatment Program",
    description: "Receive a treatment program tailored specifically to you.",
    image: "/How it works/step3.svg",
  },
  {
    step: "04",
    title: "Discreet Delivery",
    description: "Delivered privately in plain, unbranded packaging.",
    image: "/How it works/step4.svg",
  },
];

const trustIndicators = [
  { icon: Shield, label: "100% Confidential" },
  { icon: UserCheck, label: "Doctor Reviewed" },
  { icon: Clock, label: "Takes Only 4 Minutes" },
  { icon: Lock, label: "No Obligation" },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-24 md:py-28 lg:py-36" style={{ background: "#FFF8F0" }}>
      {/* Decorative background — layered luxury-wellness artwork, frames content without competing with it */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Layer 1 — large soft gradient blobs */}
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full opacity-[0.10]" style={{ background: "radial-gradient(circle, #E8C38B 0%, transparent 70%)", filter: "blur(150px)" }} />
        <div className="absolute -top-32 -right-16 w-[380px] h-[380px] rounded-full opacity-[0.09]" style={{ background: "radial-gradient(circle, #F2D7AF 0%, transparent 70%)", filter: "blur(140px)" }} />
        <div className="absolute -bottom-28 -left-16 w-[400px] h-[400px] rounded-full opacity-[0.10]" style={{ background: "radial-gradient(circle, #F7E7C9 0%, transparent 70%)", filter: "blur(150px)" }} />
        <div className="absolute -bottom-24 -right-24 w-[450px] h-[450px] rounded-full opacity-[0.11]" style={{ background: "radial-gradient(circle, #E8C38B 0%, transparent 70%)", filter: "blur(160px)" }} />

        {/* Layer 2 — flowing contour lines */}
        <svg className="absolute -top-16 -left-16 w-[560px] h-[560px] opacity-[0.13]" viewBox="0 0 560 560" fill="none">
          <path d="M0 160C110 80 220 240 330 140C400 70 480 130 560 90" stroke="#D6A35D" strokeWidth="3.5" fill="none" />
          <path d="M0 260C120 180 230 340 350 230C430 150 500 210 560 170" stroke="#D6A35D" strokeWidth="3.5" fill="none" />
          <path d="M0 360C130 280 240 440 360 320" stroke="#D6A35D" strokeWidth="3.5" fill="none" />
        </svg>
        <svg className="absolute -top-10 -right-20 w-[480px] h-[480px] opacity-[0.12]" viewBox="0 0 480 480" fill="none">
          <path d="M480 150C370 70 260 220 160 130C100 70 40 110 0 80" stroke="#D6A35D" strokeWidth="3.5" fill="none" />
          <path d="M480 250C360 170 250 320 150 220" stroke="#D6A35D" strokeWidth="3.5" fill="none" />
        </svg>
        <svg className="absolute -bottom-16 -right-16 w-[520px] h-[520px] opacity-[0.13]" viewBox="0 0 520 520" fill="none">
          <path d="M520 360C400 280 290 440 180 340C110 280 50 320 0 290" stroke="#D6A35D" strokeWidth="3.5" fill="none" />
          <path d="M520 260C410 190 310 330 210 250" stroke="#D6A35D" strokeWidth="3.5" fill="none" />
        </svg>

        {/* Layer 3 — soft glow behind the steps grid */}
        <div
          className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[340px]"
          style={{ background: "radial-gradient(ellipse, rgba(214,163,93,0.08), transparent 70%)" }}
        />

        {/* Layer 4 — tiny floating accent shapes */}
        <span className="absolute top-[18%] left-[8%] w-3 h-3 rounded-full opacity-[0.05]" style={{ background: "#D6A35D" }} />
        <span className="absolute top-[30%] right-[10%] w-16 h-16 rounded-full opacity-[0.05]" style={{ border: "1px solid #D6A35D" }} />
        <span className="absolute bottom-[22%] left-[14%] w-24 h-24 rounded-full opacity-[0.04]" style={{ border: "1px solid #D6A35D" }} />
        <svg className="absolute bottom-[16%] right-[16%] w-20 h-20 opacity-[0.06]" viewBox="0 0 80 80" fill="none">
          <path d="M4 40C4 20 20 4 40 4" stroke="#D6A35D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
        <span className="absolute top-[10%] right-[28%] w-2 h-2 rounded-full opacity-[0.05]" style={{ background: "#D6A35D" }} />

        {/* Layer 5 — ultra-light grain */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-primary-dark leading-tight">
            How It Works
          </h2>
          <p className="mt-3 text-lg text-muted">
            Personalized, doctor-led care from assessment to discreet delivery.
          </p>
          <p className="mt-4 text-base sm:text-lg" style={{ color: "#667085" }}>
            Join 50,000+ men who received personalized treatment programs tailored to their needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((s) => (
            <div
              key={s.step}
              className="group flex flex-col min-h-[440px] rounded-3xl bg-white shadow-[0_2px_12px_rgba(28,32,36,0.05)] hover:shadow-[0_20px_40px_rgba(28,32,36,0.12)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
            >
              <div className="p-3">
                <div className="h-[200px] rounded-xl overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              <div className="flex flex-col flex-1 px-6 pb-6 pt-2">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-2">
                  STEP {s.step}
                </span>
                <h3 className="font-display text-xl text-primary-dark mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center rounded-full h-14 px-8 text-base font-semibold text-white bg-accent hover:bg-accent/90 shadow-lg transition-all duration-300"
          >
            Start Free Assessment
          </Link>
        </motion.div>

        {/* Divider */}
        <div className="mt-16" style={{ borderTop: "1px solid #F1E6D8" }} />

        {/* Trust indicators */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-y-4">
          {trustIndicators.map((t, i) => {
            const Icon = t.icon;
            return (
              <div
                key={t.label}
                className={`flex items-center gap-2.5 px-6 ${i > 0 ? "sm:border-l" : ""}`}
                style={i > 0 ? { borderColor: "#F1E6D8" } : undefined}
              >
                <Icon className="h-4 w-4" style={{ color: "#C08A4B" }} strokeWidth={1.75} />
                <span className="text-sm font-medium" style={{ color: "#1B1F23" }}>
                  {t.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
