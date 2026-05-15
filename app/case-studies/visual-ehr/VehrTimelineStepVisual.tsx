import {
  CASE_STUDY_MATRIX_INNER_GRID_CLASS,
  CASE_STUDY_MATRIX_LABEL_COL_CLASS,
  CASE_STUDY_MATRIX_ROW_LABEL_CLASS,
  CASE_STUDY_MATRIX_SHELL_CLASS,
} from "./caseStudyVisualTokens";
import { CASE_STUDY_VISIT_DATES } from "./vehrCaseStudyNarrative";
import {
  encounterEr,
  encounterPcp,
  encounterTelehealth,
  encounterUc,
} from "./vehrTimelineVizTokens";

export const STEP_VISUAL_DATES = CASE_STUDY_VISIT_DATES;

const diagnosisRowLabelClass =
  "flex h-[22px] w-max max-w-full min-w-0 items-center justify-start pl-0 pr-0 font-sans text-[11px] font-semibold leading-tight text-black/65 md:h-[26px] md:text-[12px]";

const mobileLegendTextClass =
  "font-sans text-[11px] font-semibold leading-tight text-black/60";

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

const dxDot = (
  <span
    className="h-2 w-2 rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
    aria-hidden
  />
);

const DX_SEGMENTS: readonly {
  className: string;
  style?: { backgroundColor: string };
  dot: boolean;
}[] = [
  { className: "bg-[#B8BCC4]", dot: true },
  { className: "", style: { backgroundColor: encounterEr }, dot: true },
  { className: "bg-[#B8BCC4]", dot: true },
  { className: "bg-[#D1D5DB]", dot: false },
];

function DateRow() {
  return (
    <div className="pt-3 md:pt-3.5" role="presentation">
      <div className="grid grid-cols-4 gap-1.5">
        {STEP_VISUAL_DATES.map((d) => (
          <span key={d} className={dateLabelClass}>
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function DiagnosisBar() {
  return (
    <div className="mb-1.5 grid grid-cols-4 gap-1.5" aria-hidden>
      {DX_SEGMENTS.map((seg, i) => (
        <div
          key={i}
          className={`flex h-[22px] items-center justify-center rounded-md md:h-[26px] ${seg.className}`}
          style={seg.style}
        >
          {seg.dot ? dxDot : null}
        </div>
      ))}
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

function VehrEncounterTooltipChrome() {
  const rows: readonly { label: string; value: string }[] = [
    { label: "Glucose", value: "342 mg/dL" },
    { label: "Presentation", value: "Fatigue, blurred vision, dizziness" },
    { label: "Assessment", value: "Acute hyperglycemia" },
    { label: "Treatment", value: "IV fluids + insulin initiation" },
    { label: "Follow-up", value: "PCP within 48 hours" },
  ];

  return (
    <div className="relative w-full pb-1" aria-hidden>
      <div className="relative w-full rounded-xl bg-black px-[18px] pb-3 pt-[14px] shadow-[0_20px_50px_-14px_rgba(0,0,0,0.55),0_10px_22px_-10px_rgba(0,0,0,0.38)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 text-[15px] font-semibold leading-snug tracking-tight text-white">
            Emergency Department Visit
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
  const highlightCols = [false, showErTooltip, false, false] as const;
  const showDiagnosis =
    variant === "diagnoses-encounters" || variant === "er-encounter-tooltip";

  return (
    <div className={CASE_STUDY_MATRIX_SHELL_CLASS} aria-hidden>
      <div
        className={`${CASE_STUDY_MATRIX_INNER_GRID_CLASS} ${showErTooltip ? "pt-1 md:pt-2" : ""}`}
      >
        <div className="relative min-w-0 overflow-visible bg-white">
          {showDiagnosis ? <DiagnosisBar /> : null}

          <div className="relative isolate">
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

          <div className="mt-4 border-t border-black/10">
            <DateRow />
          </div>
        </div>

        <div className={CASE_STUDY_MATRIX_LABEL_COL_CLASS}>
          {showDiagnosis ? (
            <>
              <div className="mb-1.5 flex h-[22px] items-center md:h-[26px]">
                <div className={diagnosisRowLabelClass}>T2 Diabetes</div>
              </div>
              <div className="flex min-h-[52px] items-center md:min-h-[60px]">
                <div className={CASE_STUDY_MATRIX_ROW_LABEL_CLASS}>Encounters</div>
              </div>
            </>
          ) : (
            <div className="flex min-h-[52px] items-center md:min-h-[60px]">
              <div className={CASE_STUDY_MATRIX_ROW_LABEL_CLASS}>Encounters</div>
            </div>
          )}
          <div className="invisible mt-4 border-t border-black/10">
            <DateRow />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 border-t border-black/10 pt-4 md:hidden">
        {showDiagnosis ? (
          <>
            <span className={mobileLegendTextClass}>T2 Diabetes</span>
            <span className={mobileLegendTextClass}>Encounters</span>
          </>
        ) : (
          <span className={mobileLegendTextClass}>Encounters</span>
        )}
      </div>
    </div>
  );
}
