import type { ReactNode } from "react";

import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import ZoomableProblemVideo from "../../components/ZoomableProblemVideo";
import FrxAddressImageCycle from "./FrxAddressImageCycle";
import {
  frxCenteredIntroBlockClass,
  frxSectionBodyClass,
  frxSectionIntroStackClass,
  frxSectionTitleClass,
  frxPaddedEyebrowClass,
  frxSplitRowGridClass,
} from "./frxCaseStudyTypography";

const mediaCardClass =
  "overflow-hidden rounded-2xl border border-black/10 bg-white p-4 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.06)] md:p-5";

/** Legacy exports for DCHP, OVCP, VEHR — unchanged large type. */
export const rowHeadingClass =
  "font-sans text-[22px] md:text-[24px] font-semibold leading-[1.25] tracking-tight text-black";
export const rowBodyTextClass =
  "font-sans text-[22px] md:text-[24px] font-normal leading-[1.45] text-black/80";
export const rowBodyClass = `mt-4 ${rowBodyTextClass}`;

/** Text left, visual right; mobile stacks text first. */
export function FrxProcessRowShell({
  left,
  children,
  isFirst,
  align = "center",
}: {
  left: ReactNode;
  children: ReactNode;
  isFirst?: boolean;
  align?: "center" | "start";
}) {
  const itemAlign =
    align === "start" ? "md:items-start" : "md:items-center";
  return (
    <div
      className={`grid grid-cols-1 gap-8 md:grid-cols-2 ${itemAlign} md:gap-12 lg:gap-14 ${isFirst ? "pt-0" : "border-t border-black/10 pt-12 md:pt-16 lg:pt-20"} pb-12 md:pb-16 lg:pb-20`}
    >
      <div className="order-1 flex min-w-0 flex-col gap-0 md:order-none">
        {left}
      </div>
      <div className="order-2 min-w-0 w-full md:order-none">{children}</div>
    </div>
  );
}

/** Numbering lives in `title` string. */
export function FrxProcessRow({
  title,
  body,
  children,
  isFirst,
  align = "center",
}: {
  title: string;
  body: string;
  children: ReactNode;
  isFirst?: boolean;
  align?: "center" | "start";
}) {
  return (
    <FrxProcessRowShell
      isFirst={isFirst}
      align={align}
      left={
        <div className={frxSectionIntroStackClass}>
          <h3 className={frxSectionTitleClass}>{title}</h3>
          <p className={frxSectionBodyClass}>{body}</p>
        </div>
      }
    >
      {children}
    </FrxProcessRowShell>
  );
}

export { mediaCardClass };

const zoomMediaShellClass = "min-w-0 w-full";

export const frxStrategyHeadlineClass =
  "font-sans text-[clamp(22px,2.8vw,32px)] font-semibold leading-[1.25] tracking-[-0.01em] text-black";

/** Mapping + testing — after the main problem card, before the solution walkthrough. */
export function FrxSectionsBeforeSolution() {
  return (
    <>
      <section
        className="relative mt-16 w-full pt-12 md:mt-24 md:pt-16 lg:mt-28 lg:pt-20"
        aria-labelledby="frx-strategy-structure-heading"
      >
        <p className={frxPaddedEyebrowClass}>Strategy</p>
        <div className="flex w-full flex-col gap-10 pb-12 md:gap-12 md:pb-16 lg:gap-14 lg:pb-20">
          <div className={frxCenteredIntroBlockClass}>
            <div className={frxSectionIntroStackClass}>
              <h2
                id="frx-strategy-structure-heading"
                className={frxStrategyHeadlineClass}
              >
                Defining the structure
              </h2>
              <p className={frxSectionBodyClass}>
                Reducing cognitive load by structuring information around how
                clinicians actually work.
              </p>
              <p className={frxSectionBodyClass}>
                Before any wireframes, I mapped the system&apos;s underlying
                objects and the relationships between them, then validated those
                mental models with clinic staff. Getting the structure right at
                this stage meant the visual design could reflect how nurses think
                about a refill, not how the database stores one.
              </p>
            </div>
          </div>

          <div
            className={`${mediaCardClass} grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-5`}
          >
            <ZoomableProblemImage
              src="/images/frx/objectmap.png"
              alt="Object map of refill workflow: patients, medications, prescriptions, refills, and related entities"
              shellClassName={zoomMediaShellClass}
              imgClassName="block h-auto w-full rounded-md border-0"
              elevateOnHover={false}
            />
            <ZoomableProblemVideo
              src="/videos/frx/fresenius-objectwireframe.mp4"
              ariaLabel="Early object wireframe prototype connecting refill workflow steps"
              cardClassName={zoomMediaShellClass}
              dialogLabel="Early workflow wireframe video"
            />
          </div>
        </div>
      </section>

      <section
        className="relative mt-16 w-full pt-12 md:mt-24 md:pt-16 lg:mt-28 lg:pt-20"
        aria-labelledby="frx-testing-iterating-heading"
      >
        <p className={frxPaddedEyebrowClass}>Prototyping and iterating</p>
        <div className="flex w-full flex-col gap-10 pb-12 md:gap-12 md:pb-16 lg:gap-14 lg:pb-20">
          <div className={frxCenteredIntroBlockClass}>
            <div className={frxSectionIntroStackClass}>
              <h2
                id="frx-testing-iterating-heading"
                className={frxStrategyHeadlineClass}
              >
                Refining with clinic staff
              </h2>
              <p className={frxSectionBodyClass}>
                Testing narrowed the interface to what staff needed most: enough
                context to act safely, without making each refill another chart
                review.
              </p>
              <p className={frxSectionBodyClass}>
                I started with low-fi screens guided by one rule: show only
                what&apos;s needed for the next critical action. Each iteration
                cut more until we hit the minimum viable information to refill
                safely. Piloting then surfaced the edge cases studio testing
                couldn&apos;t, including expired scripts, zero-refill states, and
                clinic-vs-home shipping that needed clearer in-flow messaging.
              </p>
            </div>
          </div>

          <div className={frxSplitRowGridClass}>
            <div
              className={`${mediaCardClass} grid w-full min-w-0 grid-cols-1 gap-4 md:gap-5`}
            >
              <ZoomableProblemImage
                src="/images/frx/test1.png"
                alt="Refill interface emphasizing essential information with secondary details deferred"
                shellClassName={zoomMediaShellClass}
                imgClassName="block h-auto w-full rounded-md border-0"
                elevateOnHover={false}
              />
              <ZoomableProblemImage
                src="/images/frx/test2.png"
                alt="Refill form with today’s date pre-selected to reduce decision friction"
                shellClassName={zoomMediaShellClass}
                imgClassName="block h-auto w-full rounded-md border-0"
                elevateOnHover={false}
              />
            </div>
            <div className={`${mediaCardClass} min-w-0 w-full self-start`}>
              <FrxAddressImageCycle />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
