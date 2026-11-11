"use client";

import { useState } from "react";

import { challengeTagClass } from "../../lib/pageStyles";

/** carestart.png is 720×1240. Positions are source pixels in that file. */
const startHeight = 1240;
/** BROWSE NEARBY PROVIDERS button, y 1070–1153. */
const browseCenter = (1070 + 1153) / 2;
/** careteam2x.png is 720×2428. Positions are source pixels in that file. */
const searchHeight = 2428;
/** “for Amy Khandavalli”, y 162–183. */
const memberNameCenter = (162 + 183) / 2;
/** Dr. Dan Nelson, y 424–465. */
const providerNameCenter = (424 + 465) / 2;
/** EDIT control for the area code, y 848–919. */
const editCenter = (848 + 919) / 2;
const phoneWidth = 432;
const phoneScale = phoneWidth / 280;
const markerSize = 28 * phoneScale;
const markerHalf = markerSize / 2;
const markerCenter = (y: number, height: number) => `calc(${(y / height) * 100}% - ${markerHalf}px)`;
/** Center of the GK profile circle, on an image that fills the screen hole. */
const markerRight = `calc(9.237% - ${markerHalf}px)`;

const screens = {
  start: { src: "/images/dellchildrens/carestart.png", width: 720, height: startHeight },
  search: { src: "/images/dellchildrens/careteam2x.png", width: 720, height: searchHeight },
} as const;

const steps = [
  {
    title: "Search without starting over",
    body: "Uses the member’s saved location, language, and required provider type to launch a PCP search in one tap.",
    screen: "start",
    marker: { top: markerCenter(browseCenter, startHeight) },
  },
  {
    title: "Adjust without losing progress",
    body: "Members can change their ZIP code or language preference while viewing results.",
    screen: "search",
    marker: { top: markerCenter(editCenter, searchHeight) },
  },
  {
    title: "Stay in context",
    body: "Search expands beneath the current PCP, keeping the member and their existing provider visible.",
    screen: "search",
    marker: { top: markerCenter(providerNameCenter, searchHeight) },
  },
  {
    title: "Keep the member clear",
    body: "A prominent name makes it clear whose care team the user is managing.",
    screen: "search",
    marker: { top: markerCenter(memberNameCenter, searchHeight) },
  },
] as const;

const frameSrc = "/images/dellchildrens/mobile-frame2x.png";
const headerSrc = "/images/dellchildrens/mobile-header2x.png";
/** Off until carestart.png and careteam2x.png share a width; they scale differently today. */
const stepsEnabled = false;

export default function DchpCareTeam() {
  const [step, setStep] = useState(0);
  const active = steps[step] ?? steps[0];

  return (
    <section aria-label="Care team provider search" className="font-sans text-[#25292a]">
      <p className={`${challengeTagClass} mb-4 inline-block`}>Solution</p>
      <h3 className="w-full text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.04em]">
        A PCP search that starts with what we know.
      </h3>
      <p className="mt-4 max-w-[36rem] font-sans text-[16px] leading-[1.6] text-black md:text-[20px]">
        Relevant results in one tap, with location and language preferences easy to adjust.
      </p>
      <div className="mt-10 grid grid-cols-1 items-start gap-8 md:mt-12 lg:grid-cols-[minmax(0,1fr)_432px] lg:gap-12">
        <div>
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
                      className={`${key === active.screen ? "block" : "hidden"} h-auto w-full max-w-none`}
                    />
                  ))}
                  {steps.map((item, index) => (
                    <span
                      key={item.title}
                      hidden={index !== step}
                      className="absolute z-[3] flex items-center justify-center rounded-full border-white bg-[#c2410c] font-bold text-white shadow-[0_0_0_2px_#c2410c]"
                      style={{
                        ...item.marker,
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
          </div>
        </div>
      </div>
    </section>
  );
}
