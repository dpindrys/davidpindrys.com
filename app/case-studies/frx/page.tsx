import Footer from "../../components/Footer";
import FrxCaseStudyBody from "./FrxCaseStudyBody";
import {
  frxColumnClass,
  frxShellClass,
} from "./frxCaseStudyTypography";

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
  return (
    <>
      <main id="main-content" className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
        <div className={`${frxShellClass} pb-20 pt-10 md:pb-28 md:pt-14`}>
          <div className={`${frxColumnClass} flex flex-col items-stretch overflow-x-visible`}>
            <FrxCaseStudyBody variant="page" />
          </div>
        </div>
      </main>
      <Footer linkBase="/" />
    </>
  );
}