"use client";

import Image from "next/image";

import { type Prototype } from "../lib/prototypes";
import { bodyClass, companyNameClass } from "../lib/pageStyles";
import { PRIMARY_FILLED_INTERACTIVE } from "./buttonTokens";
import { DemoPlayOverlay } from "./DemoDialog";

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.9em] w-[0.9em] shrink-0" aria-hidden="true" fill="none">
      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PrototypeCard({ item }: { item: Prototype }) {
  return (
    <article
      id={item.id}
      className="flex h-full min-w-0 scroll-mt-32 flex-col rounded-[16px] border border-black/15 p-5 md:scroll-mt-8 md:p-6"
    >
      <div className="min-w-0">
        <h3 className={companyNameClass}>{item.client}</h3>
        <p className="mt-1 font-sans text-[15px] leading-[1.4] text-black/70 md:text-[16px]">
          {item.focus}
        </p>
      </div>
      <div
        className={`group relative mt-5 aspect-[16/10] w-full select-none overflow-hidden rounded-[12px] border border-black/15${
          item.bgImage ? "" : " bg-[#F7F7F5]"
        }`}
      >
        {item.bgImage ? (
          <>
            <Image
              src={item.bgImage}
              alt=""
              fill
              sizes="(min-width: 768px) 560px, 90vw"
              className="pointer-events-none object-cover"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="w-[78%] rounded-[12px] shadow-[0_24px_60px_-20px_rgba(15,40,80,0.35)] transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={1200}
                  height={750}
                  sizes="(min-width: 768px) 436px, 70vw"
                  className="block h-auto w-full rounded-[12px]"
                  style={{ clipPath: "inset(0 0 0 1px round 12px)" }}
                  draggable={false}
                />
              </div>
            </div>
          </>
        ) : (
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(min-width: 768px) 560px, 90vw"
            className="pointer-events-none object-cover object-top"
          />
        )}
        <DemoPlayOverlay
          client={item.client}
          video={item.video}
          title={item.demoTitle}
          walkthroughHeading={item.demoWalkthroughHeading}
          description={item.demoDescription}
          captions={item.demoCaptions}
          layout="walkthrough"
        />
      </div>
      <div className="mt-5 flex w-full flex-1 flex-col gap-5">
        <p className={bodyClass}>{item.summary}</p>
        <div className="mt-auto">
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
  );
}