"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";

import {
  CASE_STUDY_MATRIX_INNER_GRID_COMPACT_CLASS,
  CASE_STUDY_MATRIX_LABEL_COL_COMPACT_CLASS,
  CASE_STUDY_MATRIX_ROW_LABEL_CLASS,
  CASE_STUDY_MATRIX_SHELL_CLASS,
  CASE_STUDY_MATRIX_SHELL_STICKY_BLEED_CLASS,
} from "./caseStudyVisualTokens";
import {
  encounterEr,
  encounterPcp,
  encounterTelehealth,
  encounterUc,
} from "./vehrTimelineVizTokens";
import {
  CASE_STUDY_VISIT_DATES,
  LABS_BP_VALUES,
  LABS_GLUCOSE_TOOLTIP_ACUTE,
  LABS_GLUCOSE_VALUES,
} from "./vehrCaseStudyNarrative";

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

const matrixShellClass = CASE_STUDY_MATRIX_SHELL_CLASS;

const gridClass = "grid grid-cols-4 grid-rows-2 gap-1.5 min-h-[132px] md:min-h-[156px]";

/** Timeline labels aligned under each 2×1 column stack — shared narrative dates. */
const VISIT_DATES = CASE_STUDY_VISIT_DATES;
export { CASE_STUDY_VISIT_DATES };
export const SHARED_AXIS_DATES = [
  "Jun 26",
  "Jul 14",
  "Jul 21",
  "Jul 28",
  "Aug 04",
  "Aug 18",
  "Sep 09",
  "Sep 10",
  "Sep 14",
] as const;

/** Medication solution figures — same four dates as `VISIT_DATES` / matrix sections above. */
export const MEDICATION_FIGURE_AXIS_DATES = VISIT_DATES;

export const MEDICATION_FIGURE_COLUMN_COUNT = MEDICATION_FIGURE_AXIS_DATES.length;

export const SHARED_AXIS_COLUMN_COUNT = SHARED_AXIS_DATES.length;

/** Vertical column rhythm — matches section rules (`border-black/10` above labs/meds). */
const timelineColDividerClass = "border-r border-black/10";

type SharedMedSegmentKind = "active" | "dose" | "inactive" | "none";

export type SharedMedicationCell = {
  kind: SharedMedSegmentKind;
  /** Shown inside bar when `kind === "dose"` */
  label?: string;
  /**
   * Dose label contrast: on active (dark navy) bar vs on lighter segment.
   * Metformin-style titration uses `light`; Lisinopril-style uses `dark`.
   */
  doseOn?: "dark" | "light";
};

export type SharedMedicationRow = {
  id: string;
  name: string;
  cells: readonly SharedMedicationCell[];
};

/**
 * Medication timeline rows — same column count as `SHARED_AXIS_DATES` (matches VEHR prototype).
 */
export const sharedMedicationRows: readonly SharedMedicationRow[] = [
  {
    id: "metformin",
    name: "Metformin",
    cells: [
      { kind: "none" },
      { kind: "none" },
      { kind: "dose", label: "500 BID", doseOn: "dark" },
      { kind: "none" },
      { kind: "none" },
      { kind: "none" },
      { kind: "dose", label: "500 BID", doseOn: "dark" },
      { kind: "dose", label: "1000 BID", doseOn: "dark" },
      { kind: "dose", label: "1000 BID", doseOn: "dark" },
    ],
  },
  {
    id: "insulin-glargine",
    name: "Insulin glargine",
    cells: [
      { kind: "none" },
      { kind: "none" },
      { kind: "none" },
      { kind: "none" },
      { kind: "none" },
      { kind: "none" },
      { kind: "dose", label: "10 u", doseOn: "light" },
      { kind: "dose", label: "12 u", doseOn: "light" },
      { kind: "dose", label: "12 u", doseOn: "dark" },
    ],
  },
] as const;

/**
 * Medication rows for portfolio solution figures — four columns on
 * `MEDICATION_FIGURE_AXIS_DATES` (matches matrix / visit date styling above).
 */
export const medicationFigureRows: readonly SharedMedicationRow[] = [
  {
    id: "metformin",
    name: "Metformin",
    cells: [
      { kind: "dose", label: "500 BID", doseOn: "dark" },
      { kind: "dose", label: "500 BID", doseOn: "dark" },
      { kind: "dose", label: "1000 BID", doseOn: "dark" },
      { kind: "dose", label: "1000 BID", doseOn: "dark" },
    ],
  },
  {
    id: "insulin-glargine",
    name: "Insulin",
    cells: [
      { kind: "none" },
      { kind: "dose", label: "10 u", doseOn: "light" },
      { kind: "dose", label: "12 u", doseOn: "light" },
      { kind: "dose", label: "12 u", doseOn: "dark" },
    ],
  },
] as const;

/** Diagnosis strip segment fills (`exacerbation` = acute flare, aligned to UC in timeline). */
type DxStripTone = "empty" | "shell" | "light" | "exacerbation";

const dxToneClass: Record<DxStripTone, string> = {
  empty: "bg-white",
  shell: "bg-[#B8BCC4]",
  light: "bg-[#D1D5DB]",
  exacerbation: "bg-[#E32424]",
};

/** Centered “addressed at this visit” marker — 6–8px white dot. */
const dxAddressedDot = (
  <span
    className="h-[6px] w-[6px] shrink-0 rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)] md:h-2 md:w-2"
    aria-hidden
  />
);

const dxTimelineStripHeightClass = "h-[22px] md:h-[26px]";
const medTimelineStripHeightClass = "h-[28px] md:h-[32px]";

type SharedDiagnosisTimelineRow = {
  id: string;
  name: string;
  /** One segment per `SHARED_AXIS_DATES` column. */
  tones: readonly DxStripTone[];
  /** Centered dot when diagnosis was addressed at that visit (aligns with encounter column). */
  addressedAtVisit: readonly boolean[];
};

const sharedDiagnosisTimelineRows: readonly SharedDiagnosisTimelineRow[] = [
  {
    id: "t2dm",
    name: "T2 Diabetes",
    tones: [
      "empty",
      "empty",
      "shell",
      "empty",
      "empty",
      "empty",
      "exacerbation",
      "shell",
      "light",
    ],
    addressedAtVisit: [
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
    ],
  },
] as const;

type EncounterAxisKind = "none" | "uc" | "er" | "pcp" | "tel";

type EncounterAxisCell = {
  label: string | null;
  kind: EncounterAxisKind;
};

const ENCOUNTER_FILL: Record<Exclude<EncounterAxisKind, "none">, string> = {
  uc: encounterUc,
  er: encounterEr,
  pcp: encounterPcp,
  tel: encounterTelehealth,
};

/**
 * Encounters aligned to `SHARED_AXIS_DATES` — one visit type per column; fills from tokens.
 */
const sharedEncounterAxisRow: readonly EncounterAxisCell[] = [
  { label: null, kind: "none" },
  { label: null, kind: "none" },
  { label: "UC", kind: "uc" },
  { label: null, kind: "none" },
  { label: null, kind: "none" },
  { label: null, kind: "none" },
  { label: "ER", kind: "er" },
  { label: "PCP", kind: "pcp" },
  { label: "Tel", kind: "tel" },
] as const;

function DiagnosisTimelineStrip({
  tones,
  addressedAtVisit,
}: {
  tones: readonly DxStripTone[];
  addressedAtVisit: readonly boolean[];
}) {
  return (
    <div
      className={`flex w-full min-w-0 overflow-hidden rounded-md ${dxTimelineStripHeightClass}`}
      aria-hidden
    >
      {tones.map((tone, i) => {
        const isEmpty = tone === "empty";
        const showAddressedDot = addressedAtVisit[i] === true && !isEmpty;
        return (
          <div
            key={i}
            className={`relative flex min-w-0 flex-1 items-center justify-center ${dxToneClass[tone]} ${isEmpty ? "border border-dashed border-black/[0.07]" : ""} ${i < tones.length - 1 ? timelineColDividerClass : ""}`}
          >
            {showAddressedDot ? (
              <span className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2">
                {dxAddressedDot}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

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
  title: titleAttr,
}: {
  className?: string;
  children?: ReactNode;
  /** Native tooltip for vitals/lab cells (full-width grid). */
  title?: string;
}) {
  return (
    <div
      title={titleAttr}
      className={`flex min-h-[52px] md:min-h-[60px] items-center justify-center rounded-md border border-black/[0.07] text-center font-sans text-[11px] font-semibold leading-tight md:text-[12px] ${className}`}
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

/** 2×4 pattern grid + dates + Glucose / BP labels — same shell and column layout as `ExactValueMatrix`. */
function PatternOverTimeMatrix() {
  return (
    <div className={matrixShellClass}>
      <div className={CASE_STUDY_MATRIX_INNER_GRID_COMPACT_CLASS}>
        <div className="min-w-0">
          <div className={gridClass} aria-hidden>
            <Cell className="border-[#f472b6]/40 bg-[#f472b6] text-[#111111]" />
            <Cell className="border-[#9d174d]/30 bg-[#9d174d] text-white shadow-md" />
            <Cell className="border-[#be185d]/30 bg-[#be185d] text-white" />
            <Cell className="border-[#fce7f3] bg-[#fce7f3] text-[#111111]" />
            <Cell className="border-cyan-100/80 bg-[#ecfeff] text-[#111111]" />
            <Cell className="border-[#115e59]/40 bg-[#115e59] text-white shadow-md" />
            <Cell className="border-teal-400/40 bg-[#2dd4bf] text-white" />
            <Cell className="border-black/[0.06] bg-[#fafaf9] text-[#111111]" />
          </div>
          <div className="mt-4 border-t border-black/10">
            <MatrixDateRow />
          </div>
        </div>

        <div className={CASE_STUDY_MATRIX_LABEL_COL_COMPACT_CLASS}>
          <div className="flex min-h-[132px] flex-col gap-1.5 md:min-h-[156px]">
            <div className="flex min-h-0 flex-1 items-center">
              <div className={CASE_STUDY_MATRIX_ROW_LABEL_CLASS}>Glucose</div>
            </div>
            <div className="flex min-h-0 flex-1 items-center">
              <div className={CASE_STUDY_MATRIX_ROW_LABEL_CLASS}>BP</div>
            </div>
          </div>
          <div className="invisible mt-4 border-t border-black/10">
            <MatrixDateRow />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 border-t border-black/10 pt-4 md:hidden">
        <span className="font-sans text-[11px] font-semibold leading-tight text-black/60">
          Glucose
        </span>
        <span className="font-sans text-[11px] font-semibold leading-tight text-black/60">
          BP
        </span>
      </div>
    </div>
  );
}

/** Same 2×4 matrix as step 2 (“What’s the value?”). Optional tooltip on Sep 09 glucose (step 3). */
function ExactValueMatrix({ tooltipOnAcuteGlucose = false }: { tooltipOnAcuteGlucose?: boolean }) {
  const glucoseSegments = [
    "bg-[#115e59]",
    "bg-[#2dd4bf]",
    "bg-[#fafaf9]",
    "bg-[#f472b6]",
    "bg-[#be185d]",
  ];
  const glucoseClass = [
    "border-[#F472B6]/40 bg-[#F472B6] text-[#111111]",
    "border-[#9D174D]/30 bg-[#9D174D] text-[#FFFFFF] shadow-md",
    "border-[#BE185D]/30 bg-[#BE185D] text-[#FFFFFF]",
    "border-[#FCE7F3] bg-[#FCE7F3] text-[#111111]",
  ] as const;
  const bpClass = [
    "border-cyan-100/80 bg-[#ECFEFF] text-[#111111]",
    "border-[#115E59]/40 bg-[#115E59] text-[#FFFFFF] shadow-md",
    "border-teal-400/40 bg-[#2DD4BF] text-[#FFFFFF]",
    "border-black/[0.06] bg-[#FAFAF9] text-[#111111]",
  ] as const;

  return (
    <div className={matrixShellClass}>
      <div className={CASE_STUDY_MATRIX_INNER_GRID_COMPACT_CLASS}>
        <div className="min-w-0">
          <div className={gridClass} aria-hidden>
            {LABS_GLUCOSE_VALUES.map((v, i) => {
              const content = `${v} mg/dL`;
              const cls = glucoseClass[i];
              if (tooltipOnAcuteGlucose && i === 1) {
                return (
                  <div key={i} className="relative isolate z-10 h-full min-h-[52px] md:min-h-[60px]">
                    <div className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-10 w-[min(300px,calc(100vw-4rem))] max-w-[300px] -translate-x-1/2">
                      <VehrLabTooltipChrome
                        label={LABS_GLUCOSE_TOOLTIP_ACUTE.label}
                        date={LABS_GLUCOSE_TOOLTIP_ACUTE.date}
                        valuePrimary={LABS_GLUCOSE_TOOLTIP_ACUTE.valuePrimary}
                        unitSuffix={LABS_GLUCOSE_TOOLTIP_ACUTE.unitSuffix}
                        segments={glucoseSegments}
                        markerPercent={72}
                        markerRingClass="ring-[#BE185D]"
                        caption={LABS_GLUCOSE_TOOLTIP_ACUTE.caption}
                      />
                    </div>
                    <div className="relative h-full min-h-[52px] md:min-h-[60px]">
                      <Cell className={`h-full min-h-[52px] md:min-h-[60px] ${cls}`}>{content}</Cell>
                    </div>
                  </div>
                );
              }
              return (
                <Cell key={i} className={cls}>
                  {content}
                </Cell>
              );
            })}
            {LABS_BP_VALUES.map((v, i) => (
              <Cell key={v} className={bpClass[i]}>
                {v}
              </Cell>
            ))}
          </div>
          <div className="mt-4 border-t border-black/10">
            <MatrixDateRow />
          </div>
        </div>

        <div className={CASE_STUDY_MATRIX_LABEL_COL_COMPACT_CLASS}>
          <div className="flex min-h-[132px] flex-col gap-1.5 md:min-h-[156px]">
            <div className="flex min-h-0 flex-1 items-center">
              <div className={CASE_STUDY_MATRIX_ROW_LABEL_CLASS}>Glucose</div>
            </div>
            <div className="flex min-h-0 flex-1 items-center">
              <div className={CASE_STUDY_MATRIX_ROW_LABEL_CLASS}>BP</div>
            </div>
          </div>
          <div className="invisible mt-4 border-t border-black/10">
            <MatrixDateRow />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 border-t border-black/10 pt-4 md:hidden">
        <span className="font-sans text-[11px] font-semibold leading-tight text-black/60">
          Glucose
        </span>
        <span className="font-sans text-[11px] font-semibold leading-tight text-black/60">
          BP
        </span>
      </div>
    </div>
  );
}

type VehrLabTooltipChromeProps = {
  label: string;
  date: string;
  valuePrimary: string;
  /** Unit suffix (defaults to percent sign). */
  unitSuffix?: string;
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
  unitSuffix = "%",
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
          <span className="text-[22px] font-bold text-white/90">{unitSuffix}</span>
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

type SharedAxisCell = {
  value?: string;
  className: string;
  /** Native tooltip (full-width vitals/labs grid). */
  title?: string;
};

type SharedAxisRow = {
  measure: string;
  cells: SharedAxisCell[];
};

const T_GLU_DOWN = "Elevated glucose, trending downward across visits.";
const T_GLU_IMPROVING =
  "Improving but still elevated compared with typical fasting range.";
const T_GLU_NEAR = "Near-normal value after prior marked elevation.";

const T_SPO2_NORMAL = "Normal resting oxygen saturation.";
const T_SPO2_DECLINE = "Gradual decline in oxygen saturation across visits.";
const T_SPO2_MARKED =
  "Markedly reduced oxygen saturation; this value stands out from the prior trend.";

const T_HR_REST = "Within or near expected resting range.";
const T_HR_ELEV = "Elevated heart rate compared with prior values.";
const T_HR_TACHY = "Tachycardic relative to earlier visits.";

const T_BP_BORDER = "Borderline to mildly elevated systolic blood pressure.";
const T_BP_ELEV = "Elevated systolic blood pressure.";
const T_BP_HIGH =
  "High systolic blood pressure, standing out from the surrounding trend.";
const T_BP_LOWER = "Lower systolic pressure compared with the prior spike.";

const emptyLabCell: SharedAxisCell = {
  value: "",
  className: "border-black/[0.06] bg-white text-black/25",
  title: "",
};

const narrativeLabIndices = [2, 6, 7, 8] as const;

function narrativeLabCells(
  values: readonly string[],
  classes: readonly string[],
  titles: readonly string[],
): SharedAxisCell[] {
  const cells = Array.from({ length: SHARED_AXIS_COLUMN_COUNT }, () => ({ ...emptyLabCell }));
  narrativeLabIndices.forEach((col, i) => {
    cells[col] = {
      value: values[i] ?? "",
      className: classes[i] ?? emptyLabCell.className,
      title: titles[i] ?? "",
    };
  });
  return cells;
}

const sharedAxisRows: SharedAxisRow[] = [
  {
    measure: "Glucose",
    cells: narrativeLabCells(
      ["186 mg/dL", "342 mg/dL", "248 mg/dL", "154 mg/dL"],
      [
        "border-[#F472B6]/40 bg-[#F472B6] text-[#111111]",
        "border-[#9D174D]/30 bg-[#9D174D] text-[#FFFFFF] shadow-md",
        "border-[#BE185D]/30 bg-[#BE185D] text-[#FFFFFF]",
        "border-[#FCE7F3] bg-[#FCE7F3] text-[#111111]",
      ],
      [
        "Elevated at urgent care; early warning before acute event.",
        "Marked hyperglycemia during ED presentation.",
        "Improving after insulin initiation and metformin increase.",
        "Trending toward goal range at telehealth follow-up.",
      ],
    ),
  },
  {
    measure: "BP",
    cells: narrativeLabCells(
      ["138/88", "168/102", "152/94", "136/84"],
      [
        "border-cyan-100/80 bg-[#ECFEFF] text-[#111111]",
        "border-[#115E59]/40 bg-[#115E59] text-[#FFFFFF] shadow-md",
        "border-teal-400/40 bg-[#2DD4BF] text-[#FFFFFF]",
        "border-black/[0.06] bg-[#FAFAF9] text-[#111111]",
      ],
      [
        "Mildly elevated at urgent care.",
        "Hypertensive during acute presentation.",
        "Improving with treatment and hydration.",
        "Near prior baseline at follow-up.",
      ],
    ),
  },
];

/** Widest shared-axis row label — keeps sticky date footer aligned with the label column. */
const SHARED_AXIS_LABEL_COL_WIDTH_SENTINEL = [
  ...sharedDiagnosisTimelineRows.map((r) => r.name),
  "Encounters",
  ...sharedAxisRows.map((r) => r.measure),
  ...sharedMedicationRows.map((r) => r.name),
].reduce((a, b) => (a.length >= b.length ? a : b));

type HoldTooltipDatum = {
  id: string;
  measure: string;
  date: string;
  valuePrimary: string;
  unitSuffix: string;
  caption: string;
  segments: string[];
  markerPercent: number;
  markerRingClass: string;
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function markerCenterPercentFromT(t01: number, segmentCount: number) {
  const t = clamp01(t01);
  const rawIndex = Math.floor(t * segmentCount);
  const index = Math.max(0, Math.min(segmentCount - 1, rawIndex));
  return ((index + 0.5) / segmentCount) * 100;
}

export function toTooltipDate(label: string) {
  // "Sep 09" -> "09 Sep 2024"
  const [mon, dayRaw] = label.split(" ");
  const day = (dayRaw ?? "").padStart(2, "0");
  return `${day} ${mon} 2024`;
}

/** Portfolio sig tooltip header — e.g. "Sep 10" -> "10 Sep 2025". */
export function toSigTooltipHeaderDate(axisLabel: string): string {
  const parts = axisLabel.trim().split(/\s+/);
  const mon = parts[0] ?? "";
  const day = (parts[1] ?? "").replace(/\D/g, "");
  return day && mon ? `${day} ${mon} 2025` : axisLabel;
}

/** Portfolio sig tooltip “Since” line — e.g. "Sep 10" -> "Sep 10, 2025". */
export function toSigTooltipSinceDate(axisLabel: string): string {
  const parts = axisLabel.trim().split(/\s+/);
  const mon = parts[0] ?? "";
  const day = (parts[1] ?? "").replace(/\D/g, "");
  return day && mon ? `${mon} ${day}, 2025` : axisLabel;
}

function pickMeasureTooltipConfig(args: {
  measure: string;
  dateLabel: string;
  displayValue: string;
  tooltipCaption: string;
  numericValue: number;
}): Omit<HoldTooltipDatum, "id" | "date"> {
  const { measure, displayValue, tooltipCaption, numericValue } = args;

  if (measure === "BP") {
    const criticalLow = 80;
    const criticalHigh = 200;
    const t = clamp01((numericValue - criticalLow) / (criticalHigh - criticalLow));
    return {
      measure,
      valuePrimary: displayValue.split("/")[0]?.trim() || displayValue,
      unitSuffix: "mmHg",
      caption: tooltipCaption,
      segments: [
        "bg-[#115E59]",
        "bg-[#0F766E]",
        "bg-[#14B8A6]",
        "bg-[#99F6E4]",
        "bg-[#CCFBF1]",
      ],
      markerPercent: markerCenterPercentFromT(t, 5),
      markerRingClass: "ring-[#115E59]",
    };
  }

  if (measure === "Glucose") {
    // Full range with normal centered: critical low → normal → critical high
    const criticalLow = 50;
    const criticalHigh = 400;
    const t = clamp01((numericValue - criticalLow) / (criticalHigh - criticalLow));
    return {
      measure,
      valuePrimary: displayValue.replace(" mg/dL", ""),
      unitSuffix: "mg/dL",
      caption: tooltipCaption,
      segments: [
        "bg-[#115E59]", // critical low
        "bg-[#2DD4BF]", // low
        "bg-[#FAFAF9]", // normal
        "bg-[#F472B6]", // high
        "bg-[#BE185D]", // critical high
      ],
      markerPercent: markerCenterPercentFromT(t, 5),
      markerRingClass: "ring-[#BE185D]",
    };
  }

  if (measure === "Heart rate") {
    // Full range with normal centered: bradycardic → normal → tachycardic
    const criticalLow = 40;
    const criticalHigh = 140;
    const t = clamp01((numericValue - criticalLow) / (criticalHigh - criticalLow));
    return {
      measure,
      valuePrimary: displayValue.replace(" bpm", ""),
      unitSuffix: "bpm",
      caption: tooltipCaption,
      segments: [
        "bg-[#115E59]", // critical low
        "bg-[#2DD4BF]", // low
        "bg-[#FAFAF9]", // normal
        "bg-[#F472B6]", // high
        "bg-[#BE185D]", // critical high
      ],
      markerPercent: markerCenterPercentFromT(t, 5),
      markerRingClass: "ring-[#F472B6]",
    };
  }

  // Systolic BP
  {
    // Full range with normal centered: hypotensive → normal → hypertensive
    const criticalLow = 80;
    const criticalHigh = 200;
    const t = clamp01((numericValue - criticalLow) / (criticalHigh - criticalLow));
    return {
      measure,
      valuePrimary: displayValue.replace(" mmHg", ""),
      unitSuffix: "mmHg",
      caption: tooltipCaption,
      segments: [
        "bg-[#115E59]", // critical low
        "bg-[#2DD4BF]", // low
        "bg-[#FAFAF9]", // normal
        "bg-[#F472B6]", // high
        "bg-[#BE185D]", // critical high
      ],
      markerPercent: markerCenterPercentFromT(t, 5),
      markerRingClass: "ring-[#BE185D]",
    };
  }
}

type HeldInteraction =
  | { scope: "lab"; key: string }
  | { scope: "dx"; dxId: string; col: number }
  | { scope: "enc"; col: number }
  | { scope: "med"; medId: string; col: number };

/** Minimum px per visit column before we drop columns (no horizontal scroll). */
const MIN_TIMELINE_COL_PX = 60;
/** Thinnest layout: one visit column beside row labels. */
const MIN_TIMELINE_VISIBLE_COLS = 1;

/** Row-label column — fixed 70px (matches matrix card label column). */
const labelColClass = "w-[70px] shrink-0";

const labelRowTextClass =
  "block text-left font-sans text-[10px] font-semibold leading-tight text-black/65 sm:text-[11px] md:text-[12px]";

/** One timeline row + its label: shared row height, vertically centered pair. */
const timelineLabelRowGridClass =
  "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:gap-3";

function globalColumnFromLabKey(key: string): number {
  const idx = key.lastIndexOf(":");
  if (idx < 0) return Number.NaN;
  return Number(key.slice(idx + 1));
}

function medSegmentBgClass(cell: SharedMedicationCell): string {
  switch (cell.kind) {
    case "none":
      return "bg-white";
    case "active":
      return "bg-[#0B111D]";
    case "inactive":
      return "bg-[#AAB2BD]";
    case "dose":
      return cell.doseOn === "dark" ? "bg-[#0B111D]" : "bg-[#AAB2BD]";
  }
}

function medDoseLabelClass(cell: SharedMedicationCell): string {
  if (cell.kind !== "dose") return "";
  const onDark = cell.doseOn === "dark";
  return onDark
    ? "text-[11px] font-semibold text-white md:text-[12px]"
    : "text-[11px] font-semibold text-[#0B111D] md:text-[12px]";
}

function medSegmentIsDark(cell: SharedMedicationCell): boolean {
  return (
    cell.kind === "active" ||
    (cell.kind === "dose" && cell.doseOn === "dark")
  );
}

/** Faint column rule: dark segments use a light hairline; light segments use the shared gray rule. */
function medColDividerClass(cell: SharedMedicationCell, isLast: boolean): string {
  if (isLast) return "";
  return medSegmentIsDark(cell)
    ? "border-r border-white/[0.14]"
    : timelineColDividerClass;
}

/** Medication row — navy active band, blue-grey inactive / dose-on-light (reference EHR). */
export function MedicationTimelineStrip({
  cells,
}: {
  cells: readonly SharedMedicationCell[];
}) {
  return (
    <div
      className={`flex w-full min-w-0 overflow-hidden rounded-md ${medTimelineStripHeightClass}`}
      aria-hidden
    >
      {cells.map((cell, i) => {
        const isEmpty = cell.kind === "none";
        const isDose = cell.kind === "dose";
        const isLast = i === cells.length - 1;
        return (
          <div
            key={i}
            className={`relative flex min-w-0 flex-1 items-center justify-start px-0.5 ${medSegmentBgClass(cell)} ${medColDividerClass(cell, isLast)} ${isEmpty ? "border border-dashed border-black/[0.08]" : ""}`}
          >
            {isDose ? (
              <span
                className={`truncate pl-0.5 font-sans leading-tight ${medDoseLabelClass(cell)}`}
              >
                {cell.label ?? "—"}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export type HoldDetailTooltip = {
  primaryTitle: string;
  secondaryTitle: string;
  date: string;
  rows: readonly { label: string; value: string }[];
};

/** Dark hold panel + caret — shared by diagnosis, encounter, and medication tooltips. */
export function VehrKeyValueHoldTooltipChrome({
  primaryTitle,
  secondaryTitle,
  date,
  rows,
  panelPlacement = "above",
}: HoldDetailTooltip & { panelPlacement?: "above" | "below" }) {
  const caretDown = (
    <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2">
      <div className="h-0 w-0 border-x-[10px] border-x-transparent border-t-[11px] border-t-black drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]" />
    </div>
  );
  const caretUp = (
    <div className="pointer-events-none absolute bottom-full left-1/2 mb-[-1px] -translate-x-1/2">
      <div className="h-0 w-0 border-x-[10px] border-x-transparent border-b-[11px] border-b-black drop-shadow-[0_-4px_6px_rgba(0,0,0,0.25)]" />
    </div>
  );
  return (
    <div
      className={`relative w-full ${panelPlacement === "above" ? "pb-1" : "pt-1"}`}
      aria-hidden
    >
      <div className="relative w-full rounded-xl bg-black px-[18px] pb-3 pt-[14px] shadow-[0_20px_50px_-14px_rgba(0,0,0,0.55),0_10px_22px_-10px_rgba(0,0,0,0.38)]">
        {panelPlacement === "below" ? caretUp : null}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[15px] font-semibold leading-snug tracking-tight text-white">
              {primaryTitle}
            </div>
            <div className="text-[12px] font-normal leading-snug text-white/55">
              {secondaryTitle}
            </div>
          </div>
          <span className="shrink-0 text-right text-[11px] font-normal tabular-nums leading-snug text-white/60 md:text-[12px]">
            {date}
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

        {panelPlacement === "above" ? caretDown : null}
      </div>
    </div>
  );
}

/**
 * Medication tooltip — sig line, ACTIVE chip, dose state + since (portfolio / prototype style).
 */
export function VehrSigMedicationTooltipChrome({
  medicationName,
  headerDate,
  sigLine,
  doseState,
  sinceDate,
  panelPlacement = "above",
}: {
  medicationName: string;
  headerDate: string;
  sigLine: string;
  doseState: string;
  sinceDate: string;
  panelPlacement?: "above" | "below";
}) {
  const caretDown = (
    <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2">
      <div className="h-0 w-0 border-x-[10px] border-x-transparent border-t-[11px] border-t-black drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]" />
    </div>
  );
  const caretUp = (
    <div className="pointer-events-none absolute bottom-full left-1/2 mb-[-1px] -translate-x-1/2">
      <div className="h-0 w-0 border-x-[10px] border-x-transparent border-b-[11px] border-b-black drop-shadow-[0_-4px_6px_rgba(0,0,0,0.25)]" />
    </div>
  );
  return (
    <div
      className={`relative w-full ${panelPlacement === "above" ? "pb-1" : "pt-1"}`}
      aria-hidden
    >
      <div className="relative w-full rounded-xl bg-black px-[18px] pb-3 pt-[14px] shadow-[0_20px_50px_-14px_rgba(0,0,0,0.55),0_10px_22px_-10px_rgba(0,0,0,0.38)]">
        {panelPlacement === "below" ? caretUp : null}

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 text-[15px] font-semibold leading-snug tracking-tight text-white">
            {medicationName}
          </div>
          <span className="shrink-0 text-right text-[11px] font-normal tabular-nums leading-snug text-white/60 md:text-[12px]">
            {headerDate}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="min-w-0 text-[12px] font-normal leading-snug text-white/55">
            {sigLine}
          </p>
          <span className="shrink-0 rounded-full bg-[#22C55E] px-2.5 py-1 text-center font-sans text-[10px] font-bold uppercase leading-none tracking-[0.08em] text-white">
            ACTIVE
          </span>
        </div>

        <dl className="mt-3 space-y-1 border-t border-white/10 pt-3">
          <div className="flex items-baseline justify-between gap-4 text-[11px] leading-snug md:text-[12px]">
            <dt className="shrink-0 text-white/65">Dose state</dt>
            <dd className="min-w-0 text-right font-semibold text-white">
              {doseState}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 text-[11px] leading-snug md:text-[12px]">
            <dt className="shrink-0 text-white/65">Since</dt>
            <dd className="min-w-0 text-right font-semibold text-white">
              {sinceDate}
            </dd>
          </div>
        </dl>

        {panelPlacement === "above" ? caretDown : null}
      </div>
    </div>
  );
}

function encPrimaryTitle(enc: EncounterAxisCell): string {
  switch (enc.kind) {
    case "uc":
      return "Urgent Care Visit";
    case "er":
      return "Emergency Department";
    case "pcp":
      return "Primary Care Visit";
    case "tel":
      return "Telehealth Visit";
    default:
      return "Visit";
  }
}

function dxHoldTooltipDetail(
  drow: (typeof sharedDiagnosisTimelineRows)[number],
  col: number,
): HoldDetailTooltip {
  const dateLabel = SHARED_AXIS_DATES[col] ?? "";
  const tone = drow.tones[col] ?? "shell";
  const addressed = drow.addressedAtVisit[col] === true;
  const status =
    tone === "exacerbation"
      ? "Exacerbated"
      : tone === "empty"
        ? "Not listed"
        : "Stable / monitored";
  return {
    primaryTitle: drow.name,
    secondaryTitle: "Diagnosis",
    date: toTooltipDate(dateLabel),
    rows: [
      { label: "Clinical status", value: status },
      { label: "Addressed at visit", value: addressed ? "Yes" : "No" },
      { label: "Problem list", value: tone === "empty" ? "—" : "Active" },
      {
        label: "Note",
        value: addressed
          ? "Captured in encounter note"
          : "See surrounding encounters for context",
      },
    ],
  };
}

function encHoldTooltipDetail(col: number): HoldDetailTooltip {
  const enc = sharedEncounterAxisRow[col]!;
  const dateLabel = SHARED_AXIS_DATES[col] ?? "";
  const setting =
    enc.kind === "uc"
      ? "Urgent care clinic"
      : enc.kind === "er"
        ? "Hospital emergency department"
        : enc.kind === "pcp"
          ? "Primary care clinic"
          : enc.kind === "tel"
            ? "Video / phone visit"
            : "—";
  return {
    primaryTitle: encPrimaryTitle(enc),
    secondaryTitle: "Encounter",
    date: toTooltipDate(dateLabel),
    rows: [
      { label: "Visit type", value: enc.label ?? "—" },
      { label: "Care setting", value: setting },
      { label: "Diagnosis addressed", value: "Review problem list" },
      { label: "Next step", value: "As documented in visit note" },
    ],
  };
}

export function medHoldTooltipDetail(
  mrow: { name: string },
  cell: SharedMedicationCell,
  col: number,
  dateAxis: readonly string[] = SHARED_AXIS_DATES,
): HoldDetailTooltip {
  const date = toTooltipDate(dateAxis[col] ?? "");
  const secondary = "Medication";
  switch (cell.kind) {
    case "dose":
      return {
        primaryTitle: mrow.name,
        secondaryTitle: secondary,
        date,
        rows: [
          { label: "Dose", value: cell.label ?? "—" },
          { label: "Status", value: "Active" },
          { label: "Related visit", value: "Encounter on this date" },
          { label: "Note", value: "Review home monitoring when applicable" },
        ],
      };
    case "active":
      return {
        primaryTitle: mrow.name,
        secondaryTitle: secondary,
        date,
        rows: [
          { label: "Status", value: "Active" },
          { label: "On this timeline", value: "Continuing therapy" },
          { label: "Related visit", value: "Aligned to column date" },
        ],
      };
    case "inactive":
      return {
        primaryTitle: mrow.name,
        secondaryTitle: secondary,
        date,
        rows: [
          { label: "Status", value: "Inactive / prior interval" },
          { label: "Review", value: "Compare with orders and notes" },
        ],
      };
    case "none":
    default:
      return {
        primaryTitle: mrow.name,
        secondaryTitle: secondary,
        date,
        rows: [
          { label: "Status", value: "No active order" },
          { label: "On this date", value: "—" },
        ],
      };
  }
}

export function TimelineColumnTooltipAnchor({
  globalColIndex,
  colStart,
  visibleColCount,
  placement = "above",
  children,
}: {
  globalColIndex: number;
  colStart: number;
  visibleColCount: number;
  /** `above`: panel over the row (default). `below`: panel under the row — avoids covering rows above. */
  placement?: "above" | "below";
  children: ReactNode;
}) {
  const local = globalColIndex - colStart;
  if (local < 0 || local >= visibleColCount) return null;
  const positionClass =
    placement === "above"
      ? "bottom-[calc(100%+6px)]"
      : "top-[calc(100%+6px)]";
  return (
    <div
      className={`pointer-events-none absolute ${positionClass} z-50 w-[min(300px,calc(100vw-4rem))] max-w-[300px] -translate-x-1/2`}
      style={{
        left: `${((local + 0.5) / visibleColCount) * 100}%`,
      }}
    >
      {children}
    </div>
  );
}

/** Medication detail chrome — matches lab/encounter tooltip panels in this file. */
export function VehrMedicationHoldTooltipChrome({
  name,
  date,
  doseLine,
}: {
  name: string;
  date: string;
  doseLine: string;
}) {
  return (
    <VehrKeyValueHoldTooltipChrome
      primaryTitle={name}
      secondaryTitle="Oral medication"
      date={date}
      rows={[
        { label: "Dose", value: doseLine },
        { label: "Status", value: "Active" },
        { label: "Related visit", value: "PCP follow-up" },
        { label: "Note", value: "Reviewed with home glucose log" },
      ]}
    />
  );
}

/** Shared visit-date row — same column count as vitals/labs/medications grids. */
export function VehrSharedAxisDateRow({
  className = "",
  startIndex = 0,
  count = SHARED_AXIS_COLUMN_COUNT,
  labels: labelsProp,
}: {
  className?: string;
  /** First column index into `SHARED_AXIS_DATES` (for responsive suffix windows). */
  startIndex?: number;
  /** Number of consecutive columns to show from `startIndex` (ignored when `labels` is set). */
  count?: number;
  /** When set, renders these labels instead of slicing `SHARED_AXIS_DATES`. */
  labels?: readonly string[];
}) {
  const labels =
    labelsProp ?? SHARED_AXIS_DATES.slice(startIndex, startIndex + count);
  return (
    <div className={`pt-3 md:pt-3.5 ${className}`}>
      <div
        className="grid gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))`,
        }}
        role="row"
        aria-label="Visit dates"
      >
        {labels.map((label, j) => (
          <div
            key={`${startIndex + j}-${label}`}
            className={`truncate text-center font-sans text-[10px] font-semibold leading-tight text-black/90 md:text-[12px] ${j < labels.length - 1 ? timelineColDividerClass : ""}`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SharedTimeAxisCard() {
  const [held, setHeld] = useState<HeldInteraction | null>(null);
  const timelineContentRef = useRef<HTMLDivElement>(null);
  const [visibleColCount, setVisibleColCount] = useState<number>(SHARED_AXIS_COLUMN_COUNT);

  useLayoutEffect(() => {
    const el = timelineContentRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      if (!Number.isFinite(w) || w <= 0) {
        setVisibleColCount(SHARED_AXIS_COLUMN_COUNT);
        return;
      }
      const n = Math.floor(w / MIN_TIMELINE_COL_PX);
      const next = Math.min(
        SHARED_AXIS_COLUMN_COUNT,
        Math.max(MIN_TIMELINE_VISIBLE_COLS, n),
      );
      setVisibleColCount((prev) => (prev === next ? prev : next));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const colStart = SHARED_AXIS_COLUMN_COUNT - visibleColCount;

  useEffect(() => {
    if (!held) return;
    if (held.scope === "lab") {
      const col = globalColumnFromLabKey(held.key);
      if (
        !Number.isFinite(col) ||
        col < colStart ||
        col >= colStart + visibleColCount
      ) {
        setHeld(null);
      }
      return;
    }
    if (held.col < colStart || held.col >= colStart + visibleColCount) {
      setHeld(null);
    }
  }, [held, colStart, visibleColCount]);

  useEffect(() => {
    if (!held) return;
    const onUp = () => setHeld(null);
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    window.addEventListener("blur", onUp);
    return () => {
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("blur", onUp);
    };
  }, [held]);

  const holdTooltipByCellId = useMemo(() => {
    const out = new Map<string, HoldTooltipDatum>();
    sharedAxisRows.forEach((row) => {
      row.cells.forEach((cell, i) => {
        const dateLabel = SHARED_AXIS_DATES[i] ?? "";
        const v = cell.value ?? "—";
        const numericValue = Number(String(v).match(/-?\d+(\.\d+)?/)?.[0] ?? "0");
        const cfg = pickMeasureTooltipConfig({
          measure: row.measure,
          dateLabel,
          displayValue: v,
          tooltipCaption: cell.title ?? "",
          numericValue,
        });
        const id = `${row.measure}:${i}`;
        out.set(id, {
          id,
          date: toTooltipDate(dateLabel),
          ...cfg,
        });
      });
    });
    return out;
  }, []);

  return (
    <div className={`relative w-full overflow-visible ${CASE_STUDY_MATRIX_SHELL_CLASS}`}>
      <div className="grid w-full grid-cols-[minmax(0,1fr)_70px] items-start gap-2 sm:gap-3 md:mx-auto md:w-full md:max-w-[1392px]">
        <div ref={timelineContentRef} className="min-w-0 overflow-visible">
          <div
            className="space-y-0"
            role="group"
            aria-label="Diagnoses and encounters on shared timeline"
          >
            {sharedDiagnosisTimelineRows.map((drow, dxRowIdx) => (
              <div
                key={drow.id}
                className={`relative isolate flex min-h-[52px] items-center px-0.5 md:min-h-[60px] ${dxRowIdx > 0 ? "mt-1.5" : ""}`}
              >
                {held?.scope === "dx" && held.dxId === drow.id ? (
                  <TimelineColumnTooltipAnchor
                    globalColIndex={held.col}
                    colStart={colStart}
                    visibleColCount={visibleColCount}
                  >
                    <VehrKeyValueHoldTooltipChrome
                      {...dxHoldTooltipDetail(drow, held.col)}
                    />
                  </TimelineColumnTooltipAnchor>
                ) : null}
                <div className="pointer-events-none w-full">
                  <DiagnosisTimelineStrip
                    tones={drow.tones.slice(colStart, colStart + visibleColCount)}
                    addressedAtVisit={drow.addressedAtVisit.slice(
                      colStart,
                      colStart + visibleColCount,
                    )}
                  />
                </div>
                <div
                  className="absolute inset-0 z-[2] grid"
                  style={{
                    gridTemplateColumns: `repeat(${visibleColCount}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from({ length: visibleColCount }, (_, j) => {
                    const colIdx = colStart + j;
                    return (
                      <div
                        key={colIdx}
                        role="presentation"
                        className="cursor-pointer select-none"
                        onPointerDown={(e) => {
                          if (e.button !== 0) return;
                          setHeld({ scope: "dx", dxId: drow.id, col: colIdx });
                        }}
                        onPointerUp={() => setHeld(null)}
                        onPointerCancel={() => setHeld(null)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
            <div
              className="mt-1.5 grid gap-1.5"
              style={{
                gridTemplateColumns: `repeat(${visibleColCount}, minmax(0, 1fr))`,
              }}
              role="row"
              aria-label="Encounters by visit date"
            >
              {sharedEncounterAxisRow
                .slice(colStart, colStart + visibleColCount)
                .map((enc, j) => {
                  const i = colStart + j;
                  const fill = enc.kind !== "none" ? ENCOUNTER_FILL[enc.kind] : undefined;
                  return (
                    <div
                      key={i}
                      className={`relative isolate ${j < visibleColCount - 1 ? timelineColDividerClass : ""}`}
                    >
                      {held?.scope === "enc" && held.col === i ? (
                        <div className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-50 w-[min(300px,calc(100vw-4rem))] max-w-[300px] -translate-x-1/2">
                          <VehrKeyValueHoldTooltipChrome {...encHoldTooltipDetail(i)} />
                        </div>
                      ) : null}
                      <div
                        className={`flex min-h-[52px] items-center justify-center rounded-md border border-black/[0.06] px-0.5 text-center font-sans text-[11px] font-semibold leading-tight md:min-h-[60px] md:text-[12px] ${enc.label ? "cursor-pointer select-none border-transparent text-white transition-[filter] duration-150 hover:brightness-95" : "bg-white text-black/30"}`}
                        style={fill ? { backgroundColor: fill } : undefined}
                        onPointerDown={(e) => {
                          if (e.button !== 0) return;
                          setHeld({ scope: "enc", col: i });
                        }}
                        onPointerUp={() => setHeld(null)}
                        onPointerCancel={() => setHeld(null)}
                      >
                        {enc.label ?? <span className="text-black/22">—</span>}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div
            className="mt-4 grid gap-x-1.5 gap-y-0"
            style={{
              gridTemplateColumns: `repeat(${visibleColCount}, minmax(0, 1fr))`,
            }}
            role="table"
            aria-label="Vitals and labs aligned to shared dates"
          >
            {sharedAxisRows.map((row, labRowIdx) =>
              row.cells.slice(colStart, colStart + visibleColCount).map((cell, j) => {
                const i = colStart + j;
                return (
                  <div
                    key={`${row.measure}-${i}`}
                    className={`relative isolate ${j < visibleColCount - 1 ? timelineColDividerClass : ""} ${labRowIdx > 0 ? "mt-1.5" : ""}`}
                    onPointerDown={(e) => {
                      if (e.button !== 0) return;
                      setHeld({ scope: "lab", key: `${row.measure}:${i}` });
                    }}
                    onPointerUp={() => setHeld(null)}
                    onPointerCancel={() => setHeld(null)}
                  >
                    {held?.scope === "lab" && held.key === `${row.measure}:${i}` ? (
                      <div className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-50 w-[min(300px,calc(100vw-4rem))] max-w-[300px] -translate-x-1/2">
                        {(() => {
                          const datum = holdTooltipByCellId.get(`${row.measure}:${i}`);
                          if (!datum) return null;
                          return (
                            <VehrLabTooltipChrome
                              label={datum.measure}
                              date={datum.date}
                              valuePrimary={datum.valuePrimary}
                              unitSuffix={datum.unitSuffix}
                              segments={datum.segments}
                              markerPercent={datum.markerPercent}
                              markerRingClass={datum.markerRingClass}
                              caption={datum.caption}
                            />
                          );
                        })()}
                      </div>
                    ) : null}
                    <Cell
                      className={`${cell.className} cursor-pointer select-none transition-[filter] duration-150 hover:brightness-95`}
                    >
                      {cell.value ? cell.value : <span className="text-black/25">—</span>}
                    </Cell>
                  </div>
                );
              }),
            )}
          </div>

          <div className="mt-4" role="group" aria-label="Medications on shared timeline">
            <div className="space-y-0">
              {sharedMedicationRows.map((mrow, medRowIdx) => (
                <div
                  key={mrow.id}
                  className={`relative isolate flex min-h-[52px] items-center px-0.5 md:min-h-[60px] ${medRowIdx > 0 ? "mt-1.5" : ""}`}
                >
                  {held?.scope === "med" && held.medId === mrow.id ? (
                    <TimelineColumnTooltipAnchor
                      globalColIndex={held.col}
                      colStart={colStart}
                      visibleColCount={visibleColCount}
                    >
                      <VehrKeyValueHoldTooltipChrome
                        {...medHoldTooltipDetail(
                          mrow,
                          mrow.cells[held.col]!,
                          held.col,
                        )}
                      />
                    </TimelineColumnTooltipAnchor>
                  ) : null}
                  <div className="pointer-events-none w-full">
                    <MedicationTimelineStrip
                      cells={mrow.cells.slice(colStart, colStart + visibleColCount)}
                    />
                  </div>
                  <div
                    className="absolute inset-0 z-[2] grid"
                    style={{
                      gridTemplateColumns: `repeat(${visibleColCount}, minmax(0, 1fr))`,
                    }}
                  >
                    {mrow.cells.slice(colStart, colStart + visibleColCount).map((_, j) => {
                      const i = colStart + j;
                      return (
                        <div
                          key={i}
                          role="presentation"
                          className="cursor-pointer select-none"
                          onPointerDown={(e) => {
                            if (e.button !== 0) return;
                            setHeld({ scope: "med", medId: mrow.id, col: i });
                          }}
                          onPointerUp={() => setHeld(null)}
                          onPointerCancel={() => setHeld(null)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={labelColClass}>
          {sharedDiagnosisTimelineRows.map((drow, dxRowIdx) => (
            <div
              key={drow.id}
              className={`flex min-h-[52px] min-w-0 w-max max-w-full items-center justify-start text-left md:min-h-[60px] ${dxRowIdx > 0 ? "mt-1.5" : ""}`}
            >
              <span className={labelRowTextClass}>{drow.name}</span>
            </div>
          ))}
          <div className="mt-1.5 flex min-h-[52px] min-w-0 w-max max-w-full items-center justify-start text-left md:min-h-[60px]">
            <span className={labelRowTextClass}>Encounters</span>
          </div>

          <div className="mt-4">
            {sharedAxisRows.map((row, labRowIdx) => (
              <div
                key={row.measure}
                className={`flex min-h-[52px] min-w-0 w-max max-w-full items-center justify-start text-left md:min-h-[60px] ${labRowIdx > 0 ? "mt-1.5" : ""}`}
              >
                <span className={labelRowTextClass}>{row.measure}</span>
              </div>
            ))}
          </div>

          <div className="mt-4">
            {sharedMedicationRows.map((mrow, medRowIdx) => (
              <div
                key={mrow.id}
                className={`flex min-h-[52px] min-w-0 w-max max-w-full items-center justify-start text-left md:min-h-[60px] ${medRowIdx > 0 ? "mt-1.5" : ""}`}
              >
                <span className={labelRowTextClass}>{mrow.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`sticky bottom-0 z-30 mt-4 bg-white pb-1 pt-3 shadow-[0_-12px_28px_-16px_rgba(0,0,0,0.08)] md:pb-2 md:pt-3.5 ${CASE_STUDY_MATRIX_SHELL_STICKY_BLEED_CLASS}`}
      >
        <div className="grid w-full grid-cols-[minmax(0,1fr)_70px] items-start gap-2 sm:gap-3 md:mx-auto md:w-full md:max-w-[1392px]">
          <div className="min-w-0">
            <VehrSharedAxisDateRow
              className="!pt-0"
              startIndex={colStart}
              count={visibleColCount}
            />
          </div>
          <div className={labelColClass} aria-hidden>
            <span className={`${labelRowTextClass} invisible block select-none`}>
              {SHARED_AXIS_LABEL_COL_WIDTH_SENTINEL}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

export function SharedTimeAxisNarrative() {
  return (
    <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-14">
      <div className="flex flex-col gap-3 md:col-span-2">
        <p className={stepHeadingClass}>Example patient context</p>
        <p className={stepBodyClass}>
          Glucose rises from urgent care through a marked ED presentation, then trends down after
          insulin and metformin adjustment. Blood pressure peaks with the acute visit and eases
          by telehealth follow-up.
        </p>
        <p className={stepBodyClass}>
          Aligned to the same visit columns, labs, symptoms, encounters, and medications
          tell one continuous story of exacerbation and recovery.
        </p>
      </div>
    </div>
  );
}

export default function DesignLogicFromSignal({
  omitLeadIn = false,
  omitSharedAxis = false,
}: {
  /** When true, skip the repeated “The Solution / Rebuilding…” intro (rendered on the case study page). */
  omitLeadIn?: boolean;
  /** When true, omit the shared time axis card (can be rendered full-bleed elsewhere). */
  omitSharedAxis?: boolean;
}) {
  return (
    <div>
      {!omitLeadIn ? (
        <>
          <p className={eyebrowClass}>The Solution</p>
          <h3 className={`${sectionTitleClass} mt-4`}>Rebuilding the Story Around Time</h3>
          <p className={`${introClass} mt-6`}>
            A shared timeline aligns diagnoses, encounters, medications, labs, and
            vitals to the same dates so clinicians can scan for what changed, when it
            changed, and what else was happening nearby—then open detail only when the
            pattern calls for it.
          </p>
        </>
      ) : null}

      <div
        className={
          omitLeadIn ? "mt-0 md:mt-0 lg:mt-0" : "mt-14 md:mt-16 lg:mt-20"
        }
      >
        {!omitSharedAxis ? (
          <section className="mt-2 w-full" aria-label="Shared time axis">
            <SharedTimeAxisCard />
            <SharedTimeAxisNarrative />
          </section>
        ) : null}

        {/* Step 1 — pattern (formerly step 2) */}
        <StepRow isFirst>
          <div className="flex flex-col gap-4 md:max-w-md">
            <h4 className={stepHeadingClass}>1. Pattern over time?</h4>
            <p className={stepBodyClass}>
              Glucose and blood pressure read as longitudinal patterns—early elevation,
              acute worsening at the ED visit, then gradual stabilization after
              treatment changes.
            </p>
          </div>
          <PatternOverTimeMatrix />
        </StepRow>

        {/* Step 2 */}
        <StepRow>
          <div className="flex flex-col gap-4 md:max-w-md">
            <h4 className={stepHeadingClass}>2. What&apos;s the value?</h4>
            <p className={stepBodyClass}>
              Exact glucose and blood pressure values sit on the same dates as
              symptoms, encounters, and medications—so the acute spike on Sep 09
              is never read in isolation.
            </p>
          </div>
          <ExactValueMatrix />
        </StepRow>

        {/* Step 3 */}
        <StepRow>
          <div className="flex flex-col gap-4 md:max-w-md">
            <h4 className={stepHeadingClass}>3. What explains it?</h4>
            <p className={stepBodyClass}>
              Opening the Sep 09 glucose cell shows why the value mattered: marked
              hyperglycemia in the context of the emergency visit and treatment
              escalation that followed.
            </p>
          </div>
          <ExactValueMatrix tooltipOnAcuteGlucose />
        </StepRow>
      </div>
    </div>
  );
}
