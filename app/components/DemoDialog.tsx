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
  DemoNarrationMuteButton,
  DemoVideoOverlayControls,
  DemoWalkthroughMobileCaptions,
  DemoWalkthroughSidebar,
} from "./DemoCaptionChrome";
import { useNarratedDemoPlayback } from "../hooks/useNarratedDemoPlayback";
import {
  useWorkDemoSwitch,
  type WorkDemoSwitchId,
} from "./WorkDemoSwitchContext";

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
  /** Modal header title. */
  title?: string;
  /** Modal header subtitle (e.g. client name). */
  subtitle?: string;
  description?: string;
  /** Caption list section heading. */
  walkthroughHeading?: string;
  /** Hero gradient behind the walkthrough video (matches project card). */
  bgImage?: string;
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
  "absolute right-3 top-3 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md font-sans text-[26px] leading-none text-black/45 outline-none transition-colors hover:text-black/75 focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] sm:right-4 sm:top-4";

/** Min horizontal gutter (overlay centering vs. card) before showing outside demo-switch chevrons. */
const DEMO_SWITCH_CHEVRON_MIN_GUTTER_PX = 48;

const demoSwitchChevronButtonClass =
  "absolute top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-[#F4F2EE]/92 text-black/65 shadow-sm outline-none transition-colors hover:bg-[#F4F2EE] hover:text-black/85 focus-visible:ring-2 focus-visible:ring-[#F4F2EE] focus-visible:ring-offset-2 focus-visible:ring-offset-black/80 [-webkit-tap-highlight-color:transparent]";

function DemoSwitchChevronIcon({
  direction,
  className = "h-5 w-5",
}: {
  direction: "prev" | "next";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "prev" ? (
        <path d="m14 6-6 6 6 6" />
      ) : (
        <path d="m10 6 6 6-6 6" />
      )}
    </svg>
  );
}

export function PlayIcon({ className = "ml-[6%] h-[38%] w-[38%] shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M8 5.2v13.6a.8.8 0 0 0 1.22.68l10.4-6.8a.8.8 0 0 0 0-1.36L9.22 4.52A.8.8 0 0 0 8 5.2Z" />
    </svg>
  );
}

type DemoCloseModality = "keyboard" | "pointer" | "switch";

/** Play control + dialog; place inside a `relative` media container. */
export function DemoPlayOverlay({
  client,
  video,
  title,
  subtitle,
  description,
  walkthroughHeading,
  bgImage,
  captions,
  layout,
  demoSwitchId,
}: {
  client: string;
  video: string;
  title?: string;
  subtitle?: string;
  description?: string;
  walkthroughHeading?: string;
  bgImage?: string;
  captions?: readonly DemoCaption[];
  layout?: DemoDialogLayout;
  /** When set, Left/Right arrows cycle work-grid demos (homepage). */
  demoSwitchId?: WorkDemoSwitchId;
}) {
  const [open, setOpen] = useState(false);
  const [forceHidden, setForceHidden] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const [hoverCapable, setHoverCapable] = useState<boolean | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const openRef = useRef(false);
  openRef.current = open;
  const workDemoSwitch = useWorkDemoSwitch();

  const openFromSwitch = useCallback(() => {
    const opener = openerRef.current;
    setForceHidden(true);
    setFocusVisible(false);
    opener?.blur();
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!demoSwitchId || !workDemoSwitch) return;
    return workDemoSwitch.register({
      id: demoSwitchId,
      isOpen: () => openRef.current,
      openFromSwitch,
    });
  }, [demoSwitchId, openFromSwitch, workDemoSwitch]);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const apply = () => setHoverCapable(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const close = useCallback((_modality?: DemoCloseModality) => {
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
            ? {
                client,
                video,
                title,
                subtitle,
                description,
                walkthroughHeading,
                bgImage,
                captions,
                layout,
              }
            : null
        }
        onClose={close}
        openerRef={openerRef}
        demoSwitchId={demoSwitchId}
      />
    </>
  );
}

export default function DemoDialog({
  demo,
  onClose,
  openerRef,
  demoSwitchId,
}: {
  demo: DemoDialogContent | null;
  onClose: (modality?: DemoCloseModality) => void;
  openerRef: RefObject<HTMLButtonElement | null>;
  demoSwitchId?: WorkDemoSwitchId;
}) {
  const titleId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoStageRef = useRef<HTMLDivElement>(null);
  const closeModalityRef = useRef<DemoCloseModality>("pointer");
  const workDemoSwitch = useWorkDemoSwitch();
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [overlayActivityTick, setOverlayActivityTick] = useState(0);
  const [demoSwitchSideGutterPx, setDemoSwitchSideGutterPx] = useState(0);

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
    (modality: DemoCloseModality) => {
      pauseSession();
      closeModalityRef.current = modality;
      if (modality === "pointer") {
        openerRef.current?.blur();
      }
      onClose(modality);
    },
    [onClose, openerRef, pauseSession],
  );

  const switchToAdjacentDemo = useCallback(
    (delta: -1 | 1) => {
      if (!demoSwitchId || !workDemoSwitch || demo?.layout !== "walkthrough") return;
      const nextId = workDemoSwitch.getAdjacentId(demoSwitchId, delta);
      if (!nextId) return;
      pauseSession();
      closeModalityRef.current = "switch";
      onClose("switch");
      workDemoSwitch.openDemo(nextId);
    },
    [demo?.layout, demoSwitchId, onClose, pauseSession, workDemoSwitch],
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
      const isHorizontal =
        event.key === "ArrowLeft" || event.key === "ArrowRight";
      if (isHorizontal && demo.layout === "walkthrough") {
        const target = event.target;
        if (
          !(
            target instanceof HTMLElement &&
            (target.isContentEditable ||
              target.closest("input, textarea, select, [contenteditable='true']"))
          )
        ) {
          const delta = event.key === "ArrowLeft" ? -1 : 1;
          if (demoSwitchId && workDemoSwitch) {
            const nextId = workDemoSwitch.getAdjacentId(demoSwitchId, delta);
            if (nextId) {
              event.preventDefault();
              switchToAdjacentDemo(delta);
              return;
            }
          }
        }
      }
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      const focusRoot = overlayRef.current ?? dialog;
      if (!focusRoot || !dialog) return;
      const focusable = [
        ...focusRoot.querySelectorAll<HTMLElement>(
          "[data-demo-switch-chevron], button, video, a[href], input[type='range']",
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
      if (
        event.shiftKey &&
        (active === first || active === dialog || !focusRoot.contains(active))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (active === last || active === dialog || active === focusRoot)
      ) {
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
      } else if (closeModalityRef.current !== "switch") {
        opener?.blur();
      }
    };
  }, [
    demo,
    demoSwitchId,
    onClose,
    openerRef,
    pauseSession,
    requestClose,
    switchToAdjacentDemo,
    workDemoSwitch,
  ]);

  useEffect(() => {
    if (!demo) {
      setVideoTime(0);
      setVideoDuration(0);
      setDemoSwitchSideGutterPx(0);
    }
  }, [demo]);

  useEffect(() => {
    if (!demo || demo.layout !== "walkthrough") {
      setDemoSwitchSideGutterPx(0);
      return;
    }
    const dialog = dialogRef.current;
    const overlay = overlayRef.current;
    if (!dialog || !overlay) return;

    const measure = () => {
      const gutter =
        (overlay.getBoundingClientRect().width -
          dialog.getBoundingClientRect().width) /
        2;
      setDemoSwitchSideGutterPx(Number.isFinite(gutter) ? Math.max(0, gutter) : 0);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(dialog);
    ro.observe(overlay);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
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
  const isWalkthrough = demo.layout === "walkthrough";
  const modalTitle = demo.title ?? demo.client;
  const modalAriaLabel = demo.subtitle
    ? `${modalTitle}, ${demo.subtitle}`
    : modalTitle;
  const describedBy =
    [hasCaptions ? captionsId : null, descriptionId].filter(Boolean).join(" ") || undefined;

  const shellClass = isWalkthrough
    ? "relative flex h-dvh max-h-dvh w-full min-h-0 flex-col overflow-hidden rounded-none bg-[#F4F2EE] outline-none focus:outline-none md:max-h-[min(860px,calc(100dvh-2rem))] md:rounded-[16px] md:border md:border-black/15"
    : "relative z-[1] flex h-dvh max-h-dvh w-full flex-col overflow-hidden bg-black/80 outline-none focus:outline-none";

  const canCycleWorkDemos =
    isWalkthrough &&
    demoSwitchId &&
    workDemoSwitch &&
    workDemoSwitch.getAdjacentId(demoSwitchId, 1) != null;

  const showDemoSwitchChevrons =
    canCycleWorkDemos &&
    demoSwitchSideGutterPx >= DEMO_SWITCH_CHEVRON_MIN_GUTTER_PX;

  const closeClass = isWalkthrough
    ? dialogCloseButtonClass
    : "absolute right-3 top-3 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md font-sans text-[26px] leading-none text-white/75 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black/80 sm:right-4 sm:top-4";

  const demoSwitchChevrons = showDemoSwitchChevrons ? (
    <>
      <button
        type="button"
        data-demo-switch-chevron=""
        className={`${demoSwitchChevronButtonClass} right-full mr-2`}
        aria-label="Previous demo"
        onClick={() => switchToAdjacentDemo(-1)}
      >
        <DemoSwitchChevronIcon direction="prev" />
      </button>
      <button
        type="button"
        data-demo-switch-chevron=""
        className={`${demoSwitchChevronButtonClass} left-full ml-2`}
        aria-label="Next demo"
        onClick={() => switchToAdjacentDemo(1)}
      >
        <DemoSwitchChevronIcon direction="next" />
      </button>
    </>
  ) : null;

  const dialogPanel = (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={modalAriaLabel}
      aria-describedby={describedBy}
      tabIndex={-1}
      className={shellClass}
    >
      <button
        type="button"
        onClick={closeFromPointer}
        aria-label="Close"
        className={closeClass}
      >
        <span aria-hidden>×</span>
      </button>

      {hasCaptions && captions ? (
        <p id={captionsId} className="sr-only" aria-live="polite">
          {captions[activeCueIndex]?.text ?? ""}
        </p>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <div
          className={
            isWalkthrough
              ? "flex min-h-0 min-w-0 flex-1 flex-col md:min-h-0"
              : "contents"
          }
        >
          {isWalkthrough ? (
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-black/10 px-4 py-3 pr-12 md:hidden">
              <div className="min-w-0">
                <h2 className="font-sans text-[16px] font-semibold leading-snug tracking-[-0.02em] text-black">
                  {modalTitle}
                </h2>
                {demo.subtitle ? (
                  <p className="mt-0.5 font-sans text-[13px] font-normal leading-snug text-black/55">
                    {demo.subtitle}
                  </p>
                ) : null}
                {!hasCaptions && demo.description ? (
                  <p
                    id={descriptionId}
                    className="mt-2 font-sans text-[13px] font-normal leading-[1.45] text-black/70"
                  >
                    {demo.description}
                  </p>
                ) : null}
              </div>
              {hasNarrationAudio ? (
                <DemoNarrationMuteButton
                  muted={narrationMuted}
                  onToggle={toggleNarrationMute}
                />
              ) : null}
            </div>
          ) : null}

          <div
            ref={videoStageRef}
            className={
              isWalkthrough
                ? "relative flex min-h-0 min-w-0 flex-1 flex-col"
                : "relative flex min-h-0 flex-1 items-center justify-center"
            }
            onPointerMove={bumpOverlayActivity}
            onTouchStart={bumpOverlayActivity}
          >
            {isWalkthrough && demo.bgImage ? (
              <div
                className="pointer-events-none absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${demo.bgImage})` }}
                aria-hidden
              />
            ) : null}
            <div
              className={
                isWalkthrough
                  ? "relative flex min-h-0 flex-1 items-center justify-center p-3 sm:p-4 md:p-6"
                  : "contents"
              }
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
                activityTick={overlayActivityTick}
              />
            </div>
          </div>

          {isWalkthrough && hasCaptions && captions ? (
            <DemoWalkthroughMobileCaptions
              journeyHeading={demo.walkthroughHeading}
              captions={captions}
              activeCueIndex={activeCueIndex}
              onSeekToAdjacentCaption={seekToAdjacentCaption}
            />
          ) : null}
        </div>

        {isWalkthrough ? (
          <aside className="hidden min-h-0 w-full shrink-0 flex-col border-t border-black/10 md:flex md:max-h-none md:w-[min(100%,340px)] md:min-w-[300px] md:max-w-[340px] md:border-l md:border-t-0">
            {hasCaptions && captions ? (
              <DemoWalkthroughSidebar
                title={modalTitle}
                subtitle={demo.subtitle}
                journeyHeading={demo.walkthroughHeading}
                description={demo.description}
                titleId={titleId}
                descriptionId={descriptionId}
                captions={captions}
                activeCueIndex={activeCueIndex}
                onSeekToCaption={seekToCaption}
                hasNarrationAudio={hasNarrationAudio}
                narrationMuted={narrationMuted}
                onToggleNarrationMute={toggleNarrationMute}
              />
            ) : (
              <section
                className="flex min-h-0 flex-1 flex-col overflow-hidden"
                aria-labelledby={titleId}
              >
                <div className="shrink-0 px-4 py-4 pr-12 sm:px-5 sm:py-5 sm:pr-14">
                  <h2
                    id={titleId}
                    className="font-sans text-[17px] font-semibold leading-snug tracking-[-0.02em] text-black sm:text-[18px]"
                  >
                    {modalTitle}
                  </h2>
                  {demo.subtitle ? (
                    <p className="mt-1 font-sans text-[14px] font-normal leading-snug text-black/55 sm:text-[15px]">
                      {demo.subtitle}
                    </p>
                  ) : null}
                  {demo.description ? (
                    <p
                      id={descriptionId}
                      className="mt-3 font-sans text-[14px] font-normal leading-[1.45] text-black/70 sm:text-[15px]"
                    >
                      {demo.description}
                    </p>
                  ) : null}
                </div>
              </section>
            )}
          </aside>
        ) : null}
      </div>
    </div>
  );

  return createPortal(
    <div
      ref={isWalkthrough ? overlayRef : undefined}
      className={
        isWalkthrough
          ? "fixed inset-0 z-[140] flex items-stretch justify-center overflow-hidden p-0 md:items-center md:p-6"
          : "fixed inset-0 z-[140] flex h-dvh max-h-dvh flex-col overflow-hidden"
      }
    >
      <div
        className="fixed inset-0 bg-black/80"
        onClick={closeFromPointer}
        aria-hidden="true"
      />
      {isWalkthrough ? (
        <div className="relative z-[1] flex h-full w-full min-w-0 md:h-auto md:max-w-[min(1180px,calc(100vw-1.5rem))]">
          {demoSwitchChevrons}
          {dialogPanel}
        </div>
      ) : (
        dialogPanel
      )}
    </div>,
    document.body,
  );
}