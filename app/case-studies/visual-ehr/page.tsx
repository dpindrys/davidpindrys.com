import Footer from "../../components/Footer";
import VehrBelowHero from "./VehrBelowHero";
import {
  vehrHeroFocusPills,
  vehrHeroLead,
  vehrProductContext,
} from "./vehrBelowHeroData";
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
} from "../frx/frxCaseStudyTypography";
import VehrChallengeCard from "./VehrChallengeCard";
import VehrStrategySection from "./VehrStrategySection";
import VehrGroundworkSection from "./VehrGroundworkSection";
import VehrAppliedExamplesShell from "./VehrAppliedExamplesShell";
import VehrSymptomsOnTimelineSection from "./VehrPatientReportedOutcomesSection";
import VehrClosingSections from "./VehrClosingSections";
import VehrDeviceHeroMockup from "./VehrDeviceHeroMockup";

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
  return (
    <>
      <main id="main-content" className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
        <div className={`${frxShellClass} pb-20 pt-10 md:pb-28 md:pt-14`}>
          <div className={`${frxColumnClass} flex flex-col items-stretch overflow-x-visible`}>
            <section className="flex w-full flex-col gap-6">
              <h1 className={`${frxHeroTitleClass} ${frxHeroTitleMaxWidthClass}`}>
                Turning fragmented patient records into coherent clinical narratives
              </h1>
              <div className="flex min-w-0 max-w-full flex-col gap-4 overflow-visible md:max-w-[42rem]">
                <p className={frxSectionBodyClass}>{vehrHeroLead.body}</p>
                <ul
                  className="flex flex-wrap gap-2 overflow-visible"
                  aria-label="Focus areas"
                >
                  {vehrHeroFocusPills.map((label) => (
                    <li key={label} className="shrink-0">
                      <span className={frxTagClass}>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-12 w-full">
              <VehrDeviceHeroMockup />
            </section>

            <VehrBelowHero />

            <section
              className={frxCenteredIntroSectionClass}
              aria-labelledby="vehr-product-context-heading"
            >
              <div className={frxCenteredIntroBlockClass}>
                <h2
                  id="vehr-product-context-heading"
                  className={frxStrategyHeadlineClass}
                >
                  {vehrProductContext.title}
                </h2>
                <p className={frxSectionBodyClass}>{vehrProductContext.body}</p>
              </div>
            </section>

            <VehrChallengeCard />

            <VehrStrategySection />

            <VehrGroundworkSection />

            <VehrAppliedExamplesShell>
              <VehrSymptomsOnTimelineSection />
            </VehrAppliedExamplesShell>

            <VehrClosingSections />
          </div>
        </div>
      </main>
      <Footer linkBase="/" />
    </>
  );
}