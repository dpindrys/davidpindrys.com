/**
 * Shared segmented tab styling for case study highlight sections.
 * Restrained, editorial; focus ring is keyboard-only and neutral (not selection chrome).
 */

/** Page background for ring offset (see app/globals.css / layout body) */
const FOCUS_RING_OFFSET = "ring-offset-[#F4F2EE]";

/** Caps width so the control does not span the full content column; equal segments inside. */
export const HIGHLIGHT_TAB_BAR_WRAPPER_CLASS =
  "self-start w-full max-w-xl pb-1 pt-1";

export const HIGHLIGHT_TAB_LIST_CLASS =
  "flex w-full flex-row gap-0.5 rounded-[10px] border border-black/[0.08] bg-black/[0.022] p-1";

export function highlightTabButtonClass(selected: boolean): string {
  const focus =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/16 focus-visible:ring-offset-2 " +
    FOCUS_RING_OFFSET;

  const base =
    `min-h-[40px] min-w-0 flex-1 basis-0 rounded-[7px] px-2 py-1.5 text-center font-sans text-[15px] leading-snug transition-[color,background-color,box-shadow,border-color] duration-150 sm:px-3 sm:text-[15px] ${focus} `;

  if (selected) {
    return (
      `${base}` +
      "cursor-default border border-black/[0.13] bg-white font-semibold text-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,0.07)]"
    );
  }

  return (
    `${base}` +
    "cursor-pointer border border-transparent bg-transparent font-medium text-neutral-600 hover:bg-black/[0.035] hover:text-neutral-950 active:bg-black/[0.045]"
  );
}
