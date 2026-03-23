"use client";

import { useState, useId } from "react";

const sectionMarkerClass =
  "font-sans font-normal text-[12px] uppercase tracking-[0.12em] text-gray-800";

interface Tab {
  id: string;
  title: string;
}

const tabs: Tab[] = [
  { id: "before", title: "Before" },
  { id: "after", title: "After" },
  { id: "mobile", title: "Mobile" },
];

export default function DellChildrensHighlights() {
  const baseId = useId();
  const [active, setActive] = useState(0);

  const panels = [
    <BeforeAfterPanel
      key="before"
      imageSrc="/images/dellchildrens/before.png"
      imageAlt="Dell Children's portal before redesign"
      title="Existing Home Page"
      paragraphs={[
        "Before redesign, the Dell Children\u2019s portal greeted members with a generic experience that felt impersonal and thin on utility. Sections like Plan Overview and Quick Links were filled with repetitive or unclear content, creating noise instead of helping members act.",
        "The homepage also exposed a larger product gap: limited functionality, minimal personalization, and too little guidance. Members were not being meaningfully oriented to their plan, their care options, or the next steps available to them.",
      ]}
    />,
    <BeforeAfterPanel
      key="after"
      imageSrc="/images/dellchildrens/after.png"
      imageAlt="Dell Children's portal after redesign"
      title="Redesigned Home Page"
      paragraphs={[
        "After redesign, the homepage felt more personal, more useful, and more action-oriented. It greeted members by name, surfaced covered family members clearly, and brought key tasks like viewing ID cards, accessing the handbook, finding care, and getting support into immediate reach.",
        "Just as important, the experience replaced generic, low-value content with clearer structure and stronger hierarchy. The result was a member dashboard that better oriented families to their plan and helped them take action with less friction.",
      ]}
    />,
    <MobilePanel key="mobile" />,
  ];

  return (
    <section className="flex w-full flex-col gap-5 sm:gap-6">
      <span className={sectionMarkerClass}>Highlights</span>

      <div
        role="tablist"
        aria-label="Frames"
        className="flex flex-wrap gap-x-6 gap-y-1 sm:gap-x-8"
      >
        {tabs.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`min-h-[44px] border-b pb-1 pt-0.5 text-left font-sans text-[15px] leading-snug transition-colors sm:text-[16px] ${
                selected
                  ? "cursor-default -mb-px border-[#00AAFF] border-b-2 font-semibold text-black"
                  : "cursor-pointer border-black/15 font-normal text-black/55 hover:border-black/25 hover:text-black/80"
              }`}
            >
              {t.title}
            </button>
          );
        })}
      </div>

      <div className="grid w-full">
        {panels.map((panel, i) => (
          <div
            key={tabs[i].id}
            role="tabpanel"
            id={`${baseId}-panel-${i}`}
            aria-labelledby={`${baseId}-tab-${i}`}
            className="col-start-1 row-start-1 transition-opacity duration-200 ease-out motion-reduce:transition-none"
            style={{
              visibility: i === active ? "visible" : "hidden",
              opacity: i === active ? 1 : 0,
            }}
            aria-hidden={i !== active}
          >
            {panel}
          </div>
        ))}
      </div>
    </section>
  );
}

function BeforeAfterPanel({
  imageSrc,
  imageAlt,
  title,
  paragraphs,
}: {
  imageSrc: string;
  imageAlt: string;
  title: string;
  paragraphs: string[];
}) {
  return (
    <div className="flex w-full flex-col gap-6 md:flex-row md:gap-8">
      <div className="w-full md:w-2/3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="block h-auto w-full"
        />
      </div>
      <div className="flex w-full flex-col gap-3 md:w-1/3 md:pt-0">
        <h3 className="font-sans text-[16px] font-semibold leading-[1.5] text-black">
          {title}
        </h3>
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="font-sans text-[16px] font-normal leading-[1.5] text-black/75"
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function MobilePanel() {
  return (
    <BeforeAfterPanel
      imageSrc="/images/dellchildrens/mobile.png"
      imageAlt="Dell Children's responsive mobile portal"
      title="Placeholder title"
      paragraphs={[
        "Placeholder: text for the mobile tab will be provided.",
      ]}
    />
  );
}
