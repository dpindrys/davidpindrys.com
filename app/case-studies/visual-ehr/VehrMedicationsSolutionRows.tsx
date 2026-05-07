"use client";

import type { ReactNode } from "react";

import {
  FrxProcessRowShell,
  mediaCardClass,
  rowBodyClass,
  rowHeadingClass,
} from "../frx/FrxExtendedSections";

import {
  MedicationTimelineStrip,
  SHARED_AXIS_DATES,
  sharedMedicationRows,
  toTooltipDate,
  VehrMedicationHoldTooltipChrome,
  VehrSharedAxisDateRow,
  type SharedMedicationRow,
} from "./DesignLogicFromSignal";

const metforminRow = sharedMedicationRows[0]!;
/** Column where Metformin shows the inline dose (Aug 18). */
const METFORMIN_DOSE_COL = 5;

function MedicationSolutionFigure({
  rows,
  tooltipDemo,
}: {
  rows: readonly SharedMedicationRow[];
  tooltipDemo?: { medId: string; col: number };
}) {
  const showTip =
    tooltipDemo &&
    rows.some((r) => r.id === tooltipDemo.medId);

  return (
    <div className="w-full" aria-hidden>
      <div className="w-full overflow-x-auto pb-0.5 [-webkit-overflow-scrolling:touch]">
        <div className="grid min-w-[560px] grid-cols-1 gap-3 md:min-w-0 md:grid-cols-[1fr_112px] md:gap-2.5">
          <div className="min-w-0">
            <div className="space-y-1.5">
              {rows.map((mrow) => {
                const tipThisRow = showTip && tooltipDemo!.medId === mrow.id;
                const doseCell =
                  tipThisRow && tooltipDemo
                    ? mrow.cells[tooltipDemo.col]
                    : undefined;
                return (
                  <div
                    key={mrow.id}
                    className={`relative isolate flex min-h-[52px] items-center px-0.5 md:min-h-[60px] ${
                      tipThisRow
                        ? "rounded-[4px] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.88),0_4px_14px_-4px_rgba(0,0,0,0.22)]"
                        : ""
                    }`}
                  >
                    {tipThisRow && doseCell?.kind === "dose" && tooltipDemo ? (
                      <div
                        className="pointer-events-none absolute bottom-[calc(100%+6px)] z-20 w-[min(280px,calc(100vw-3rem))] max-w-[280px] -translate-x-1/2"
                        style={{
                          left: `${((tooltipDemo.col + 0.5) / SHARED_AXIS_DATES.length) * 100}%`,
                        }}
                      >
                        <VehrMedicationHoldTooltipChrome
                          name={mrow.name}
                          date={toTooltipDate(
                            SHARED_AXIS_DATES[tooltipDemo.col] ?? "",
                          )}
                          doseLine={doseCell.label ?? "—"}
                        />
                      </div>
                    ) : null}
                    <div className="pointer-events-none w-full">
                      <MedicationTimelineStrip cells={mrow.cells} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 border-t border-black/10">
              <VehrSharedAxisDateRow />
            </div>
          </div>

          <div className="hidden md:flex flex-col">
            <div className="grid gap-1.5">
              {rows.map((mrow) => (
                <div
                  key={mrow.id}
                  className="flex min-h-[52px] w-full items-center justify-start font-sans text-[11px] font-semibold leading-tight text-black/65 md:min-h-[60px] md:text-[12px]"
                >
                  {mrow.name}
                </div>
              ))}
            </div>
            <div className="invisible mt-4 border-t border-black/10">
              <VehrSharedAxisDateRow />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 border-t border-black/10 pt-4 md:hidden">
        {rows.map((mrow) => (
          <span
            key={mrow.id}
            className="font-sans text-[11px] font-semibold leading-tight text-black/60"
          >
            {mrow.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function VisualCard({ children }: { children: ReactNode }) {
  return <div className={mediaCardClass}>{children}</div>;
}

export default function VehrMedicationsSolutionRows() {
  return (
    <div className="mt-10 w-full md:mt-14 lg:mt-16">
      <FrxProcessRowShell
        isFirst
        left={
          <>
            <h3 className={rowHeadingClass}>1. Medication events over time</h3>
            <p className={rowBodyClass}>
              Medication bars show when a treatment was active, held, or changed across the
              patient timeline.
            </p>
          </>
        }
      >
        <VisualCard>
          <MedicationSolutionFigure rows={sharedMedicationRows} />
        </VisualCard>
      </FrxProcessRowShell>

      <FrxProcessRowShell
        left={
          <>
            <h3 className={rowHeadingClass}>2. Dose context in line</h3>
            <p className={rowBodyClass}>
              Dose state appears directly on the timeline, so under-range, therapeutic, or flagged
              high-dose states can be reviewed against nearby clinical events.
            </p>
          </>
        }
      >
        <VisualCard>
          <MedicationSolutionFigure rows={[metforminRow]} />
        </VisualCard>
      </FrxProcessRowShell>

      <FrxProcessRowShell
        left={
          <>
            <h3 className={rowHeadingClass}>3. Details without leaving context</h3>
            <p className={rowBodyClass}>
              Tooltips reveal dose, date, and medication context while preserving the surrounding
              timeline.
            </p>
          </>
        }
      >
        <VisualCard>
          <MedicationSolutionFigure
            rows={[metforminRow]}
            tooltipDemo={{ medId: "metformin", col: METFORMIN_DOSE_COL }}
          />
        </VisualCard>
      </FrxProcessRowShell>
    </div>
  );
}
