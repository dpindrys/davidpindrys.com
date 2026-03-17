"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Carousel, { type CarouselSlide } from "./Carousel";

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

interface ProjectSectionProps {
  projectLabel: string;
  projectLogo?: string;
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
  meta: MetaItem[];
  /** Optional Problem / Solution / Why it matters, shown left of testimonial at 33% width */
  blurbs?: Blurbs;
  testimonial: Testimonial;
}

export default function ProjectSection({
  projectLabel,
  projectLogo,
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
  meta,
  blurbs,
  testimonial,
}: ProjectSectionProps) {
  const hasPlayOverlay = Boolean(heroVideoPoster || heroVideoPlayButton);
  const [showPlayOverlay, setShowPlayOverlay] = useState(hasPlayOverlay);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setShowPlayOverlay(false);
    videoRef.current?.play();
  };

  return (
    <article className="flex flex-col gap-16 w-full">

      {/* Label · Title · Descriptor — 20px between each */}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex items-center gap-3">
          {projectLogo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={projectLogo}
              alt=""
              className="w-9 h-8 object-contain shrink-0"
              aria-hidden="true"
            />
          )}
          <span className="font-sans font-bold text-[20px] leading-[1.21] text-black">
            {projectLabel}
          </span>
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
        {featureImages.map((img, i) => (
          <div key={i} className="flex flex-col gap-3">
            {img.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full block ${featureImages.length === 1 ? "h-auto rounded-none" : "aspect-[4/3] object-cover rounded-xl"}`}
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
        ))}
      </div>
      )}

      {/* Metadata + lower content (50/50 when blurbs present) */}
      <div className="flex flex-col gap-10 w-full">

        {/* Metadata — horizontal on desktop, vertical stack on mobile */}
        <div className="flex flex-col border-t border-black/10 pt-8 gap-0 md:flex-row md:gap-0">
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

        {/* Lower content: 50/50 on desktop (summary left, quote right); stacked on mobile */}
        <div className="flex flex-col gap-10 md:flex-row md:gap-10 w-full">
          {blurbs && (
            <div className="flex flex-col gap-6 w-full md:w-1/2 min-w-0 text-left">
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
            className={`rounded-2xl border border-black/10 p-10 flex flex-col gap-8 bg-white/50 min-w-0 ${
              blurbs ? "w-full md:w-1/2" : "w-full"
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
      </div>
    </article>
  );
}
