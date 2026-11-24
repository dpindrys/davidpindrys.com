/** Dark green fill with #F4F2EE text — shared interactive fill for primary CTAs. */
export const PRIMARY_FILLED_INTERACTIVE =
  "bg-[#1F2621] text-[#F4F2EE] transition-colors hover:bg-[#2A332C]";

/**
 * Homepage / footer CTA system:
 * primary (filled) · outline · text — same size and weight everywhere.
 */
export const buttonPrimaryClass = `inline-flex items-center gap-2 px-5 py-3.5 font-sans text-[15px] font-medium leading-none disabled:cursor-not-allowed disabled:opacity-60 ${PRIMARY_FILLED_INTERACTIVE}`;

export const buttonOutlineClass =
  "inline-flex items-center gap-2 border border-black/30 bg-transparent px-5 py-3.5 font-sans text-[15px] font-medium leading-none text-black/85 transition-colors hover:border-black/50 hover:text-black";

export const buttonTextClass =
  "inline-flex items-center gap-1.5 font-sans text-[15px] font-medium leading-none text-black/80 transition-colors hover:text-black";

/** Compact primary for the sticky header only. */
export const buttonNavClass = `inline-flex items-center gap-2 px-4 py-2.5 font-sans text-[14px] font-medium leading-none ${PRIMARY_FILLED_INTERACTIVE}`;
