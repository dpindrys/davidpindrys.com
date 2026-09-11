"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type HoverControlsVideoProps = {
  src: string;
  /** Describes the clip for screen readers and as the control group's name. */
  label: string;
  className?: string;
  style?: CSSProperties;
  preload?: "auto" | "metadata" | "none";
};

/**
 * Autoplaying loop that reveals native video controls on hover or keyboard focus.
 *
 * WCAG 2.2.2 (Pause, Stop, Hide, Level A) requires a way to pause motion that
 * starts on its own and runs past five seconds. Hover alone would leave keyboard
 * users stuck, so the video is focusable and focus reveals the same controls.
 * When the OS asks for reduced motion the clip does not autoplay and controls
 * stay visible.
 */
export default function HoverControlsVideo({
  src,
  label,
  className,
  style,
  preload = "auto",
}: HoverControlsVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduceMotion(mq.matches);
      if (mq.matches) ref.current?.pause();
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const showControls = active || reduceMotion;

  return (
    <video
      ref={ref}
      src={src}
      className={[className, "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"]
        .filter(Boolean)
        .join(" ")}
      style={style}
      aria-label={label}
      tabIndex={0}
      controls={showControls}
      controlsList="nodownload"
      autoPlay={!reduceMotion}
      muted
      loop
      playsInline
      preload={preload}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    />
  );
}
