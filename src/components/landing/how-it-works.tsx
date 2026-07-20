"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
    title: "Personalized Plan",
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

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-36 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-primary-dark leading-tight">
            How it Works
          </h2>
          <p className="mt-3 text-lg text-muted">
            Personalized care, delivered to you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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

        <div className="mt-14 text-center">
          <Link
            href="/clinical-standards"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline underline-offset-4"
          >
            Learn more about our clinical standards
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
