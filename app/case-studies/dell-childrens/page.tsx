import Image from "next/image";

import Footer from "../../components/Footer";
import CaseStudyNextProjectButton from "../../components/CaseStudyNextProjectButton";
import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import {
  FrxProcessRowShell,
  mediaCardClass,
  rowBodyClass,
  rowHeadingClass,
} from "../frx/FrxExtendedSections";

/** Split-row visuals: cap width and hug the right column on md+. */
const dchpSolutionVisualConstrainClass =
  "w-full min-w-0 max-w-md md:ml-auto md:max-w-lg lg:max-w-xl";

const dchpBelowHeroMeta = [
  { label: "Role", value: "Product Design Lead" },
  { label: "Client", value: "Ascension" },
  { label: "Timeline", value: "4 months" },
  { label: "Status", value: "Launched enterprise-wide" },
] as const;

const eyebrowClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";
const titleClass =
  "w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black";
const bodyClass =
  "w-full font-sans text-[22px] font-normal leading-[1.45] text-black/80 md:text-[24px]";
const cardClass =
  "rounded-2xl bg-[#E8E6E1] px-8 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14";
const testimonialCardClass =
  "rounded-2xl border border-black/10 bg-white/50 p-8 text-left";

const dchpSummaryBody =
  "Leading design and research for the member experience across web and mobile, I created new workflows for care team selection, physical ID card requests, and prior authorization review, helping transform the portal from a static information hub into a more actionable healthcare experience. The platform launched enterprise-wide within Ascension.";

const dchpTeamBody =
  "Product owner, product manager, system architect, front-end engineers, data engineers, and myself";

type DchpSolutionMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type DchpSolutionRow = {
  title: string;
  body: string;
  /** One or more screenshots; intrinsic size avoids collapsed layout in the media card */
  media: DchpSolutionMedia[];
};

const dchpSolutionRows: DchpSolutionRow[] = [
  {
    title: "Welcome",
    body:
      "A warmer entry point with personalized greeting and clearer paths into the tools members need most.",
    media: [
      {
        src: "/images/dellchildrens/after.png",
        alt: "Redesigned member portal welcome and home experience on mobile",
        width: 898,
        height: 803,
      },
    ],
  },
  {
    title: "Mobile-first retrofit",
    body:
      "Core screens were reworked for small viewports first—tighter hierarchy, touch-friendly controls, and responsive layouts—so the same tasks worked consistently from phone to desktop.",
    media: [
      {
        src: "/images/dellchildrens/home-mobile.png",
        alt: "Member portal home and navigation on mobile after mobile-first retrofit",
        width: 740,
        height: 786,
      },
    ],
  },
  {
    title: "Care Team Selection",
    body:
      "Members could designate a care team and primary care provider through flows that were not available in the legacy portal.",
    media: [
      {
        src: "/images/dellchildrens/change-mobile.png",
        alt: "Care team selection flow on mobile",
        width: 717,
        height: 786,
      },
    ],
  },
  {
    title: "ID-card Requests",
    body:
      "Physical ID card requests were brought into the digital experience so members could complete them without leaving the workflow.",
    media: [
      {
        src: "/images/dellchildrens/idcards-mobile.png",
        alt: "ID card request flow on mobile",
        width: 692,
        height: 786,
      },
    ],
  },
  {
    title: "Claims Visibility",
    body:
      "Claims and related status surfaced in context so members could review activity without hunting across disconnected views.",
    media: [
      {
        src: "/images/dellchildrens/claims-mobile.png",
        alt: "Claims and account visibility on mobile",
        width: 692,
        height: 786,
      },
    ],
  },
];

export default function DellChildrensCaseStudyPage() {
  return (
    <>
      <main className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
        <div className="flex w-full justify-center overflow-x-visible px-8 lg:px-16">
          <div className="flex w-full max-w-[1200px] flex-col items-stretch overflow-x-visible pb-32 pt-4">
            <section className="flex w-full flex-col gap-10 pt-8 md:pt-12 lg:pt-16">
              <h1 className="max-w-[1291px] font-sans text-[clamp(32px,4.8vw,64px)] font-semibold leading-[1.305] text-black">
                Creating a more usable and meaningful member experience
              </h1>
            </section>

            <section className="mt-16 w-full md:mt-24 lg:mt-28">
              <div className="relative w-full overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dellchildrens/responsive-home.png"
                  alt="Dell Children's Health Plan responsive member portal home"
                  width={2048}
                  height={1362}
                  className="block h-auto w-full"
                />
              </div>
            </section>

            <section
              className="mt-8 flex w-full flex-col gap-16 md:mt-10 lg:mt-12"
              aria-label="Project context"
            >
              <div className="flex flex-col gap-0 md:flex-row md:gap-0">
                {dchpBelowHeroMeta.map((item, i) => (
                  <div
                    key={`${item.label}-${i}`}
                    className="flex flex-col gap-1.5 border-b border-black/10 py-6 last:border-b-0 md:flex-1 md:border-b-0 md:border-r md:py-0 md:pl-8 md:pr-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                  >
                    <span className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                      {item.label}
                    </span>
                    <span className="font-sans text-[16px] font-semibold leading-[1.5] text-black">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex w-full flex-col gap-6 sm:gap-7">
                <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:items-start md:gap-10">
                  <div className="flex min-h-0 w-full flex-col gap-6 text-left md:h-full md:min-h-0 md:gap-0">
                    <div className="flex shrink-0 flex-col gap-6">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                          SUMMARY
                        </span>
                        <p className="font-sans text-[16px] font-normal leading-[1.5] text-black">
                          {dchpSummaryBody}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                          TEAM
                        </span>
                        <p className="font-sans text-[16px] font-normal leading-[1.5] text-black">
                          {dchpTeamBody}
                        </p>
                      </div>
                    </div>
                  </div>

                  <figure className={`${testimonialCardClass} flex min-h-0 min-w-0 w-full flex-col gap-6`}>
                    <blockquote className="font-sans text-[16px] font-normal leading-[1.5] text-black">
                      &ldquo;David designed previously unavailable Ascension portal workflows (care
                      team/PCP designation, ID card requests, prior auth) and partnered effectively
                      across product, engineering, and data to keep delivery moving.&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full">
                        <Image
                          src="/images/steven.png"
                          alt="Steven Long"
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <figcaption className="flex flex-col gap-0.5">
                        <span className="font-sans text-[16px] font-semibold leading-[1.5] text-black">
                          Steven Long
                        </span>
                        <span className="font-sans text-[16px] font-normal leading-[1.5] text-black/50">
                          Product Manager, Ascension Studio
                        </span>
                      </figcaption>
                    </div>
                  </figure>
                </div>
              </div>
            </section>

            <section
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="dchp-problem-heading"
            >
              <div className={cardClass}>
                <p className={eyebrowClass}>The problem</p>
                <h2 id="dchp-problem-heading" className={`${titleClass} mt-4 md:mt-5`}>
                  Non-Compliant by Design
                </h2>
                <p className={`${bodyClass} mt-5 md:mt-6`}>
                  Before redesign, the Dell Children&apos;s portal felt more like an eCommerce
                  site than a trusted healthcare platform. Generic messaging, cluttered navigation,
                  and limited functionality left members without clear guidance or meaningful
                  support in managing their care.
                </p>
                <figure className="mt-8 md:mt-10">
                  <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/dellchildrens/before.png"
                      alt="Legacy Dell Children's Health Plan member portal home page before redesign"
                      className="block h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-3 font-sans text-[16px] leading-[1.55] text-black/65 not-italic">
                    Home page that did not meet Medicaid standards
                  </figcaption>
                </figure>
              </div>
            </section>

            <section
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="dchp-solution-heading"
            >
              <p className={eyebrowClass}>The Solution</p>
              <h2 id="dchp-solution-heading" className={`${titleClass} mt-4 md:mt-5`}>
                A Better Member Experience
              </h2>
              <p className={`${bodyClass} mt-5 md:mt-6`}>
                The redesigned experience introduced a more welcoming, mobile-first interface with
                clearer navigation, personalized content, and expanded functionality. Members could
                more easily access information, complete key tasks, and manage their care across
                devices.
              </p>

              <div className="mt-10 w-full md:mt-14 lg:mt-16">
                {dchpSolutionRows.map((row, index) => {
                  const isFirst = index === 0;

                  return (
                    <FrxProcessRowShell
                      key={row.title}
                      isFirst={isFirst}
                      align="start"
                      left={
                        <>
                          <h3 className={rowHeadingClass}>{row.title}</h3>
                          <p className={rowBodyClass}>{row.body}</p>
                        </>
                      }
                    >
                      {row.media.length === 1 ? (
                        <div className={dchpSolutionVisualConstrainClass}>
                          <ZoomableProblemImage
                            src={row.media[0]!.src}
                            alt={row.media[0]!.alt}
                            width={row.media[0]!.width}
                            height={row.media[0]!.height}
                            dialogLabel={row.title}
                            shellClassName={`${mediaCardClass} flex flex-col gap-4`}
                            imgClassName="block h-auto w-full min-w-0 rounded-md border-0"
                          />
                        </div>
                      ) : (
                        <div
                          className={`${mediaCardClass} ${dchpSolutionVisualConstrainClass} flex flex-col gap-4`}
                        >
                          {row.media.map((m, mi) => (
                            <ZoomableProblemImage
                              key={`${row.title}-${mi}`}
                              src={m.src}
                              alt={m.alt}
                              width={m.width}
                              height={m.height}
                              dialogLabel={row.title}
                              shellClassName={mi > 0 ? "mt-4 w-full" : "w-full"}
                              imgClassName="block h-auto w-full min-w-0 rounded-md border-0"
                            />
                          ))}
                        </div>
                      )}
                    </FrxProcessRowShell>
                  );
                })}
              </div>
            </section>

            <CaseStudyNextProjectButton currentPath="/case-studies/dell-childrens" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
