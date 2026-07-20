"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
  Loader2,
  Shield,
  Heart,
  Zap,
  Activity,
  Target,
  Baby,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { useAssessmentStore } from "@/store/assessment-store";
import {
  conditionMeta,
  conditionOrder,
  questionsByCondition,
} from "@/lib/data/questionnaires";
import type { ConditionKey } from "@/types";
import { cn } from "@/lib/utils";

type Phase = "info" | "concern" | "questions" | "analyzing";

const conditionIcons: Record<ConditionKey, typeof Heart> = {
  ed: Heart,
  pe: Zap,
  libido: Activity,
  hormonal: Target,
  infertility: Baby,
};

const conditionColors: Record<ConditionKey, { bg: string; border: string; text: string; iconBg: string }> = {
  ed: { bg: "hover:bg-blue-50", border: "border-blue-200", text: "text-blue-600", iconBg: "bg-blue-100" },
  pe: { bg: "hover:bg-purple-50", border: "border-purple-200", text: "text-purple-600", iconBg: "bg-purple-100" },
  infertility: { bg: "hover:bg-green-50", border: "border-green-200", text: "text-green-600", iconBg: "bg-green-100" },
  libido: { bg: "hover:bg-amber-50", border: "border-amber-200", text: "text-amber-600", iconBg: "bg-amber-100" },
  hormonal: { bg: "hover:bg-cyan-50", border: "border-cyan-200", text: "text-cyan-600", iconBg: "bg-cyan-100" },
};

const assessmentLabels: Record<ConditionKey, string> = {
  ed: "Erectile Function Assessment",
  pe: "Ejaculation Assessment",
  libido: "Libido & Desire Assessment",
  hormonal: "Hormonal Health Assessment",
  infertility: "Fertility Risk Assessment",
};

function AssessmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const store = useAssessmentStore();

  const [phase, setPhase] = useState<Phase>("info");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedCondition, setSelectedCondition] = useState<ConditionKey | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [direction, setDirection] = useState(1);

  // Pre-select concern from URL
  useEffect(() => {
    const c = searchParams.get("concern") as ConditionKey | null;
    if (c && conditionMeta[c]) {
      setSelectedCondition(c);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const allQuestions = selectedCondition
    ? questionsByCondition[selectedCondition]
    : [];

  const totalQuestions = allQuestions.length;
  const progress =
    phase === "info"
      ? 0
      : phase === "concern"
      ? 5
      : phase === "questions"
      ? 10 + (currentQ / totalQuestions) * 85
      : 100;

  const handleInfoSubmit = () => {
    store.setUserInfo(name, parseInt(age) || 0, duration);
    setPhase("concern");
  };

  const handleConcernSelect = (c: ConditionKey) => {
    setSelectedCondition(c);
    store.setConditions([c]);
    setPhase("questions");
    setCurrentQ(0);
  };

  const handleAnswer = useCallback(
    (questionId: string, value: number) => {
      store.setAnswer(questionId, value);
      setTimeout(() => {
        if (currentQ < totalQuestions - 1) {
          setDirection(1);
          setCurrentQ((p) => p + 1);
        } else {
          setPhase("analyzing");
          store.calculateResults();
          setTimeout(() => {
            router.push("/results");
          }, 2500);
        }
      }, 400);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentQ, totalQuestions, router]
  );

  const goBack = () => {
    if (phase === "questions" && currentQ > 0) {
      setDirection(-1);
      setCurrentQ((p) => p - 1);
    } else if (phase === "questions") {
      setPhase("concern");
    } else if (phase === "concern") {
      setPhase("info");
    }
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-surface to-white">
        {/* Progress bar */}
        <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-sm border-b border-border/40">
          <div className="mx-auto max-w-2xl px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted">
                {phase === "analyzing"
                  ? "Analyzing..."
                  : phase === "questions"
                  ? `Question ${currentQ + 1} of ${totalQuestions}`
                  : "Getting started"}
              </span>
              <span className="text-xs font-mono text-muted">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-border/40 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12">
          {/* Privacy banner */}
          <div className="flex items-center gap-2 justify-center mb-8 text-xs text-muted">
            <Lock className="h-3.5 w-3.5 text-secondary" />
            <span>Your answers are 100% confidential and encrypted</span>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            {/* Phase 1: Basic Info */}
            {phase === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h1 className="font-display text-3xl font-bold text-primary-dark">
                    Let&apos;s understand your concerns
                  </h1>
                  <p className="mt-3 text-muted">
                    This helps us personalize your assessment and recommendations.
                  </p>
                </div>

                <div className="space-y-5 max-w-md mx-auto">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Your name{" "}
                      <span className="text-muted font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="How should we address you?"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Your age <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter your age"
                      min={18}
                      max={80}
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      How long have you been experiencing this?{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      <option value="">Select duration</option>
                      <option value="<1month">Less than 1 month</option>
                      <option value="1-3months">1-3 months</option>
                      <option value="3-6months">3-6 months</option>
                      <option value="6-12months">6-12 months</option>
                      <option value="1-3years">1-3 years</option>
                      <option value=">3years">More than 3 years</option>
                    </select>
                  </div>

                  <button
                    onClick={handleInfoSubmit}
                    disabled={!age || !duration}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200",
                      age && duration
                        ? "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg cursor-pointer"
                        : "bg-border text-muted cursor-not-allowed"
                    )}
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Phase 2: Condition Selection — 6-card grid */}
            {phase === "concern" && (
              <motion.div
                key="concern"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h1 className="font-display text-3xl font-bold text-primary-dark">
                    What would you like to assess?
                  </h1>
                  <p className="mt-3 text-muted">
                    Select a condition. Each assessment has 12 clinically-informed
                    questions (~4 minutes).
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  {conditionOrder.map((key, i) => {
                    const meta = conditionMeta[key];
                    const Icon = conditionIcons[key];
                    const colors = conditionColors[key];
                    return (
                      <motion.button
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        onClick={() => handleConcernSelect(key)}
                        className={cn(
                          "group text-left rounded-2xl border-2 bg-white p-5 transition-all duration-200 cursor-pointer",
                          "border-border/60",
                          colors.bg,
                          "hover:border-l-4",
                          `hover:${colors.border}`
                        )}
                        style={{
                          // Use inline for dynamic border-left color on hover
                        }}
                      >
                        <div
                          className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center mb-4",
                            colors.iconBg
                          )}
                        >
                          <Icon className={cn("h-5 w-5", colors.text)} />
                        </div>
                        <h3 className="font-display text-sm font-bold text-primary-dark leading-snug mb-1.5">
                          {meta.label}
                        </h3>
                        <p className="text-xs text-muted leading-relaxed">
                          {meta.description}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>

                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mx-auto mt-4 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              </motion.div>
            )}

            {/* Phase 3: Questions */}
            {phase === "questions" && allQuestions[currentQ] && (
              <motion.div
                key={`q-${currentQ}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-8 max-w-2xl mx-auto"
              >
                <div className="text-center">
                  <span className="text-xs font-mono text-muted uppercase tracking-wider">
                    {selectedCondition
                      ? assessmentLabels[selectedCondition]
                      : "Assessment"}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-dark mt-3 leading-snug">
                    {allQuestions[currentQ].text}
                  </h2>
                </div>

                <div className="space-y-3 max-w-lg mx-auto">
                  {allQuestions[currentQ].options.map((opt) => {
                    const isSelected =
                      store.answers[allQuestions[currentQ].id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() =>
                          handleAnswer(allQuestions[currentQ].id, opt.value)
                        }
                        className={cn(
                          "w-full text-left rounded-2xl border-2 px-5 py-4 text-sm font-medium transition-all duration-200 cursor-pointer",
                          isSelected
                            ? "border-primary bg-primary/5 text-primary shadow-md"
                            : "border-border/60 bg-white text-foreground hover:border-primary/30 hover:shadow-sm"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt.label}</span>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                            >
                              <Check className="h-3.5 w-3.5 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={goBack}
                    className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous question
                  </button>
                </div>
              </motion.div>
            )}

            {/* Phase 4: Analyzing */}
            {phase === "analyzing" && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6"
                >
                  <Loader2 className="h-8 w-8 text-primary" />
                </motion.div>
                <h2 className="font-display text-2xl font-bold text-primary-dark">
                  Analyzing your responses...
                </h2>
                <p className="mt-3 text-muted">
                  Generating your personalized results and recommendations
                </p>
                <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted">
                  <Shield className="h-3.5 w-3.5 text-secondary" />
                  Your data is encrypted and secure
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}

export default function AssessmentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <AssessmentContent />
    </Suspense>
  );
}
