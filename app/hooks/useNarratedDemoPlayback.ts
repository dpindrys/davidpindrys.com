"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type SyntheticEvent,
} from "react";
import {
  BREATH_MS,
  CAPTION_FADE_MS,
  NARRATED_PLAYBACK_RATE,
  captionCueIndexAt,
  captionEndAt,
  captionTextAt,
  isSilentRestLeadCue,
  longestCaptionText,
  narratedCueFillDuringVideo,
  narratedFreezeHoldTime,
  segmentFillsAt,
  segmentFillsDuringHold,
  shouldFreezeNarratedCue,
  type DemoCaption,
} from "../lib/demoNarration";
import {
  readNarrationMutedPreference,
  writeNarrationMutedPreference,
} from "../lib/narrationMute";

export type UseNarratedDemoPlaybackOptions = {
  captions?: readonly DemoCaption[];
  /** When false, keyboard Space/arrows are not bound. Default true. */
  keyboardEnabled?: boolean;
  /**
   * When true, Space/arrows only bind after the user has started playback
   * (case study heroes). Dialogs leave this false so Space can start the demo.
   */
  keyboardRequiresPlaybackStarted?: boolean;
  /**
   * Reset latch when this key changes (e.g. dialog open content id).
   * Omit for page-level heroes that keep one session.
   */
  resetKey?: string | number | null;
};

/**
 * Shared caption sync, narration audio, freeze/breath, and playback-rate behavior
 * used by DemoDialog and the Frx case study hero.
 */
export function useNarratedDemoPlayback({
  captions,
  keyboardEnabled = true,
  keyboardRequiresPlaybackStarted = false,
  resetKey = null,
}: UseNarratedDemoPlaybackOptions) {
  const captionsId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const narrationAudioRef = useRef<HTMLAudioElement | null>(null);
  const narrationCueRef = useRef(-1);
  const playbackEndedRef = useRef(false);
  const activeCueRef = useRef(-1);
  const captionFadeTimeoutRef = useRef<number | null>(null);
  const freezeActiveRef = useRef(false);
  const freezeCueIndexRef = useRef(-1);
  const breathTimerRef = useRef<number | null>(null);
  const userPausedDuringFreezeRef = useRef(false);
  const programmaticPauseRef = useRef(false);
  const programmaticSeekRef = useRef(false);
  const playingRef = useRef(false);
  const holdFillAnimRef = useRef<{
    cueIndex: number;
    fromFill: number;
    startedAt: number;
    durationMs: number;
  } | null>(null);
  const holdFillRafRef = useRef<number | null>(null);
  const pausedHoldFillRef = useRef<number | null>(null);

  const hasCaptions = Boolean(captions && captions.length > 0);
  const hasNarrationAudio = Boolean(captions?.some((caption) => Boolean(caption.audio)));

  const [narrationMuted, setNarrationMuted] = useState(readNarrationMutedPreference);
  const narrationMutedRef = useRef(narrationMuted);
  narrationMutedRef.current = narrationMuted;

  const [captionText, setCaptionText] = useState("");
  const [segmentFills, setSegmentFills] = useState<number[]>([]);
  const [captionOpaque, setCaptionOpaque] = useState(true);
  const [playing, setPlaying] = useState(false);
  playingRef.current = playing;
  const [playbackStarted, setPlaybackStarted] = useState(false);
  const playbackStartedRef = useRef(false);
  const [activeCueIndex, setActiveCueIndex] = useState(0);

  const markPlaybackStarted = useCallback(() => {
    playbackStartedRef.current = true;
    setPlaybackStarted(true);
  }, []);

  const clearPlaybackStarted = useCallback(() => {
    playbackStartedRef.current = false;
    setPlaybackStarted(false);
  }, []);

  const clearBreathTimer = useCallback(() => {
    if (breathTimerRef.current != null) {
      window.clearTimeout(breathTimerRef.current);
      breathTimerRef.current = null;
    }
  }, []);

  const stopHoldFillAnimation = useCallback(() => {
    if (holdFillRafRef.current != null) {
      window.cancelAnimationFrame(holdFillRafRef.current);
      holdFillRafRef.current = null;
    }
    holdFillAnimRef.current = null;
  }, []);

  const peekHoldFill = useCallback((): number | null => {
    const anim = holdFillAnimRef.current;
    if (!anim) return null;
    if (anim.durationMs <= 0) return 1;
    const t = Math.min(1, Math.max(0, (performance.now() - anim.startedAt) / anim.durationMs));
    return anim.fromFill + (1 - anim.fromFill) * t;
  }, []);

  const startHoldFillAnimation = useCallback(
    (cueIndex: number, fromFill: number, durationMs: number) => {
      if (!captions?.length) return;
      if (holdFillRafRef.current != null) {
        window.cancelAnimationFrame(holdFillRafRef.current);
        holdFillRafRef.current = null;
      }

      const start = Math.min(1, Math.max(0, fromFill));
      const from = start >= 0.999 ? 0.92 : start;
      const duration = Math.max(durationMs, 1);

      holdFillAnimRef.current = {
        cueIndex,
        fromFill: from,
        startedAt: performance.now(),
        durationMs: duration,
      };
      setSegmentFills(segmentFillsDuringHold(captions, cueIndex, from));

      const tick = () => {
        const anim = holdFillAnimRef.current;
        if (!anim || anim.cueIndex !== cueIndex) {
          holdFillRafRef.current = null;
          return;
        }
        const elapsed = performance.now() - anim.startedAt;
        const t = Math.min(1, elapsed / anim.durationMs);
        const fill = anim.fromFill + (1 - anim.fromFill) * t;
        setSegmentFills(segmentFillsDuringHold(captions, cueIndex, fill));
        if (t < 1) {
          holdFillRafRef.current = window.requestAnimationFrame(tick);
        } else {
          holdFillRafRef.current = null;
        }
      };
      holdFillRafRef.current = window.requestAnimationFrame(tick);
    },
    [captions],
  );

  const estimateHoldDurationMs = useCallback((cueIndex: number): number => {
    const audio = narrationAudioRef.current;
    let remAudioMs = 0;
    if (
      audio &&
      narrationCueRef.current === cueIndex &&
      audio.src !== "" &&
      audio.error == null &&
      !audio.ended
    ) {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        remAudioMs = Math.max(0, (audio.duration - audio.currentTime) * 1000);
      }
    }
    return remAudioMs + BREATH_MS;
  }, []);

  const clearFreezeState = useCallback(() => {
    clearBreathTimer();
    stopHoldFillAnimation();
    pausedHoldFillRef.current = null;
    freezeActiveRef.current = false;
    freezeCueIndexRef.current = -1;
    userPausedDuringFreezeRef.current = false;
  }, [clearBreathTimer, stopHoldFillAnimation]);

  const toggleNarrationMute = useCallback(() => {
    setNarrationMuted((prev) => {
      const next = !prev;
      writeNarrationMutedPreference(next);
      const audio = narrationAudioRef.current;
      if (audio) audio.muted = next;
      return next;
    });
  }, []);

  useEffect(() => {
    const audio = narrationAudioRef.current;
    if (audio) audio.muted = narrationMuted;
  }, [narrationMuted]);

  const stopNarration = useCallback(() => {
    const audio = narrationAudioRef.current;
    narrationCueRef.current = -1;
    if (!audio) return;
    audio.pause();
    audio.removeAttribute("src");
    try {
      audio.load();
    } catch {
      // Ignore load errors on emptied src.
    }
  }, []);

  const resetPlaybackSession = useCallback(() => {
    playbackEndedRef.current = false;
    activeCueRef.current = -1;
    narrationCueRef.current = -1;
    clearFreezeState();
    programmaticPauseRef.current = false;
    programmaticSeekRef.current = false;
    setPlaying(false);
    clearPlaybackStarted();
    setActiveCueIndex(0);
    stopNarration();
    if (captionFadeTimeoutRef.current != null) {
      window.clearTimeout(captionFadeTimeoutRef.current);
      captionFadeTimeoutRef.current = null;
    }
    if (captions?.length) {
      setCaptionText(captions[0].text);
      setSegmentFills(captions.map(() => 0));
      setCaptionOpaque(true);
    } else {
      setCaptionText("");
      setSegmentFills([]);
      setCaptionOpaque(true);
    }
    const video = videoRef.current;
    if (video) video.playbackRate = 1;
  }, [captions, clearFreezeState, clearPlaybackStarted, stopNarration]);

  useEffect(() => {
    resetPlaybackSession();
  }, [resetKey, resetPlaybackSession]);

  useEffect(() => {
    return () => {
      if (captionFadeTimeoutRef.current != null) {
        window.clearTimeout(captionFadeTimeoutRef.current);
      }
      clearBreathTimer();
      clearFreezeState();
      stopNarration();
      narrationAudioRef.current = null;
    };
  }, [clearBreathTimer, clearFreezeState, stopNarration]);

  const applyCaptionCue = useCallback((index: number, text: string) => {
    const prev = activeCueRef.current;
    activeCueRef.current = index;

    setActiveCueIndex(index);
    if (prev === -1 || prev === index) {
      setCaptionText(text);
      setCaptionOpaque(true);
      return;
    }

    if (captionFadeTimeoutRef.current != null) {
      window.clearTimeout(captionFadeTimeoutRef.current);
      captionFadeTimeoutRef.current = null;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setCaptionText(text);
      setCaptionOpaque(true);
      return;
    }

    setCaptionOpaque(false);
    captionFadeTimeoutRef.current = window.setTimeout(() => {
      setCaptionText(text);
      setCaptionOpaque(true);
      captionFadeTimeoutRef.current = null;
    }, CAPTION_FADE_MS);
  }, []);

  const syncCaptionsFromVideo = useCallback(
    (video: HTMLVideoElement) => {
      if (!captions?.length) return;

      if (
        freezeActiveRef.current &&
        freezeCueIndexRef.current >= 0 &&
        !userPausedDuringFreezeRef.current
      ) {
        const index = freezeCueIndexRef.current;
        const caption = captions[index];
        if (caption) {
          applyCaptionCue(index, caption.text);
          return;
        }
      }

      const time = video.currentTime;
      if (playbackEndedRef.current && time < 0.25) {
        playbackEndedRef.current = false;
      }
      const ended = playbackEndedRef.current;
      const duration = Number.isFinite(video.duration) ? video.duration : Number.NaN;
      const preferRestLead =
        !playbackStartedRef.current && isSilentRestLeadCue(captions[0]);
      const cueOptions = preferRestLead ? { preferRestLead: true } : undefined;

      let finishing = activeCueRef.current;
      if (finishing < 0 || finishing >= captions.length) {
        finishing = captionCueIndexAt(time, captions, ended, duration, cueOptions);
      }
      const finishingCaption = captions[finishing];
      if (
        !ended &&
        !preferRestLead &&
        shouldFreezeNarratedCue(finishing, captions) &&
        finishingCaption?.audio &&
        captions[finishing + 1] &&
        !userPausedDuringFreezeRef.current
      ) {
        const end = captionEndAt(finishingCaption, finishing, captions, duration);
        const holdAt = narratedFreezeHoldTime(finishingCaption, finishing, captions, duration);
        if (time + 1e-3 >= end && time + 1e-3 < holdAt) {
          const audio = narrationAudioRef.current;
          const audioDur =
            audio &&
            narrationCueRef.current === finishing &&
            Number.isFinite(audio.duration) &&
            audio.duration > 0
              ? audio.duration
              : null;
          const fill = narratedCueFillDuringVideo(
            Math.min(time, end - 0.04),
            finishingCaption,
            finishing,
            captions,
            duration,
            audioDur,
          );
          setSegmentFills(segmentFillsDuringHold(captions, finishing, fill));
          applyCaptionCue(finishing, finishingCaption.text);
          return;
        }
      }

      const index = captionCueIndexAt(time, captions, ended, duration, cueOptions);
      const text = captionTextAt(time, captions, ended, cueOptions);
      if (preferRestLead) {
        setSegmentFills(captions.map(() => 0));
        applyCaptionCue(index, text);
        return;
      }
      const audio = narrationAudioRef.current;
      const activeCueAudioDurationSec =
        audio &&
        narrationCueRef.current === index &&
        Number.isFinite(audio.duration) &&
        audio.duration > 0
          ? audio.duration
          : null;
      setSegmentFills(
        segmentFillsAt(time, captions, ended, duration, { activeCueAudioDurationSec }),
      );
      applyCaptionCue(index, text);
    },
    [applyCaptionCue, captions],
  );

  const advanceAfterBreath = useCallback(() => {
    const video = videoRef.current;
    if (!video || !captions?.length) return;
    if (userPausedDuringFreezeRef.current) return;

    const cueIndex = freezeCueIndexRef.current;
    clearFreezeState();

    if (cueIndex < 0) return;

    if (cueIndex >= captions.length - 1) {
      playbackEndedRef.current = true;
      setPlaying(false);
      stopNarration();
      setSegmentFills(captions.map(() => 1));
      applyCaptionCue(cueIndex, captions[cueIndex].text);
      return;
    }

    const next = captions[cueIndex + 1];
    if (!next) return;

    playbackEndedRef.current = false;
    applyCaptionCue(cueIndex + 1, next.text);

    if (video.currentTime + 1e-3 < next.start) {
      programmaticSeekRef.current = true;
      video.currentTime = next.start;
    }
    void video.play().catch(() => {
      // Autoplay blocked after programmatic advance — UI stays paused.
    });
  }, [applyCaptionCue, captions, clearFreezeState, stopNarration]);

  const startBreathAfterNarration = useCallback(() => {
    clearBreathTimer();
    if (!freezeActiveRef.current || userPausedDuringFreezeRef.current) return;

    const cueIndex = freezeCueIndexRef.current;
    if (cueIndex >= 0 && captions?.length) {
      const from = peekHoldFill() ?? 0;
      startHoldFillAnimation(cueIndex, from, BREATH_MS);
    }

    breathTimerRef.current = window.setTimeout(() => {
      breathTimerRef.current = null;
      advanceAfterBreath();
    }, BREATH_MS);
  }, [
    advanceAfterBreath,
    captions,
    clearBreathTimer,
    peekHoldFill,
    startHoldFillAnimation,
  ]);

  const enterFreezeAtCue = useCallback(
    (video: HTMLVideoElement, index: number) => {
      if (!captions?.length || freezeActiveRef.current) return;
      if (!shouldFreezeNarratedCue(index, captions)) return;
      const caption = captions[index];
      if (!caption?.audio) return;

      const duration = Number.isFinite(video.duration) ? video.duration : Number.NaN;
      const end = captionEndAt(caption, index, captions, duration);
      const holdAt = narratedFreezeHoldTime(caption, index, captions, duration);

      freezeActiveRef.current = true;
      freezeCueIndexRef.current = index;
      userPausedDuringFreezeRef.current = false;
      clearBreathTimer();

      if (Math.abs(video.currentTime - holdAt) > 0.02) {
        programmaticSeekRef.current = true;
        video.currentTime = holdAt;
      }

      if (!video.paused) {
        programmaticPauseRef.current = true;
        video.pause();
      }

      setPlaying(true);
      applyCaptionCue(index, caption.text);

      const audioForFill = narrationAudioRef.current;
      const audioDur =
        audioForFill &&
        narrationCueRef.current === index &&
        Number.isFinite(audioForFill.duration) &&
        audioForFill.duration > 0
          ? audioForFill.duration
          : null;
      const fromFill = narratedCueFillDuringVideo(
        Math.min(holdAt, end - 0.04),
        caption,
        index,
        captions,
        duration,
        audioDur,
      );
      startHoldFillAnimation(index, fromFill, estimateHoldDurationMs(index));

      const audio = narrationAudioRef.current;
      const narrationStillPlaying =
        audio &&
        narrationCueRef.current === index &&
        !audio.ended &&
        audio.src !== "" &&
        audio.error == null;

      if (narrationStillPlaying) {
        if (audio.paused && !userPausedDuringFreezeRef.current) {
          void audio.play().catch(() => {
            startBreathAfterNarration();
          });
        }
        const onEnded = () => {
          if (!freezeActiveRef.current || freezeCueIndexRef.current !== index) return;
          startBreathAfterNarration();
        };
        audio.addEventListener("ended", onEnded, { once: true });
      } else {
        startBreathAfterNarration();
      }
    },
    [
      applyCaptionCue,
      captions,
      clearBreathTimer,
      estimateHoldDurationMs,
      startBreathAfterNarration,
      startHoldFillAnimation,
    ],
  );

  const maybeFreezeAtCueBoundary = useCallback(
    (video: HTMLVideoElement) => {
      if (!hasNarrationAudio || !captions?.length) return;
      if (freezeActiveRef.current || playbackEndedRef.current) return;
      if (video.paused && !programmaticPauseRef.current) return;

      const duration = Number.isFinite(video.duration) ? video.duration : Number.NaN;
      const time = video.currentTime;
      let index = activeCueRef.current;
      if (index < 0 || index >= captions.length) {
        index = captionCueIndexAt(time, captions, false, duration);
      }
      const caption = captions[index];
      if (!caption?.audio || !shouldFreezeNarratedCue(index, captions)) return;

      const holdAt = narratedFreezeHoldTime(caption, index, captions, duration);
      if (time + 1e-3 >= holdAt || (video.ended && index === captions.length - 1)) {
        enterFreezeAtCue(video, index);
      }
    },
    [captions, enterFreezeAtCue, hasNarrationAudio],
  );

  const syncNarrationFromVideo = useCallback(
    (video: HTMLVideoElement, options?: { forceAudioSeek?: boolean }) => {
      if (!hasNarrationAudio || !captions?.length) {
        stopNarration();
        return;
      }

      if (freezeActiveRef.current) return;

      // Rest / before play: keep silent lead caption; do not latch first narrated audio.
      if (!playbackStartedRef.current && isSilentRestLeadCue(captions[0])) {
        stopNarration();
        return;
      }

      const time = video.currentTime;
      if (playbackEndedRef.current && time < 0.25) {
        playbackEndedRef.current = false;
      }
      const ended = playbackEndedRef.current || video.ended;
      if (ended) {
        stopNarration();
        return;
      }

      const duration = Number.isFinite(video.duration) ? video.duration : Number.NaN;
      let index = activeCueRef.current;
      if (index < 0 || index >= captions.length) {
        index = captionCueIndexAt(time, captions, false, duration);
      } else {
        const finishing = captions[index];
        const next = captions[index + 1];
        if (shouldFreezeNarratedCue(index, captions) && finishing?.audio && next) {
          const end = captionEndAt(finishing, index, captions, duration);
          const holdAt = narratedFreezeHoldTime(finishing, index, captions, duration);
          if (!(time + 1e-3 >= end && time + 1e-3 < holdAt)) {
            index = captionCueIndexAt(time, captions, false, duration);
          }
        } else {
          index = captionCueIndexAt(time, captions, false, duration);
        }
      }
      const caption = captions[index];
      const audioSrc = caption?.audio;
      if (!audioSrc) {
        stopNarration();
        return;
      }

      let audio = narrationAudioRef.current;
      if (!audio) {
        audio = new Audio();
        audio.preload = "auto";
        audio.playbackRate = 1;
        audio.muted = narrationMutedRef.current;
        narrationAudioRef.current = audio;
      } else {
        audio.playbackRate = 1;
        audio.muted = narrationMutedRef.current;
      }

      const offset = Math.max(0, time - caption.start);
      const absoluteSrc = new URL(audioSrc, window.location.origin).href;
      const cueChanged = narrationCueRef.current !== index;
      const srcChanged = audio.src !== absoluteSrc;
      const forceAudioSeek = options?.forceAudioSeek === true;

      const seekAudio = () => {
        try {
          if (Number.isFinite(audio!.duration) && audio!.duration > 0) {
            audio!.currentTime = Math.min(offset, Math.max(0, audio!.duration - 0.05));
          } else {
            audio!.currentTime = offset;
          }
        } catch {
          // readyState may still block seeks; play will start near 0.
        }
      };

      const playOrPauseWithVideo = () => {
        if (video.paused) {
          if (!audio!.paused) audio!.pause();
          return;
        }
        if (!audio!.paused || audio!.ended) return;
        void audio!.play().catch(() => {
          // Autoplay policy, missing file, or decode error: leave silent.
        });
      };

      if (cueChanged || srcChanged) {
        narrationCueRef.current = index;
        audio.pause();
        if (srcChanged) {
          audio.src = audioSrc;
        }
        const onReady = () => {
          seekAudio();
          playOrPauseWithVideo();
        };
        if (audio.readyState >= 1) {
          onReady();
        } else {
          audio.addEventListener("loadedmetadata", onReady, { once: true });
          audio.addEventListener(
            "error",
            () => {
              if (narrationCueRef.current === index) {
                narrationCueRef.current = -1;
              }
            },
            { once: true },
          );
        }
        return;
      }

      if (forceAudioSeek && Math.abs(audio.currentTime - offset) > 0.35) {
        seekAudio();
      }
      playOrPauseWithVideo();
    },
    [captions, hasNarrationAudio, stopNarration],
  );

  const applyNarratedPlaybackRate = useCallback(
    (video: HTMLVideoElement) => {
      video.playbackRate = hasNarrationAudio ? NARRATED_PLAYBACK_RATE : 1;
    },
    [hasNarrationAudio],
  );

  const shouldResumeAfterSeek = useCallback(() => {
    return (
      playingRef.current ||
      (freezeActiveRef.current && !userPausedDuringFreezeRef.current)
    );
  }, []);

  const seekToCaption = useCallback(
    (index: number) => {
      const video = videoRef.current;
      if (!video || !captions?.length) return;
      const caption = captions[index];
      if (!caption) return;

      const resumeAfterSeek = shouldResumeAfterSeek();

      clearFreezeState();
      playbackEndedRef.current = false;
      applyCaptionCue(index, caption.text);
      programmaticSeekRef.current = true;
      video.currentTime = caption.start;
      markPlaybackStarted();

      if (resumeAfterSeek) {
        void video.play().catch(() => {
          // Autoplay policy: leave paused; captions still sync via onSeeked.
        });
      }
    },
    [applyCaptionCue, captions, clearFreezeState, markPlaybackStarted, shouldResumeAfterSeek],
  );

  const seekToTime = useCallback(
    (time: number) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(time)) return;
      const duration = Number.isFinite(video.duration) ? video.duration : Number.NaN;
      const clamped =
        Number.isFinite(duration) && duration > 0
          ? Math.min(Math.max(0, time), Math.max(0, duration - 0.04))
          : Math.max(0, time);

      const resumeAfterSeek = shouldResumeAfterSeek();

      clearFreezeState();
      playbackEndedRef.current = false;
      programmaticSeekRef.current = true;
      video.currentTime = clamped;
      markPlaybackStarted();

      if (resumeAfterSeek) {
        void video.play().catch(() => {});
      }
    },
    [clearFreezeState, markPlaybackStarted, shouldResumeAfterSeek],
  );

  const seekToAdjacentCaption = useCallback(
    (delta: -1 | 1) => {
      const video = videoRef.current;
      if (!video || !captions?.length) return;

      const duration = Number.isFinite(video.duration) ? video.duration : Number.NaN;
      let current = activeCueRef.current;
      if (current < 0) {
        current = captionCueIndexAt(
          video.currentTime,
          captions,
          playbackEndedRef.current,
          duration,
        );
      }

      const next = Math.min(captions.length - 1, Math.max(0, current + delta));
      if (next === current && delta === -1 && current === 0) {
        seekToCaption(0);
        return;
      }
      if (next === current && delta === 1) return;
      seekToCaption(next);
    },
    [captions, seekToCaption],
  );

  /**
   * True when the guided session has finished (latch, native ended, or paused
   * within a hair of duration). Used so Play / Space restarts from cue 0.
   */
  const isPlaybackAtEnd = useCallback((video: HTMLVideoElement): boolean => {
    if (playbackEndedRef.current) return true;
    if (video.ended) return true;
    const duration = video.duration;
    if (
      video.paused &&
      Number.isFinite(duration) &&
      duration > 0 &&
      video.currentTime >= duration - 0.08
    ) {
      return true;
    }
    return false;
  }, []);

  /** Seek to 0, reset captions/narration to the first cue, then play. */
  const replayFromStart = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    clearFreezeState();
    playbackEndedRef.current = false;
    stopNarration();

    if (captions?.length) {
      applyCaptionCue(0, captions[0].text);
      setSegmentFills(captions.map(() => 0));
      setCaptionOpaque(true);
    }

    programmaticSeekRef.current = true;
    video.currentTime = 0;
    markPlaybackStarted();
    setPlaying(true);
    applyNarratedPlaybackRate(video);
    void video.play().catch(() => {
      setPlaying(false);
    });
  }, [
    applyCaptionCue,
    applyNarratedPlaybackRate,
    captions,
    clearFreezeState,
    markPlaybackStarted,
    stopNarration,
  ]);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (freezeActiveRef.current) {
      if (!userPausedDuringFreezeRef.current && playingRef.current) {
        userPausedDuringFreezeRef.current = true;
        clearBreathTimer();
        narrationAudioRef.current?.pause();
        setPlaying(false);
        const pausedFill = peekHoldFill();
        const pausedIndex = freezeCueIndexRef.current;
        pausedHoldFillRef.current = pausedFill;
        stopHoldFillAnimation();
        if (captions?.length && pausedIndex >= 0 && pausedFill != null) {
          setSegmentFills(segmentFillsDuringHold(captions, pausedIndex, pausedFill));
        } else if (captions?.length) {
          const duration = Number.isFinite(video.duration) ? video.duration : Number.NaN;
          setSegmentFills(segmentFillsAt(video.currentTime, captions, false, duration));
        }
        return;
      }

      userPausedDuringFreezeRef.current = false;
      setPlaying(true);
      markPlaybackStarted();

      const index = freezeCueIndexRef.current;
      if (index >= 0 && captions?.length) {
        const currentFill = pausedHoldFillRef.current ?? 0;
        pausedHoldFillRef.current = null;
        startHoldFillAnimation(index, currentFill, estimateHoldDurationMs(index));
      }
      const audio = narrationAudioRef.current;
      const narrationStillPlaying =
        audio &&
        index >= 0 &&
        narrationCueRef.current === index &&
        !audio.ended &&
        audio.src !== "";

      if (narrationStillPlaying) {
        void audio.play().catch(() => {
          startBreathAfterNarration();
        });
        const onEnded = () => {
          if (!freezeActiveRef.current || freezeCueIndexRef.current !== index) return;
          startBreathAfterNarration();
        };
        audio.addEventListener("ended", onEnded, { once: true });
      } else {
        startBreathAfterNarration();
      }
      return;
    }

    // Ended / near end while paused: Play / Space restarts from the beginning.
    if (video.paused && isPlaybackAtEnd(video)) {
      replayFromStart();
      return;
    }

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, [
    captions,
    clearBreathTimer,
    estimateHoldDurationMs,
    isPlaybackAtEnd,
    markPlaybackStarted,
    peekHoldFill,
    replayFromStart,
    startBreathAfterNarration,
    startHoldFillAnimation,
    stopHoldFillAnimation,
  ]);

  /**
   * Pause video + narration in place (e.g. hero scrolled away).
   * Keeps video.currentTime and audio offset — never seeks to 0 / resets.
   * Does not auto-resume; caller must leave resume to an explicit play / Space.
   */
  const pauseSession = useCallback(() => {
    const video = videoRef.current;
    if (freezeActiveRef.current) {
      if (!userPausedDuringFreezeRef.current) {
        userPausedDuringFreezeRef.current = true;
        clearBreathTimer();
        narrationAudioRef.current?.pause();
        setPlaying(false);
        const pausedFill = peekHoldFill();
        const pausedIndex = freezeCueIndexRef.current;
        pausedHoldFillRef.current = pausedFill;
        stopHoldFillAnimation();
        if (captions?.length && pausedIndex >= 0 && pausedFill != null) {
          setSegmentFills(segmentFillsDuringHold(captions, pausedIndex, pausedFill));
        }
      } else {
        // Already user-paused during freeze: still kill any lingering audio/timers.
        clearBreathTimer();
        narrationAudioRef.current?.pause();
        setPlaying(false);
      }
      return;
    }
    clearBreathTimer();
    // pause() only — do not assign currentTime.
    if (video && !video.paused) video.pause();
    narrationAudioRef.current?.pause();
    setPlaying(false);
  }, [
    captions,
    clearBreathTimer,
    peekHoldFill,
    stopHoldFillAnimation,
  ]);

  useEffect(() => {
    if (!keyboardEnabled || !hasCaptions) return;
    // Page-level heroes: do not steal Space until the caption bar session has started.
    if (keyboardRequiresPlaybackStarted && !playbackStarted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const isSpace = event.key === " " || event.key === "Spacebar";
      const isArrow =
        event.key === "ArrowUp" || event.key === "ArrowDown";
      if (!isSpace && !isArrow) return;
      if (isArrow && !captions?.length) return;

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.closest("input, textarea, select, [contenteditable='true']"))
      ) {
        return;
      }

      event.preventDefault();

      if (isSpace) {
        togglePlayback();
        return;
      }

      if (event.key === "ArrowUp") {
        seekToAdjacentCaption(-1);
      } else {
        seekToAdjacentCaption(1);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [
    captions,
    hasCaptions,
    keyboardEnabled,
    keyboardRequiresPlaybackStarted,
    playbackStarted,
    seekToAdjacentCaption,
    togglePlayback,
  ]);

  const videoHandlers = {
    onTimeUpdate: hasCaptions
      ? (event: SyntheticEvent<HTMLVideoElement>) => {
          const video = event.currentTarget;
          if (hasNarrationAudio) maybeFreezeAtCueBoundary(video);
          syncCaptionsFromVideo(video);
          if (hasNarrationAudio) syncNarrationFromVideo(video);
        }
      : undefined,
    onSeeked: hasCaptions
      ? (event: SyntheticEvent<HTMLVideoElement>) => {
          const video = event.currentTarget;
          if (programmaticSeekRef.current) {
            programmaticSeekRef.current = false;
            syncCaptionsFromVideo(video);
            if (hasNarrationAudio && !freezeActiveRef.current) {
              syncNarrationFromVideo(video, { forceAudioSeek: true });
            }
            return;
          }
          if (freezeActiveRef.current) clearFreezeState();
          syncCaptionsFromVideo(video);
          if (hasNarrationAudio) syncNarrationFromVideo(video, { forceAudioSeek: true });
        }
      : undefined,
    onLoadedMetadata: (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      applyNarratedPlaybackRate(video);
      if (!hasCaptions) return;
      syncCaptionsFromVideo(video);
      if (hasNarrationAudio) syncNarrationFromVideo(video);
    },
    onPlay: (event: SyntheticEvent<HTMLVideoElement>) => {
      setPlaying(true);
      markPlaybackStarted();
      const video = event.currentTarget;
      applyNarratedPlaybackRate(video);
      if (video.currentTime < 0.25) playbackEndedRef.current = false;
      if (hasCaptions) syncCaptionsFromVideo(video);
      if (hasNarrationAudio) syncNarrationFromVideo(video);
    },
    onPause: () => {
      if (programmaticPauseRef.current) {
        programmaticPauseRef.current = false;
        if (freezeActiveRef.current) return;
      }
      setPlaying(false);
      if (hasNarrationAudio) narrationAudioRef.current?.pause();
    },
    onEnded: hasCaptions
      ? (event: SyntheticEvent<HTMLVideoElement>) => {
          const video = event.currentTarget;
          const last = captions?.length ? captions.length - 1 : -1;
          if (hasNarrationAudio && last >= 0 && captions?.[last]?.audio) {
            if (!freezeActiveRef.current) enterFreezeAtCue(video, last);
            return;
          }
          setPlaying(false);
          playbackEndedRef.current = true;
          if (hasNarrationAudio) stopNarration();
          if (captions?.length) {
            setSegmentFills(captions.map(() => 1));
            applyCaptionCue(last, captionTextAt(video.currentTime, captions, true));
          }
        }
      : () => {
          setPlaying(false);
          if (hasNarrationAudio) stopNarration();
        },
  };

  const captionSpacer = hasCaptions && captions ? longestCaptionText(captions) : "";

  return {
    videoRef,
    captionsId,
    hasCaptions,
    hasNarrationAudio,
    narrationMuted,
    toggleNarrationMute,
    captions,
    captionText,
    captionOpaque,
    captionSpacer,
    segmentFills,
    playing,
    playbackStarted,
    togglePlayback,
    seekToCaption,
    seekToTime,
    seekToAdjacentCaption,
    pauseSession,
    resetPlaybackSession,
    videoHandlers,
    applyNarratedPlaybackRate,
    activeCueRef,
    activeCueIndex,
  };
}
