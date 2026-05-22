import Footer from "../components/Footer";
import { frxStrategyHeadlineClass } from "../case-studies/frx/FrxExtendedSections";
import { frxSectionBodyClass } from "../case-studies/frx/frxCaseStudyTypography";

const aboutParagraphs = [
  "I’m a healthcare designer and human factors engineer focused on making complex clinical systems clearer, safer, and easier to navigate.",
  "After earning a BFA in graphic design, I joined Picwell, where I helped seniors navigate Medicare Part D. From there, I worked on future EHR concepts through OVCP, a DoD research effort where I collaborated directly with practicing physicians on problem list reconciliation and clinical workflows.",
  "A few years into my design career, I stepped away to study health sciences because I thought I might belong closer to direct patient care. During that time, I volunteered with hospitalized older adults through the Hospital Elder Life Program and worked at an arts-based day program for adults with autism.",
  "While there, I began prototyping a replacement for an overly complex documentation system used by staff. That experience clarified the kind of work I wanted to do: improving healthcare not only through direct human support, but by designing better systems for the people delivering care.",
  "I later completed an MS in Human Factors Engineering at Tufts University with a certificate in medical devices and systems. Since then, I’ve designed clinical products and workflows for organizations including Kaiser Permanente, Ascension Healthcare, UnitedHealth Group, and Fresenius Medical Care.",
  "My work focuses on reducing cognitive burden, supporting clinical decision-making, and restoring continuity inside fragmented healthcare systems. I’m especially interested in how information architecture and contextual presentation can help clinicians understand patients more quickly and make decisions with less friction.",
] as const;

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
        <div className="flex justify-center w-full overflow-x-visible px-8 lg:px-16">
          <div className="flex flex-col items-stretch w-full max-w-[1200px] pt-4 pb-32 overflow-x-visible">
            <section className="scroll-mt-28 pt-8 md:pt-12 lg:pt-16">
              <h1 className={`${frxStrategyHeadlineClass} max-w-[42rem]`}>
                My path into healthcare started on the patient side.
              </h1>
              <div className="mt-8 flex max-w-[42rem] flex-col gap-5 md:mt-10 md:gap-6">
                {aboutParagraphs.map((paragraph, index) => (
                  <p key={index} className={frxSectionBodyClass}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
