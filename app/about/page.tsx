import Footer from "../components/Footer";
import { frxStrategyHeadlineClass } from "../case-studies/frx/FrxExtendedSections";
import {
  frxMetaEyebrowClass,
  frxSectionBodyClass,
} from "../case-studies/frx/frxCaseStudyTypography";

const aboutFeatureCardClass =
  "flex min-h-0 min-w-0 flex-col gap-3 rounded-2xl border border-black/10 bg-white px-6 py-7 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.25)] md:gap-4 md:px-7 md:py-8";

const aboutFeatureTitleClass =
  "font-sans text-[clamp(18px,2vw,22px)] font-semibold leading-[1.2] tracking-[-0.02em] text-black";

const aboutFeatureBodyClass =
  "font-sans text-[14px] font-normal leading-[1.55] text-black/70 md:text-[15px]";

const aboutHeadline =
  "I believe that the best healthcare technology gets out of the way, so care teams can focus on caring for people.";

const aboutBackgroundBody =
  "My background spans design, health sciences, and human factors engineering, giving me a unique perspective on how people interact with complex healthcare systems.";

const aboutSupportingBody =
  "I create products that reduce cognitive burden, support better clinical decisions, and help technology feel like a partner instead of an obstacle.";

const aboutFeatures = [
  {
    title: "Systems Thinking",
    body: "Connecting people, processes, and technology into cohesive systems.",
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
    title: "Information Design",
    body: "Organizing information so the right details appear at the right time.",
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
                <div className="flex min-w-0 flex-col gap-5 md:gap-6">
                  <p className={frxMetaEyebrowClass}>About me</p>
                  <h1 className={`${frxStrategyHeadlineClass} min-w-0`}>
                    {aboutHeadline}
                  </h1>
                  <p className={frxSectionBodyClass}>{aboutBackgroundBody}</p>
                  <p className={frxSectionBodyClass}>{aboutSupportingBody}</p>
                </div>

                <div className="min-w-0 md:pl-12 lg:pl-16">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/photo/11.jpg"
                    alt="David Pindrys"
                    className="block h-auto w-full rounded-2xl object-cover"
                  />
                </div>
              </div>

              <div
                className="mt-20 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4 lg:gap-5"
                aria-label="Focus areas"
              >
                {aboutFeatures.map((feature) => (
                  <article key={feature.title} className={aboutFeatureCardClass}>
                    <h3 className={aboutFeatureTitleClass}>{feature.title}</h3>
                    <p className={aboutFeatureBodyClass}>{feature.body}</p>
                  </article>
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
