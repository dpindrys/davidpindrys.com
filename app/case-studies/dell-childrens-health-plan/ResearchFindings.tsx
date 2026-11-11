"use client";

import { useId, useState } from "react";

type Finding = { title: string; body: string };

export default function ResearchFindings({ findings }: { findings: readonly Finding[] }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <div className="mt-10 flex flex-col gap-8 md:mt-12 lg:flex-row lg:items-start lg:gap-12">
      <ul className="min-w-0 w-full flex-1">
        {findings.map((finding, index) => {
          const expanded = open === index;
          const buttonId = `${baseId}-button-${index}`;
          const panelId = `${baseId}-panel-${index}`;
          return (
            <li key={finding.title} className="border-t border-[#d9ddd7]">
              <h3>
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
                  <span className="font-bold">{finding.title}</span>
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
              </h3>
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
                  <p className="mt-2 pb-5 font-sans text-[16px] leading-[1.6] text-black md:text-[20px]">{finding.body}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="w-full shrink-0 lg:w-[432px]">
        <div
          className="aspect-[700/800] w-full rounded-[12px] border border-black/10 bg-[#E8E5DE]"
          role="img"
          aria-label="Image placeholder"
        />
      </div>
    </div>
  );
}
