import Footer from "../../components/Footer";
import FrxBelowHero from "./FrxBelowHero";
import {
  frxBelowHeroSummaryBlock,
  frxHeroFocusPills,
  frxProductContext,
} from "./frxBelowHeroData";
import {
  FrxSectionsBeforeSolution,
  frxStrategyHeadlineClass,
} from "./FrxExtendedSections";
import FrxImpactSection from "./FrxImpactSection";
import FrxChallengeCard from "./FrxChallengeCard";
import FrxSolutionSteps from "./FrxSolutionSteps";
import CaseStudyNextProjectButton from "../../components/CaseStudyNextProjectButton";
import {
  frxCenteredIntroBlockClass,
  frxCenteredIntroSectionClass,
  frxHeroTitleClass,
  frxHeroTitleMaxWidthClass,
  frxSectionBodyClass,
} from "./frxCaseStudyTypography";

const frxHeroPillClass =
  "inline-flex rounded-full border border-black/10 bg-white px-3 py-1.5 font-sans text-[13px] leading-none text-black/70";

export default function FrxCaseStudyPage() {
  return (
    <>
      <main className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
        <div className="flex w-full justify-center overflow-x-visible px-8 lg:px-16">
          <div className="flex w-full max-w-[1200px] flex-col items-stretch overflow-x-visible pb-32 pt-4">
            <section className="flex w-full flex-col gap-8 pt-8 md:gap-10 md:pt-12 lg:pt-16">
              <h1 className={`${frxHeroTitleClass} ${frxHeroTitleMaxWidthClass}`}>
                A one-click refill workflow for 2,800+ dialysis clinics
              </h1>
              <div className="flex min-w-0 max-w-full flex-col gap-4 overflow-visible md:max-w-[50%]">
                <p className={frxSectionBodyClass}>
                  {frxBelowHeroSummaryBlock.body}
                </p>
                <ul
                  className="flex flex-nowrap gap-2 overflow-visible"
                  aria-label="Focus areas"
                >
                  {frxHeroFocusPills.map((label) => (
                    <li key={label} className="shrink-0">
                      <span className={frxHeroPillClass}>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
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

            <FrxSolutionSteps />

            <FrxImpactSection />

            <CaseStudyNextProjectButton currentPath="/case-studies/frx" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
