import Footer from "../components/Footer";
import { frxStrategyHeadlineClass } from "../case-studies/frx/FrxExtendedSections";
import { frxSectionBodyClass } from "../case-studies/frx/frxCaseStudyTypography";

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
        <div className="flex justify-center w-full overflow-x-visible px-8 lg:px-16">
          <div className="flex flex-col items-stretch w-full max-w-[1200px] pt-4 pb-32 overflow-x-visible">
            <section className="scroll-mt-28 pt-8 md:pt-12 lg:pt-16">
              <h1 className={frxStrategyHeadlineClass}>About</h1>
              <p className={`${frxSectionBodyClass} mt-5 max-w-[42rem] md:mt-6`}>
                Placeholder — this page will expand on background, approach, and how
                I partner with clinical and engineering teams.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
