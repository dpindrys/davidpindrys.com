import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import LogoStrip from "./components/LogoStrip";
import { sectionHeadingClass } from "./components/sectionHeading";
import ProjectSection from "./components/ProjectSection";
const vinylProject = {
  projectLabel: "Vinyl Health",
  projectLogo: "/images/vinyl-logo.png",
  projectDate: "2025-2026",
  title: "Source-backed AI Summaries",
  descriptor:
    "Helping clinicians get quick context without losing sight of the underlying data for AI-first startup",
  heroImage: "/images/vinyl-hero.png",
  heroImageAlt: "Vinyl Health, source-backed AI summaries interface",
  featureImages: [],
  meta: [
    { label: "Role", value: "Product Design Lead" },
    { label: "Primary Users", value: "Clinicians and care teams" },
    { label: "Focus", value: "Trust, oversight, and patient needs" },
  ],
  summaryBlock: {
    label: "SUMMARY",
    body: "I led product design for a clinician-facing platform that surfaces AI-generated patient summaries grounded in source encounter data, helping care teams orient faster and trust what they see.",
    team: "Clinical SME, product lead, engineering lead, and myself",
    prototypeLink: {
      href: "https://vinylhealth.vercel.app/",
      label: "Open prototype",
    },
  },
  testimonial: {
    quote: (
      <div className="flex flex-col gap-1.5">
        <span className="font-sans font-normal text-[12px] uppercase tracking-[0.12em] text-gray-800">
          Contribution
        </span>
        <p className="font-sans font-normal text-[16px] leading-[1.5] text-black">
          Translated patient-reported and clinical data into a dashboard experience that balanced quick understanding with clinical trust.
        </p>
      </div>
    ),
  },
};

const vehrProject = {
  projectLabel: "VEHR Technologies",
  projectLogo: "/images/VEHR-project-logo.png",
  projectDate: "2024",
  title: "Clinical Sensemaking",
  descriptor:
    "A problem-oriented view of patient history over time for a clinician-led startup",
  heroImage: "/images/vehr-hero.png",
  heroImageAlt: "VEHR Technologies, patient timeline interface on iPad",
  featureImages: [],
  caseStudyHighlights: {
    modalPresentation: "composite-vehr" as const,
    modalBrandHeader: {
      projectTitle: "Clinical Sensemaking",
      company: "VEHR Technologies",
    },
    frames: [
      {
        id: "problem",
        title: "Problem",
        summary:
          "Most EHRs reflect how data is stored, not how clinicians think—and dense views can obscure what is changing and what needs attention.",
        images: [
          {
            src: "/images/vehr/problem3.png",
            modalPrimarySrc: "/images/vehr/problem3a.png",
            alt: "Mental model mismatch between EHR structure and clinical reasoning",
            thumbnailTitle: "Mental model mismatch",
            modalTitle: "Mental model mismatch",
            modalBody:
              "Most EHRs reflect how data is stored, not how clinicians think. Source-driven navigation creates friction when clinicians need to understand a patient in context.",
            modalImageSource:
              "Image source: Epic Systems interface screenshot.",
          },
          {
            src: "/images/vehr/problem2.png",
            modalPrimarySrc: "/images/vehr/problem2a.png",
            alt: "Dense data with weak clinical signal",
            caption: "Source: Epic Systems interface screenshot",
            thumbnailTitle: "Dense data, weak signal",
            modalTitle: "Dense data, weak signal",
            modalBody:
              "Even when EHRs visualize patient data, overlapping trends and missing context can make it hard to see what is changing and what needs attention.",
            modalImageSource:
              "Image source: Epic Systems interface screenshot.",
          },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        summary:
          "A longitudinal view aligns encounters and outcomes over time, paired with a unified visual structure that surfaces signals first while keeping detail accessible for care planning.",
        images: [
          {
            src: "/images/vehr/timeline.png",
            alt: "Longitudinal view of clinical data over time",
            thumbnailTitle: "Longitudinal view",
            modalTitle: "Longitudinal view",
            modalBody:
              "Encounters, vitals, diagnoses, and patient-reported data align across time, making change and clinical relationships easier to interpret.",
          },
          {
            src: "/images/vehr/research3.png",
            alt: "Signal first, detail on demand with unified visual structure",
            thumbnailTitle: "Signal first, detail on demand",
            modalTitle: "Signal first, detail on demand",
            modalBody:
              "A unified visual structure helps clinicians spot patterns and abnormalities quickly, while preserving access to the detail needed for care planning.",
          },
        ],
      },
      {
        id: "whyItMatters",
        title: "Why it matters",
        summary:
          "Faster recognition of what needs attention and more informed review in less time—without stitching the clinical picture together across separate screens.",
        images: [
          {
            src: "/images/vehr/patterns.png",
            alt: "Faster recognition of clinical signals and change",
            thumbnailTitle: "Faster recognition of what needs attention",
            modalTitle: "Faster recognition of what needs attention",
            modalBody:
              "Clinicians can scan for meaningful change more quickly without stitching together the clinical picture across separate screens.",
          },
          {
            src: "/images/vehr/voice.png",
            alt: "More informed clinical review with connected context",
            thumbnailTitle: "More informed review in less time",
            modalTitle: "More informed review in less time",
            modalBody:
              "Keeping related data and context connected in one view reduces chart digging and supports clearer, more confident interpretation.",
          },
        ],
      },
    ],
  },
  meta: [
    { label: "Role", value: "Product Design Lead" },
    { label: "Primary Users", value: "Clinicians and care teams" },
    { label: "Focus", value: "Patterns, change, and context" },
  ],
  summaryBlock: {
    label: "SUMMARY",
    body: "I worked with a practicing physician to design a chart review workflow that makes dense patient data over time easier to interpret, and delivered scalable components now being implemented by his development team.",
    team: "Founding clinical lead, engineering team, and myself",
    prototypeLink: {
      href: "https://visual-ehr.vercel.app/",
      label: "Open prototype",
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
    "Digitizing a manual refill workflow across 2,800+ clinics and 43,000+ patients",
  heroImage: "/images/fresenius-hero.png",
  heroImageAlt: "Fresenius refill workflow interface",
  featureImages: [],
  meta: [
    { label: "Role", value: "Senior UX Designer" },
    { label: "Primary Users", value: "Nurses and dietitians" },
    { label: "Focus", value: "Speed, safety, accuracy" },
  ],
  summaryBlock: {
    label: "SUMMARY",
    body:
      "I led research and design for a digital in-clinic refill workflow that helped nurses and dietitians complete refills faster and with more patient oversight. Staff reported 70% faster refills across 2,800+ clinics supporting 43,000+ patients.",
    team: "Product manager, business systems analyst, Salesforce engineers, data team, and myself",
  },
  caseStudyHighlights: {
    modalPresentation: "composite-vehr" as const,
    modalBrandHeader: {
      projectTitle: "Modernizing In-clinic Refills",
      company: "Fresenius Medical Care",
    },
    compositeRows: {
      challenge: [[0, 1]],
      mapping: [[0, 1]],
      testing: [[0]],
      solution: [[0]],
      impact: [[0, 1, 2]],
    },
    frames: [
      {
        id: "challenge",
        title: "Challenge",
        summary:
          "Digitizing refill work meant translating a manual, coordination-heavy process into a digital workflow without losing the context nurses and dietitians needed to act safely and confidently.",
        images: [
          {
            src: "/images/frx/raf.png",
            modalPrimarySrc: "/images/frx/raf.jpg",
            alt: "Reliance on RAF forms in the refill workflow",
            thumbnailTitle: "Reliance on weekly forms",
            modalTitle: "Reliance on weekly forms",
            modalBody:
              "Critical refill details were tracked through weekly refill forms with medication and patient details, making the process difficult to track, prone to delays, and more vulnerable to missed details.",
            modalMediaCaption: "Nurse showing me the weekly refill forms",
          },
          {
            src: "/images/frx/objects.png",
            modalPrimarySrc: "/images/frx/objects.jpg",
            alt: "Many moving objects in the refill workflow",
            thumbnailTitle: "Many moving parts",
            modalTitle: "Many moving parts",
            modalBody:
              "The work spanned clinical, product, engineering, and operational needs. I helped align those perspectives into an experience that was practical, clear, and buildable.",
            modalMediaCaption:
              "Nurse explaining the difficulty in keeping track of refills",
          },
        ],
      },
      {
        id: "mapping",
        title: "Mapping",
        summary:
          "We mapped the objects involved in refill work and used that structure to align the workflow with data relationships and engineering needs.",
        images: [
          {
            src: "/images/frx/structuring.png",
            modalPrimarySrc: "/images/frx/structuring.png",
            alt: "Structuring refill objects: relationships and workflow foundation",
            thumbnailTitle: "Structuring the objects",
            modalTitle: "Structuring the objects",
            modalBody:
              "We mapped the many objects involved in refill work, clarified how they related to one another, and used that structure to shape a more coherent digital workflow. That work helped identify the core objects staff needed to act on, align the workflow with data relationships, and give engineering a clearer foundation to build from.",
            modalMediaCaption:
              "Object oriented UX map for nouns, attributes, actions in the system",
          },
          {
            src: "/images/frx/structuring.png",
            alt: "Object mapping wireframe animation",
            modalVideoSrc: "/images/frx/fresenius-objectwireframe.mp4",
            modalVideoOnly: true,
            modalVideoOnlyStyle: {
              objectPosition: "top center",
            },
            hideModalCopy: true,
            modalMediaCaption:
              "Object map translated to wireframe for testing",
          },
        ],
      },
      {
        id: "testing",
        title: "Testing",
        summary:
          "Prototypes with nurses revealed where the workflow created hesitation and what to change for faster, more confident decisions.",
        images: [
          {
            src: "/images/frx/testing.png",
            modalPrimarySrc: "/images/frx/testing.png",
            alt: "Annotated prototype used to test refill workflow assumptions",
            thumbnailTitle: "Testing and refining the workflow",
            modalTitle: "Testing Information Hierarchy",
            modalBodyParagraphs: [
              "Built with an SLDS-based mid-fidelity system, these prototypes helped test hierarchy and interaction design.",
              "Testing showed that showing only the information needed for the next decision reduced scanning burden.",
              "We also learned that hiding the date behind Today/Later added friction, so the final design showed the date field with today preselected.",
            ],
          },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        summary:
          "The final workflow kept essential context in one place so nurses could complete refills without losing orientation.",
        images: [
          {
            src: "/images/frx/oneplace.png",
            alt: "Refill workflow with request details, dates, shipping, and status in one place",
            thumbnailTitle: "Bringing key details into one place",
            modalTitle: "Keeping Key Information in View",
            modalBody:
              "The final solution kept essential refill information visible at all times while progressively disclosing the workflow only when users needed to act. This balanced quick scanning with focused task completion, helping nurses and dietitians move through refills with minimal friction.",
            modalVideoSrc: "/images/frx/fresenius.mp4",
            modalVideoOnly: true,
          },
        ],
      },
      {
        id: "impact",
        title: "Impact",
        summary:
          "The digital refill workflow reduced coordination time while making key details easier to track, review, and act on in daily clinic work.",
        images: [
          {
            src: "/images/frx/saving.png",
            alt: "Faster refill work",
            thumbnailTitle: "Faster refill work",
            modalTitle: "Faster refill work",
            modalBody:
              "Staff reported a 70% decrease in time-to-refill after the manual process was brought into CareTeamHub.",
            modalTestimonials: [
              {
                quote:
                  "Using this feature eliminates the need to call pharmacy... they would be on the phone at least 15 min or more.",
                attribution: "Shun D. Price, Facility Admin",
                avatarSrc: "/images/frx/shaun.avif",
              },
              {
                quote:
                  "Realistically on a big program you're saving 2-3 hours per week.",
                attribution: "Tara E. Towe, Home Therapies RN",
                avatarSrc: "/images/frx/tara.avif",
              },
            ],
            omitModalMedia: true,
          },
          {
            src: "/images/frx/quick.png",
            alt: "Better workflow support",
            thumbnailTitle: "Better workflow support",
            modalTitle: "Better workflow support",
            modalBody:
              "The workflow was described as easier, quicker, and simpler to use than the previous refill-making process.",
            modalTestimonials: [
              {
                quote:
                  "We all love it. Very convenient, quick way to review refills.",
                attribution: "Krystal D. Antu, Dietitian",
                avatarSrc: "/images/frx/krystal.avif",
              },
              {
                quote:
                  "My nurses have used the refill self-service and are very pleased with the easiness and reduction in time it takes.",
                attribution: "Lyndsay A. Rodgers, Clinical Services Initiatives Mgr",
                avatarSrc: "/images/frx/lyndsay.avif",
              },
            ],
            omitModalMedia: true,
          },
          {
            src: "/images/frx/shipment.png",
            alt: "Stronger day-to-day oversight",
            thumbnailTitle: "Stronger day-to-day oversight",
            modalTitle: "Stronger day-to-day oversight",
            modalBody:
              "Bringing refill work into one workflow gave staff better visibility into shipment status, refill timing, and active refill needs. That made it easier to check refill status throughout the entire refill workflow.",
            modalTestimonials: [
              {
                quote: "The feature to track shipments is invaluable.",
                attribution: "Natisha Winegarner, HT RN",
                avatarSrc: "/images/frx/natisha.avif",
              },
              {
                quote:
                  "Quick... was able to see shipment, call patient back within minutes.",
                attribution: "Pat Denton, Home Therapies Program Manager",
                avatarSrc: "/images/frx/pat.avif",
                contentAlign: "center" as const,
              },
            ],
            omitModalMedia: true,
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
  projectLabel: "Ascension Health",
  projectLogo: "/images/ascension-project-logo.png",
  projectDate: "2023-2024",
  title: "Responsive Care Access",
  descriptor:
    "Responsive portal for 40,000+ members for Dell Children's Health Plan",
  heroImage: "/images/dellchildrens-hero.png",
  heroImageAlt: "Dell Children's Health Plan, responsive member portal",
  featureImages: [],
  meta: [
    { label: "Role", value: "Senior Product Designer" },
    { label: "Primary Users", value: "Patients & caregivers" },
    { label: "Focus", value: "Accessibility, support, and compliance" },
  ],
  summaryBlock: {
    label: "SUMMARY",
    body:
      "Dell Children's Patient Portal was outdated, lacked meaningful functionality and a personal touch, and was out of compliance with Medicaid requirements. I designed and shipped a new responsive portal experience with expanded functionality, working with a lean team to modernize key member workflows and improve usability. The portal met Medicaid guidelines and continued serving 40,000+ members.",
    team: "Product manager, product lead, front and data engineers, and myself",
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
      <main className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
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
              {...freseniusProject}
              hideMetaTopBorder
              metaSectionStackGap="gap-16"
            />
            <div className="mt-56 md:mt-72 lg:mt-80">
              <ProjectSection
                {...vehrProject}
                hideMetaTopBorder
                metaSectionStackGap="gap-16"
              />
            </div>
            <div className="mt-56 md:mt-72 lg:mt-80">
              <ProjectSection
                {...vinylProject}
                hideMetaTopBorder
                metaSectionStackGap="gap-16"
                caseStudyComingSoon
              />
            </div>
            {/* <ProjectSection {...vinylHealthProject} /> */}
            <div className="mt-56 md:mt-72 lg:mt-80">
              <ProjectSection
                {...ascensionProject}
                hideMetaTopBorder
                metaSectionStackGap="gap-16"
                caseStudyComingSoon
              />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
