import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ZoomableProblemImagePair from "../../components/ZoomableProblemImagePair";
import DesignLogicFromSignal from "./DesignLogicFromSignal";
import VehrBelowHero from "./VehrBelowHero";
import VehrMasterSolutionSummary from "./VehrMasterSolutionSummary";
import VehrMedicationsSolutionRows from "./VehrMedicationsSolutionRows";
import VehrRebuildingStorySteps from "./VehrRebuildingStorySteps";
import VehrClosingSections from "./VehrClosingSections";
import CaseStudyNextProjectButton from "../../components/CaseStudyNextProjectButton";

const eyebrowClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";
const masterTitleClass =
  "w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black";
const masterBodyClass =
  "w-full font-sans text-[22px] font-normal leading-[1.45] text-black/80 md:text-[24px]";
const problemCardClass =
  "rounded-2xl bg-[#E8E6E1] px-8 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14";

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

            <section
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="vehr-mapping-chart-review-heading"
            >
              <div className={problemCardClass}>
                <p className={eyebrowClass}>Mapping Chart Review</p>
                <h2
                  id="vehr-mapping-chart-review-heading"
                  className={`${masterTitleClass} mt-4 md:mt-5`}
                >
                  Deconstructing the Chart Review Process
                </h2>
                <p className={`${masterBodyClass} mt-5 md:mt-6`}>
                  I worked with Cole to map the objects clinicians use during chart
                  review — encounters, notes, diagnoses, labs, vitals, and medications —
                  then used those relationships to shape the VEHR timeline.
                </p>
                <div className="mt-8 grid w-full grid-cols-1 gap-10 md:mt-10 md:grid-cols-2 md:items-start md:gap-12 lg:gap-14">
                  <div className="flex min-w-0 w-full flex-col gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/vehr/chart2.png"
                      alt="Chart review mapping: clinical objects and relationships"
                      className="block h-auto w-full rounded-none border border-black/10 bg-white/40 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.12),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
                    />
                    <p className="font-sans text-[16px] leading-[1.55] text-black/65">
                      <strong className="font-semibold text-black/65">
                        Cole&apos;s paper chart system:
                      </strong>{" "}
                      A useful reference for how clinical information gets organized
                      when the record structure follows the clinician&apos;s reasoning.
                    </p>
                  </div>
                  <div className="flex min-w-0 w-full flex-col gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/vehr/map.png"
                      alt="Domain map of problems, events, and relationships for chart review"
                      className="block h-auto w-full rounded-none border border-black/10 bg-white/40 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.12),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
                    />
                    <p className="font-sans text-[16px] leading-[1.55] text-black/65">
                      <strong className="font-semibold text-black/65">
                        Object mapping:
                      </strong>{" "}
                      Translating that reasoning into encounters, diagnoses, labs,
                      vitals, medications, and notes.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="vehr-master-problem-heading"
            >
              <div className={problemCardClass}>
                <p className={eyebrowClass}>The Core Problem</p>
                <h2
                  id="vehr-master-problem-heading"
                  className={`scroll-mt-28 ${masterTitleClass} mt-4 md:mt-5`}
                >
                  Mental Model Mismatch
                </h2>
                <p className={`${masterBodyClass} mt-5 md:mt-6`}>
                  EHRs store patient information by source: notes, labs, vitals,
                  medications, diagnoses, and encounters. Clinicians reason differently.
                  They need to understand what happened over time, what problems were
                  active, what changed, and why it mattered.
                </p>
              </div>
            </section>

            <section
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="vehr-master-solution-heading"
            >
              <VehrMasterSolutionSummary />
            </section>

            <section
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="vehr-patient-stories-heading"
            >
              <div className="rounded-2xl bg-[#E8E6E1] px-8 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
                <p className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                  The Problem
                </p>
                <h2
                  id="vehr-patient-stories-heading"
                  className="scroll-mt-28 mt-4 w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black md:mt-5"
                >
                  Patient Stories Are Split Across Sources
                </h2>
                <p className="mt-5 w-full font-sans text-[22px] font-normal leading-[1.45] text-black/80 md:mt-6 md:text-[24px]">
                  EHRs still organize much of the chart by source: notes, labs, vitals,
                  medications, diagnoses, encounters, and patient-reported information.
                  That structure makes storage easy, but review hard. Clinicians have to
                  move across tabs, compare dates, and mentally reconstruct what happened
                  to the patient over time.
                </p>
                <ZoomableProblemImagePair
                  dialogLabel="Patient Stories figures"
                  className="mt-8 grid w-full grid-cols-1 gap-10 md:mt-10 md:grid-cols-2 md:items-start md:gap-12 lg:gap-14"
                  columns={[
                    {
                      src: "/images/vehr/epic-encounters.png",
                      alt: "Epic EHR encounters organized as separate entries across the chart",
                      caption: (
                        <p className="font-sans text-[16px] leading-[1.55] text-black/65">
                          <span className="font-semibold text-black/65">
                            Encounter list:
                          </span>{" "}
                          Care events are chronological, but the story still has to be
                          assembled manually.
                        </p>
                      ),
                    },
                    {
                      src: "/images/vehr/epic-encounter.png",
                      alt: "Epic EHR encounter note view isolated from the broader patient timeline",
                      caption: (
                        <p className="font-sans text-[16px] leading-[1.55] text-black/65">
                          <span className="font-semibold text-black/65">
                            Visit report:
                          </span>{" "}
                          Diagnoses and orders are visible, but separated from surrounding
                          context.
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
            </section>

            <section
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="vehr-rebuilding-heading"
            >
              <p className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                The Solution
              </p>
              <h2
                id="vehr-rebuilding-heading"
                className="mt-4 w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black md:mt-5"
              >
                Rebuilding the Story Around Time
              </h2>
              <p className="mt-5 w-full font-sans text-[22px] md:text-[24px] font-normal leading-[1.45] text-black/80 md:mt-6">
                VEHR brings diagnoses, encounters, medications, notes, and
                patient-reported context into a shared timeline, so clinicians can review
                the patient&apos;s story in the order it unfolded. Instead of searching
                across separate sources, they can see what changed, when it changed, and
                what else was happening around it.
              </p>
              <VehrRebuildingStorySteps />
            </section>

            <section
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="vehr-ehr-problems-heading"
            >
              <div className="rounded-2xl bg-[#E8E6E1] px-8 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
                <p className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                  The Problem
                </p>
                <h2
                  id="vehr-ehr-problems-heading"
                  className="scroll-mt-28 mt-4 w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black md:mt-5"
                >
                  Trends Become Noise Quickly
                </h2>
                <p className="mt-5 w-full font-sans text-[22px] font-normal leading-[1.45] text-black/80 md:mt-6 md:text-[24px]">
                  Labs and vitals are most useful when interpreted over time, but that
                  evidence is difficult to use when values are buried in tables or plotted
                  across competing scales. The data is there; the display makes clinicians
                  work to find the signal.
                </p>
                <ZoomableProblemImagePair
                  dialogLabel="Trends and noise figures"
                  className="mt-8 grid w-full grid-cols-1 gap-10 md:mt-10 md:grid-cols-2 md:items-start md:gap-12 lg:gap-14"
                  columns={[
                    {
                      src: "/images/vehr/mismatch.png",
                      alt: "Tabular lab and vital review where values are listed without clear emphasis on abnormality or change",
                      caption: (
                        <p className="font-sans text-[16px] leading-snug tracking-tight text-black/65">
                          <span className="font-semibold text-black/65">
                            Tabular review:
                          </span>{" "}
                          Values are available, but abnormality and change have to be found
                          row by row.
                        </p>
                      ),
                    },
                    {
                      src: "/images/vehr/overload.png",
                      alt: "Overlapping trend lines with competing scales obscuring clinically important changes",
                      caption: (
                        <p className="font-sans text-[16px] leading-snug tracking-tight text-black/65">
                          <span className="font-semibold text-black/65">
                            Spaghetti trends:
                          </span>{" "}
                          Overlapping lines and competing scales make clinically important
                          changes hard to see.
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
            </section>

            <section
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="vehr-noise-to-signal-heading"
            >
              <p className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                The Solution
              </p>
              <h2
                id="vehr-noise-to-signal-heading"
                className="mt-4 w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black md:mt-5"
              >
                From Noise to Signal
              </h2>
              <p className="mt-5 w-full font-sans text-[22px] md:text-[24px] font-normal leading-[1.45] text-black/80 md:mt-6">
                VEHR turns labs and vitals into a scannable evidence layer. Luminance gives
                abnormal values greater visual weight as severity increases, while hue
                distinguishes high values from low values. Exact values and clinical context
                stay available when the signal needs closer review.
              </p>
            </section>

            <section className="mt-16 md:mt-24 lg:mt-28 w-full">
              <DesignLogicFromSignal omitLeadIn omitSharedAxis />
            </section>

            <section
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="vehr-medications-problem-heading"
            >
              <div className={problemCardClass}>
                <p className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                  The Problem
                </p>
                <h2
                  id="vehr-medications-problem-heading"
                  className="scroll-mt-28 mt-4 w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black md:mt-5"
                >
                  Medication Lists Hide the Story of Change
                </h2>
                <p className="mt-5 w-full font-sans text-[22px] font-normal leading-[1.45] text-black/80 md:mt-6 md:text-[24px]">
                  Medication lists show what a patient may be taking, but not always what
                  changed, why it changed, or what happened afterward. Starts, stops, dose
                  changes, holds, and refills often have to be reconstructed from separate
                  notes, encounters, and orders.
                </p>
                <div className="mt-8 w-full md:mt-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/vehr/meds-epic.png"
                    alt="Epic EHR medication list where change history is not visible at a glance"
                    className="block h-auto w-full rounded-none border border-black/10 bg-white/40 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.12),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
                  />
                </div>
              </div>

              <div className="mt-16 w-full md:mt-20 lg:mt-24">
                <p className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                  The Solution
                </p>
                <h2
                  id="vehr-medications-solution-heading"
                  className="mt-4 w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black md:mt-5"
                >
                  Place Medication Events on the Timeline
                </h2>
                <p className="mt-5 w-full font-sans text-[22px] md:text-[24px] font-normal leading-[1.45] text-black/80 md:mt-6">
                  Inspired in part by{" "}
                  <a
                    href="http://toomanyclicks.com/about-1"
                    className="text-black underline decoration-black/30 underline-offset-[0.2em] transition-colors hover:decoration-black/60"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Jeff Belden, MD
                  </a>
                  &rsquo;s medication-list usability work, VEHR treats medications as
                  events in the patient story rather than static list items. By aligning
                  medications with encounters, diagnoses, labs, and vitals, clinicians can
                  see when treatment changed — and what clinical context surrounded that
                  change.
                </p>

                <VehrMedicationsSolutionRows />
              </div>
            </section>

            <VehrClosingSections />

            <CaseStudyNextProjectButton currentPath="/case-studies/visual-ehr" />
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
