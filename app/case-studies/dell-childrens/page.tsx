import DellCaseStudyView from "./DellCaseStudyView";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A children’s Medicaid portal for care team, ID cards, and coverage",
  description:
    "I led design of a children’s Medicaid member portal, launching care team, ID card, and prior authorization tools for 40,000+ members in four months.",
  openGraph: {
    title:
      "A children’s Medicaid portal for care team, ID cards, and coverage | David Pindrys",
    description:
      "I led design of a children’s Medicaid member portal, launching care team, ID card, and prior authorization tools for 40,000+ members in four months.",
  },
};

export default function DellCaseStudyPage() {
  return <DellCaseStudyView />;
}
