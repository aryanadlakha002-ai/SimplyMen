"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Stethoscope, ShieldCheck, Clock3 } from "lucide-react";

const SLIDES = [
  {
    image: "/hero/hero1.png",
    alt: "Man at home with his partner softly blurred in the background",
    heading: ["Restore Confidence.", "Rediscover Intimacy."],
    subtitle:
      "Personalized, doctor-led care for erectile dysfunction, performance concerns, and long-term men's wellness.",
    focalPoint: "70% 38%",
  },
  {
    image: "/hero/hero2.png",
    alt: "Confident man after a morning run along the waterfront",
    heading: ["Stronger Erections.", "Lasting Performance."],
    subtitle:
      "Personalized treatment plans for erectile dysfunction, premature ejaculation, and intimacy concerns—designed by experienced doctors.",
    focalPoint: "68% 30%",
  },
  {
    image: "/hero/hero3.png",
    alt: "Man having a private doctor video consultation from home",
    heading: ["Private Care.", "Personalized Results."],
    subtitle:
      "Doctor-led online consultations, personalized treatment plans, and discreet delivery—all from the privacy of your home.",
    focalPoint: "72% 40%",
  },
];

const trustIndicators = [
  { icon: Stethoscope, label: "Doctor Reviewed" },
  { icon: ShieldCheck, label: "100% Confidential" },
  { icon: Clock3, label: "4-Min Assessment" },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  const prev = () => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setActive((i) => (i + 1) % SLIDES.length);

  const slide = SLIDES[active];

  return (
    <section
      className="relative overflow-hidden min-h-[480px] sm:min-h-[560px] lg:h-[650px] xl:h-[700px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        {SLIDES.map((s, i) =>
          i === active ? (
            <motion.div
              key={s.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <Image
                src={s.image}
                alt={s.alt}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                sizes="100vw"
                style={{ objectPosition: s.focalPoint }}
                className="object-cover select-none pointer-events-none"
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Subtle left-side gradient — text-area only, keeps the rest of the image untouched */}
      <div className="absolute inset-y-0 left-0 w-[85%] sm:w-[65%] lg:w-[52%] bg-gradient-to-r from-black/55 via-black/20 to-transparent pointer-events-none" />

      {/* Content — overlaid on the left negative space */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="max-w-[500px] sm:max-w-[560px] pb-14 sm:pb-0"
            >
              <h1 className="font-display text-[26px] sm:text-4xl lg:text-5xl font-bold leading-[1.15] sm:leading-tight text-white">
                {slide.heading[0]}
                <br />
                {slide.heading[1]}
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base font-medium text-[#F3F4F6] max-w-[520px]">
                {slide.subtitle}
              </p>

              <div className="mt-5 sm:mt-8">
                <Link
                  href="/assessment"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm sm:text-base font-semibold text-white shadow-lg hover:bg-accent/90 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Start Free Assessment
                </Link>
              </div>

              <div className="mt-5 sm:mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                {trustIndicators.map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <span
                      key={t.label}
                      className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/80 ${
                        i > 0 ? "sm:border-l sm:border-white/25 sm:pl-6" : ""
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 text-white/70" strokeWidth={1.75} />
                      {t.label}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        style={{ zIndex: 50 }}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 backdrop-blur-sm p-2.5 text-white hover:bg-white/25 transition-all"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        style={{ zIndex: 50 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 backdrop-blur-sm p-2.5 text-white hover:bg-white/25 transition-all"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Dots */}
      <div
        style={{ zIndex: 50 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2"
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.image}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
