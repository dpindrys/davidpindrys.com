import Footer from "../components/Footer";
import NewClientContactForm from "../components/NewClientContactForm";
import {
  frxMetaEyebrowClass,
  frxSectionBodyClass,
} from "../case-studies/frx/frxCaseStudyTypography";

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
        <div className="flex justify-center w-full overflow-x-visible px-8 lg:px-16">
          <div className="flex flex-col items-stretch w-full max-w-[1200px] pt-4 pb-32 overflow-x-visible">
            <section className="scroll-mt-28 pt-12 md:pt-16 lg:pt-20">
              <p className={frxMetaEyebrowClass}>Contact me</p>
              <p className={`${frxSectionBodyClass} mt-5 max-w-[42rem] md:mt-6`}>
                New client inquiries — share a bit about your product, team, and
                timeline. I typically respond within a few business days.
              </p>
              <div className="mt-10 md:mt-12">
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
