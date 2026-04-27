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
  /**
   * In a side-by-side pair (`modalTestimonials.length >= 2`), stretched cards share row height.
   * `between` (default): quote top, attribution bottom.
   * `center`: quote + attribution grouped and vertically centered (for short quotes).
   */
  contentAlign?: "between" | "center";
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
  /** Multiple body paragraphs (when set, used instead of `modalBody`) */
  modalBodyParagraphs?: string[];
  /** Optional attribution under modal body (same size as body, typically lighter) */
  modalImageSource?: string;
  /** Caption below modal image or video (editorial context, not the heading) */
  modalMediaCaption?: string;
  /**
   * Optional Tailwind classes on the framed media box (e.g. `aspect-[4/3]`) so paired
   * columns (still + video) can share height and clip video with object-cover.
   */
  modalMediaFrameAspectClass?: string;
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
  /** Optional still image overlaid on the bottom-right of the primary modal image (e.g. phone mockup) */
  modalImageOverlaySrc?: string;
  modalImageOverlayAlt?: string;
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
  /**
   * Modal chrome above section tabs: project title and company on the left, separated by " / ",
   * with the close control on the right in the same row; tabs sit on the row below.
   */
  modalBrandHeader?: {
    projectTitle: string;
    company: string;
    /** Optional centered body-sized line above the title/company row */
    intro?: string;
  };
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

function clampInt(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

function compositePageCountForFrame(
  frame: CaseStudyHighlightFrame,
  compositeRowsByFrameId: Record<string, number[][]>
): number {
  // Only these VEHR-style composite tabs are paginated 1-up in our modal.
  if (
    frame.id !== "problem" &&
    frame.id !== "solution" &&
    frame.id !== "whyItMatters" &&
    frame.id !== "mismatchOverload" &&
    frame.id !== "researchMapping" &&
    frame.id !== "domainArchitecture" &&
    frame.id !== "burdensomeNoVisibility" &&
    frame.id !== "mappingWireframing" &&
    frame.id !== "prototypingDeploying"
  ) {
    return 1;
  }
  const rows =
    compositeRowsByFrameId[frame.id] ??
    frame.images.map((_, i) => [i] as number[]);
  // The 1-up pagination is enabled when the tab has a single split row with 2 items.
  const hasTwoUpRow = rows.some((r) => r.length === 2);
  return hasTwoUpRow ? 2 : 1;
}

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

/** Same frame but visible overflow so image overlays can extend past the right edge */
const modalMediaFrameClassOverflowVisible =
  "overflow-visible rounded-xl border border-black/[0.12] bg-white";

type ModalMediaBlockProps = {
  modalImg: CaseStudyHighlightImage;
  modalVideoRef: React.RefObject<HTMLVideoElement | null>;
  modalVideoLoadError: boolean;
  setModalVideoLoadError: (v: boolean) => void;
  /** When true, caption is omitted so the parent can align captions in a shared row (e.g. Mapping grid). */
  omitCaption?: boolean;
  /**
   * When true with `modalVideoOnly`, the framed video expands to fill the parent height
   * (e.g. CSS grid cell spanning copy + still rows). Video uses object-cover; aspect ratio preserved with clipping.
   */
  videoFillGridCell?: boolean;
  /**
   * Challenge split-row: pull media up by ~½ of the copy↔media gap and add space under the frame so captions stay aligned.
   */
  challengeSplitMedia?: boolean;
};

/** Primary image / video / side-by-side / secondary — shared by slide and composite modals. */
const modalCaptionClass =
  "mt-1.5 font-sans text-[12px] font-normal leading-snug text-black/55 sm:text-[13px]";

const modalCaptionTextClass =
  "font-sans text-[12px] font-normal leading-snug text-black/55 sm:text-[13px]";

function ModalMediaBlock({
  modalImg,
  modalVideoRef,
  modalVideoLoadError,
  setModalVideoLoadError,
  omitCaption = false,
  videoFillGridCell = false,
  challengeSplitMedia = false,
}: ModalMediaBlockProps) {
  if (modalImg.omitModalMedia) return null;

  const captionClassName = challengeSplitMedia
    ? `mt-4 ${modalCaptionTextClass}`
    : modalCaptionClass;

  const caption =
    !omitCaption &&
    modalImg.modalMediaCaption != null &&
    modalImg.modalMediaCaption !== "" ? (
      <p className={captionClassName}>{modalImg.modalMediaCaption}</p>
    ) : null;

  const useFillHeightVideo =
    modalImg.modalVideoOnly && videoFillGridCell;

  return (
    <div
      className={`flex w-full min-w-0 flex-col gap-4 ${
        useFillHeightVideo ? "h-full min-h-0" : ""
      }`}
    >
      {modalImg.modalVideoOnly && modalImg.modalVideoSrc ? (
        <div
          className={`flex w-full min-w-0 flex-col ${
            useFillHeightVideo ? "h-full min-h-0" : ""
          }`}
        >
          <div
            data-modal-framed-media
            className={`w-full max-w-none ${modalMediaFrameClass} ${
              useFillHeightVideo
                ? "min-h-0 flex-1 overflow-hidden"
                : modalImg.modalMediaFrameAspectClass ?? ""
            }`}
            style={{
              ...modalImg.modalVideoOnlyFrameStyle,
            }}
          >
            <video
              ref={modalVideoRef}
              src={modalImg.modalVideoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className={
                useFillHeightVideo
                  ? "block h-full min-h-0 w-full object-cover object-top"
                  : modalImg.modalMediaFrameAspectClass
                    ? "block h-full min-h-0 w-full object-cover object-top"
                    : "block w-full"
              }
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
          {caption}
        </div>
      ) : null}
      {modalImg.modalSideBySide && modalImg.modalVideoSrc ? (() => {
        const sbsPrimary = modalImg.modalPrimarySrc ?? modalImg.src;
        if (!sbsPrimary) return null;
        return (
          <div className="flex flex-col">
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
            {caption}
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
          <div className="flex w-full min-w-0 flex-col">
            <div
              data-modal-framed-media
              className={`w-full ${
                modalImg.modalImageOverlaySrc
                  ? modalMediaFrameClassOverflowVisible
                  : modalMediaFrameClass
              } ${modalImg.modalMediaFrameAspectClass ?? ""} ${
                challengeSplitMedia ? "-mt-2.5 md:-mt-2.5" : ""
              }`}
            >
              <div
                className={
                  modalImg.modalMediaFrameAspectClass
                    ? "relative h-full min-h-0 w-full"
                    : "relative w-full"
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={primarySrc}
                  alt={modalImg.alt}
                  className={
                    modalImg.modalMediaFrameAspectClass
                      ? "relative z-0 block h-full w-full object-contain object-top"
                      : "relative z-0 block h-auto w-full"
                  }
                />
                {modalImg.modalImageOverlaySrc ? (
                  <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-end">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={modalImg.modalImageOverlaySrc}
                      alt={modalImg.modalImageOverlayAlt ?? ""}
                      className="block h-[calc(100%-220px)] w-auto max-h-[calc(100%-220px)] translate-x-5"
                    />
                  </div>
                ) : null}
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
            {caption}
          </div>
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
  /** Per-frame “page” index for composite tabs that show one highlight at a time. */
  compositePageIndexByFrameId: Record<string, number | undefined>;
  setCompositePageIndexByFrameId: React.Dispatch<
    React.SetStateAction<Record<string, number | undefined>>
  >;
};

const modalImageSourceClass =
  "mt-2 font-sans text-[16px] font-normal leading-[1.6] text-black/50";

const modalBodyTextClass =
  "font-sans text-[16px] font-normal leading-[1.6] text-black/75";

function ModalBodyBlocks({ img }: { img: CaseStudyHighlightImage }) {
  if (img.modalBodyParagraphs && img.modalBodyParagraphs.length > 0) {
    return (
      <div className="mt-2 flex flex-col gap-3">
        {img.modalBodyParagraphs.map((para, i) => (
          <p key={i} className={modalBodyTextClass}>
            {para}
          </p>
        ))}
      </div>
    );
  }
  if (img.modalBody) {
    return <p className={`mt-2 ${modalBodyTextClass}`}>{img.modalBody}</p>;
  }
  return null;
}

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
  const testimonials = img.modalTestimonials;
  return (
    <>
      {testimonials && testimonials.length > 0 ? (
        <div
          className={
            stackTestimonials
              ? testimonials.length >= 2
                ? "flex min-h-0 w-full flex-1 flex-col justify-end gap-3"
                : "mt-3 flex w-full flex-col gap-3"
              : testimonials.length >= 2
                ? "mt-1 flex w-full min-w-0 flex-row items-stretch gap-px bg-white"
                : "mt-1 flex w-full flex-col"
          }
        >
          {testimonials.map((t, qi) => {
            const alignCenter = t.contentAlign === "center";
            const growInStack =
              stackTestimonials && testimonials.length >= 2 && alignCenter;
            return (
            <div
              key={qi}
              className={
                subtleTestimonials
                  ? `flex min-h-0 min-w-0 flex-col rounded-xl border border-black/[0.12] bg-[#F7F7F7] px-4 py-4 text-left font-sans sm:px-5 sm:py-5 ${
                      alignCenter ? "justify-center gap-3" : "justify-between"
                    } ${
                      stackTestimonials && testimonials.length >= 2
                        ? growInStack
                          ? "min-h-0 flex-1"
                          : "shrink-0"
                        : testimonials.length >= 2
                          ? "flex-1 self-stretch"
                          : ""
                    }`
                  : `flex min-h-0 min-w-0 flex-col px-4 py-4 text-left font-sans sm:px-5 sm:py-5 ${
                      alignCenter ? "justify-center gap-3" : "justify-between"
                    } ${
                      stackTestimonials && testimonials.length >= 2
                        ? growInStack
                          ? "min-h-0 flex-1"
                          : "shrink-0"
                        : testimonials.length >= 2
                          ? "flex-1 self-stretch"
                          : ""
                    }`
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
              <div
                className={
                  alignCenter
                    ? "flex min-w-0 items-center gap-2.5"
                    : "mt-3 flex min-w-0 items-center gap-2.5"
                }
              >
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
            );
          })}
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
  compositePageIndexByFrameId,
  setCompositePageIndexByFrameId,
}: VehrCompositeProps) {
  const rows =
    compositeRowsByFrameId[frame.id] ??
    frame.images.map((_, i) => [i] as number[]);
  const selectedPageIndex = compositePageIndexByFrameId[frame.id] ?? 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5 md:gap-6">
      {rows.map((row, ri) => {
        const isSplitRow = row.length > 1;
        const isImpactFrame =
          frame.id === "impact" || frame.id === "impactValidation";
        /**
         * Single-row: text left (~30%) + media right (~70%), sm+.
         * Excludes Fresenius-style Impact (text-led cards; see `omitModalMedia` fallback below).
         */
        const isCopyLeftMediaRightLayout = frame.id !== "impact";

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
                  <ModalBodyBlocks img={img} />
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
          if (
            isCopyLeftMediaRightLayout &&
            !img.omitModalMedia &&
            showCopy
          ) {
            return (
              <div key={`row-${ri}`} className="w-full">
                <div className="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] sm:items-start sm:gap-x-8 sm:gap-y-0">
                  <div className="min-w-0">{copyBlock}</div>
                  <div className="min-w-0">{mediaBlock}</div>
                </div>
              </div>
            );
          }
          return (
            <div key={`row-${ri}`} className="w-full">
              <div className="flex min-w-0 flex-col gap-5">
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

        /** Fresenius Mapping: copy (~30%) top-aligned; still image, then MP4 (~70%), captions under each. */
        if (isSplitRow && frame.id === "mapping" && row.length === 2) {
          const imgStill = frame.images[row[0]];
          const imgVideo = frame.images[row[1]];
          if (!imgStill || !imgVideo) return null;
          const titleId = ri === 0 ? `${baseId}-modal-title` : undefined;

          return (
            <div key={`row-${ri}`} className="w-full">
              <div className="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] sm:items-start sm:gap-x-8 sm:gap-y-0">
                <div className="min-w-0 self-start">
                  {!imgStill.hideModalCopy ? (
                    <>
                      <h2
                        id={titleId}
                        className="font-sans text-[16px] font-semibold leading-[1.5] text-black"
                      >
                        {modalHeading(imgStill)}
                      </h2>
                      <ModalBodyBlocks img={imgStill} />
                      {imgStill.modalImageSource ? (
                        <p className={modalImageSourceClass}>
                          {imgStill.modalImageSource}
                        </p>
                      ) : null}
                      <ModalCopyFollowups img={imgStill} />
                    </>
                  ) : null}
                </div>
                <div className="flex min-w-0 flex-col gap-6 self-start">
                  {!imgStill.omitModalMedia ? (
                    <ModalMediaBlock
                      modalImg={imgStill}
                      modalVideoRef={modalVideoRef}
                      modalVideoLoadError={modalVideoLoadError}
                      setModalVideoLoadError={setModalVideoLoadError}
                    />
                  ) : null}
                  {!imgVideo.omitModalMedia ? (
                    <ModalMediaBlock
                      modalImg={imgVideo}
                      modalVideoRef={modalVideoRef}
                      modalVideoLoadError={modalVideoLoadError}
                      setModalVideoLoadError={setModalVideoLoadError}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          );
        }

        /**
         * Two-image tabs (Problem / Solution / Why it matters): stacked 30/70 bands — each
         * heading+body top-aligns with its media; captions via `modalMediaCaption` under media.
         */
        if (
          isSplitRow &&
          row.length === 2 &&
          (frame.id === "problem" ||
            frame.id === "solution" ||
            frame.id === "whyItMatters" ||
            frame.id === "mismatchOverload" ||
            frame.id === "researchMapping" ||
            frame.id === "domainArchitecture" ||
            frame.id === "burdensomeNoVisibility" ||
            frame.id === "mappingWireframing" ||
            frame.id === "prototypingDeploying")
        ) {
          const pageCount = 2;
          const safePageIndex = clampInt(selectedPageIndex, 0, pageCount - 1);
          const img = frame.images[row[safePageIndex]];
          if (!img) return null;
          const titleId = ri === 0 ? `${baseId}-modal-title` : undefined;

          const problemPairRow = (
            img: CaseStudyHighlightImage,
            headingId: string | undefined
          ) => (
            <div
              key={img.src ?? img.modalTitle ?? img.alt}
              className="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] sm:items-start sm:gap-x-8"
            >
              <div className="min-w-0 self-start">
                {!img.hideModalCopy ? (
                  <>
                    <h2
                      id={headingId}
                      className="font-sans text-[16px] font-semibold leading-[1.5] text-black"
                    >
                      {modalHeading(img)}
                    </h2>
                    <ModalBodyBlocks img={img} />
                    <ModalCopyFollowups img={img} />
                  </>
                ) : null}
              </div>
              <div className="min-w-0 self-start">
                {!img.omitModalMedia ? (
                  <ModalMediaBlock
                    modalImg={img}
                    modalVideoRef={modalVideoRef}
                    modalVideoLoadError={modalVideoLoadError}
                    setModalVideoLoadError={setModalVideoLoadError}
                  />
                ) : null}
              </div>
            </div>
          );

          return (
            <div
              key={`row-${ri}`}
              className="flex w-full flex-col gap-10 sm:gap-12"
            >
              {problemPairRow(img, titleId)}
              <div className="flex w-full justify-center">
                <div
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.10] bg-white px-3 py-1.5 font-sans text-[13px] leading-none text-black/55"
                  role="group"
                  aria-label="Page"
                >
                  {[0, 1].map((pi) => {
                    const active = pi === safePageIndex;
                    return (
                      <button
                        key={pi}
                        type="button"
                        className={`px-1.5 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/25 ${
                          active
                            ? "font-semibold text-black"
                            : "font-medium text-black/45 hover:text-black/70"
                        }`}
                        aria-current={active ? "page" : undefined}
                        aria-label={`Page ${pi + 1} of ${pageCount}`}
                        onClick={() => {
                          setCompositePageIndexByFrameId((prev) => ({
                            ...prev,
                            [frame.id]: pi,
                          }));
                        }}
                      >
                        {pi + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }

        /**
         * Two-up rows: all headings + body copy in one column (~30%), both media items
         * stacked in the other (~70%). All composite tabs except Impact; Mapping uses the branch above.
         */
        if (isSplitRow && row.length === 2 && frame.id !== "impact") {
          const imgA = frame.images[row[0]];
          const imgB = frame.images[row[1]];
          if (!imgA || !imgB) return null;
          const titleId = ri === 0 ? `${baseId}-modal-title` : undefined;

          return (
            <div key={`row-${ri}`} className="w-full">
              <div className="grid w-full min-w-0 grid-cols-1 gap-8 sm:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] sm:items-start sm:gap-x-8 sm:gap-y-0">
                <div className="flex min-w-0 flex-col gap-8">
                  {!imgA.hideModalCopy ? (
                    <div className="min-w-0">
                      <h2
                        id={titleId}
                        className="font-sans text-[16px] font-semibold leading-[1.5] text-black"
                      >
                        {modalHeading(imgA)}
                      </h2>
                      <ModalBodyBlocks img={imgA} />
                      {imgA.modalImageSource ? (
                        <p className={modalImageSourceClass}>
                          {imgA.modalImageSource}
                        </p>
                      ) : null}
                      <ModalCopyFollowups img={imgA} />
                    </div>
                  ) : null}
                  {!imgB.hideModalCopy ? (
                    <div className="min-w-0">
                      <h2
                        className="font-sans text-[16px] font-semibold leading-[1.5] text-black"
                      >
                        {modalHeading(imgB)}
                      </h2>
                      <ModalBodyBlocks img={imgB} />
                      {imgB.modalImageSource ? (
                        <p className={modalImageSourceClass}>
                          {imgB.modalImageSource}
                        </p>
                      ) : null}
                      <ModalCopyFollowups img={imgB} />
                    </div>
                  ) : null}
                </div>
                <div className="flex min-w-0 flex-col gap-6">
                  {!imgA.omitModalMedia ? (
                    <ModalMediaBlock
                      modalImg={imgA}
                      modalVideoRef={modalVideoRef}
                      modalVideoLoadError={modalVideoLoadError}
                      setModalVideoLoadError={setModalVideoLoadError}
                    />
                  ) : null}
                  {!imgB.omitModalMedia ? (
                    <ModalMediaBlock
                      modalImg={imgB}
                      modalVideoRef={modalVideoRef}
                      modalVideoLoadError={modalVideoLoadError}
                      setModalVideoLoadError={setModalVideoLoadError}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          );
        }

        return (
          <div
            key={`row-${ri}`}
            className="flex min-h-0 flex-1 flex-col gap-0"
          >
            <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-5 md:flex-row md:gap-5 md:items-stretch">
              {row.map((imageIndex) => {
                const img = frame.images[imageIndex];
                if (!img) return null;
                const titleId =
                  ri === 0 && imageIndex === row[0]
                    ? `${baseId}-modal-title`
                    : undefined;
                const showCopy = !img.hideModalCopy;
                const isChallengeSplit =
                  frame.id === "challenge" && isSplitRow;

                const copyBlock = (
                  <div
                    className={
                      isImpactFrame
                        ? "flex h-full min-h-0 w-full flex-col"
                        : "w-full"
                    }
                  >
                    {showCopy ? (
                      <>
                        {isImpactFrame ? (
                          <div className="min-w-0 shrink-0">
                            <h2
                              id={titleId}
                              className="font-sans text-[16px] font-semibold leading-[1.5] text-black"
                            >
                              {modalHeading(img)}
                            </h2>
                            <ModalBodyBlocks img={img} />
                            {img.modalImageSource ? (
                              <p className={modalImageSourceClass}>
                                {img.modalImageSource}
                              </p>
                            ) : null}
                          </div>
                        ) : (
                          <>
                            <h2
                              id={titleId}
                              className="font-sans text-[16px] font-semibold leading-[1.5] text-black"
                            >
                              {modalHeading(img)}
                            </h2>
                            <ModalBodyBlocks img={img} />
                            {img.modalImageSource ? (
                              <p className={modalImageSourceClass}>
                                {img.modalImageSource}
                              </p>
                            ) : null}
                          </>
                        )}
                        <div
                          className={
                            isImpactFrame
                              ? "mt-6 flex min-h-0 flex-1 flex-col md:mt-10"
                              : ""
                          }
                        >
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
                    className={`w-full min-w-0 shrink-0 ${
                      !showCopy ? "md:flex md:min-h-0 md:flex-1" : ""
                    }`}
                  >
                    <ModalMediaBlock
                      modalImg={img}
                      modalVideoRef={modalVideoRef}
                      modalVideoLoadError={modalVideoLoadError}
                      setModalVideoLoadError={setModalVideoLoadError}
                      challengeSplitMedia={isChallengeSplit}
                    />
                  </div>
                );

                return (
                  <div
                    key={`${ri}-${imageIndex}`}
                    className="flex min-h-0 min-w-0 flex-1 basis-0 flex-col"
                  >
                    <div
                      className="flex min-h-0 min-w-0 flex-col gap-4 md:flex-1 md:min-h-0 md:gap-5"
                    >
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
    modalBrandHeader: brandHeader,
  } = data;
  /** Used only when `modalPresentation === "composite-vehr"` (same layout component as VEHR). */
  const compositeRowsByFrameId =
    compositeRowsFromData ?? DEFAULT_COMPOSITE_ROWS_VEHR;
  const baseId = useId();
  const [modal, setModal] = useState<ModalState>(null);
  const [portalReady, setPortalReady] = useState(false);
  const [modalVideoLoadError, setModalVideoLoadError] = useState(false);
  const [compositePageIndexByFrameId, setCompositePageIndexByFrameId] = useState<
    Record<string, number | undefined>
  >({});
  const compositePageIndexByFrameIdRef = useRef<Record<string, number | undefined>>(
    {}
  );

  useEffect(() => {
    compositePageIndexByFrameIdRef.current = compositePageIndexByFrameId;
  }, [compositePageIndexByFrameId]);

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
          setCompositePageIndexByFrameId({});
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
        const currentFrame = frames[m.frameIndex];
        const currentFrameId = currentFrame?.id ?? "";
        const currentPageCount = currentFrame
          ? compositePageCountForFrame(currentFrame, compositeRowsByFrameId)
          : 1;
        const currentPageIndex =
          compositePageIndexByFrameIdRef.current[currentFrameId] ?? 0;

        if (currentPageCount > 1 && currentPageIndex > 0) {
          setCompositePageIndexByFrameId((prev) => ({
            ...prev,
            [currentFrameId]: currentPageIndex - 1,
          }));
          return m;
        }

        const prevFrameIndex = (m.frameIndex - 1 + n) % n;
        const prevFrame = frames[prevFrameIndex];
        const prevFrameId = prevFrame?.id ?? "";
        const prevPageCount = prevFrame
          ? compositePageCountForFrame(prevFrame, compositeRowsByFrameId)
          : 1;

        setCompositePageIndexByFrameId((prev) => ({
          ...prev,
          [prevFrameId]: Math.max(0, prevPageCount - 1),
        }));
        return { kind: "composite", frameIndex: prevFrameIndex };
      }
      const total = totalImageCount(frames);
      if (total <= 1) return m;
      return {
        kind: "slides",
        globalIndex: (m.globalIndex - 1 + total) % total,
      };
    });
  }, [frames, compositeRowsByFrameId]);

  const goNext = useCallback(() => {
    setModal((m) => {
      if (!m) return m;
      if (m.kind === "composite") {
        const n = frames.length;
        if (n <= 1) return m;
        const currentFrame = frames[m.frameIndex];
        const currentFrameId = currentFrame?.id ?? "";
        const currentPageCount = currentFrame
          ? compositePageCountForFrame(currentFrame, compositeRowsByFrameId)
          : 1;
        const currentPageIndex =
          compositePageIndexByFrameIdRef.current[currentFrameId] ?? 0;

        if (currentPageCount > 1 && currentPageIndex < currentPageCount - 1) {
          setCompositePageIndexByFrameId((prev) => ({
            ...prev,
            [currentFrameId]: currentPageIndex + 1,
          }));
          return m;
        }

        const nextFrameIndex = (m.frameIndex + 1) % n;
        const nextFrame = frames[nextFrameIndex];
        const nextFrameId = nextFrame?.id ?? "";
        setCompositePageIndexByFrameId((prev) => ({
          ...prev,
          [nextFrameId]: 0,
        }));
        return { kind: "composite", frameIndex: nextFrameIndex };
      }
      const total = totalImageCount(frames);
      if (total <= 1) return m;
      return {
        kind: "slides",
        globalIndex: (m.globalIndex + 1) % total,
      };
    });
  }, [frames, compositeRowsByFrameId]);

  const goToFrameTab = useCallback(
    (frameIndex: number) => {
      if (!frames[frameIndex]?.images?.length) return;
      if (modalPresentation === "composite-vehr") {
        setCompositePageIndexByFrameId((prev) => ({
          ...prev,
          [frames[frameIndex].id]: 0,
        }));
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
    modal?.kind === "composite"
      ? compositePageIndexByFrameId[frames[modal.frameIndex]?.id ?? ""]
      : null,
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
            aria-labelledby={
              brandHeader
                ? `${baseId}-modal-brand-title`
                : `${baseId}-modal-title`
            }
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
              {brandHeader?.intro ? (
                <p className="font-sans text-[16px] font-normal leading-[1.5] text-black/80 text-center px-1 pb-3">
                  {brandHeader.intro}
                </p>
              ) : null}
              <div className="mb-2 flex min-w-0 items-start justify-between gap-3 sm:mb-3">
                {brandHeader ? (
                  <p
                    id={`${baseId}-modal-brand-title`}
                    className="min-w-0 flex-1 font-sans text-[16px] leading-[1.5] text-left"
                  >
                    <span className="font-semibold text-black">
                      {brandHeader.projectTitle}
                    </span>
                    <span className="font-normal text-black/35" aria-hidden>
                      {" "}
                      /{" "}
                    </span>
                    <span className="font-semibold text-black/45">
                      {brandHeader.company}
                    </span>
                  </p>
                ) : (
                  <span className="min-w-0 flex-1" aria-hidden />
                )}
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
              <nav className="min-w-0 pb-1" aria-label="Case study sections">
                {modalPresentation === "composite-vehr" ? (
                  <>
                    <ul
                      className={`flex flex-wrap gap-x-1 gap-y-1 sm:gap-x-2 ${
                        brandHeader ? "hidden min-[801px]:flex" : "flex"
                      }`}
                      role="tablist"
                    >
                      {frames.map((frame, fi) => {
                        const active =
                          modal.kind === "composite"
                            ? modal.frameIndex === fi
                            : modalLocal !== null &&
                              modalLocal.frameIndex === fi;
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
                    {brandHeader ? (
                      <label className="min-[801px]:hidden">
                        <span className="sr-only">Case study section</span>
                        <select
                          className="mt-0.5 w-full appearance-none rounded-lg border border-black/15 bg-white py-2.5 pl-3 pr-8 font-sans text-[16px] font-normal leading-[1.5] text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/25"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.65rem center",
                          }}
                          aria-label="Case study section"
                          value={
                            modal.kind === "composite"
                              ? modal.frameIndex
                              : modalLocal?.frameIndex ?? 0
                          }
                          onChange={(e) => {
                            e.stopPropagation();
                            goToFrameTab(
                              Number.parseInt(e.target.value, 10)
                            );
                          }}
                        >
                          {frames.map((frame, fi) => (
                            <option key={frame.id} value={fi}>
                              {frame.title}
                            </option>
                          ))}
                        </select>
                      </label>
                    ) : null}
                  </>
                ) : (
                  <ul
                    className="flex flex-wrap gap-x-1 gap-y-1 sm:gap-x-2"
                    role="tablist"
                  >
                    {frames.map((frame, fi) => {
                      const active =
                        modal.kind === "composite"
                          ? modal.frameIndex === fi
                          : modalLocal !== null &&
                            modalLocal.frameIndex === fi;
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
                )}
              </nav>
            </header>

            <div
              ref={modalScrollRef}
              className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain"
            >
              {modal.kind === "composite" ? (
                <div className="flex min-h-full flex-1 flex-col px-5 pb-16 pt-4 sm:px-8 sm:pb-20 sm:pt-5">
                  <VehrCompositeFrameContent
                    frame={frames[modal.frameIndex]}
                    baseId={baseId}
                    modalVideoRef={modalVideoRef}
                    modalVideoLoadError={modalVideoLoadError}
                    setModalVideoLoadError={setModalVideoLoadError}
                    compositeRowsByFrameId={compositeRowsByFrameId}
                    compositePageIndexByFrameId={compositePageIndexByFrameId}
                    setCompositePageIndexByFrameId={
                      setCompositePageIndexByFrameId
                    }
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
                      <ModalBodyBlocks img={modalImg} />
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
