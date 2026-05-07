import {
  encounterEr,
  encounterPcp,
  encounterTelehealth,
  encounterUc,
} from "./vehrTimelineVizTokens";

/**
 * Column order (left → right): UC → ER → PCP → Telehealth
 * Date labels below — display order only (columns unchanged).
 */
export const STEP_VISUAL_DATES = [
  "July 21",
  "Sep 09",
  "Sep 10",
  "Sep 14",
] as const;

const shellClass =
  "rounded-2xl border border-black/10 bg-white p-4 md:p-5 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.06)]";

/** Match `Cell` height in DesignLogicFromSignal (labs / vitals) */
const encounterCellClass =
  "flex min-h-[52px] md:min-h-[60px] w-full items-center justify-center rounded-md px-1 text-center font-sans text-[11px] font-semibold leading-tight text-white md:text-[12px]";

const dateLabelClass =
  "text-center font-sans text-[11px] font-semibold leading-tight text-black/90 md:text-[12px]";

const ENCOUNTER_COLS = [
  { label: "UC", color: encounterUc },
  { label: "ER", color: encounterEr },
  { label: "PCP", color: encounterPcp },
  { label: "Tele", color: encounterTelehealth },
] as const;

function DateRow() {
  return (
    <div
      className="grid grid-cols-4 gap-1.5 pt-3 md:pt-3.5"
      role="presentation"
    >
      {STEP_VISUAL_DATES.map((d) => (
        <span key={d} className={dateLabelClass}>
          {d}
        </span>
      ))}
    </div>
  );
}

const dxDot = (
  <span
    className="h-2 w-2 rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
    aria-hidden
  />
);

function DiagnosisBar() {
  return (
    <div className="mb-1.5 grid grid-cols-4 gap-1.5" aria-hidden>
      {/* Continuous diagnoses pill across UC → ER → PCP (no internal gaps) */}
      <div className="col-span-3 min-w-0">
        <div className="flex h-[22px] w-full min-w-0 overflow-hidden rounded-md bg-[#B8BCC4] md:h-[26px]">
          {/* UC (gray) */}
          <div className="flex min-w-0 flex-1 items-center justify-center">
            {dxDot}
          </div>
          {/* ER (red) */}
          <div
            className="flex min-w-0 flex-1 items-center justify-center"
            style={{ backgroundColor: encounterEr }}
          >
            {dxDot}
          </div>
          {/* PCP (gray) */}
          <div className="flex min-w-0 flex-1 items-center justify-center">
            {dxDot}
          </div>
        </div>
      </div>

      {/* Tele (no diagnoses band) */}
      <div className="h-[22px] rounded-md bg-transparent md:h-[26px]" />
    </div>
  );
}

function EncounterCell({
  label,
  color,
  highlight,
}: {
  label: string;
  color: string;
  highlight: boolean;
}) {
  return (
    <div
      className={`${encounterCellClass} ${highlight ? "relative z-[1] ring-[3px] ring-white ring-inset shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45),0_4px_14px_-4px_rgba(0,0,0,0.35)] brightness-[1.06]" : ""}`}
      style={{ backgroundColor: color }}
      aria-hidden
    >
      {label}
    </div>
  );
}

/**
 * Mirrors VEHR lab tooltip chrome in DesignLogicFromSignal (dark panel + downward caret).
 * Anchored visually to the ER encounter column in the step visual.
 */
function VehrEncounterTooltipChrome() {
  const rows: readonly { label: string; value: string }[] = [
    { label: "Care setting", value: "Hospital ED" },
    { label: "Diagnosis addressed", value: "Type 2 diabetes" },
    { label: "Clinical status", value: "Exacerbated" },
    {
      label: "Note excerpt",
      value: "Hyperglycemia; follow-up advised",
    },
    { label: "Next step", value: "PCP follow-up" },
  ];

  return (
    <div className="relative w-full pb-1" aria-hidden>
      <div className="relative w-full rounded-xl bg-black px-[18px] pb-3 pt-[14px] shadow-[0_20px_50px_-14px_rgba(0,0,0,0.55),0_10px_22px_-10px_rgba(0,0,0,0.38)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[15px] font-semibold leading-snug tracking-tight text-white">
              Emergency
            </div>
            <div className="text-[15px] font-semibold leading-snug tracking-tight text-white">
              Department Visit
            </div>
          </div>
          <span className="shrink-0 text-right text-[11px] font-normal tabular-nums leading-snug text-white/60 md:text-[12px]">
            Sep 09, 2024
          </span>
        </div>

        <dl className="mt-3 space-y-1 border-t border-white/10 pt-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-4 text-[11px] leading-snug md:text-[12px]"
            >
              <dt className="shrink-0 text-white/65">{row.label}</dt>
              <dd className="min-w-0 text-right font-semibold text-white">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2">
          <div className="h-0 w-0 border-x-[10px] border-x-transparent border-t-[11px] border-t-black drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]" />
        </div>
      </div>
    </div>
  );
}

export type VehrTimelineStepVariant =
  | "encounters-only"
  | "diagnoses-encounters"
  | "er-encounter-tooltip";

export default function VehrTimelineStepVisual({
  variant,
}: {
  variant: VehrTimelineStepVariant;
}) {
  const showErTooltip = variant === "er-encounter-tooltip";
  const highlightCols = [
    false,
    showErTooltip,
    false,
    false,
  ] as const;

  const showDiagnosis =
    variant === "diagnoses-encounters" || variant === "er-encounter-tooltip";

  return (
    <div className={shellClass} aria-hidden>
      <div
        className={`relative overflow-visible bg-white ${showErTooltip ? "pt-1 md:pt-2" : ""}`}
      >
        {showDiagnosis ? <DiagnosisBar /> : null}

        <div className="relative isolate mb-1.5">
          {showErTooltip ? (
            <div className="pointer-events-none absolute bottom-full left-[37.5%] z-20 mb-1.5 w-[min(288px,calc(100vw-2.5rem))] max-w-[288px] -translate-x-1/2">
              <VehrEncounterTooltipChrome />
            </div>
          ) : null}

          <div className="grid grid-cols-4 gap-1.5">
            {ENCOUNTER_COLS.map((col, i) => (
              <EncounterCell
                key={col.label}
                label={col.label}
                color={col.color}
                highlight={highlightCols[i]}
              />
            ))}
          </div>
        </div>

        <DateRow />
      </div>
    </div>
  );
}
