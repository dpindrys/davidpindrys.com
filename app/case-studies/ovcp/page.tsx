import type { ReactNode } from "react";

import Footer from "../../components/Footer";
import CaseStudyNextProjectButton from "../../components/CaseStudyNextProjectButton";
import OvcpBelowHero from "./OvcpBelowHero";
import OvcpChallengeCard from "./OvcpChallengeCard";
import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import {
  FrxProcessRowShell,
  frxStrategyHeadlineClass,
  rowBodyClass,
  rowBodyTextClass,
  rowHeadingClass,
} from "../frx/FrxExtendedSections";
import {
  frxCenteredIntroBlockClass,
  frxCenteredIntroSectionClass,
  frxHeroTitleClass,
  frxHeroTitleMaxWidthClass,
  frxSectionBodyClass,
} from "../frx/frxCaseStudyTypography";
import {
  vehrBodyClass,
  vehrEyebrowClass,
  vehrSectionGapClass,
  vehrSectionTitleClass,
} from "../visual-ehr/vehrCaseStudySectionTokens";
import {
  ovcpHeroFocusPills,
  ovcpHeroLead,
  ovcpProductContext,
} from "./ovcpBelowHeroData";

const ovcpHeroPillClass =
  "inline-flex rounded-full border border-black/10 bg-white px-3 py-1.5 font-sans text-[13px] leading-none text-black/70";
const subheadClass =
  "font-sans text-[22px] font-semibold leading-[1.25] tracking-tight text-black md:text-[24px]";
const subbodyClass =
  "mt-3 font-sans text-[16px] font-normal leading-[1.5] text-black md:text-[17px]";
const mediaCardClass =
  "overflow-hidden rounded-2xl border border-black/10 bg-white p-4 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.06)] md:p-5";
const pullQuoteClass =
  "mx-auto max-w-3xl text-center font-sans text-[20px] font-medium leading-[1.45] text-black md:text-[22px]";
const attributionClass =
  "mt-4 text-center font-sans text-[15px] font-normal leading-[1.5] text-black/55 md:text-[16px]";
const captionClass =
  "mt-3 font-sans text-[16px] leading-[1.55] text-black/65";

/** Matches `FrxImpactQuoteCard` shell (OVCP feedback has no avatar). */
const ovcpFeedbackQuoteCardClass =
  "flex min-h-0 min-w-0 w-full flex-col gap-6 rounded-2xl border border-black/10 bg-white/50 p-8";
const ovcpFeedbackQuoteAttributionClass =
  "font-sans text-[15px] font-semibold leading-[1.5] text-black md:text-[16px]";

function OvcpRowShell({
  isFirst,
  left,
  right,
}: {
  isFirst?: boolean;
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-12 lg:gap-14 ${isFirst ? "pt-0" : "border-t border-black/10 pt-12 md:pt-16 lg:pt-20"} pb-12 md:pb-16 lg:pb-20`}
    >
      <div className="order-1 flex min-w-0 flex-col md:order-none md:max-w-lg">
        {left}
      </div>
      <div className="order-2 min-w-0 w-full md:order-none">{right}</div>
    </div>
  );
}

export default function OvcpCaseStudyPage() {
  return (
    <>
      <main className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
        <div className="flex w-full justify-center overflow-x-visible px-8 lg:px-16">
          <div className="flex w-full max-w-[1200px] flex-col items-stretch overflow-x-visible pb-32 pt-4">
            <section className="flex w-full flex-col gap-8 pt-8 md:gap-10 md:pt-12 lg:pt-16">
              <h1 className={`${frxHeroTitleClass} ${frxHeroTitleMaxWidthClass}`}>
                Problem List Reconciliation
              </h1>
              <div className="flex min-w-0 max-w-full flex-col gap-4 overflow-visible md:max-w-[50%]">
                <p className={frxSectionBodyClass}>{ovcpHeroLead.body}</p>
                <ul
                  className="flex flex-nowrap gap-2 overflow-visible"
                  aria-label="Focus areas"
                >
                  {ovcpHeroFocusPills.map((label) => (
                    <li key={label} className="shrink-0">
                      <span className={ovcpHeroPillClass}>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-16 w-full md:mt-24 lg:mt-28">
              <div className="relative w-full overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ovcp/problemlist-ipad5.png"
                  alt="Problem list reconciliation concept on iPad"
                  className="block h-auto w-full"
                />
              </div>
            </section>

            <OvcpBelowHero />

            <section
              className={frxCenteredIntroSectionClass}
              aria-labelledby="ovcp-product-context-heading"
            >
              <div className={frxCenteredIntroBlockClass}>
                <h2
                  id="ovcp-product-context-heading"
                  className={frxStrategyHeadlineClass}
                >
                  {ovcpProductContext.title}
                </h2>
                <p className={frxSectionBodyClass}>{ovcpProductContext.body}</p>
              </div>
            </section>

            <OvcpChallengeCard />

            <section
              className={vehrSectionGapClass}
              aria-labelledby="ovcp-prototyping-heading"
            >
              <p className={vehrEyebrowClass}>Prototyping</p>
              <h2
                id="ovcp-prototyping-heading"
                className={`${vehrSectionTitleClass} mt-4 md:mt-5`}
              >
                Fast, Direct Reconciliation
              </h2>
              <blockquote className={`${pullQuoteClass} mt-8 md:mt-10`}>
                &ldquo;Something that lets you somehow update the problem list in a
                user-friendly way that takes like five seconds.&rdquo;
              </blockquote>
              <p className={attributionClass}>— Emergency physician</p>

              <div className="mt-10 w-full md:mt-14 lg:mt-16">
                <OvcpRowShell
                  isFirst
                  left={
                    <>
                      <h3 className={subheadClass}>Direct manipulation</h3>
                      <p className={subbodyClass}>
                        Early concepts supported the right relationships, but they asked
                        for too much navigation—new windows, extra taps, and heavy
                        attention shifts.
                      </p>
                      <p className={subbodyClass}>
                        Letting clinicians drag one problem onto another to define a
                        relationship became the core of the interaction: fewer steps, less
                        context switching, more time on the clinical decision.
                      </p>
                    </>
                  }
                  right={
                    <ZoomableProblemImage
                      src="/images/ovcp/direct.png"
                      alt="Direct manipulation prototype for relating diagnoses on the problem list"
                      shellClassName={mediaCardClass}
                      imgClassName="block h-auto w-full rounded-md border-0"
                    />
                  }
                />

                <OvcpRowShell
                  left={
                    <>
                      <h3 className={subheadClass}>Hick&apos;s Law</h3>
                      <p className={subbodyClass}>
                        Too many relationship types slowed people down. I collapsed the
                        set to two high-value options:{" "}
                        <span className="font-semibold text-black">Similar to</span> for
                        duplicates and close cousins, and{" "}
                        <span className="font-semibold text-black">Secondary to</span>{" "}
                        when one problem was a consequence or symptom of another.
                      </p>
                    </>
                  }
                  right={
                    <ZoomableProblemImage
                      src="/images/ovcp/similar-secondary2.png"
                      alt="Similar to and secondary to relationship choices when consolidating diagnoses"
                      shellClassName={mediaCardClass}
                      imgClassName="block h-auto w-full rounded-md border-0"
                    />
                  }
                />

                <div className="border-t border-black/10 pt-12 md:pt-16 lg:pt-20">
                  <div className="flex w-full flex-col">
                    <ZoomableProblemImage
                      src="/images/ovcp/problem-list.gif"
                      alt="Animated click-through: consolidating duplicate diagnoses by dragging and choosing similar or secondary relationships"
                      shellClassName={mediaCardClass}
                      imgClassName="block h-auto w-full rounded-md border-0"
                      dialogLabel="Click-through prototype"
                    />
                    <p className={`${captionClass} mt-4`}>
                      <span className="font-semibold text-black">
                        Click-through prototype:
                      </span>{" "}
                      Shown to clinical SMEs for qualitative feedback on speed and
                      clarity.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              className={vehrSectionGapClass}
              aria-labelledby="ovcp-refinement-heading"
            >
              <p className={vehrEyebrowClass}>Refinement</p>
              <h2
                id="ovcp-refinement-heading"
                className={`${vehrSectionTitleClass} mt-4 md:mt-5`}
              >
                Status, Timing, and History
              </h2>
              <blockquote className={`${pullQuoteClass} mt-8 md:mt-10`}>
                &ldquo;We sometimes see quiescent inflammation that becomes active, then
                back to quiescent and back to active.&rdquo;
              </blockquote>
              <p className={attributionClass}>— Ophthalmologist</p>

              <div className="mt-10 w-full md:mt-14 lg:mt-16">
                <OvcpRowShell
                  isFirst
                  left={
                    <>
                      <h3 className={subheadClass}>When was it last active?</h3>
                      <p className={subbodyClass}>
                        Recurrence timing often signals when management should change. I
                        explored sort orders that surface{" "}
                        <span className="font-semibold text-black">last active</span>{" "}
                        alongside status tags (putative, active, quiescent, resolved) so
                        the list reads as a timeline, not just a stack of labels.
                      </p>
                    </>
                  }
                  right={
                    <ZoomableProblemImage
                      src="/images/ovcp/sorting.png"
                      alt="Problem list sorted with last-active context and status labels"
                      shellClassName={mediaCardClass}
                      imgClassName="block h-auto w-full rounded-md border-0"
                    />
                  }
                />

                <OvcpRowShell
                  left={
                    <>
                      <h3 className={subheadClass}>
                        What&apos;s the history of the problem?
                      </h3>
                      <p className={subbodyClass}>
                        An info view could expose the full arc for a diagnosis—labs,
                        referrals, notes—scrubbed through a compact activity strip so
                        clinicians could see quiet and busy periods at a glance.
                      </p>
                      <p className={subbodyClass}>
                        Linking common workups to a diagnosis could also reduce missed
                        follow-up when the chart is dense.
                      </p>
                    </>
                  }
                  right={
                    <ZoomableProblemImage
                      src="/images/ovcp/context.png"
                      alt="Problem detail with history and linked activity"
                      shellClassName={mediaCardClass}
                      imgClassName="block h-auto w-full rounded-md border-0"
                    />
                  }
                />

                <div className="border-t border-black/10 pt-12 md:pt-16 lg:pt-20">
                  <div className="flex w-full flex-col">
                    <ZoomableProblemImage
                      src="/images/ovcp/problemlist-final.gif"
                      alt="Refined prototype: filtering resolved problems and opening diagnosis history"
                      shellClassName={mediaCardClass}
                      imgClassName="block h-auto w-full rounded-md border-0"
                      dialogLabel="Later iteration"
                    />
                    <p className={`${captionClass} mt-4`}>
                      <span className="font-semibold text-black">Later iteration:</span>{" "}
                      Resolved filters, info affordances, and calmer hierarchy for review.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              className={vehrSectionGapClass}
              aria-labelledby="ovcp-feedback-heading"
            >
              <p className={vehrEyebrowClass}>Formative feedback</p>
              <h2
                id="ovcp-feedback-heading"
                className={`${vehrSectionTitleClass} mt-4 md:mt-5`}
              >
                What Clinicians Said
              </h2>
              <p className={`${vehrBodyClass} mt-5 md:mt-6`}>
                Qualitative sessions validated the direction; together with structured
                feedback, the program advanced toward summative testing.
              </p>

              <div className="mt-10 w-full md:mt-14 lg:mt-16">
                <FrxProcessRowShell
                  isFirst
                  align="start"
                  left={
                    <>
                      <h3 className={rowHeadingClass}>
                        This is an efficient and effective method for problem list
                        reconciliation.
                      </h3>
                      <ul
                        className={`${rowBodyClass} list-disc space-y-2 pl-6 marker:text-black/40`}
                      >
                        <li className={rowBodyTextClass}>60% strongly agreed</li>
                        <li className={rowBodyTextClass}>40% agreed</li>
                        <li className={rowBodyTextClass}>
                          0% were neutral or disagreed
                        </li>
                      </ul>
                    </>
                  }
                >
                  <figure className={ovcpFeedbackQuoteCardClass}>
                    <blockquote className={`${rowBodyTextClass}`}>
                      &ldquo;I like the tools used to better represent the clinical
                      picture.&rdquo;
                    </blockquote>
                    <figcaption className={ovcpFeedbackQuoteAttributionClass}>
                      Ophthalmologist
                    </figcaption>
                  </figure>
                </FrxProcessRowShell>

                <FrxProcessRowShell align="start" left={
                    <>
                      <h3 className={rowHeadingClass}>
                        This novel method of reconciling the problem list will support more
                        effective care coordination.
                      </h3>
                      <ul
                        className={`${rowBodyClass} list-disc space-y-2 pl-6 marker:text-black/40`}
                      >
                        <li className={rowBodyTextClass}>80% strongly agreed</li>
                        <li className={rowBodyTextClass}>20% were neutral</li>
                        <li className={rowBodyTextClass}>0% disagreed</li>
                      </ul>
                    </>
                  }
                >
                  <figure className={ovcpFeedbackQuoteCardClass}>
                    <blockquote className={`${rowBodyTextClass}`}>
                      &ldquo;This is a great way to provide a sub-structure to the overall
                      list, a great feature to reduce clutter.&rdquo;
                    </blockquote>
                    <figcaption className={ovcpFeedbackQuoteAttributionClass}>
                      Neuro-ophthalmologist
                    </figcaption>
                  </figure>
                </FrxProcessRowShell>
              </div>
            </section>

            <CaseStudyNextProjectButton currentPath="/case-studies/ovcp" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
