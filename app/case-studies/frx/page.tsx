import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FrxBelowHero from "./FrxBelowHero";
import { FrxSectionsBeforeSolution } from "./FrxExtendedSections";
import FrxImpactSection from "./FrxImpactSection";
import FrxSolutionSteps from "./FrxSolutionSteps";
import CaseStudyNextProjectButton from "../../components/CaseStudyNextProjectButton";

export default function FrxCaseStudyPage() {
  return (
    <>
      <main className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
        <div className="flex w-full justify-center overflow-x-visible px-8 lg:px-16">
          <div className="flex w-full max-w-[1200px] flex-col items-stretch overflow-x-visible pb-32 pt-12">
            <Header
              leftVariant="back"
              backHref="/"
              backAriaLabel="Back to home"
            />

            <section className="mt-24 flex w-full flex-col gap-10 md:mt-32 lg:mt-36">
              <h1 className="max-w-[1291px] font-sans text-[clamp(32px,4.8vw,64px)] font-semibold leading-[1.305] text-black">
                Modernizing in-clinic medication refills at scale
              </h1>
            </section>

            <section className="mt-16 w-full md:mt-24 lg:mt-28">
              <div className="relative w-full overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/frx/frx.png"
                  alt="In-clinic digital refill workflow in CareTeamHub"
                  className="block h-auto w-full"
                />
              </div>
            </section>

            <FrxBelowHero />

            <section
              className="mt-24 w-[calc(100%+4rem)] max-w-none -mx-8 rounded-2xl bg-[#E8E6E1] py-12 md:mt-32 md:py-16 lg:mt-40 lg:py-20 lg:w-[calc(100%+8rem)] lg:-mx-16"
              aria-labelledby="frx-problem-heading"
            >
              <div className="px-8 lg:px-16">
                <p className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                  The Problem
                </p>
                <h2
                  id="frx-problem-heading"
                  className="mt-4 w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black md:mt-5"
                >
                  Paper Refills Pulled Nurses Away From Patient Care
                </h2>
                <p className="mt-5 w-full font-sans text-[22px] font-normal leading-[1.45] text-black/80 md:mt-6 md:text-[24px]">
                  Before digitization, in-clinic refills depended on paper forms,
                  fax handoffs, clipboards, and phone calls with pharmacy. Nurses
                  spent time printing, tracking, signing, and refaxing forms —
                  while refill status disappeared from view once paperwork left
                  the clinic.
                </p>
                <div className="mt-10 grid w-full grid-cols-1 gap-10 md:mt-12 md:grid-cols-2 md:items-start md:gap-12 lg:mt-14 lg:gap-14">
                  <div className="flex min-w-0 w-full flex-col gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/frx/raf3.png"
                      alt="Paper RAF forms and manual refill coordination"
                      className="h-auto w-full rounded-2xl border border-black/10 bg-white/40"
                    />
                    <p className="font-sans text-[16px] leading-[1.55] text-black/65">
                      <span className="font-semibold text-black/65">
                        Administrative burden:
                      </span>{" "}
                      Printing, signing, refaxing, and tracking forms pulled hours
                      away from patient-facing work each week.
                    </p>
                  </div>
                  <div className="flex min-w-0 w-full flex-col gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/frx/disconnected.png"
                      alt="Clinic workflow disconnected from pharmacy processing status"
                      className="h-auto w-full rounded-2xl border border-black/10 bg-white/40"
                    />
                    <p className="font-sans text-[16px] leading-[1.55] text-black/65">
                      <span className="font-semibold text-black/65">
                        Visibility gap:
                      </span>{" "}
                      Pharmacy systems tracked every step, but clinics had no
                      shared view—status checks defaulted to phone calls.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <FrxSectionsBeforeSolution />

            <section className="mt-16 w-full md:mt-24 lg:mt-28">
              <FrxSolutionSteps />
            </section>

            <FrxImpactSection />

            <CaseStudyNextProjectButton currentPath="/case-studies/frx" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
