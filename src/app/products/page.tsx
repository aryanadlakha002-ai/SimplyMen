"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Star,
  ArrowRight,
  CheckCircle2,
  Package,
  Shield,
  Pill,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { products } from "@/lib/data/products";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

const tagColors: Record<string, { bg: string; text: string }> = {
  otc: { bg: "bg-green-50", text: "text-green-700" },
  rx: { bg: "bg-orange-50", text: "text-orange-700" },
  review: { bg: "bg-blue-50", text: "text-blue-700" },
};
const tagLabels: Record<string, string> = {
  otc: "Wellness",
  rx: "Doctor Approval",
  review: "Review Based",
};

export default function ProductsPage() {
  const addItem = useCartStore((s) => s.addItem);
  const [expandedKit, setExpandedKit] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-surface to-white">
        {/* Hero banner */}
        <section className="bg-gradient-to-r from-primary-dark to-primary py-14 px-4">
          <div className="mx-auto max-w-6xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl sm:text-4xl font-bold text-white"
            >
              Choose Your 2-Week Care Kit
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-white/70 max-w-2xl mx-auto"
            >
              Each kit is curated based on your assessment results. Products are
              mapped from our sexual wellness catalogue, and doctor review
              remains mandatory wherever prescription suitability matters.
            </motion.p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-10">
          {/* Kit Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {products.map((kit, idx) => {
              const isExpanded = expandedKit === kit.id;
              const discount = Math.round(
                ((kit.mrp - kit.price) / kit.mrp) * 100
              );

              return (
                <motion.div
                  key={kit.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative rounded-3xl border bg-white overflow-hidden shadow-lg transition-shadow hover:shadow-xl ${
                    kit.id === "kit_confidence"
                      ? "border-2 border-secondary lg:-translate-y-2"
                      : "border-border/50"
                  }`}
                >
                  {/* Badge ribbon */}
                  {kit.badge && (
                    <div className="absolute top-4 right-4 z-10 rounded-full bg-amber px-3 py-1 text-[11px] font-bold text-white shadow-md">
                      {kit.badge}
                    </div>
                  )}

                  {/* Header area */}
                  <div className="relative bg-gradient-to-br from-surface to-primary/5 p-4 border-b border-border/30">
                    <Image
                      src={kit.images[0]}
                      alt={kit.name}
                      width={400}
                      height={260}
                      className="w-full h-52 object-contain rounded-xl"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="h-5 w-5 text-primary" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                        2 Week Kit
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-primary-dark">
                      {kit.name}
                    </h3>
                    <p className="text-sm text-muted mt-2 line-clamp-3">
                      {kit.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-end gap-2 mt-4">
                      <span className="text-3xl font-bold text-primary-dark">
                        {formatPrice(kit.price)}
                      </span>
                      <span className="text-sm text-muted line-through mb-0.5">
                        {formatPrice(kit.mrp)}
                      </span>
                      {discount > 0 && (
                        <span className="rounded-full bg-green-100 text-green-700 text-[11px] font-bold px-2 py-0.5 mb-1">
                          {discount}% OFF
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted mt-1">/ 2-week kit</p>
                  </div>

                  {/* Kit Products */}
                  <div className="p-6">
                    <button
                      onClick={() =>
                        setExpandedKit(isExpanded ? null : kit.id)
                      }
                      className="flex items-center gap-2 text-sm font-semibold text-primary mb-3 hover:text-primary-dark transition-colors cursor-pointer"
                    >
                      <Pill className="h-4 w-4" />
                      {kit.kitProducts?.length} products included
                      <span className="text-xs text-muted ml-auto">
                        {isExpanded ? "Hide" : "Show"}
                      </span>
                    </button>

                    {isExpanded && kit.kitProducts && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-3 mb-4"
                      >
                        {kit.kitProducts.map((prod) => (
                          <div
                            key={prod.code}
                            className="flex items-start gap-3 rounded-xl border border-border/40 bg-surface/50 p-3"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 text-[11px] font-bold text-primary">
                              {prod.code}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-primary-dark">
                                {prod.name}
                              </p>
                              <p className="text-xs text-muted mt-0.5">
                                {prod.description}
                              </p>
                              {prod.components && (
                                <p className="text-[11px] text-muted/80 mt-1 italic">
                                  {prod.components}
                                </p>
                              )}
                              <span
                                className={`inline-block mt-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${tagColors[prod.tag].bg} ${tagColors[prod.tag].text}`}
                              >
                                {tagLabels[prod.tag]}
                              </span>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* Kit features */}
                    {kit.kitFeatures && (
                      <ul className="space-y-2 mb-5">
                        {kit.kitFeatures.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      <Star className="h-3.5 w-3.5 fill-amber text-amber" />
                      <span className="text-xs font-medium text-foreground">
                        {kit.rating}
                      </span>
                      <span className="text-xs text-muted">
                        ({kit.reviewCount} reviews)
                      </span>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => addItem(kit)}
                      className={`w-full rounded-xl px-4 py-3.5 text-sm font-bold transition-all cursor-pointer ${
                        kit.id === "kit_confidence"
                          ? "bg-secondary text-white hover:bg-secondary/90 shadow-md"
                          : "bg-primary text-white hover:bg-primary-dark shadow-md"
                      }`}
                    >
                      Get This Kit
                    </button>

                    {/* Prescription warning */}
                    {kit.kitProducts?.some((p) => p.tag === "rx") && (
                      <div className="mt-3 rounded-xl bg-orange-50 border border-orange-200 p-3 flex items-start gap-2">
                        <Shield className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-orange-700 font-medium leading-relaxed">
                          Prescription items require doctor review before
                          dispatch. Medical screening is mandatory.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Assessment CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 rounded-2xl bg-gradient-to-r from-primary-dark to-primary p-8 text-center text-white"
          >
            <h2 className="font-display text-2xl font-bold">
              Not sure which kit is right for you?
            </h2>
            <p className="mt-2 text-white/70 max-w-lg mx-auto">
              Take our free 2-minute assessment and get a personalized kit
              recommendation based on clinically validated questionnaires.
            </p>
            <Link
              href="/assessment"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-white/90 transition-colors"
            >
              Start Assessment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
