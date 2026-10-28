"use client";

import { useEffect, useRef, useState, type Ref } from "react";

const paddedLogoHeightClass = "h-32 sm:h-36 md:h-40";

const logos: readonly { src: string; alt: string; heightClass?: string }[] = [
  { src: "/images/DoD-logo.png", alt: "Department of Defense" },
  { src: "/images/UHG-logo.png", alt: "UnitedHealth Group" },
  // Ascension and Clinical Ink are cropped close to the mark (the others have built-in padding), so they need shorter boxes to match visually.
  {
    src: "/images/ascension-logo.png",
    alt: "Ascension",
    heightClass: "h-16 sm:h-18 md:h-20",
  },
  { src: "/images/fresenius-logo.png", alt: "Fresenius Medical Care" },
  { src: "/images/kaiser-logo.png", alt: "Kaiser Permanente" },
  {
    src: "/images/clinicalink-logo.png",
    alt: "Clinical Ink",
    heightClass: "h-8 sm:h-9 md:h-10",
  },
];

const logoImgClass =
  "w-auto shrink-0 object-contain grayscale opacity-60";

/**
 * "auto" is the pre-measurement guess (scroll on mobile, static from md up)
 * so the server render matches the most likely layout before JS measures.
 */
type Mode = "auto" | "scroll" | "static";

const modeClasses: Record<
  Mode,
  { viewport: string; track: string; set: string; duplicate: string }
> = {
  auto: {
    viewport:
      "overflow-hidden motion-reduce:overflow-x-auto md:flex md:justify-center md:overflow-visible",
    track: "animate-logo-marquee motion-reduce:animate-none md:animate-none",
    set: "pr-10 motion-reduce:pr-0 md:pr-0",
    duplicate: "contents motion-reduce:hidden md:hidden",
  },
  scroll: {
    viewport: "overflow-hidden motion-reduce:overflow-x-auto",
    track: "animate-logo-marquee motion-reduce:animate-none",
    set: "pr-10 md:pr-16 motion-reduce:pr-0",
    duplicate: "contents motion-reduce:hidden",
  },
  /* The row may spill past this box's edges (as the original desktop row did); it only scrolls once it would leave the screen. */
  static: {
    viewport: "flex justify-center overflow-visible",
    track: "",
    set: "",
    duplicate: "hidden",
  },
};

function LogoSet({
  className,
  duplicate = false,
  setRef,
}: {
  className: string;
  duplicate?: boolean;
  setRef?: Ref<HTMLUListElement>;
}) {
  return (
    <ul
      ref={setRef}
      className={`flex shrink-0 items-center gap-10 md:gap-16 ${className}`}
      aria-hidden={duplicate || undefined}
    >
      {logos.map((logo) => (
        <li key={logo.src} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt={duplicate ? "" : logo.alt}
            className={`${logoImgClass} ${logo.heightClass ?? paddedLogoHeightClass}`}
          />
        </li>
      ))}
    </ul>
  );
}

export default function LogoStrip() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);
  const [mode, setMode] = useState<Mode>("auto");

  useEffect(() => {
    const viewport = viewportRef.current;
    const set = setRef.current;
    if (!viewport || !set) return;

    const measure = () => {
      const loopPadding = parseFloat(getComputedStyle(set).paddingRight) || 0;
      const contentWidth = set.scrollWidth - loopPadding;
      const screenWidth = document.documentElement.clientWidth;
      setMode(contentWidth > screenWidth ? "scroll" : "static");
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(set);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const classes = modeClasses[mode];

  return (
    <div
      ref={viewportRef}
      role="region"
      aria-label="Organizations"
      className={`w-full ${classes.viewport}`}
    >
      {/* When scrolling, the track holds two identical sets and slides by -50%, so the loop has no visible seam. */}
      <div className={`flex w-max shrink-0 ${classes.track}`}>
        <LogoSet className={classes.set} setRef={setRef} />
        <div className={classes.duplicate}>
          <LogoSet className={classes.set} duplicate />
        </div>
      </div>
    </div>
  );
}
