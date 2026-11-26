import type { ReactNode } from "react";

import { PRIMARY_FILLED_INTERACTIVE } from "../../components/buttonTokens";
import { mediaCardClass } from "../frx/FrxExtendedSections";
import {
  frxSectionBodyClass,
  frxSectionGapClass,
  frxSplitRowGridClass,
  frxStrategyHeadlineClass,
} from "../frx/frxCaseStudyTypography";
import VinylBelowHero from "./VinylBelowHero";
import { vinylNavScrollMtClass } from "./vinylCaseStudyNav";
import {
  vinylPatientStory,
  vinylPrototypeSection,
} from "./vinylBelowHeroData";

function NavAnchor({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div id={id} data-vinyl-case-study-section="" className={vinylNavScrollMtClass}>
      {children}
    </div>
  );
}

export default function VinylCaseStudyBody() {
  return (
    <>
      <NavAnchor id="vinyl-nav-overview">
        <VinylBelowHero />
      </NavAnchor>

      <NavAnchor id="vinyl-nav-story">
        <section
          className={frxSectionGapClass}
          aria-labelledby="vinyl-story-heading"
        >
          <div className={frxSplitRowGridClass}>
            <div className="flex min-w-0 flex-col self-start">
              <h2 id="vinyl-story-heading" className={frxStrategyHeadlineClass}>
                {vinylPatientStory.title}
              </h2>
              <p className={`${frxSectionBodyClass} mt-5 md:mt-6`}>
                {vinylPatientStory.body}
              </p>
            </div>
            <div className={`${mediaCardClass} min-w-0 w-full self-start`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={vinylPatientStory.imageSrc}
                alt={vinylPatientStory.imageAlt}
                className="block w-full rounded-md"
              />
            </div>
          </div>
        </section>
      </NavAnchor>

      <NavAnchor id="vinyl-nav-prototype">
        <section
          className={`${frxSectionGapClass} pb-12 md:pb-16 lg:pb-20`}
          aria-labelledby="vinyl-prototype-heading"
        >
          <h2 id="vinyl-prototype-heading" className={frxStrategyHeadlineClass}>
            {vinylPrototypeSection.title}
          </h2>
          <p className={`${frxSectionBodyClass} mt-5 max-w-[40rem] md:mt-6`}>
            {vinylPrototypeSection.body}
          </p>
          <a
            href={vinylPrototypeSection.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View interactive prototype (opens in a new tab)"
            className={`${mediaCardClass} mt-8 block w-full md:mt-10`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={vinylPrototypeSection.imageSrc}
              alt={vinylPrototypeSection.imageAlt}
              className="block w-full rounded-md"
            />
          </a>
          <a
            href={vinylPrototypeSection.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 inline-flex items-center gap-2 rounded-[8px] px-4 py-2.5 font-sans text-[14px] font-medium leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] ${PRIMARY_FILLED_INTERACTIVE}`}
          >
            View interactive prototype
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>
      </NavAnchor>
    </>
  );
}
