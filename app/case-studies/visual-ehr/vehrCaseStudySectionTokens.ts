import { cardTitleClass, sideLeadClass } from "../../lib/pageStyles";
import { frxSectionBodyClass, frxSectionTitleClass } from "../frx/frxCaseStudyTypography";

export const vehrEyebrowClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";

/** Section h2 — matches homepage section leads. */
export const vehrSectionTitleClass = `w-full ${sideLeadClass}`;

/** Applied-example article titles — matches FRx process row headings. */
export const vehrAppliedArticleTitleClass = frxSectionTitleClass;

/** Body paragraphs — matches FRx case study (`text-[16px] leading-[1.5]`). */
export const vehrBodyClass = `w-full ${frxSectionBodyClass}`;

export const vehrStepBodyClass = frxSectionBodyClass;

export const vehrProblemCardClass =
  "rounded-2xl bg-[#E8E6E1] px-8 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14";

/** Divider between blocks inside a unified problem-arc card. */
export const vehrProblemArcDividerClass =
  "border-t border-black/10 pt-14 md:pt-16 lg:pt-20";

export const vehrSectionGapClass = "mt-16 w-full md:mt-20 lg:mt-24";

/** Subsection h3 — matches services card titles. */
export const vehrSubsectionTitleClass = `scroll-mt-28 w-full ${cardTitleClass}`;

export const vehrAppliedExampleIntroClass =
  `w-full max-w-[52rem] ${frxSectionBodyClass}`;
