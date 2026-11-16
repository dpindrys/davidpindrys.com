"use client";

import { useCallback, useRef, useState } from "react";

import { PRIMARY_FILLED_INTERACTIVE } from "./buttonTokens";
import DemoDialog, { PlayIcon } from "./DemoDialog";

const disabledPrimaryButtonClass = `inline-flex cursor-not-allowed items-center gap-2 rounded-[8px] px-4 py-2.5 font-sans text-[14px] font-medium leading-none opacity-45 ${PRIMARY_FILLED_INTERACTIVE} hover:bg-[#1F2621]`;

export default function CaseStudyCardCtas({
  client,
  demoVideo,
}: {
  client: string;
  demoVideo?: string;
}) {
  const [demoOpen, setDemoOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const close = useCallback(() => setDemoOpen(false), []);

  return (
    <>
      <div className="mt-auto flex flex-col items-start gap-3 pt-5">
        <span className="border border-black/15 px-2.5 py-1 font-sans text-[13px] leading-none text-black/70">
          Case study coming soon
        </span>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <button type="button" disabled className={disabledPrimaryButtonClass}>
            Read case study
          </button>
          {demoVideo ? (
            <button
              type="button"
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setDemoOpen(true);
              }}
              className="inline-flex items-center gap-1.5 font-sans text-[15px] leading-none text-black underline decoration-black/40 underline-offset-[3px] hover:decoration-black"
            >
              View demo
              <PlayIcon />
            </button>
          ) : null}
        </div>
      </div>
      {demoVideo ? (
        <DemoDialog
          demo={demoOpen ? { client, video: demoVideo } : null}
          onClose={close}
          openerRef={openerRef}
        />
      ) : null}
    </>
  );
}
