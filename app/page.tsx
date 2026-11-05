import type { ReactNode } from "react";
import ColleagueQuotes from "./components/ColleagueQuotes";
import { TalkButton } from "./components/ContactModal";
import Footer from "./components/Footer";
import LinkedInButton from "./components/LinkedInButton";
import { heroBandClass } from "./lib/heroBand";
import HoverControlsVideo from "./components/HoverControlsVideo";

const shellClass = "w-full px-6 md:px-10";
const innerClass = "mx-auto w-full max-w-[1920px]";
const sideLabelClass = `w-fit self-start ${heroBandClass} mb-6 px-4 py-3 font-sans text-[16px] leading-[1.45] text-black md:mb-0 md:text-[17px]`;
const workLabelClass = `w-fit self-start ${heroBandClass} mb-6 px-4 py-3 font-sans text-[16px] leading-[1.45] text-black md:mb-0 md:text-[17px]`;
const sideLeadClass =
  "font-sans text-[1.375rem] font-normal leading-[1.35] tracking-[-0.02em] text-black md:text-[1.75rem]";
const bodyClass = "font-sans text-[16px] leading-[1.6] text-black/70 md:text-[17px]";
const splitClass = "grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-4";
const cardTitleClass =
  "font-sans text-[clamp(1.75rem,3.4vw,2.75rem)] font-normal leading-[1.12] tracking-[-0.03em] text-black";

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1em] w-[1em] shrink-0" aria-hidden="true" fill="none">
      <path d="M14 5h5v5M19 5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 13.5V19H5V7h5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const offerings = [
  {
    index: "01",
    name: "Workflow and Usability Audit",
    body: "A human factors review of a live product. I find where clinicians, patients, or staff get stuck, rank the problems by risk and impact, and give you a fix list your team can act on.",
    ideal: "Product teams whose users struggle with a clinical or regulated workflow.",
  },
  {
    index: "02",
    name: "Accessibility Audit and Remediation",
    body: "A WCAG 2.1 and 2.2 AA audit, specified fixes, and a conformance checklist developers can build against.",
    ideal: "Teams that need AA conformance before a launch, a procurement review, or a public-sector contract.",
  },
  {
    index: "03",
    name: "New Workflow Design",
    body: "End-to-end design for a new or complex workflow, from problem definition through shipped product: research, information architecture, prototypes, and handoff.",
    ideal: "Teams building a new clinical, public-sector, or multi-user product, or a major redesign of one that isn't scaling.",
  },
  {
    index: "04",
    name: "Design System and Pattern Library",
    body: "Reusable components and interaction patterns in Figma, with documentation and developer handoff. I'll also tell you when to extend an existing system and when a new pattern is the better call.",
    ideal: "Teams whose screens are drifting apart across products or builds.",
  },
  {
    index: "05",
    name: "Clinical Research and Usability Testing",
    body: "Scoping research, clinician interviews, moderated usability testing, and synthesis into design direction.",
    ideal: "Teams that need clinician input before committing to a build.",
  },
  {
    index: "06",
    name: "Embedded Product Design",
    body: "Three to six months as a senior product designer on your team, working inside your sprints with your product, engineering, and clinical partners.",
    ideal: "Teams that need senior design capacity for a defined period without a full-time hire.",
  },
] as const;

type WorkLink = { href: string; label: string; external?: boolean };

type WorkCard = {
  id: string;
  client: string;
  dates: string;
  summary: string;
  title: string;
  body: string;
  tags: readonly string[];
  links: readonly WorkLink[];
  media: ReactNode;
};

const workCards: readonly WorkCard[] = [
  {
    id: "vinyl",
    client: "Vinyl Health",
    dates: "2026",
    summary: "A health technology startup exploring AI-assisted clinical care. Joined as founding product designer to shape and prototype the experience.",
    title: "Made AI insights traceable to the patient data behind them.",
    body: "Built a working React prototype and explored with a practicing clinician where automation helps and where clinicians need control.",
    tags: ["AI-assisted care", "Prototyping", "Source transparency", "Clinician control"],
    links: [
      { href: "https://vinylhealth.vercel.app/", label: "View prototype", external: true },
    ],
    media: (
      <HoverControlsVideo
        src="/videos/vinyl.mp4"
        label="Vinyl Health clinician dashboard prototype with AI summaries linked to source data"
        className="block h-auto w-full rounded-[20px] border border-black/15"
      />
    ),
  },
  {
    id: "vehr",
    client: "VEHR Technologies",
    dates: "2024",
    summary: "A health technology startup rethinking the patient record. Partnered with the physician founder as founding product designer.",
    title: "Brought the patient’s history into one connected view.",
    body: "Designed a shared clinical timeline and aligned data views, supported by a Figma component library built from scratch.",
    tags: ["Clinical workflows", "Data visualization", "Design systems", "0→1"],
    links: [
      { href: "https://visual-ehr.vercel.app", label: "View prototype", external: true },
    ],
    media: (
      <HoverControlsVideo
        src="/videos/vehr/prototype.mp4"
        label="VEHR clinical timeline prototype aligning history, encounters, and related clinical data"
        className="block h-auto w-full rounded-[20px]"
      />
    ),
  },
  {
    id: "dell",
    client: "Dell Children’s Health Plan",
    dates: "2023",
    summary: "A children’s health plan serving Medicaid members. Led product design for its member portal redesign.",
    title: "Designed the tools members need to manage their care.",
    body: "Added care team, ID card, and prior authorization workflows to a responsive portal for 40,000+ members, launched in four months.",
    tags: ["Member portal", "Responsive design", "Accessibility", "Product leadership"],
    links: [],
    media: (
      <div className="group/dchp relative aspect-[1626/1011] w-full overflow-hidden rounded-[20px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/dellchildrens/hero-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dellchildrens/claims-mobile2.png"
          alt=""
          className="absolute left-[12.9%] top-[26.5%] h-auto w-[31.9%] origin-[50%_84%] transition-transform duration-500 ease-out motion-safe:group-hover/dchp:scale-[1.02] motion-reduce:transition-none"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dellchildrens/home-mobile2.png"
          alt="Dell Children’s Health Plan member portal on two phones, showing the home screen quick links and a claim detail."
          className="absolute left-[40.8%] top-[4.4%] h-auto w-[44%] origin-[50%_84%] transition-transform duration-500 ease-out motion-safe:group-hover/dchp:scale-[1.03] motion-reduce:transition-none"
        />
      </div>
    ),
  },
];

function WorkArticle({
  project,
  headingId,
  first,
}: {
  project: WorkCard;
  headingId?: string;
  first: boolean;
}) {
  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className={`grid grid-cols-1 gap-x-10 md:grid-cols-12 scroll-mt-32 md:scroll-mt-8 ${first ? "" : "mt-16 md:mt-24"}`}
    >
      <div className="md:col-span-3">
        {headingId ? (
          <h2 id={headingId} className={workLabelClass}>
            {project.client}
          </h2>
        ) : (
          <p className={workLabelClass}>{project.client}</p>
        )}
        <p className={`${bodyClass} md:mt-5`}>{project.dates}</p>
        <p className={`${bodyClass} mt-3`}>{project.summary}</p>
      </div>
      <div className="mt-6 md:col-span-9 md:mt-0">
        {project.media}
        <h3 id={`${project.id}-title`} className={`${cardTitleClass} mt-6 md:mt-8`}>
          {project.title}
        </h3>
        <p className={`${bodyClass} mt-5 max-w-[44rem]`}>{project.body}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border border-black/15 px-2.5 py-1 font-sans text-[13px] leading-none text-black/70"
            >
              {tag}
            </li>
          ))}
        </ul>
        {project.links.length > 0 ? (
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:gap-x-3 sm:gap-y-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 bg-[#1F2621] px-4 py-2.5 font-sans text-[14px] font-medium leading-none text-[#F4F2EE] transition-colors hover:bg-[#2A332C]"
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
                {link.external ? (
                  <>
                    <ExternalLinkIcon />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </>
                ) : null}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <main id="main-content" className="min-h-screen bg-[#F4F2EE]">
        <section aria-labelledby="hero-title" className={`${shellClass} ${heroBandClass} pb-16 pt-16 md:pb-24 md:pt-24`}>
          <div className={innerClass}>
            <h1
              id="hero-title"
              className="max-w-[16ch] font-sans text-[clamp(2.75rem,6.4vw,5.25rem)] font-normal leading-[0.98] tracking-[-0.045em] text-black"
            >
              Healthcare workflows that people can actually use.
            </h1>
            <p className="mt-10 max-w-[40rem] font-sans text-[17px] leading-[1.55] text-black/70 md:mt-12 md:text-[18px]">
              I design complex clinical and public-sector products, from the first conversation with
              clinicians to a launch that holds up. Recent work includes a Medicaid member portal for
              40,000+ members and an in-clinic refill workflow that cut time-to-refill 70% across 2,800+
              clinics.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center md:mt-10">
              <TalkButton variant="hero">Let&apos;s talk</TalkButton>
              <LinkedInButton />
              <a
                href="#work"
                className="group inline-flex items-center gap-2 font-sans text-[1.375rem] font-medium leading-[1.1] text-black/70 transition-colors hover:text-black sm:ml-2 md:text-[1.75rem]"
              >
                See my work
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
          <div className={innerClass}>
            {workCards.map((project, index) => (
              <WorkArticle
                key={project.id}
                project={project}
                headingId={index === 0 ? "work-title" : undefined}
                first={index === 0}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="quotes-title" className={`${shellClass} scroll-mt-8 mt-20 md:mt-28`}>
          <div className={`${innerClass} ${splitClass}`}>
            <h2 id="quotes-title" className={sideLabelClass}>
              In their words
            </h2>
            <div className="md:col-span-3">
              <ColleagueQuotes />
            </div>
          </div>
        </section>

        <section
          id="services"
          aria-labelledby="services-title"
          className={`${shellClass} scroll-mt-32 mt-20 pb-20 md:mt-28 md:scroll-mt-8 md:pb-28`}
        >
          <div className={`${innerClass} ${splitClass}`}>
            <h2 id="services-title" className={sideLabelClass}>
              Ways to work together
            </h2>
            <div className="md:col-span-3">
              <p className={sideLeadClass}>A few ways I can help, depending on where your product is.</p>
              <ul className="mt-8 grid grid-cols-1 gap-4">
                {offerings.map((offer) => (
                  <li key={offer.index} className="flex flex-col border border-black/10 p-5 sm:p-6">
                    <h3 className="font-sans text-[20px] font-medium leading-[1.25] tracking-[-0.02em] text-black">
                      {offer.name}
                    </h3>
                    <p className="mt-3 font-sans text-[15px] leading-[1.55] text-black/70">{offer.body}</p>
                    <p className="mt-5 font-sans text-[16px] font-medium text-black">Ideal for</p>
                    <p className="mt-2 font-sans text-[15px] leading-[1.55] text-black/70">{offer.ideal}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
