import type { ReactNode } from "react";

import { mediaCardClass } from "../frx/FrxExtendedSections";
import {
  frxSectionBodyClass,
  frxSectionGapClass,
  frxSplitRowGridClass,
  frxStrategyHeadlineClass,
} from "../frx/frxCaseStudyTypography";
import DellBelowHero from "./DellBelowHero";
import { dellNavScrollMtClass } from "./dellCaseStudyNav";
import {
  dellCareTeamSection,
  dellHomeSection,
  dellIdCardsSection,
} from "./dellBelowHeroData";

function NavAnchor({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div id={id} data-dell-case-study-section="" className={dellNavScrollMtClass}>
      {children}
    </div>
  );
}

function SplitSection({
  headingId,
  title,
  body,
  imageSrc,
  imageAlt,
  className,
}: {
  headingId: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
}) {
  return (
    <section className={className ?? frxSectionGapClass} aria-labelledby={headingId}>
      <div className={frxSplitRowGridClass}>
        <div className="flex min-w-0 flex-col self-start">
          <h2 id={headingId} className={frxStrategyHeadlineClass}>
            {title}
          </h2>
          <p className={`${frxSectionBodyClass} mt-5 md:mt-6`}>{body}</p>
        </div>
        <div className={`${mediaCardClass} min-w-0 w-full self-start`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc} alt={imageAlt} className="block w-full rounded-md" />
        </div>
      </div>
    </section>
  );
}

export default function DellCaseStudyBody() {
  return (
    <>
      <NavAnchor id="dell-nav-overview">
        <DellBelowHero />
      </NavAnchor>

      <NavAnchor id="dell-nav-home">
        <SplitSection
          headingId="dell-home-heading"
          title={dellHomeSection.title}
          body={dellHomeSection.body}
          imageSrc={dellHomeSection.imageSrc}
          imageAlt={dellHomeSection.imageAlt}
        />
      </NavAnchor>

      <NavAnchor id="dell-nav-care-team">
        <SplitSection
          headingId="dell-care-team-heading"
          title={dellCareTeamSection.title}
          body={dellCareTeamSection.body}
          imageSrc={dellCareTeamSection.imageSrc}
          imageAlt={dellCareTeamSection.imageAlt}
        />
      </NavAnchor>

      <NavAnchor id="dell-nav-id-cards">
        <SplitSection
          headingId="dell-id-cards-heading"
          title={dellIdCardsSection.title}
          body={dellIdCardsSection.body}
          imageSrc={dellIdCardsSection.imageSrc}
          imageAlt={dellIdCardsSection.imageAlt}
          className={`${frxSectionGapClass} pb-12 md:pb-16 lg:pb-20`}
        />
      </NavAnchor>
    </>
  );
}
