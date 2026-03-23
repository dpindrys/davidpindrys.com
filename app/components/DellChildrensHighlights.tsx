"use client";

import { useState, useId } from "react";
import {
  HIGHLIGHT_TAB_BAR_WRAPPER_CLASS,
  HIGHLIGHT_TAB_LIST_CLASS,
  highlightTabButtonClass,
} from "./highlightTabStyles";

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
      <div className={HIGHLIGHT_TAB_BAR_WRAPPER_CLASS}>
        <div
          role="tablist"
          aria-label="Dell Children’s highlights"
          className={HIGHLIGHT_TAB_LIST_CLASS}
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
                className={highlightTabButtonClass(selected)}
              >
                {t.title}
              </button>
            );
          })}
        </div>
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
    <div className="flex w-full flex-col gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/dellchildrens/mobile.png"
        alt="Dell Children's responsive mobile portal"
        className="block h-auto w-full"
      />
      <p className="font-sans text-[15px] font-normal leading-[1.4] text-black/50">
        Placeholder caption for the mobile view.
      </p>
    </div>
  );
}
