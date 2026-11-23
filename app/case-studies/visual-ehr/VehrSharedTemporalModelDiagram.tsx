import type { ReactNode } from "react";

/** Right-column row labels — match footer date `<p>` typography. */
const DIAGRAM_ROW_LABEL_CLASS =
  "font-sans text-[14px] font-bold leading-tight text-black md:text-[15px]";

const DIAGRAM_LABEL_COL_CLASS =
  "hidden w-[75px] shrink-0 md:col-start-2 md:flex md:items-center md:justify-start md:self-stretch";

import {
  CASE_STUDY_VISIT_DATES,
  LABS_BP_VALUES,
  LABS_GLUCOSE_VALUES,
  PRO_SYMPTOM_ROWS,
  proSeverityTone,
} from "./vehrCaseStudyNarrative";
import {
  encounterEr,
  encounterPcp,
  encounterTelehealth,
  encounterUc,
} from "./vehrTimelineVizTokens";

const HIGHLIGHT_COL = 1;

const VISIT_LABELS = [
  "Urgent Care",
  "Emergency Dept",
  "PCP Follow-up",
  "Telehealth",
] as const;

const SYMPTOM_SUMMARIES = [
  "Mild fatigue, thirst, sleep disruption",
  "Severe fatigue, thirst, dizziness, blurry vision",
  "Symptoms improving, still present",
  "Energy and sleep improving",
] as const;

const ENCOUNTER_CELLS = [
  { badge: "UC", color: encounterUc, title: "Urgent Care Visit" },
  { badge: "ER", color: encounterEr, title: "Emergency Department Visit" },
  { badge: "PCP", color: encounterPcp, title: "Primary Care Follow-up" },
  { badge: "Tele", color: encounterTelehealth, title: "Telehealth Follow-up" },
] as const;

const PRO_BAR_FILL: Record<ReturnType<typeof proSeverityTone>, string> = {
  light: "#fbcfe8",
  mid: "#f9a8d4",
  high: "#ec4899",
  deep: "#be185d",
};

const METFORMIN_DOSES = ["500 mg BID", "500 mg BID", "1000 mg BID", "1000 mg BID"] as const;
const INSULIN_DOSES = [
  null,
  "10 units nightly",
  "12 units nightly",
  "12 units nightly",
] as const;
const INSULIN_NOTES = [null, "Initiated in ED", "Dose increased", "Continued"] as const;

const DATA_GRID_CLASS = "grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3";

const DIAGRAM_GRID_CLASS =
  "grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_75px] md:gap-x-[18px]";

const ROW_DIVIDER_CLASS = "border-t border-black/[0.08]";

const DIAGNOSIS_CELLS = [
  {
    status: "Stable",
    shell: "border-[#bfdbfe] bg-[#eff6ff]",
    titleClass: "text-[#2563eb]",
  },
  {
    status: "Exacerbated (acute hyperglycemia)",
    shell: "border-[#fbcfe8] bg-[#fdf2f8] ring-1 ring-[#f9a8d4]/70",
    titleClass: "text-[#be185d]",
  },
  {
    status: "Managed",
    shell: "border-[#fed7aa] bg-[#fff7ed]",
    titleClass: "text-[#c2410c]",
  },
  {
    status: "Improving",
    shell: "border-[#bbf7d0] bg-[#f0fdf4]",
    titleClass: "text-[#15803d]",
  },
] as const;

function HighlightColumn({
  col,
  children,
  className = "",
}: {
  col: number;
  children: ReactNode;
  className?: string;
}) {
  const highlighted = col === HIGHLIGHT_COL;
  return (
    <div
      className={`min-w-0 rounded-lg px-2 py-2.5 md:px-2.5 md:py-3 ${
        highlighted ? "bg-[#fdf2f8]/80 ring-1 ring-[#f9a8d4]/80" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SymptomMiniChart({ col }: { col: number }) {
  const barHeights = PRO_SYMPTOM_ROWS.map((row) => {
    const v = row.values[col];
    return Math.max(18, Math.round((v / 10) * 44));
  });

  return (
    <HighlightColumn col={col}>
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex h-12 items-end justify-center gap-[3px] md:h-[52px] md:gap-1"
          aria-hidden
        >
          {barHeights.map((h, i) => {
            const tone = proSeverityTone(PRO_SYMPTOM_ROWS[i].values[col]);
            return (
              <span
                key={i}
                className="w-[7px] rounded-sm md:w-2"
                style={{
                  height: h,
                  backgroundColor: PRO_BAR_FILL[tone],
                }}
              />
            );
          })}
        </div>
        <p
          className={`text-center font-sans text-[11px] leading-snug md:text-[12px] ${
            col === HIGHLIGHT_COL ? "font-medium text-[#be185d]" : "text-black/70"
          }`}
        >
          {SYMPTOM_SUMMARIES[col]}
        </p>
      </div>
    </HighlightColumn>
  );
}

function DiagnosisCell({ col }: { col: number }) {
  const { status, shell, titleClass } = DIAGNOSIS_CELLS[col];
  return (
    <div className={`min-w-0 rounded-lg border px-3 py-3 md:px-3.5 md:py-3.5 ${shell}`}>
      <p
        className={`font-sans text-[12px] font-semibold leading-tight md:text-[13px] ${titleClass}`}
      >
        T2 Diabetes
      </p>
      <p className="mt-1.5 font-sans text-[11px] leading-snug text-black/80 md:text-[12px]">
        {status}
      </p>
    </div>
  );
}

function EncounterCell({ col }: { col: number }) {
  const { badge, color, title } = ENCOUNTER_CELLS[col];
  return (
    <HighlightColumn col={col} className="flex flex-col items-center gap-2">
      <span
        className="inline-flex min-w-[40px] items-center justify-center rounded-md px-2 py-1 font-sans text-[11px] font-bold text-white md:text-[12px]"
        style={{ backgroundColor: color }}
      >
        {badge}
      </span>
      <p className="text-center font-sans text-[11px] leading-snug text-black/75 md:text-[12px]">
        {title}
      </p>
    </HighlightColumn>
  );
}

function LabValue({
  label,
  value,
  unit,
  tone,
}: {
  label: string;
  value: string;
  unit: string;
  tone: "neutral" | "critical" | "improving";
}) {
  const valueClass =
    tone === "critical"
      ? "font-bold text-[#dc2626]"
      : tone === "improving"
        ? "font-bold text-[#0d9488]"
        : "font-semibold text-black";

  return (
    <p className="font-sans text-[11px] leading-snug text-black/80 md:text-[12px]">
      <span className="text-black/55">{label} </span>
      <span className={valueClass}>{value}</span>
      <span className="text-black/45"> {unit}</span>
    </p>
  );
}

function LabsCell({ col }: { col: number }) {
  const glucose = LABS_GLUCOSE_VALUES[col];
  const bp = LABS_BP_VALUES[col];
  const tone =
    col === HIGHLIGHT_COL ? "critical" : col > HIGHLIGHT_COL ? "improving" : "neutral";

  return (
    <HighlightColumn col={col} className="space-y-1">
      <LabValue label="Glucose" value={glucose} unit="mg/dL" tone={tone} />
      <LabValue label="BP" value={bp} unit="mmHg" tone={tone} />
    </HighlightColumn>
  );
}

function DosePill({
  label,
  variant,
}: {
  label: string;
  variant: "metformin" | "insulin";
}) {
  const className =
    variant === "metformin"
      ? "bg-[#ede9fe] text-[#5b21b6] ring-1 ring-[#ddd6fe]"
      : "bg-[#fce7f3] text-[#9d174d] ring-1 ring-[#fbcfe8]";

  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 font-sans text-[10px] font-semibold leading-tight md:text-[11px] ${className}`}
    >
      {label}
    </span>
  );
}

function MedsCell({ col }: { col: number }) {
  const insulin = INSULIN_DOSES[col];
  const note = INSULIN_NOTES[col];

  return (
    <HighlightColumn col={col} className="space-y-2">
      <div>
        <p className="font-sans text-[11px] font-semibold text-black md:text-[12px]">
          Metformin
        </p>
        <div className="mt-1">
          <DosePill label={METFORMIN_DOSES[col]} variant="metformin" />
        </div>
      </div>
      <div>
        <p className="font-sans text-[11px] font-semibold text-black md:text-[12px]">
          Insulin glargine
        </p>
        {insulin ? (
          <>
            <div className="mt-1">
              <DosePill label={insulin} variant="insulin" />
            </div>
            {note ? (
              <p className="mt-1 font-sans text-[10px] leading-snug text-black/50 md:text-[11px]">
                {note}
              </p>
            ) : null}
          </>
        ) : (
          <p className="mt-1 font-sans text-[11px] text-black/45 md:text-[12px]">
            Not prescribed
          </p>
        )}
      </div>
    </HighlightColumn>
  );
}

function RowLabel({ children }: { children: string }) {
  return <span className={DIAGRAM_ROW_LABEL_CLASS}>{children}</span>;
}

function DiagramRow({
  label,
  isFirst,
  children,
}: {
  label: string;
  isFirst?: boolean;
  children: ReactNode;
}) {
  const divider = isFirst ? "" : ROW_DIVIDER_CLASS;

  return (
    <>
      <div
        className={`md:col-start-1 py-6 md:py-7 ${divider} ${isFirst ? "pt-0" : ""}`}
      >
        <div className={DATA_GRID_CLASS}>{children}</div>
      </div>
      <div
        className={`py-6 md:py-7 ${divider} ${DIAGRAM_LABEL_COL_CLASS}`}
      >
        <RowLabel>{label}</RowLabel>
      </div>
    </>
  );
}

const FOOTER_ROW_CLASS = `${ROW_DIVIDER_CLASS} flex min-h-[72px] items-center bg-black/[0.04] py-4 md:min-h-[80px] md:py-5`;

function TimelineFooter() {
  return (
    <>
      <div className={`md:col-start-1 ${FOOTER_ROW_CLASS}`}>
        <div className={`${DATA_GRID_CLASS} w-full`}>
          {CASE_STUDY_VISIT_DATES.map((date, i) => (
            <div key={date} className="flex flex-col items-center justify-center text-center">
              <p className="font-sans text-[14px] font-bold leading-tight text-black md:text-[15px]">
                {date}
              </p>
              <p className="mt-0.5 font-sans text-[11px] leading-snug text-black/55 md:text-[12px]">
                {VISIT_LABELS[i]}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={`${ROW_DIVIDER_CLASS} ${DIAGRAM_LABEL_COL_CLASS}`} aria-hidden />
    </>
  );
}

export default function VehrSharedTemporalModelDiagram() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-black/10 bg-white px-5 py-6 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.06)] md:px-8 md:py-8 lg:px-10 lg:py-10">
      <div className={DIAGRAM_GRID_CLASS}>
        <DiagramRow label="Symptoms" isFirst>
          {CASE_STUDY_VISIT_DATES.map((_, i) => (
            <SymptomMiniChart key={i} col={i} />
          ))}
        </DiagramRow>

        <DiagramRow label="Diagnosis">
          {CASE_STUDY_VISIT_DATES.map((_, i) => (
            <DiagnosisCell key={i} col={i} />
          ))}
        </DiagramRow>

        <DiagramRow label="Encounters">
          {CASE_STUDY_VISIT_DATES.map((_, i) => (
            <EncounterCell key={i} col={i} />
          ))}
        </DiagramRow>

        <DiagramRow label="Vitals & Labs">
          {CASE_STUDY_VISIT_DATES.map((_, i) => (
            <LabsCell key={i} col={i} />
          ))}
        </DiagramRow>

        <DiagramRow label="Medications">
          {CASE_STUDY_VISIT_DATES.map((_, i) => (
            <MedsCell key={i} col={i} />
          ))}
        </DiagramRow>

        <TimelineFooter />
      </div>
    </div>
  );
}
