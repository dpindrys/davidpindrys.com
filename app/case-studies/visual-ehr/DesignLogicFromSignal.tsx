import type { ReactNode } from "react";

/** Editorial “from signal to detail” steps — abstract 2×4 grids, portfolio tone */

const eyebrowClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";
const sectionTitleClass =
  "w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black";
const introClass =
  "w-full font-sans text-[22px] md:text-[24px] font-normal leading-[1.45] text-black/80";
const stepHeadingClass =
  "font-sans text-[22px] md:text-[24px] font-semibold leading-[1.25] tracking-tight text-black";
const stepBodyClass =
  "font-sans text-[22px] md:text-[24px] font-normal leading-[1.45] text-black/80";

const matrixShellClass =
  "rounded-2xl border border-black/10 bg-white p-4 md:p-5 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.06)]";

const gridClass = "grid grid-cols-4 grid-rows-2 gap-1.5 min-h-[132px] md:min-h-[156px]";

/** Timeline labels aligned under each 2×1 column stack — matches portfolio mock. */
const VISIT_DATES = ["July 21", "Sep 09", "Sep 10", "Sep 14"] as const;

function MatrixDateRow() {
  return (
    <div
      className="grid grid-cols-4 gap-1.5 pt-3 md:pt-3.5"
      role="group"
      aria-label="Encounter dates"
    >
      {VISIT_DATES.map((label) => (
        <span
          key={label}
          className="text-center font-sans text-[11px] font-semibold leading-tight text-black/90 md:text-[12px]"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function Cell({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`flex min-h-[52px] md:min-h-[60px] items-center justify-center rounded-md border border-black/[0.07] text-center font-sans text-[11px] font-semibold leading-tight text-black/90 md:text-[12px] ${className}`}
    >
      {children}
    </div>
  );
}

function StepRow({
  children,
  isFirst,
}: {
  children: ReactNode;
  isFirst?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-12 lg:gap-14 ${isFirst ? "pt-0" : "border-t border-black/10 pt-12 md:pt-16 lg:pt-20"} pb-12 md:pb-16 lg:pb-20`}
    >
      {children}
    </div>
  );
}

/** Same 2×4 matrix as step 4 (“Exact value?”). Optional tooltip anchored above the 82% cell (step 5). */
function ExactValueMatrix({ tooltipAbove82 = false }: { tooltipAbove82?: boolean }) {
  const spo2Segments = [
    "bg-[#115e59]",
    "bg-[#0f766e]",
    "bg-[#14b8a6]",
    "bg-[#99f6e4]",
    "bg-[#ccfbf1]",
  ];

  /** Left = worse; ~one segment left of prior placement so 82% reads more severe. */
  const spo2MarkerPercent = 18;

  const cell82 = (
    <Cell className="border-[#115e59]/40 bg-[#115e59] text-white shadow-md">
      82%
    </Cell>
  );

  return (
    <div className={matrixShellClass}>
      <div className={gridClass} aria-hidden>
        <Cell className="border-[#9d174d]/30 bg-[#9d174d] text-white">
          340 mg/dL
        </Cell>
        <Cell className="border-[#be185d]/30 bg-[#be185d] text-white">
          240 mg/dL
        </Cell>
        <Cell className="border-[#f472b6]/40 bg-[#f472b6] text-white">
          186 mg/dL
        </Cell>
        <Cell className="border-[#fce7f3] bg-[#fce7f3] text-black/65">
          112 mg/dL
        </Cell>
        <Cell className="border-cyan-100/80 bg-[#ecfeff] text-black/70">
          96%
        </Cell>
        <Cell className="border-black/[0.06] bg-[#fafaf9] text-black/75">
          74 bpm
        </Cell>
        <Cell className="border-teal-400/40 bg-[#2dd4bf] text-white">
          91%
        </Cell>
        {tooltipAbove82 ? (
          <div className="relative isolate z-10 h-full min-h-[52px] md:min-h-[60px]">
            <div className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-10 w-[min(300px,calc(100vw-4rem))] max-w-[300px] -translate-x-1/2">
              <VehrLabTooltipChrome
                label="SpO₂"
                date="14 Sep 2024"
                valuePrimary="82"
                segments={spo2Segments}
                markerPercent={spo2MarkerPercent}
                markerRingClass="ring-[#115e59]"
                caption="SpO₂ is significantly reduced compared with typical resting saturation."
              />
            </div>
            <div className="relative h-full min-h-[52px] md:min-h-[60px]">
              <Cell className="h-full min-h-[52px] md:min-h-[60px] border-[#115e59]/40 bg-[#115e59] text-white shadow-md">
                82%
              </Cell>
            </div>
          </div>
        ) : (
          cell82
        )}
      </div>
      <MatrixDateRow />
    </div>
  );
}

type VehrLabTooltipChromeProps = {
  label: string;
  date: string;
  valuePrimary: string;
  segments: string[];
  /** 0–100 position of the dot on the range bar. */
  markerPercent: number;
  /** 0–100 horizontal position of the downward caret (defaults to centered). */
  caretPercent?: number;
  markerRingClass: string;
  caption: string;
};

/**
 * VEHR lab tooltip chrome: dark panel, range strip, marker, caret.
 */
function VehrLabTooltipChrome({
  label,
  date,
  valuePrimary,
  segments,
  markerPercent,
  caretPercent = 50,
  markerRingClass,
  caption,
}: VehrLabTooltipChromeProps) {
  return (
    <div className="relative w-full pb-1" aria-hidden>
      <div className="relative w-full rounded-xl bg-black px-[18px] pb-3 pt-[14px] shadow-[0_20px_50px_-14px_rgba(0,0,0,0.55),0_10px_22px_-10px_rgba(0,0,0,0.38)]">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[15px] font-semibold tracking-tight text-white">
            {label}
          </span>
          <span className="text-[12px] font-normal tabular-nums text-white/55">
            {date}
          </span>
        </div>
        <p className="mt-2.5 text-[30px] font-bold tabular-nums leading-none tracking-tight text-white">
          {valuePrimary}{" "}
          <span className="text-[22px] font-bold text-white/90">%</span>
        </p>

        <div className="relative mt-3.5">
          <div className="flex h-[9px] w-full overflow-hidden rounded-sm shadow-inner shadow-black/40">
            {segments.map((bg, i) => (
              <div
                key={i}
                className={`h-full min-w-0 flex-1 ${bg} ${i > 0 ? "border-l border-black/30" : ""}`}
              />
            ))}
          </div>
          <div
            className={`pointer-events-none absolute top-1/2 h-[13px] w-[13px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow-sm ring-[3px] ${markerRingClass}`}
            style={{ left: `${markerPercent}%` }}
          />
        </div>

        <p className="mt-3 text-[12px] leading-snug text-white/55">{caption}</p>

        <div
          className="pointer-events-none absolute top-full -translate-x-1/2"
          style={{ left: `${caretPercent}%` }}
        >
          <div className="h-0 w-0 border-x-[10px] border-x-transparent border-t-[11px] border-t-black drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]" />
        </div>
      </div>
    </div>
  );
}

export default function DesignLogicFromSignal() {
  return (
    <div>
      <p className={eyebrowClass}>The Solution</p>
      <h3 className={`${sectionTitleClass} mt-4`}>From signal to detail</h3>
      <p className={`${introClass} mt-6`}>
        VEHR supports progressive clinical attention: scan for abnormal values,
        judge severity, detect patterns, then read details when needed.
      </p>

      <div className="mt-14 md:mt-16 lg:mt-20">
        {/* Step 1 */}
        <StepRow isFirst>
          <div className="flex flex-col gap-4 md:max-w-md">
            <h4 className={stepHeadingClass}>1. What&apos;s abnormal?</h4>
            <p className={stepBodyClass}>
              Normal values recede. Abnormal values become visible.
            </p>
          </div>
          <div className={matrixShellClass}>
            <div className={gridClass} aria-hidden>
              {/* Row 1 — July 21 | Sep 09 | medium | very light */}
              <Cell className="border-transparent bg-[#525252]" />
              <Cell className="border-transparent bg-[#626262]" />
              <Cell className="border-transparent bg-[#999999]" />
              <Cell className="border-black/[0.06] bg-[#EEEEEE]" />
              {/* Row 2 — empty white | empty white | light-medium | charcoal */}
              <Cell className="border-black/[0.08] bg-white" />
              <Cell className="border-black/[0.08] bg-white" />
              <Cell className="border-black/[0.06] bg-[#BBBBBB]" />
              <Cell className="border-transparent bg-[#555555]" />
            </div>
            <MatrixDateRow />
          </div>
        </StepRow>

        {/* Step 2 */}
        <StepRow>
          <div className="flex flex-col gap-4 md:max-w-md">
            <h4 className={stepHeadingClass}>2. What&apos;s severe?</h4>
            <p className={stepBodyClass}>
              The most concerning values get the strongest visual emphasis.
            </p>
          </div>
          <div className={matrixShellClass}>
            <div className={gridClass} aria-hidden>
              {/* Row 1 — July 21 | Sep 09 | Sep 10 | Sep 14 */}
              <Cell className="border-[#9D174D]/35 bg-[#9D174D] text-white shadow-sm" />
              <Cell className="border-transparent bg-[#626262] text-white" />
              <Cell className="border-transparent bg-[#9E9E9E] text-black/85" />
              <Cell className="border-black/[0.06] bg-[#EDEDED] text-black/80" />
              {/* Row 2 — FAFAFA | FAFAFA | BDBDBD | 115E59 */}
              <Cell className="border-black/[0.08] bg-[#fafafa] text-black/80" />
              <Cell className="border-black/[0.08] bg-[#fafafa] text-black/80" />
              <Cell className="border-black/[0.06] bg-[#bdbdbd] text-black/85" />
              <Cell className="border-[#115e59]/50 bg-[#115e59] text-white shadow-sm" />
            </div>
            <MatrixDateRow />
          </div>
        </StepRow>

        {/* Step 3 */}
        <StepRow>
          <div className="flex flex-col gap-4 md:max-w-md">
            <h4 className={stepHeadingClass}>3. Pattern over time?</h4>
            <p className={stepBodyClass}>
              Rows reveal stability, worsening, improvement, recurrence, or
              clustering.
            </p>
          </div>
          <div className={matrixShellClass}>
            <div className={gridClass} aria-hidden>
              {/* Improvement row — magenta fades lighter */}
              <Cell className="border-[#9d174d]/30 bg-[#9d174d] text-white" />
              <Cell className="border-[#be185d]/30 bg-[#be185d] text-white" />
              <Cell className="border-[#f472b6]/40 bg-[#f472b6] text-white" />
              <Cell className="border-[#fce7f3] bg-[#fce7f3] text-black/70" />
              {/* Worsening row — teal strengthens */}
              <Cell className="border-cyan-100/80 bg-[#ecfeff] text-black/60" />
              <Cell className="border-black/[0.06] bg-[#fafaf9]" />
              <Cell className="border-teal-400/40 bg-[#2dd4bf] text-white" />
              <Cell className="border-[#115e59]/40 bg-[#115e59] text-white shadow-md" />
            </div>
            <MatrixDateRow />
          </div>
        </StepRow>

        {/* Step 4 */}
        <StepRow>
          <div className="flex flex-col gap-4 md:max-w-md">
            <h4 className={stepHeadingClass}>4. Exact value?</h4>
            <p className={stepBodyClass}>
              Numbers stay available once the signal is worth reading.
            </p>
          </div>
          <ExactValueMatrix />
        </StepRow>

        {/* Step 5 */}
        <StepRow>
          <div className="flex flex-col gap-4 md:max-w-md">
            <h4 className={stepHeadingClass}>5. What&apos;s the context?</h4>
            <p className={stepBodyClass}>
              Related encounters, medications, diagnoses, notes, and
              patient-reported data explain the signal.
            </p>
          </div>
          <ExactValueMatrix tooltipAbove82 />
        </StepRow>
      </div>
    </div>
  );
}
