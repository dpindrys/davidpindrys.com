"use client";

import { useEffect, useId, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";

export type DemoDialogContent = {
  client: string;
  video: string;
};

export function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.85em] w-[0.85em] shrink-0" aria-hidden="true" fill="currentColor">
      <path d="M8 5.2v13.6a.8.8 0 0 0 1.22.68l10.4-6.8a.8.8 0 0 0 0-1.36L9.22 4.52A.8.8 0 0 0 8 5.2Z" />
    </svg>
  );
}

export default function DemoDialog({
  demo,
  onClose,
  openerRef,
}: {
  demo: DemoDialogContent | null;
  onClose: () => void;
  openerRef: RefObject<HTMLButtonElement | null>;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!demo) return;
    const opener = openerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = [...dialog.querySelectorAll<HTMLElement>("button, video, a[href]")].filter(
        (el) => el.tabIndex !== -1,
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [demo, onClose, openerRef]);

  if (!demo || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/55" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-5xl overflow-hidden rounded-[16px] bg-black shadow-[0_24px_80px_-32px_rgba(0,0,0,0.55)]"
      >
        <div className="flex items-center justify-between gap-4 bg-[#F4F2EE] px-4 py-3 sm:px-5">
          <h2 id={titleId} className="font-sans text-[16px] font-medium leading-none text-black">
            {demo.client} guided demo
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center font-sans text-[22px] leading-none text-black/70 hover:text-black"
          >
            <span aria-hidden>×</span>
          </button>
        </div>
        <video
          src={demo.video}
          controls
          autoPlay
          playsInline
          className="block max-h-[min(78vh,820px)] w-full bg-black"
          aria-label={`Guided demo for ${demo.client}`}
        />
      </div>
    </div>,
    document.body,
  );
}
