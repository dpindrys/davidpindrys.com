import Footer from "../../components/Footer";
import CaseStudyNextProjectButton from "../../components/CaseStudyNextProjectButton";
import VehrDeviceHeroMockup from "./VehrDeviceHeroMockup";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rebuilding chart review around the patient story",
  description:
    "A timeline-based EHR that reorganizes fragmented records into a coherent longitudinal clinical narrative.",
  openGraph: {
    title: "Rebuilding chart review around the patient story | David Pindrys",
    description:
      "A timeline-based EHR that reorganizes fragmented records into a coherent longitudinal clinical narrative.",
  },
};

const vehrHeroTitleClass = "block font-sans text-hero text-black";
const vehrStatementClass =
  "block font-sans text-statement text-black max-w-statement";
const vehrEyebrowClass = "block font-sans text-eyebrow uppercase text-muted";
const vehrCaptionClass =
  "block font-sans text-caption text-muted max-w-caption";
const vehrQuoteClass = "block font-sans text-quote text-black max-w-quote";
const vehrMetaLabelClass = "block font-sans text-eyebrow uppercase text-muted";
const vehrMetaValueClass = "block font-sans text-base text-black";
const vehrBodyClass = "block font-sans text-cell text-black max-w-body";

const vehrHeroSubheadClass =
  "block font-sans text-subhead text-muted max-w-subhead";
const vehrClosingQuoteClass =
  "block font-sans text-closing text-black max-w-body";

const vehrHeroFocusPills = [
  "EHR Design",
  "Data Visualization",
  "Clinical Workflows",
] as const;

const vehrBelowHeroMeta = [
  { label: "Role", value: "Founding Product Design Lead" },
  { label: "Client", value: "VEHR Technologies" },
  { label: "Timeline", value: "4 months" },
  { label: "Status", value: "In development" },
] as const;

const problemCells = [
  {
    eyebrow: "OVERLOADED",
    body: "Multi-scale trend lines bury the change that matters in visual noise.",
    imageSrc: "/images/vehr/overload.png",
    imageAlt:
      "Overlapping multi-scale trend lines where clinically important changes are buried in visual noise",
    quote:
      "The trends are technically there, but interpreting them takes work.",
    attribution: "INTERNAL MEDICINE PHYSICIAN",
  },
  {
    eyebrow: "FRAGMENTED",
    body: "Labs, meds, vitals, and notes sit in separate tabs. Reviewing one story means constant context switching.",
    imageSrc: "/images/vehr/epic-encounters.png",
    imageAlt:
      "Epic EHR encounter list organized as disconnected modules across the chart",
    quote:
      "Everything lives in separate places, so clinical context gets fragmented.",
    attribution: "HOSPITAL CLINICIAN",
  },
  {
    eyebrow: "MISMATCHED",
    body: "Records mirror how data is stored, not how clinicians think.",
    imageSrc: "/images/vehr/map.png",
    imageAlt:
      "Clinical workflow map connecting problems, events, and outcomes across patient history",
    quote: null,
    attribution: null,
  },
] as const;

const prototypeHref = "https://visual-ehr.vercel.app/";

const imageClass = "block h-auto w-full max-w-image";

export default function VisualEhrCaseStudyPage() {
  return (
    <>
      <main
        id="main-content"
        className="min-h-screen overflow-x-visible bg-[#F4F2EE]"
      >
        <div className="vehr-page w-full overflow-x-visible pb-32 pt-4">
          <section className="w-full text-left">
            <h1 className={vehrHeroTitleClass}>
              Chart review rebuilt around the patient story
            </h1>
            <p className={`${vehrHeroSubheadClass} mt-label`}>
              A timeline-based EHR built with a practicing physician. I led
              workflow design, information architecture, and the UI system now
              in development at VEHR.
            </p>
            <ul
              className="mt-label flex w-full flex-row flex-nowrap gap-6 overflow-x-auto"
              aria-label="Focus areas"
            >
              {vehrHeroFocusPills.map((label) => (
                <li key={label} className="shrink-0">
                  <span className={vehrEyebrowClass}>{label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-statement w-full max-w-image">
              <VehrDeviceHeroMockup />
            </div>
            <dl className="mt-16 grid w-full grid-cols-2 gap-8 min-[900px]:grid-cols-4">
              {vehrBelowHeroMeta.map((item) => (
                <div key={item.label} className="w-full min-w-0">
                  <dt className={vehrMetaLabelClass}>{item.label}</dt>
                  <dd className={`${vehrMetaValueClass} mt-label`}>
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            className="mt-section w-full text-left"
            aria-labelledby="vehr-context-heading"
          >
            <p className={vehrEyebrowClass}>CONTEXT</p>
            <h2
              id="vehr-context-heading"
              className={`${vehrStatementClass} mt-label`}
            >
              VEHR is building a chart review platform organized the way
              clinicians actually read a patient history: over time.
            </h2>
          </section>

          <section
            className="mt-section w-full text-left"
            aria-labelledby="vehr-problem-heading"
          >
            <p className={vehrEyebrowClass}>PROBLEM</p>
            <h2
              id="vehr-problem-heading"
              className={`${vehrStatementClass} mt-label`}
            >
              Most EHRs organize by where data is stored, not by how clinicians
              reconstruct a patient&apos;s history.
            </h2>
            <div className="mt-statement grid w-full grid-cols-1 gap-16 min-[900px]:grid-cols-3 min-[900px]:gap-10">
              {problemCells.map((cell) => (
                <div key={cell.eyebrow} className="w-full min-w-0">
                  <p className={vehrEyebrowClass}>{cell.eyebrow}</p>
                  <p className={`${vehrBodyClass} mt-label`}>{cell.body}</p>
                  <div className="mt-statement aspect-[4/3] w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cell.imageSrc}
                      alt={cell.imageAlt}
                      className="block h-full w-full object-cover object-top"
                    />
                  </div>
                  {cell.quote && cell.attribution ? (
                    <>
                      <p className={`${vehrCaptionClass} mt-caption`}>
                        &ldquo;{cell.quote}&rdquo;
                      </p>
                      <p className={`${vehrEyebrowClass} mt-[0.5rem]`}>
                        {cell.attribution}
                      </p>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section
            className="mt-section w-full text-left"
            aria-label="Pull quote"
          >
            <blockquote className={vehrQuoteClass}>
              Rather than an HPI followed by a chart scavenger hunt, the
              clinician&apos;s mind desires a story enfolded with history.
            </blockquote>
            <p className={`${vehrEyebrowClass} mt-label`}>COLE MAROLF, MD</p>
          </section>

          <section
            className="mt-section w-full text-left"
            aria-labelledby="vehr-approach-heading"
          >
            <p className={vehrEyebrowClass}>APPROACH</p>
            <h2
              id="vehr-approach-heading"
              className={`${vehrStatementClass} mt-label`}
            >
              Before any wireframes, I built an object map from Cole
              Marolf&apos;s actual chart review, turning his workflow into
              entities, relationships, and temporal links.
            </h2>
            <div className="mt-statement w-full max-w-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/vehr/chart.png"
                alt="Annotated patient chart used to trace how clinical information is accessed across a visit"
                className={imageClass}
              />
            </div>
            <p className={`${vehrCaptionClass} mt-caption`}>
              Annotated chart used to trace how information is accessed during a
              visit.
            </p>
          </section>

          <section
            className="mt-section w-full text-left"
            aria-labelledby="vehr-timeline-heading"
          >
            <p className={vehrEyebrowClass}>THE TIMELINE</p>
            <h2
              id="vehr-timeline-heading"
              className={`${vehrStatementClass} mt-label`}
            >
              Encounters, vitals, labs, diagnoses, medications, and
              patient-reported data align on shared visit columns. One vertical
              read per visit.
            </h2>
            <div className="mt-statement w-full max-w-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/vehr/timeline2.png"
                alt="VEHR timeline exploration with clinical domains aligned on shared visit columns"
                className={imageClass}
              />
            </div>
            <p className={`${vehrCaptionClass} mt-caption`}>
              Early exploration aligning clinical domains on shared columns.
            </p>
          </section>

          <section
            className="mt-section w-full text-left"
            aria-labelledby="vehr-alignment-heading"
          >
            <p className={vehrEyebrowClass}>ALIGNMENT</p>
            <h2
              id="vehr-alignment-heading"
              className={`${vehrStatementClass} mt-label`}
            >
              Diagnoses and encounters share the same columns, so what was
              treated sits next to when it was seen.
            </h2>
            <div className="mt-statement w-full max-w-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/vehr/diagnoses-encounters.png"
                alt="Diagnoses and encounters aligned on shared timeline visit columns"
                className={imageClass}
              />
            </div>
          </section>

          <section
            className="mt-section w-full text-left"
            aria-labelledby="vehr-signal-heading"
          >
            <p className={vehrEyebrowClass}>SIGNAL</p>
            <h2
              id="vehr-signal-heading"
              className={`${vehrStatementClass} mt-label`}
            >
              I replaced overlapping trend lines with an aligned heatmap.
              Severity and direction read at a glance, across visits.
            </h2>
            <div className="mt-statement w-full max-w-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/vehr/vitalsandlabs.png"
                alt="Longitudinal vitals and labs as an aligned heatmap across visits"
                className={imageClass}
              />
            </div>
          </section>

          <section
            className="mt-section w-full text-left"
            aria-labelledby="vehr-patient-reported-heading"
          >
            <p className={vehrEyebrowClass}>PATIENT-REPORTED</p>
            <h2
              id="vehr-patient-reported-heading"
              className={`${vehrStatementClass} mt-label`}
            >
              Fatigue, thirst, and insomnia land on the same columns as labs and
              encounters, so symptom change reads against the events around it.
            </h2>
            <div className="mt-statement w-full max-w-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/vehr/patientreported.png"
                alt="Patient-reported outcomes aligned on the shared timeline heatmap"
                className={imageClass}
              />
            </div>
          </section>

          <section
            className="mt-section w-full text-left"
            aria-labelledby="vehr-prototype-heading"
          >
            <p className={vehrEyebrowClass}>PROTOTYPE</p>
            <h2
              id="vehr-prototype-heading"
              className={`${vehrStatementClass} mt-label`}
            >
              One interactive timeline. Start with the patient story, drill into
              source data only when it is needed.
            </h2>
            <div className="mt-statement w-full max-w-image">
              <a
                href={prototypeHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View interactive prototype (opens in new tab)"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/vehr/vehr-hero.png"
                  alt="VEHR patient timeline and clinical sensemaking interface"
                  className={imageClass}
                />
              </a>
              <a
                href={prototypeHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${vehrEyebrowClass} mt-6 underline decoration-1 underline-offset-[0.3em]`}
              >
                View interactive prototype
              </a>
            </div>
          </section>

          <figure
            className="mt-section w-full text-left"
            aria-label="Clinical feedback from Dr. Cole Marolf"
          >
            <blockquote className={vehrClosingQuoteClass}>
              David demonstrated strong insight into reframing healthcare data
              interaction… especially the heat map, which improved data density
              while maintaining clarity.
            </blockquote>
            <figcaption className="mt-label flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/cole.png"
                alt="Dr. Cole Marolf"
                width={48}
                height={48}
                className="h-[48px] w-[48px] shrink-0 rounded-full object-cover"
              />
              <span className={vehrEyebrowClass}>Dr. Cole Marolf</span>
            </figcaption>
          </figure>

          <CaseStudyNextProjectButton currentPath="/case-studies/visual-ehr" />
        </div>
      </main>
      <Footer />
    </>
  );
}
