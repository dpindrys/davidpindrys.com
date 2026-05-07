import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import LogoStrip from "./components/LogoStrip";
import { sectionHeadingClass } from "./components/sectionHeading";
import ProjectSection from "./components/ProjectSection";
import Link from "next/link";

const vehrProject = {
  projectLabel: "VEHR Technologies",
  projectLogo: "/images/VEHR-project-logo.png",
  projectDate: "2024",
  title: "Clinical Sensemaking",
  descriptor:
    "A problem-oriented view of patient history over time for a clinician-led startup",
  heroImage: "/images/vehr-hero.png",
  heroImageAlt: "VEHR Technologies, patient timeline interface on iPad",
  heroHref: "/case-studies/visual-ehr",
  featureImages: [],
  meta: [],
  testimonial: { quote: "" },
  showProjectFooter: false,
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
  heroHref: "/case-studies/frx",
  heroVideo: "/images/frx/fresenius.mp4",
  // Slightly shrink for equal side gutters; crop 1px off the left edge to remove artifact.
  heroVideoTransform: "scale(0.985)",
  heroVideoClipPath: "inset(0 0 0 1px round 16px)",
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
      burdensomeNoVisibility: [[0, 1]],
      challenge: [[0]],
      mappingWireframing: [[0, 1]],
      prototypingDeploying: [[0, 1]],
      impact: [[0, 1, 2]],
    },
    frames: [
      {
        id: "burdensomeNoVisibility",
        title: "Burdensom & No Visibility",
        summary:
          "Before digitization, refills were manual, coordination-heavy, and opaque—creating administrative burden and forcing clinics to chase status by phone.",
        images: [
          {
            src: "/images/frx/raf3.png",
            alt: "Paper RAF forms and manual refill coordination",
            thumbnailTitle: "Administrative Burden",
            modalTitle: "Administrative Burden",
            modalBody:
              "Nurses spent 15+ minutes per refill managing paper forms and 2-3 hours per week on refill coordination - time pulled directly from patient care. The manual workflow (receiving faxes, printing, tracking clipboards, signing forms, re-faxing) transformed what should be a simple authorization into a multi-step administrative task.",
          },
          {
            src: "/images/frx/disconnected.png",
            alt: "Clinics lacked access to pharmacy processing status",
            thumbnailTitle: "Visibility Gap",
            modalTitle: "Status Visibility Gap",
            modalBody:
              "Once RAF forms were faxed to the pharmacy, nurses had zero visibility into processing status. The pharmacy's digital system tracked every step (received, processing, filled, shipped), but clinics had no access, forcing nurses to make phone calls for basic status updates: \"Did you get it? Is it processing? When will it ship?\"",
          },
        ],
      },
      {
        id: "mappingWireframing",
        title: "Mapping and Wireframing",
        summary:
          "We mapped the objects involved in refill work and validated the structure with users before committing to UI hierarchy and interaction design.",
        images: [
          {
            src: "/images/frx/structuring.png",
            modalPrimarySrc: "/images/frx/structuring.png",
            alt: "Structuring refill objects: relationships and workflow foundation",
            thumbnailTitle: "Object Map",
            modalTitle: "Object Map",
            modalBody:
              "I built an object map before wireframing to establish the data model and surface edge cases early. Mapping the core entities - PATIENT, MED, SCRIPT, REFILL, ADDRESS, USER - revealed complexity that would have derailed development if caught later: patients with multiple addresses, medications with different refill frequencies, scripts with expiration dates. This gave engineering a clear foundation and prevented mid-build data model changes.",
            modalMediaCaption:
              "Object oriented UX map for nouns, attributes, actions in the system",
          },
          {
            src: "/images/frx/structuring.png",
            alt: "Wireframe emerging from object-map validation",
            modalVideoSrc: "/images/frx/fresenius-objectwireframe.mp4",
            modalVideoOnly: true,
            modalVideoOnlyStyle: {
              objectPosition: "top center",
            },
            thumbnailTitle: "Wireframe",
            modalTitle: "Wireframe",
            modalBody:
              "I tested the object map with users to validate what information nurses actually needed before committing to UI structure. This wireframe emerged from that validation work - refill lists organized by medication with clear status indicators and defined action paths. The object-first approach meant front-end development started with a validated data structure, not guesswork about what fields to display.",
            modalMediaCaption:
              "Object map translated to wireframe for testing",
          },
        ],
      },
      {
        id: "prototypingDeploying",
        title: "Prototyping and Deploying",
        summary:
          "Mid-fidelity prototypes validated information hierarchy before final delivery, which kept key context in view while reducing scanning burden.",
        images: [
          {
            src: "/images/frx/prototype.png",
            alt: "Mid-fidelity prototype for testing information hierarchy",
            thumbnailTitle: "Testing Information Hierarchy",
            modalTitle: "Testing Information Hierarchy",
            modalBodyParagraphs: [
              "Built with an SLDS-based mid-fidelity system, these prototypes helped test hierarchy and interaction design.",
              "Testing showed that showing only the information needed for the next decision reduced scanning burden.",
              "We also learned that hiding the date behind Today/Later added friction, so the final design showed the date field with today preselected.",
            ],
          },
          {
            src: "/images/frx-hero.png",
            alt: "Refill workflow with request details, dates, shipping, and status in one place",
            thumbnailTitle: "Keeping Key Information in View",
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
  showProjectFooter: false,
};

const ascensionProject = {
  projectLabel: "Ascension",
  projectLogo: "/images/ascension-project-logo.png",
  projectDate: "2023",
  title: "Responsive Care Access",
  descriptor:
    "Responsive portal for 40,000+ members for Dell Children's Health Plan",
  heroImage: "/images/dellchildrens-hero.png",
  heroImageAlt: "Dell Children's Health Plan, responsive member portal",
  heroOverlayImage: "/images/dellchildrens/home-mobile.png",
  heroOverlayImageAlt: "Dell Children's portal home screen on mobile",
  heroOverlayImageHeightClass: "h-[50%]",
  heroOverlayImageRightOffsetPx: 50,
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
  caseStudyComingSoon: true,
  caseStudyCtaLabel: "Coming soon",
  caseStudyHighlights: {
    modalPresentation: "composite-vehr" as const,
    modalBrandHeader: {
      projectTitle: "Responsive Care Access",
      company: "Ascension",
    },
    compositeRows: {
      problem: [[0]],
    },
    frames: [
      {
        id: "problem",
        title: "Problem",
        summary:
          "Dell Children's Patient Portal was outdated, lacked meaningful functionality and a personal touch, and was out of compliance with Medicaid requirements.",
        images: [
          {
            src: "/images/dellchildrens/before.png",
            modalPrimarySrc: "/images/dellchildrens/before.png",
            alt: "Legacy member portal before redesign",
            thumbnailTitle: "Legacy portal experience",
            modalTitle: "Legacy portal experience",
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
            src: "/images/dellchildrens/after.png",
            modalPrimarySrc: "/images/dellchildrens/after.png",
            alt: "Responsive member portal after redesign",
            thumbnailTitle: "Responsive portal",
            modalTitle: "Responsive portal",
            modalBody:
              "I designed and shipped a new responsive portal experience with expanded functionality, working with a lean team to modernize key member workflows and improve usability.",
            modalImageOverlaySrc: "/images/dellchildrens/home-mobile.png",
            modalImageOverlayAlt: "Home experience on mobile",
          },
        ],
      },
      {
        id: "careTeam",
        title: "Care team",
        summary:
          "Members can designate a care team and primary care provider through flows that were previously unavailable in the legacy portal.",
        images: [
          {
            src: "/images/dellchildrens/change-mobile.png",
            modalPrimarySrc: "/images/dellchildrens/change-mobile.png",
            alt: "Care team designation on mobile",
            thumbnailTitle: "Care team",
            modalTitle: "Care team designation",
            modalBody:
              "Members can designate a care team and primary care provider through flows that were previously unavailable in the legacy portal.",
          },
        ],
      },
      {
        id: "idCards",
        title: "ID cards",
        summary:
          "ID card requests were brought into the digital experience so members could complete requests without unnecessary friction.",
        images: [
          {
            src: "/images/dellchildrens/change-mobile.png",
            modalPrimarySrc: "/images/dellchildrens/change-mobile.png",
            alt: "ID card request flow on mobile",
            thumbnailTitle: "ID card requests",
            modalTitle: "ID card requests",
            modalBody:
              "ID card requests were brought into the digital experience so members could complete requests without unnecessary friction.",
            modalVideoSrc: "/images/dellchildrens/idcards.mov",
            modalVideoOnly: true,
            modalVideoOnlyStyle: {
              objectPosition: "top center",
            },
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
            <div className="mt-16 md:mt-20 lg:mt-24 w-[calc(100%+4rem)] max-w-none -mx-8 lg:w-[calc(100%+8rem)] lg:-mx-16 overflow-x-visible">
              <LogoStrip />
            </div>
            <h2
              className={`${sectionHeadingClass} mt-16 text-left md:mt-20 lg:mt-24 mb-1.5 md:mb-3 lg:mb-4`}
            >
              Selected work
            </h2>
            <section className="mt-6 md:mt-8 lg:mt-10">
              <div className="grid w-full grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-10 lg:gap-12">
                {/* Left column: VEHR (top) + Dell Children's (bottom) */}
                <div className="flex w-full flex-col gap-10 lg:gap-12">
                  <Link
                    href="/case-studies/visual-ehr"
                    aria-label="Open VEHR case study"
                    className="block rounded-2xl border border-black/10 bg-white/50 p-7 md:p-8 transition-[transform,box-shadow] duration-200 ease-out shadow-[0_10px_30px_-22px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:shadow-[0_26px_70px_-26px_rgba(0,0,0,0.35)] active:translate-y-0 active:shadow-[0_14px_40px_-26px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]"
                  >
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={vehrProject.heroImage}
                        alt={vehrProject.heroImageAlt}
                        className="block h-auto w-full rounded-2xl border border-black/10 bg-white/40"
                      />
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                      <h3 className="font-sans text-[22px] font-semibold leading-[1.25] tracking-tight text-black md:text-[24px]">
                        {vehrProject.title}
                      </h3>
                      <p className="font-sans text-[16px] font-normal leading-[1.5] text-black/70">
                        {vehrProject.descriptor}
                      </p>
                    </div>
                  </Link>

                  <article className="rounded-2xl border border-black/10 bg-white/50 p-7 md:p-8 transition-[transform,box-shadow] duration-200 ease-out shadow-[0_10px_30px_-22px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:shadow-[0_26px_70px_-26px_rgba(0,0,0,0.35)] active:translate-y-0 active:shadow-[0_14px_40px_-26px_rgba(0,0,0,0.28)]">
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ascensionProject.heroImage}
                        alt={ascensionProject.heroImageAlt}
                        className="block w-full h-auto rounded-2xl border border-t-0 border-black/10 bg-white/40"
                      />
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                      <h3 className="font-sans text-[22px] md:text-[24px] font-semibold leading-[1.25] tracking-tight text-black">
                        {ascensionProject.title}
                      </h3>
                      <p className="font-sans text-[16px] font-normal leading-[1.5] text-black/70">
                        {ascensionProject.descriptor}
                      </p>
                    </div>
                  </article>
                </div>

                {/* Right column: FRx + OVCP */}
                <div className="flex w-full flex-col gap-10 lg:gap-12">
                  <Link
                    href="/case-studies/frx"
                    aria-label="Open Fresenius case study"
                    className="block rounded-2xl border border-black/10 bg-white/50 p-7 md:p-8 transition-[transform,box-shadow] duration-200 ease-out shadow-[0_10px_30px_-22px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:shadow-[0_26px_70px_-26px_rgba(0,0,0,0.35)] active:translate-y-0 active:shadow-[0_14px_40px_-26px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]"
                  >
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/frx-hero.png"
                        alt="Fresenius refill workflow keeping key information in one place"
                        className="block h-auto w-full rounded-2xl border border-black/10 bg-white/40"
                      />
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                      <h3 className="font-sans text-[22px] font-semibold leading-[1.25] tracking-tight text-black md:text-[24px]">
                        {freseniusProject.title}
                      </h3>
                      <p className="font-sans text-[16px] font-normal leading-[1.5] text-black/70">
                        {freseniusProject.descriptor}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/case-studies/ovcp"
                    aria-label="Open OVCP case study"
                    className="block rounded-2xl border border-black/10 bg-white/50 p-7 md:p-8 transition-[transform,box-shadow] duration-200 ease-out shadow-[0_10px_30px_-22px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:shadow-[0_26px_70px_-26px_rgba(0,0,0,0.35)] active:translate-y-0 active:shadow-[0_14px_40px_-26px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE]"
                  >
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/ovcp-hero.png"
                        alt="Problem list reconciliation workflow"
                        className="block h-auto w-full rounded-2xl border border-black/10 bg-white/40"
                      />
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                      <h3 className="font-sans text-[22px] font-semibold leading-[1.25] tracking-tight text-black md:text-[24px]">
                        Reconciling the Problem List
                      </h3>
                      <p className="font-sans text-[16px] font-normal leading-[1.5] text-black/70">
                        Helping clinicians reduce diagnostic clutter through a faster, more meaningful
                        problem-list reconciliation workflow.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
