"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Stethoscope, ChevronLeft, ChevronRight } from "lucide-react";

const doctors = [
  {
    name: "Dr. Ashwin Yadav",
    degrees: "MBBS, DNB (Respiratory Medicine), IDCCM, FCCP, AMRD (Harvard)",
    role: "Consultant Pulmonologist & Critical Care Specialist",
    experience: "10+ Years Experience",
    image: "/docs/Dr ashwin yadav.jpeg",
  },
  {
    name: "Prof. Dr. Vishnu Agrawal",
    degrees: "MBBS, MD",
    role: "Senior Hormone & Sexual Wellness Expert",
    experience: "50+ Years Experience",
    image: "/docs/vk aggarwal.jpeg",
  },
  {
    name: "Dr. L. K. Sharma",
    degrees: "MBBS, MS, DNB",
    role: "Consultant Urologist & Andrologist",
    experience: "15+ Years Experience",
    image: "/docs/LK sharma.jpeg",
  },
  {
    name: "Dr. Deepak Dubey",
    degrees: "MBBS, MS, MCh (AIIMS Rishikesh)",
    role: "Senior Urologist & Andrologist",
    experience: "10+ Years Experience",
    image: "/docs/deepak dubey.jpeg",
  },
  {
    name: "Dr. Madhukar Gupta",
    degrees: "MBBS, MS, MCh (Hyderabad)",
    role: "Consultant Urologist & Andrologist",
    experience: "12+ Years Experience",
    image: "/docs/madhukar gupta.jpeg",
  },
  {
    name: "Dr. Raghav Singhal",
    degrees: "MBBS, MD (Medicine), DM (Gastroenterology)",
    role: "Consultant Gastroenterologist & Liver Specialist",
    experience: "10+ Years Experience",
    image: "/docs/raghav.jpeg",
  },
  {
    name: "Monica Saini",
    degrees: "B.Sc, M.A. (Psychology)",
    role: "Consultant Psychologist & Sexual Wellness Counselor",
    experience: "10+ Years Experience",
    image: "/docs/monica saini.jpeg",
  },
];

function DoctorCard({ doctor, index }: { doctor: (typeof doctors)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="shrink-0 snap-start w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
    >
      <div className="flex flex-col h-full items-center text-center rounded-3xl bg-white border border-border/60 hover:border-accent/30 p-8 shadow-[0_2px_12px_rgba(28,32,36,0.05)] hover:shadow-[0_20px_40px_rgba(28,32,36,0.12)] hover:-translate-y-1.5 transition-all duration-300">
        <div className="h-[130px] w-[130px] rounded-full overflow-hidden shadow-md shrink-0">
          <img
            src={doctor.image}
            alt={`Portrait of ${doctor.name}`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="font-display text-xl text-primary-dark mt-5">{doctor.name}</h3>
        <p className="mt-1 text-sm text-muted min-h-[2.5rem] flex items-center">{doctor.degrees}</p>

        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-teal-50 text-teal-700 px-4 py-1.5 text-xs font-semibold shadow-sm">
          <Stethoscope className="h-3.5 w-3.5 text-teal-600" strokeWidth={2} />
          {doctor.role}
        </span>

        <p className="mt-4 text-sm text-muted">{doctor.experience}</p>
      </div>
    </motion.div>
  );
}

export default function MeetOurExperts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: "smooth" });
  };

  // Chromium converts vertical wheel deltas into horizontal scroll on
  // overflow-x-only containers, swallowing the event before it reaches the
  // page. React's onWheel is passive by default, so preventDefault must go
  // through a native, non-passive listener instead.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        // behavior: "instant" — the page's CSS `scroll-behavior: smooth` only
        // applies to programmatic scrolls, so without this the forwarded
        // scroll would visibly lag behind native wheel scrolling elsewhere.
        window.scrollBy({ top: e.deltaY, left: 0, behavior: "instant" });
      }
      // Horizontal-dominant deltas (shift+wheel, trackpad swipe) are left
      // alone so the carousel's native horizontal scroll still works.
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section className="py-24 md:py-28 lg:py-36 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-primary-dark leading-tight">
            Meet Our Medical Experts
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Our multidisciplinary team of specialists provides confidential, evidence-based care for every aspect of men&apos;s health and wellness.
          </p>
        </motion.div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll to previous experts"
            className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center h-11 w-11 rounded-full bg-white shadow-md text-primary-dark hover:bg-surface transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll to next experts"
            className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center h-11 w-11 rounded-full bg-white shadow-md text-primary-dark hover:bg-surface transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {doctors.map((doctor, i) => (
              <DoctorCard key={doctor.name} doctor={doctor} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
