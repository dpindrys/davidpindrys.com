"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type RefObject,
  type SyntheticEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  DemoVideoOverlayControls,
  DemoWalkthroughSidebar,
} from "./DemoCaptionChrome";
import { useNarratedDemoPlayback } from "../hooks/useNarratedDemoPlayback";

export type DemoCaption = {
  /** Inclusive start time in seconds. */
  start: number;
  /** Exclusive end time in seconds; omit for “through end of video”. */
  end?: number;
  text: string;
  /** Optional narration audio URL for this cue (e.g. VEHR `/audio/vehr1.wav`). */
  audio?: string;
};

export type DemoDialogLayout = "default" | "walkthrough";

export type DemoDialogContent = {
  client: string;
  video: string;
  title?: string;
  description?: string;
  /** @deprecated Superseded by viewer footer; kept for callers. */
  walkthroughHeading?: string;
  captions?: readonly DemoCaption[];
  layout?: DemoDialogLayout;
};

/**
 * Full-bleed clickable media overlay; "Play demo" mark is visual-only.
 * Mark visibility is React-controlled (pointer + focus-visible) — never CSS group-hover —
 * so stuck :hover after click/modal close cannot fight hide. Touch / no-hover devices keep
 * the mark visible until force-hidden/open.
 */
export const viewDemoPlayButtonClass =
  "absolute inset-0 z-[1] flex cursor-pointer items-center justify-center select-none outline-none !outline-none focus:outline-none focus-visible:outline-none focus-visible:!outline-none [-webkit-tap-highlight-color:transparent]";

/** Shared pill chrome for hero “Play demo” marks on cards. */
const viewDemoPlayMarkVisualClass =
  "flex items-center justify-center gap-2 rounded-full bg-black/60 px-5 py-3 font-sans text-[15px] font-medium leading-none tracking-[-0.01em] text-white sm:px-6 sm:py-3.5 sm:text-[16px]";

export const viewDemoPlayMarkClass = `pointer-events-none ${viewDemoPlayMarkVisualClass}`;

const viewDemoPlayMarkFocusRingClass =
  "ring-2 ring-black/25 ring-offset-2 ring-offset-transparent";

const dialogCloseButtonClass =
  "absolute right-3 top-3 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md font-sans text-[26px] leading-none text-white/75 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black/80 sm:right-4 sm:top-4";

export function PlayIcon({ className = "ml-[6%] h-[38%] w-[38%] shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M8 5.2v13.6a.8.8 0 0 0 1.22.68l10.4-6.8a.8.8 0 0 0 0-1.36L9.22 4.52A.8.8 0 0 0 8 5.2Z" />
    </svg>
  );
}

/** Play control + dialog; place inside a `relative` media container. */
export function DemoPlayOverlay({
  client,
  video,
  title,
  description,
  walkthroughHeading,
  captions,
  layout,
}: {
  client: string;
  video: string;
  title?: string;
  description?: string;
  walkthroughHeading?: string;
  captions?: readonly DemoCaption[];
  layout?: DemoDialogLayout;
}) {
  const [open, setOpen] = useState(false);
  const [forceHidden, setForceHidden] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const [hoverCapable, setHoverCapable] = useState<boolean | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const openRef = useRef(false);
  openRef.current = open;

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const apply = () => setHoverCapable(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const close = useCallback((_modality: "keyboard" | "pointer" = "pointer") => {
    setOpen(false);
  }, []);

  const showMark =
    !open &&
    (focusVisible ||
      (!forceHidden && (hoverCapable === false || (hoverCapable === true && pointerInside))));

  return (
    <>
      <button
        type="button"
        data-demo-play=""
        aria-label={`Play demo for ${client}`}
        className={viewDemoPlayButtonClass}
        onPointerEnter={() => setPointerInside(true)}
        onPointerLeave={() => {
          setPointerInside(false);
          if (!openRef.current) setForceHidden(false);
        }}
        onFocus={(event) => {
          setFocusVisible(event.currentTarget.matches(":focus-visible"));
        }}
        onBlur={() => setFocusVisible(false)}
        onClick={(event) => {
          openerRef.current = event.currentTarget;
          setForceHidden(true);
          setFocusVisible(false);
          event.currentTarget.blur();
          setOpen(true);
        }}
      >
        {showMark ? (
          <span
            className={
              focusVisible
                ? `${viewDemoPlayMarkClass} ${viewDemoPlayMarkFocusRingClass}`
                : viewDemoPlayMarkClass
            }
            aria-hidden="true"
          >
            Play demo
            <PlayIcon className="h-[0.9em] w-[0.9em] shrink-0" />
          </span>
        ) : null}
      </button>
      <DemoDialog
        demo={
          open
            ? { client, video, title, description, walkthroughHeading, captions, layout }
            : null
        }
        onClose={close}
        openerRef={openerRef}
      />
    </>
  );
}

export default function DemoDialog({
  demo,
  onClose,
  openerRef,
}: {
  demo: DemoDialogContent | null;
  onClose: (modality?: "keyboard" | "pointer") => void;
  openerRef: RefObject<HTMLButtonElement | null>;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoStageRef = useRef<HTMLDivElement>(null);
  const closeModalityRef = useRef<"keyboard" | "pointer">("pointer");
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [overlayActivityTick, setOverlayActivityTick] = useState(0);

  const resetKey = demo ? `${demo.client}:${demo.video}` : null;

  const {
    videoRef,
    captionsId,
    hasCaptions,
    hasNarrationAudio,
    narrationMuted,
    toggleNarrationMute,
    captions,
    playing,
    togglePlayback,
    seekToCaption,
    seekToTime,
    seekToAdjacentCaption,
    pauseSession,
    videoHandlers,
    activeCueIndex,
  } = useNarratedDemoPlayback({
    captions: demo?.captions,
    keyboardEnabled: Boolean(demo),
    resetKey,
  });

  const requestClose = useCallback(
    (modality: "keyboard" | "pointer") => {
      pauseSession();
      closeModalityRef.current = modality;
      if (modality === "pointer") {
        openerRef.current?.blur();
      }
      onClose(modality);
    },
    [onClose, openerRef, pauseSession],
  );

  const closeFromPointer = useCallback(() => {
    requestClose("pointer");
  }, [requestClose]);

  const bumpOverlayActivity = useCallback(() => {
    setOverlayActivityTick((tick) => tick + 1);
  }, []);

  useEffect(() => {
    if (!demo) return;
    const opener = openerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeModalityRef.current = "pointer";

    const frame = requestAnimationFrame(() => {
      dialogRef.current?.focus({ preventScroll: true });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose("keyboard");
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = [
        ...dialog.querySelectorAll<HTMLElement>(
          "button, video, a[href], input[type='range']",
        ),
      ].filter((el) => el.tabIndex !== -1);
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus({ preventScroll: true });
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === dialog || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || active === dialog)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (closeModalityRef.current === "keyboard") {
        opener?.focus({ preventScroll: true });
      } else {
        opener?.blur();
      }
    };
  }, [demo, openerRef, requestClose]);

  useEffect(() => {
    if (!demo) {
      setVideoTime(0);
      setVideoDuration(0);
    }
  }, [demo]);

  const mergedVideoHandlers = {
    ...videoHandlers,
    onTimeUpdate: (event: SyntheticEvent<HTMLVideoElement>) => {
      setVideoTime(event.currentTarget.currentTime);
      videoHandlers.onTimeUpdate?.(event);
    },
    onLoadedMetadata: (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      if (Number.isFinite(video.duration)) {
        setVideoDuration(video.duration);
      }
      videoHandlers.onLoadedMetadata?.(event);
    },
    onDurationChange: (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      if (Number.isFinite(video.duration)) {
        setVideoDuration(video.duration);
      }
    },
  };

  if (!demo || typeof document === "undefined") return null;

  const descriptionId = demo.description ? `${titleId}-desc` : undefined;
  const walkthroughTitle = demo.title ?? `${demo.client} guided demo`;
  const captionCount = captions?.length ?? 0;
  const canGoPrev = hasCaptions && activeCueIndex > 0;
  const canGoNext = hasCaptions && activeCueIndex < captionCount - 1;

  const describedBy =
    [hasCaptions ? captionsId : null, descriptionId].filter(Boolean).join(" ") || undefined;

  return createPortal(
    <div className="fixed inset-0 z-[140] flex h-dvh max-h-dvh flex-col overflow-hidden">
      <div className="fixed inset-0 bg-black/70" onClick={closeFromPointer} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={walkthroughTitle}
        aria-describedby={describedBy}
        tabIndex={-1}
        className="relative z-[1] flex h-dvh max-h-dvh w-full flex-col overflow-hidden bg-black/80 outline-none focus:outline-none"
      >
        <button
          type="button"
          onClick={closeFromPointer}
          aria-label="Close"
          className={dialogCloseButtonClass}
        >
          <span aria-hidden>×</span>
        </button>

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <div
            ref={videoStageRef}
            className="relative flex min-h-0 flex-1 items-center justify-center"
            onPointerMove={bumpOverlayActivity}
            onTouchStart={bumpOverlayActivity}
          >
            <video
              ref={videoRef}
              src={demo.video}
              controls={false}
              playsInline
              preload="metadata"
              className="max-h-full max-w-full object-contain"
              aria-label={`Guided demo for ${demo.client}`}
              onClick={() => {
                bumpOverlayActivity();
              }}
              {...mergedVideoHandlers}
            />
            <DemoVideoOverlayControls
              client={demo.client}
              playing={playing}
              onTogglePlayback={togglePlayback}
              currentTime={videoTime}
              duration={videoDuration}
              onSeekToTime={seekToTime}
              onPrevExplanation={() => seekToAdjacentCaption(-1)}
              onNextExplanation={() => seekToAdjacentCaption(1)}
              hasCaptions={hasCaptions}
              canGoPrev={canGoPrev}
              canGoNext={canGoNext}
              activityTick={overlayActivityTick}
            />
          </div>

          <aside className="flex max-h-[45vh] w-full shrink-0 flex-col border-t border-white/10 md:max-h-none md:w-[min(100%,320px)] md:min-w-[300px] md:max-w-[340px] md:border-l md:border-t-0">
            {hasCaptions && captions ? (
              <DemoWalkthroughSidebar
                title={walkthroughTitle}
                description={demo.description}
                titleId={titleId}
                descriptionId={descriptionId}
                captions={captions}
                captionsId={captionsId}
                activeCueIndex={activeCueIndex}
                onSeekToCaption={seekToCaption}
                hasNarrationAudio={hasNarrationAudio}
                narrationMuted={narrationMuted}
                onToggleNarrationMute={toggleNarrationMute}
              />
            ) : (
              <section className="flex min-h-0 flex-1 flex-col overflow-hidden" aria-labelledby={titleId}>
                <div className="shrink-0 px-4 py-4 sm:px-5 sm:py-5">
                  <h2
                    id={titleId}
                    className="font-sans text-[17px] font-semibold leading-snug tracking-[-0.02em] text-white sm:text-[18px]"
                  >
                    {walkthroughTitle}
                  </h2>
                  {demo.description ? (
                    <p
                      id={descriptionId}
                      className="mt-2 font-sans text-[14px] font-normal leading-[1.45] text-white/65 sm:text-[15px]"
                    >
                      {demo.description}
                    </p>
                  ) : null}
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>,
    document.body,
  );
}