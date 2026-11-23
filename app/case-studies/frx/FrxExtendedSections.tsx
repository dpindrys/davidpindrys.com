import type { ReactNode } from "react";

import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import ZoomableProblemVideo from "../../components/ZoomableProblemVideo";
import FrxPrototypeScanGallery from "./FrxPrototypeScanGallery";
import { frxNavScrollMtClass } from "./frxCaseStudyNav";
import {
  frxMetaEyebrowClass,
  frxOutlineCardClass,
  frxSectionBodyClass,
  frxSectionGapClass,
  frxSectionIntroStackClass,
  frxSectionTitleClass,
  frxSplitRowGridClass,
  frxStrategyHeadlineClass,
} from "./frxCaseStudyTypography";

const mediaCardClass = `${frxOutlineCardClass} overflow-hidden bg-white`;

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
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${itemAlign} md:gap-8 lg:gap-10 ${isFirst ? "pt-0" : "border-t border-black/10 pt-10 md:pt-12"} pb-10 md:pb-12`}
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

export { mediaCardClass, frxStrategyHeadlineClass };

const zoomMediaShellClass = "min-w-0 w-full";

/** Mapping + testing — after the main problem card, before the solution walkthrough. */
export function FrxSectionsBeforeSolution() {
  return (
    <>
      <section
        id="frx-nav-strategy"
        data-frx-case-study-section=""
        className={`${frxSectionGapClass} ${frxNavScrollMtClass}`}
        aria-labelledby="frx-strategy-structure-heading"
      >
        <p className={frxMetaEyebrowClass}>Strategy</p>
        <div className="mt-6 flex w-full flex-col gap-6 md:gap-8">
          <div className={frxSplitRowGridClass}>
            <div className={frxSectionIntroStackClass}>
              <h2
                id="frx-strategy-structure-heading"
                className={frxStrategyHeadlineClass}
              >
                Identifying the elements of a refill
              </h2>
              <p className={frxSectionBodyClass}>
                Structuring the digital workflow around how nurses handle
                refills in the clinic.
              </p>
              <p className={frxSectionBodyClass}>
                I observed nurses processing refills using paper and fax, then
                used object-oriented UX (OOUX) to map the key elements, their
                relationships, and the actions nurses needed to take. That map
                grounded the digital workflow in familiar clinical practices
                before I began wireframing.
              </p>
            </div>
            <ZoomableProblemImage
              src="/images/frx/disconnected.png"
              alt="Clinic desk with paper refill forms, laptop, and phone alongside clinical workflow materials"
              shellClassName={`${mediaCardClass} w-full`}
              imgClassName="block h-auto w-full rounded-md border-0"
              elevateOnHover={false}
            />
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
        id="frx-nav-prototyping"
        data-frx-case-study-section=""
        className={`${frxSectionGapClass} ${frxNavScrollMtClass}`}
        aria-labelledby="frx-testing-iterating-heading"
      >
        <p className={frxMetaEyebrowClass}>Prototyping and iterating</p>
        <div className="mt-6 flex w-full flex-col gap-6 md:gap-8">
          <div
            className={`${mediaCardClass} grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-5`}
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

          <div className={frxSplitRowGridClass}>
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
            <div className="min-w-0 w-full">
              <FrxPrototypeScanGallery />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
