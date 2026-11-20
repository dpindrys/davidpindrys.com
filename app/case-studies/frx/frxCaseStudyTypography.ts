import {
  bodyClass,
  cardTitleClass,
  columnClass,
  eyebrowClass,
  filledCardClass,
  metaTextClass,
  shellClass,
  tagClass,
} from "../../lib/pageStyles";

/** Page chrome — matches homepage shell / content column. */
export const frxShellClass = shellClass;
export const frxColumnClass = columnClass;

/** Case study hero title — same scale/weight as homepage “Selected work” heading. */
export const frxHeroTitleClass =
  "font-sans text-[clamp(2.4rem,4.4vw,3.15rem)] font-medium leading-[1.02] tracking-[-0.035em] text-black";

export const frxHeroLeadClass =
  "font-sans text-[clamp(2.4rem,4.4vw,3.15rem)] font-normal leading-[1.02] tracking-[-0.035em] text-black";

export const frxHeroTitleMaxWidthClass = "max-w-[40rem] md:max-w-[52rem]";

export const frxMetaEyebrowClass = eyebrowClass;

export const frxSectionTitleClass = cardTitleClass;

export const frxSectionBodyClass = bodyClass;

/** Section lead (strategy / solution / product context). */
export const frxStrategyHeadlineClass =
  "font-sans text-[clamp(1.65rem,2.6vw,2.15rem)] font-medium leading-[1.12] tracking-[-0.03em] text-black";

export const frxTagClass = tagClass;

export const frxMetaValueClass =
  "font-sans text-[16px] font-medium leading-[1.5] text-black";

export const frxMetaLabelClass = metaTextClass;

/** Homepage-aligned card chrome for media / interactive shells. */
export const frxOutlineCardClass =
  "rounded-[16px] border border-black/15 p-5 md:p-6";

export const frxFilledBandClass = filledCardClass;

export const frxSectionGapClass = "mt-12 w-full md:mt-16";

/** Eyebrow band height — used when a section keeps a top padding zone. */
export const frxEyebrowBandClass = "flex h-10 items-center md:h-12";

export const frxSectionIntroStackClass = "flex flex-col gap-3";

/** Two-column body layout: text 40% | media 60% on md+. */
export const frxSplitRowGridClass =
  "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8 lg:gap-10";

/** Absolute eyebrow in top padding band (legacy sections). Prefer flow eyebrows. */
export const frxPaddedEyebrowClass = `absolute top-0 left-0 z-10 flex h-10 items-center md:h-12 ${eyebrowClass}`;

/** Centered intro block (e.g. FreseniusRx / solution lead-in). */
export const frxCenteredIntroSectionClass =
  "mt-12 flex w-full flex-col items-center md:mt-16";
export const frxCenteredIntroBlockClass =
  "flex w-full min-w-0 max-w-full flex-col gap-3 text-left md:max-w-[50%]";
