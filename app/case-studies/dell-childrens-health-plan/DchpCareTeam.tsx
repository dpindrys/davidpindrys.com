"use client";

import { useEffect, useRef, useState } from "react";

import { challengeTagClass } from "../../lib/pageStyles";

/** carestart.png is 734×1140. Positions are source pixels in that file. */
const startWidth = 734;
const startHeight = 1140;
/** BROWSE NEARBY PROVIDERS button, x 68–665, y 970–1053. */
const browseCenterX = (68 + 665) / 2;
const browseCenterY = (970 + 1053) / 2;
/** careteam2x.png is 734×2422: the same canvas and scale as carestart.png. */
const searchWidth = 734;
const searchHeight = 2422;
const searchOffsetX = 0;
/** “Madhavi Khandavalli”, y 169–215. */
const memberNameCenter = (169 + 215) / 2;
/** “Providers in the 78701”, y 799–835. */
const resultsCenter = (799 + 835) / 2;
/** CHOOSE NEW AREA CODE button, y 882–953. */
const areaCodeCenter = (882 + 953) / 2;
const phoneWidth = 432;
const phoneScale = phoneWidth / 280;
const markerSize = 28 * phoneScale;
const markerHalf = markerSize / 2;
const markerCenter = (y: number, height: number) => `calc(${(y / height) * 100}% - ${markerHalf}px)`;
/** Center of the GK profile circle, on an image that fills the screen hole. */
const markerRight = `calc(9.237% - ${markerHalf}px)`;
const tapSize = 52;
const tapDuration = 1000;

const screens = {
  start: { src: "/images/dellchildrens/carestart.png", width: startWidth, height: startHeight, style: undefined },
  search: {
    src: "/images/dellchildrens/careteam2x.png",
    width: searchWidth,
    height: searchHeight,
    style: {
      width: `${(searchWidth / startWidth) * 100}%`,
      marginLeft: `${(-searchOffsetX / startWidth) * 100}%`,
    },
  },
} as const;

const startMarker = { top: markerCenter(browseCenterY, startHeight) };

const steps = [
  {
    title: "Relevant results in one tap",
    body: "The search opens with the member’s location, language, and need for a primary care provider already applied.",
    screen: "search",
    marker: { top: markerCenter(resultsCenter, searchHeight) },
  },
  {
    title: "Preferences stay editable",
    body: "Members can change the area code or language while reviewing results, so a starting value never becomes a dead end.",
    screen: "search",
    marker: { top: markerCenter(areaCodeCenter, searchHeight) },
  },
  {
    title: "The member stays visible",
    body: "Results open beneath the member’s name and current PCP, keeping it clear whose care team is changing.",
    screen: "search",
    marker: { top: markerCenter(memberNameCenter, searchHeight) },
  },
] as const;

const frameSrc = "/images/dellchildrens/mobile-frame2x.png";
const headerSrc = "/images/dellchildrens/mobile-header2x.png";
const stepsEnabled = false;

type Phase = "start" | "tapping" | "search";

export default function DchpCareTeam() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("start");
  const phoneBottomRef = useRef<HTMLSpanElement>(null);
  const tapRef = useRef<HTMLSpanElement>(null);
  const active = steps[step] ?? steps[0];
  const onStart = step === 0 && phase !== "search";
  const screenKey = onStart ? "start" : active.screen;

  useEffect(() => {
    const sentinel = phoneBottomRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setPhase((current) => (current === "start" ? (reduceMotion ? "search" : "tapping") : current));
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "tapping") return;
    const animation = tapRef.current?.animate(
      [
        { opacity: 0, transform: "scale(0.6)" },
        { opacity: 1, transform: "scale(1)", offset: 0.2 },
        { opacity: 1, transform: "scale(1)", offset: 0.75 },
        { opacity: 0, transform: "scale(1.1)" },
      ],
      { duration: tapDuration, easing: "ease-out", fill: "forwards" },
    );
    if (!animation) {
      setPhase("search");
      return;
    }
    animation.onfinish = () => setPhase("search");
    return () => animation.cancel();
  }, [phase]);

  return (
    <section aria-label="Care team provider search" className="font-sans text-[#25292a]">
      <p className={`${challengeTagClass} mb-4 inline-block`}>Solution</p>
      <div className="grid grid-cols-1 items-start gap-8 lg:items-center lg:grid-cols-[minmax(0,1fr)_432px] lg:gap-12">
        <div>
          <h3 className="w-full text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.04em]">
            A PCP search that starts with what we know.
          </h3>
          <p className="mt-4 max-w-[36rem] font-sans text-[16px] leading-[1.6] text-black md:text-[20px]">
            Relevant results in one tap, with preferences editable and the member always in view.
          </p>
          <div className="mt-8 md:mt-10">
            {steps.map((item, index) => {
              const pressed = index === step;
              return (
                <button
                  key={item.title}
                  type="button"
                  aria-pressed={pressed}
                  disabled={!stepsEnabled}
                  onClick={stepsEnabled ? () => setStep(index) : undefined}
                  className={`grid w-full grid-cols-[30px_minmax(0,1fr)] gap-3 border-0 border-t border-[#d9ddd7] bg-transparent py-5 text-left ${
                    pressed ? "text-[#222d27]" : "text-[#626864]"
                  } cursor-pointer disabled:cursor-default focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#cd8c2e]`}
                >
                  <span
                    className={`flex h-[27px] w-[27px] items-center justify-center rounded-full border text-[12px] font-bold ${
                      pressed ? "border-[#c2410c] bg-[#c2410c] text-white" : "border-[#9ba49d]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span>
                    <strong className={`mt-0.5 block text-[16px] ${pressed ? "font-bold" : "font-medium"}`}>
                      {item.title}
                    </strong>
                    <span className="mt-2 block font-sans text-[16px] leading-[1.6] text-black md:text-[20px]">
                      {item.body}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 lg:items-end">
          <div
            className="relative w-[min(100%,432px)]"
            role="img"
            aria-label={`Care team, step ${step + 1} of ${steps.length}: ${active.title}.`}
          >
            <div
              className="absolute flex flex-col overflow-hidden bg-white"
              style={{ left: "2.611%", width: "93.995%", top: "2.459%", bottom: "3.115%" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={headerSrc}
                alt=""
                width={794}
                height={254}
                className="relative z-10 block h-auto w-[110.278%] max-w-none shrink-0"
                style={{ marginLeft: "-0.556%" }}
              />
              <div className="relative min-h-0 flex-1 overflow-hidden">
                <div
                  className="relative w-full will-change-transform"
                  style={{ marginTop: 15 * phoneScale }}
                >
                  {(Object.keys(screens) as (keyof typeof screens)[]).map((key) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={key}
                      src={screens[key].src}
                      alt=""
                      width={screens[key].width}
                      height={screens[key].height}
                      className={`${key === screenKey ? "block" : "hidden"} h-auto w-full max-w-none`}
                      style={screens[key].style}
                    />
                  ))}
                  {phase === "tapping" && (
                    <span
                      ref={tapRef}
                      aria-hidden
                      className="pointer-events-none absolute z-[4] rounded-full bg-black/50 opacity-0"
                      style={{
                        left: `calc(${(browseCenterX / startWidth) * 100}% - ${tapSize / 2}px)`,
                        top: `calc(${(browseCenterY / startHeight) * 100}% - ${tapSize / 2}px)`,
                        width: tapSize,
                        height: tapSize,
                      }}
                    />
                  )}
                  {steps.map((item, index) => (
                    <span
                      key={item.title}
                      hidden={index !== step || phase === "tapping"}
                      className="absolute z-[3] flex items-center justify-center rounded-full border-white bg-[#c2410c] font-bold text-white shadow-[0_0_0_2px_#c2410c]"
                      style={{
                        ...(onStart ? startMarker : item.marker),
                        right: markerRight,
                        width: markerSize,
                        height: markerSize,
                        borderWidth: 3 * phoneScale,
                        fontSize: 11 * phoneScale,
                      }}
                    >
                      {index + 1}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={frameSrc}
              alt=""
              width={766}
              height={1668}
              className="relative z-20 block h-auto w-full pointer-events-none"
            />
            <span ref={phoneBottomRef} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px" />
          </div>
        </div>
      </div>
    </section>
  );
}
