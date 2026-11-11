import type { Metadata } from "next";

import CaseStudyNextProjectButton from "../../components/CaseStudyNextProjectButton";
import Footer from "../../components/Footer";
import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import { heroBandClass } from "../../lib/heroBand";
import {
  columnClass,
  metaTextClass,
  outlineCardClass,
  sectionGapClass,
  shellClass,
  sideLeadClass,
  challengeTagClass,
  tagClass,
} from "../../lib/pageStyles";

const caseBodyClass = "font-sans text-[16px] leading-[1.6] text-black md:text-[20px]";
const storyEyebrowClass = `${challengeTagClass} mb-4 inline-block`;
const storyTitleClass = "w-full text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.04em]";
const storyBandClass = `${heroBandClass} py-14 md:py-20`;
import DchpCareTeam from "./DchpCareTeam";
import DchpMemberStory from "./DchpMemberStory";
import ProviderChallengeAccordion from "./ProviderChallengeAccordion";
import ResearchFindings from "./ResearchFindings";

const title = "Making it easier for families to manage their care";
const summary =
  "Redesigning Dell Children’s Health Plan’s member portal with accessible, responsive tools for 40,000+ Medicaid members.";

export const metadata: Metadata = {
  title: "Dell Children’s Health Plan",
  description: summary,
  openGraph: { title: `Dell Children’s Health Plan | David Pindrys`, description: summary },
};

const focusAreas = ["Member Self-Service", "Accessibility", "End-to-End Design"] as const;

const facts = [
  { label: "Client", value: "Ascension" },
  { label: "Role", value: "Product Design Lead" },
  { label: "Platform", value: "Responsive web portal" },
  { label: "Timeline", value: "4 months" },
] as const;

const researchTitle = "Understanding how members find and manage care.";
const researchIntro =
  "Reviewed the existing portal and provider search, evaluated usability, and organized a card sort with representative users to inform the navigation and task structure.";
const researchFindings = [
  {
    title: "How users organized information",
    body: "Organized a card sort with representative users to understand how they grouped information and everyday care tasks.",
  },
  {
    title: "Where the experience created friction",
    body: "Conducted a heuristic evaluation of the existing portal, examining navigation, information hierarchy, and support for common tasks.",
  },
  {
    title: "How the experiences connected",
    body: "Reviewed the member portal and separate provider search to understand where members moved between systems, repeated information, or lost context.",
  },
] as const;

const homeChallengePoints = [
  {
    title: "Important tasks were hard to find",
    body: "The existing homepage made key links difficult to scan.",
  },
  {
    title: "Multiple members, one account",
    body: "Parents and caregivers needed to move between family members without losing context.",
  },
] as const;

const providerChallengeSummary =
  "A separate search asked members to enter information the portal already knew, with a phone call still needed to schedule care.";
const providerChallengePoints = [
  {
    title: "A separate experience",
    body: "Provider search took members outside the portal to find care.",
  },
  {
    title: "Information entered again",
    body: "The search didn’t carry over the member’s location, language, or need for a primary care provider.",
  },
  {
    title: "More setup before results",
    body: "Members had to specify their search criteria before seeing relevant providers.",
  },
  {
    title: "Another step to get care",
    body: "Finding a provider didn’t complete the task. Scheduling still required a phone call.",
  },
] as const;

const engineeringTitle = "Turning existing capabilities into a simpler member experience.";
const engineeringIntro =
  "Worked with engineering to understand the available API data and how the provider search URL was constructed. Identified query parameters that could carry member context into the search, reducing the information members had to enter again.";
const engineeringFindings = [
  {
    title: "Understand the available data",
    body: "Reviewed what the APIs returned and which member details were available to support provider search.",
  },
  {
    title: "Trace how search worked",
    body: "Inspected the search URL and its query parameters to understand how location, language, and provider type shaped the results.",
  },
  {
    title: "Connect the findings to the experience",
    body: "Designed a search that used known member information to show relevant providers, with controls to adjust preferences.",
  },
] as const;

const outcomes = [
  "Launched the redesigned portal in four months for 40,000+ members.",
  "Expanded self-service access to care teams, ID cards, claims, prior authorizations, and support.",
  "Made core tasks available through a responsive experience for members and caregivers.",
] as const;

export default function DellChildrensCaseStudyPage() {
  return (
    <>
      <main id="main-content" className="min-h-screen bg-[#F4F2EE]">
        <section aria-labelledby="case-title" className={`${shellClass} ${heroBandClass} pb-2 pt-2 md:pb-[59px] md:pt-4`}>
          <div className={columnClass}>
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_min(38%,400px)] lg:gap-x-12">
              <h1
                id="case-title"
                className="max-w-[18ch] text-balance font-sans text-[clamp(2.5rem,5.6vw,4.75rem)] font-normal leading-[1] tracking-[-0.045em] text-black lg:col-start-1 lg:row-start-1"
              >
                {title}
              </h1>
              <img
                src="/images/dellchildrens/fatherchild.png"
                alt="A father holding his baby while looking at a phone."
                width={701}
                height={800}
                className="block h-auto w-full rounded-[12px] lg:col-start-2 lg:row-span-2 lg:row-start-1"
              />
              <div className="min-w-0 lg:col-start-1 lg:row-start-2">
                <p className={`${caseBodyClass} max-w-[40rem]`}>{summary}</p>
                <ul aria-label="Focus areas" className="mt-5 flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <li key={area} className={tagClass}>
                      {area}
                    </li>
                  ))}
                </ul>
                <dl className="mt-4 flex flex-wrap gap-6">
                  {facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className={metaTextClass}>{fact.label}</dt>
                      <dd className="mt-3 font-sans text-[16px] leading-[1.4] text-black md:text-[17px]">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="research-title" className={`${shellClass} ${sectionGapClass}`}>
          <div className={columnClass}>
            <p className={storyEyebrowClass}>Research</p>
            <h2 id="research-title" className={storyTitleClass}>
              {researchTitle}
            </h2>
            <p className={`${caseBodyClass} mt-4 max-w-[42rem]`}>{researchIntro}</p>
            <ResearchFindings
              findings={researchFindings}
              image={{
                src: "/images/dellchildrens/cardsort.png",
                alt: "Card sort board grouping member tasks into family members, care and providers, and plan categories.",
              }}
            />
          </div>
        </section>

        <section aria-labelledby="home-story-title" className={`${storyBandClass} ${sectionGapClass}`}>
          <div className={shellClass}>
            <div className={columnClass}>
              <p className={storyEyebrowClass}>Challenge</p>
              <h2 id="home-story-title" className={storyTitleClass}>
                Home · Finding the right task
              </h2>
              <p className={`${caseBodyClass} mt-4 max-w-[42rem]`}>
                Families needed a clearer starting point for common tasks and a way to access the right information for
                each member.
              </p>
              <div className="mt-10 flex flex-col gap-8 md:mt-12 lg:flex-row lg:items-start lg:gap-12">
                <ProviderChallengeAccordion
                  points={homeChallengePoints}
                  className="min-w-0 w-full flex-1"
                />
                <ZoomableProblemImage
                  src="/images/dellchildrens/mothercomp.png"
                  alt="A mother at a laptop, holding a sleeping baby while a young child stands beside her."
                  width={700}
                  height={800}
                  shellClassName="w-full shrink-0 lg:w-[432px]"
                  imgClassName="block h-auto w-full rounded-[12px] border border-black/10"
                  dialogLabel="A parent managing care at home"
                />
              </div>

              <div className="mt-12 md:mt-16">
                <DchpMemberStory />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="engineering-title" className={`${shellClass} ${sectionGapClass}`}>
          <div className={columnClass}>
            <p className={storyEyebrowClass}>Engineering</p>
            <h2 id="engineering-title" className={storyTitleClass}>
              {engineeringTitle}
            </h2>
            <p className={`${caseBodyClass} mt-4 max-w-[42rem]`}>{engineeringIntro}</p>
            <ResearchFindings
              findings={engineeringFindings}
              image={{
                src: "/images/dellchildrens/engineering-artifacts-mint.png",
                alt: "Diagram showing known member ZIP code and language carried into provider search parameters to return relevant primary care results.",
              }}
            />
          </div>
        </section>

        <section aria-labelledby="care-story-title" className={`${storyBandClass} ${sectionGapClass}`}>
          <div className={shellClass}>
            <div className={columnClass}>
              <p className={storyEyebrowClass}>Challenge</p>
              <h2 id="care-story-title" className={storyTitleClass}>
                Care team · Finding a new PCP
              </h2>
              <p className={`${caseBodyClass} mt-4 max-w-[42rem]`}>{providerChallengeSummary}</p>
              <div className="mt-10 flex flex-col gap-8 md:mt-12 lg:flex-row lg:items-start lg:gap-12">
                <ProviderChallengeAccordion
                  points={providerChallengePoints}
                  className="min-w-0 w-full flex-1"
                />
                <ZoomableProblemImage
                  src="/images/dellchildrens/motherphone.png"
                  alt="A mother on the phone at a laptop, with her children beside her."
                  width={700}
                  height={800}
                  shellClassName="w-full shrink-0 lg:w-[432px]"
                  imgClassName="block h-auto w-full rounded-[12px] border border-black/10"
                  dialogLabel="Scheduling care by phone"
                />
              </div>

              <div className="mt-12 md:mt-16">
                <DchpCareTeam />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="outcome-title" className={`${shellClass} ${sectionGapClass} pb-20 md:pb-28`}>
          <div className={columnClass}>
            <h2 id="outcome-title" className={sideLeadClass}>
              The outcome
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
              {outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className={`${outlineCardClass} ${caseBodyClass}`}
                >
                  {outcome}
                </li>
              ))}
            </ul>
            <CaseStudyNextProjectButton currentPath="/case-studies/dell-childrens-health-plan" />
          </div>
        </section>
      </main>
      <Footer linkBase="/" />
    </>
  );
}
