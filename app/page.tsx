import type { ReactNode } from "react";
import Footer from "./components/Footer";
import { CONTACT_HREF } from "./components/Header";
import HoverControlsVideo from "./components/HoverControlsVideo";

const shellClass = "w-full px-6 md:px-10";
const innerClass = "mx-auto w-full max-w-[1040px]";
const eyebrowClass = "font-sans text-[12px] uppercase leading-none tracking-[0.14em] text-black/55";
const bodyClass = "font-sans text-[16px] leading-[1.6] text-black/70 md:text-[17px]";
const sectionHeadingClass =
  "font-sans text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.035em] text-black";

const decisionPoints = [
  {
    title: "Set direction early.",
    body: "Work with clinicians to define the decisions, constraints, and risks behind a workflow before designing screens.",
  },
  {
    title: "Build the system.",
    body: "Create pattern libraries and decide when to extend an existing system versus create a new pattern.",
  },
  {
    title: "Own quality.",
    body: "Lead accessibility work from WCAG AA audits and remediation through the conformance checklists developers build against.",
  },
] as const;

const earlierWork = [
  {
    title: "Department of Defense · Problem list reconciliation",
    body: "Co-designed EHR problem list reconciliation with practicing physicians. 100% of clinicians rated the method efficient and effective.",
  },
  {
    title: "Picwell · Medicare Part D plan selection",
    body: "Helped members compare and choose Medicare Part D plans.",
  },
] as const;

type ImpactProject = {
  id: string;
  index: string;
  client: string;
  role: string;
  title: string;
  body: string;
  metrics?: readonly string[];
  link?: { href: string; label: string };
  media: ReactNode;
};

const impactProjects: readonly ImpactProject[] = [
  {
    id: "vehr",
    index: "01",
    client: "VEHR Technologies",
    role: "Founding Product Design Lead · Prototype handed to engineering",
    title: "Organized the patient record around history, so clinicians can read related information together.",
    body: "Partnered with a physician founder to turn clinical mental models into a shared timeline and aligned data views. Built the component and interaction pattern library in Figma from scratch to support scalable prototyping and clearer engineering handoff.",
    link: { href: "https://vehr.vercel.app/", label: "View Live Prototype" },
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
    metrics: ["70% faster refill completion", "2,800+ clinics", "43,000+ patients"],
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
    client: "Ascension, Dell Children’s Health Plan",
    role: "Product Design Lead · Enterprise-wide launch",
    title: "Launched a responsive Medicaid member portal to 40,000+ members.",
    body: "Led end-to-end design and research for a portal that added workflows the legacy system lacked: care team designation, ID card requests, prior authorization review, and in-context claims status. Audited against WCAG AA and produced the conformance checklist developers built against.",
    metrics: ["40,000+ members", "WCAG AA remediation", "Enterprise-wide launch"],
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
      <main id="main-content" className="min-h-screen bg-[#F4F2EE] pb-24 md:pb-32">
        <section aria-labelledby="hero-title" className={`${shellClass} pt-16 md:pt-24`}>
          <div className={innerClass}>
            <p className={eyebrowClass}>Senior Product Designer · Boston</p>
            <h1
              id="hero-title"
              className="mt-6 max-w-[18ch] font-sans text-[clamp(2.75rem,6.4vw,5.25rem)] font-normal leading-[0.98] tracking-[-0.045em] text-black md:mt-8"
            >
              Driving healthcare product design from clinical insight to launch.
            </h1>
            <p className="mt-10 max-w-[40rem] font-sans text-[17px] leading-[1.55] text-black/70 md:mt-12 md:text-[18px]">
              I’ve led the design of a Medicaid member portal serving 40,000+ members and an in-clinic
              refill workflow that cut time-to-refill 70% across 2,800+ clinics.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center md:mt-10">
              <a
                href={CONTACT_HREF}
                className="inline-flex items-center gap-3 bg-[#D8EF7A] px-5 py-3.5 font-sans text-[15px] font-medium text-black transition-colors hover:bg-[#CBE35F]"
              >
                Let’s talk <span aria-hidden>↗</span>
              </a>
              <a
                href="#work"
                className="font-sans text-[15px] font-medium text-black/70 transition-colors hover:text-black"
              >
                See selected impact
              </a>
            </div>

            <div className="mt-14 max-w-[40rem] border-t border-black/10 pt-6 md:mt-16">
              <p className={eyebrowClass}>Currently</p>
              <p className="mt-3 font-sans text-[16px] leading-[1.55] text-black/80 md:text-[17px]">
                Senior Product Designer, Clinical Ink. Usability audits, user flows, and high-fidelity
                mobile screens for participant-facing eCOA apps in clinical trials.
              </p>
            </div>
          </div>
        </section>

        <section id="work" aria-labelledby="work-title" className={`${shellClass} scroll-mt-8 mt-20 md:mt-28`}>
          <div className={innerClass}>
            <h2 id="work-title" className="font-sans text-[15px] font-semibold text-black">
              Selected impact
            </h2>

            <div className="mt-6 flex flex-col gap-16 md:gap-24">
              {impactProjects.map((project) => (
                <article
                  key={project.id}
                  id={project.id}
                  aria-labelledby={`${project.id}-title`}
                  className="scroll-mt-8 border-t border-black/10 pt-6 md:pt-8"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <p className={eyebrowClass}>
                      {project.index} / {project.client}
                    </p>
                    <p className="max-w-[36rem] font-sans text-[13px] leading-snug text-black/70 sm:text-right">
                      {project.role}
                    </p>
                  </div>
                  <h3 id={`${project.id}-title`} className={`${sectionHeadingClass} mt-6 md:mt-8`}>
                    {project.title}
                  </h3>
                  <div className="mt-8 bg-white p-4 sm:p-8 md:mt-10 md:p-12">{project.media}</div>
                  <p className={`${bodyClass} mt-8 max-w-[40rem]`}>{project.body}</p>
                  {project.metrics ? (
                    <ul className="mt-8 grid grid-cols-1 gap-3 border-t border-black/10 pt-5 sm:grid-cols-3 sm:gap-6">
                      {project.metrics.map((metric) => (
                        <li
                          key={metric}
                          className="font-sans text-[15px] font-medium leading-snug text-black"
                        >
                          {metric}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {project.link ? (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 font-sans text-[15px] font-medium text-black underline decoration-black underline-offset-4"
                    >
                      {project.link.label} <span aria-hidden>↗</span>
                    </a>
                  ) : null}
                </article>
              ))}
            </div>

            <div id="more-work" className="scroll-mt-8 mt-20 md:mt-28">
              <h3 className="font-sans text-[15px] font-semibold text-black">Earlier work</h3>
              <ul className="mt-6">
                {earlierWork.map((item) => (
                  <li key={item.title} className="border-t border-black/10 py-6">
                    <p className="font-sans text-[16px] font-medium text-black">{item.title}</p>
                    <p className="mt-2 max-w-[40rem] font-sans text-[15px] leading-[1.5] text-black/70">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="approach"
          aria-labelledby="approach-title"
          className="scroll-mt-8 mt-24 w-full px-2 md:mt-32 md:px-4"
        >
          <div className="mx-auto w-full max-w-[1160px] bg-[#1F2621] px-4 py-16 text-[#F4F2EE] md:px-6 md:py-24">
            <div id="leadership" className={`${innerClass} scroll-mt-8`}>
              <h2
                id="approach-title"
                className="max-w-[20ch] font-sans text-[clamp(1.75rem,3.4vw,2.75rem)] font-normal leading-[1.15] tracking-[-0.03em]"
              >
                How I drive product decisions
              </h2>
              <ul className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
                {decisionPoints.map((point) => (
                  <li key={point.title} className="border-t border-white/20 pt-6">
                    <h3 className="font-sans text-[16px] font-medium">{point.title}</h3>
                    <p className="mt-3 font-sans text-[15px] leading-[1.55] text-white/80">{point.body}</p>
                  </li>
                ))}
              </ul>
              <aside className="mt-12 max-w-[28rem] bg-[#F4F2EE] px-5 py-5 text-black md:mt-16">
                <p className={eyebrowClass}>Accessibility</p>
                <p className="mt-3 font-sans text-[15px] leading-[1.55] text-black/80">
                  WCAG 2.1 AA audits, remediation, and developer checklists. Deque certified in usability
                  testing for accessibility.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section aria-labelledby="personal-title" className={`${shellClass} mt-20 md:mt-28`}>
          <div className={`${innerClass} grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16`}>
            <div className="flex items-start gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile.png"
                alt="David Pindrys"
                className="h-16 w-16 shrink-0 object-cover"
              />
              <div>
                <p className={eyebrowClass}>The person behind the work</p>
                <h2
                  id="personal-title"
                  className="mt-3 font-sans text-[clamp(1.5rem,2.4vw,2rem)] font-normal leading-[1.15] tracking-[-0.025em] text-black"
                >
                  Healthcare is personal.
                </h2>
              </div>
            </div>
            <p className={`${bodyClass} max-w-[30rem]`}>
              A car accident in high school introduced me to healthcare as a patient. Seeing the demands on
              clinicians, and the friction in their tools, shaped the work I chose to do.
            </p>
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-title"
          className={`${shellClass} scroll-mt-8 mt-24 md:mt-32`}
        >
          <div className={`${innerClass} border-t border-black/10 pt-10 md:pt-14`}>
            <p className={eyebrowClass}>Let’s work together</p>
            <h2
              id="contact-title"
              className="mt-6 font-sans text-[clamp(2.5rem,5.5vw,4.5rem)] font-normal leading-[1.02] tracking-[-0.04em] text-black md:mt-8"
            >
              Working on something
              <br className="hidden sm:block" /> that needs to be clearer?
            </h2>
            <a
              href={CONTACT_HREF}
              className="mt-10 inline-flex items-center gap-3 bg-[#D8EF7A] px-5 py-3.5 font-sans text-[15px] font-medium text-black transition-colors hover:bg-[#CBE35F] md:mt-12"
            >
              Start a conversation <span aria-hidden>↗</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
