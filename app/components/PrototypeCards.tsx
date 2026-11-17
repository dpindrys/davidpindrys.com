"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import { bodyClass, companyNameClass } from "../lib/pageStyles";
import { PRIMARY_FILLED_INTERACTIVE } from "./buttonTokens";
import DemoDialog, { PlayIcon } from "./DemoDialog";

type Prototype = {
  id: string;
  client: string;
  focus: string;
  summary: string;
  image: string;
  imageAlt: string;
  video: string;
  href: string;
};

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
  const [openId, setOpenId] = useState<string | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const open = prototypes.find((item) => item.id === openId) ?? null;
  const close = useCallback(() => setOpenId(null), []);

  return (
    <>
      <ul className="mt-6 grid list-none grid-cols-1 gap-4 p-0 md:mt-7 md:grid-cols-2 md:gap-5">
        {prototypes.map((item) => (
          <li key={item.id} className="min-w-0">
            <article
              id={item.id}
              className="flex h-full scroll-mt-32 flex-col rounded-[16px] border border-black/15 p-5 md:scroll-mt-8 md:p-6"
            >
              <div className="grid grid-cols-2 items-start gap-3">
                <div className="min-w-0">
                  <h3 className={companyNameClass}>{item.client}</h3>
                  <p className="mt-1 font-sans text-[15px] leading-[1.4] text-black/55 md:text-[16px]">
                    {item.focus}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`View demo for ${item.client}`}
                  onClick={(event) => {
                    openerRef.current = event.currentTarget;
                    setOpenId(item.id);
                  }}
                  className="inline-flex items-center gap-1.5 justify-self-end self-start font-sans text-[15px] leading-none text-black underline decoration-black/40 underline-offset-[3px] hover:decoration-black"
                >
                  View demo
                  <PlayIcon />
                </button>
              </div>
              <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[10px] border border-black/10 bg-[#F7F7F5]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 768px) 560px, 90vw"
                  className="object-cover object-top"
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
      <DemoDialog
        demo={open ? { client: open.client, video: open.video } : null}
        onClose={close}
        openerRef={openerRef}
      />
    </>
  );
}
