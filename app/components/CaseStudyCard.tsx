"use client";

import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";

export type CaseStudyCardData = {
  id: string;
  href: string;
  name: string;
  tag: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageFramed?: boolean;
  highlights: readonly { value: string; label: string }[];
  details: readonly { label: string; value: string }[];
};

const labelClass = "font-sans text-[11px] uppercase leading-[1.3] tracking-[0.14em] text-black/55";

export default function CaseStudyCard({ card }: { card: CaseStudyCardData }) {
  const pillRef = useRef<HTMLSpanElement>(null);
  const [pillVisible, setPillVisible] = useState(false);

  const movePill = (event: PointerEvent<HTMLAnchorElement>) => {
    const pill = pillRef.current;
    if (!pill) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const halfWidth = pill.offsetWidth / 2;
    const halfHeight = pill.offsetHeight / 2;
    const x = Math.min(Math.max(event.clientX - rect.left, halfWidth), rect.width - halfWidth);
    const y = Math.min(Math.max(event.clientY - rect.top, halfHeight), rect.height - halfHeight);
    pill.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  };

  return (
    <Link
      href={card.href}
      className="group relative block overflow-hidden border border-black/10 bg-[#E8E5DE] p-4 outline-none transition-colors duration-300 hover:border-black/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black pointer-fine:cursor-none md:p-5"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        movePill(event);
        setPillVisible(true);
      }}
      onPointerMove={(event) => {
        if (event.pointerType === "mouse") movePill(event);
      }}
      onPointerLeave={() => setPillVisible(false)}
    >
      <div
        className={`aspect-[3/2] overflow-hidden border border-black/10 ${
          card.imageFramed === false ? "" : "bg-white p-3 md:p-4"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.imageSrc}
          alt={card.imageAlt}
          className="block h-full w-full object-cover object-left-top"
        />
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <h3 className="font-sans text-[20px] font-medium leading-[1.2] tracking-[-0.02em] text-black md:text-[22px]">
          {card.name}
        </h3>
        <span className="shrink-0 border border-black/15 px-2 py-1 font-sans text-[11px] uppercase leading-none tracking-[0.14em] text-black/55">
          {card.tag}
        </span>
      </div>
      <p className="mt-3 font-sans text-[15px] leading-[1.55] text-black/70">{card.description}</p>

      <dl className="mt-5 grid grid-cols-3 divide-x divide-black/10">
        {card.highlights.map((item) => (
          <div key={item.label} className="flex flex-col-reverse justify-end gap-1.5 px-3 first:pl-0 last:pr-0">
            <dt className={labelClass}>{item.label}</dt>
            <dd className="font-sans text-[22px] leading-none tracking-[-0.03em] text-black md:text-[26px]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
        <div className="min-h-0 overflow-hidden">
          <dl className="mt-5 grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-4 gap-y-3 border-t border-black/10 pt-5">
            {card.details.map((item) => (
              <div key={item.label} className="contents">
                <dt className={`${labelClass} pt-[0.2em]`}>{item.label}</dt>
                <dd className="font-sans text-[15px] leading-[1.45] text-black">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <span
        ref={pillRef}
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap bg-[#1F2621] px-4 py-2.5 font-sans text-[14px] font-medium leading-none text-[#F4F2EE] transition-opacity duration-150 hidden pointer-fine:block ${
          pillVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        View case study
      </span>
    </Link>
  );
}
