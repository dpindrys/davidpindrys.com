"use client";

import { useEffect, useRef, useState } from "react";
import { heroBandClass } from "../lib/heroBand";
import { TalkButton } from "./ContactModal";

const linkClass =
  "font-sans text-[14px] leading-none text-black/70 transition-colors hover:text-black";

export const CONTACT_HREF = "mailto:dpindrys@gmail.com";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [bandHeight, setBandHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const hiddenRef = useRef(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const measure = () => setBandHeight(header.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      let next = hiddenRef.current;
      if (y < 24) next = false;
      else if (delta > 8) next = true;
      else if (delta < -8) next = false;
      lastY.current = y;
      if (next === hiddenRef.current) return;
      hiddenRef.current = next;
      setHidden(next);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <header
      ref={headerRef}
      id="top"
      inert={hidden ? true : undefined}
      className={`fixed inset-x-0 top-0 z-40 w-full px-6 transition-transform duration-200 ease-out md:px-10 ${heroBandClass} ${
        hidden ? "pointer-events-none -translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1040px] flex-wrap items-center justify-between gap-x-6 gap-y-3 py-6 md:py-8">
        <a href="#top" className="flex flex-col gap-1 font-sans leading-none">
          <span className="text-[15px] font-semibold text-black">David Pindrys</span>
          <span className="text-[13px] text-black/55">Product Design · Human Factors · Boston</span>
        </a>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-8">
          <a href="#approach" className={linkClass}>
            Approach
          </a>
          <a href="#services" className={linkClass}>
            Services
          </a>
          <a href="#work" className={linkClass}>
            Work
          </a>
          <TalkButton variant="nav">Let&apos;s talk</TalkButton>
        </nav>
      </div>
    </header>
    <div aria-hidden="true" className={heroBandClass} style={{ height: bandHeight }} />
    </>
  );
}
