"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Program = {
  slug: string;
  headline: string;
  image: string;
  benefits: string[];
  included: string[];
  assessmentRoute: string;
};

const programs: Program[] = [
  {
    slug: "ed",
    headline: "Regain Your Confidence",
    image: "/programs/confidence.svg",
    benefits: ["Better Erections", "Improved Blood Flow", "Increased Confidence", "Doctor Monitored Progress"],
    included: ["Doctor Consultation", "Personalized Treatment Kit", "Lifestyle Guide", "Progress Tracking", "Discreet Delivery"],
    assessmentRoute: "/assessment?concern=ed",
  },
  {
    slug: "pe",
    headline: "Last Longer Naturally",
    image: "/programs/performance.svg",
    benefits: ["Improved Stamina", "Better Timing Control", "Reduced Performance Anxiety", "Lasting Results"],
    included: ["Doctor Consultation", "Personalized Treatment Kit", "Lifestyle Guide", "Progress Tracking", "Discreet Delivery"],
    assessmentRoute: "/assessment?concern=pe",
  },
  {
    slug: "hormonal",
    headline: "Restore Hormonal Balance",
    image: "/programs/hormonal.png",
    benefits: ["Increased Energy", "Better Mood & Focus", "Improved Muscle Recovery", "Doctor Monitored"],
    included: ["Doctor Consultation", "Personalized Treatment Kit", "Lifestyle Guide", "Progress Tracking", "Discreet Delivery"],
    assessmentRoute: "/assessment?concern=hormonal",
  },
  {
    slug: "libido",
    headline: "Revive Your Libido",
    image: "/programs/libido.svg",
    benefits: ["Restored Natural Drive", "Reduced Stress & Anxiety", "Improved Intimacy", "Holistic Treatment"],
    included: ["Doctor Consultation", "Personalized Treatment Kit", "Lifestyle Guide", "Progress Tracking", "Discreet Delivery"],
    assessmentRoute: "/assessment?concern=libido",
  },
];

function ProgramRow({ program, reverse }: { program: Program; reverse: boolean }) {
  const p = program;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "lg:grid-flow-dense" : ""}`}>
      <div className={`lg:self-start lg:mt-20 ${reverse ? "lg:col-start-2" : ""}`}>
        <div className="rounded-3xl overflow-hidden aspect-[4/3]">
          <img src={p.image} alt={p.headline} loading="lazy" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className={reverse ? "lg:col-start-1" : ""}>
        <h3 className="font-display text-3xl sm:text-4xl text-primary-dark leading-snug mb-8">
          {p.headline}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {p.benefits.map((b) => (
            <div key={b} className="flex items-center gap-2.5">
              <Check className="h-4 w-4 text-teal-600 shrink-0" strokeWidth={2.5} />
              <span className="text-sm text-foreground">{b}</span>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-secondary mb-3 block">
            What&apos;s Included
          </span>
          <ul className="space-y-2.5">
            {p.included.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                <span className="text-sm text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={p.assessmentRoute}
          className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-semibold text-white hover:bg-accent/90 transition-all"
        >
          Start Free Assessment
        </Link>
      </div>
    </motion.div>
  );
}

export default function ProgramShowcase() {
  return (
    <section className="py-24 md:py-28 lg:py-36 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-32">
        {programs.map((p, i) => (
          <ProgramRow key={p.slug} program={p} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
