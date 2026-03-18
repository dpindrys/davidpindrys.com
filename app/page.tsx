import Header from "./components/Header";
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import ProjectSection from "./components/ProjectSection";
import type { CarouselSlide } from "./components/Carousel";

const vehrProject = {
  projectLabel: "VEHR Technologies",
  projectLogo: "/images/VEHR-project-logo.png",
  title: "Clinical Sensemaking",
  descriptor: "Visualizing longitudinal patient health information",
  heroImage: "/images/vehr-hero.png",
  heroImageAlt: "VEHR Technologies — patient timeline interface on iPad",
  heroVideo: "/images/vehr-hero.mp4",
  heroVideoInset: { left: "2.554%", top: "3.272%", width: "94.955%", height: "92.869%" },
  heroVideoPoster: "/images/vehr-hero-cover.png",
  featureImages: [],
  heroPrototypeLink: { href: "https://visual-ehr.vercel.app/", icon: "/images/prototype-arrow.png" },
  meta: [
    { label: "Role", value: "Product Design Lead" },
    { label: "Primary Users", value: "Clinicians & care teams" },
    { label: "Focus", value: "Patterns, change, and context" },
  ],
  blurbs: {
    problem: "Important clinical patterns are often buried across disconnected parts of the EHR.",
    solution:
      "I designed a unified charting view that brings encounters, vitals, labs, medications, and patient-reported symptoms into one visual timeline.",
    whyItMatters:
      "This helps clinicians see relationships across the record faster and understand the patient's trajectory with less chart digging.",
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
  title: "Human Factors Rigor",
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
  title: "Care Access Modernization",
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
    <main className="min-h-screen overflow-x-visible bg-[#F0F0F0]">
      <div className="flex justify-center w-full overflow-x-visible px-8 lg:px-16">
        <div className="flex flex-col items-stretch w-full max-w-[1200px] gap-[160px] pt-12 pb-32 overflow-x-visible">

          <Header />
          <Hero />
          <div className="w-screen max-w-[100vw] ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] overflow-x-hidden md:ml-0 md:mr-0 md:w-full md:max-w-none">
            <LogoStrip />
          </div>
          <ProjectSection {...vehrProject} />
          <ProjectSection {...freseniusProject} />
          {/* <ProjectSection {...vinylHealthProject} /> */}
          <ProjectSection {...ascensionProject} />

        </div>
      </div>
    </main>
  );
}
