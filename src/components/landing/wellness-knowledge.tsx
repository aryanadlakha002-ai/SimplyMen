"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const topics = [
  {
    title: "Stress & sleep directly affect performance",
    desc: "Chronic stress elevates cortisol, suppressing testosterone. Poor sleep reduces T-levels by up to 15%.",
    image: "/images/wellness-sleep.jpg",
  },
  {
    title: "Exercise reduces ED risk by 40%",
    desc: "Just 150 minutes of moderate activity per week improves blood flow, boosts testosterone, and enhances stamina.",
    image: "/images/wellness-exercise.jpg",
  },
  {
    title: "Diet matters more than you think",
    desc: "A Mediterranean diet rich in whole grains, lean protein, and Omega-3s is linked to better erectile function.",
    image: "/images/wellness-nutrition.jpg",
  },
];

export default function WellnessKnowledge() {
  return (
    <section className="py-24 lg:py-36 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-4 block">
            Knowledge Hub
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary-dark leading-tight">
            Sexual wellness is
            <br />
            <span className="text-accent">whole-body wellness</span>
          </h2>
        </motion.div>

        {/* Cards with images */}
        <div className="grid md:grid-cols-3 gap-6">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-white border border-border/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl text-primary-dark mb-2 leading-snug">
                  {topic.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {topic.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
            {["Hormonal balance", "Cardiovascular health", "Mental wellness"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
