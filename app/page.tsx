import Image from "next/image";
import type { ReactNode } from "react";
import ColleagueQuotes from "./components/ColleagueQuotes";
import { TalkButton } from "./components/ContactModal";
import Footer from "./components/Footer";
import LinkedInButton from "./components/LinkedInButton";
import { heroBandClass } from "./lib/heroBand";
import { HeroVideo, HeroVideoProvider, HeroVideoToggle } from "./components/HeroVideo";
import PhotoGroups from "./components/PhotoGroups";
import { getPhotoGroups } from "./lib/photos";

const shellClass = "w-full px-6 md:px-10";
const sideLeadClass =
  "font-sans text-[1.375rem] font-normal leading-[1.35] tracking-[-0.02em] text-black md:text-[1.75rem]";
const bodyClass = "font-sans text-[16px] leading-[1.6] text-black/70 md:text-[17px]";
const columnClass = "mx-auto w-full max-w-[1200px]";
const pillBaseClass = "w-fit whitespace-nowrap border px-2.5 py-1 font-sans text-[13px] leading-none";
const datePillClass = `${pillBaseClass} border-black/15 text-black/70`;
const companyNameClass = "font-sans text-[1.375rem] font-medium leading-[1.1] text-black md:text-[1.75rem]";
const tagClass = "border border-black/15 px-2.5 py-1 font-sans text-[13px] leading-none text-black/70";

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
    body: "Learn how patients, caregivers, and clinicians work. Explore their goals, environments, and constraints to understand where a design can help.",
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

const processLayers = [
  {
    name: "The experience",
    body: "Clear information, accessible interfaces, understandable instructions, and useful feedback for patients and care teams.",
  },
  {
    name: "Interactions and workflows",
    body: "Task sequences, clinical handoffs, system status, and recovery when something goes wrong.",
  },
  {
    name: "Information and mental models",
    body: "Records, relationships, and terminology organized around how people understand their work.",
  },
  {
    name: "Human capabilities and limitations",
    body: "Attention, memory, perception, physical abilities, and the demands of making decisions.",
  },
  {
    name: "People and care environments",
    body: "Patients, caregivers, and clinicians working across interruptions, time pressures, devices, and settings.",
  },
  {
    name: "Research and evaluation",
    body: "Observation, interviews, task analysis, and usability testing that inform and refine design decisions.",
  },
] as const;

function VideoPanel({ src, label, widthClass }: { src: string; label: string; widthClass: string }) {
  return (
    <div className="group/panel relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-[20px] bg-[#E8E5DE]">
      <div
        className={`${widthClass} overflow-hidden rounded-[12px] shadow-[0_24px_60px_-20px_rgba(15,12,19,0.35)] transition-transform duration-500 ease-out motion-safe:group-hover/panel:scale-[1.02] motion-reduce:transition-none`}
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
  dates: string;
  description: string;
  link?: WorkLink;
  media: ReactNode;
};

const workCards: readonly WorkCard[] = [
  {
    id: "vinyl",
    client: "Vinyl Health",
    dates: "2026",
    description: "Partnered with a practicing clinician to design and prototype an AI-assisted clinical experience, making supporting patient data easy to verify without overwhelming the view.",
    link: { href: "https://vinylhealth.vercel.app/", label: "View prototype", external: true },
    media: (
      <VideoPanel
        src="/videos/vinyl.mp4"
        label="Vinyl Health clinician dashboard prototype with AI summaries linked to source data"
        widthClass="w-[86%]"
      />
    ),
  },
  {
    id: "vehr",
    client: "VEHR Technologies",
    dates: "2024",
    description: "Partnered with the physician founder to bring patient history into a connected clinical timeline, supported by aligned data views and a component library built from scratch.",
    link: { href: "https://visual-ehr.vercel.app", label: "View prototype", external: true },
    media: (
      <VideoPanel
        src="/videos/vehr/prototype.mp4"
        label="VEHR clinical timeline prototype aligning history, encounters, and related clinical data"
        widthClass="w-[70%]"
      />
    ),
  },
  {
    id: "dell",
    client: "Dell Children’s Health Plan",
    dates: "2023",
    description: "Led the redesign of a children’s Medicaid member portal, launching care team, ID card, and prior authorization tools for 40,000+ members in four months.",
    media: (
      <div className="group/dchp relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-black/15">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/dellchildrens/hero-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-0 top-1/2 aspect-[1626/1011] -translate-y-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dellchildrens/home-mobile2.png"
            alt="Dell Children’s Health Plan member portal on a phone, showing the home screen quick links."
            className="absolute left-[28%] top-[4.4%] h-auto w-[44%] origin-[50%_84%] transition-transform duration-500 ease-out motion-safe:group-hover/dchp:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
      </div>
    ),
  },
  {
    id: "frx",
    client: "Fresenius Medical Care",
    dates: "2022",
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
];

const caseStudyIds = new Set(["dell", "frx"]);

function ProjectHero({ project }: { project: WorkCard }) {
  const { link } = project;
  return (
    <HeroVideoProvider>
      <div className="group/hero relative mt-8">
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
        <HeroVideoToggle className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity duration-200 group-hover/hero:opacity-100 focus-visible:opacity-100 md:right-5 md:top-5" />
      </div>
    </HeroVideoProvider>
  );
}

function CaseStudyArticle({ project }: { project: WorkCard }) {
  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className="scroll-mt-32 md:scroll-mt-8"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10">
        <div className="flex flex-col items-start justify-between gap-3">
          <h3 id={`${project.id}-title`} className={companyNameClass}>
            {project.client}
          </h3>
          <div className="flex flex-wrap gap-2">
            <p className={datePillClass}>{project.dates}</p>
            {project.link ? null : <p className={tagClass}>Case study coming soon</p>}
          </div>
        </div>
        <p className={`${bodyClass} max-w-[36rem]`}>{project.description}</p>
      </div>
      <ProjectHero project={project} />
    </article>
  );
}

export default function Home() {
  return (
    <>
      <main id="main-content" className="min-h-screen bg-[#F4F2EE]">
        <section aria-labelledby="hero-title" className={`${shellClass} ${heroBandClass} pb-16 pt-16 md:pb-24 md:pt-24`}>
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

        <section aria-labelledby="quotes-title" className={`${shellClass} scroll-mt-8 mt-20 md:mt-28`}>
          <div className={columnClass}>
            <h2 id="quotes-title" className="sr-only">
              In their words
            </h2>
            <ColleagueQuotes />
          </div>
        </section>

        <section
          id="services"
          aria-labelledby="services-title"
          className={`${shellClass} scroll-mt-32 mt-20 md:mt-28 md:scroll-mt-8`}
        >
          <div className={columnClass}>
            <h2 id="services-title" className="sr-only">
              Ways to work together
            </h2>
            <div>
              <p className={sideLeadClass}>A few ways I can help, depending on where your product is.</p>
              <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {offerings.map((offer) => (
                  <li key={offer.index} className="flex flex-col rounded-[20px] bg-[#E8E5DE] p-6 md:p-8">
                    <h3 className="font-sans text-[20px] font-medium leading-[1.25] tracking-[-0.02em] text-black">
                      {offer.name}
                    </h3>
                    <p className="mt-3 font-sans text-[15px] leading-[1.55] text-black/70">{offer.body}</p>
                    <p className="mt-auto pt-5 font-sans text-[16px] font-medium text-black">Ideal for</p>
                    <p className="mt-2 font-sans text-[15px] leading-[1.55] text-black/70">{offer.ideal}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="process"
          aria-labelledby="process-title"
          className={`${shellClass} scroll-mt-32 mt-20 md:mt-28 md:scroll-mt-8`}
        >
          <div className={columnClass}>
            <h2 id="process-title" className={sideLeadClass}>
              My design process
            </h2>
            <p className="mt-4 font-sans text-[16px] leading-[1.6] text-black/70 md:mt-5 md:text-[18px]">
              I bring a human factors engineering perspective to healthcare design. I study how people understand
              information, make decisions, and complete tasks within the realities of care, then work with clinical
              and product teams to turn that understanding into accessible, usable experiences.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
              {processSteps.map((step) => (
                <li key={step.name} className="border border-black/10 p-5 sm:p-6">
                  <h3 className="font-sans text-[20px] font-medium leading-[1.25] tracking-[-0.02em] text-black">
                    {step.name}
                  </h3>
                  <p className="mt-3 font-sans text-[15px] leading-[1.55] text-black/70">{step.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
              <Image
                src="/images/healthberg.png"
                alt="Hospital cutaway showing calm patient-facing care above the complex coordination, information, and operational work beneath it."
                width={1024}
                height={1536}
                sizes="(min-width: 1280px) 480px, (min-width: 768px) 38vw, 360px"
                className="mx-auto h-auto w-full max-w-[360px] mix-blend-multiply md:max-w-none"
              />
              <ul className="flex flex-col gap-7 md:justify-between md:gap-6 md:py-[6%]">
                {processLayers.map((layer) => (
                  <li key={layer.name}>
                    <h3 className="font-sans text-[18px] font-medium leading-[1.3] tracking-[-0.01em] text-black md:text-[20px]">
                      {layer.name}
                    </h3>
                    <p className="mt-2 font-sans text-[15px] leading-[1.55] text-black/70 md:text-[16px]">{layer.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="about"
          aria-labelledby="about-title"
          className={`${shellClass} scroll-mt-32 mt-20 pb-20 md:mt-28 md:scroll-mt-8 md:pb-28`}
        >
          <div className={columnClass}>
            <h2 id="about-title" className={sideLeadClass}>
              Behind the screen
            </h2>
            <div className="mt-10 md:mt-14">
              <PhotoGroups groups={getPhotoGroups()} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
