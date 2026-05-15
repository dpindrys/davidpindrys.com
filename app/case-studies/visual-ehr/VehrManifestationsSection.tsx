import type { ReactNode } from "react";

import ZoomableProblemImagePair from "../../components/ZoomableProblemImagePair";
import {
  vehrBodyClass,
  vehrEyebrowClass,
  vehrProblemArcDividerClass,
  vehrSubsectionTitleClass,
} from "./vehrCaseStudySectionTokens";

function ManifestationBlock({
  id,
  title,
  body,
  children,
  eyebrow,
}: {
  id: string;
  title: string;
  body: string;
  children: ReactNode;
  eyebrow?: string;
}) {
  return (
    <article
      className={vehrProblemArcDividerClass}
      aria-labelledby={id}
    >
      {eyebrow ? <p className={vehrEyebrowClass}>{eyebrow}</p> : null}
      <h3
        id={id}
        className={`scroll-mt-28 ${vehrSubsectionTitleClass} ${eyebrow ? "mt-4 md:mt-5" : ""}`}
      >
        {title}
      </h3>
      <p className={`${vehrBodyClass} mt-5 md:mt-6`}>{body}</p>
      {children}
    </article>
  );
}

export default function VehrManifestationsBlock() {
  return (
    <>
      <ManifestationBlock
        id="vehr-patient-stories-heading"
        title="Patient stories are split across sources"
        body="The same systemic issue shows up differently depending on which part of the chart a clinician is reviewing. Encounters, notes, diagnoses, and orders live in separate modules—clinicians compare dates across tabs to rebuild chronology and lose surrounding context when any one view is opened in isolation."
      >
        <ZoomableProblemImagePair
          dialogLabel="Patient Stories figures"
          className="mt-8 grid w-full grid-cols-1 gap-10 md:mt-10 md:grid-cols-2 md:items-start md:gap-12 lg:gap-14"
          columns={[
            {
              src: "/images/vehr/epic-encounters.png",
              alt: "Epic EHR encounters organized as separate entries across the chart",
              caption: (
                <p className="font-sans text-[16px] leading-[1.55] text-black/65">
                  <span className="font-semibold text-black/65">
                    Encounter list:
                  </span>{" "}
                  Events are chronological, but the longitudinal story still has
                  to be assembled manually.
                </p>
              ),
            },
            {
              src: "/images/vehr/epic-encounter.png",
              alt: "Epic EHR encounter note view isolated from the broader patient timeline",
              caption: (
                <p className="font-sans text-[16px] leading-[1.55] text-black/65">
                  <span className="font-semibold text-black/65">
                    Visit report:
                  </span>{" "}
                  Diagnoses and orders are visible, but disconnected from labs,
                  medications, and symptoms at adjacent visits.
                </p>
              ),
            },
          ]}
        />
      </ManifestationBlock>

      <ManifestationBlock
        id="vehr-ehr-problems-heading"
        title="Trends become noise quickly"
        body="Labs and vitals are most useful longitudinally, but tabular review buries change in rows while multi-scale trend lines compete for attention. Interpreting whether a value matters—and what surrounded it—becomes its own reconstruction task."
      >
        <ZoomableProblemImagePair
          dialogLabel="Trends and noise figures"
          className="mt-8 grid w-full grid-cols-1 gap-10 md:mt-10 md:grid-cols-2 md:items-start md:gap-12 lg:gap-14"
          columns={[
            {
              src: "/images/vehr/mismatch.png",
              alt: "Tabular lab and vital review where values are listed without clear emphasis on abnormality or change",
              caption: (
                <p className="font-sans text-[16px] leading-snug tracking-tight text-black/65">
                  <span className="font-semibold text-black/65">
                    Tabular review:
                  </span>{" "}
                  Values are available, but abnormality and change have to be
                  found row by row—without visit context.
                </p>
              ),
            },
            {
              src: "/images/vehr/overload.png",
              alt: "Overlapping trend lines with competing scales obscuring clinically important changes",
              caption: (
                <p className="font-sans text-[16px] leading-snug tracking-tight text-black/65">
                  <span className="font-semibold text-black/65">
                    Spaghetti trends:
                  </span>{" "}
                  Overlapping lines and competing scales obscure the changes
                  that matter at a specific point in care.
                </p>
              ),
            },
          ]}
        />
      </ManifestationBlock>

      <ManifestationBlock
        id="vehr-medications-problem-heading"
        title="Medication lists hide the story of change"
        body="Medication lists show what a patient may be taking now—not when therapy started, stopped, or escalated, or how those decisions related to outcomes and encounters. Treatment progression has to be rebuilt from notes and orders."
      >
        <div className="mt-8 w-full md:mt-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/vehr/meds-epic.png"
            alt="Epic EHR medication list where change history is not visible at a glance"
            className="block h-auto w-full rounded-none border border-black/10 bg-white/40 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.12),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
          />
        </div>
      </ManifestationBlock>
    </>
  );
}
