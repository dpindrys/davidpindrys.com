"use client";

import Image from "next/image";

import { bodyClass, companyNameClass } from "../lib/pageStyles";
import { PRIMARY_FILLED_INTERACTIVE } from "./buttonTokens";
import { DemoPlayOverlay, type DemoCaption } from "./DemoDialog";

type Prototype = {
  id: string;
  client: string;
  focus: string;
  summary: string;
  image: string;
  imageAlt: string;
  video: string;
  href: string;
  demoTitle?: string;
  demoDescription?: string;
  demoCaptions?: readonly DemoCaption[];
};

/** Timed captions for the VEHR guided demo. */
const vehrDemoCaptions: readonly DemoCaption[] = [
  {
    start: 0,
    end: 5,
    text: "Meet Jordan Reyes, a synthetic patient with type 2 diabetes and hypertension.",
  },
  {
    start: 5,
    end: 10,
    text: "Earlier urgent care and ER visits coincide with high fatigue, pain, and distress.",
  },
  {
    start: 10,
    end: 14,
    text: "Hovering reveals individual symptom reports and how they change over time.",
  },
  {
    start: 14,
    end: 18,
    text: "Visits, vitals, labs, and medications line up on the same timeline.",
  },
  {
    start: 18,
    end: 25,
    text: "Across follow-ups, his A1c falls from 10.8% to 6.7%, while blood pressure also improves.",
  },
  {
    start: 25,
    text: "The overview highlights his progress and what still needs monitoring.",
  },
];

/** Timed captions for the Vinyl Health guided demo. */
const vinylDemoCaptions: readonly DemoCaption[] = [
  {
    start: 0,
    end: 7,
    text: "The overview highlights new nausea and changes in sleep, activity, and work stress.",
  },
  {
    start: 7,
    end: 11,
    text: "Her A1c has improved from 7.2% to 6.8%.",
  },
  {
    start: 11,
    end: 17,
    text: "The timeline brings together patient reports, device readings, labs, and clinical visits.",
  },
  {
    start: 17,
    end: 24,
    text: "Opening a source reveals why gabapentin was stopped: drowsiness was affecting her work.",
  },
  {
    start: 24,
    end: 28,
    text: "The clinician returns to the summary with the supporting record checked.",
  },
  {
    start: 28,
    text: "Sarah’s preferences stay visible alongside the clinical insights.",
  },
];

const prototypes: readonly Prototype[] = [
  {
    id: "vehr",
    client: "VEHR Technologies",
    focus: "Clinical timeline",
    summary:
      "A clinical timeline that brings symptoms, encounters, and measurements into one view, helping clinicians follow a patient’s history and see how changes connect.",
    image: "/images/vehr/vehr-hero.png",
    imageAlt:
      "VEHR clinical timeline for Jordan Reyes, with conditions, demographics, and a measurement heatmap.",
    video: "/videos/vehr/prototype.mp4",
    href: "https://visual-ehr.vercel.app",
    demoTitle: "Following Jordan’s health over time",
    demoDescription:
      "Jordan is a synthetic patient with type 2 diabetes and hypertension. After urgent care and an ER visit, his follow-up records show improving symptoms, blood pressure, and blood sugar.",
    demoCaptions: vehrDemoCaptions,
  },
  {
    id: "vinyl",
    client: "Vinyl Health",
    focus: "AI-assisted patient overview",
    summary:
      "An AI-assisted overview that helps clinicians review changes in a patient’s condition and trace generated summaries back to the underlying clinical records.",
    image: "/images/vinyl/overview.png",
    imageAlt:
      "Vinyl Health overview for Sarah Chen, with prioritized insights linked to source records and a clinical timeline.",
    video: "/videos/vinyl.mp4",
    href: "https://vinylhealth.vercel.app/",
    demoTitle: "Understanding changes in Sarah’s health",
    demoDescription:
      "Sarah Chen is a synthetic patient and high school teacher managing diabetes, back pain, and anxiety. Her blood sugar is improving, but new nausea, reduced sleep, and rising work stress are affecting her daily life.",
    demoCaptions: vinylDemoCaptions,
  },
];

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.9em] w-[0.9em] shrink-0" aria-hidden="true" fill="none">
      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PrototypeCards() {
  return (
    <ul className="mt-6 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2">
      {prototypes.map((item) => (
        <li key={item.id} className="min-w-0">
          <article
            id={item.id}
            className="flex h-full scroll-mt-32 flex-col rounded-[16px] border border-black/15 p-5 md:scroll-mt-8 md:p-6"
          >
            <div className="min-w-0">
              <h3 className={companyNameClass}>{item.client}</h3>
              <p className="mt-1 font-sans text-[15px] leading-[1.4] text-black/70 md:text-[16px]">
                {item.focus}
              </p>
            </div>
            <div className="group relative mt-5 aspect-[16/10] overflow-hidden rounded-[10px] border border-black/10 bg-[#F7F7F5]">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(min-width: 768px) 560px, 90vw"
                className="pointer-events-none object-cover object-top"
              />
              <DemoPlayOverlay
                client={item.client}
                video={item.video}
                title={item.demoTitle}
                description={item.demoDescription}
                captions={item.demoCaptions}
              />
            </div>
            <div className="mt-5 flex w-full flex-1 flex-col gap-5">
              <p className={bodyClass}>{item.summary}</p>
              <div>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-[8px] px-4 py-2.5 font-sans text-[14px] font-medium leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] ${PRIMARY_FILLED_INTERACTIVE}`}
                >
                  View prototype
                  <ExternalIcon />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
