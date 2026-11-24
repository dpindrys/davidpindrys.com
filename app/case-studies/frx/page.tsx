import FrxCaseStudyView from "./FrxCaseStudyView";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A one-click refill workflow for 2,800+ dialysis clinics",
  description:
    "Replacing paper, fax, and phone-tag refills inside a Salesforce-based clinic application, cutting refill time by 70%.",
  openGraph: {
    title: "A one-click refill workflow for 2,800+ dialysis clinics | David Pindrys",
    description:
      "Replacing paper, fax, and phone-tag refills inside a Salesforce-based clinic application, cutting refill time by 70%.",
  },
};

export default function FrxCaseStudyPage() {
  return <FrxCaseStudyView />;
}
