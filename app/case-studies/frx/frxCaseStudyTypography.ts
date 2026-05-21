/** Shared FRx case study type — matches hero / problem card treatment. */
export const frxHeroTitleClass =
  "font-sans text-[clamp(32px,4.8vw,64px)] font-semibold leading-[1.305] text-black";

export const frxHeroLeadClass =
  "font-sans text-[clamp(32px,4.8vw,64px)] font-normal leading-[1.305] text-black";

export const frxHeroTitleMaxWidthClass = "max-w-[1291px]";

export const frxMetaEyebrowClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";

export const frxSectionTitleClass =
  "font-sans text-[16px] font-semibold leading-[1.5] text-black";

export const frxSectionBodyClass =
  "font-sans text-[16px] font-normal leading-[1.5] text-black";

/** Eyebrow band height — matches problem card top padding (challenge eyebrow zone). */
export const frxEyebrowBandClass = "flex h-12 items-center md:h-16 lg:h-20";

export const frxSectionIntroStackClass = "flex flex-col gap-1.5";

/** Two-column body layout: text 40% | media 60% on md+. */
export const frxSplitRowGridClass =
  "grid w-full grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12 lg:gap-14";

/** Absolute eyebrow in top padding band (matches challenge card). */
export const frxPaddedEyebrowClass = `absolute top-0 left-0 z-10 flex h-12 items-center md:h-16 lg:h-20 ${frxMetaEyebrowClass}`;

/** Centered intro block (e.g. FreseniusRx / solution lead-in). */
export const frxCenteredIntroSectionClass =
  "mt-24 flex w-full flex-col items-center md:mt-32 lg:mt-40";
export const frxCenteredIntroBlockClass =
  "flex w-full min-w-0 max-w-full flex-col gap-1.5 text-left md:max-w-[50%]";
