/**
 * Shared shell for matrix-style case study cards (vitals/labs, medications, PRO).
 * Slightly tighter padding on the right so row labels sit closer to the card edge
 * (matches vitals/labs reference); vertical and left padding stay generous.
 */
export const CASE_STUDY_MATRIX_SHELL_CLASS =
  "rounded-2xl border border-black/10 bg-white py-4 pl-4 pr-2.5 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.06)] md:py-5 md:pl-5 md:pr-2.5";

/**
 * Sticky / full-bleed bands inside `CASE_STUDY_MATRIX_SHELL_CLASS` must mirror its
 * horizontal padding (used by the shared time axis date footer).
 */
export const CASE_STUDY_MATRIX_SHELL_STICKY_BLEED_CLASS =
  "-ml-4 -mr-2.5 pl-4 pr-2.5 md:-ml-5 md:-mr-2.5 md:pl-5 md:pr-2.5";

/**
 * Matrix body + row labels: second column is fixed 70px (label column width).
 */
export const CASE_STUDY_MATRIX_INNER_GRID_CLASS =
  "grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_70px] md:gap-x-2 md:gap-y-2.5";

/** Right column for row labels — fixed 70px so card padding stays even on the right. */
export const CASE_STUDY_MATRIX_LABEL_COL_CLASS =
  "hidden w-[70px] shrink-0 md:flex md:flex-col md:items-start";

/** Vitals/labs + PRO — narrower 50px label column (shorter row labels). */
export const CASE_STUDY_MATRIX_INNER_GRID_COMPACT_CLASS =
  "grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_50px] md:gap-x-2 md:gap-y-2.5";

export const CASE_STUDY_MATRIX_LABEL_COL_COMPACT_CLASS =
  "hidden w-[50px] shrink-0 md:flex md:flex-col md:items-start";

/** Right-column row labels — pair with `CASE_STUDY_MATRIX_LABEL_COL_CLASS`. */
export const CASE_STUDY_MATRIX_ROW_LABEL_CLASS =
  "flex min-h-[52px] shrink-0 items-center justify-start whitespace-nowrap pl-0 pr-0 font-sans text-[11px] font-semibold leading-tight text-black/65 md:min-h-[60px] md:text-[12px]";
