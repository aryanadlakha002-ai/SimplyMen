"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Pill, Clock3, Flame, Scale, CircleDot, type LucideIcon } from "lucide-react";
import type { ConditionKey } from "@/types";

type Condition = {
  key: ConditionKey;
  label: string;
  icon: LucideIcon;
  iconColor: string;
  desc: string;
};

const conditionsList: Condition[] = [
  { key: "ed", label: "Erectile Dysfunction", icon: Pill, iconColor: "text-blue-600", desc: "Clinically validated assessment and doctor-guided treatment options." },
  { key: "pe", label: "Premature Ejaculation", icon: Clock3, iconColor: "text-purple-600", desc: "Accurate diagnosis with fast-acting and long-term solutions." },
  { key: "libido", label: "Low Libido", icon: Flame, iconColor: "text-emerald-600", desc: "Restore desire through hormonal evaluation and targeted therapies." },
  { key: "hormonal", label: "Hormonal Disorders", icon: Scale, iconColor: "text-yellow-600", desc: "Testosterone evaluation and hormonal balance restoration." },
  { key: "infertility", label: "Male Infertility", icon: CircleDot, iconColor: "text-pink-600", desc: "Sperm health assessment and comprehensive fertility solutions." },
];

function ConditionIcon({ icon: Icon, iconColor }: { icon: LucideIcon; iconColor: string }) {
  return (
    <Icon
      className={`${iconColor} mb-5 transition-transform duration-200 group-hover:scale-105`}
      width={46}
      height={46}
      strokeWidth={1.75}
    />
  );
}

function ConditionCard({ condition }: { condition: Condition }) {
  const c = condition;
  return (
    <Link
      href={`/assessment?concern=${c.key}`}
      className="group flex flex-col h-full rounded-3xl bg-white border border-border/60 hover:border-accent/40 p-8 shadow-[0_2px_12px_rgba(28,32,36,0.05)] hover:shadow-[0_20px_40px_rgba(28,32,36,0.12)] hover:-translate-y-1.5 transition-all duration-300"
    >
      <ConditionIcon icon={c.icon} iconColor={c.iconColor} />
      <h4 className="font-display text-xl text-primary-dark mb-2">{c.label}</h4>
      <p className="text-sm text-muted leading-relaxed mb-4">{c.desc}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-accent transition-colors">
        Start Assessment
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}

export default function Conditions() {
  return (
    <section className="py-24 md:py-28 lg:py-36 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-2 block">
            Conditions We Treat
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary-dark leading-tight max-w-2xl mx-auto">
            Doctor-backed care for every stage of your health
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {conditionsList.map((c) => (
            <ConditionCard key={c.key} condition={c} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
