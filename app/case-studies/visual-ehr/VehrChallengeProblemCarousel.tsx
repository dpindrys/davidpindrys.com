"use client";

import { useState } from "react";

import type { VehrChallengeCluster } from "./vehrChallengeData";
import { frxSectionBodyClass } from "../frx/frxCaseStudyTypography";

const vehrClusterTitleClass =
  "font-sans text-[clamp(20px,2.4vw,28px)] font-semibold leading-[1.2] tracking-[-0.02em] text-black";

const vehrClusterBodyClass =
  "font-sans text-[16px] font-normal leading-[1.55] text-black/80 md:text-[17px]";

const vehrQuoteClass =
  "font-sans text-[16px] font-normal leading-[1.5] text-gray-800 md:text-[17px]";

const vehrQuoteAttributionClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";

const vehrPanelTitleClass =
  "block text-center font-sans text-[11px] font-medium leading-[1.3] md:text-[12px]";

const vehrProblemImageClass =
  "h-full w-full object-cover object-top";

const vehrSplitGridClass =
  "grid w-full grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-stretch md:gap-12 lg:gap-14";

const stackGridClass = "grid w-full [&>*]:col-start-1 [&>*]:row-start-1";

function stackLayerClass(isActive: boolean) {
  return `col-start-1 row-start-1 w-full transition-opacity duration-300 ${
    isActive
      ? "z-10 opacity-100"
      : "pointer-events-none z-0 opacity-0"
  }`;
}

function VehrQuoteMarkIcon() {
  return (
    <svg
      width="32"
      height="26"
      viewBox="0 0 40 32"
      fill="none"
      aria-hidden
      className="shrink-0 text-gray-800 opacity-70"
    >
      <path
        d="M8 32V18.4C8 11.2 11.2 5.6 18.4 2.4L20.8 6.4C16 8.8 13.6 12 13.6 16H20V32H8ZM28 32V18.4C28 11.2 31.2 5.6 38.4 2.4L40.8 6.4C36 8.8 33.6 12 33.6 16H40V32H28Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function VehrChallengeProblemCarousel({
  clusters,
}: {
  clusters: readonly VehrChallengeCluster[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mt-12 flex w-full flex-col md:mt-16 lg:mt-20">
      <div className={vehrSplitGridClass}>
        <div className="flex min-h-0 w-full min-w-0 flex-col gap-6 self-stretch text-left md:gap-7">
          <div className={stackGridClass} aria-live="polite">
            {clusters.map((cluster, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={`${cluster.id}-intro`}
                  className={`${stackLayerClass(isActive)} flex flex-col gap-4`}
                  aria-hidden={!isActive}
                >
                  <h3
                    id={
                      isActive
                        ? `vehr-cluster-${cluster.id}-heading`
                        : undefined
                    }
                    className={vehrClusterTitleClass}
                  >
                    {cluster.title}
                  </h3>
                  <p className={frxSectionBodyClass}>{cluster.description}</p>
                </div>
              );
            })}
          </div>

          <div className={stackGridClass} aria-live="polite">
            {clusters.map((cluster, index) => {
              const isActive = index === activeIndex;

              return (
                <figure
                  key={`${cluster.id}-quote`}
                  className={`${stackLayerClass(isActive)} flex min-w-0 flex-col gap-4`}
                  aria-hidden={!isActive}
                >
                  <VehrQuoteMarkIcon />
                  <blockquote className={vehrQuoteClass}>
                    &ldquo;{cluster.quote}&rdquo;
                  </blockquote>
                  <figcaption className={vehrQuoteAttributionClass}>
                    {cluster.attribution}
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div
            className="shrink-0 flex flex-row gap-1 rounded-xl border border-black/10 bg-white/25 p-1"
            role="tablist"
            aria-label="Challenge manifestations"
          >
            {clusters.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="vehr-challenge-problem-carousel"
                  id={`vehr-challenge-panel-tab-${index}`}
                  onClick={() => setActiveIndex(index)}
                  className={`flex min-w-0 flex-1 items-center justify-center rounded-[10px] px-2 py-2.5 text-center transition-colors duration-200 md:px-2.5 md:py-3 ${
                    isActive
                      ? "cursor-default bg-black text-[#F4F2EE]"
                      : "cursor-pointer text-gray-800 hover:bg-black/[0.05]"
                  }`}
                >
                  <span className={vehrPanelTitleClass}>{item.panelLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="vehr-challenge-problem-carousel"
          role="tabpanel"
          aria-labelledby={`vehr-challenge-panel-tab-${activeIndex}`}
          className="relative min-h-[min(52vw,300px)] min-w-0 w-full self-stretch overflow-hidden rounded-2xl border border-black/10 bg-white/40 md:min-h-0 md:h-full"
        >
          {clusters.map((cluster, index) => (
            <div
              key={cluster.imageSrc}
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === activeIndex
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
              aria-hidden={index !== activeIndex}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cluster.imageSrc}
                alt={cluster.imageAlt}
                className={vehrProblemImageClass}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
