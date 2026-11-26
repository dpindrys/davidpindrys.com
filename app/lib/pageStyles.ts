export const shellClass = "w-full px-6 md:px-10";
/** Homepage column: case-study content (1200) plus the desktop sidebar (280). */
export const columnClass = "mx-auto w-full max-w-[1480px]";
export const sectionGapClass = "mt-20 md:mt-28";

export const sideLeadClass =
  "font-sans text-[1.375rem] font-normal leading-[1.35] tracking-[-0.02em] text-black md:text-[1.75rem]";
export const cardTitleClass =
  "font-sans text-[20px] font-medium leading-[1.25] tracking-[-0.02em] text-black";
/** Work card client names and other h3 headings — same scale as services card titles. */
export const companyNameClass = cardTitleClass;
/** Case study + homepage body paragraphs — AA on bone `#E8E5DE` / cream. */
export const bodyClass = "font-sans text-[16px] leading-[1.6] text-black/80 md:text-[17px]";
export const cardBodyClass = "font-sans text-[15px] leading-[1.55] text-black/80";
export const metaTextClass = "font-sans text-[13px] leading-none text-black/80";

export const tagClass = "border border-black/15 bg-white px-2.5 py-1 font-sans text-[13px] font-bold leading-none text-black/80";
export const challengeTagClass =
  "border border-black bg-black px-2.5 py-1 font-sans text-[13px] font-bold leading-none text-white";
export const eyebrowClass =
  "font-sans text-[13px] font-semibold uppercase leading-none tracking-[0.16em] text-black md:text-[14px]";
export const filledCardClass = "rounded-[20px] bg-[#E8E5DE] p-6 md:p-8";
export const outlineCardClass = "border border-black/10 p-5 sm:p-6";

/** Compact circular play/pause diameter — shared with DemoDialog walkthrough chrome. */
export const compactPlayControlSizeClass = "h-12 w-12";

export const heroToggleClass =
  `absolute left-4 top-4 z-[2] flex ${compactPlayControlSizeClass} items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity duration-200 group-hover/hero:opacity-100 focus-visible:opacity-100 md:left-5 md:top-5`;
