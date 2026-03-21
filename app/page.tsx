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
  descriptor: "A problem-oriented view of patient history over time",
  heroImage: "/images/vehr-hero.png",
  heroImageAlt: "VEHR Technologies, patient timeline interface on iPad",
  featureImages: [],
  caseStudyHighlights: {
    frames: [
      {
        id: "problem",
        title: "Problem",
        summary:
          "Conventional EHRs often make chart review harder than it should be. Clinicians must piece together fragmented data across separate screens, scan dense source-based views, and reconstruct the patient story for themselves.",
        images: [
          {
            src: "/images/vehr/problem1.png",
            modalPrimarySrc: "/images/vehr/problem1a.png",
            alt: "Fragmented, uncoupled data in clinical workflows",
            caption: "Epic Systems interface screenshot",
            thumbnailTitle: "Fragmented, uncoupled data",
            modalTitle: "Fragmented, uncoupled data",
            modalBody:
              "Patient information is often split across separate views for labs, notes, medications, encounters, and other data sources. Clinicians have to stitch those pieces together manually to understand what has been happening over time.",
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
            caption: "Epic Systems interface screenshot",
            thumbnailTitle: "Mental model mismatch",
            modalTitle: "Mental model mismatch",
            modalBody:
              "Most EHR structures mirror how data is stored, not how clinicians think. Clinical reasoning is problem-oriented and time-based, so source-driven navigation creates friction when users are trying to understand a patient's condition in context.",
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
              "Organizes the record around active conditions, key changes, and current status so clinicians can understand the case without gathering signal across separate tabs.",
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
              "Interval-based summaries make patient-reported outcomes easier to scan while preserving severity, trend, and the underlying observations behind each score.",
          },
        ],
      },
      {
        id: "whyItMatters",
        title: "Why it matters",
        summary:
          "Organizing the record around problems and time makes important patterns easier to see, reduces fragmentation in chart review, and helps patient-reported data contribute more directly to clinical decisions.",
        images: [
          {
            src: "/images/vehr/patterns.png",
            alt: "Patterns and signal across the chart",
            thumbnailTitle: "Clearer patterns",
            modalTitle: "A clearer picture of patient change",
            modalBody:
              "Acute visits, elevated vitals, worsening symptom burden, and abnormal labs can be seen together in one view. That makes change easier to recognize and reduces the effort required to reconstruct the clinical picture across separate screens.",
          },
          {
            src: "/images/vehr/treatment.png",
            alt: "Treatment context in the longitudinal timeline",
            thumbnailTitle: "Treatment context, in place",
            modalTitle: "Treatment context, in place",
            modalBody:
              "Medication status remains visible in the timeline, with in-context detail available when needed. That helps clinicians interpret treatment response more efficiently without leaving the longitudinal view.",
          },
          {
            src: "/images/vehr/voice.png",
            alt: "Patient-reported symptoms in clinical context",
            thumbnailTitle: "Patient voice in clinical context",
            modalTitle: "Patient voice in clinical context",
            modalBody:
              "Patient-reported symptoms appear alongside the rest of the clinical picture, with summaries that make severity, trend, and supporting observations easier to interpret over time. That makes patient-reported data more usable in day-to-day decisions.",
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
    body: "I collaborated with a practicing physician to rethink how clinicians review patient histories in traditional EHRs. VEHR is a concept for problem-oriented chart review that brings encounters, symptoms, labs, and other signals into a longitudinal view, helping clinicians see patterns, relationships, and change over time.",
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
    "Digitizing a manual refill workflow across 2,800+ clinics and 43,000+ patients",
  heroImage: "/images/fresenius-hero.png",
  heroImageAlt: "Fresenius refill workflow interface",
  featureImages: [],
  meta: [
    { label: "Role", value: "Senior UX Designer" },
    { label: "Primary Users", value: "Nurses and dietitians" },
    { label: "Focus", value: "Safety, accuracy, and throughput" },
  ],
  summaryBlock: {
    label: "SUMMARY",
    body:
      "Clinic refill workflows depended on manual, fragmented intake and review steps that slowed staff, complicated handoffs, and made oversight harder. I led research and design for a digital in-clinic refill workflow that replaced a RAF-form-heavy process with a clearer, more efficient system for nurses and dietitians. Staff reported roughly 70% faster refills across 2,800+ clinics supporting 43,000+ patients.",
  },
  caseStudyHighlights: {
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
            thumbnailTitle: "Reliance on RAF forms",
            modalTitle: "Reliance on RAF forms",
            modalBody:
              "Critical refill details were tracked through weekly RAF forms listing patients who needed refills, along with supporting paperwork and follow-up steps. The process was hard to track, easy to delay, and dependent on manual handoffs that increased the chance of missed details and error.",
          },
          {
            src: "/images/frx/objects.png",
            modalPrimarySrc: "/images/frx/objects.jpg",
            alt: "Many moving objects in the refill workflow",
            thumbnailTitle: "Many moving objects",
            modalTitle: "Many moving objects",
            modalBody:
              "Refill work involved multiple data objects, dependencies, and stakeholders, including nurses, dietitians, pharmacists, patient information, medication details, refill status, addresses, and supporting forms. Coordinating all of it across systems and handoffs made the workflow difficult to manage reliably.",
          },
          {
            src: "/images/frx/context.png",
            modalPrimarySrc: "/images/frx/context.jpg",
            alt: "Context without overload",
            thumbnailTitle: "Context without overload",
            modalTitle: "Context without overload",
            modalBody:
              "The digital workflow needed to give staff enough context to make safe next-step decisions without recreating the clutter of the manual process. The design challenge was deciding what to surface, what to defer, and how to keep essential refill context visible without overwhelming users.",
          },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        summary:
          "The redesigned refill workflow organized the core objects, steps, and decisions into a clearer shared structure that was easier for staff to follow, easier for teams to support, and easier to build reliably.",
        images: [
          {
            src: "/images/frx/structuring.png",
            modalPrimarySrc: "/images/frx/structuring.png",
            alt: "Structuring the objects, object grid and wireframe composite",
            thumbnailTitle: "Structuring the objects",
            modalTitle: "Structuring the objects",
            modalBody:
              "We mapped the many objects involved in refill work, clarified how they related to one another, and used that structure to shape a more coherent digital workflow. We identified dozens of system objects involved in refill work, prioritized the core objects staff actually needed to act on, aligned the object model with data relationships, tested object clarity and actions with users, and used that structure to unblock front-end development.",
            modalVideoSrc: "/images/frx/fresenius-objectwireframe.mp4",
          },
          {
            src: "/images/fresenius-hero.png",
            alt: "Digitizing the workflow in CareTeamHub",
            thumbnailTitle: "Digitizing the workflow",
            modalTitle: "Digitizing the workflow",
            modalBody:
              "The refill process was brought into CareTeamHub, where nurses already worked, replacing fragmented manual coordination with a more structured in-product workflow. Staff no longer had to manage refill work through disconnected forms, follow-up steps, and handoffs outside the product, and the workflow became easier to track, act on, and support in one place.",
          },
          {
            placeholder: true,
            alt: "Progressive disclosure of key details",
            thumbnailTitle: "Progressive disclosure of key details",
            modalTitle: "Progressive disclosure of key details",
            modalBody:
              "Essential refill information stayed visible in one view so nurses could remain oriented, while additional detail appeared only when needed. This reduced clutter without removing the context required for safe next-step decisions.",
          },
        ],
      },
      {
        id: "whyItMatters",
        title: "Why it matters",
        summary:
          "The digital refill workflow reduced time spent on refill coordination while making key details easier to track, review, and act on in daily clinic work.",
        images: [
          {
            src: "/images/frx/saving.png",
            alt: "Faster refill work",
            thumbnailTitle: "Faster refill work",
            modalTitle: "Faster refill work",
            modalBody:
              "Staff reported roughly 70% faster refill work after the manual process was brought into CareTeamHub. In larger programs, that translated into meaningful weekly time savings and fewer calls to pharmacy.",
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
              "Staff described the workflow as easier, quicker, and simpler to use in the course of normal refill work. Clear refill status, dates, and next steps helped reduce friction in a high-volume workflow.",
            modalTestimonials: [
              {
                quote:
                  "My nurses have used the refill self-service and are very pleased with the easiness and reduction in time it takes.",
                attribution: "Lyndsay A. Rodgers, Clinical Services Initiatives Mgr",
                avatarSrc: "/images/frx/lyndsay.avif",
              },
              {
                quote:
                  "We all love it. Very convenient, quick way to review refills.",
                attribution: "Krystal D. Antu, Dietitian",
                avatarSrc: "/images/frx/krystal.avif",
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
              "Bringing refill work into one workflow gave staff better visibility into shipment status, refill timing, and active refill needs. That made it easier to respond to patients and manage work without relying on fragmented handoffs.",
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
