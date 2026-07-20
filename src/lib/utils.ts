import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getIIEF5Severity(score: number): {
  label: string;
  level: "none" | "mild" | "mild-moderate" | "moderate" | "severe";
  color: string;
} {
  if (score >= 22) return { label: "No ED", level: "none", color: "text-green-600" };
  if (score >= 17) return { label: "Mild ED", level: "mild", color: "text-yellow-600" };
  if (score >= 12) return { label: "Mild-Moderate ED", level: "mild-moderate", color: "text-orange-500" };
  if (score >= 8) return { label: "Moderate ED", level: "moderate", color: "text-orange-600" };
  return { label: "Severe ED", level: "severe", color: "text-red-600" };
}

export function getPEDTSeverity(score: number): {
  label: string;
  level: "normal" | "probable" | "definite";
  color: string;
} {
  if (score <= 8) return { label: "No PE", level: "normal", color: "text-green-600" };
  if (score <= 10) return { label: "Probable PE", level: "probable", color: "text-orange-500" };
  return { label: "Premature Ejaculation", level: "definite", color: "text-red-600" };
}
