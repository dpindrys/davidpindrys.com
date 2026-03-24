"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

/** Position for a video layered on the modal primary image (percent or px, relative to the image wrapper) */
export interface ModalVideoInset {
  left?: string;
  top?: string;
  width?: string;
  height?: string;
  right?: string;
  bottom?: string;
}

/** Default: right half of the still, flush bottom, 55px taller than the image (extends above). */
const DEFAULT_MODAL_VIDEO_INSET: ModalVideoInset = {
  left: "50%",
  right: "0",
  top: "-55px",
  bottom: "0",
};

function modalVideoInsetStyle(inset: ModalVideoInset): CSSProperties {
  const s: CSSProperties = {};
  if (inset.left !== undefined) s.left = inset.left;
  if (inset.top !== undefined) s.top = inset.top;
  if (inset.right !== undefined) s.right = inset.right;
  if (inset.bottom !== undefined) s.bottom = inset.bottom;
  if (inset.width !== undefined) s.width = inset.width;
  if (inset.height !== undefined) s.height = inset.height;
  return s;
}

/** On-page text-led highlight (no image yet); quote + attribution in a compact chip */
export interface TextHighlightChip {
  quote: string;
  attribution: string;
}

/** Featured testimonial block in the modal */
export interface ModalTestimonial {
  quote: string;
  attribution: string;
  /** Optional square headshot to the left of the attribution line */
  avatarSrc?: string;
}

export interface CaseStudyHighlightImage {
  src?: string;
  alt: string;
  caption?: string;
  placeholder?: boolean;
  /** Short editorial label under the thumbnail (page-level) */
  thumbnailTitle?: string;
  /** Optional second line under the thumbnail title (short quote or proof fragment) */
  thumbnailSubtitle?: string;
  /** Text-led card: title + quote chip + attribution (skips empty image placeholder) */
  textHighlight?: TextHighlightChip;
  /** Modal headline; falls back to thumbnailTitle or caption */
  modalTitle?: string;
  /** Supporting copy in the modal */
  modalBody?: string;
  /** Optional attribution under modal body (same size as body, typically lighter) */
  modalImageSource?: string;
  /** Optional quoted lines shown below the modal body (e.g. staff feedback) */
  modalQuoteLines?: string[];
  /** Stronger testimonial cards below the body (replaces quote-lines styling when set) */
  modalTestimonials?: ModalTestimonial[];
  /** When true, hide title/body/source in modal for this item. */
  hideModalCopy?: boolean;
  /** When true, no image/video block is shown in the modal (e.g. evidence-only Why it matters) */
  omitModalMedia?: boolean;
  /** Optional larger or alternate primary image in the modal */
  modalPrimarySrc?: string;
  /** Optional secondary supporting image or crop in the modal */
  modalSecondarySrc?: string;
  /** Optional video drawn on top of the modal primary image (e.g. wireframe animation over a composite still) */
  modalVideoSrc?: string;
  /** Position of the video over the modal image (wrapper is the relative container around the still) */
  modalVideoInset?: ModalVideoInset;
  /** When true, render modalVideoSrc as standalone full-width video (no underlying still image) */
  modalVideoOnly?: boolean;
  /** Optional transform/style override for standalone modal videos (e.g. clip bottom to align with paired still). */
  modalVideoOnlyStyle?: CSSProperties;
  /** Optional wrapper style for standalone modal video frame (e.g. force aspect ratio for masked crop). */
  modalVideoOnlyFrameStyle?: CSSProperties;
  /** When true, show image (left half, cropped) and video (right) side by side at equal height */
  modalSideBySide?: boolean;
}

export interface CaseStudyHighlightFrame {
  id: string;
  title: string;
  summary: string;
  images: CaseStudyHighlightImage[];
  /**
   * Composite modals only: 1-based subsection number for `images[i]` when it
   * differs from array order (e.g. VEHR Problem row order vs `images` array order).
   */
  compositeSubsectionOrder?: number[];
}

export interface CaseStudyHighlightsData {
  frames: CaseStudyHighlightFrame[];
  /**
   * `composite-vehr`: tabbed modal with `VehrCompositeFrameContent` (50/50 splits on md+ where configured).
   * Default: slide-by-slide.
   */
  modalPresentation?: "slides" | "composite-vehr";
  /**
   * When `modalPresentation` is `composite-vehr`, optional per-frame row layout (image indices per row).
   * If omitted, uses the default VEHR layout (`problem` / `solution` / `whyItMatters` split rows).
   * Other case studies (e.g. Fresenius) pass a full map for their frame ids.
   */
  compositeRows?: Record<string, number[][]>;
}

/** Default VEHR layout: row of image indices; split rows are 50/50 on md+. */
const DEFAULT_COMPOSITE_ROWS_VEHR: Record<string, number[][]> = {
  problem: [[0, 1]],
  solution: [[0, 1]],
  whyItMatters: [[0, 1]],
};

type ModalState =
  | { kind: "slides"; globalIndex: number }
  | { kind: "composite"; frameIndex: number }
  | null;

export type CaseStudyHighlightsHandle = {
  /** Opens the modal for the first image in the first frame (e.g. Problem). */
  openFirstProblemModal: () => void;
};

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

/** Light frame around modal imagery (shared by all media variants) */
const modalMediaFrameClass =
  "overflow-hidden rounded-xl border border-black/[0.12] bg-white";

type ModalMediaBlockProps = {
  modalImg: CaseStudyHighlightImage;
  modalVideoRef: React.RefObject<HTMLVideoElement | null>;
  modalVideoLoadError: boolean;
  setModalVideoLoadError: (v: boolean) => void;
};

/** Primary image / video / side-by-side / secondary — shared by slide and composite modals. */
function ModalMediaBlock({
  modalImg,
  modalVideoRef,
  modalVideoLoadError,
  setModalVideoLoadError,
}: ModalMediaBlockProps) {
  if (modalImg.omitModalMedia) return null;

  return (
    <div className="flex flex-col gap-6">
      {modalImg.modalVideoOnly && modalImg.modalVideoSrc ? (
        <div
          className={`w-full ${modalMediaFrameClass}`}
          style={modalImg.modalVideoOnlyFrameStyle}
        >
          <video
            ref={modalVideoRef}
            src={modalImg.modalVideoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="block w-full"
            style={modalImg.modalVideoOnlyStyle}
            onLoadedData={(e) => {
              setModalVideoLoadError(false);
              void e.currentTarget.play().catch(() => {});
            }}
            onError={() => setModalVideoLoadError(true)}
          />
          {modalVideoLoadError ? (
            <p className="mt-2 font-sans text-[13px] leading-snug text-red-700/90" role="alert">
              Video did not load. Add the file to{" "}
              <code className="rounded bg-black/[0.06] px-1 py-0.5 text-[12px]">
                public{modalImg.modalVideoSrc}
              </code>
            </p>
          ) : null}
        </div>
      ) : null}
      {modalImg.modalSideBySide && modalImg.modalVideoSrc ? (() => {
        const sbsPrimary = modalImg.modalPrimarySrc ?? modalImg.src;
        if (!sbsPrimary) return null;
        return (
          <div className="flex w-full items-end gap-4">
            <div
              className={`min-w-0 flex-1 overflow-hidden ${modalMediaFrameClass}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sbsPrimary}
                alt={modalImg.alt}
                className="h-full w-full object-cover object-left"
              />
            </div>
            <div
              className={`min-w-0 flex-1 overflow-hidden ${modalMediaFrameClass}`}
            >
              <video
                ref={modalVideoRef}
                src={modalImg.modalVideoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="h-full w-full object-cover object-left"
                onLoadedData={(e) => {
                  setModalVideoLoadError(false);
                  void e.currentTarget.play().catch(() => {});
                }}
                onError={() => setModalVideoLoadError(true)}
              />
            </div>
          </div>
        );
      })() : null}
      {!modalImg.modalVideoOnly && !modalImg.modalSideBySide ? (() => {
        const primarySrc = modalImg.modalPrimarySrc ?? modalImg.src;
        if (!primarySrc) {
          return (
            <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-black/15 bg-white px-6 py-12">
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
            <div className={`w-full ${modalMediaFrameClass}`}>
              <div className="relative w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={primarySrc}
                  alt={modalImg.alt}
                  className="relative z-0 block h-auto w-full"
                />
                {modalImg.modalVideoSrc ? (
                  <div
                    className="pointer-events-none absolute z-10 overflow-hidden rounded-r-lg"
                    style={modalVideoInsetStyle({
                      ...DEFAULT_MODAL_VIDEO_INSET,
                      ...modalImg.modalVideoInset,
                    })}
                    aria-hidden
                  >
                    <video
                      ref={modalVideoRef}
                      src={modalImg.modalVideoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="absolute inset-0 h-full w-full object-contain object-bottom"
                      onLoadedData={(e) => {
                        setModalVideoLoadError(false);
                        void e.currentTarget.play().catch(() => {});
                      }}
                      onError={() => setModalVideoLoadError(true)}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            {modalImg.modalVideoSrc && modalVideoLoadError ? (
              <p className="font-sans text-[13px] leading-snug text-red-700/90" role="alert">
                Video did not load. Add the file to{" "}
                <code className="rounded bg-black/[0.06] px-1 py-0.5 text-[12px]">
                  public{modalImg.modalVideoSrc}
                </code>
              </p>
            ) : null}
          </>
        );
      })() : null}
      {modalImg.modalSecondarySrc ? (
        <div className={modalMediaFrameClass}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={modalImg.modalSecondarySrc}
            alt="Supporting detail"
            className="block h-auto w-full"
          />
        </div>
      ) : null}
    </div>
  );
}

type VehrCompositeProps = {
  frame: CaseStudyHighlightFrame;
  baseId: string;
  modalVideoRef: React.RefObject<HTMLVideoElement | null>;
  modalVideoLoadError: boolean;
  setModalVideoLoadError: (v: boolean) => void;
  /** Per-frame row groupings (image indices). */
  compositeRowsByFrameId: Record<string, number[][]>;
};

const modalImageSourceClass =
  "mt-2 font-sans text-[16px] font-normal leading-[1.6] text-black/50";

/** Fresenius “Why it matters” / Impact proof blocks */
const WHY_QUOTE_FILL = "#076A8F";

/** Testimonials + quote lines below modal body (slides + composite). */
function ModalCopyFollowups({
  img,
  stackTestimonials = false,
  subtleTestimonials = false,
}: {
  img: CaseStudyHighlightImage;
  stackTestimonials?: boolean;
  subtleTestimonials?: boolean;
}) {
  return (
    <>
      {img.modalTestimonials && img.modalTestimonials.length > 0 ? (
        <div
          className={
            stackTestimonials
              ? "mt-3 flex w-full flex-col gap-3"
              : img.modalTestimonials.length >= 2
                ? "mt-1 flex w-full min-w-0 flex-row gap-px bg-white"
                : "mt-1 flex w-full flex-col"
          }
        >
          {img.modalTestimonials.map((t, qi) => (
            <div
              key={qi}
              className={
                subtleTestimonials
                  ? "flex min-h-0 min-w-0 flex-1 flex-col justify-between rounded-xl border border-black/[0.12] bg-[#F7F7F7] px-4 py-4 text-left font-sans sm:px-5 sm:py-5"
                  : "flex min-h-0 min-w-0 flex-1 flex-col justify-between px-4 py-4 text-left font-sans sm:px-5 sm:py-5"
              }
              style={subtleTestimonials ? undefined : { backgroundColor: WHY_QUOTE_FILL }}
            >
              <p
                className={
                  subtleTestimonials
                    ? "text-[16px] font-medium leading-[1.55] text-black/80 sm:text-[17px]"
                    : "text-[17px] font-semibold leading-[1.45] text-white sm:text-[18px]"
                }
              >
                {t.quote}
              </p>
              <div className="mt-3 flex min-w-0 items-center gap-2.5">
                {t.avatarSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.avatarSrc}
                    alt=""
                    className="h-9 w-9 shrink-0 rounded-full object-cover"
                    width={36}
                    height={36}
                  />
                ) : null}
                <p
                  className={
                    subtleTestimonials
                      ? "min-w-0 text-[12px] font-medium leading-snug text-black/60 sm:text-[13px]"
                      : "min-w-0 text-[12px] font-medium leading-snug text-white/85 sm:text-[13px]"
                  }
                >
                  {t.attribution}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {!img.modalTestimonials?.length &&
      img.modalQuoteLines &&
      img.modalQuoteLines.length > 0 ? (
        <div className="mt-4 flex flex-col gap-3 border-l-2 border-black/10 pl-4">
          {img.modalQuoteLines.map((line, qi) => (
            <p
              key={qi}
              className="font-sans text-[15px] font-normal leading-[1.55] text-black/80"
            >
              {line}
            </p>
          ))}
        </div>
      ) : null}
    </>
  );
}

function VehrCompositeFrameContent({
  frame,
  baseId,
  modalVideoRef,
  modalVideoLoadError,
  setModalVideoLoadError,
  compositeRowsByFrameId,
}: VehrCompositeProps) {
  const rows =
    compositeRowsByFrameId[frame.id] ??
    frame.images.map((_, i) => [i] as number[]);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-8 md:gap-10">
      {rows.map((row, ri) => {
        const isSplitRow = row.length > 1;
        const isImpactFrame = frame.id === "impact";

        if (!isSplitRow) {
          const imageIndex = row[0];
          const img = frame.images[imageIndex];
          if (!img) return null;
          const titleId =
            ri === 0 ? `${baseId}-modal-title` : undefined;
          const showCopy = !img.hideModalCopy;
          const copyBlock = (
            <div className="w-full min-w-0">
              {showCopy ? (
                <>
                  <h2
                    id={titleId}
                    className="font-sans text-[16px] font-semibold leading-[1.5] text-black"
                  >
                    {modalHeading(img)}
                  </h2>
                  {img.modalBody ? (
                    <p className="mt-2 font-sans text-[16px] font-normal leading-[1.6] text-black/75">
                      {img.modalBody}
                    </p>
                  ) : null}
                  {img.modalImageSource ? (
                    <p className={modalImageSourceClass}>{img.modalImageSource}</p>
                  ) : null}
                  <ModalCopyFollowups
                    img={img}
                    stackTestimonials={isImpactFrame}
                    subtleTestimonials={isImpactFrame}
                  />
                </>
              ) : null}
            </div>
          );
          const mediaBlock = (
            <div className="w-full">
              <ModalMediaBlock
                modalImg={img}
                modalVideoRef={modalVideoRef}
                modalVideoLoadError={modalVideoLoadError}
                setModalVideoLoadError={setModalVideoLoadError}
              />
            </div>
          );
          return (
            <div key={`row-${ri}`} className="w-full">
              <div className="flex min-w-0 flex-col gap-3">
                {!img.omitModalMedia ? (
                  <>
                    {mediaBlock}
                    {copyBlock}
                  </>
                ) : (
                  copyBlock
                )}
              </div>
            </div>
          );
        }

        return (
          <div
            key={`row-${ri}`}
            className="flex min-h-0 flex-1 flex-col gap-0"
          >
            <div className="flex min-h-0 flex-1 flex-col gap-8 md:flex-row md:gap-6 md:items-stretch">
              {row.map((imageIndex) => {
                const img = frame.images[imageIndex];
                if (!img) return null;
                const titleId =
                  ri === 0 && imageIndex === row[0]
                    ? `${baseId}-modal-title`
                    : undefined;
                const showCopy = !img.hideModalCopy;

                const copyBlock = (
                  <div
                    className={
                      isImpactFrame
                        ? "flex h-full w-full min-h-0 flex-col"
                        : "w-full"
                    }
                  >
                    {showCopy ? (
                      <>
                        <h2
                          id={titleId}
                          className="font-sans text-[16px] font-semibold leading-[1.5] text-black"
                        >
                          {modalHeading(img)}
                        </h2>
                        {img.modalBody ? (
                          <p className="mt-2 font-sans text-[16px] font-normal leading-[1.6] text-black/75">
                            {img.modalBody}
                          </p>
                        ) : null}
                        {img.modalImageSource ? (
                          <p className={modalImageSourceClass}>
                            {img.modalImageSource}
                          </p>
                        ) : null}
                        <div className={isImpactFrame ? "mt-4 md:mt-auto" : ""}>
                          <ModalCopyFollowups
                            img={img}
                            stackTestimonials={isImpactFrame}
                            subtleTestimonials={isImpactFrame}
                          />
                        </div>
                      </>
                    ) : null}
                  </div>
                );

                const mediaBlock = (
                  <div
                    className={`w-full shrink-0 ${
                      !showCopy ? "md:flex md:min-h-0 md:flex-1" : ""
                    }`}
                  >
                    <ModalMediaBlock
                      modalImg={img}
                      modalVideoRef={modalVideoRef}
                      modalVideoLoadError={modalVideoLoadError}
                      setModalVideoLoadError={setModalVideoLoadError}
                    />
                  </div>
                );

                return (
                  <div
                    key={`${ri}-${imageIndex}`}
                    className="flex min-h-0 min-w-0 flex-1 basis-0 flex-col"
                  >
                    <div className="flex min-h-0 min-w-0 flex-col gap-3 md:flex-1 md:min-h-0 md:gap-0">
                      {showCopy ? (
                        <div className={isImpactFrame ? "min-h-0 md:flex-1" : "shrink-0"}>
                          {copyBlock}
                        </div>
                      ) : null}
                      {showCopy && !img.omitModalMedia ? (
                        <div
                          className="hidden min-h-0 flex-1 md:block"
                          aria-hidden
                        />
                      ) : null}
                      {!img.omitModalMedia ? mediaBlock : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Close: no chrome; sits on light modal header */
const modalCloseButtonClass =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-[32px] font-light leading-none text-black/55 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/25";

/** Prev/next on dark backdrop (desktop, beside modal) */
const modalNavArrowDesktopClass =
  "inline-flex h-12 w-12 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40";

/** Prev/next on light mobile footer bar */
const modalNavArrowMobileClass =
  "inline-flex h-12 w-12 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-black/75 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/25";

function NavChevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="M15 6l-6 6 6 6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

const CaseStudyHighlights = forwardRef<
  CaseStudyHighlightsHandle,
  { data: CaseStudyHighlightsData }
>(function CaseStudyHighlights({ data }, ref) {
  const {
    frames,
    modalPresentation = "slides",
    compositeRows: compositeRowsFromData,
  } = data;
  /** Used only when `modalPresentation === "composite-vehr"` (same layout component as VEHR). */
  const compositeRowsByFrameId =
    compositeRowsFromData ?? DEFAULT_COMPOSITE_ROWS_VEHR;
  const baseId = useId();
  const [modal, setModal] = useState<ModalState>(null);
  const [portalReady, setPortalReady] = useState(false);
  const [modalVideoLoadError, setModalVideoLoadError] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!modal) setModalVideoLoadError(false);
  }, [modal]);

  const closeModal = useCallback(() => setModal(null), []);

  useImperativeHandle(
    ref,
    () => ({
      openFirstProblemModal: () => {
        if (!frames[0]?.images?.length) return;
        if (modalPresentation === "composite-vehr") {
          setModal({ kind: "composite", frameIndex: 0 });
        } else {
          setModal({
            kind: "slides",
            globalIndex: localToGlobal(frames, 0, 0),
          });
        }
      },
    }),
    [frames, modalPresentation]
  );

  const modalTotal = totalImageCount(frames);
  const modalLocal =
    modal?.kind === "slides" && modalTotal > 0
      ? globalToLocal(frames, modal.globalIndex)
      : null;
  const modalImg =
    modalLocal &&
    frames[modalLocal.frameIndex]?.images[modalLocal.imageIndex]
      ? frames[modalLocal.frameIndex].images[modalLocal.imageIndex]
      : null;

  const modalScrollRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const goPrev = useCallback(() => {
    setModal((m) => {
      if (!m) return m;
      if (m.kind === "composite") {
        const n = frames.length;
        if (n <= 1) return m;
        return {
          kind: "composite",
          frameIndex: (m.frameIndex - 1 + n) % n,
        };
      }
      const total = totalImageCount(frames);
      if (total <= 1) return m;
      return {
        kind: "slides",
        globalIndex: (m.globalIndex - 1 + total) % total,
      };
    });
  }, [frames]);

  const goNext = useCallback(() => {
    setModal((m) => {
      if (!m) return m;
      if (m.kind === "composite") {
        const n = frames.length;
        if (n <= 1) return m;
        return {
          kind: "composite",
          frameIndex: (m.frameIndex + 1) % n,
        };
      }
      const total = totalImageCount(frames);
      if (total <= 1) return m;
      return {
        kind: "slides",
        globalIndex: (m.globalIndex + 1) % total,
      };
    });
  }, [frames]);

  const goToFrameTab = useCallback(
    (frameIndex: number) => {
      if (!frames[frameIndex]?.images?.length) return;
      if (modalPresentation === "composite-vehr") {
        setModal({ kind: "composite", frameIndex: frameIndex });
      } else {
        setModal({
          kind: "slides",
          globalIndex: localToGlobal(frames, frameIndex, 0),
        });
      }
    },
    [frames, modalPresentation]
  );

  /** Reset scroll when slide or tab changes so content always starts at top. */
  useEffect(() => {
    if (!modal) return;
    const el = modalScrollRef.current;
    if (el) el.scrollTop = 0;
  }, [
    modal?.kind === "slides" ? modal.globalIndex : modal?.frameIndex,
    modal,
  ]);

  /** Ensure modal video plays after the portal mounts the video element. */
  useEffect(() => {
    if (!modal || modal.kind !== "slides" || !modalImg?.modalVideoSrc) return;
    setModalVideoLoadError(false);
    const t = window.setTimeout(() => {
      modalVideoRef.current?.play().catch(() => {});
    }, 0);
    return () => window.clearTimeout(t);
  }, [modal, modalImg?.modalVideoSrc]);

  /** Mobile (≤800px): horizontal swipe to change slide or section. */
  useEffect(() => {
    if (!modal) return;
    const navigable =
      (modal.kind === "slides" && modalTotal > 1) ||
      (modal.kind === "composite" && frames.length > 1);
    if (!navigable) return;
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
      if (e.changedTouches.length !== 1) return;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dx = endX - startX;
      const dy = endY - startY;
      if (Math.abs(dx) < 40) return;
      if (Math.abs(dx) < Math.abs(dy) * 1.15) return;
      if (dx > 0) goPrev();
      else goNext();
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [modal, modalTotal, frames.length, goPrev, goNext]);

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
        goPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, closeModal, goPrev, goNext]);

  useEffect(() => {
    if (modal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);

  if (!frames.length) return null;

  const modalNavigable =
    modal !== null &&
    ((modal.kind === "slides" && modalTotal > 1) ||
      (modal.kind === "composite" && frames.length > 1));

  return (
    <>
      {portalReady &&
        modal &&
        ((modal.kind === "slides" && modalImg && modalLocal) ||
          (modal.kind === "composite" && frames[modal.frameIndex])) &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] m-0 flex cursor-pointer max-[800px]:h-[100dvh] max-[800px]:min-h-[100dvh] max-[800px]:w-screen max-[800px]:max-w-[100vw] max-[800px]:min-w-0 max-[800px]:flex-col max-[800px]:bg-[#FAFAFA] max-[800px]:p-0 min-[801px]:items-center min-[801px]:justify-center min-[801px]:bg-black/80 min-[801px]:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${baseId}-modal-title`}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
          <div className="flex min-h-0 w-full flex-1 flex-col items-stretch max-[800px]:min-h-0 max-[800px]:flex-1 min-[801px]:flex-row min-[801px]:items-center min-[801px]:justify-center min-[801px]:gap-3">
          {modalNavigable ? (
            <button
              type="button"
              className={`z-[102] hidden shrink-0 min-[801px]:inline-flex ${modalNavArrowDesktopClass}`}
              aria-label={
                modal?.kind === "composite"
                  ? "Previous section"
                  : "Previous item"
              }
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
            >
              <NavChevron direction="left" />
            </button>
          ) : null}

          <div
            className="pointer-events-auto relative z-[101] flex min-h-0 w-full max-w-[1120px] cursor-default flex-col overflow-hidden rounded-none border-0 bg-[#FAFAFA] shadow-none max-[800px]:h-[100dvh] max-[800px]:max-h-[100dvh] max-[800px]:min-h-0 max-[800px]:w-screen max-[800px]:max-w-[100vw] max-[800px]:flex-1 min-[801px]:h-[min(85dvh,720px)] min-[801px]:max-h-[720px] min-[801px]:w-[min(100%,1120px)] min-[801px]:min-w-0 min-[801px]:shrink-0 min-[801px]:rounded-xl min-[801px]:border min-[801px]:border-black/[0.08] min-[801px]:shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="shrink-0 border-b border-black/[0.08] bg-[#FAFAFA] px-4 pb-0 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
              <div className="flex items-start justify-between gap-3">
                <nav
                  className="min-w-0 flex-1"
                  aria-label="Case study sections"
                >
                  <ul className="flex flex-wrap gap-x-1 gap-y-1 sm:gap-x-2" role="tablist">
                    {frames.map((frame, fi) => {
                      const active =
                        modal.kind === "composite"
                          ? modal.frameIndex === fi
                          : modalLocal !== null && modalLocal.frameIndex === fi;
                      return (
                        <li key={frame.id} role="presentation">
                          <button
                            type="button"
                            role="tab"
                            aria-selected={active}
                            className={`border-b-2 px-2 py-2.5 font-sans text-[16px] font-semibold leading-[1.5] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/25 ${
                              active
                                ? "border-black text-black"
                                : "border-transparent text-black/45 hover:text-black/75"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              goToFrameTab(fi);
                            }}
                          >
                            {frame.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <button
                  type="button"
                  className={`shrink-0 ${modalCloseButtonClass}`}
                  aria-label="Close"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                  }}
                >
                  <span aria-hidden>×</span>
                </button>
              </div>
            </header>

            <div
              ref={modalScrollRef}
              className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain"
            >
              {modal.kind === "composite" ? (
                <div className="flex min-h-full flex-1 flex-col px-5 pb-[100px] pt-6 sm:px-8 sm:pt-8">
                  <VehrCompositeFrameContent
                    frame={frames[modal.frameIndex]}
                    baseId={baseId}
                    modalVideoRef={modalVideoRef}
                    modalVideoLoadError={modalVideoLoadError}
                    setModalVideoLoadError={setModalVideoLoadError}
                    compositeRowsByFrameId={compositeRowsByFrameId}
                  />
                </div>
              ) : modal.kind === "slides" && modalImg && modalLocal ? (
                <div className="flex flex-col gap-8 px-5 py-8 sm:px-8 sm:py-10 md:gap-10">
                  {!modalImg.hideModalCopy ? (
                    <div className="flex w-full min-w-0 flex-col gap-3">
                      <h2
                        id={`${baseId}-modal-title`}
                        className="font-sans text-[16px] font-semibold leading-[1.5] text-black"
                      >
                        {modalHeading(modalImg)}
                      </h2>
                      {modalImg.modalBody ? (
                        <p className="font-sans text-[16px] font-normal leading-[1.6] text-black/75">
                          {modalImg.modalBody}
                        </p>
                      ) : null}
                      {modalImg.modalImageSource ? (
                        <p className={modalImageSourceClass}>
                          {modalImg.modalImageSource}
                        </p>
                      ) : null}
                      <ModalCopyFollowups img={modalImg} />
                    </div>
                  ) : null}
                  {!modalImg.omitModalMedia ? (
                    <ModalMediaBlock
                      modalImg={modalImg}
                      modalVideoRef={modalVideoRef}
                      modalVideoLoadError={modalVideoLoadError}
                      setModalVideoLoadError={setModalVideoLoadError}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>

          {modalNavigable ? (
            <div
              className="flex shrink-0 cursor-default items-center justify-center gap-8 border-t border-black/[0.08] bg-[#FAFAFA] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] max-[800px]:flex min-[801px]:hidden"
              role="group"
              aria-label="Previous and next"
            >
              <button
                type="button"
                className={modalNavArrowMobileClass}
                aria-label={
                  modal.kind === "composite"
                    ? "Previous section"
                    : "Previous item"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
              >
                <NavChevron direction="left" />
              </button>
              <button
                type="button"
                className={modalNavArrowMobileClass}
                aria-label={
                  modal.kind === "composite" ? "Next section" : "Next item"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
              >
                <NavChevron direction="right" />
              </button>
            </div>
          ) : null}
          </div>

          {modalNavigable ? (
            <button
              type="button"
              className={`z-[102] hidden shrink-0 min-[801px]:inline-flex ${modalNavArrowDesktopClass}`}
              aria-label={
                modal?.kind === "composite" ? "Next section" : "Next item"
              }
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
            >
              <NavChevron direction="right" />
            </button>
          ) : null}
          </div>
        </div>,
          document.body
        )}
    </>
  );
});

CaseStudyHighlights.displayName = "CaseStudyHighlights";

export default CaseStudyHighlights;
