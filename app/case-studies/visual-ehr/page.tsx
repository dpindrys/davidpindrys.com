import VehrCaseStudyView from "./VehrCaseStudyView";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rebuilding chart review around the patient story",
  description:
    "A timeline-based EHR that reorganizes fragmented records into a coherent longitudinal clinical narrative.",
  openGraph: {
    title: "Rebuilding chart review around the patient story | David Pindrys",
    description:
      "A timeline-based EHR that reorganizes fragmented records into a coherent longitudinal clinical narrative.",
  },
};

export default function VisualEhrCaseStudyPage() {
  return <VehrCaseStudyView />;
}
