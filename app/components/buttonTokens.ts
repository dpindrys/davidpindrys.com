/** Primary blue fill #0078B3 gives 4.84:1 with white text (WCAG 1.4.3 AA). Border #00567F for definition. */

/** Primary CTA — cyan fill, darker blue border (matches Hero, layout top bar). */
export const PRIMARY_FILLED_INTERACTIVE =
  "border-2 border-[#00567F] bg-[#0078B3] text-white transition-opacity hover:opacity-90";

/** White surfaces with gray border; hover uses border/background only (no shadow) */
export const SECONDARY_OUTLINE_INTERACTIVE =
  "border-2 border-neutral-300 bg-white transition-[border-color,background-color] duration-150 hover:border-neutral-400 hover:bg-neutral-50 active:bg-neutral-100/80";
