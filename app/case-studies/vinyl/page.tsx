import VinylCaseStudyView from "./VinylCaseStudyView";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "An AI-assisted overview clinicians can trace to the record",
  description:
    "A prototype that helps clinicians review changes in a patient’s condition and trace generated summaries back to the underlying clinical records.",
  openGraph: {
    title:
      "An AI-assisted overview clinicians can trace to the record | David Pindrys",
    description:
      "A prototype that helps clinicians review changes in a patient’s condition and trace generated summaries back to the underlying clinical records.",
  },
};

export default function VinylCaseStudyPage() {
  return <VinylCaseStudyView />;
}
