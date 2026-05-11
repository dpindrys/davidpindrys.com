import type { ReactNode } from "react";

import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import ZoomableProblemVideo from "../../components/ZoomableProblemVideo";
import FrxAddressImageCycle from "./FrxAddressImageCycle";

const eyebrowClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";
const sectionTitleClass =
  "w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black";
const bodyClass =
  "w-full font-sans text-[22px] font-normal leading-[1.45] text-black/80 md:text-[24px]";

const mediaCardClass =
  "overflow-hidden rounded-2xl border border-black/10 bg-white p-4 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.06)] md:p-5";

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
      <div className="order-1 flex min-w-0 flex-col gap-0 md:order-none md:max-w-lg">
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
        <>
          <h3 className={rowHeadingClass}>{title}</h3>
          <p className={rowBodyClass}>{body}</p>
        </>
      }
    >
      {children}
    </FrxProcessRowShell>
  );
}

export { mediaCardClass };

/** Mapping + testing — after the main problem card, before the solution walkthrough. */
export function FrxSectionsBeforeSolution() {
  return (
    <>
      <section
        className="mt-16 w-full md:mt-24 lg:mt-28"
        aria-labelledby="frx-mapping-structure-heading"
      >
        <p className={eyebrowClass}>Mapping</p>
        <h2
          id="frx-mapping-structure-heading"
          className={`${sectionTitleClass} mt-4 md:mt-5`}
        >
          Defining the Structure
        </h2>
        <p className={`${bodyClass} mt-5 md:mt-6`}>
          Structuring information intuitively — reducing cognitive load, streamlining
          workflows, and helping clinicians deliver better care.
        </p>

        <div className="mt-10 w-full md:mt-14 lg:mt-16">
          <FrxProcessRow
            isFirst
            title="1. Object Mapping for Clarity"
            body="I mapped the key objects in the refill workflow — patients, medications, prescriptions, refills, addresses, and users — to understand what information staff needed and how those objects related to each action."
          >
            <ZoomableProblemImage
              src="/images/frx/objectmap.png"
              alt="Object map of refill workflow: patients, medications, prescriptions, refills, and related entities"
              shellClassName={mediaCardClass}
              imgClassName="block h-auto w-full rounded-md border-0"
            />
          </FrxProcessRow>

          <FrxProcessRow
            title="2. Turning Objects Into Workflow"
            body="I translated the object map into an early workflow model, testing how refill actions, prescription details, addresses, and submission steps could stay connected without overwhelming the screen."
          >
            <ZoomableProblemVideo
              src="/videos/frx/fresenius-objectwireframe.mp4"
              ariaLabel="Early object wireframe prototype connecting refill workflow steps"
              cardClassName={mediaCardClass}
              dialogLabel="Early workflow wireframe video"
            />
          </FrxProcessRow>
        </div>
      </section>

      <section
        className="mt-16 w-full md:mt-24 lg:mt-28"
        aria-labelledby="frx-testing-iterating-heading"
      >
        <p className={eyebrowClass}>Testing and iterating</p>
        <h2
          id="frx-testing-iterating-heading"
          className={`${sectionTitleClass} mt-4 md:mt-5`}
        >
          Refining the Workflow With Clinic Staff
        </h2>
        <p className={`${bodyClass} mt-5 md:mt-6`}>
          Testing helped narrow the interface to the information staff needed most:
          enough context to act safely, without turning each refill into another chart
          review.
        </p>

        <div className="mt-10 w-full md:mt-14 lg:mt-16">
          <FrxProcessRow
            isFirst
            title="1. Show Only What’s Essential"
            body="Testing showed that staff preferred minimal information upfront, with secondary details like tracking or shipping dates available only when needed."
          >
            <ZoomableProblemImage
              src="/images/frx/test1.png"
              alt="Refill interface emphasizing essential information with secondary details deferred"
              shellClassName={mediaCardClass}
              imgClassName="block h-auto w-full rounded-md border-0"
            />
          </FrxProcessRow>

          <FrxProcessRow
            title="2. Use Defaults to Reduce Decisions"
            body="Staff wanted date visibility, but pre-selecting today’s date reduced ambiguity and helped them move through the refill task faster."
          >
            <ZoomableProblemImage
              src="/images/frx/test2.png"
              alt="Refill form with today’s date pre-selected to reduce decision friction"
              shellClassName={mediaCardClass}
              imgClassName="block h-auto w-full rounded-md border-0"
            />
          </FrxProcessRow>

          <FrxProcessRow
            title="3. Discovering an Edge Case"
            body="Piloting with select clinics showed us that clinic staff needed to change the shipping address more often than we anticipated. That gave us the incentive to roll the address management function into the workflow, instead of making the user open a separate Salesforce tab to complete the action during a refill."
          >
            <div className={mediaCardClass}>
              <FrxAddressImageCycle />
            </div>
          </FrxProcessRow>
        </div>
      </section>
    </>
  );
}
