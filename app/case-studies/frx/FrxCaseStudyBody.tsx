import type { ReactNode } from "react";

import FrxBelowHero from "./FrxBelowHero";
import FrxChallengeCard from "./FrxChallengeCard";
import { FrxSectionsBeforeSolution } from "./FrxExtendedSections";
import FrxImpactSection from "./FrxImpactSection";
import {
  frxBelowHeroSummaryBlock,
  frxHeroFocusPills,
} from "./frxBelowHeroData";
import { frxNavScrollMtClass } from "./frxCaseStudyNav";
import {
  frxHeroTitleClass,
  frxHeroTitleMaxWidthClass,
  frxSectionBodyClass,
  frxTagClass,
} from "./frxCaseStudyTypography";
import FrxDeviceHeroMockup from "./FrxDeviceHeroMockup";

function NavAnchor({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div id={id} data-frx-case-study-section="" className={frxNavScrollMtClass}>
      {children}
    </div>
  );
}

export type FrxCaseStudyBodyVariant = "page" | "modal";

export default function FrxCaseStudyBody({
  variant = "page",
}: {
  variant?: FrxCaseStudyBodyVariant;
}) {
  const isPage = variant === "page";

  return (
    <>
      {isPage ? (
        <section className="flex w-full flex-col gap-6">
          <h1 className={`${frxHeroTitleClass} ${frxHeroTitleMaxWidthClass}`}>
            A one-click refill workflow for 2,800+ dialysis clinics
          </h1>
          <div className="flex min-w-0 max-w-full flex-col gap-4 overflow-visible md:max-w-[42rem]">
            <p className={`${frxSectionBodyClass} whitespace-pre-line`}>
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
      ) : null}

      {isPage ? (
        <section className="mt-12 w-full">
          <FrxDeviceHeroMockup />
        </section>
      ) : null}

      <NavAnchor id="frx-nav-overview">
        <FrxBelowHero />
      </NavAnchor>

      <FrxChallengeCard />

      <FrxSectionsBeforeSolution />

      <FrxImpactSection />
    </>
  );
}