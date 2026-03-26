 "use client";

import { SECONDARY_OUTLINE_INTERACTIVE } from "./buttonTokens";
import { useState } from "react";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    const email = "dpindrys@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for older browsers / permission issues
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
        I design digital healthcare products that make complex clinical workflows clearer, safer, and easier to use.
      </h1>

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-4 justify-start">
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex h-12 items-center gap-2 rounded-2xl border-2 border-[#0078B3] bg-[#00AAFF] px-4 font-sans font-semibold text-[16px] leading-none text-white hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]"
          aria-label={copied ? "Email copied to clipboard" : "Copy email to clipboard"}
        >
          <span>{copied ? "dpindrys@gmail.com" : "Copy email"}</span>
          {copied ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                d="M20 6L9 17l-5-5"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="shrink-0"
            >
              <rect
                x="9"
                y="9"
                width="10"
                height="10"
                rx="2"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        <a
          href="https://www.linkedin.com/in/dpindrys"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex h-12 items-center gap-2 rounded-2xl px-4 font-sans font-semibold text-[16px] leading-none text-black ${SECONDARY_OUTLINE_INTERACTIVE}`}
        >
          <span>Connect on LinkedIn</span>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0174AF] font-bold text-[15px] leading-none text-white select-none shrink-0"
            style={{ fontFamily: "Arial, sans-serif" }}
            aria-hidden="true"
          >
            in
          </span>
        </a>
      </div>
    </section>
  );
}
