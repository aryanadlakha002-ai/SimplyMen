"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { image: "/hero/hero1.png", alt: "Confident Intimacy Banner" },
  { image: "/hero/hero2.png", alt: "Vitality & Performance Banner" },
  { image: "/hero/hero3.png", alt: "Health Simplified Banner" },
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

  return (
    <section
      className="relative overflow-hidden h-[420px] sm:h-[520px] lg:h-[650px] xl:h-[700px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        {SLIDES.map((slide, i) =>
          i === active ? (
            <motion.div
              key={slide.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                sizes="100vw"
                unoptimized
                className="object-cover object-center select-none pointer-events-none"
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

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
