"use client";

import { useId, useState } from "react";

import ZoomableProblemImage from "../../components/ZoomableProblemImage";

type Finding = { title: string; body: string; kind?: string };

export default function ResearchFindings({
  findings,
  image,
  headingLevel: Heading = "h3",
}: {
  findings: readonly Finding[];
  image?: { src: string; alt: string; caption?: string };
  headingLevel?: "h3" | "h4";
}) {
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
              <Heading>
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
                  <span className="flex flex-col gap-1">
                    {finding.kind ? (
                      <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#626864]">
                        {finding.kind}
                      </span>
                    ) : null}
                    <span className="font-bold">{finding.title}</span>
                  </span>
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
              </Heading>
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
      {image ? (
        <figure className="m-0 w-full shrink-0 lg:w-[432px]">
          <ZoomableProblemImage
            src={image.src}
            alt={image.alt}
            width={700}
            height={800}
            shellClassName="w-full"
            imgClassName="block h-auto w-full rounded-[12px] border border-black/10"
            dialogLabel={image.alt}
          />
          {image.caption ? (
            <figcaption className="mt-3 font-sans text-[13px] leading-[1.5] text-black/70">{image.caption}</figcaption>
          ) : null}
        </figure>
      ) : (
        <div className="w-full shrink-0 lg:w-[432px]">
          <div
            className="aspect-[700/800] w-full rounded-[12px] border border-black/10 bg-[#E8E5DE]"
            role="img"
            aria-label="Image placeholder"
          />
        </div>
      )}
    </div>
  );
}
