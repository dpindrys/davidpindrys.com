"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export type CarouselSlide =
  | { type: "image"; src: string; alt: string; caption?: string; width?: number; height?: number }
  | { type: "video"; src: string; poster?: string; caption?: string; height?: number };

interface CarouselProps {
  slides: CarouselSlide[];
  /** Fallback caption when a slide has no own caption */
  caption?: string;
}

function getSlotStyle(position: "left" | "center" | "right") {
  if (position === "center") {
    return { transform: "none" as const, opacity: 1, zIndex: 4 };
  }
  if (position === "left") {
    return {
      transform: "translateX(-30%) scale(0.75)" as const,
      opacity: 0.5,
      zIndex: 3,
    };
  }
  return {
    transform: "translateX(30%) scale(0.75)" as const,
    opacity: 0.5,
    zIndex: 3,
  };
}

const DRAG_THRESHOLD_PX = 50;
/** Fixed height for left/right (background) slides so both sides match; slightly smaller than user img (384) so video sits behind nicely */
const BACKGROUND_SLIDE_HEIGHT = 368;

export default function Carousel({ slides, caption }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const dragStartX = useRef<number | null>(null);
  const didAdvance = useRef(false);

  const total = slides.length;

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  // Pause non-active videos, play active
  useEffect(() => {
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === activeIndex) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [activeIndex]);

  const handlePointerDown = (e: React.PointerEvent) => {
    const isTouch = e.pointerType === "touch";
    const slideEl = (e.target as HTMLElement).closest("[data-slide-index]");
    const slideIndex = slideEl ? parseInt(slideEl.getAttribute("data-slide-index") ?? "-1", 10) : -1;
    const onCenterSlide = slideIndex === activeIndex;
    // Mobile (touch): whole track is draggable. Desktop (mouse): only center slide is draggable.
    if (!isTouch && !onCenterSlide) return;
    dragStartX.current = e.clientX;
    didAdvance.current = false;
    setIsPointerDown(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (didAdvance.current || dragStartX.current === null) return;
    const deltaX = e.clientX - dragStartX.current;
    if (Math.abs(deltaX) > DRAG_THRESHOLD_PX) {
      if (deltaX > 0) goPrev();
      else goNext();
      dragStartX.current = null;
      didAdvance.current = true;
    }
  };

  const handlePointerUp = () => {
    dragStartX.current = null;
    setIsPointerDown(false);
    // do not reset didAdvance here so click handler can skip if we advanced by drag
  };

  if (total === 0) return null;

  const activeCaption = slides[activeIndex]?.caption ?? caption;
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;
  // Key by slideIndex so the same slide DOM element is reused when it moves left/center/right — enables smooth transform transition
  const slots: { position: "left" | "center" | "right"; slideIndex: number }[] = [
    { position: "left", slideIndex: prevIndex },
    { position: "center", slideIndex: activeIndex },
    { position: "right", slideIndex: nextIndex },
  ];

  return (
    <div
      className="relative w-full flex items-center justify-center"
      role="region"
      aria-roledescription="carousel"
      aria-label="Project carousel"
    >
      <div className="relative w-[75%] flex flex-col items-center">
        {/* Three slots: left = prev (loop), center = active, right = next (loop) */}
        <div
          className="relative w-full min-h-[535px] flex items-center justify-center"
          style={{ touchAction: "none" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {slots.map(({ position, slideIndex }) => {
            const slide = slides[slideIndex];
            const { transform, opacity, zIndex } = getSlotStyle(position);
            const isActive = position === "center";
            const contentWidth =
              slide.type === "image" && slide.width != null ? slide.width : undefined;
            const contentHeight =
              slide.type === "image" && slide.height != null
                ? slide.height
                : slide.type === "video"
                  ? slide.height ?? 535
                  : undefined;
            const isBackground = !isActive;
            const innerHeight = isBackground ? BACKGROUND_SLIDE_HEIGHT : (contentHeight ?? "100%");
            const innerWidth = isBackground ? "auto" : (contentWidth ?? "100%");
            return (
              <div
                key={slideIndex}
                data-slide-index={slideIndex}
                role="group"
                aria-roledescription="slide"
                aria-hidden={!isActive}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: 16,
                  overflow: "hidden",
                  zIndex,
                  opacity,
                  transform,
                  transition: "transform 0.3s ease-in-out",
                  cursor: isActive ? (isPointerDown ? "grabbing" : "grab") : "pointer",
                  userSelect: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  if (didAdvance.current) return;
                  if (position === "left") setActiveIndex(prevIndex);
                  else if (position === "right") setActiveIndex(nextIndex);
                }}
              >
                <div
                  style={{
                    width: innerWidth,
                    height: innerHeight,
                    maxWidth: "100%",
                    maxHeight: isBackground ? BACKGROUND_SLIDE_HEIGHT : "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: isActive ? "0 4px 12px rgba(0, 0, 0, 0.08)" : "none",
                  }}
                >
                  {slide.type === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      width={slide.width}
                      height={slide.height}
                      style={isBackground ? { maxHeight: BACKGROUND_SLIDE_HEIGHT, width: "auto", height: "auto", objectFit: "contain" } : undefined}
                      className="max-w-full max-h-full w-auto h-auto object-contain pointer-events-none"
                      draggable={false}
                    />
                  ) : (
                    <video
                      ref={(el) => {
                        videoRefs.current[slideIndex] = el;
                      }}
                      src={slide.src}
                      poster={slide.poster}
                      muted
                      loop
                      playsInline
                      style={{
                        height: isActive ? (slide.height ?? 535) : BACKGROUND_SLIDE_HEIGHT,
                        width: "auto",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                      className="pointer-events-none"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots — 44px hit area, 12px circle; loop-aware */}
        <div className="mt-4 flex gap-2.5 justify-center items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="w-11 h-11 flex items-center justify-center cursor-pointer rounded-full border-0 bg-transparent"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
            >
              <span
                className="rounded-full transition-[background-color] duration-300 ease-in-out opacity-80"
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: i === activeIndex ? "rgb(51, 51, 51)" : "rgb(255, 255, 255)",
                  border: "1px solid rgb(51, 51, 51)",
                }}
              />
            </button>
          ))}
        </div>

        {/* Per-slide caption (or fallback) */}
        {activeCaption && (
          <p
            className="mt-6 w-full text-center font-sans font-semibold text-[15px] leading-[1.3] tracking-tight"
            style={{ color: "rgb(82, 82, 82)" }}
          >
            {activeCaption}
          </p>
        )}
      </div>
    </div>
  );
}
