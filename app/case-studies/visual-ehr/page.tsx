import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DesignLogicFromSignal from "./DesignLogicFromSignal";
import VehrBelowHero from "./VehrBelowHero";

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

            <section className="mt-24 md:mt-32 lg:mt-36 flex w-full flex-col gap-6">
              <h1 className="max-w-[1291px] font-sans text-[22px] md:text-[24px] font-semibold leading-[1.25] text-black tracking-tight">
                Turning fragmented patient records into coherent clinical
                narratives
              </h1>
              <div className="font-sans text-[22px] md:text-[24px] font-normal leading-[1.45] text-black/70">
                VEHR Technologies <span aria-hidden="true">•</span> 2024
              </div>
            </section>

            <section className="mt-16 md:mt-24 lg:mt-28 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/vehr-hero.png"
                alt="VEHR Technologies, patient timeline interface on iPad"
                className="block w-full h-auto rounded-2xl border border-black/10 bg-white/40"
              />
            </section>

            <VehrBelowHero />

            <section
              className="mt-24 md:mt-32 lg:mt-40 w-[calc(100%+4rem)] max-w-none -mx-8 lg:w-[calc(100%+8rem)] lg:-mx-16 rounded-2xl bg-[#E8E6E1] py-12 md:py-16 lg:py-20"
              aria-labelledby="vehr-ehr-problems-heading"
            >
              <div className="px-8 lg:px-16">
                <p className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                  The Problem
                </p>
                <h2
                  id="vehr-ehr-problems-heading"
                  className="mt-4 w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black md:mt-5"
                >
                  Fragmented and Dense Patient Data
                </h2>
                <p className="mt-5 md:mt-6 w-full font-sans text-[22px] md:text-[24px] font-normal leading-[1.45] text-black/80">
                  EHRs often organize information by source: labs, notes,
                  medications, encounters, diagnoses, and vitals. But clinicians
                  reason across time. When those streams are separated, clinicians
                  must reconstruct the story manually. When they are combined
                  longitudinally, the view can quickly become too dense to interpret.
                </p>
                <div className="mt-10 md:mt-12 lg:mt-14 grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:items-start md:gap-12 lg:gap-14">
                  <div className="flex w-full min-w-0 flex-col gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/vehr/mismatch.png"
                      alt="Mental model mismatch between EHR structure and clinical reasoning"
                      className="w-full h-auto rounded-2xl border border-black/10 bg-white/40"
                    />
                    <p className="font-sans text-[16px] leading-[1.55] text-black/75">
                      <span className="font-semibold text-black">
                        Source-oriented review:
                      </span>{" "}
                      Clinical data is separated by tabs and data type.
                    </p>
                  </div>
                  <div className="flex w-full min-w-0 flex-col gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/vehr/overload.png"
                      alt="Dense EHR data view with weak clinical signal"
                      className="w-full h-auto rounded-2xl border border-black/10 bg-white/40"
                    />
                    <p className="font-sans text-[16px] leading-[1.55] text-black/75">
                      <span className="font-semibold text-black">
                        Cognitive overload:
                      </span>{" "}
                      Visualizing values over time creates visual noise.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-16 md:mt-24 lg:mt-28 w-full">
              <DesignLogicFromSignal />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
