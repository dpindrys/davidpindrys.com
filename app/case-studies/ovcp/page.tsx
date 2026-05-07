import type { ReactNode } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OvcpBelowHero from "./OvcpBelowHero";

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
const testimonialCardClass =
  "flex min-h-0 w-full flex-col gap-4 rounded-2xl border border-black/10 bg-white/50 p-8 text-left";
const pullQuoteClass =
  "mx-auto max-w-3xl text-center font-sans text-[20px] font-medium leading-[1.45] text-black md:text-[22px]";
const attributionClass =
  "mt-4 text-center font-sans text-[15px] font-normal leading-[1.5] text-black/55 md:text-[16px]";
const captionClass =
  "mt-3 font-sans text-[16px] leading-[1.55] text-black/75";

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

/** Text second on desktop (visual leads left column). */
function OvcpRowShellVisualFirst({
  isFirst,
  visual,
  copy,
}: {
  isFirst?: boolean;
  visual: ReactNode;
  copy: ReactNode;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-12 lg:gap-14 ${isFirst ? "pt-0" : "border-t border-black/10 pt-12 md:pt-16 lg:pt-20"} pb-12 md:pb-16 lg:pb-20`}
    >
      <div className="order-2 min-w-0 w-full md:order-none">{visual}</div>
      <div className="order-1 flex min-w-0 flex-col md:order-none md:max-w-lg">
        {copy}
      </div>
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

            <section className="mt-24 flex w-full flex-col gap-6 md:mt-32 lg:mt-36">
              <h1 className="max-w-[1291px] font-sans text-[22px] font-semibold leading-[1.25] tracking-tight text-black md:text-[24px]">
                Reconciling the Problem List
              </h1>
              <div className="font-sans text-[22px] font-normal leading-[1.45] text-black/70 md:text-[24px]">
                Optimal Vision Care Prototype{" "}
                <span aria-hidden="true">•</span> Department of Defense
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
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="ovcp-discovery-heading"
            >
              <div className={problemCardClass}>
                <p className={eyebrowClass}>Discovery</p>
                <h2
                  id="ovcp-discovery-heading"
                  className={`${sectionTitleClass} mt-4 md:mt-5`}
                >
                  The Problem List Is a Shared Pain Point
                </h2>
                <blockquote className={`${pullQuoteClass} mt-8 md:mt-10`}>
                  &ldquo;Problem lists are the problem of all EMRs—no one does a good job
                  of presenting them.&rdquo;
                </blockquote>
                <p className={attributionClass}>— Health informatics expert</p>

                <div className="mt-12 grid w-full grid-cols-1 gap-10 md:mt-14 md:grid-cols-2 md:gap-12 lg:gap-14">
                  <div>
                    <h3 className={subheadClass}>Physician as designer</h3>
                    <p className={subbodyClass}>
                      The first solution sketch came from an emergency physician. On a
                      call, she argued that diagnoses had to be groupable—and backed it up
                      with a clear Paint prototype.
                    </p>
                    <p className={subbodyClass}>
                      From there, I iterated a handful of higher-fidelity concepts to
                      turn a noisy list into something clinicians could actually reconcile.
                    </p>
                  </div>
                  <div>
                    <h3 className={subheadClass}>Taking it a step further</h3>
                    <p className={subbodyClass}>
                      Working backward from her consolidated-list vision, the next
                      question was how to start from a flat diagnosis list and arrive
                      there in a few intentional steps.
                    </p>
                    <p className={subbodyClass}>
                      In a short flow, a physician could open a diagnosis, see it next to
                      others on the list, and choose how to consolidate—secondary to,
                      related to, subset of, and similar options.
                    </p>
                  </div>
                </div>

                <figure className="mt-12 w-full md:mt-14">
                  <div className={mediaCardClass}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/ovcp/joy-sketch.png"
                      alt="Hand-drawn sketch of low-touch problem list reconciliation"
                      className="block h-auto w-full rounded-md border-0"
                    />
                    <figcaption className={`${captionClass} not-italic`}>
                      <span className="font-semibold text-black">SME prototype:</span>{" "}
                      An ER physician&apos;s sketch of how quick problem reconciliation
                      might feel.
                    </figcaption>
                  </div>
                </figure>
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
                    <div className={mediaCardClass}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/ovcp/direct.png"
                        alt="Direct manipulation prototype for relating diagnoses on the problem list"
                        className="block h-auto w-full rounded-md border-0"
                      />
                    </div>
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
                    <div className={mediaCardClass}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/ovcp/similar-secondary2.png"
                        alt="Similar to and secondary to relationship choices when consolidating diagnoses"
                        className="block h-auto w-full rounded-md border-0"
                      />
                    </div>
                  }
                />

                <div className="border-t border-black/10 pt-12 md:pt-16 lg:pt-20">
                  <div className={mediaCardClass}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/ovcp/problem-list.gif"
                      alt="Animated click-through: consolidating duplicate diagnoses by dragging and choosing similar or secondary relationships"
                      className="block h-auto w-full rounded-md border-0"
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
                    <div className={mediaCardClass}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/ovcp/sorting.png"
                        alt="Problem list sorted with last-active context and status labels"
                        className="block h-auto w-full rounded-md border-0"
                      />
                    </div>
                  }
                />

                <OvcpRowShellVisualFirst
                  visual={
                    <div className={mediaCardClass}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/ovcp/context.png"
                        alt="Problem detail with history and linked activity"
                        className="block h-auto w-full rounded-md border-0"
                      />
                    </div>
                  }
                  copy={
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
                />

                <div className="border-t border-black/10 pt-12 md:pt-16 lg:pt-20">
                  <div className={mediaCardClass}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/ovcp/problemlist-final.gif"
                      alt="Refined prototype: filtering resolved problems and opening diagnosis history"
                      className="block h-auto w-full rounded-md border-0"
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

              <div className="mt-10 grid w-full grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
                <figure className={testimonialCardClass}>
                  <blockquote className="font-sans text-[16px] font-normal leading-[1.5] text-black md:text-[17px]">
                    &ldquo;This is a great way to provide a sub-structure to the overall
                    list—a great feature to reduce clutter.&rdquo;
                  </blockquote>
                  <figcaption className="font-sans text-[15px] font-semibold leading-[1.5] text-black md:text-[16px]">
                    Neuro-ophthalmologist
                  </figcaption>
                </figure>
                <figure className={testimonialCardClass}>
                  <blockquote className="font-sans text-[16px] font-normal leading-[1.5] text-black md:text-[17px]">
                    &ldquo;I like the tools used to better represent the clinical
                    picture.&rdquo;
                  </blockquote>
                  <figcaption className="font-sans text-[15px] font-semibold leading-[1.5] text-black md:text-[16px]">
                    Ophthalmologist
                  </figcaption>
                </figure>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
