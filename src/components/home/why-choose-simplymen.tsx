"use client";

import { motion } from "framer-motion";
import { Stethoscope, FlaskConical, Lock, Package, HeartHandshake, Star } from "lucide-react";

const features = [
  {
    icon: Stethoscope,
    title: "Medical Experts",
    description: "Doctor-led care from experienced specialists focused on men's health and long-term wellness.",
  },
  {
    icon: FlaskConical,
    title: "Evidence Based",
    description: "Clinically validated assessments and evidence-based treatment protocols backed by modern medical research.",
  },
  {
    icon: Lock,
    title: "Private & Confidential",
    description: "Your information remains completely secure with encrypted records and discreet communication.",
  },
  {
    icon: Package,
    title: "Discreet Delivery",
    description: "Plain unbranded packaging delivered privately to your doorstep across India.",
  },
  {
    icon: HeartHandshake,
    title: "Continuous Support",
    description: "Personalized follow-ups, treatment adjustments, and ongoing guidance throughout your journey.",
  },
];

export default function WhyChooseSimplyMen() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[36px] bg-white border border-border/60 shadow-[0_2px_12px_rgba(28,32,36,0.05)] px-6 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16"
        >
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl text-primary-dark leading-tight">
              Why Choose Simply Men?
            </h2>
            <p className="mt-4 text-lg text-muted">
              Effective care. Complete privacy. Personalized treatment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
                >
                  <span className="flex items-center justify-center h-[72px] w-[72px] rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300 mb-5">
                    <Icon className="h-7 w-7 text-teal-600" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-semibold text-primary-dark mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted leading-relaxed max-w-[220px]">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-14 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white shadow-md px-6 py-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                ))}
              </div>
              <span className="text-sm font-semibold text-primary-dark">
                Trusted by 50,000+ Men Across India
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
