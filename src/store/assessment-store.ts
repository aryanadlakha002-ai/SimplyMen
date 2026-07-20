import { create } from "zustand";
import type { AssessmentResult, ConditionKey, ConditionScore } from "@/types";
import {
  questionsByCondition,
  calculateSeverity,
  scoringConfig,
} from "@/lib/data/questionnaires";

interface AssessmentState {
  // Pre-assessment
  userName: string;
  userAge: number | null;
  duration: string;
  conditions: ConditionKey[]; // supports 1 or more selected conditions

  // Assessment answers
  answers: Record<string, number>;

  // Results
  result: AssessmentResult | null;

  // Actions
  setUserInfo: (name: string, age: number, duration: string) => void;
  setConditions: (conditions: ConditionKey[]) => void;
  setAnswer: (questionId: string, value: number) => void;
  calculateResults: () => void;
  reset: () => void;
}

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  userName: "",
  userAge: null,
  duration: "",
  conditions: [],
  answers: {},
  result: null,

  setUserInfo: (name, age, duration) =>
    set({ userName: name, userAge: age, duration }),

  setConditions: (conditions) => set({ conditions }),

  setAnswer: (questionId, value) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
    })),

  calculateResults: () => {
    const { conditions, answers } = get();
    const scores: Partial<Record<ConditionKey, ConditionScore>> = {};

    for (const cond of conditions) {
      const questions = questionsByCondition[cond];
      const config = scoringConfig[cond];
      let total = 0;
      for (const q of questions) {
        total += answers[q.id] ?? 0;
      }
      const severity = calculateSeverity(cond, total);
      scores[cond] = {
        score: total,
        maxScore: config.maxScore,
        severity,
      };
    }

    // Legacy compat for DB / actions
    const edScore = scores.ed;
    const peScore = scores.pe;

    const type =
      conditions.length === 1 ? conditions[0].toUpperCase() : "MULTI";

    set({
      result: {
        type,
        conditions,
        scores,
        iief5Score: edScore?.score,
        iief5Severity: edScore?.severity,
        pedtScore: peScore?.score,
        pedtSeverity: peScore?.severity,
        answers: get().answers,
        completedAt: new Date().toISOString(),
      },
    });
  },

  reset: () =>
    set({
      userName: "",
      userAge: null,
      duration: "",
      conditions: [],
      answers: {},
      result: null,
    }),
}));
