import Footer from "../../components/Footer";
import VehrBelowHero from "./VehrBelowHero";
import {
  vehrHeroFocusPills,
  vehrHeroLead,
  vehrProductContext,
} from "./vehrBelowHeroData";
import { frxStrategyHeadlineClass } from "../frx/FrxExtendedSections";
import {
  frxCenteredIntroBlockClass,
  frxCenteredIntroSectionClass,
  frxHeroTitleClass,
  frxHeroTitleMaxWidthClass,
  frxSectionBodyClass,
} from "../frx/frxCaseStudyTypography";
import VehrChallengeCard from "./VehrChallengeCard";
import VehrStrategySection from "./VehrStrategySection";
import VehrGroundworkSection from "./VehrGroundworkSection";
import VehrAppliedExamplesShell from "./VehrAppliedExamplesShell";
import VehrSymptomsOnTimelineSection from "./VehrPatientReportedOutcomesSection";
import VehrClosingSections from "./VehrClosingSections";
import CaseStudyNextProjectButton from "../../components/CaseStudyNextProjectButton";
import VehrDeviceHeroMockup from "./VehrDeviceHeroMockup";

const vehrHeroPillClass =
  "inline-flex rounded-full border border-black/10 bg-white px-3 py-1.5 font-sans text-[13px] leading-none text-black/70";

export default function VisualEhrCaseStudyPage() {
  return (
    <>
      <main className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
        <div className="flex justify-center w-full overflow-x-visible px-8 lg:px-16">
          <div className="flex flex-col items-stretch w-full max-w-[1200px] pt-4 pb-32 overflow-x-visible">
            <section className="flex w-full flex-col gap-8 pt-8 md:gap-10 md:pt-12 lg:pt-16">
              <h1 className={`${frxHeroTitleClass} ${frxHeroTitleMaxWidthClass}`}>
                Turning fragmented patient records into coherent clinical
                narratives
              </h1>
              <div className="flex min-w-0 max-w-full flex-col gap-4 overflow-visible md:max-w-[50%]">
                <p className={frxSectionBodyClass}>{vehrHeroLead.body}</p>
                <ul
                  className="flex flex-nowrap gap-2 overflow-visible"
                  aria-label="Focus areas"
                >
                  {vehrHeroFocusPills.map((label) => (
                    <li key={label} className="shrink-0">
                      <span className={vehrHeroPillClass}>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-16 w-full md:mt-24 lg:mt-28">
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

            <CaseStudyNextProjectButton currentPath="/case-studies/visual-ehr" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
