"use client";

import {
  captionSegmentLabel,
  type DemoCaption,
} from "../lib/demoNarration";

/** Tactile shortcut keys in the cream caption chrome (pure CSS, non-interactive). */
const shortcutKbdBaseClass =
  "pointer-events-none select-none rounded-[6px] border border-black/35 border-b-2 bg-white font-sans text-[11px] font-medium leading-none text-black/80 sm:text-[12px]";
export const demoShortcutKbdClass = `${shortcutKbdBaseClass} px-2.5 py-1`;
export const demoShortcutKbdCompactClass = `${shortcutKbdBaseClass} px-1.5 py-1`;

export function DemoCaptionBody({
  captions,
  captionText,
  captionOpaque,
  captionSpacer,
  segmentFills,
  captionsId,
  onSeekToCaption,
}: {
  captions: readonly DemoCaption[];
  captionText: string;
  captionOpaque: boolean;
  captionSpacer: string;
  segmentFills: number[];
  captionsId: string;
  onSeekToCaption: (index: number) => void;
}) {
  return (
    <>
      <div className="relative" aria-live="polite">
        <p
          className="invisible font-sans text-[15px] font-normal leading-[1.45] sm:text-[16px]"
          aria-hidden="true"
        >
          {captionSpacer}
        </p>
        <p
          id={captionsId}
          className={`absolute inset-0 font-sans text-[15px] font-normal leading-[1.45] text-black/80 transition-opacity duration-150 ease-out motion-reduce:transition-none sm:text-[16px] ${
            captionOpaque ? "opacity-100" : "opacity-0"
          }`}
        >
          {captionText}
        </p>
      </div>
      <div
        className="mt-3 flex gap-1 sm:gap-1.5"
        role="group"
        aria-label="Caption timeline"
      >
        {segmentFills.map((fill, i) => (
          <button
            key={i}
            type="button"
            aria-label={captionSegmentLabel(captions[i], i, captions.length)}
            onClick={() => onSeekToCaption(i)}
            className="h-1 min-w-0 flex-1 cursor-pointer overflow-hidden rounded-[1px] bg-black/10 outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]"
          >
            <span
              className="block h-full bg-[rgb(15_12_19)]"
              style={{ width: `${Math.round(fill * 1000) / 10}%` }}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </>
  );
}

export function DemoShortcutHints({ showCaptions }: { showCaptions: boolean }) {
  return (
    <div
      className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-6"
      aria-hidden="true"
    >
      <span className="inline-flex items-center gap-2 font-sans text-[13px] font-normal leading-none text-black/70 sm:text-[14px]">
        <kbd className={demoShortcutKbdClass}>Space</kbd>
        Play / Pause
      </span>
      {showCaptions ? (
        <span className="inline-flex items-center gap-2 font-sans text-[13px] font-normal leading-none text-black/70 sm:text-[14px]">
          <span className="inline-flex items-center gap-1">
            <kbd className={demoShortcutKbdCompactClass}>←</kbd>
            <kbd className={demoShortcutKbdCompactClass}>→</kbd>
          </span>
          Previous / Next
        </span>
      ) : null}
    </div>
  );
}
