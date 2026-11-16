"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import { PRIMARY_FILLED_INTERACTIVE } from "./buttonTokens";
import DemoDialog, { PlayIcon } from "./DemoDialog";

type Prototype = {
  id: string;
  client: string;
  focus: string;
  scenario: string;
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
    scenario: "Follow a synthetic patient’s history to see how symptoms, encounters, and measurements connect.",
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
    scenario: "Review a synthetic patient’s changing condition, then trace a summary back to its sources.",
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
            <article id={item.id} className="flex h-full scroll-mt-32 flex-col rounded-[16px] border border-black/15 p-5 md:scroll-mt-8 md:p-6">
              <h3 className="font-sans text-[1.35rem] font-semibold leading-[1.2] tracking-[-0.02em] text-black">
                {item.client}
              </h3>
              <p className="mt-1 font-sans text-[15px] leading-[1.4] text-black/55">{item.focus}</p>
              <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[10px] border border-black/10 bg-[#F7F7F5]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 768px) 560px, 90vw"
                  className="object-cover object-top"
                />
              </div>
              <p className="mt-5 font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-black/45">
                The demo scenario
              </p>
              <p className="mt-2 font-sans text-[15px] leading-[1.45] text-black md:text-[16px]">{item.scenario}</p>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-5">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-[8px] px-4 py-2.5 font-sans text-[14px] font-medium leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] ${PRIMARY_FILLED_INTERACTIVE}`}
                >
                  Explore prototype
                  <ExternalIcon />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <button
                  type="button"
                  onClick={(event) => {
                    openerRef.current = event.currentTarget;
                    setOpenId(item.id);
                  }}
                  className="inline-flex items-center gap-1.5 font-sans text-[15px] leading-none text-black underline decoration-black/40 underline-offset-[3px] hover:decoration-black"
                >
                  View demo
                  <PlayIcon />
                </button>
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
