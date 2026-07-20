"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, Calendar, CircleCheck, ArrowRight } from "lucide-react";

const programs = [
  {
    key: "ed",
    name: "Confidence Recovery Program",
    image: "/choose your treatment pics/confidence.svg",
    badges: ["Doctor Curated", "ED Focused", "2 Week Program"],
    assessmentHref: "/assessment?concern=ed",
    learnHref: "/programs/confidence-recovery",
  },
  {
    key: "pe",
    name: "Performance Control Program",
    image: "/choose your treatment pics/performance.svg",
    badges: ["Doctor Curated", "PE Focused", "Fast Acting"],
    assessmentHref: "/assessment?concern=pe",
    learnHref: "/programs/performance-control",
  },
  {
    key: "libido",
    name: "Libido Revival Program",
    image: "/choose your treatment pics/libido.svg",
    badges: ["Doctor Curated", "Hormone Support", "Energy & Libido"],
    assessmentHref: "/assessment?concern=libido",
    learnHref: "/programs/libido-revival",
  },
  {
    key: "hormonal",
    name: "Testosterone Restore Program",
    image: "/choose your treatment pics/testosterone.svg",
    badges: ["Doctor Curated", "Hormonal Wellness", "Lab Guided"],
    assessmentHref: "/assessment?concern=hormonal",
    learnHref: "/programs/testosterone-restore",
  },
  {
    key: "complete",
    name: "Complete Men's Health Program",
    image: "/choose your treatment pics/completemenhealth.svg",
    badges: ["Doctor Curated", "Complete Wellness", "Whole Body Support"],
    assessmentHref: "/assessment?concern=complete",
    learnHref: "/programs/complete-health",
  },
];

const badgeIcons = [BadgeCheck, Calendar, CircleCheck];

export default function TreatmentPrograms() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl sm:text-5xl text-primary-dark leading-tight">
            Choose Your Treatment Program
          </h2>
          <p className="mt-3 text-lg text-muted">
            Doctor-curated treatment kits personalized to your needs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {programs.map((p) => (
            <div
              key={p.key}
              className="flex flex-col rounded-3xl bg-white shadow-[0_2px_12px_rgba(28,32,36,0.05)] hover:shadow-[0_20px_40px_rgba(28,32,36,0.12)] transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-display text-2xl text-primary-dark leading-snug mb-5 text-left">
                  {p.name}
                </h3>

                <ul className="flex flex-col gap-3 mb-6">
                  {p.badges.map((badge, i) => {
                    const Icon = badgeIcons[i];
                    return (
                      <li
                        key={badge}
                        className="flex items-center gap-3 h-[42px] w-full rounded-full bg-[#F2FCFB] px-4 text-sm font-medium text-primary-dark"
                      >
                        <Icon className="h-6 w-6 text-[#0F9D94] shrink-0" strokeWidth={2} />
                        {badge}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-auto">
                  <Link
                    href={p.assessmentHref}
                    className="flex items-center justify-center w-full h-14 rounded-full bg-teal-600 text-sm font-medium text-white shadow-sm hover:bg-teal-700 transition-all duration-300"
                  >
                    Start Free Assessment
                  </Link>
                  <Link
                    href={p.learnHref}
                    className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    Learn about this program
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
