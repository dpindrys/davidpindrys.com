import type { ReactNode } from "react";
import ColleagueQuotes from "./components/ColleagueQuotes";
import { TalkButton } from "./components/ContactModal";
import Footer from "./components/Footer";
import LinkedInButton from "./components/LinkedInButton";
import { heroBandClass } from "./lib/heroBand";
import DchpHeroMedia from "./components/DchpHeroMedia";
import { FloatingColumnsToggle, FloatingPlaybackProvider } from "./components/FloatingColumns";
import { HeroVideo, HeroVideoProvider, HeroVideoToggle } from "./components/HeroVideo";
import PhotoGroups from "./components/PhotoGroups";
import { getPhotoGroups } from "./lib/photos";
import {
  cardBodyClass,
  cardTitleClass,
  columnClass,
  companyNameClass,
  filledCardClass,
  heroToggleClass,
  metaTextClass,
  outlineCardClass,
  sectionGapClass,
  shellClass,
  sideLeadClass,
  tagClass,
} from "./lib/pageStyles";

const heroCueClass =
  "-translate-x-2 opacity-0 transition duration-200 ease-out group-has-[.hero-area:hover]/card:translate-x-0 group-has-[.hero-area:hover]/card:opacity-100 group-has-[.hero-area_a:focus-visible]/card:translate-x-0 group-has-[.hero-area_a:focus-visible]/card:opacity-100 motion-reduce:transition-none";

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.9em] w-[0.9em] shrink-0" aria-hidden="true" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.9em] w-[0.9em] shrink-0" aria-hidden="true" fill="none">
      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

function VideoPanel({ src, label }: { src: string; label: string }) {
  return (
    <div className="group/panel relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-[20px] bg-[#E8E5DE]">
      <div
        className="w-[78%] overflow-hidden rounded-[12px] shadow-[0_24px_60px_-20px_rgba(15,12,19,0.35)] transition-transform duration-500 ease-out motion-safe:group-hover/panel:scale-[1.02] motion-reduce:transition-none"
      >
        <HeroVideo src={src} label={label} className="block h-auto w-full" />
      </div>
    </div>
  );
}

type WorkLink = { href: string; label: string; external?: boolean };

type WorkCard = {
  id: string;
  client: string;
  focus: readonly string[];
  description: string;
  link?: WorkLink;
  media: ReactNode;
};

const workCards: readonly WorkCard[] = [
  {
    id: "vehr",
    client: "VEHR Technologies",
    focus: ["Information Architecture", "Longitudinal Records", "Design Systems"],
    description: "Partnered with the physician founder to bring patient history into a connected clinical timeline, supported by aligned data views and a component library built from scratch.",
    link: { href: "https://visual-ehr.vercel.app", label: "View prototype", external: true },
    media: (
      <VideoPanel
        src="/videos/vehr/prototype.mp4"
        label="VEHR clinical timeline prototype aligning history, encounters, and related clinical data"
      />
    ),
  },
  {
    id: "vinyl",
    client: "Vinyl Health",
    focus: ["AI Transparency", "Clinician Co-Design", "Functional Prototyping"],
    description: "Partnered with a practicing clinician to design and prototype an AI-assisted clinical experience, making supporting patient data easy to verify without overwhelming the view.",
    link: { href: "https://vinylhealth.vercel.app/", label: "View prototype", external: true },
    media: (
      <VideoPanel
        src="/videos/vinyl.mp4"
        label="Vinyl Health clinician dashboard prototype with AI summaries linked to source data"
      />
    ),
  },
  {
    id: "frx",
    client: "Fresenius Medical Care",
    focus: ["Workflow Simplification", "Clinical Workflows", "Exception Handling"],
    description: "Led design of a medication refill workflow within clinic staff’s Salesforce application, replacing paper, fax, and phone follow-ups to make refills 70% faster across 2,800+ dialysis clinics.",
    media: (
      <div className="group/frx relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-black/15">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/frx/bg.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[78%] rounded-[12px] shadow-[0_24px_60px_-20px_rgba(15,40,80,0.35)] transition-transform duration-500 ease-out motion-safe:group-hover/frx:scale-[1.02] motion-reduce:transition-none">
            <HeroVideo
              src="/images/frx/fresenius.mp4"
              label="In-clinic medication refill workflow in CareTeamHub"
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
    focus: ["Member Self-Service", "Accessibility", "End-to-End Design"],
    description: "Led the redesign of a children’s Medicaid member portal, launching care team, ID card, and prior authorization tools for 40,000+ members in four months.",
    link: { href: "/case-studies/dell-childrens-health-plan", label: "View case study" },
    media: <DchpHeroMedia />,
  },
];

const caseStudyIds = new Set(["dell", "frx"]);

function ProjectHero({ project }: { project: WorkCard }) {
  const { link } = project;
  return (
    <HeroVideoProvider>
      <FloatingPlaybackProvider>
        <div className="hero-area group/hero relative mt-8">
          {link ? (
            <a
              href={link.href}
              aria-label={`${link.label}: ${project.client}${link.external ? " (opens in a new tab)" : ""}`}
              className="block rounded-[20px]"
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {project.media}
            </a>
          ) : (
            project.media
          )}
          <HeroVideoToggle className={heroToggleClass} />
          <FloatingColumnsToggle className={heroToggleClass} />
        </div>
      </FloatingPlaybackProvider>
    </HeroVideoProvider>
  );
}

function CaseStudyArticle({ project }: { project: WorkCard }) {
  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className="group/card scroll-mt-32 md:scroll-mt-8"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10">
        <div className="flex flex-col items-start justify-between gap-3">
          <h3 id={`${project.id}-title`} className={`${companyNameClass} flex items-center gap-2`}>
            {project.client}
            <span className={heroCueClass}>{project.link?.external ? <ExternalLinkIcon /> : <ArrowRightIcon />}</span>
          </h3>
          <div className="flex flex-col gap-3">
            <p className={metaTextClass}>
              {project.link ? (project.link.external ? "Prototype" : "Case study") : "Case study coming soon"}
            </p>
            <ul aria-label="Focus areas" className="flex flex-wrap gap-2">
              {project.focus.map((area) => (
                <li key={area} className={tagClass}>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="max-w-[36rem] font-sans text-[16px] leading-[1.6] text-black md:text-[17px]">{project.description}</p>
      </div>
      <ProjectHero project={project} />
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
            <h1
              id="hero-title"
              className="max-w-[16ch] font-sans text-[clamp(2.75rem,6.4vw,5.25rem)] font-normal leading-[0.98] tracking-[-0.045em] text-black"
            >
              Healthcare workflows that people can actually use.
            </h1>
            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center md:mt-12">
              <TalkButton variant="hero">Let&apos;s talk</TalkButton>
              <LinkedInButton />
              <a
                href="#work"
                className="group inline-flex items-center gap-2 font-sans text-[1.375rem] font-medium leading-[1.1] text-black/70 transition-colors hover:text-black sm:ml-2 md:text-[1.75rem]"
              >
                Selected work
                <svg
                  viewBox="0 0 24 24"
                  className="h-[1em] w-[1em] shrink-0 transition-transform duration-200 ease-out group-hover:translate-y-1 group-focus-visible:translate-y-1 motion-reduce:transition-none"
                  aria-hidden="true"
                  fill="none"
                >
                  <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section id="work" aria-labelledby="work-title" className={`${shellClass} scroll-mt-32 pt-10 md:-scroll-mt-6 md:pt-14`}>
          <div className={columnClass}>
            <h2 id="work-title" className="sr-only">
              Work
            </h2>
            <div className="flex flex-col gap-24 md:gap-32">
              {[
                ...workCards.filter((project) => caseStudyIds.has(project.id)),
                ...workCards.filter((project) => !caseStudyIds.has(project.id)),
              ].map((project) => (
                <CaseStudyArticle key={project.id} project={project} />
              ))}
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
            <p className="mt-4 font-sans text-[16px] leading-[1.6] text-black/70 md:mt-5 md:text-[18px]">
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
      <Footer />
    </>
  );
}
