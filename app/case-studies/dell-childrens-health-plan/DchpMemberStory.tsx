"use client";

import { useState } from "react";

import { tagClass } from "../../lib/pageStyles";

/** home-long2x.png is 734×2350. Positions below are source pixels in that file. */
const homeHeight = 2350;
const quickLinksY = 236;
const coveredMembersY = 1028;
/** Moves Covered Members up to where Quick Links sits. Stays short of the frame bottom. */
const coveredMembersScroll = (coveredMembersY - quickLinksY) / homeHeight;
/** “Welcome, Gopi” line, y 21–90. The marker is centered on it. */
const welcomeCenter = (21 + 90) / 2;
/** Blue Quick Links header, y 236–367. */
const quickLinksCenter = (236 + 367) / 2;
/** Blue Covered Members title, y 1028–1159. */
const coveredMembersCenter = (1028 + 1159) / 2;
/** Care Team button, y 1503–1612. Marker is centered in the button. */
const careTeamCenter = (1503 + 1612) / 2;
/** 1.5× one of the 288px cards above this section. */
const phoneWidth = 432;
/** Sizes that were 15px and 28px on the 280px phone. */
const phoneScale = phoneWidth / 280;
const markerSize = 28 * phoneScale;
const markerHalf = markerSize / 2;
const markerTop = (y: number) => `${(y / homeHeight) * 100}%`;
const markerCenter = (y: number) => `calc(${markerTop(y)} - ${markerHalf}px)`;
/**
 * Center of the GK profile circle (mobile-header2x.png source x=657.5),
 * minus half the marker so every number shares that center line.
 */
const markerRight = `calc(10.014% - ${markerHalf}px)`;

const steps = [
  {
    title: "Personalized greeting",
    body: "A brief welcome that addresses the member by name.",
    /** Portion of the long page moved up. 0 keeps the top on screen. */
    scroll: 0,
    marker: { top: markerCenter(welcomeCenter) },
  },
  {
    title: "Member tasks first",
    body: "Four focused links bring care, provider search, coverage, and support to the top of the page.",
    scroll: 0,
    marker: { top: markerCenter(quickLinksCenter) },
  },
  {
    title: "A manageable family view",
    body: "Expandable sections keep individual actions accessible without showing everyone’s details at once.",
    scroll: coveredMembersScroll,
    marker: { top: markerCenter(coveredMembersCenter) },
  },
  {
    title: "The right member, already selected",
    body: "Opens care team, ID cards, and handbook information for that individual without asking users to select them again.",
    scroll: coveredMembersScroll,
    marker: { top: "59%" },
  },
  {
    title: "Common tasks, one tap away",
    body: "Prioritized frequently used tasks within each member’s details.",
    scroll: coveredMembersScroll,
    marker: { top: markerCenter(careTeamCenter) },
  },
] as const;

const frameSrc = "/images/dellchildrens/mobile-frame2x.png";
const headerSrc = "/images/dellchildrens/mobile-header2x.png";
const homeSrc = "/images/dellchildrens/home-long2x.png";

export default function DchpMemberStory() {
  const [step, setStep] = useState(0);
  const active = steps[step] ?? steps[0];

  return (
    <section aria-label="Interactive member portal case study" className="font-sans text-[#25292a]">
      <p className={`${tagClass} mb-4 inline-block`}>Solution</p>
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_432px] lg:gap-12">
        <div>
          <h3 className="w-full text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.04em]">
            A clearer start for every member.
          </h3>
          <p className="mt-4 max-w-[36rem] font-sans text-[16px] leading-[1.6] text-black md:text-[20px]">
            Frequently used actions up front, with individual tasks organized under each person.
          </p>
          <div className="mt-8">
            {steps.map((item, index) => {
              const pressed = index === step;
              return (
                <button
                  key={item.title}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setStep(index)}
                  className={`grid w-full grid-cols-[30px_minmax(0,1fr)] gap-3 border-0 border-t border-[#d9ddd7] bg-transparent py-5 text-left ${
                    pressed ? "text-[#222d27]" : "text-[#626864]"
                  } cursor-pointer focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#cd8c2e]`}
                >
                  <span
                    className={`flex h-[27px] w-[27px] items-center justify-center rounded-full border text-[12px] font-bold ${
                      pressed ? "border-[#c2410c] bg-[#c2410c] text-white" : "border-[#9ba49d]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span>
                    <strong className={`mt-0.5 block text-[16px] ${pressed ? "font-bold" : "font-medium"}`}>{item.title}</strong>
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
            aria-label={`Member portal, step ${step + 1} of ${steps.length}: ${active.title}.`}
          >
            {/* Header starts below the frame top. The page is its real size, flush under the header, and the screen still clips above the frame bottom. */}
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
              <div className="relative min-h-0 flex-1 overflow-hidden" style={{ containerType: "size" }}>
                <div
                  className="relative w-[101.944%] will-change-transform motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none"
                  style={{
                    marginLeft: "-0.972%",
                    marginTop: 15 * phoneScale,
                    transform: active.scroll ? `translateY(-${active.scroll * 100}%)` : undefined,
                  }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={homeSrc} alt="" width={734} height={2350} className="block h-auto w-full max-w-none" />
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
            <img src={frameSrc} alt="" width={766} height={1668} className="relative z-20 block h-auto w-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
