export type GlucoseContext =
  | "fasting"
  | "before_meal"
  | "after_meal"
  | "bedtime"
  | "random";

export interface GlucoseLog {
  id: string;
  value: number; // mg/dL
  timestamp: number; // Unix ms
  context: GlucoseContext;
  notes?: string;
}

export interface GlucoseLogInput {
  value: number;
  context: GlucoseContext;
  notes?: string;
  timestamp?: number;
}

export interface GlucoseSummary {
  average7Day: number | null;
  average30Day: number | null;
  lastReading: GlucoseLog | null;
  inRangePercent7Day: number | null;
  highCount7Day: number;
  lowCount7Day: number;
  /** Highest glucose reading value in last 7 days (from backend) */
  high7DayValue: number | null;
  /** Lowest glucose reading value in last 7 days (from backend) */
  low7DayValue: number | null;
}

export type GlucoseRange = "low" | "in_range" | "high" | "very_high";

export function classifyGlucose(
  value: number,
  context: GlucoseContext = "random",
): GlucoseRange {
  if (context === "fasting") {
    if (value < 70) return "low";
    if (value <= 99) return "in_range";
    if (value <= 125) return "high";
    return "very_high";
  }
  // Post-meal / general
  if (value < 70) return "low";
  if (value <= 140) return "in_range";
  if (value <= 199) return "high";
  return "very_high";
}

export const GLUCOSE_RANGE_LABELS: Record<GlucoseRange, string> = {
  low: "Low",
  in_range: "In Range",
  high: "High",
  very_high: "Very High",
};

export const CONTEXT_LABELS: Record<GlucoseContext, string> = {
  fasting: "Fasting",
  before_meal: "Before Meal",
  after_meal: "After Meal",
  bedtime: "Bedtime",
  random: "Random",
};
