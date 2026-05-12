import type { ReactNode } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CaseStudyNextProjectButton from "../../components/CaseStudyNextProjectButton";
import OvcpBelowHero from "./OvcpBelowHero";
import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import {
  FrxProcessRowShell,
  rowBodyClass,
  rowBodyTextClass,
  rowHeadingClass,
} from "../frx/FrxExtendedSections";

const eyebrowClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";
const sectionTitleClass =
  "w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black";
const bodyClass =
  "w-full font-sans text-[22px] font-normal leading-[1.45] text-black/80 md:text-[24px]";
const subheadClass =
  "font-sans text-[22px] font-semibold leading-[1.25] tracking-tight text-black md:text-[24px]";
const subbodyClass =
  "mt-3 font-sans text-[22px] font-normal leading-[1.45] text-black/80 md:text-[24px]";
const problemCardClass =
  "rounded-2xl bg-[#E8E6E1] px-8 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14";
const mediaCardClass =
  "overflow-hidden rounded-2xl border border-black/10 bg-white p-4 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.06)] md:p-5";
const pullQuoteClass =
  "mx-auto max-w-3xl text-center font-sans text-[20px] font-medium leading-[1.45] text-black md:text-[22px]";
const attributionClass =
  "mt-4 text-center font-sans text-[15px] font-normal leading-[1.5] text-black/55 md:text-[16px]";
const captionClass =
  "mt-3 font-sans text-[16px] leading-[1.55] text-black/65";

/** Right-column research quotes paired with problem pillars (inside problem card). */
const ovcpProblemQuoteVisualClass =
  "rounded-xl border border-black/10 bg-white/45 px-5 py-6 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.08)] md:px-6 md:py-7";
const ovcpProblemQuoteTextClass =
  "font-sans text-[16px] font-medium leading-[1.55] text-black md:text-[17px]";

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
          <div className="flex w-full max-w-[1200px] flex-col items-stretch overflow-x-visible pb-32 pt-12">
            <Header
              leftVariant="back"
              backHref="/"
              backAriaLabel="Back to home"
            />

            <section className="mt-24 flex w-full flex-col gap-10 md:mt-32 lg:mt-36">
              <h1 className="max-w-[1291px] font-sans text-[clamp(32px,4.8vw,64px)] font-semibold leading-[1.305] text-black">
                Reimagining problem list management with clinicians
              </h1>
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
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="ovcp-problem-heading"
            >
              <div className={problemCardClass}>
                <p className={eyebrowClass}>The problem</p>
                <h2
                  id="ovcp-problem-heading"
                  className={`${sectionTitleClass} mt-4 md:mt-5`}
                >
                  The Problem List is a Shared Pain Point
                </h2>

                <blockquote
                  className={`${bodyClass} mx-auto mt-6 max-w-3xl text-center md:mt-8`}
                >
                  &ldquo;Problem lists are the problem of all EMRs:
                  <br />
                  no one does a good job of presenting them.&rdquo;
                </blockquote>
                <p className={attributionClass}>&mdash; Health informatics expert</p>

                <div className="mt-8 flex w-full flex-col md:mt-10">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start md:gap-10 lg:gap-12">
                    <div className="min-w-0 md:max-w-lg">
                      <h3 className={subheadClass}>It Becomes Overwhelmingly Large</h3>
                      <p className={subbodyClass}>
                        As diagnoses accumulate over time, clinicians struggle to quickly
                        identify the most relevant information. Critical context becomes buried
                        in long, difficult-to-scan records.
                      </p>
                    </div>
                    <aside className={`${ovcpProblemQuoteVisualClass} min-w-0`}>
                      <blockquote>
                        <p className={ovcpProblemQuoteTextClass}>
                          &ldquo;The document can quickly grow to 30 or more lines of text,
                          making a clear and quick understanding of the patient&apos;s health
                          nearly impossible.&rdquo;
                        </p>
                      </blockquote>
                    </aside>
                  </div>

                  <div className="mt-10 grid grid-cols-1 gap-8 border-t border-black/10 pt-10 md:mt-12 md:grid-cols-2 md:items-start md:gap-10 md:pt-12 lg:gap-12">
                    <div className="min-w-0 md:max-w-lg">
                      <h3 className={subheadClass}>It Becomes Redundant</h3>
                      <p className={subbodyClass}>
                        Inconsistent documentation practices often lead to duplicate or
                        overlapping diagnoses, creating unnecessary noise and reducing trust in
                        the data.
                      </p>
                    </div>
                    <aside className={`${ovcpProblemQuoteVisualClass} min-w-0`}>
                      <blockquote>
                        <p className={ovcpProblemQuoteTextClass}>
                          &ldquo;Different codes are added to the problem list that reference
                          the same disease.
                          <br />
                          <br />
                          The problem list becomes redundant&hellip;&rdquo;
                        </p>
                      </blockquote>
                    </aside>
                  </div>

                  <div className="mt-10 grid grid-cols-1 gap-8 border-t border-black/10 pt-10 md:mt-12 md:grid-cols-2 md:items-start md:gap-10 md:pt-12 lg:gap-12">
                    <div className="min-w-0 md:max-w-lg">
                      <h3 className={subheadClass}>It Lacks Clear Governance</h3>
                      <p className={subbodyClass}>
                        Clinicians disagreed on what belongs in the problem list, revealing
                        the absence of shared standards for maintaining meaningful and
                        clinically useful records.
                      </p>
                    </div>
                    <aside className={`${ovcpProblemQuoteVisualClass} min-w-0`}>
                      <blockquote>
                        <p className={ovcpProblemQuoteTextClass}>
                          &ldquo;One physician would not add &lsquo;persistent cough&rsquo;
                          &hellip;.
                        </p>
                        <p className={`${ovcpProblemQuoteTextClass} mt-4`}>
                          Yet, if that patient is admitted to the emergency room, such
                          information could be a key clue for determining treatment.&rdquo;
                        </p>
                      </blockquote>
                    </aside>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="ovcp-prototyping-heading"
            >
              <p className={eyebrowClass}>Prototyping</p>
              <h2
                id="ovcp-prototyping-heading"
                className={`${sectionTitleClass} mt-4 md:mt-5`}
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
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="ovcp-refinement-heading"
            >
              <p className={eyebrowClass}>Refinement</p>
              <h2
                id="ovcp-refinement-heading"
                className={`${sectionTitleClass} mt-4 md:mt-5`}
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
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="ovcp-feedback-heading"
            >
              <p className={eyebrowClass}>Formative feedback</p>
              <h2
                id="ovcp-feedback-heading"
                className={`${sectionTitleClass} mt-4 md:mt-5`}
              >
                What Clinicians Said
              </h2>
              <p className={`${bodyClass} mt-5 md:mt-6`}>
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
