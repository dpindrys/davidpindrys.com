import Footer from "../components/Footer";
import SelectedWorkGrid from "../components/SelectedWorkGrid";
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
            <section className="scroll-mt-28 pt-8 md:pt-12 lg:pt-16">
              <SelectedWorkGrid
                fullCards={allFullWorkCards}
                stackedCards={stackedWorkCards}
              />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
