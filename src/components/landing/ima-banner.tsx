"use client";

import {
  Shield,
  Wifi,
  BadgeCheck,
  Truck,
  Stethoscope,
  IndianRupee,
} from "lucide-react";

const items = [
  { icon: Stethoscope, label: "LICENSED MEDICAL PROVIDERS" },
  { icon: Wifi, label: "100% ONLINE" },
  { icon: IndianRupee, label: "CLEAR PRICING" },
  { icon: Truck, label: "SHIPPED TO YOUR DOOR" },
  { icon: Shield, label: "IMA VERIFIED DOCTORS" },
  { icon: BadgeCheck, label: "CLINICALLY VALIDATED" },
];

export default function IMABanner() {
  // Duplicate items for seamless infinite scroll
  const allItems = [...items, ...items];

  return (
    <section className="bg-surface border-y border-border/60 py-4 overflow-hidden">
      <div
        className="flex items-center gap-10 whitespace-nowrap"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {allItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center gap-2.5 shrink-0">
              <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
              <span className="text-xs font-semibold tracking-[0.15em] text-foreground/70">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
