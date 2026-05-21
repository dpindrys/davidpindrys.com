"use client";

import { useState } from "react";

import { BookCallModal } from "./BookCall";
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
      xmlns="http://www.w3.org/2000/svg"
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

function CopyIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <rect
        x="9"
        y="9"
        width="10"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0 text-green-600"
    >
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [bookCallOpen, setBookCallOpen] = useState(false);

  const copyEmail = async () => {
    const email = "dpindrys@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="flex w-full flex-col gap-10">
      <h1 className="max-w-[1291px] font-sans text-[clamp(32px,4.8vw,64px)] font-semibold leading-[1.305] text-black">
        I design digital healthcare products that make complex clinical workflows
        clearer, safer, and easier to use.
      </h1>

      <div className="flex flex-wrap items-center justify-start gap-4">
        <button
          type="button"
          onClick={() => setBookCallOpen(true)}
          className={`${ctaBaseClass} ${PRIMARY_FILLED_INTERACTIVE} text-white`}
          aria-haspopup="dialog"
          aria-expanded={bookCallOpen}
        >
          <span>Book a call</span>
          <CalendarIcon />
        </button>

        <button
          type="button"
          onClick={copyEmail}
          className={`group ${ctaBaseClass} text-black ${SECONDARY_OUTLINE_INTERACTIVE}`}
          aria-label={copied ? "Email copied to clipboard" : "Copy email to clipboard"}
        >
          {copied ? (
            <span>dpindrys@gmail.com</span>
          ) : (
            <>
              <span className="group-hover:hidden">Copy my email</span>
              <span className="hidden group-hover:inline">dpindrys@gmail.com</span>
            </>
          )}
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>

      <BookCallModal open={bookCallOpen} onClose={() => setBookCallOpen(false)} />
    </section>
  );
}
