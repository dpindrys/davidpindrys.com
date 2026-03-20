import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import LogoStrip from "./components/LogoStrip";
import { sectionHeadingClass } from "./components/sectionHeading";
import ProjectSection from "./components/ProjectSection";
import type { CarouselSlide } from "./components/Carousel";

const vehrProject = {
  projectLabel: "VEHR Technologies",
  projectLogo: "/images/VEHR-project-logo.png",
  projectDate: "2024",
  title: "Clinical Sensemaking",
  descriptor: "Visualizing longitudinal patient health information",
  heroImage: "/images/vehr-hero.png",
  heroImageAlt: "VEHR Technologies — patient timeline interface on iPad",
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
            thumbnailTitle: "Fragmented, uncoupled data",
            modalTitle: "Fragmented, uncoupled data",
            modalBody:
              "Clinicians often have to piece together patient information across disconnected screens, forcing them to reconstruct the patient story manually.",
          },
          {
            src: "/images/vehr/problem2.png",
            modalPrimarySrc: "/images/vehr/problem2a.png",
            alt: "Overload without insight",
            thumbnailTitle: "Overload, without insight",
            modalTitle: "Overload, without insight",
            modalBody:
              "Dense lists and source-based views expose a great deal of data, but make patterns, priorities, and meaningful change harder to see.",
          },
          {
            src: "/images/vehr/problem3.png",
            modalPrimarySrc: "/images/vehr/problem3a.png",
            alt: "Mental model mismatch",
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
  heroImageAlt: "Fresenius Medical Care — in-clinic refill interface on iPad",
  carousel: {
    slides: [
      {
        type: "image",
        src: "/images/fresenius-user.png",
        alt: "Nurses in a refill workflow context",
        captionTitle: "Ethnographic study",
        captionBody: "Observed a refill workflow with many details nurses had to track.",
        width: 512,
        height: 384,
      },
      {
        type: "video",
        src: "/images/fresenius-objectwireframe.mp4",
        captionTitle: "Object mapping",
        captionBody: "Mapped every object into a wireframe to ensure complete coverage.",
        height: 535,
      },
      {
        type: "image",
        src: "/images/fresenius-datelabel.png",
        alt: "Date display in refill interface",
        captionTitle: "User testing",
        captionBody: "Tested date display and found nurses preferred exact dates over relative labels.",
        width: 512,
        height: 491,
      },
      {
        type: "image",
        src: "/images/fresenius-addresses.png",
        alt: "Address management in refill dashboard",
        captionTitle: "Edge-case design",
        captionBody: "Brought address management into the dashboard to keep nurses in the refill flow.",
        width: 740,
        height: 573,
      },
    ] satisfies CarouselSlide[],
  },
  featureImages: [],
  meta: [
    { label: "Role", value: "Senior UX Designer" },
    { label: "Primary Users", value: "Nurses and dietitians" },
    { label: "Focus", value: "Safety, accuracy, and throughput" },
  ],
  blurbs: {
    problem:
      "Clinic workflows relied on manual, scattered intake and review steps that slowed staff down and increased the risk medication delays or mishandling.",
    solution:
      "I led research and design for a digital in-clinic refill workflow that reduced cognitive load, streamlined staff work, and improved patient oversight.",
    whyItMatters:
      "Staff reported roughly 70% faster refills across 2,800+ clinics, supporting 43,000+ patients.",
  },
  testimonial: {
    quote:
      '"David\'s remarkable initiative in building our UI/UX architecture from scratch has been nothing short of impressive."',
    name: "Larissa Doronina",
    title: "Principal UX Architect, Fresenius Medical Care",
    avatarSrc: "/images/larissa.png",
  },
};

/* Vinyl Health — commented out for now
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
  heroImage: "/images/dellchildrens-laptop-hero.png",
  heroImageAlt: "Dell Children's Health Plan — laptop view",
  heroOverlayImage: "/images/dellchildrens-mobile-hero.png",
  heroOverlayImageAlt: "Dell Children's Health Plan — mobile view",
  featureImages: [
    { src: "/images/dell-screens.png", alt: "Dell Children's Health Plan portal screens", label: "" },
  ],
  meta: [
    { label: "Role", value: "Senior Product Designer" },
    { label: "Primary Users", value: "Patients & caregivers" },
    { label: "Focus", value: "Access, usability, and compliance" },
  ],
  blurbs: {
    problem:
      "Dell Children's Patient Portal was outdated, lacked meaningful functionality and a personal touch, and was out of compliance with Medicaid requirements.",
    solution:
      "I designed and shipped a new responsive portal experience with expanded functionality, working with a lean team to modernize key member workflows and improve usability.",
    whyItMatters:
      "The portal met Medicaid guidelines and continued serving 40,000+ members.",
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
              <ProjectSection {...freseniusProject} />
            </div>
            {/* <ProjectSection {...vinylHealthProject} /> */}
            <div className="mt-56 md:mt-72 lg:mt-80">
              <ProjectSection {...ascensionProject} narrowSingleFeatureByPx={232} />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
