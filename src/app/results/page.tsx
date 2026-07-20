"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  Info,
  Shield,
  BadgeCheck,
  Package,
  Leaf,
  Award,
  FlaskConical,
  Heart,
  Zap,
  Activity,
  Target,
  Baby,
  Phone,
  Clock,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useAssessmentStore } from "@/store/assessment-store";
import { useCartStore } from "@/store/cart-store";
import { getRecommendedKit } from "@/lib/data/products";
import { recommendationAdvice, conditionMeta, scoringConfig } from "@/lib/data/questionnaires";
import { formatPrice } from "@/lib/utils";
import { saveAssessmentResult } from "@/app/actions/assessments";
import type { ConditionKey, ConditionScore } from "@/types";

const severityStyle: Record<string, { color: string; bg: string; border: string; icon: typeof CheckCircle2; barColor: string }> = {
  normal: { color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: CheckCircle2, barColor: "bg-green-500" },
  mild: { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: Info, barColor: "bg-amber-500" },
  moderate: { color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", icon: AlertTriangle, barColor: "bg-orange-500" },
  severe: { color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: AlertTriangle, barColor: "bg-red-500" },
};

const conditionIcons: Record<ConditionKey, typeof Heart> = {
  ed: Heart,
  pe: Zap,
  libido: Activity,
  hormonal: Target,
  infertility: Baby,
};

export default function ResultsPage() {
  const router = useRouter();
  const result = useAssessmentStore((s) => s.result);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!result) {
      router.push("/assessment");
    } else {
      saveAssessmentResult({
        type: result.type,
        iief5Score: result.iief5Score ?? undefined,
        iief5Severity: result.iief5Severity ?? undefined,
        pedtScore: result.pedtScore ?? undefined,
        pedtSeverity: result.pedtSeverity ?? undefined,
        answers: result.answers || {},
      }).catch(() => {});
    }
  }, [result, router]);

  if (!result) return null;

  const conditions = result.conditions || [];
  const scores = result.scores || {};

  // Product recommendations based on primary condition
  const primaryCondition = conditions[0];
  const primaryScore = scores[primaryCondition];
  const primarySeverity = primaryScore?.severity || "normal";

  // Get the single best-fit kit
  const recommendedKit = getRecommendedKit(primaryCondition, primarySeverity);

  const discount = recommendedKit.mrp > recommendedKit.price
    ? Math.round(((recommendedKit.mrp - recommendedKit.price) / recommendedKit.mrp) * 100)
    : 0;

  const handleBuyKit = () => {
    addItem(recommendedKit);
    router.push("/cart");
  };

  const needsDoctor = Object.values(scores).some(
    (s) => s && (s.severity === "severe" || s.severity === "moderate")
  );

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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-surface to-white pb-20">
        <div className="mx-auto max-w-4xl px-4 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary-dark">
              Your Assessment Results
            </h1>
            <p className="mt-3 text-muted">
              Based on clinically validated scoring — here&apos;s what we found.
            </p>
          </motion.div>

          {/* Score Cards — one per assessed condition */}
          <div className={`grid gap-6 mb-10 ${conditions.length > 1 ? "md:grid-cols-2" : "max-w-lg mx-auto"}`}>
            {conditions.map((cond, i) => {
              const score = scores[cond];
              if (!score) return null;
              const config = scoringConfig[cond];
              const style = severityStyle[score.severity] || severityStyle.normal;
              const Icon = conditionIcons[cond];
              const meta = conditionMeta[cond];
              const advice = recommendationAdvice[cond]?.[score.severity];

              // For progress bar: higher is better for most, lower for PE
              const barPercent = config.highIsGood
                ? (score.score / score.maxScore) * 100
                : ((score.maxScore - score.score) / score.maxScore) * 100;

              return (
                <motion.div
                  key={cond}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className={`rounded-2xl border-2 ${style.border} ${style.bg} p-6`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${style.color}`} />
                      <span className="text-xs font-mono uppercase tracking-wider text-muted">
                        {meta.shortLabel}
                      </span>
                    </div>
                    <style.icon className={`h-5 w-5 ${style.color}`} />
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className={`font-mono text-5xl font-bold ${style.color}`}>
                      {score.score}
                    </span>
                    <span className="text-lg text-muted mb-1">/{score.maxScore}</span>
                  </div>
                  <h3 className={`font-display text-lg font-semibold ${style.color}`}>
                    {advice?.title || score.severity}
                  </h3>
                  <div className="mt-4 space-y-1">
                    <div className="h-3 rounded-full bg-white/60 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barPercent}%` }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className={`h-full rounded-full ${style.barColor}`}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted">
                      <span>{config.highIsGood ? "Severe" : "Normal"}</span>
                      <span>{config.highIsGood ? "Normal" : "Severe"}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Advice Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-border/60 bg-white p-6 mb-10"
          >
            <h3 className="font-display text-xl font-semibold text-primary-dark mb-4">
              What This Means
            </h3>
            {conditions.map((cond) => {
              const score = scores[cond];
              if (!score) return null;
              const advice = recommendationAdvice[cond]?.[score.severity];
              const meta = conditionMeta[cond];
              return (
                <div key={cond} className="mb-4 last:mb-0">
                  <p className="text-sm text-muted leading-relaxed mb-1">
                    <strong className="text-foreground">{meta.shortLabel}:</strong>{" "}
                    {advice?.advice}
                  </p>
                  <p className="text-xs text-primary font-medium">
                    → {advice?.action}
                  </p>
                </div>
              );
            })}
            <p className="text-xs text-muted/70 italic mt-4">
              These results use clinically-informed scoring methodologies inspired by IIEF-5, PEDT, and established
              screening tools. They provide a reliable indication of severity but do not replace a professional medical diagnosis.
            </p>
          </motion.div>

          {/* Credibility Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl bg-gradient-to-r from-[#0B2545] to-[#0F3460] p-5 mb-10"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-white/90 text-xs sm:text-sm font-medium">
                  Clinically Validated Scoring
                </span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-white/20" />
              <div className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-accent" />
                <span className="text-white/90 text-xs sm:text-sm font-medium">
                  Peer-Reviewed Instruments
                </span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-white/20" />
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-accent" />
                <span className="text-white/90 text-xs sm:text-sm font-medium">
                  12-Question Deep Analysis
                </span>
              </div>
            </div>
          </motion.div>

          {/* ═══════════ RECOMMENDED KIT ═══════════ */}
          {recommendedKit && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-border/60 bg-white overflow-hidden mb-8"
            >
              <div className="bg-gradient-to-r from-primary-dark to-primary p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="h-6 w-6 text-accent" />
                  <span className="text-accent text-xs font-bold uppercase tracking-wider">
                    Recommended For You
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {recommendedKit.name}
                </h2>
                <p className="text-white/60 text-sm mt-2">
                  2-week curated care kit based on your assessment scores
                </p>
              </div>

              {/* Kit products list */}
              {recommendedKit.kitProducts && (
                <div className="divide-y divide-border/40">
                  {recommendedKit.kitProducts.map((prod) => (
                    <div
                      key={prod.code}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-surface/50 transition-colors"
                    >
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center shrink-0 border border-border/40">
                        <span className="text-xs font-bold text-primary">{prod.code}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-semibold text-foreground">{prod.name}</h4>
                        <p className="text-xs sm:text-sm text-muted mt-0.5">{prod.description}</p>
                        {prod.components && (
                          <p className="text-[11px] text-muted/70 mt-1 italic">{prod.components}</p>
                        )}
                      </div>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${tagColors[prod.tag].bg} ${tagColors[prod.tag].text}`}>
                        {tagLabels[prod.tag]}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Kit features */}
              {recommendedKit.kitFeatures && (
                <div className="mx-6 my-4 rounded-xl bg-surface/60 border border-border/30 p-4">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {recommendedKit.kitFeatures.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                        <span className="text-xs sm:text-sm text-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mx-6 mb-5 mt-1 rounded-xl bg-green-50 border border-green-200/60 px-4 py-3 flex items-start gap-3">
                <Leaf className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-green-800 text-xs sm:text-sm font-medium leading-relaxed">
                  All supplements are 100% Ayurvedic, GMP &amp; ISO 9001 certified with no side effects. Prescription medicines are WHO-approved &amp; DCGI regulated.
                </p>
              </div>

              <div className="px-6 pb-4">
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted">
                  <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5 text-primary/60" />Doctor Formulated</span>
                  <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-primary/60" />Clinically Tested</span>
                  <span className="flex items-center gap-1"><BadgeCheck className="h-3.5 w-3.5 text-primary/60" />FSSAI Approved</span>
                  <span className="flex items-center gap-1"><Package className="h-3.5 w-3.5 text-primary/60" />100% Discreet Delivery</span>
                </div>
              </div>

              <div className="border-t border-border/60 bg-gray-50/80 px-6 py-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-2xl sm:text-3xl font-bold text-primary-dark">{formatPrice(recommendedKit.price)}</span>
                      {recommendedKit.mrp > recommendedKit.price && (
                        <span className="text-base text-muted line-through">{formatPrice(recommendedKit.mrp)}</span>
                      )}
                      {discount > 0 && (
                        <span className="rounded-full bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1">
                          Save {discount}%
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted mt-1">
                      2-week kit &middot; {recommendedKit.kitProducts?.length} products included
                    </p>
                  </div>
                  <button
                    onClick={handleBuyKit}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-10 py-4 text-base font-bold text-white shadow-lg hover:bg-primary-dark hover:shadow-xl transition-all duration-200 cursor-pointer"
                  >
                    BUY NOW
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Doctor consult suggestion */}
          {needsDoctor && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-xl border-2 border-red-200 bg-red-50 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 shrink-0">
                  <Stethoscope className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-red-800">Doctor follow-up included</p>
                  <p className="text-xs text-red-600">
                    Your score indicates a specialist should review your treatment. After ordering, a doctor will call you (Mon–Sat, 9 AM – 5 PM) to explain dosage and discuss your symptoms.
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 rounded-lg bg-red-100 px-3 py-2 text-xs font-semibold text-red-700">
                <Phone className="h-3.5 w-3.5" />
                Free with order
              </div>
            </motion.div>
          )}

          {/* General doctor call info */}
          {!needsDoctor && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-xl border border-border/40 bg-white px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 shrink-0">
                  <Phone className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Doctor call included with every order</p>
                  <p className="text-xs text-muted">
                    After purchase, a certified doctor will call you (Mon–Sat, 9 AM – 5 PM) to explain dosage &amp; answer your questions.
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-secondary">
                <Clock className="h-3.5 w-3.5" />
                Mon–Sat, 9 AM – 5 PM
              </div>
            </motion.div>
          )}

          {/* Browse kits */}
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Browse all kits
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
