/**
 * Shared longitudinal narrative — Type 2 diabetes exacerbation and stabilization.
 * All case-study figures use these four visit columns (left → right).
 */
export const CASE_STUDY_VISIT_DATES = [
  "Jul 21",
  "Sep 09",
  "Sep 10",
  "Sep 14",
] as const;

export type CaseStudyVisitDate = (typeof CASE_STUDY_VISIT_DATES)[number];

export const CASE_STUDY_VISIT_COUNT = CASE_STUDY_VISIT_DATES.length;

/** Patient-reported symptom severity (0–10) per visit column. */
export const PRO_SYMPTOM_ROWS = [
  {
    id: "fatigue",
    label: "Fatigue",
    values: [4, 8, 6, 3],
  },
  {
    id: "thirst",
    label: "Thirst",
    values: [3, 9, 5, 2],
  },
  {
    id: "sleep",
    label: "Insomnia",
    values: [5, 8, 6, 3],
  },
] as const;

export function proSeverityTone(
  value: number,
): "light" | "mid" | "high" | "deep" {
  if (value <= 3) return "light";
  if (value <= 5) return "mid";
  if (value <= 7) return "high";
  return "deep";
}

/** Labs matrix — one row per measure, four visit values. */
export const LABS_GLUCOSE_VALUES = ["186", "342", "248", "154"] as const;
export const LABS_BP_VALUES = ["138/88", "168/102", "152/94", "136/84"] as const;

export const LABS_GLUCOSE_TOOLTIP_ACUTE = {
  label: "Blood Glucose",
  date: "09 Sep 2024",
  valuePrimary: "342",
  unitSuffix: "mg/dL",
  caption:
    "Marked elevation during emergency presentation; value significantly worsened from prior encounter and prompted treatment escalation.",
} as const;

export const PRO_THIRST_TOOLTIP_COL = 1; // Sep 09
