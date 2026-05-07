"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export type StickyScrollStep =
  | {
      title: string;
      body: string;
      variant: "image";
      imageSrc: string;
      alt: string;
    }
  | {
      title: string;
      body: string;
      variant: "placeholder";
      placeholderLabel: string;
      alt: string;
    };

type StickyScrollVisualProps = {
  steps: StickyScrollStep[];
  /** Sticky top offset in px (defaults to 96). */
  stickyTopPx?: number;
  /** Intersection ratio (0–1) to treat a step as active (defaults to 0.55). */
  activeRatio?: number;
  /** Optional label for assistive tech. */
  ariaLabel?: string;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function StepVisualFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-[220px] w-full items-center justify-center rounded-xl border border-dashed border-black/[0.14] bg-black/[0.025] px-4 py-12 md:min-h-[280px] ${className}`}
    >
      {children}
    </div>
  );
}

export default function StickyScrollVisual({
  steps,
  stickyTopPx = 96,
  activeRatio = 0.55,
  ariaLabel = "Workflow steps",
}: StickyScrollVisualProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const ratiosByIndexRef = useRef<Map<number, number>>(new Map());
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const thresholds = useMemo(() => {
    // Keep it lightweight while still detecting “mostly visible”.
    return [0, 0.25, 0.5, activeRatio, 0.75, 1].filter(
      (v, i, arr) => arr.indexOf(v) === i,
    );
  }, [activeRatio]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    ratiosByIndexRef.current = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idxAttr = (entry.target as HTMLElement).dataset.stepIndex;
          const idx = idxAttr ? Number(idxAttr) : NaN;
          if (!Number.isFinite(idx)) continue;
          ratiosByIndexRef.current.set(idx, entry.intersectionRatio);
        }

        let nextIndex = activeIndexRef.current;
        let bestRatio = -1;

        for (let i = 0; i < steps.length; i++) {
          const ratio = ratiosByIndexRef.current.get(i) ?? 0;
          if (ratio >= activeRatio && ratio > bestRatio) {
            bestRatio = ratio;
            nextIndex = i;
          }
        }

        // Fallback: pick the most visible step (helps at boundaries).
        if (bestRatio < 0) {
          for (let i = 0; i < steps.length; i++) {
            const ratio = ratiosByIndexRef.current.get(i) ?? 0;
            if (ratio > bestRatio) {
              bestRatio = ratio;
              nextIndex = i;
            }
          }
        }

        setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
      },
      {
        threshold: thresholds,
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [steps.length, thresholds, activeRatio]);

  return (
    <section aria-label={ariaLabel} className="w-full">
      {/* Mobile: stacked, no sticky behavior */}
      <div className="md:hidden">
        <div className="flex flex-col gap-12">
          {steps.map((step) => (
            <article key={step.title} className="w-full">
              <h4 className="font-sans text-[22px] font-semibold leading-[1.25] tracking-tight text-black">
                {step.title}
              </h4>
              <p className="mt-4 font-sans text-[22px] font-normal leading-[1.45] text-black/80">
                {step.body}
              </p>
              <div className="mt-6 w-full overflow-hidden rounded-2xl border border-black/10 bg-white p-3 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.06)]">
                {step.variant === "image" ? (
                  <Image
                    src={step.imageSrc}
                    alt={step.alt}
                    width={1200}
                    height={800}
                    className="h-auto w-full"
                    sizes="100vw"
                  />
                ) : (
                  <StepVisualFrame>
                    <span className="max-w-[90%] text-center font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-black/35">
                      {step.placeholderLabel}
                    </span>
                  </StepVisualFrame>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Desktop/tablet: sticky visual with scroll-triggered steps */}
      <div className="hidden md:block">
        <div className="grid w-full grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:gap-14">
          <div className="min-w-0">
            <div className="flex flex-col">
              {steps.map((step, i) => (
                <article
                  key={step.title}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  data-step-index={i}
                  className="flex min-h-[70vh] flex-col justify-center py-10"
                  aria-current={activeIndex === i ? "step" : undefined}
                >
                  <h4 className="font-sans text-[22px] md:text-[24px] font-semibold leading-[1.25] tracking-tight text-black">
                    {step.title}
                  </h4>
                  <p className="mt-4 font-sans text-[22px] md:text-[24px] font-normal leading-[1.45] text-black/80">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside
            className="sticky min-w-0 self-start h-fit"
            style={{ top: stickyTopPx }}
            aria-label="Step visual"
          >
            <div className="w-full overflow-hidden rounded-2xl border border-black/10 bg-white p-4 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.06)] lg:p-5">
              <div className="relative w-full overflow-hidden rounded-xl bg-black/[0.02]">
                {/* Overlapped grid keeps a stable width and a tall-enough height. */}
                <div className="grid w-full">
                  {steps.map((step, i) => {
                    const isActive = i === activeIndex;
                    const base =
                      "col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-out";
                    const motion = prefersReducedMotion
                      ? isActive
                        ? "opacity-100"
                        : "opacity-0"
                      : isActive
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-2 scale-[0.99]";

                    return (
                      <div
                        key={step.title}
                        className={`${base} ${motion}`}
                        aria-hidden={!isActive}
                      >
                        {step.variant === "image" ? (
                          <Image
                            src={step.imageSrc}
                            alt={step.alt}
                            width={1400}
                            height={1000}
                            sizes="(min-width: 1024px) 640px, 48vw"
                            className="h-auto w-full"
                            priority={i === 0}
                          />
                        ) : (
                          <StepVisualFrame className="min-h-[320px] md:min-h-[360px]">
                            <span className="max-w-[90%] text-center font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-black/35 md:text-[12px]">
                              {step.placeholderLabel}
                            </span>
                          </StepVisualFrame>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Non-visual state cue */}
            <p className="sr-only" aria-live="polite">
              {steps[activeIndex]?.title}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

