import Image from "next/image";

import Footer from "../../components/Footer";
import CaseStudyNextProjectButton from "../../components/CaseStudyNextProjectButton";
import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import {
  FrxProcessRowShell,
  frxStrategyHeadlineClass,
  mediaCardClass,
  rowBodyClass,
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
  vehrProblemCardClass,
  vehrSectionGapClass,
  vehrSectionTitleClass,
} from "../visual-ehr/vehrCaseStudySectionTokens";
import DchpBelowHero from "./DchpBelowHero";
import {
  dchpHeroFocusPills,
  dchpHeroLead,
  dchpProductContext,
  dchpTestimonial,
} from "./dchpBelowHeroData";

/** Split-row visuals: cap width and hug the right column on md+. */
const dchpSolutionVisualConstrainClass =
  "w-full min-w-0 max-w-md md:ml-auto md:max-w-lg lg:max-w-xl";

const dchpHeroPillClass =
  "inline-flex rounded-full border border-black/10 bg-white px-3 py-1.5 font-sans text-[13px] leading-none text-black/70";

const closingQuoteClass =
  "font-sans text-[16px] font-normal leading-[1.5] text-gray-800 md:text-[17px]";

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
            <section className="flex w-full flex-col gap-8 pt-8 md:gap-10 md:pt-12 lg:pt-16">
              <h1 className={`${frxHeroTitleClass} ${frxHeroTitleMaxWidthClass}`}>
                Responsive Care Access
              </h1>
              <div className="flex min-w-0 max-w-full flex-col gap-4 overflow-visible md:max-w-[50%]">
                <p className={frxSectionBodyClass}>{dchpHeroLead.body}</p>
                <ul
                  className="flex flex-nowrap gap-2 overflow-visible"
                  aria-label="Focus areas"
                >
                  {dchpHeroFocusPills.map((label) => (
                    <li key={label} className="shrink-0">
                      <span className={dchpHeroPillClass}>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
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

            <DchpBelowHero />

            <section
              className={frxCenteredIntroSectionClass}
              aria-labelledby="dchp-product-context-heading"
            >
              <div className={frxCenteredIntroBlockClass}>
                <h2
                  id="dchp-product-context-heading"
                  className={frxStrategyHeadlineClass}
                >
                  {dchpProductContext.title}
                </h2>
                <p className={frxSectionBodyClass}>{dchpProductContext.body}</p>
              </div>
            </section>

            <section
              className={vehrSectionGapClass}
              aria-labelledby="dchp-problem-heading"
            >
              <div className={vehrProblemCardClass}>
                <p className={vehrEyebrowClass}>The problem</p>
                <h2 id="dchp-problem-heading" className={`${vehrSectionTitleClass} mt-4 md:mt-5`}>
                  Non-Compliant by Design
                </h2>
                <p className={`${vehrBodyClass} mt-5 md:mt-6`}>
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
              className={vehrSectionGapClass}
              aria-labelledby="dchp-solution-heading"
            >
              <p className={vehrEyebrowClass}>The Solution</p>
              <h2 id="dchp-solution-heading" className={`${vehrSectionTitleClass} mt-4 md:mt-5`}>
                A Better Member Experience
              </h2>
              <p className={`${vehrBodyClass} mt-5 md:mt-6`}>
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

            <section
              className={vehrSectionGapClass}
              aria-label={`Feedback from ${dchpTestimonial.name}`}
            >
              <figure className="rounded-2xl border border-black/10 bg-white/50 p-8 md:p-10">
                <blockquote className={closingQuoteClass}>
                  &ldquo;{dchpTestimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <div className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={dchpTestimonial.avatarSrc}
                      alt={dchpTestimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-sans text-[16px] font-semibold leading-[1.5] text-black">
                      {dchpTestimonial.name}
                    </span>
                    <span className="font-sans text-[16px] font-normal leading-[1.5] text-black/50">
                      {dchpTestimonial.title}
                    </span>
                  </div>
                </figcaption>
              </figure>
            </section>

            <CaseStudyNextProjectButton currentPath="/case-studies/dell-childrens" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
