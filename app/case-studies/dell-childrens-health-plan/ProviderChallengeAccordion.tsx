"use client";

import { useId, useState } from "react";

type Point = { title: string; body: string };

export default function ProviderChallengeAccordion({ points }: { points: readonly Point[] }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <ul className="mt-8">
      {points.map((point, index) => {
        const expanded = open === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <li key={point.title} className="border-t border-[#d9ddd7]">
            <h4>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? -1 : index)}
                className={`flex w-full cursor-pointer items-center justify-between gap-4 bg-transparent text-left text-[16px] text-[#222d27] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#cd8c2e] ${
                  expanded ? "pt-5" : "py-5"
                }`}
              >
                <span className="font-bold">{point.title}</span>
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 text-[#626864] transition-transform duration-300 ${
                    expanded ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M3.5 6.25 8 10.75l4.5-4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h4>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!expanded}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="mt-2 pb-5 font-sans text-[16px] leading-[1.6] text-black md:text-[20px]">{point.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
