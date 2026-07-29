"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, animate, useInView } from "framer-motion";
import { Pill, Package, Clock, Check, ArrowDown, ArrowRight } from "lucide-react";

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

function BottleGrid({ muted }: { muted?: boolean }) {
  return (
    <div className={`grid grid-cols-4 gap-1.5 p-3 rounded-2xl ${muted ? "bg-surface" : "bg-accent/10"}`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <Pill key={i} className="h-3.5 w-3.5 text-muted/60" strokeWidth={1.75} />
      ))}
    </div>
  );
}

function CoinStack({ count }: { count: number }) {
  return (
    <div className="flex flex-col items-center justify-end h-[72px]">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-4 w-14 rounded-full border border-white/40 shadow-sm"
          style={{
            background: "linear-gradient(180deg, var(--gold), var(--accent))",
            marginTop: i === 0 ? 0 : "-10px",
          }}
        />
      ))}
    </div>
  );
}

function ComparisonColumn({
  label,
  divider,
  traditionalVisual,
  traditionalCaption,
  simplymenVisual,
  simplymenCaption,
  savingText,
}: {
  label: string;
  divider?: boolean;
  traditionalVisual: React.ReactNode;
  traditionalCaption: React.ReactNode;
  simplymenVisual: React.ReactNode;
  simplymenCaption: React.ReactNode;
  savingText: string;
}) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`flex flex-col items-center text-center px-4 py-2 ${
        divider ? "md:border-l md:border-border/60" : ""
      }`}
    >
      <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted mb-6">
        {label}
      </span>

      {/* Traditional — before */}
      <motion.div
        variants={{ rest: { opacity: 1 }, hover: { opacity: 0.55 } }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <span className="text-[11px] font-medium tracking-wide uppercase text-muted/70 mb-3">
          Traditional
        </span>
        <div className="h-[72px] flex items-center justify-center">{traditionalVisual}</div>
        <span className="mt-3 text-sm text-muted/80 line-through decoration-muted/50">
          {traditionalCaption}
        </span>
      </motion.div>

      {/* Transition arrow */}
      <motion.div
        variants={{ rest: { y: 0 }, hover: { y: 5 } }}
        transition={{ duration: 0.4, repeat: 1, repeatType: "reverse" }}
        className="my-5 flex items-center justify-center h-9 w-9 rounded-full bg-surface shrink-0"
      >
        <ArrowDown className="h-4 w-4 text-accent" strokeWidth={2} />
      </motion.div>

      {/* SimplyMen — after */}
      <motion.div
        variants={{ rest: { y: 0 }, hover: { y: -6 } }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <span className="text-[11px] font-semibold tracking-wide uppercase text-accent mb-3">
          SimplyMen
        </span>
        <div className="h-[72px] flex items-center justify-center">{simplymenVisual}</div>
        <span className="mt-3 font-display text-xl text-primary-dark">
          {simplymenCaption}
        </span>
      </motion.div>

      <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-success/10 text-success px-4 py-2 text-xs font-semibold">
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
        {savingText}
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative py-24 md:py-28 lg:py-36"
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
              Everything you need, without the complexity of traditional treatment.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="rounded-3xl bg-white p-8 sm:p-10 lg:p-14 shadow-[0_2px_12px_rgba(28,32,36,0.05)] hover:shadow-[0_20px_40px_rgba(28,32,36,0.12)] transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-6 lg:gap-x-10">
              <ComparisonColumn
                label="Products Used"
                traditionalVisual={<BottleGrid muted />}
                traditionalCaption={
                  <>
                    <AnimatedNumber value={12} /> individual products
                  </>
                }
                simplymenVisual={
                  <span className="flex items-center justify-center h-16 w-16 rounded-2xl bg-accent/10">
                    <Package className="h-8 w-8 text-accent" strokeWidth={1.75} />
                  </span>
                }
                simplymenCaption={
                  <>
                    <AnimatedNumber value={1} /> treatment program
                  </>
                }
                savingText="11 fewer products"
              />
              <ComparisonColumn
                divider
                label="Monthly Cost"
                traditionalVisual={<CoinStack count={6} />}
                traditionalCaption={
                  <>
                    &#8377;<AnimatedNumber value={4600} /> /month
                  </>
                }
                simplymenVisual={<CoinStack count={2} />}
                simplymenCaption={
                  <>
                    &#8377;<AnimatedNumber value={1999} /> /month
                  </>
                }
                savingText="Save ₹2,601 every month"
              />
              <ComparisonColumn
                divider
                label="Time Per Day"
                traditionalVisual={<Clock className="h-16 w-16 text-muted/60" strokeWidth={1.25} />}
                traditionalCaption={
                  <>
                    <AnimatedNumber value={45} /> min/day
                  </>
                }
                simplymenVisual={<Clock className="h-8 w-8 text-accent" strokeWidth={1.75} />}
                simplymenCaption={
                  <>
                    <AnimatedNumber value={5} /> min/day
                  </>
                }
                savingText="Get 40 minutes back every day"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="mt-10 rounded-3xl bg-primary-dark shadow-lg px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-5"
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-accent shrink-0" />
              <p className="text-sm sm:text-base text-white">
                Join <span className="text-accent font-semibold">50,000+</span> men who&apos;ve simplified their treatment with SimplyMen
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
