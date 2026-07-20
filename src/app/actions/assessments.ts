"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase, cuid } from "@/lib/supabase";

interface SaveAssessmentInput {
  type: string; // "IIEF5" | "PEDT" | "BOTH"
  iief5Score?: number;
  iief5Severity?: string;
  pedtScore?: number;
  pedtSeverity?: string;
  answers?: Record<string, string | number>;
}

export async function saveAssessmentResult(input: SaveAssessmentInput) {
  const { userId } = await auth();

  try {
    const id = cuid();
    const { error } = await supabase.from("assessment_results").insert({
      id,
      clerkUserId: userId,
      type: input.type,
      iief5Score: input.iief5Score ?? null,
      iief5Severity: input.iief5Severity ?? null,
      pedtScore: input.pedtScore ?? null,
      pedtSeverity: input.pedtSeverity ?? null,
      answers: input.answers ?? null,
      createdAt: new Date().toISOString(),
    });

    if (error) throw error;
    return { success: true, resultId: id };
  } catch (error) {
    console.error("Failed to save assessment:", error);
    return { error: "Failed to save assessment." };
  }
}

export async function getUserAssessments() {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  try {
    const { data: results, error } = await supabase
      .from("assessment_results")
      .select("*")
      .eq("clerkUserId", userId)
      .order("createdAt", { ascending: false });

    if (error) throw error;
    return { results: results ?? [] };
  } catch (error) {
    console.error("Failed to fetch assessments:", error);
    return { error: "Failed to fetch assessments." };
  }
}
