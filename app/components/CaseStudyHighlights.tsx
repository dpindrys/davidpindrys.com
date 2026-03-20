"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

export interface CaseStudyHighlightImage {
  src?: string;
  alt: string;
  caption?: string;
  placeholder?: boolean;
  /** Short editorial label under the thumbnail (page-level) */
  thumbnailTitle?: string;
  /** Modal headline; falls back to thumbnailTitle or caption */
  modalTitle?: string;
  /** Supporting copy in the modal */
  modalBody?: string;
  /** Optional larger or alternate primary image in the modal */
  modalPrimarySrc?: string;
  /** Optional secondary supporting image or crop in the modal */
  modalSecondarySrc?: string;
}

export interface CaseStudyHighlightFrame {
  id: string;
  title: string;
  summary: string;
  images: CaseStudyHighlightImage[];
}

export interface CaseStudyHighlightsData {
  frames: CaseStudyHighlightFrame[];
}

type ModalState = { globalIndex: number } | null;

function totalImageCount(frames: CaseStudyHighlightFrame[]): number {
  return frames.reduce((sum, f) => sum + f.images.length, 0);
}

/** Map a 0-based global image index to frame + image within that frame. */
function globalToLocal(
  frames: CaseStudyHighlightFrame[],
  globalIndex: number
): { frameIndex: number; imageIndex: number } {
  const total = totalImageCount(frames);
  if (total === 0) return { frameIndex: 0, imageIndex: 0 };
  let g = ((globalIndex % total) + total) % total;
  for (let fi = 0; fi < frames.length; fi++) {
    const len = frames[fi].images.length;
    if (g < len) return { frameIndex: fi, imageIndex: g };
    g -= len;
  }
  return { frameIndex: 0, imageIndex: 0 };
}

function localToGlobal(
  frames: CaseStudyHighlightFrame[],
  frameIndex: number,
  imageIndex: number
): number {
  let g = 0;
  for (let i = 0; i < frameIndex; i++) {
    g += frames[i].images.length;
  }
  return g + imageIndex;
}

function modalHeading(img: CaseStudyHighlightImage): string {
  return (
    img.modalTitle?.trim() ||
    img.thumbnailTitle?.trim() ||
    img.caption?.trim() ||
    img.alt
  );
}

/** Square nav / close control — same footprint at all breakpoints */
const modalSquareBtnClass =
  "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-black/10 bg-white text-xl leading-none text-black/80 shadow-sm transition-colors hover:bg-black/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/25";

export default function CaseStudyHighlights({ data }: { data: CaseStudyHighlightsData }) {
  const { frames } = data;
  const baseId = useId();
  const [activeFrame, setActiveFrame] = useState(0);
  const [modal, setModal] = useState<ModalState>(null);

  const frameCount = frames.length;
  const current = frames[activeFrame];

  const goPrevFrame = useCallback(() => {
    setActiveFrame((i) => (i - 1 + frameCount) % frameCount);
  }, [frameCount]);

  const goNextFrame = useCallback(() => {
    setActiveFrame((i) => (i + 1) % frameCount);
  }, [frameCount]);

  const openModal = (frameIndex: number, imageIndex: number) => {
    setModal({ globalIndex: localToGlobal(frames, frameIndex, imageIndex) });
    setActiveFrame(frameIndex);
  };

  const closeModal = useCallback(() => setModal(null), []);

  const modalTotal = totalImageCount(frames);
  const modalLocal =
    modal && modalTotal > 0 ? globalToLocal(frames, modal.globalIndex) : null;
  const modalImg =
    modalLocal && frames[modalLocal.frameIndex]?.images[modalLocal.imageIndex]
      ? frames[modalLocal.frameIndex].images[modalLocal.imageIndex]
      : null;

  const goModalImage = useCallback(
    (dir: -1 | 1) => {
      setModal((m) => {
        if (!m) return null;
        const total = totalImageCount(frames);
        if (total <= 1) return m;
        return { globalIndex: (m.globalIndex + dir + total) % total };
      });
    },
    [frames]
  );

  /** Keep the visible tab aligned with whichever frame the modal is showing. */
  useEffect(() => {
    if (!modal || modalTotal === 0) return;
    const { frameIndex } = globalToLocal(frames, modal.globalIndex);
    setActiveFrame(frameIndex);
  }, [modal, frames, modalTotal]);

  const modalScrollRef = useRef<HTMLDivElement>(null);

  /** Mobile (≤800px): horizontal swipe on modal body to change slide (native listeners avoid touch-action conflicts). */
  useEffect(() => {
    if (!modal) return;
    const el = modalScrollRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (typeof window !== "undefined" && window.matchMedia("(min-width: 801px)").matches) {
        return;
      }
      if (modalTotal <= 1) return;
      if (e.changedTouches.length !== 1) return;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dx = endX - startX;
      const dy = endY - startY;
      if (Math.abs(dx) < 40) return;
      if (Math.abs(dx) < Math.abs(dy) * 1.15) return;
      if (dx > 0) goModalImage(-1);
      else goModalImage(1);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [modal, modalTotal, goModalImage]);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goModalImage(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goModalImage(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, closeModal, goModalImage]);

  useEffect(() => {
    if (modal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);

  const onSectionKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
    if (modal) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrevFrame();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNextFrame();
    }
  };

  if (!frames.length) return null;

  return (
    <>
      <section
        tabIndex={0}
        onKeyDown={onSectionKeyDown}
        className="w-full outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F0F0F0]"
        aria-label="Case study"
      >
        <div className="flex flex-col gap-5 sm:gap-6">
          <div
            role="tablist"
            aria-label="Frames"
            className="flex flex-wrap gap-x-6 gap-y-1 sm:gap-x-8"
          >
            {frames.map((f, i) => {
              const selected = i === activeFrame;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveFrame(i)}
                  className={`min-h-[44px] border-b pb-1 pt-0.5 text-left font-sans text-[15px] leading-snug transition-colors sm:text-[16px] ${
                    selected
                      ? "cursor-default -mb-px border-[#00AAFF] border-b-2 font-semibold text-black"
                      : "cursor-pointer border-black/15 font-normal text-black/55 hover:border-black/25 hover:text-black/80"
                  }`}
                >
                  {f.title}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${activeFrame}`}
            className="flex flex-col gap-5 transition-opacity duration-200 ease-out motion-reduce:transition-none"
          >
            <p className="w-full font-sans font-normal text-[16px] leading-[1.5] text-black">
              {current.summary}
            </p>

            <div className="flex flex-col gap-4 max-[800px]:w-full min-[801px]:grid min-[801px]:grid-cols-3 min-[801px]:gap-3">
              {current.images.map((img, idx) => (
                <div
                  key={`${current.id}-${idx}`}
                  className="flex w-full flex-col items-center gap-1.5 min-[801px]:min-w-0"
                >
                  <button
                    type="button"
                    onClick={() => openModal(activeFrame, idx)}
                    className="relative block w-full min-w-0 cursor-pointer border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-0"
                    aria-label={`Open details: ${modalHeading(img)}`}
                  >
                    {img.placeholder || !img.src ? (
                      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 px-4 py-8">
                        <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-black/45">
                          Placeholder
                        </span>
                        <span className="text-center font-sans text-[13px] leading-snug text-black/55">
                          {img.thumbnailTitle ?? img.caption ?? img.alt}
                        </span>
                      </div>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="block h-auto w-full max-w-full align-top"
                      />
                    )}
                  </button>
                  {img.thumbnailTitle ? (
                    <span className="w-full text-center font-sans text-[12px] leading-snug tracking-[0.01em] text-black/55">
                      {img.thumbnailTitle}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {modal && modalImg && (
        <div
          className="fixed inset-0 z-[100] flex cursor-pointer max-[800px]:min-h-0 max-[800px]:flex-col max-[800px]:bg-[#FAFAFA] min-[801px]:items-center min-[801px]:justify-center min-[801px]:bg-black/80 min-[801px]:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${baseId}-modal-title`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <button
            type="button"
            className={`absolute right-4 top-4 z-[102] max-[800px]:right-4 max-[800px]:top-[max(1rem,env(safe-area-inset-top))] min-[801px]:right-6 min-[801px]:top-6 ${modalSquareBtnClass}`}
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            <span className="text-[28px] font-light leading-none" aria-hidden>
              ×
            </span>
          </button>

          {modalTotal > 1 ? (
            <>
              <button
                type="button"
                className={`absolute left-4 top-1/2 z-[102] hidden -translate-y-1/2 min-[801px]:inline-flex min-[801px]:left-6 ${modalSquareBtnClass}`}
                aria-label="Previous item"
                onClick={(e) => {
                  e.stopPropagation();
                  goModalImage(-1);
                }}
              >
                ←
              </button>
              <button
                type="button"
                className={`absolute right-4 top-1/2 z-[102] hidden -translate-y-1/2 min-[801px]:inline-flex min-[801px]:right-6 ${modalSquareBtnClass}`}
                aria-label="Next item"
                onClick={(e) => {
                  e.stopPropagation();
                  goModalImage(1);
                }}
              >
                →
              </button>
            </>
          ) : null}

          <div
            ref={modalScrollRef}
            className="relative z-[101] flex min-h-0 w-full cursor-default flex-col overflow-y-auto overscroll-y-contain rounded-sm border border-black/[0.06] bg-[#FAFAFA] shadow-[0_24px_80px_rgba(0,0,0,0.2)] max-[800px]:mt-0 max-[800px]:max-h-none max-[800px]:min-h-0 max-[800px]:flex-1 max-[800px]:rounded-none max-[800px]:border-0 max-[800px]:shadow-none max-[800px]:pt-16 max-[800px]:pb-28 min-[801px]:mt-10 min-[801px]:max-h-[min(90vh,100%)] min-[801px]:max-w-3xl min-[801px]:flex-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-8 px-6 py-10 sm:px-10 sm:py-12 md:gap-10 max-[800px]:px-5 max-[800px]:pb-8 max-[800px]:pt-4">
              <div className="flex flex-col gap-4">
                <h2
                  id={`${baseId}-modal-title`}
                  className="font-serif text-[clamp(22px,4vw,30px)] font-normal leading-[1.25] tracking-[-0.01em] text-black"
                >
                  {modalHeading(modalImg)}
                </h2>
                {modalImg.modalBody ? (
                  <p className="max-w-2xl font-sans text-[16px] font-normal leading-[1.6] text-black/75">
                    {modalImg.modalBody}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-6">
                {(() => {
                  const primarySrc = modalImg.modalPrimarySrc ?? modalImg.src;
                  if (!primarySrc) {
                    return (
                      <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 border border-dashed border-black/15 bg-white px-6 py-12">
                        <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-black/40">
                          Image placeholder
                        </span>
                        <span className="text-center font-sans text-[14px] text-black/50">
                          {modalImg.alt}
                        </span>
                      </div>
                    );
                  }
                  return (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={primarySrc}
                        alt={modalImg.alt}
                        className="w-full max-h-[min(52vh,560px)] object-contain object-top max-[800px]:max-h-[min(45vh,420px)]"
                      />
                      {modalImg.caption ? (
                        <p className="mt-2 font-sans text-[13px] leading-snug text-black/55">
                          {modalImg.caption}
                        </p>
                      ) : null}
                    </>
                  );
                })()}

                {modalImg.modalSecondarySrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={modalImg.modalSecondarySrc}
                    alt="Supporting detail"
                    className="w-full max-h-[40vh] object-contain object-top opacity-95"
                  />
                ) : null}
              </div>
            </div>
          </div>

          {modalTotal > 1 ? (
            <div
              className="fixed inset-x-0 bottom-0 z-[102] flex cursor-default items-center justify-center gap-8 border-t border-black/[0.08] bg-[#FAFAFA] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] max-[800px]:flex min-[801px]:hidden"
              role="group"
              aria-label="Previous and next item"
            >
              <button
                type="button"
                className={modalSquareBtnClass}
                aria-label="Previous item"
                onClick={(e) => {
                  e.stopPropagation();
                  goModalImage(-1);
                }}
              >
                ←
              </button>
              <button
                type="button"
                className={modalSquareBtnClass}
                aria-label="Next item"
                onClick={(e) => {
                  e.stopPropagation();
                  goModalImage(1);
                }}
              >
                →
              </button>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
