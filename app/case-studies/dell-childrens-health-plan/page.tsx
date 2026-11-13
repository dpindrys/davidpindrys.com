import type { Metadata } from "next";
import CaseStudyNextProjectButton from "../../components/CaseStudyNextProjectButton";
import Footer from "../../components/Footer";
import { heroBandClass } from "../../lib/heroBand";
import {
  columnClass,
  metaTextClass,
  outlineCardClass,
  sectionGapClass,
  shellClass,
  sideLeadClass,
  eyebrowClass,
} from "../../lib/pageStyles";

const caseBodyClass = "font-sans text-[16px] leading-[1.6] text-black md:text-[20px]";
const storyEyebrowClass = `${eyebrowClass} mb-4`;
const storyTitleClass = "w-full text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.04em]";
const storyBandClass = "py-14 md:py-20";
import DchpStory, { type StoryExample, type StoryPanel } from "./DchpStory";

const title = "Helping families manage their care.";
const summary =
  "Redesigned the member portal to bring everyday tasks and each family member’s information into one place.";

export const metadata: Metadata = {
  title: "Dell Children’s Health Plan",
  description: summary,
  openGraph: { title: `Dell Children’s Health Plan | David Pindrys`, description: summary },
};

const facts = [
  { label: "Role", value: "Product Design Lead" },
  { label: "Client", value: "Ascension" },
  { label: "Platform", value: "Responsive web" },
  { label: "Timeline", value: "4 months" },
] as const;

const researchColumns = [
  {
    title: "Organizing around the family",
    body: "Reviewed the existing experience and organized a card sort with representative users to inform how shared tasks and member-specific information could be grouped.",
  },
  {
    title: "Building on existing capabilities",
    body: "Worked with engineering to inspect available member data and supported search parameters, identifying what could carry into the next task.",
  },
] as const;

const homePanels: readonly StoryPanel[] = [
  {
    label: "The need",
    body: (
      <>
        Help parents and caregivers <strong>find everyday tasks</strong> and manage information for{" "}
        <strong>multiple covered members</strong>.
      </>
    ),
  },
  {
    label: "The friction",
    body: (
      <>
        The existing homepage <strong>separated key links from member information</strong>, making families navigate
        between them to complete individual tasks.
      </>
    ),
  },
  {
    label: "The approach",
    body: (
      <>
        Bring <strong>shared shortcuts up front</strong> and group individual actions{" "}
        <strong>beneath each covered member</strong>.
      </>
    ),
  },
];

const homeExamples: readonly StoryExample[] = [
  {
    title: "Start with a task",
    caption: "Shared shortcuts provide direct access to care, coverage, and support.",
    src: "/images/dellchildrens/welcome2.png",
    width: 734,
    height: 1066,
    cardLeft: 32,
    cardWidth: 670,
    alt: "Member portal home screen: “Welcome, Gopi Khandavalli” above a Quick Links card with Your care team, Search for a new provider, Review plan coverage, and Get live support.",
  },
  {
    title: "Continue with a person",
    caption: "Member-specific actions open with that person already selected.",
    src: "/images/dellchildrens/covered-members.png",
    width: 710,
    height: 1302,
    cardLeft: 20,
    cardWidth: 670,
    cropHeight: 1066,
    alt: "Covered Members section listing four family members, with Madhavi Khandavalli expanded to show Care Team, ID Cards, and Members Handbook actions.",
  },
];

const careTeamPanels: readonly StoryPanel[] = [
  {
    label: "The need",
    body: (
      <>
        Help families find a <strong>new primary care provider</strong> for the <strong>right covered member</strong>.
      </>
    ),
  },
  {
    label: "The friction",
    body: (
      <>
        Provider search <strong>lived outside the portal</strong> and required users to{" "}
        <strong>enter information the portal already knew</strong>.
      </>
    ),
  },
  {
    label: "The approach",
    body: (
      <>
        <strong>Use available member information</strong> to open relevant results, with preferences that remain{" "}
        <strong>easy to adjust</strong>.
      </>
    ),
  },
];

const careTeamExamples: readonly StoryExample[] = [
  {
    title: "Start from the member’s care team",
    caption: "Browse nearby providers directly beneath the member’s name and current PCP.",
    src: "/images/dellchildrens/carestart.png",
    width: 734,
    height: 1140,
    cardLeft: 36,
    cardWidth: 662,
    alt: "Care Team screen for Madhavi Khandavalli showing her current primary care provider, Dr. Dan Nelson, above a “Need a new Primary Care Physician?” card with a Browse Nearby Providers button.",
  },
  {
    title: "Review results without starting over",
    caption:
      "Results use the member’s location, language preference, and required provider type. Users can adjust their ZIP code or language while reviewing providers.",
    src: "/images/dellchildrens/careteam2x.png",
    width: 734,
    height: 2422,
    cardLeft: 36,
    cardWidth: 662,
    cropHeight: 1140,
    alt: "Provider results beneath Madhavi Khandavalli’s current PCP: “Providers in the 78701” with a Choose New Area Code button, a Speaks Spanish filter, and the first matching provider.",
  },
];

const outcomes = [
  { label: "Delivery", body: "Launched the redesigned portal in four months." },
  { label: "Reach", body: "A responsive portal serving 40,000+ Medicaid members and the families managing their care." },
  {
    label: "Self-service",
    body: "Expanded access to care teams, ID cards, claims, prior authorizations, and support.",
  },
  {
    label: "Accessibility",
    body: "Reviewed the portal against WCAG AA and documented remediations with a developer conformance checklist.",
  },
] as const;

export default function DellChildrensCaseStudyPage() {
  return (
    <>
      <main id="main-content" className="min-h-screen bg-[#F4F2EE]">
        <section aria-labelledby="case-title" className={`${shellClass} ${heroBandClass} pb-8 pt-2 md:pb-[50px] md:pt-4`}>
          <div className={columnClass}>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:gap-x-14">
              <div className="min-w-0">
                <p className={eyebrowClass}>
                  Dell Children’s Health Plan
                </p>
                <h1
                  id="case-title"
                  className="mt-5 max-w-[10.5em] text-balance font-sans text-[clamp(2.5rem,5.6vw,4.75rem)] font-normal leading-[1.02] tracking-[-0.045em] text-black md:mt-7"
                >
                  {title}
                </h1>
                <p className={`${caseBodyClass} mt-5 max-w-[36rem] md:mt-7`}>{summary}</p>
                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-black/15 pt-6 sm:grid-cols-[repeat(4,auto)] sm:justify-between md:mt-10">
                  {facts.map((fact) => (
                    <div key={fact.label} className="min-w-0">
                      <dt className="font-sans text-[13px] leading-none text-black/80 md:text-[14px]">{fact.label}</dt>
                      <dd className="mt-2.5 font-sans text-[16px] font-semibold leading-[1.3] text-black md:text-[17px]">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="relative min-w-0">
                <img
                  src="/images/dellchildrens/fatherchild.png"
                  alt="A father holding his baby while looking at a phone."
                  width={701}
                  height={800}
                  className="block aspect-square w-full rounded-[14px] object-cover object-[50%_30%] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="research-title" className={`${shellClass} ${sectionGapClass}`}>
          <div className={columnClass}>
            <p className={storyEyebrowClass}>Research</p>
            <h2 id="research-title" className={storyTitleClass}>
              Understanding the people and the platform.
            </h2>
            <p className={`${caseBodyClass} mt-4 max-w-[42rem]`}>
              Reviewed how families managed care, how the existing portal organized tasks, and what its data and search
              capabilities could support.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-y-10 md:mt-12 md:grid-cols-2 md:gap-x-8 lg:gap-x-12">
              {researchColumns.map((column) => (
                <div key={column.title} className="min-w-0">
                  <h3 className="font-sans text-[18px] font-bold leading-[1.35] text-black md:text-[20px]">
                    {column.title}
                  </h3>
                  <p className={`${caseBodyClass} mt-2`}>{column.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="home-story-title" className={`${storyBandClass} ${sectionGapClass}`}>
          <div className={shellClass}>
            <div className={columnClass}>
              <DchpStory
                eyebrow="Design decisions"
                title="A clearer starting point for families."
                titleId="home-story-title"
                panels={homePanels}
                examples={homeExamples}
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="care-story-title" className="pb-14 md:pb-20">
          <div className={shellClass}>
            <div className={columnClass}>
              <DchpStory
                title="A simpler path to a new PCP."
                titleId="care-story-title"
                panels={careTeamPanels}
                examples={careTeamExamples}
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="outcome-title" className={`${shellClass} ${sectionGapClass} pb-20 md:pb-28`}>
          <div className={columnClass}>
            <h2 id="outcome-title" className={sideLeadClass}>
              The outcome
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {outcomes.map((outcome) => (
                <li key={outcome.label} className={`${outlineCardClass} ${caseBodyClass}`}>
                  <span className={`${metaTextClass} mb-3 block font-bold uppercase tracking-[0.08em]`}>
                    {outcome.label}
                  </span>
                  {outcome.body}
                </li>
              ))}
            </ul>
            <p className={`${caseBodyClass} mt-6 max-w-[42rem]`}>
              <strong className="font-bold">Remaining constraint:</strong> scheduling an appointment still required a phone
              call after choosing a PCP.
            </p>
            <CaseStudyNextProjectButton currentPath="/case-studies/dell-childrens-health-plan" />
          </div>
        </section>
      </main>
      <Footer linkBase="/" />
    </>
  );
}
