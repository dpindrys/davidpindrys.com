"use client";

import Link from "next/link";

import { instantScrollToTop } from "../lib/instantScrollToTop";
import { PRIMARY_FILLED_INTERACTIVE } from "./buttonTokens";

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.9em] w-[0.9em] shrink-0" aria-hidden="true" fill="none">
      <path d="M5 12h14M13 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const primaryCtaClass = `inline-flex items-center gap-2 rounded-[8px] px-4 py-2.5 font-sans text-[14px] font-medium leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] ${PRIMARY_FILLED_INTERACTIVE}`;

const disabledPrimaryButtonClass = `inline-flex cursor-not-allowed items-center gap-2 rounded-[8px] px-4 py-2.5 font-sans text-[14px] font-medium leading-none opacity-45 ${PRIMARY_FILLED_INTERACTIVE} hover:bg-[#1F2621]`;

export default function CaseStudyCardCtas({ href, wide = false }: { href?: string; wide?: boolean }) {
  return (
    <div
      className={
        wide
          ? "flex flex-col items-start gap-3 md:items-end md:justify-self-end"
          : "mt-auto flex flex-col items-start gap-3"
      }
    >
      {href ? (
        <Link href={href} className={primaryCtaClass} onClick={instantScrollToTop}>
          View case study
          <ArrowRightIcon />
        </Link>
      ) : (
        <>
          <button type="button" disabled className={disabledPrimaryButtonClass}>
            View case study
            <ArrowRightIcon />
          </button>
          <span className="border border-black/15 px-2.5 py-1 font-sans text-[13px] leading-none text-black/70">
            Case study coming soon
          </span>
        </>
      )}
    </div>
  );
}
