"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
} from "react";
import {
  captionSegmentLabel,
  formatDemoTime,
  type DemoCaption,
} from "../lib/demoNarration";
import { compactPlayControlSizeClass } from "../lib/pageStyles";

const overlayPlayButtonClass = `flex ${compactPlayControlSizeClass} shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white outline-none transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent [-webkit-tap-highlight-color:transparent]`;

const OVERLAY_IDLE_MS = 2800;

/** Tactile shortcut keys in the cream caption chrome (pure CSS, non-interactive). */
const shortcutKbdBaseClass =
  "pointer-events-none select-none rounded-[6px] border border-black/35 border-b-2 bg-white font-sans text-[11px] font-medium leading-none text-black/80 sm:text-[12px]";
export const demoShortcutKbdClass = `${shortcutKbdBaseClass} px-2.5 py-1`;
export const demoShortcutKbdCompactClass = `${shortcutKbdBaseClass} px-1.5 py-1`;

const narrationMuteButtonClass =
  "flex w-10 shrink-0 cursor-pointer self-stretch items-center justify-center rounded-md text-black/55 outline-none transition-colors hover:text-black/80 focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] sm:w-11";
const narrationMuteIconClass = "h-[22px] w-[22px] sm:h-6 sm:w-6";

function NarrationSoundOnIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H3v6h3l5 4V5z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M18.07 5.93a8.5 8.5 0 0 1 0 12.14" />
    </svg>
  );
}

function NarrationMutedIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H3v6h3l5 4V5z" />
      <path d="m22 9-6 6M16 9l6 6" />
    </svg>
  );
}

export function DemoNarrationMuteButton({
  muted,
  onToggle,
}: {
  muted: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={narrationMuteButtonClass}
      aria-label={muted ? "Unmute narration" : "Mute narration"}
      aria-pressed={muted}
      onClick={onToggle}
    >
      {muted ? (
        <NarrationMutedIcon className={narrationMuteIconClass} />
      ) : (
        <NarrationSoundOnIcon className={narrationMuteIconClass} />
      )}
    </button>
  );
}

export function DemoCaptionBody({
  captions,
  captionText,
  captionOpaque,
  captionSpacer,
  segmentFills,
  captionsId,
  onSeekToCaption,
  hasNarrationAudio = false,
  narrationMuted = false,
  onToggleNarrationMute,
}: {
  captions: readonly DemoCaption[];
  captionText: string;
  captionOpaque: boolean;
  captionSpacer: string;
  segmentFills: number[];
  captionsId: string;
  onSeekToCaption: (index: number) => void;
  hasNarrationAudio?: boolean;
  narrationMuted?: boolean;
  onToggleNarrationMute?: () => void;
}) {
  const showNarrationMute =
    hasNarrationAudio && onToggleNarrationMute != null;

  return (
    <>
      <div className="flex items-stretch gap-2 sm:gap-2.5">
        <div className="relative min-w-0 flex-1" aria-live="polite">
          <p
            className="invisible font-sans text-[15px] font-normal leading-[1.45] sm:text-[16px]"
            aria-hidden="true"
          >
            {captionSpacer}
          </p>
          <p
            id={captionsId}
            className={`absolute inset-0 font-sans text-[15px] font-normal leading-[1.45] text-black/80 transition-opacity duration-150 ease-out motion-reduce:transition-none sm:text-[16px] ${
              captionOpaque ? "opacity-100" : "opacity-0"
            }`}
          >
            {captionText}
          </p>
        </div>
        {showNarrationMute ? (
          <DemoNarrationMuteButton
            muted={narrationMuted}
            onToggle={onToggleNarrationMute}
          />
        ) : null}
      </div>
      <div
        className="mt-3 flex gap-1 sm:gap-1.5"
        role="group"
        aria-label="Caption timeline"
      >
        {segmentFills.map((fill, i) => (
          <button
            key={i}
            type="button"
            aria-label={captionSegmentLabel(captions[i], i, captions.length)}
            onClick={() => onSeekToCaption(i)}
            className="h-1 min-w-0 flex-1 cursor-pointer overflow-hidden rounded-[1px] bg-black/10 outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]"
          >
            <span
              className="block h-full bg-[rgb(15_12_19)]"
              style={{ width: `${Math.round(fill * 1000) / 10}%` }}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </>
  );
}

const footerPlayButtonClass = `flex ${compactPlayControlSizeClass} shrink-0 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] [-webkit-tap-highlight-color:transparent]`;

const footerIconButtonClass =
  "flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md text-black/55 outline-none transition-colors hover:text-black/80 focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] sm:h-11 sm:w-11";

function FooterPlayIcon({ className = "ml-[6%] h-[38%] w-[38%] shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M8 5.2v13.6a.8.8 0 0 0 1.22.68l10.4-6.8a.8.8 0 0 0 0-1.36L9.22 4.52A.8.8 0 0 0 8 5.2Z" />
    </svg>
  );
}

function FooterPauseIcon({ className = "h-[38%] w-[38%] shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function FullscreenEnterIcon({ className = "h-[22px] w-[22px] sm:h-6 sm:w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function FullscreenExitIcon({ className = "h-[22px] w-[22px] sm:h-6 sm:w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

export function DemoViewerFooter({
  client,
  playing,
  onTogglePlayback,
  captions,
  captionText,
  captionOpaque,
  captionSpacer,
  segmentFills,
  captionsId,
  onSeekToCaption,
  activeCueIndex,
  hasNarrationAudio,
  narrationMuted,
  onToggleNarrationMute,
  currentTime,
  duration,
  isFullscreen,
  onToggleFullscreen,
  showKeyboardHints,
}: {
  client: string;
  playing: boolean;
  onTogglePlayback: () => void;
  captions?: readonly DemoCaption[];
  captionText: string;
  captionOpaque: boolean;
  captionSpacer: string;
  segmentFills: number[];
  captionsId: string;
  onSeekToCaption: (index: number) => void;
  activeCueIndex: number;
  hasNarrationAudio: boolean;
  narrationMuted: boolean;
  onToggleNarrationMute: () => void;
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  showKeyboardHints: boolean;
}) {
  const hasCaptions = Boolean(captions && captions.length > 0);
  const stepLabel = hasCaptions
    ? `${activeCueIndex + 1} / ${captions!.length}`
    : null;

  return (
    <div className="shrink-0 border-t border-black/10 bg-[#F4F2EE] px-3 py-2.5 sm:px-5 sm:py-3">
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          className={footerPlayButtonClass}
          aria-label={playing ? `Pause demo for ${client}` : `Play demo for ${client}`}
          onClick={onTogglePlayback}
        >
          {playing ? (
            <FooterPauseIcon />
          ) : (
            <FooterPlayIcon />
          )}
        </button>
        {hasCaptions ? (
          <div className="relative min-h-[2.9em] min-w-0 flex-1" aria-live="polite">
            <p
              className="invisible font-sans text-[14px] font-normal leading-[1.45] sm:text-[15px]"
              aria-hidden="true"
            >
              {captionSpacer}
            </p>
            <p
              id={captionsId}
              className={`absolute inset-0 font-sans text-[14px] font-normal leading-[1.45] text-black/80 transition-opacity duration-150 ease-out motion-reduce:transition-none sm:text-[15px] ${
                captionOpaque ? "opacity-100" : "opacity-0"
              }`}
            >
              {captionText}
            </p>
          </div>
        ) : (
          <p className="min-w-0 flex-1 font-sans text-[14px] text-black/70 sm:text-[15px]">
            Guided demo
          </p>
        )}
        {stepLabel ? (
          <span className="shrink-0 font-sans text-[13px] font-medium tabular-nums leading-none text-black/55 sm:text-[14px]">
            {stepLabel}
          </span>
        ) : null}
      </div>

      {hasCaptions ? (
        <div
          className="mt-2.5 flex gap-1 sm:mt-3 sm:gap-1.5"
          role="group"
          aria-label="Caption timeline"
        >
          {segmentFills.map((fill, i) => (
            <button
              key={i}
              type="button"
              aria-label={captionSegmentLabel(captions![i], i, captions!.length)}
              onClick={() => onSeekToCaption(i)}
              className="h-1 min-w-0 flex-1 cursor-pointer overflow-hidden rounded-[1px] bg-black/10 outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]"
            >
              <span
                className="block h-full bg-[rgb(15_12_19)]"
                style={{ width: `${Math.round(fill * 1000) / 10}%` }}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-3 sm:gap-x-4">
        {hasNarrationAudio ? (
          <DemoNarrationMuteButton muted={narrationMuted} onToggle={onToggleNarrationMute} />
        ) : null}
        <span className="font-sans text-[13px] font-medium tabular-nums leading-none text-black/55 sm:text-[14px]">
          {formatDemoTime(currentTime)}
          <span className="text-black/35"> / </span>
          {formatDemoTime(duration)}
        </span>
        <button
          type="button"
          className={footerIconButtonClass}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          onClick={onToggleFullscreen}
        >
          {isFullscreen ? (
            <FullscreenExitIcon />
          ) : (
            <FullscreenEnterIcon />
          )}
        </button>
        {showKeyboardHints ? <DemoShortcutHints showCaptions={hasCaptions} /> : null}
      </div>
    </div>
  );
}

export function DemoShortcutHints({ showCaptions }: { showCaptions: boolean }) {
  return (
    <div
      className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-6"
      aria-hidden="true"
    >
      <span className="inline-flex items-center gap-2 font-sans text-[13px] font-normal leading-none text-black/70 sm:text-[14px]">
        <kbd className={demoShortcutKbdClass}>Space</kbd>
        Play / Pause
      </span>
      {showCaptions ? (
        <span className="inline-flex items-center gap-2 font-sans text-[13px] font-normal leading-none text-black/70 sm:text-[14px]">
          <span className="inline-flex items-center gap-1">
            <kbd className={demoShortcutKbdCompactClass}>←</kbd>
            <kbd className={demoShortcutKbdCompactClass}>→</kbd>
          </span>
          Previous / Next
        </span>
      ) : null}
    </div>
  );
}

export function DemoWalkthroughSidebar({
  title,
  subtitle,
  journeyHeading,
  description,
  titleId,
  descriptionId,
  captions,
  captionsId,
  activeCueIndex,
  onSeekToCaption,
  hasNarrationAudio,
  narrationMuted,
  onToggleNarrationMute,
}: {
  title: string;
  subtitle?: string;
  journeyHeading?: string;
  description?: string;
  titleId: string;
  descriptionId?: string;
  captions: readonly DemoCaption[];
  captionsId: string;
  activeCueIndex: number;
  onSeekToCaption: (index: number) => void;
  hasNarrationAudio: boolean;
  narrationMuted: boolean;
  onToggleNarrationMute: () => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const activeRowRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const row = activeRowRef.current;
    const list = listRef.current;
    if (!row || !list) return;
    const rowTop = row.offsetTop;
    const rowBottom = rowTop + row.offsetHeight;
    const viewTop = list.scrollTop;
    const viewBottom = viewTop + list.clientHeight;
    if (rowTop < viewTop || rowBottom > viewBottom) {
      row.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeCueIndex]);

  const sectionHeading = journeyHeading ?? "Walkthrough";

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden" aria-labelledby={titleId}>
      <div className="shrink-0 px-4 py-4 pr-12 sm:px-5 sm:py-5 sm:pr-14">
        <h2
          id={titleId}
          className="font-sans text-[17px] font-semibold leading-snug tracking-[-0.02em] text-black sm:text-[18px]"
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 font-sans text-[14px] font-normal leading-snug text-black/55 sm:text-[15px]">
            {subtitle}
          </p>
        ) : null}
        {description ? (
          <p
            id={descriptionId}
            className="mt-3 font-sans text-[14px] font-normal leading-[1.45] text-black/70 sm:text-[15px]"
          >
            {description}
          </p>
        ) : null}
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/10 pt-4">
          <h3 className="min-w-0 font-sans text-[15px] font-medium leading-snug tracking-[-0.01em] text-black sm:text-[16px]">
            {sectionHeading}
          </h3>
          {hasNarrationAudio ? (
            <DemoNarrationMuteButton
              muted={narrationMuted}
              onToggle={onToggleNarrationMute}
            />
          ) : null}
        </div>
      </div>

      <div
        ref={listRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-black/10"
        role="list"
        aria-label="Walkthrough explanations"
      >
        {captions.map((caption, index) => {
          const active = index === activeCueIndex;
          return (
            <button
              key={`${caption.start}-${index}`}
              ref={active ? activeRowRef : undefined}
              type="button"
              role="listitem"
              aria-current={active ? "step" : undefined}
              aria-label={captionSegmentLabel(caption, index, captions.length)}
              onClick={() => onSeekToCaption(index)}
              className={`relative block w-full border-b border-black/10 px-4 py-3.5 text-left outline-none transition-colors last:border-b-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/20 sm:px-5 sm:py-4 ${
                active
                  ? "bg-black/[0.04] text-black"
                  : "text-black/60 hover:bg-black/[0.02] hover:text-black/75"
              }`}
            >
              {active ? (
                <span
                  className="absolute bottom-3 left-0 top-3 w-0.5 rounded-full bg-black sm:bottom-4 sm:top-4"
                  aria-hidden="true"
                />
              ) : null}
              <span className="block font-sans text-[12px] font-medium tabular-nums leading-none text-black/45 sm:text-[13px]">
                {formatDemoTime(caption.start)}
              </span>
              <span
                className={`mt-2 block font-sans text-[14px] leading-[1.45] sm:text-[15px] ${
                  active ? "font-semibold text-black" : "font-normal"
                }`}
              >
                {caption.text}
              </span>
            </button>
          );
        })}
        <p id={captionsId} className="sr-only" aria-live="polite">
          {captions[activeCueIndex]?.text ?? ""}
        </p>
      </div>
    </section>
  );
}

export function DemoVideoOverlayControls({
  client,
  playing,
  onTogglePlayback,
  currentTime,
  duration,
  onSeekToTime,
  activityTick,
}: {
  client: string;
  playing: boolean;
  onTogglePlayback: () => void;
  currentTime: number;
  duration: number;
  onSeekToTime: (time: number) => void;
  /** Bumped by the video stage on pointer / touch activity to reveal the overlay. */
  activityTick: number;
}) {
  const scrubberId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [scrubbing, setScrubbing] = useState(false);
  const focusWithinRef = useRef(false);
  const idleTimerRef = useRef<number | null>(null);

  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current != null) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    if (!playing || focusWithinRef.current || scrubbing) return;
    clearIdleTimer();
    idleTimerRef.current = window.setTimeout(() => {
      if (!focusWithinRef.current && !scrubbing) {
        setVisible(false);
      }
    }, OVERLAY_IDLE_MS);
  }, [clearIdleTimer, playing, scrubbing]);

  const reveal = useCallback(() => {
    setVisible(true);
    scheduleHide();
  }, [scheduleHide]);

  useEffect(() => {
    reveal();
  }, [activityTick, reveal]);

  useEffect(() => {
    if (!playing) {
      setVisible(true);
      clearIdleTimer();
      return;
    }
    if (visible) scheduleHide();
    return clearIdleTimer;
  }, [playing, visible, scheduleHide, clearIdleTimer]);

  useEffect(() => () => clearIdleTimer(), [clearIdleTimer]);

  const onOverlayFocusIn = () => {
    focusWithinRef.current = true;
    setVisible(true);
    clearIdleTimer();
  };

  const onOverlayFocusOut = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && overlayRef.current?.contains(next)) return;
    focusWithinRef.current = false;
    if (playing && !scrubbing) scheduleHide();
  };

  const scrubMax = duration > 0 ? duration : 0;
  const scrubValue = Math.min(Math.max(0, currentTime), scrubMax || 0);

  return (
    <div
      ref={overlayRef}
      onFocusCapture={onOverlayFocusIn}
      onBlurCapture={onOverlayFocusOut}
      inert={visible ? undefined : true}
      className={`pointer-events-auto absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-3 pb-3 pt-10 transition-opacity duration-300 ease-out motion-reduce:transition-none sm:px-4 sm:pb-4 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <label htmlFor={scrubberId} className="sr-only">
        Scrub through demo video
      </label>
      <input
        id={scrubberId}
        type="range"
        min={0}
        max={scrubMax || 1}
        step={0.05}
        value={scrubValue}
        disabled={scrubMax <= 0}
        onPointerDown={() => {
          setScrubbing(true);
          setVisible(true);
          clearIdleTimer();
        }}
        onPointerUp={() => {
          setScrubbing(false);
          if (playing) scheduleHide();
        }}
        onChange={(event) => {
          onSeekToTime(Number(event.target.value));
        }}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/25 accent-white disabled:opacity-40 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
      />

      <div className="mt-2.5 flex items-center gap-2 sm:mt-3">
        <span className="shrink-0 font-sans text-[12px] font-medium tabular-nums leading-none text-white/70 sm:text-[13px]">
          {formatDemoTime(currentTime)}
          <span className="text-white/40"> / </span>
          {formatDemoTime(duration)}
        </span>

        <div className="flex min-w-0 flex-1 items-center justify-center">
          <button
            type="button"
            className={overlayPlayButtonClass}
            aria-label={playing ? `Pause demo for ${client}` : `Play demo for ${client}`}
            onClick={onTogglePlayback}
          >
            {playing ? <FooterPauseIcon className="h-[38%] w-[38%]" /> : <FooterPlayIcon />}
          </button>
        </div>

        <span className="hidden w-[4.5rem] shrink-0 sm:block" aria-hidden="true" />
      </div>
    </div>
  );
}
