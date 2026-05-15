import Header from "../../components/Header";
import Footer from "../../components/Footer";
import VehrBelowHero from "./VehrBelowHero";
import VehrChartReviewMappingSection from "./VehrChartReviewMappingSection";
import VehrProblemArcSection from "./VehrProblemArcSection";
import VehrSharedTemporalModel from "./VehrSharedTemporalModel";
import VehrAppliedExamplesShell from "./VehrAppliedExamplesShell";
import VehrSymptomsOnTimelineSection from "./VehrPatientReportedOutcomesSection";
import VehrDiagnosesThroughTimeSection from "./VehrDiagnosesThroughTimeSection";
import VehrFromNoiseToSignalSection from "./VehrFromNoiseToSignalSection";
import VehrMedicationEventsSection from "./VehrMedicationEventsSection";
import VehrNarrativeSynthesis from "./VehrNarrativeSynthesis";
import VehrClosingSections from "./VehrClosingSections";
import CaseStudyNextProjectButton from "../../components/CaseStudyNextProjectButton";
import { vehrSectionGapClass } from "./vehrCaseStudySectionTokens";

export default function VisualEhrCaseStudyPage() {
  return (
    <>
      <main className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
        <div className="flex justify-center w-full overflow-x-visible px-8 lg:px-16">
          <div className="flex flex-col items-stretch w-full max-w-[1200px] pt-12 pb-32 overflow-x-visible">
            <Header
              leftVariant="back"
              backHref="/"
              backAriaLabel="Back to home"
            />

            <section className="mt-24 md:mt-32 lg:mt-36 flex w-full flex-col gap-10">
              <h1 className="max-w-[1291px] font-sans text-[clamp(32px,4.8vw,64px)] font-semibold leading-[1.305] text-black">
                Turning fragmented patient records into coherent clinical
                narratives
              </h1>
            </section>

            <section className="mt-16 md:mt-24 lg:mt-28 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/vehr/vehr.png"
                alt="VEHR Technologies, patient timeline interface on iPad"
                className="block w-full h-auto rounded-2xl"
              />
            </section>

            <VehrBelowHero />

            <VehrChartReviewMappingSection />

            <VehrProblemArcSection />

            <section
              className={vehrSectionGapClass}
              aria-labelledby="vehr-master-solution-heading"
            >
              <VehrSharedTemporalModel />
            </section>

            <VehrAppliedExamplesShell>
              <VehrSymptomsOnTimelineSection />
              <VehrDiagnosesThroughTimeSection />
              <VehrFromNoiseToSignalSection />
              <VehrMedicationEventsSection />
            </VehrAppliedExamplesShell>

            <VehrNarrativeSynthesis />

            <VehrClosingSections />

            <CaseStudyNextProjectButton currentPath="/case-studies/visual-ehr" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
