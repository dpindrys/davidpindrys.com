import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import LogoStrip from "./components/LogoStrip";
import { sectionHeadingClass } from "./components/sectionHeading";
import ProjectSection from "./components/ProjectSection";

const vehrProject = {
  projectLabel: "VEHR Technologies",
  projectLogo: "/images/VEHR-project-logo.png",
  projectDate: "2024",
  title: "Clinical Sensemaking",
  descriptor: "Visualizing longitudinal patient health information",
  heroImage: "/images/vehr-hero.png",
  heroImageAlt: "VEHR Technologies, patient timeline interface on iPad",
  featureImages: [],
  caseStudyHighlights: {
    frames: [
      {
        id: "problem",
        title: "Problem",
        summary:
          "Current EHRs often force clinicians to piece together fragmented information, scan dense lists without clear signal, and mentally reconstruct the patient story across disconnected views.",
        images: [
          {
            src: "/images/vehr/problem1.png",
            modalPrimarySrc: "/images/vehr/problem1a.png",
            alt: "Fragmented, uncoupled data in clinical workflows",
            caption: "Source: Epic Systems interface screenshot",
            thumbnailTitle: "Fragmented, uncoupled data",
            modalTitle: "Fragmented, uncoupled data",
            modalBody:
              "Clinicians often have to piece together patient information across disconnected screens, forcing them to reconstruct the patient story manually.",
          },
          {
            src: "/images/vehr/problem2.png",
            modalPrimarySrc: "/images/vehr/problem2a.png",
            alt: "Overload without insight",
            caption: "Source: Epic Systems interface screenshot",
            thumbnailTitle: "Overload, without insight",
            modalTitle: "Overload, without insight",
            modalBody:
              "Dense lists and source-based views expose a great deal of data, but make patterns, priorities, and meaningful change harder to see.",
          },
          {
            src: "/images/vehr/problem3.png",
            modalPrimarySrc: "/images/vehr/problem3a.png",
            alt: "Mental model mismatch",
            caption: "Source: Epic Systems interface screenshot",
            thumbnailTitle: "Mental model mismatch",
            modalTitle: "Mental model mismatch",
            modalBody:
              "Traditional EHR structures reflect data sources more than clinical reasoning, creating friction when clinicians are trying to understand problems over time.",
          },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        summary:
          "The concept replaces fragmented, source-based chart review with a unified longitudinal view organized around problems, change over time, and patient context.",
        images: [
          {
            src: "/images/vehr/research1.png",
            alt: "Problem-oriented summary view",
            thumbnailTitle: "Problem-oriented summary",
            modalTitle: "Problem-oriented summary",
            modalBody:
              "Organizes the record around active conditions and key changes instead of forcing clinicians to gather signal across separate tabs.",
          },
          {
            src: "/images/vehr/research2.png",
            alt: "Longitudinal timeline of clinical data",
            thumbnailTitle: "Longitudinal timeline",
            modalTitle: "Longitudinal timeline",
            modalBody:
              "Encounters, vitals, diagnoses, and patient-reported data align across time, making relationships and change easier to interpret.",
          },
          {
            src: "/images/vehr/research3.png",
            alt: "Patient-reported outcome detail",
            thumbnailTitle: "Outcome detail",
            modalTitle: "Patient-reported outcome detail",
            modalBody:
              "Interval-based summaries make patient-reported outcomes easier to scan while preserving severity, trend, and underlying observations.",
          },
        ],
      },
      {
        id: "whyItMatters",
        title: "Why it matters",
        summary:
          "When the record is organized around problems and time, patterns become easier to see, chart review becomes less fragmented, and patient-reported signals become more usable in day-to-day decisions.",
        images: [
          {
            src: "/images/vehr/patterns.png",
            alt: "Patterns and signal across the chart",
            thumbnailTitle: "Clearer patterns",
            modalTitle: "A clearer picture of patient change",
            modalBody:
              "Acute-care visits, elevated vitals, higher symptom burden, and worse lab values cluster in one period, then improve across follow-up. The timeline makes that change visible in one place instead of forcing clinicians to reconstruct it across separate screens.",
          },
          {
            src: "/images/vehr/treatment.png",
            alt: "Treatment context in the longitudinal timeline",
            thumbnailTitle: "Treatment context, in place",
            modalTitle: "Treatment context, in place",
            modalBody:
              "Medication status is visible in the timeline, while in-context detail clarifies dose state and timing when needed. That helps clinicians interpret treatment without leaving the longitudinal view.",
          },
          {
            src: "/images/vehr/voice.png",
            alt: "Patient-reported symptoms in clinical context",
            thumbnailTitle: "Patient voice in clinical context",
            modalTitle: "Patient voice in clinical context",
            modalBody:
              "Patient-reported symptoms appear in context, with summaries that make severity, trend, and supporting observations easier to interpret over time. That helps patient voice inform the clinical picture instead of sitting in a separate silo.",
          },
        ],
      },
    ],
  },
  meta: [
    { label: "Role", value: "Product Design Lead" },
    { label: "Primary Users", value: "Clinicians & care teams" },
    { label: "Focus", value: "Patterns, change, and context" },
  ],
  summaryBlock: {
    label: "SUMMARY",
    body: "I collaborated with a practicing physician to rethink the cognitive burden of conventional EHRs. The concept replaces tabbed, source-oriented records with a problem-oriented timeline that helps clinicians review charts more efficiently and understand the patient more quickly.",
    prototypeLink: {
      href: "https://visual-ehr.vercel.app/",
      label: "Explore the prototype",
    },
  },
  testimonial: {
    quote:
      '"As a first-time founder, David\'s guidance was crucial. His work greatly advanced our team\'s quality and timeline."',
    name: "Cole Marolf MD",
    title: "Practicing clinician & Founder, VEHR Technologies",
    avatarSrc: "/images/cole.png",
  },
};

const freseniusProject = {
  projectLabel: "Fresenius Medical Care",
  projectLogo: "/images/fresenius-project-logo.png",
  projectDate: "2022-2023",
  title: "Modernizing In-clinic Refills",
  descriptor:
    "Digitizing In-clinic Refills for 2,800+ clinics and 43,000+ patients",
  heroImage: "/images/fresenius-hero.png",
  heroImageAlt: "Fresenius Medical Care, in-clinic refill interface on iPad",
  featureImages: [],
  meta: [
    { label: "Role", value: "Senior UX Designer" },
    { label: "Primary Users", value: "Nurses and dietitians" },
    { label: "Focus", value: "Safety, accuracy, and throughput" },
  ],
  summaryBlock: {
    label: "SUMMARY",
    body:
      "Clinic workflows relied on manual, scattered intake and review steps that slowed staff and increased risk. I led research and design for a digital in-clinic refill workflow that reduced cognitive load, streamlined handoffs, and improved patient oversight. Staff reported roughly 70% faster refills across 2,800+ clinics supporting 43,000+ patients.",
  },
  caseStudyHighlights: {
    frames: [
      {
        id: "challenge",
        title: "Challenge",
        summary:
          "Digitizing refill work meant translating a manual, coordination-heavy process into a digital workflow without losing the context nurses needed to act safely and confidently.",
        images: [
          {
            src: "/images/frx/raf.png",
            modalPrimarySrc: "/images/frx/raf.jpg",
            alt: "Reliance on RAF forms in the refill workflow",
            thumbnailTitle: "Reliance on RAF forms",
            modalTitle: "Reliance on RAF forms",
            modalBody:
              "Critical refill details were carried through paper RAF forms and supporting artifacts, creating delays, increasing manual effort, and introducing opportunities for error.",
          },
          {
            src: "/images/frx/objects.png",
            modalPrimarySrc: "/images/frx/objects.jpg",
            alt: "Many moving objects in the refill workflow",
            thumbnailTitle: "Many moving objects",
            modalTitle: "Many moving objects",
            modalBody:
              "Refill work involved multiple objects, dependencies, and decision points, from patient and medication details to refill status, addresses, and supporting forms, making the workflow hard to track and coordinate.",
          },
          {
            src: "/images/frx/context.png",
            modalPrimarySrc: "/images/frx/context.jpg",
            alt: "Context without overload",
            thumbnailTitle: "Context without overload",
            modalTitle: "Context without overload",
            modalBody:
              "The first digital refill workflow had to provide enough information for confident next-step decisions without overwhelming staff. The challenge was preserving essential context while deciding what to emphasize, what to defer, and how to reduce clutter without losing trust.",
          },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        summary:
          "The redesigned refill workflow brought the core objects, steps, and decision points into a clearer shared structure that was easier for staff to follow and support.",
        images: [
          {
            src: "/images/frx/structuring.png",
            modalPrimarySrc: "/images/frx/structuring.png",
            alt: "Structuring the objects, object grid and wireframe composite",
            thumbnailTitle: "Structuring the objects",
            modalTitle: "Structuring the objects",
            modalBody:
              "We mapped the core objects involved in refill work, clarified how they related to one another, and used that model to shape a clearer, more buildable digital workflow.",
            modalVideoSrc: "/images/frx/fresenius-objectwireframe.mp4",
          },
          {
            src: "/images/fresenius-hero.png",
            alt: "Digitizing the workflow in CareTeamHub",
            thumbnailTitle: "Digitizing the workflow",
            modalTitle: "Digitizing the workflow",
            modalBody:
              "The refill process was brought into CareTeamHub, where nurses already worked daily, replacing fragmented manual coordination with a more structured in-product workflow.",
          },
          {
            placeholder: true,
            alt: "Progressive disclosure of key details",
            thumbnailTitle: "Progressive disclosure of key details",
            modalTitle: "Progressive disclosure of key details",
            modalBody:
              "The workflow kept essential information in one view so nurses could stay oriented, while revealing additional detail as needed. This reduced clutter without hiding the context required to make the next decision.",
          },
        ],
      },
      {
        id: "whyItMatters",
        title: "Why it matters",
        summary:
          "The redesign reduced ambiguity in a high-friction clinical workflow, helping staff follow refill work more confidently and making the process better suited for scale.",
        images: [
          {
            placeholder: true,
            alt: "Less manual coordination",
            thumbnailTitle: "Less manual coordination",
            modalTitle: "Less manual coordination",
            modalBody:
              "Bringing refill work into one structured workflow reduced dependence on paper forms, scattered artifacts, and phone-based coordination.",
          },
          {
            placeholder: true,
            alt: "Clearer next steps",
            thumbnailTitle: "Clearer next steps",
            modalTitle: "Clearer next steps",
            modalBody:
              "By surfacing only the information needed for the next decision, the workflow made refill progress easier to follow and reduced uncertainty about what needed to happen next.",
          },
          {
            placeholder: true,
            alt: "Better support for scale",
            thumbnailTitle: "Better support for scale",
            modalTitle: "Better support for scale",
            modalBody:
              "A clearer digital structure made the refill process easier to support across thousands of patients and many clinics, reducing friction in a workflow that had previously depended on manual workarounds.",
          },
        ],
      },
    ],
  },
  testimonial: {
    quote:
      '"David\'s remarkable initiative in building our UI/UX architecture from scratch has been nothing short of impressive."',
    name: "Larissa Doronina",
    title: "Principal UX Architect, Fresenius Medical Care",
    avatarSrc: "/images/larissa.png",
  },
};

/* Vinyl Health, commented out for now
const vinylHealthProject = {
  projectLabel: "Vinyl Health",
  projectLogo: "/images/vinylhealth-project-logo.png",
  title: "Care-centered Product Design",
  descriptor: "Clinician dashboard and AI summaries for complex-care patients",
  heroImage: "/images/vinylhealth-hero.png",
  heroImageAlt: "Vinyl Health project hero",
  featureImages: [
    { src: "", alt: "", label: "Feature 1" },
    { src: "", alt: "", label: "Feature 2" },
    { src: "", alt: "", label: "Feature 3" },
  ],
  meta: [
    { label: "Role", value: "Lead Product Designer" },
    { label: "Primary Users", value: "Clinicians caring for patients with complex needs" },
    { label: "Focus", value: "Trust, orientation, and continuity" },
  ],
  blurbs: {
    problem:
      "A patient's personal details, clinical or self-reported baseline, and follow-up plans are often fragmented across systems, making it harder for clinicians and care teams to quickly orient and trust what they are seeing.",
    solution:
      "I designed a clinician-facing dashboard that brings a patient's story, goals, and needs into one clearer view, with AI summaries grounded in source encounter data.",
    whyItMatters:
      "This helps teams stay aligned, understand what matters faster, and reduce repeated effort across follow-up and coordination.",
  },
  testimonial: {
    quote: '"Placeholder testimonial quote."',
    name: "Name",
    title: "Title, Vinyl Health",
  },
};
*/

const ascensionProject = {
  projectLabel: "Dell Children's Health Plan",
  projectLogo: "/images/ascension-project-logo.png",
  projectDate: "2023-2024",
  title: "Responsive Care Access",
  descriptor: "Responsive portal for 40,000+ members",
  heroImage: "/images/dellchildrens-hero.png",
  heroImageAlt: "Dell Children's Health Plan, responsive member portal",
  featureImages: [],
  meta: [
    { label: "Role", value: "Senior Product Designer" },
    { label: "Primary Users", value: "Patients & caregivers" },
    { label: "Focus", value: "Access, usability, and compliance" },
  ],
  summaryBlock: {
    label: "SUMMARY",
    body:
      "Dell Children's Patient Portal was outdated, lacked meaningful functionality and a personal touch, and was out of compliance with Medicaid requirements. I designed and shipped a new responsive portal experience with expanded functionality, working with a lean team to modernize key member workflows and improve usability. The portal met Medicaid guidelines and continued serving 40,000+ members.",
  },
  caseStudyHighlights: {
    frames: [
      {
        id: "problem",
        title: "Problem",
        summary:
          "Dell Children's Patient Portal was outdated, lacked meaningful functionality and a personal touch, and was out of compliance with Medicaid requirements.",
        images: [
          {
            placeholder: true,
            alt: "Legacy portal experience",
            thumbnailTitle: "Legacy portal experience",
            modalTitle: "Legacy portal experience",
            modalBody:
              "Placeholder, replace with a screen or artifact that shows the prior portal state and limitations.",
          },
          {
            placeholder: true,
            alt: "Compliance and Medicaid requirements",
            thumbnailTitle: "Compliance gaps",
            modalTitle: "Compliance gaps",
            modalBody:
              "Placeholder, replace with evidence of where the experience fell short of Medicaid expectations.",
          },
          {
            placeholder: true,
            alt: "Member-facing functionality",
            thumbnailTitle: "Limited member tools",
            modalTitle: "Limited member tools",
            modalBody:
              "Placeholder, replace with a view that highlights missing or weak member workflows before the redesign.",
          },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        summary:
          "I designed and shipped a new responsive portal experience with expanded functionality, working with a lean team to modernize key member workflows and improve usability.",
        images: [
          {
            placeholder: true,
            alt: "Responsive portal experience",
            thumbnailTitle: "Responsive portal",
            modalTitle: "Responsive portal",
            modalBody:
              "Placeholder, replace with a representative responsive layout across breakpoints.",
          },
          {
            placeholder: true,
            alt: "Expanded member workflows",
            thumbnailTitle: "Expanded workflows",
            modalTitle: "Expanded workflows",
            modalBody:
              "Placeholder, replace with flows such as care team designation, ID card, or prior auth.",
          },
          {
            placeholder: true,
            alt: "Lean team delivery",
            thumbnailTitle: "Shipping with a lean team",
            modalTitle: "Shipping with a lean team",
            modalBody:
              "Placeholder, replace with a timeline, milestone, or collaboration artifact if helpful.",
          },
        ],
      },
      {
        id: "whyItMatters",
        title: "Why it matters",
        summary:
          "The portal met Medicaid guidelines and continued serving 40,000+ members.",
        images: [
          {
            placeholder: true,
            alt: "Medicaid guidelines met",
            thumbnailTitle: "Guidelines met",
            modalTitle: "Guidelines met",
            modalBody:
              "Placeholder, replace with a compliance or outcomes note tied to Medicaid requirements.",
          },
          {
            placeholder: true,
            alt: "Members served",
            thumbnailTitle: "40,000+ members",
            modalTitle: "40,000+ members",
            modalBody:
              "Placeholder, replace with scale or reach context for the live portal.",
          },
          {
            placeholder: true,
            alt: "Sustained service",
            thumbnailTitle: "Sustained service",
            modalTitle: "Sustained service",
            modalBody:
              "Placeholder, replace with continuity or support story after launch.",
          },
        ],
      },
    ],
  },
  testimonial: {
    quote:
      '"David designed previously unavailable Ascension portal workflows (care team/PCP designation, ID card requests, prior auth) and partnered effectively across product, engineering, and data to keep delivery moving."',
    name: "Steven Long",
    title: "Product Manager, Ascension Studio",
    avatarSrc: "/images/steven.png",
  },
};

export default function Home() {
  return (
    <>
      <main className="min-h-screen overflow-x-visible bg-[#F0F0F0]">
        <div className="flex justify-center w-full overflow-x-visible px-8 lg:px-16">
          <div className="flex flex-col items-stretch w-full max-w-[1200px] pt-12 pb-32 overflow-x-visible">

            <Header />
            <div className="mt-28 md:mt-36 lg:mt-44">
              <Hero />
            </div>
            <div className="mt-16 md:mt-20 lg:mt-24 w-screen max-w-[100vw] ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] overflow-x-visible md:ml-0 md:mr-0 md:w-full md:max-w-none">
              <LogoStrip />
            </div>
            <h2
              className={`${sectionHeadingClass} mt-16 text-left md:mt-20 lg:mt-24 mb-2 md:mb-5 lg:mb-10`}
            >
              Selected work
            </h2>
            <ProjectSection
              {...vehrProject}
              hideMetaTopBorder
              metaSectionStackGap="gap-16"
            />
            <div className="mt-56 md:mt-72 lg:mt-80">
              <ProjectSection
                {...freseniusProject}
                hideMetaTopBorder
                metaSectionStackGap="gap-16"
              />
            </div>
            {/* <ProjectSection {...vinylHealthProject} /> */}
            <div className="mt-56 md:mt-72 lg:mt-80">
              <ProjectSection
                {...ascensionProject}
                hideMetaTopBorder
                metaSectionStackGap="gap-16"
              />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
