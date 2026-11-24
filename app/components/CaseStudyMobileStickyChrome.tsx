"use client";

import Link from "next/link";
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { companyNameClass } from "../lib/pageStyles";

const backLinkClass =
  "flex w-full items-center gap-2 border-b border-black/10 bg-black/[0.05] px-3 py-2.5 font-sans text-[14px] font-medium leading-snug tracking-[-0.01em] text-black/70 outline-none transition-colors hover:text-black focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-inset";

/** Matches homepage work card taglines / desktop sidebar subtitle. */
const workTaglineClass =
  "mt-1 font-sans text-[15px] leading-[1.4] text-black/70 md:text-[16px]";

const titleBlockClass = "min-w-0 border-b border-black/10 bg-[#F4F2EE] px-3 py-3";

function BackChevronIcon() {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden
      className="block shrink-0"
    >
      <path
        d="M15 6H2.5M6.5 1.5 1.5 6l5 4.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TitleBlock({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className={titleBlockClass}>
      <p className={companyNameClass}>{title}</p>
      <p className={workTaglineClass}>{subtitle}</p>
    </div>
  );
}

type CaseStudyMobileStickyChromeProps = {
  title: string;
  subtitle: string;
  /** Hero + caption bar — in-flow title renders after these children. */
  children: ReactNode;
};

/**
 * Mobile-only case study chrome:
 * - Selected work back bar sticks to the top; hides on scroll down, shows on
 *   scroll up; always visible at page top.
 * - Title/subtitle lives in document flow under the caption bar.
 * - After scrolling past that in-flow title, scrolling up also pins a title
 *   clone under Selected work. Scrolling down hides the whole sticky stack.
 */
export default function CaseStudyMobileStickyChrome({
  title,
  subtitle,
  children,
}: CaseStudyMobileStickyChromeProps) {
  const [concealed, setConcealed] = useState(false);
  /** Title clone is part of the sticky stack (pinned on scroll-up after past). */
  const [stickyTitle, setStickyTitle] = useState(false);
  const lastY = useRef(0);
  const concealedRef = useRef(false);
  const titlePastRef = useRef(false);
  const stickyTitleRef = useRef(false);
  const inFlowTitleRef = useRef<HTMLDivElement>(null);
  const backBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastY.current = window.scrollY;

    const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

    const setConcealedState = (next: boolean) => {
      if (next === concealedRef.current) return;
      concealedRef.current = next;
      setConcealed(next);
    };

    const setStickyTitleState = (next: boolean) => {
      if (next === stickyTitleRef.current) return;
      stickyTitleRef.current = next;
      setStickyTitle(next);
    };

    const updateTitlePast = () => {
      if (!isMobile()) {
        titlePastRef.current = false;
        setStickyTitleState(false);
        return;
      }

      const el = inFlowTitleRef.current;
      if (!el) return;

      const backH = backBarRef.current?.offsetHeight ?? 0;
      // Past once the in-flow title's bottom clears the sticky back bar.
      const next = el.getBoundingClientRect().bottom < backH;
      titlePastRef.current = next;
      if (!next) setStickyTitleState(false);
    };

    const onScroll = () => {
      if (!isMobile()) {
        lastY.current = window.scrollY;
        setConcealedState(false);
        updateTitlePast();
        return;
      }

      const y = window.scrollY;
      const delta = y - lastY.current;

      updateTitlePast();

      if (y < 8) {
        lastY.current = y;
        setConcealedState(false);
        setStickyTitleState(false);
        return;
      }

      if (delta > 8) {
        // Hide the current sticky stack (back ± title) as one unit.
        lastY.current = y;
        setConcealedState(true);
        return;
      }

      if (delta < -8) {
        lastY.current = y;
        setConcealedState(false);
        // Only pin the title clone after passing the in-flow block, on scroll up.
        if (titlePastRef.current) setStickyTitleState(true);
        return;
      }

      lastY.current = y;
    };

    const onResize = () => {
      updateTitlePast();
      if (!isMobile()) {
        setConcealedState(false);
        setStickyTitleState(false);
      }
    };

    updateTitlePast();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <div
        className={`sticky top-0 z-30 bg-[#F4F2EE] md:hidden transition-transform duration-200 ease-out motion-reduce:transition-none ${
          concealed
            ? "pointer-events-none -translate-y-full"
            : "translate-y-0"
        }`}
        inert={concealed ? true : undefined}
      >
        <div ref={backBarRef}>
          <Link href="/#work" aria-label="Selected work" className={backLinkClass}>
            <BackChevronIcon />
            Selected work
          </Link>
        </div>
        {/*
          Once pinned on scroll-up, keep the title in the stack while concealed
          so Selected work + title slide away together on the next scroll-down.
        */}
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out motion-reduce:transition-none ${
            stickyTitle
              ? "max-h-40 opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
          aria-hidden={!stickyTitle}
          inert={!stickyTitle ? true : undefined}
        >
          <TitleBlock title={title} subtitle={subtitle} />
        </div>
      </div>

      {children}

      <div ref={inFlowTitleRef} className="md:hidden">
        <TitleBlock title={title} subtitle={subtitle} />
      </div>
    </>
  );
}
