import ContactAvailabilityCard from "../components/ContactAvailabilityCard";
import ContactHero from "../components/ContactHero";
import ContactInformation from "../components/ContactInformation";
import Footer from "../components/Footer";
import NewClientContactForm from "../components/NewClientContactForm";

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
        <div className="flex justify-center w-full overflow-x-visible px-8 lg:px-16">
          <div className="flex w-full max-w-[1200px] flex-col items-stretch overflow-x-visible pb-32 pt-4">
            <section className="scroll-mt-28 pt-12 md:pt-16 lg:pt-20">
              <div className="grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-12">
                <ContactHero />
                <ContactAvailabilityCard />
              </div>

              <div className="mt-16 grid w-full grid-cols-1 items-start gap-10 md:mt-20 lg:grid-cols-2 lg:gap-12">
                <ContactInformation />
                <NewClientContactForm />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
