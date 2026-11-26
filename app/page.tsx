import type { ReactNode } from "react";
import CaseStudyCardCtas from "./components/CaseStudyCardCtas";
import CaseStudyCardHeader from "./components/CaseStudyCardHeader";
import ColleagueQuotes from "./components/ColleagueQuotes";
import { TalkButton } from "./components/ContactModal";
import CaseStudyHeroLink from "./components/CaseStudyHeroLink";
import { DemoPlayOverlay, type DemoCaption } from "./components/DemoDialog";
import LinkedInButton from "./components/LinkedInButton";
import { buttonPrimaryClass } from "./components/buttonTokens";
import { heroBandClass } from "./lib/heroBand";
import DchpHeroMedia from "./components/DchpHeroMedia";
import { FloatingColumnsToggle, FloatingPlaybackProvider } from "./components/FloatingColumns";
import { HeroVideoProvider, HeroVideoToggle } from "./components/HeroVideo";
import PhotoGroups from "./components/PhotoGroups";
import { getPhotoGroups } from "./lib/photos";
import {
  bodyClass,
  cardBodyClass,
  cardTitleClass,
  columnClass,
  filledCardClass,
  heroToggleClass,
  outlineCardClass,
  sectionGapClass,
  shellClass,
  sideLeadClass,
} from "./lib/pageStyles";

const offerings = [
  {
    index: "01",
    name: "Find what needs fixing",
    body: "Workflow, usability, and accessibility reviews to uncover where people get stuck. You’ll get clear priorities and practical fixes, informed by research with the people using your product.",
    ideal: "Teams improving an existing product or preparing for launch.",
  },
  {
    index: "02",
    name: "Design what comes next",
    body: "Turn a complex problem into a clear, usable experience, from early research to prototypes and developer handoff, with reusable components to support future growth.",
    ideal: "Teams building something new or rethinking a core workflow.",
  },
  {
    index: "03",
    name: "Bring me onto your team",
    body: "Embedded senior product design for three to six months. I work alongside your product, engineering, and clinical partners to shape decisions and move the work through delivery.",
    ideal: "Teams that need an experienced design partner without a full-time hire.",
  },
] as const;

const processSteps = [
  {
    name: "Understand people and context",
    body: "Learn how clinicians, caregivers, and patients navigate care together. Explore their goals and the constraints they face to understand how design can help.",
  },
  {
    name: "Model the workflow",
    body: "Map tasks, information, and relationships before shaping the interface. Account for handoffs, exceptions, and recovery when things go wrong.",
  },
  {
    name: "Prototype and evaluate",
    body: "Build prototypes and evaluate them with representative users. Observe comprehension, task completion, and confusion, then refine the design.",
  },
  {
    name: "Implement and improve",
    body: "Partner with engineering and clinical teams through implementation. Review accessibility and interaction details, and use feedback from real-world use to guide improvements.",
  },
] as const;

const workTaglineClass = "mt-1 font-sans text-[15px] leading-[1.4] text-black/80 md:text-[16px]";

type WorkCard = {
  id: string;
  client: string;
  tagline: string;
  description: string;
  /** When set, enables the View case study CTA (unless `heroCaseStudyLink`). */
  caseStudyHref?: string;
  /** Whole hero links to `caseStudyHref`; no play-demo overlay or separate CTA. */
  heroCaseStudyLink?: boolean;
  demoVideo?: string;
  demoTitle?: string;
  /** Walkthrough: heading beside play, above captions/segments. */
  demoWalkthroughHeading?: string;
  demoDescription?: string;
  demoCaptions?: readonly DemoCaption[];
  bgImage?: string;
  media: ReactNode;
};

const workCards: readonly WorkCard[] = [
  {
    id: "vehr",
    client: "VEHR Technologies",
    tagline: "Clinical timeline",
    description:
      "A clinical timeline that brings symptoms, encounters, and measurements into one view, helping clinicians follow a patient’s history and see how changes connect.",
    media: (
      <div className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-[12px] border border-black/15">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/vehr/bg.png"
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[78%] rounded-[12px] shadow-[0_24px_60px_-20px_rgba(15,40,80,0.35)] transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/vehr/hero.png"
              alt=""
              draggable={false}
              className="block h-auto w-full rounded-[12px]"
              style={{ clipPath: "inset(0 0 0 1px round 12px)" }}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "vinyl",
    client: "Vinyl Health",
    tagline: "AI-assisted patient overview",
    description:
      "An AI-assisted overview that helps clinicians review changes in a patient’s condition and trace generated summaries back to the underlying clinical records.",
    media: (
      <div className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-[12px] border border-black/15">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/vinyl/bg.png"
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[78%] rounded-[12px] shadow-[0_24px_60px_-20px_rgba(15,40,80,0.35)] transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/vinyl/hero.png"
              alt=""
              draggable={false}
              className="block h-auto w-full rounded-[12px]"
              style={{ clipPath: "inset(0 0 0 1px round 12px)" }}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "frx",
    client: "Fresenius Medical Care",
    tagline: "In-clinic refill workflow",
    description:
      "Designed a medication refill workflow within clinic staff’s Salesforce application, replacing paper, fax, and phone follow-ups and making refills 70% faster across 2,800+ dialysis clinics.",
    media: (
      <div className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-[12px] border border-black/15">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/frx/bg.png"
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[78%] rounded-[12px] shadow-[0_24px_60px_-20px_rgba(15,40,80,0.35)] transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/frx/hero.png"
              alt=""
              draggable={false}
              className="block h-auto w-full rounded-[12px]"
              style={{ clipPath: "inset(0 0 0 1px round 12px)" }}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "dell",
    client: "Dell Children’s Health Plan",
    tagline: "Member self-service portal",
    description:
      "Led design of a children’s Medicaid member portal, launching care team, ID card, and prior authorization tools for 40,000+ members in four months.",
    media: <DchpHeroMedia />,
  },
];

const vehrCaseStudy = workCards.find((item) => item.id === "vehr")!;
const vinylCaseStudy = workCards.find((item) => item.id === "vinyl")!;
const frxCaseStudy = workCards.find((item) => item.id === "frx")!;
const dellCaseStudy = workCards.find((item) => item.id === "dell")!;

function ProjectHero({ project }: { project: WorkCard }) {
  const heroMedia =
    project.heroCaseStudyLink && project.caseStudyHref ? (
      <CaseStudyHeroLink
        href={project.caseStudyHref}
        label={`View ${project.client} case study`}
      >
        {project.media}
      </CaseStudyHeroLink>
    ) : (
      project.media
    );

  return (
    <HeroVideoProvider>
      <FloatingPlaybackProvider>
        <div className="hero-area group group/hero relative mt-5">
          {heroMedia}
          {project.demoVideo && !project.heroCaseStudyLink ? (
            <DemoPlayOverlay
              client={project.client}
              video={project.demoVideo}
              title={project.demoTitle}
              subtitle={project.client}
              walkthroughHeading={project.demoWalkthroughHeading}
              description={project.demoDescription}
              bgImage={project.bgImage}
              captions={project.demoCaptions}
              layout="walkthrough"
              demoSwitchId={project.id as "vehr" | "vinyl"}
            />
          ) : null}
          <HeroVideoToggle className={heroToggleClass} />
          <FloatingColumnsToggle className={heroToggleClass} />
        </div>
      </FloatingPlaybackProvider>
    </HeroVideoProvider>
  );
}

function CaseStudyArticle({
  project,
  wide = false,
}: {
  project: WorkCard;
  /** Full-width row: side-by-side body and CTA on md+, like pre-grid case study cards. */
  wide?: boolean;
}) {
  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className={
        wide
          ? "scroll-mt-32 rounded-[16px] border border-black/15 p-5 md:scroll-mt-8 md:p-6"
          : "flex h-full min-w-0 scroll-mt-32 flex-col rounded-[16px] border border-black/15 p-5 md:scroll-mt-8 md:p-6"
      }
    >
      <CaseStudyCardHeader
        id={project.id}
        client={project.client}
        tagline={project.tagline}
        taglineClass={workTaglineClass}
      />
      <ProjectHero project={project} />
      <div
        className={
          wide && !project.heroCaseStudyLink
            ? "mt-5 flex w-full flex-col gap-5 md:grid md:grid-cols-2 md:gap-8"
            : wide
              ? "mt-5 flex w-full flex-col gap-5"
              : "mt-5 flex w-full flex-1 flex-col gap-5"
        }
      >
        <p className={bodyClass}>{project.description}</p>
        {project.caseStudyHref && !project.heroCaseStudyLink ? (
          <CaseStudyCardCtas href={project.caseStudyHref} wide={wide} />
        ) : null}
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <main id="main-content" className="min-h-screen bg-[#F4F2EE]">
        <section
          aria-labelledby="hero-title"
          className={`${shellClass} ${heroBandClass} flex min-h-[80svh] flex-col justify-center pb-16 pt-16 md:pb-24 md:pt-24`}
        >
          <div className={columnClass}>
            <p className="font-sans text-[15px] font-medium leading-none text-black/80 md:text-[16px]">
              Senior Product Designer
            </p>
            <h1
              id="hero-title"
              className="mt-5 max-w-[18ch] font-sans text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-black md:mt-6"
            >
              I design healthcare
              <br />
              software that simplifies
              <br />
              clinical work.
            </h1>
            <p className={`mt-6 max-w-[36rem] md:mt-8 ${bodyClass}`}>
              From patient record review to medication refills, I lead research, workflow design, and
              prototyping to help clinicians and care teams get things done.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a href="#work" className={`group ${buttonPrimaryClass}`}>
                View my work
                <svg
                  viewBox="0 0 24 24"
                  className="h-[1em] w-[1em] shrink-0 transition-transform duration-200 ease-out group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                  fill="none"
                >
                  <path
                    d="M12 5v14M6 13l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <TalkButton variant="outline">Let&apos;s talk</TalkButton>
              <LinkedInButton />
            </div>
          </div>
        </section>

        <section id="work" aria-labelledby="work-title" className={`${shellClass} scroll-mt-32 pt-10 md:-scroll-mt-6 md:pt-14`}>
          <div className={columnClass}>
            <h2 id="work-title" className={sideLeadClass}>
              Selected work
            </h2>
            <p className="mt-3 font-sans text-[15px] leading-[1.4] text-black/70 md:text-[16px]">
              Case studies coming soon
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <CaseStudyArticle project={frxCaseStudy} />
              <CaseStudyArticle project={dellCaseStudy} />
              <CaseStudyArticle project={vehrCaseStudy} />
              <CaseStudyArticle project={vinylCaseStudy} />
            </div>
          </div>
        </section>

        <section
          id="services"
          aria-labelledby="services-title"
          className={`${shellClass} scroll-mt-32 md:scroll-mt-8 ${sectionGapClass}`}
        >
          <div className={columnClass}>
            <div>
              <h2 id="services-title" className={sideLeadClass}>
                A few ways I can help
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {offerings.map((offer) => (
                  <li key={offer.index} className={`${filledCardClass} flex flex-col`}>
                    <h3 className={cardTitleClass}>
                      {offer.name}
                    </h3>
                    <p className={`${cardBodyClass} mt-3`}>{offer.body}</p>
                    <p className="mt-auto pt-5 font-sans text-[16px] font-medium text-black">Ideal for</p>
                    <p className={`${cardBodyClass} mt-2`}>{offer.ideal}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="quotes-title" className={`${shellClass} scroll-mt-8 ${sectionGapClass}`}>
          <div className={columnClass}>
            <h2 id="quotes-title" className={`${sideLeadClass} mb-8`}>
              In their words
            </h2>
            <ColleagueQuotes />
          </div>
        </section>

        <section
          id="process"
          aria-labelledby="process-title"
          className={`${shellClass} scroll-mt-32 md:scroll-mt-8 ${sectionGapClass}`}
        >
          <div className={columnClass}>
            <h2 id="process-title" className={sideLeadClass}>
              My design process
            </h2>
            <p className={`mt-4 md:mt-5 ${bodyClass}`}>
              I bring a human factors engineering perspective to healthcare design. I study how people understand
              information, make decisions, and complete tasks within the realities of care, then work with clinical
              and product teams to turn that understanding into accessible, usable experiences that remove barriers to
              delivering and receiving care.
            </p>
            <ol className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
              {processSteps.map((step, i) => (
                <li key={step.name} className={`${outlineCardClass} flex items-start gap-5 sm:gap-6`}>
                  <span
                    aria-hidden="true"
                    className="w-[0.56em] shrink-0 text-center font-sans text-[6rem] font-bold leading-[0.74] md:text-[8.5rem] tracking-[-0.04em] text-black"
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className={cardTitleClass}>
                      {step.name}
                    </h3>
                    <p className={`${cardBodyClass} mt-3`}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="about"
          aria-labelledby="about-title"
          className={`${shellClass} scroll-mt-32 pb-20 md:scroll-mt-8 md:pb-28 ${sectionGapClass}`}
        >
          <div className={columnClass}>
            <h2 id="about-title" className={sideLeadClass}>
              Behind the screen
            </h2>
            <div className="mt-8">
              <PhotoGroups groups={getPhotoGroups()} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
