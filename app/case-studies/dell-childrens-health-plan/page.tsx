import type { Metadata } from "next";

import CaseStudyNextProjectButton from "../../components/CaseStudyNextProjectButton";
import Footer from "../../components/Footer";
import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import { heroBandClass } from "../../lib/heroBand";
import {
  columnClass,
  filledCardClass,
  metaTextClass,
  outlineCardClass,
  sectionGapClass,
  shellClass,
  sideLeadClass,
  challengeTagClass,
  tagClass,
} from "../../lib/pageStyles";

const caseBodyClass = "font-sans text-[16px] leading-[1.6] text-black md:text-[20px]";
const caseNoteClass = "font-sans text-[16px] leading-[1.6] text-black md:text-[17px]";
const storyEyebrowClass = `${challengeTagClass} mb-4 inline-block`;
const storyTitleClass = "w-full text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.04em]";
const storySubtitleClass = "mt-4 max-w-[36rem] font-sans text-[16px] leading-[1.6] text-black md:text-[20px]";
const topicHeadingClass =
  "font-sans text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.15] tracking-[-0.03em] text-black";
const storyBandClass = `${heroBandClass} py-14 md:py-20`;
import DchpCareTeam from "./DchpCareTeam";
import DchpMemberStory from "./DchpMemberStory";
import ProviderChallengeAccordion from "./ProviderChallengeAccordion";

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

const contributions = [
  "Led product design for the portal redesign, from information architecture through implementation.",
  "Designed self-service workflows for members, parents, and caregivers managing care.",
  "Audited accessibility, specified remediations, and created a developer conformance checklist.",
  "Partnered with product, engineering, and data teams to translate requirements into usable experiences.",
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

const providerChallengeTitle = "Finding a provider meant starting over.";
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

const accessibilityPoints = [
  "Reviewed the portal against WCAG AA requirements.",
  "Documented remediations and provided a conformance checklist for developers.",
  "Carried accessibility requirements into implementation alongside the new workflows.",
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

        <section aria-labelledby="role-title" className={`${shellClass} ${sectionGapClass}`}>
          <div className={columnClass}>
            <h2 id="role-title" className={storyTitleClass}>
              Product Design Lead
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {contributions.map((item) => (
                <li key={item} className={`rounded-[20px] border border-black/10 bg-transparent p-6 md:p-8 ${caseNoteClass}`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="home-story-title" className={`${storyBandClass} ${sectionGapClass}`}>
          <div className={shellClass}>
            <div className={columnClass}>
              <h2 id="home-story-title" className={topicHeadingClass}>
                Home · Finding the right task
              </h2>

              <div className="mt-10 md:mt-12">
                <p className={storyEyebrowClass}>Challenge</p>
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                  <div className="min-w-0 w-full flex-1">
                    <h3 id="home-challenge-title" className={storyTitleClass}>
                      Everyday tasks were hard to find.
                    </h3>
                    <p className={storySubtitleClass}>
                      Families needed a clearer starting point for common tasks and a way to access the right
                      information for each member.
                    </p>
                    <ProviderChallengeAccordion points={homeChallengePoints} />
                  </div>
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
              </div>

              <div className="mt-12 md:mt-16">
                <DchpMemberStory />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="engineering-title" className={`${shellClass} ${sectionGapClass}`}>
          <div className={columnClass}>
            <h2 id="engineering-title" className={sideLeadClass}>
              Working with engineering
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {accessibilityPoints.map((point) => (
                <li key={point} className={`${filledCardClass} ${caseBodyClass}`}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="care-story-title" className={`${storyBandClass} ${sectionGapClass}`}>
          <div className={shellClass}>
            <div className={columnClass}>
              <h2 id="care-story-title" className={topicHeadingClass}>
                Care team · Finding a new PCP
              </h2>

              <div className="mt-10 md:mt-12">
                <p className={storyEyebrowClass}>Challenge</p>
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                  <div className="min-w-0 w-full flex-1">
                    <h3 id="provider-challenge-title" className={storyTitleClass}>
                      {providerChallengeTitle}
                    </h3>
                    <p className={storySubtitleClass}>{providerChallengeSummary}</p>
                    <ProviderChallengeAccordion points={providerChallengePoints} />
                  </div>
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
