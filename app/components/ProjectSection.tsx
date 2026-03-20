"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Carousel, { type CarouselSlide } from "./Carousel";
import CaseStudyHighlights, { type CaseStudyHighlightsData } from "./CaseStudyHighlights";

interface MetaItem {
  label: string;
  value: string;
  href?: string;
  /** Optional icon (e.g. arrow) shown after value for links */
  icon?: string;
}

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatarSrc?: string;
  logoSrc?: string;
}

interface FeatureImage {
  src: string;
  alt: string;
  label: string;
}

interface VideoInset {
  left: string;
  top: string;
  width: string;
  height: string;
}

interface Blurbs {
  problem: string;
  solution: string;
  whyItMatters: string;
}

/** Single left-column block (e.g. SUMMARY) instead of Problem/Solution/Why */
interface SummaryBlock {
  label: string;
  body: string;
}

interface ProjectSectionProps {
  projectLabel: string;
  projectLogo?: string;
  /** Shown top-right, same type as descriptor */
  projectDate?: string;
  title: string;
  descriptor: string;
  heroImage: string;
  heroImageAlt: string;
  heroOverlayImage?: string;
  heroOverlayImageAlt?: string;
  /** Video to play inside the device screen on the hero image */
  heroVideo?: string;
  /** Position of the device screen as percentages of the hero image size */
  heroVideoInset?: VideoInset;
  /** Optional screenshot/poster shown over video until "Play Demo" is clicked */
  heroVideoPoster?: string;
  /** Optional PNG for the play button (e.g. "Play Demo" label) */
  heroVideoPlayButton?: string;
  /** Optional "View prototype" button below hero, above the line (same style as Hero email button) */
  heroPrototypeLink?: { href: string; icon?: string };
  /** Optional carousel (slides + caption) shown between hero and feature images */
  carousel?: { slides: CarouselSlide[]; caption?: string };
  featureImages: FeatureImage[];
  /**
   * When there is exactly one feature image, constrain its width by this many pixels
   * (centered). The metadata divider below stays full width of the content column.
   */
  narrowSingleFeatureByPx?: number;
  meta: MetaItem[];
  /** Optional Problem / Solution / Why it matters, shown left of testimonial at 33% width */
  blurbs?: Blurbs;
  /** When set, replaces blurbs with one labeled block (e.g. SUMMARY + body) */
  summaryBlock?: SummaryBlock;
  testimonial: Testimonial;
  /** When true, no rule above the ROLE / Primary Users / Focus row */
  hideMetaTopBorder?: boolean;
  /** Vertical gap between that meta row and Problem / testimonial block (default gap-10) */
  metaSectionStackGap?: string;
  /** Optional mini case study (e.g. VEHR) after summary + quote */
  caseStudyHighlights?: CaseStudyHighlightsData;
}

export default function ProjectSection({
  projectLabel,
  projectLogo,
  projectDate,
  title,
  descriptor,
  heroImage,
  heroImageAlt,
  heroOverlayImage,
  heroOverlayImageAlt,
  heroVideo,
  heroVideoInset,
  heroVideoPoster,
  heroVideoPlayButton,
  heroPrototypeLink,
  carousel,
  featureImages,
  narrowSingleFeatureByPx,
  meta,
  blurbs,
  summaryBlock,
  testimonial,
  hideMetaTopBorder = false,
  metaSectionStackGap = "gap-10",
  caseStudyHighlights,
}: ProjectSectionProps) {
  const hasPlayOverlay = Boolean(heroVideoPoster || heroVideoPlayButton);
  const [showPlayOverlay, setShowPlayOverlay] = useState(hasPlayOverlay);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setShowPlayOverlay(false);
    videoRef.current?.play();
  };

  const hasCaseStudyHighlights =
    Boolean(caseStudyHighlights && caseStudyHighlights.frames.length > 0);

  const lowerContentRow = (
    <div className="flex w-full flex-col gap-10 md:flex-row md:items-start md:gap-10">
      {summaryBlock && (
        <div className="w-full min-w-0 flex-1 text-left md:max-w-[50%]">
          <div className="flex flex-col gap-1.5">
            <span className="font-sans font-normal text-[12px] uppercase tracking-[0.12em] text-gray-800">
              {summaryBlock.label}
            </span>
            <p className="font-sans font-normal text-[16px] leading-[1.5] text-black">
              {summaryBlock.body}
            </p>
          </div>
        </div>
      )}
      {!summaryBlock && blurbs && (
        <div className="flex w-full min-w-0 flex-col gap-6 text-left md:w-1/2">
          <div className="flex flex-col gap-1.5">
            <span className="font-sans font-normal text-[12px] uppercase tracking-[0.12em] text-gray-800">
              Problem
            </span>
            <span className="font-sans font-normal text-[16px] leading-[1.5] text-black">
              {blurbs.problem}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-sans font-normal text-[12px] uppercase tracking-[0.12em] text-gray-800">
              Solution
            </span>
            <span className="font-sans font-normal text-[16px] leading-[1.5] text-black">
              {blurbs.solution}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-sans font-normal text-[12px] uppercase tracking-[0.12em] text-gray-800">
              Why it matters
            </span>
            <span className="font-sans font-normal text-[16px] leading-[1.5] text-black">
              {blurbs.whyItMatters}
            </span>
          </div>
        </div>
      )}
      <div
        className={`flex min-w-0 flex-col gap-6 rounded-2xl border border-black/10 bg-white/50 p-8 ${
          blurbs || summaryBlock ? "w-full md:w-1/2" : "w-full"
        }`}
      >
        <blockquote className="font-serif font-normal text-[16px] md:text-[22px] leading-[1.5] md:leading-[1.45] text-black">
          {testimonial.quote}
        </blockquote>

        <div className="flex items-center gap-4">
          {testimonial.avatarSrc ? (
            <div className="relative w-[52px] h-[52px] rounded-full overflow-hidden shrink-0">
              <Image
                src={testimonial.avatarSrc}
                alt={testimonial.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
          ) : (
            <div className="w-[52px] h-[52px] rounded-full bg-[#D4D4D4] shrink-0" />
          )}

          <div className="flex flex-col gap-0.5">
            <span className="font-sans font-semibold text-[16px] leading-[1.5] text-black">
              {testimonial.name}
            </span>
            <span className="font-sans font-normal text-[16px] leading-[1.5] text-black/50">
              {testimonial.title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <article className="flex flex-col gap-16 w-full">

      {/* Label · Title · Descriptor — 20px between each */}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex w-full items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            {projectLogo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={projectLogo}
                alt=""
                className="h-8 w-9 shrink-0 object-contain"
                aria-hidden="true"
              />
            )}
            <span className="font-sans text-[20px] font-bold leading-[1.21] text-black">
              {projectLabel}
            </span>
          </div>
          {projectDate ? (
            <p
              className="shrink-0 pt-px text-right font-sans text-[clamp(16px,1.9vw,28px)] font-normal leading-[1.4] text-black/70"
              aria-label={`Project years: ${projectDate}`}
            >
              {projectDate}
            </p>
          ) : null}
        </div>

        <h2 className="font-serif font-normal text-[clamp(36px,5.5vw,75px)] leading-[1.305] text-black">
          {title}
        </h2>

        <p className="font-sans font-normal text-[clamp(16px,1.9vw,28px)] leading-[1.4] text-black/70 max-w-[1170px]">
          {descriptor}
        </p>
      </div>

      {/* Hero image */}
      <div className="relative w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt={heroImageAlt}
          className="w-full h-auto rounded-2xl block"
        />

        {/* Video overlay — clip wrapper hides black bars, video overflows inside */}
        {heroVideo && heroVideoInset && (
          <div
            className="absolute overflow-hidden rounded-[1%]"
            style={{
              left: heroVideoInset.left,
              top: heroVideoInset.top,
              width: heroVideoInset.width,
              height: heroVideoInset.height,
            }}
          >
            <div
              className={`absolute inset-0 rounded-[1%] box-border overflow-hidden border ${
                hasPlayOverlay && showPlayOverlay ? "border-transparent" : "border-[#ccc]"
              }`}
            >
              <video
                ref={videoRef}
                autoPlay={!hasPlayOverlay}
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover origin-center"
                style={{
                  transform: "scale(1.014, 1) translateX(0.12%)",
                }}
              >
                <source src={heroVideo} type="video/mp4" />
              </video>

              {/* Poster + Play Demo button overlay; click to play */}
              {hasPlayOverlay && showPlayOverlay && (
                <button
                  type="button"
                  onClick={handlePlayClick}
                  className="absolute inset-0 w-full h-full flex items-center justify-center bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black/30"
                  aria-label="Play demo video"
                >
                  {heroVideoPoster && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={heroVideoPoster}
                        alt=""
                        className="max-w-full max-h-full object-contain border border-[#ccc] rounded-[1%] box-border hover:opacity-80 transition-opacity"
                        aria-hidden
                      />
                    </div>
                  )}
                  {heroVideoPlayButton && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={heroVideoPlayButton}
                      alt="Play Demo"
                      className="relative z-10 w-auto h-14 object-contain drop-shadow-md hover:opacity-90"
                    />
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {heroOverlayImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroOverlayImage}
            alt={heroOverlayImageAlt ?? ""}
            className="absolute bottom-0 right-0 h-[90%] w-auto object-contain drop-shadow-2xl"
          />
        )}
      </div>

      {/* View prototype button — below hero, above the line; centered, same size as descriptor/subtitle */}
      {heroPrototypeLink && (
        <div className="flex justify-center">
          <a
            href={heroPrototypeLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 h-20 px-10 rounded-2xl border-2 border-[#005077] bg-[#00AAFF] font-sans font-semibold text-[clamp(16px,1.9vw,28px)] leading-[1.21] text-white hover:opacity-80 transition-opacity"
          >
            <span>View prototype</span>
            {heroPrototypeLink.icon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={heroPrototypeLink.icon} alt="" className="w-5 h-5 object-contain shrink-0 brightness-0 invert" aria-hidden />
            )}
          </a>
        </div>
      )}

      {/* Carousel (optional) — between hero and feature images; sits on line above ROLE when present */}
      {carousel && carousel.slides.length > 0 && (
        <div className="-mb-10">
          <Carousel slides={carousel.slides} caption={carousel.caption} />
        </div>
      )}

      {/* Feature thumbnails with labels — only if any images; single image = full width, flush with line above ROLE */}
      {featureImages.length > 0 && (
      <div className={featureImages.length === 1 ? "w-full -mb-16" : "grid grid-cols-3 gap-8 w-full"}>
        {featureImages.map((img, i) => {
          const single = featureImages.length === 1;
          const narrow =
            single &&
            typeof narrowSingleFeatureByPx === "number" &&
            narrowSingleFeatureByPx > 0;
          const narrowMaxWidth = narrow
            ? `min(100%, max(17.5rem, calc(100% - ${narrowSingleFeatureByPx}px)))`
            : undefined;

          return (
          <div
            key={i}
            className={`flex flex-col gap-3 ${narrow ? "mx-auto w-full min-w-0" : single ? "w-full" : ""}`}
            style={narrow && narrowMaxWidth ? { maxWidth: narrowMaxWidth } : undefined}
          >
            {img.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full block ${single ? "h-auto rounded-none" : "aspect-[4/3] object-cover rounded-xl"}`}
              />
            ) : (
              <div className="w-full aspect-[4/3] rounded-xl bg-[#E4E4E4] flex items-center justify-center">
                <span className="font-sans text-[13px] text-black/30 tracking-wide uppercase">
                  Coming soon
                </span>
              </div>
            )}
            {img.label && (
              <span className="font-sans font-normal text-[15px] leading-[1.4] text-black/50">
                {img.label}
              </span>
            )}
          </div>
          );
        })}
      </div>
      )}

      {/* Metadata + lower content (50/50 when blurbs present) */}
      <div className={`flex w-full flex-col ${metaSectionStackGap}`}>

        {/* Metadata — horizontal on desktop, vertical stack on mobile */}
        <div
          className={`flex flex-col gap-0 md:flex-row md:gap-0 ${
            hideMetaTopBorder ? "pt-0" : "border-t border-black/10 pt-8"
          }`}
        >
          {meta.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-1.5 py-6 border-b border-black/10 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:py-0 md:flex-1 md:pr-8 md:last:pr-0 md:pl-8 md:first:pl-0"
            >
              <span className="font-sans font-normal text-[12px] uppercase tracking-[0.12em] text-gray-800">
                {item.label}
              </span>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-semibold text-[16px] leading-[1.5] text-black hover:underline inline-flex items-center gap-1.5"
                >
                  {item.value}
                  {item.icon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.icon} alt="" className="w-4 h-4 object-contain" aria-hidden />
                  )}
                </a>
              ) : (
                <span className="font-sans font-semibold text-[16px] leading-[1.5] text-black">
                  {item.value}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Lower content + optional HIGHLIGHTS: tighter stack when highlights follow summary/quote */}
        {hasCaseStudyHighlights ? (
          <div className="flex w-full flex-col gap-6 sm:gap-7">
            {lowerContentRow}
            <CaseStudyHighlights data={caseStudyHighlights!} />
          </div>
        ) : (
          lowerContentRow
        )}
      </div>
    </article>
  );
}
