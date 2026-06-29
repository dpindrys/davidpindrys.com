import Footer from "../components/Footer";
import { frxMetaEyebrowClass } from "../case-studies/frx/frxCaseStudyTypography";

const aboutHeadlineClass =
  "font-sans text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.08] tracking-[-0.02em] text-black";

const aboutBodyClass =
  "font-sans text-[17px] font-normal leading-[1.7] text-black/70 md:text-[18px]";

const aboutMetaValueClass =
  "font-sans text-[16px] font-semibold leading-[1.5] text-black";

const aboutHeadline =
  "The best healthcare technology disappears into the background. My work is driven by a simple idea: when clinicians spend less time fighting software, they have more time caring for people.";

const aboutFeatures = [
  {
    title: "Healthcare Design",
    body: "Designing clinical products that simplify complexity and improve patient care.",
  },
  {
    title: "Human Factors",
    body: "Applying cognitive science to reduce errors and support better decisions.",
  },
  {
    title: "Clinical Workflows",
    body: "Streamlining fragmented systems into clear, connected experiences.",
  },
  {
    title: "Information Architecture",
    body: "Presenting the right information at the right time to reduce cognitive load.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
        <div className="flex justify-center w-full overflow-x-visible px-8 lg:px-16">
          <div className="flex w-full max-w-[1200px] flex-col items-stretch overflow-x-visible pb-32 pt-4">
            <section className="scroll-mt-28 pt-12 md:pt-16 lg:pt-20">
              <div className="grid w-full grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-16 lg:gap-24">
                <h2 className={`${aboutHeadlineClass} min-w-0`}>{aboutHeadline}</h2>

                <div className="flex min-w-0 flex-col gap-8 md:border-l md:border-black/[0.06] md:pl-12 lg:pl-16">
                  <p className={aboutBodyClass}>
                    Drawing on backgrounds in design, health sciences, and human
                    factors, I bring a systems-thinking approach to healthcare
                    technology.
                  </p>
                  <p className={aboutBodyClass}>
                    I create products that reduce cognitive burden, support better
                    clinical decisions, and help healthcare work the way it should.
                  </p>
                </div>
              </div>

              <div
                className="mt-20 flex w-full flex-col gap-0 lg:mt-28"
                aria-label="Focus areas"
              >
                <div className="flex flex-col gap-0 md:flex-row md:gap-0">
                  {aboutFeatures.map((feature) => (
                    <div
                      key={feature.title}
                      className={`flex flex-col gap-1.5 border-b border-black/10 py-6 last:border-b-0 md:flex-1 md:border-b-0 md:border-r md:py-0 md:pl-8 md:pr-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0`}
                    >
                      <span className={frxMetaEyebrowClass}>{feature.title}</span>
                      <span className={aboutMetaValueClass}>{feature.body}</span>
                    </div>
                  ))}
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
