import Footer from "../../components/Footer";
import FrxBelowHero from "./FrxBelowHero";
import {
  frxBelowHeroSummaryBlock,
  frxHeroFocusPills,
  frxProductContext,
} from "./frxBelowHeroData";
import { FrxSectionsBeforeSolution } from "./FrxExtendedSections";
import FrxImpactSection from "./FrxImpactSection";
import FrxChallengeCard from "./FrxChallengeCard";
import FrxDeviceHeroMockup from "./FrxDeviceHeroMockup";
import {
  frxCenteredIntroBlockClass,
  frxCenteredIntroSectionClass,
  frxColumnClass,
  frxHeroTitleClass,
  frxHeroTitleMaxWidthClass,
  frxSectionBodyClass,
  frxShellClass,
  frxStrategyHeadlineClass,
  frxTagClass,
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
            <section className="flex w-full flex-col gap-6">
              <h1 className={`${frxHeroTitleClass} ${frxHeroTitleMaxWidthClass}`}>
                A one-click refill workflow for 2,800+ dialysis clinics
              </h1>
              <div className="flex min-w-0 max-w-full flex-col gap-4 overflow-visible md:max-w-[42rem]">
                <p className={frxSectionBodyClass}>
                  {frxBelowHeroSummaryBlock.body}
                </p>
                <ul
                  className="flex flex-wrap gap-2 overflow-visible"
                  aria-label="Focus areas"
                >
                  {frxHeroFocusPills.map((label) => (
                    <li key={label} className="shrink-0">
                      <span className={frxTagClass}>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-12 w-full">
              <FrxDeviceHeroMockup />
            </section>

            <FrxBelowHero />

            <section
              className={frxCenteredIntroSectionClass}
              aria-labelledby="frx-product-context-heading"
            >
              <div className={frxCenteredIntroBlockClass}>
                <h2
                  id="frx-product-context-heading"
                  className={frxStrategyHeadlineClass}
                >
                  {frxProductContext.title}
                </h2>
                <p className={frxSectionBodyClass}>{frxProductContext.body}</p>
              </div>
            </section>

            <FrxChallengeCard />

            <FrxSectionsBeforeSolution />

            <FrxImpactSection />
          </div>
        </div>
      </main>
      <Footer linkBase="/" />
    </>
  );
}
