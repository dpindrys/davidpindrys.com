"use client";

import { useCallback, useRef, useState } from "react";

import { companyNameClass } from "../lib/pageStyles";
import DemoDialog, { PlayIcon } from "./DemoDialog";

const viewDemoButtonClass =
  "inline-flex items-center gap-1.5 justify-self-end self-start font-sans text-[15px] leading-none text-black underline decoration-black/40 underline-offset-[3px] hover:decoration-black";

export default function CaseStudyCardHeader({
  id,
  client,
  tagline,
  taglineClass,
  demoVideo,
}: {
  id: string;
  client: string;
  tagline: string;
  taglineClass: string;
  demoVideo?: string;
}) {
  const [demoOpen, setDemoOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const close = useCallback(() => setDemoOpen(false), []);

  const titleBlock = (
    <div className="min-w-0">
      <h3 id={`${id}-title`} className={companyNameClass}>
        {client}
      </h3>
      <p className={taglineClass}>{tagline}</p>
    </div>
  );

  if (!demoVideo) {
    return titleBlock;
  }

  return (
    <>
      <div className="grid grid-cols-2 items-start gap-3">
        {titleBlock}
        <button
          type="button"
          aria-label={`View demo for ${client}`}
          onClick={(event) => {
            openerRef.current = event.currentTarget;
            setDemoOpen(true);
          }}
          className={viewDemoButtonClass}
        >
          View demo
          <PlayIcon />
        </button>
      </div>
      <DemoDialog
        demo={demoOpen ? { client, video: demoVideo } : null}
        onClose={close}
        openerRef={openerRef}
      />
    </>
  );
}
