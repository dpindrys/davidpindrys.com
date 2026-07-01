"use client";

import { useState } from "react";

import { BookCallModal } from "./BookCall";
import { frxStrategyHeadlineClass } from "../case-studies/frx/FrxExtendedSections";
import {
  frxMetaEyebrowClass,
  frxSectionBodyClass,
} from "../case-studies/frx/frxCaseStudyTypography";
import {
  PRIMARY_FILLED_INTERACTIVE,
  SECONDARY_OUTLINE_INTERACTIVE,
} from "./buttonTokens";

const ctaBaseClass =
  "inline-flex h-12 items-center gap-2 rounded-2xl px-4 font-sans text-[16px] font-semibold leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]";

function CalendarIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 2v4M8 2v4M3 10h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M3 7l9 6 9-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactHero() {
  const [bookCallOpen, setBookCallOpen] = useState(false);

  return (
    <div className="flex min-w-0 flex-col gap-5 md:gap-6">
      <p className={frxMetaEyebrowClass}>Get in touch</p>
      <h1 className={`${frxStrategyHeadlineClass} min-w-0`}>
        Let&apos;s build better healthcare products together.
      </h1>
      <p className={`${frxSectionBodyClass} max-w-[42rem]`}>
        Whether you&apos;re hiring for a healthcare product team, exploring a
        consulting engagement, looking for a design partnership, or just want to
        say hello — I&apos;d love to hear from you.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setBookCallOpen(true)}
          className={`${ctaBaseClass} ${PRIMARY_FILLED_INTERACTIVE} text-white`}
          aria-haspopup="dialog"
          aria-expanded={bookCallOpen}
        >
          <CalendarIcon />
          <span>Book a call</span>
        </button>

        <a
          href="mailto:dpindrys@gmail.com"
          className={`${ctaBaseClass} text-black ${SECONDARY_OUTLINE_INTERACTIVE}`}
        >
          <EnvelopeIcon />
          <span>Email me</span>
        </a>
      </div>

      <BookCallModal open={bookCallOpen} onClose={() => setBookCallOpen(false)} />
    </div>
  );
}
