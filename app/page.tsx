import type { ReactNode } from "react";
import ColleagueQuotes from "./components/ColleagueQuotes";
import { TalkButton } from "./components/ContactModal";
import Footer from "./components/Footer";
import { heroBandClass } from "./lib/heroBand";
import HoverControlsVideo from "./components/HoverControlsVideo";

const shellClass = "w-full px-6 md:px-10";
const innerClass = "mx-auto w-full max-w-[1040px]";
const eyebrowClass = "font-sans text-[12px] uppercase leading-none tracking-[0.14em] text-black/55";
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

const lookFirst = [
  "Where clinicians or staff lose time",
  "Where patients or members drop off",
  "Where compliance and access rules get in the way",
  "Where workflows break under real conditions",
] as const;

const skillGroups = [
  {
    label: "Clinical and public sector",
    body: "Medicaid compliance, prior authorization, eligibility workflows, HIPAA, clinical trial protocols, U.S. Department of Defense health IT",
  },
  {
    label: "Accessibility",
    body: "WCAG 2.1 and 2.2 AA audits and remediation, conformance checklists, keyboard and focus order, accessible form and error patterns",
  },
  {
    label: "Research",
    body: "Clinician interviews and co-design, moderated usability testing, usability audits, synthesis into design direction",
  },
  {
    label: "Systems",
    body: "Component libraries and patterns in Figma, pattern documentation, developer handoff",
  },
  {
    label: "Build",
    body: "Functional React prototypes with Cursor and Claude, HTML, CSS, JavaScript",
  },
  {
    label: "Collaboration",
    body: "Agile and Scrum, cross-functional work with product, engineering, data, clinical, and compliance partners",
  },
] as const;

const workSteps = [
  {
    title: "Learn the work.",
    body: "Talk with the people who do it, and map the decisions and exceptions.",
  },
  {
    title: "Define the system.",
    body: "Connect research, information architecture, and interaction design.",
  },
  {
    title: "Test the critical moments.",
    body: "Check risky steps with clinicians or users before committing to a build.",
  },
  {
    title: "Hand off with clarity.",
    body: "Specs, pattern documentation, and a conformance checklist developers can build against.",
  },
  {
    title: "Check it again after launch.",
    body: "Watch for drift, accessibility regressions, and new edge cases.",
  },
] as const;

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

const earlierWork = [
  {
    id: "clinical-ink",
    client: "Clinical Ink",
    role: "Senior Product Designer · Clinical trial platform",
    title: "Mapping usability issues across an eCOA platform for participant-facing apps.",
    body: "Ran usability audits across several parts of the system and produced user flows, prototypes, and high-fidelity mobile screens. Designed a reusable error-state pattern for device integrations that carries across study builds.",
  },
  {
    id: "nhs",
    client: "NHS Sexual Health Clinics",
    role: "Design Researcher · STIQI",
    title: "Turned clinician usability testing into recommendations for a funding bid.",
    body: "Developed the research protocol, recruited clinicians, and ran moderated usability testing. Synthesized the findings into interface recommendations.",
  },
  {
    id: "uhg",
    client: "UnitedHealth Group",
    role: "Senior UX Designer · Drug-spend analytics",
    title: "Made dense pharmaceutical spend data readable enough to act on.",
    body: "Designed analytics dashboards that turned complex datasets into clear visual frameworks for decision-making.",
  },
  {
    id: "kaiser",
    client: "Kaiser Permanente",
    role: "Senior Designer · Innovation team",
    title: "Visualized stroke care outcomes at population and patient levels.",
    body: "Designed data visualizations that show stroke outcomes both across a population and for individual patients.",
  },
  {
    id: "conteneo",
    client: "Conteneo",
    role: "UI/UX Design Lead · SaaS",
    title: "Redesigned the Weave platform end to end.",
    body: "Led information architecture, navigation, and framework creation tools. Ran customer discovery sessions that shaped the roadmap.",
  },
  {
    id: "dod",
    client: "Department of Defense",
    role: "UI Engineer · Optimal Vision Care Prototype",
    title: "Tested problem list reconciliation with practicing physicians.",
    body: "Planned and ran formative evaluation in a complex military EHR. 100% of clinicians rated the method efficient and effective, and the findings moved the program to summative evaluation.",
  },
] as const;

type WorkLink = { href: string; label: string; external?: boolean };

type WorkCard = {
  id: string;
  index: string;
  client: string;
  role: string;
  title: string;
  body: string;
  tags: readonly string[];
  decision?: string;
  links: readonly WorkLink[];
  media: ReactNode;
};

const workCards: readonly WorkCard[] = [
  {
    id: "vehr",
    index: "01",
    client: "VEHR Technologies",
    role: "Founding Product Design Lead · Interactive prototype",
    title: "Organized the patient record around history, so clinicians can read related information together.",
    body: "Partnered with a physician founder to turn clinical mental models into a shared timeline and aligned data views. Built the component and interaction pattern library in Figma from scratch to support scalable prototyping and clearer engineering handoff.",
    tags: ["EHR", "Information architecture", "Pattern library"],
    links: [
      { href: "https://visual-ehr.vercel.app", label: "View interactive prototype", external: true },
    ],
    media: (
      <HoverControlsVideo
        src="/videos/vehr/prototype.mp4"
        label="VEHR clinical timeline prototype aligning history, encounters, and related clinical data"
        className="block h-auto w-full"
      />
    ),
  },
  {
    id: "frx",
    index: "02",
    client: "Fresenius Medical Care",
    role: "UX Design Lead · Enterprise-wide launch",
    title: "Cut time-to-refill 70% across 2,800+ clinics.",
    body: "Owned research and design for an in-clinic refill workflow that replaced paper, fax, and phone follow-ups. Mapped the system with clinic staff, set the UI architecture and component patterns, and partnered with engineering and clinical operations through launch.",
    tags: ["Clinical workflow", "Point of care", "Design system", "Salesforce"],
    decision:
      "Validated the system's objects with nurses before wireframing, so the interface matched how they think about a refill.",
    links: [],
    media: (
      <HoverControlsVideo
        src="/images/frx/fresenius.mp4"
        label="In-clinic digital refill workflow in CareTeamHub"
        className="block h-auto w-full"
        style={{ clipPath: "inset(0 0 0 1px)" }}
      />
    ),
  },
  {
    id: "dell",
    index: "03",
    client: "Ascension",
    role: "Product Design Lead · Enterprise-wide launch",
    title: "Launched a responsive Medicaid member portal to 40,000+ members.",
    body: "Led end-to-end design and research for a portal that added workflows the legacy system lacked: care team designation, ID card requests, prior authorization review, and in-context claims status. Audited against WCAG AA and produced the conformance checklist developers built against.",
    tags: ["Medicaid", "Member portal", "Accessibility", "Prior authorization"],
    links: [],
    media: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/dchp-card.png"
        alt="Dell Children’s Health Plan member portal on desktop and mobile, showing care team, ID card, and plan overview."
        className="block h-auto w-full"
      />
    ),
  },
];

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
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center md:mt-10">
              <TalkButton variant="hero">Let&apos;s talk</TalkButton>
              <a
                href="#work"
                className="font-sans text-[1.375rem] font-medium leading-[1.1] text-black/70 transition-colors hover:text-black md:text-[1.75rem]"
              >
                See my work
              </a>
            </div>
          </div>
        </section>

        <section id="approach" aria-labelledby="problem-title" className={`${shellClass} scroll-mt-32 pt-10 md:pt-14`}>
          <div className={`${innerClass} ${splitClass} md:gap-y-12`}>
            <h2 id="problem-title" className={sideLabelClass}>
              How I start
            </h2>
            <div className="md:col-span-3">
              <p className={sideLeadClass}>
                Tools fail at the edges.
              </p>
              <p className={`${bodyClass} mt-5 max-w-[40rem]`}>
                They fail because the design ignores how the work actually happens. The interruptions, the
                exceptions, the paperwork nobody mentioned in the kickoff. I start there.
              </p>
              <p className={`${sideLeadClass} mt-12 md:mt-16`}>Where I look first</p>
              <ul className="mt-6 list-disc space-y-4 pl-5 font-sans text-[16px] leading-[1.8] text-black marker:text-black md:text-[17px]">
                {lookFirst.map((item) => (
                  <li key={item} className="pl-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="services-intro"
          aria-labelledby="skills-title"
          className={`${shellClass} scroll-mt-8 mt-20 md:mt-28`}
        >
          <div className={`${innerClass} ${splitClass}`}>
            <h2 id="skills-title" className={sideLabelClass}>
              What I bring
            </h2>
            <div className="md:col-span-3">
              <p className={sideLeadClass}>
                Ten years of UX, six of them in healthcare and regulated programs.
              </p>
              <dl className="mt-8">
                {skillGroups.map((group) => (
                  <div key={group.label} className="border-t border-black/10 py-5">
                    <dt className="font-sans text-[16px] font-medium text-black">{group.label}</dt>
                    <dd className="mt-2 font-sans text-[15px] leading-[1.55] text-black/70">{group.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section aria-labelledby="approach-title" className={`${shellClass} scroll-mt-32 mt-20 md:mt-28`}>
          <div className={`${innerClass} ${splitClass}`}>
            <h2 id="approach-title" className={sideLabelClass}>
              How I work
            </h2>
            <div className="md:col-span-3">
              <p className={sideLeadClass}>Start with the workflow, not the screens.</p>
              <ol className="mt-8">
                {workSteps.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-t border-black/10 py-5">
                    <span className="font-sans text-[13px] text-black/55">0{index + 1}</span>
                    <p className="font-sans text-[16px] leading-[1.55] text-black/80">
                      <span className="font-medium text-black">{step.title}</span> {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section
          id="services"
          aria-labelledby="services-title"
          className={`${shellClass} scroll-mt-32 mt-20 md:mt-28`}
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
                    <p className={eyebrowClass}>{offer.index}</p>
                    <h3 className="mt-4 font-sans text-[20px] font-medium leading-[1.25] tracking-[-0.02em] text-black">
                      {offer.name}
                    </h3>
                    <p className="mt-3 font-sans text-[15px] leading-[1.55] text-black/70">{offer.body}</p>
                    <p className="mt-5 font-sans text-[14px] leading-[1.5] text-black/80">
                      <span className="font-medium text-black">Ideal for: </span>
                      {offer.ideal}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
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

        <section id="work" aria-labelledby="work-title" className={`${shellClass} scroll-mt-32 mt-20 pb-20 md:mt-28 md:pb-28`}>
          <div className={innerClass}>
            {workCards.map((project, index) => {
              const showMedia = project.id === "vehr";
              return (
              <article
                key={project.id}
                id={project.id}
                aria-labelledby={`${project.id}-title`}
                className={`${splitClass} scroll-mt-32 ${index === 0 ? "" : "mt-16 md:mt-24"}`}
              >
                {index === 0 ? (
                  <h2 id="work-title" className={workLabelClass}>
                    {project.client}
                  </h2>
                ) : (
                  <p className={workLabelClass}>{project.client}</p>
                )}
                <div className="md:col-span-3">
                  <p className={bodyClass}>{project.role}</p>
                  <h3 id={`${project.id}-title`} className={`${cardTitleClass} mt-6 md:mt-8`}>
                    {project.title}
                  </h3>
                  <p className={`${bodyClass} mt-6 max-w-[40rem]`}>{project.body}</p>
                  {showMedia && project.decision ? (
                    <aside className="mt-8 max-w-[36rem] border-l-2 border-black pl-4">
                      <p className={eyebrowClass}>Decision</p>
                      <p className="mt-3 font-sans text-[16px] leading-[1.5] text-black">{project.decision}</p>
                    </aside>
                  ) : null}
                </div>
                {showMedia ? (
                  <>
                    <div className="mt-8 md:col-span-4">{project.media}</div>
                    <ul className="mt-4 flex flex-wrap gap-2 md:col-span-4">
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
                      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:gap-x-3 sm:gap-y-3 md:col-span-4">
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
                  </>
                ) : null}
              </article>
              );
            })}
            {earlierWork.map((project) => (
              <article
                key={project.id}
                id={project.id === "clinical-ink" ? "more-work" : project.id}
                aria-labelledby={`${project.id}-title`}
                className={`${splitClass} scroll-mt-32 mt-16 md:mt-24`}
              >
                <p className={workLabelClass}>{project.client}</p>
                <div className="md:col-span-3">
                  <p className={bodyClass}>{project.role}</p>
                  <h3 id={`${project.id}-title`} className={`${cardTitleClass} mt-6 md:mt-8`}>
                    {project.title}
                  </h3>
                  <p className={`${bodyClass} mt-6 max-w-[40rem]`}>{project.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
