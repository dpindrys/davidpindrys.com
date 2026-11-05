export const frxImpactSectionIntro = {
  eyebrow: "Impact in practice",
  title: "What changed for staff and patients",
} as const;

export type FrxImpactThemeKey = "green" | "blue" | "purple";

export type FrxImpactEvidenceRow = {
  theme: FrxImpactThemeKey;
  headline: string;
  description: string;
  quote: string;
  attribution: string;
};

export const frxImpactEvidenceRows: readonly FrxImpactEvidenceRow[] = [
  {
    theme: "green",
    headline: "Time saved for clinic staff",
    description: "Fewer calls, less paperwork, and no more status chases.",
    quote:
      "Realistically on a big program you're saving 2–3 hours per week.",
    attribution: "Program manager overseeing 4 clinics",
  },
  {
    theme: "blue",
    headline: "Faster answers for patients",
    description: "Refill and shipment status is visible in real time.",
    quote:
      "With a couple clicks I could see it shipped two days ago and immediately call the patient back.",
    attribution: "HT program manager",
  },
  {
    theme: "purple",
    headline: "Better medication adherence",
    description:
      "Clinicians can see refill history and catch gaps before patients run out.",
    quote:
      "I know to ask if they need their Velforo because I can see they haven't refilled in a few months.",
    attribution: "HT RN",
  },
] as const;

export const frxImpactScale = {
  theme: "blue" as const,
  headline: "Across 2,800+ clinics",
  description:
    "Deployed enterprise-wide and refined with real-world feedback from nurses, dietitians, and clinic staff.",
  stat: "70%",
  statDetail:
    "faster time-to-refill with more medication visibility across 2,800+ clinics and 43,000+ patients.",
} as const;

export const frxImpactThemeColors: Record<
  FrxImpactThemeKey,
  { accent: string; muted: string }
> = {
  green: { accent: "#3A7D5C", muted: "#D8EDE3" },
  blue: { accent: "#2F6B9E", muted: "#D4E6F3" },
  purple: { accent: "#7B6FD6", muted: "#E8E4F5" },
};
