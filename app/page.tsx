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

const experience = [
  "Fresenius Medical Care",
  "UnitedHealth Group",
  "Department of Defense",
  "Kaiser Permanente",
] as const;

const approachSteps = [
  {
    title: "Find the right problem.",
    body: "Work with clinicians to understand the decisions, constraints, and risks behind a workflow.",
  },
  {
    title: "Define the system.",
    body: "Connect research, information architecture, and interaction design into a coherent product.",
  },
  {
    title: "Make it work in practice.",
    body: "Test the critical moments and partner with engineering to bring the design into use.",
  },
] as const;

const moreWork = [
  {
    org: "Ascension · Dell Children’s Health Plan",
    title: "Responsive care access",
    body: "A responsive member portal serving 40,000+ members.",
  },
  {
    org: "Department of Defense",
    title: "Problem list reconciliation",
    body: "EHR usability research, co-designing problem list reconciliation with physicians.",
  },
  {
    org: "Picwell",
    title: "Medicare Part D plan selection",
    body: "Helping members compare and choose Medicare Part D plans.",
  },
] as const;

function FeaturedProject({
  id,
  index,
  org,
  role,
  title,
  video,
  children,
}: {
  id: string;
  index: string;
  org: string;
  role: string;
  title: string;
  video: ReactNode;
  children: ReactNode;
}) {
  return (
    <article id={id} aria-labelledby={`${id}-title`} className="scroll-mt-8 border-t border-black/10 pt-6 md:pt-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className={eyebrowClass}>
          {index} / {org}
        </p>
        <p className="font-sans text-[13px] text-black/55">{role}</p>
      </div>
      <h3 id={`${id}-title`} className={`${sectionHeadingClass} mt-8 md:mt-10`}>
        {title}
      </h3>
      <div className="mt-8 bg-white p-4 sm:p-8 md:mt-10 md:p-12">{video}</div>
      <div className="mt-8 grid grid-cols-1 gap-10 md:mt-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
        {children}
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <main id="main-content" className="min-h-screen bg-[#F4F2EE] pb-24 md:pb-32">
        <section aria-labelledby="hero-title" className={`${shellClass} pt-16 md:pt-24`}>
          <div className={innerClass}>
            <p className={eyebrowClass}>Independent design lead · Boston</p>
            <h1
              id="hero-title"
              className="mt-6 font-sans text-[clamp(3rem,7.5vw,6.25rem)] font-normal leading-[0.98] tracking-[-0.045em] text-black md:mt-8"
            >
              Complex healthcare.
              <br />
              <em className="italic">Clear direction.</em>
            </h1>
            <div className="mt-10 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
              <p className="max-w-[34rem] font-sans text-[17px] leading-[1.55] text-black/60 md:text-[18px]">
                <span className="text-black">
                  I lead healthcare product design from clinical insight to implementation.
                </span>{" "}
                I make complex workflows clear, usable, and ready for the people who depend on them.
              </p>
              <a
                href="#work"
                className="font-sans text-[14px] text-black/70 transition-colors hover:text-black"
              >
                See the work in motion <span aria-hidden>↓</span>
              </a>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-black/10 py-6 md:mt-20 md:grid-cols-5 md:items-center">
              <p className="col-span-2 font-sans text-[13px] leading-[1.35] text-black/55 md:col-span-1 md:max-w-[9rem]">
                Experience across healthcare
              </p>
              <ul className="contents">
                {experience.map((org) => (
                  <li key={org} className="font-sans text-[15px] font-medium text-black">
                    {org}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="work" aria-labelledby="work-title" className={`${shellClass} scroll-mt-8 mt-20 md:mt-28`}>
          <div className={innerClass}>
            <div className="flex flex-col gap-2 pb-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h2 id="work-title" className="font-sans text-[15px] font-semibold text-black">
                Selected impact
              </h2>
              <p className="font-sans text-[14px] text-black/55">
                Two products. From defining the problem to delivering the details.
              </p>
            </div>

            <div className="flex flex-col gap-20 md:gap-28">
              <FeaturedProject
                id="frx"
                index="01"
                org="Fresenius Medical Care"
                role="UX Design Lead · Launched enterprise-wide"
                title="Giving clinicians their time back."
                video={
                  <HoverControlsVideo
                    src="/images/frx/fresenius.mp4"
                    label="In-clinic digital refill workflow in CareTeamHub"
                    className="block h-auto w-full"
                    style={{ clipPath: "inset(0 0 0 1px)" }}
                  />
                }
              >
                <p className={`${bodyClass} max-w-[38rem]`}>
                  I led research and design for an in-chart refill workflow, replacing paper, fax, and
                  phone follow-ups. I mapped the system with clinic staff, refined the critical decisions
                  through testing, and partnered with engineering through launch.
                </p>
                <dl className="flex gap-10 md:gap-12">
                  <div className="flex flex-col-reverse gap-2">
                    <dt className="font-sans text-[13px] text-black/55">Faster refill completion</dt>
                    <dd className="font-sans text-[clamp(2rem,3.5vw,2.75rem)] leading-none tracking-[-0.03em] text-black">
                      70%
                    </dd>
                  </div>
                  <div className="flex flex-col-reverse gap-2">
                    <dt className="font-sans text-[13px] text-black/55">Clinics reached</dt>
                    <dd className="font-sans text-[clamp(2rem,3.5vw,2.75rem)] leading-none tracking-[-0.03em] text-black">
                      2,800+
                    </dd>
                  </div>
                </dl>
              </FeaturedProject>

              <FeaturedProject
                id="vehr"
                index="02"
                org="VEHR Technologies"
                role="Founding Product Design Lead · In development"
                title="Making the patient story visible."
                video={
                  <HoverControlsVideo
                    src="/videos/vehr/prototype.mp4"
                    label="VEHR clinical sensemaking interface prototype"
                    className="block h-auto w-full"
                  />
                }
              >
                <p className={`${bodyClass} max-w-[38rem]`}>
                  As the first designer, I partnered with a physician founder to define a new approach to
                  chart review. I translated clinical mental models into a shared timeline, aligned data
                  views, and a scalable UI system now being implemented by engineering.
                </p>
                <div className="max-w-[20rem]">
                  <p className={eyebrowClass}>The design decision</p>
                  <p className="mt-4 font-sans text-[16px] leading-[1.5] text-black">
                    Organize the record around the patient’s history, so clinicians can read related
                    information together.
                  </p>
                </div>
              </FeaturedProject>
            </div>

            <div id="more-work" className="scroll-mt-8 mt-20 md:mt-28">
              <h3 className={eyebrowClass}>More work</h3>
              <ul className="mt-6">
                {moreWork.map((item) => (
                  <li
                    key={item.title}
                    className="grid grid-cols-1 gap-2 border-t border-black/10 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)] md:gap-8"
                  >
                    <p className="font-sans text-[13px] text-black/55">{item.org}</p>
                    <p className="font-sans text-[16px] font-medium text-black">{item.title}</p>
                    <p className="font-sans text-[15px] leading-[1.5] text-black/70">{item.body}</p>
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
            <div className={innerClass}>
              <p className="font-sans text-[12px] uppercase leading-none tracking-[0.14em] text-white/55">
                What I bring
              </p>
              <h2
                id="approach-title"
                className="mt-8 max-w-[44rem] font-sans text-[clamp(1.75rem,3.4vw,2.75rem)] font-normal leading-[1.15] tracking-[-0.03em]"
              >
                I turn complex clinical problems into a clear product direction—and carry it through the
                details.
              </h2>
              <ul className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
                {approachSteps.map((step) => (
                  <li key={step.title} className="border-t border-white/20 pt-6">
                    <h3 className="font-sans text-[16px] font-medium">{step.title}</h3>
                    <p className="mt-3 font-sans text-[15px] leading-[1.55] text-white/65">{step.body}</p>
                  </li>
                ))}
              </ul>
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
              clinicians—and the friction in their tools—shaped the work I chose to do.
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
