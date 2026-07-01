import Footer from "../components/Footer";
import SelectedWorkGrid from "../components/SelectedWorkGrid";
import { frxMetaEyebrowClass } from "../case-studies/frx/frxCaseStudyTypography";
import {
  allFullWorkCards,
  stackedWorkCards,
} from "../lib/selectedWorkCards";

export default function WorkPage() {
  return (
    <>
      <main className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
        <div className="flex justify-center w-full overflow-x-visible px-8 lg:px-16">
          <div className="flex flex-col items-stretch w-full max-w-[1200px] pt-4 pb-32 overflow-x-visible">
            <section className="scroll-mt-28 pt-12 md:pt-16 lg:pt-20">
              <div className="flex flex-col gap-5 md:gap-6">
                <p className={frxMetaEyebrowClass}>Case studies</p>
                <SelectedWorkGrid
                  layout="twoUp"
                  fullCards={allFullWorkCards}
                  stackedCards={stackedWorkCards}
                />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
