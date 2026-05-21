"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CAL_USERNAME = "dpindrys";

/**
 * Embed URL: defaults to https://cal.com/dpindrys?embed=true
 * Set NEXT_PUBLIC_CAL_EVENT_SLUG (e.g. `30min`) for a specific event type, or
 * NEXT_PUBLIC_CAL_EMBED_URL for a full override.
 */
function getEmbedSrc(): string {
  const fromEnv = process.env.NEXT_PUBLIC_CAL_EMBED_URL?.trim();
  if (fromEnv) return fromEnv;

  const slug = process.env.NEXT_PUBLIC_CAL_EVENT_SLUG?.trim();
  if (slug) {
    return `https://cal.com/${CAL_USERNAME}/${slug}?embed=true`;
  }
  return `https://cal.com/${CAL_USERNAME}?embed=true`;
}

const modalCloseButtonClass =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-[32px] font-light leading-none text-black/55 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/25";

export function BookCallModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const embedSrc = getEmbedSrc();

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] m-0 flex cursor-pointer max-[800px]:h-[100dvh] max-[800px]:min-h-[100dvh] max-[800px]:w-screen max-[800px]:max-w-[100vw] max-[800px]:min-w-0 max-[800px]:flex-col max-[800px]:bg-[#EEEFF2] max-[800px]:p-0 min-[801px]:items-center min-[801px]:justify-center min-[801px]:bg-black/80 min-[801px]:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Book a call"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="pointer-events-auto relative z-[101] flex min-h-0 w-full max-w-[1120px] cursor-default flex-col overflow-hidden rounded-none border-0 bg-[#EEEFF2] shadow-none max-[800px]:h-[100dvh] max-[800px]:max-h-[100dvh] max-[800px]:min-h-0 max-[800px]:w-screen max-[800px]:max-w-[100vw] max-[800px]:flex-1 min-[801px]:h-[min(85dvh,720px)] min-[801px]:max-h-[720px] min-[801px]:w-[min(100%,1120px)] min-[801px]:min-w-0 min-[801px]:shrink-0 min-[801px]:rounded-xl min-[801px]:border min-[801px]:border-black/[0.08] min-[801px]:shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={`absolute right-2 top-[max(0.5rem,env(safe-area-inset-top))] z-10 sm:right-3 sm:top-3 ${modalCloseButtonClass}`}
          aria-label="Close"
          onClick={close}
        >
          <span aria-hidden>×</span>
        </button>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-1 pb-2 pt-11 sm:px-3 sm:pb-3 sm:pt-12">
          <iframe
            title="Schedule a call with David Pindrys"
            src={embedSrc}
            className="h-[min(680px,92%)] w-full max-w-full shrink-0 border-0 bg-[#EEEFF2]"
            allow="camera; microphone; payment; clipboard-write"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
