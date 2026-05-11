import Image from "next/image";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CaseStudyNextProjectButton from "../../components/CaseStudyNextProjectButton";

const dchpBelowHeroMeta = [
  { label: "Role", value: "Product Design Lead" },
  { label: "Timeline", value: "6 months" },
  { label: "Status", value: "Deployed enterprise-wide" },
] as const;

const eyebrowClass =
  "font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800";
const titleClass =
  "w-full font-sans text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black";
const bodyClass =
  "w-full font-sans text-[22px] font-normal leading-[1.45] text-black/80 md:text-[24px]";
const cardClass =
  "rounded-2xl bg-[#E8E6E1] px-8 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14";
const testimonialCardClass =
  "rounded-2xl border border-black/10 bg-white/50 p-8 text-left";

const FRAMER_URL = "https://dpindrys.framer.website/dchp";

const dchpSummaryBody =
  "Leading design and research for the member experience across web and mobile, I created new workflows for care team selection, physical ID card requests, and prior authorization review, helping transform the portal from a static information hub into a more actionable healthcare experience. The platform launched enterprise-wide within Ascension.";

const dchpTeamBody =
  "Product owner, product manager, system architect, front-end engineers, data engineers, and myself";

export default function DellChildrensCaseStudyPage() {
  return (
    <>
      <main className="min-h-screen overflow-x-visible bg-[#F4F2EE]">
        <div className="flex w-full justify-center overflow-x-visible px-8 lg:px-16">
          <div className="flex w-full max-w-[1200px] flex-col items-stretch overflow-x-visible pb-32 pt-12">
            <Header
              leftVariant="back"
              backHref="/"
              backAriaLabel="Back to home"
            />

            <section className="mt-24 flex w-full flex-col gap-6 md:mt-32 lg:mt-36">
              <p className={eyebrowClass}>Ascension · Dell Children&apos;s Health Plan</p>
              <h1 className="max-w-[1291px] font-sans text-[clamp(32px,4.8vw,64px)] font-semibold leading-[1.305] text-black">
                Responsive Care Access
              </h1>
              <p className="font-sans text-[16px] leading-[1.5] text-black/60">
                <a
                  href={FRAMER_URL}
                  className="text-black underline decoration-black/30 underline-offset-[0.2em] transition-colors hover:decoration-black/60"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open full preview on Framer
                </a>
                <span aria-hidden> ↗</span>
              </p>
            </section>

            <section className="mt-16 w-full md:mt-24 lg:mt-28">
              <div className="relative w-full overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dellchildrens/responsive-home.png"
                  alt="Dell Children's Health Plan responsive member portal home"
                  className="block h-auto w-full"
                />
              </div>
            </section>

            <section
              className="mt-8 flex w-full flex-col gap-16 md:mt-10 lg:mt-12"
              aria-label="Project context"
            >
              <div className="flex flex-col gap-0 md:flex-row md:gap-0">
                {dchpBelowHeroMeta.map((item, i) => (
                  <div
                    key={`${item.label}-${i}`}
                    className="flex flex-col gap-1.5 border-b border-black/10 py-6 last:border-b-0 md:flex-1 md:border-b-0 md:border-r md:py-0 md:pl-8 md:pr-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                  >
                    <span className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                      {item.label}
                    </span>
                    <span className="font-sans text-[16px] font-semibold leading-[1.5] text-black">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex w-full flex-col gap-6 sm:gap-7">
                <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:items-start md:gap-10">
                  <div className="flex min-h-0 w-full flex-col gap-6 text-left md:h-full md:min-h-0 md:gap-0">
                    <div className="flex shrink-0 flex-col gap-6">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                          SUMMARY
                        </span>
                        <p className="font-sans text-[16px] font-normal leading-[1.5] text-black">
                          {dchpSummaryBody}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="font-sans text-[12px] font-normal uppercase tracking-[0.12em] text-gray-800">
                          TEAM
                        </span>
                        <p className="font-sans text-[16px] font-normal leading-[1.5] text-black">
                          {dchpTeamBody}
                        </p>
                      </div>
                    </div>
                  </div>

                  <figure className={`${testimonialCardClass} flex min-h-0 min-w-0 w-full flex-col gap-6`}>
                    <blockquote className="font-sans text-[16px] font-normal leading-[1.5] text-black">
                      &ldquo;David designed previously unavailable Ascension portal workflows (care
                      team/PCP designation, ID card requests, prior auth) and partnered effectively
                      across product, engineering, and data to keep delivery moving.&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full">
                        <Image
                          src="/images/steven.png"
                          alt="Steven Long"
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <figcaption className="flex flex-col gap-0.5">
                        <span className="font-sans text-[16px] font-semibold leading-[1.5] text-black">
                          Steven Long
                        </span>
                        <span className="font-sans text-[16px] font-normal leading-[1.5] text-black/50">
                          Product Manager, Ascension Studio
                        </span>
                      </figcaption>
                    </div>
                  </figure>
                </div>
              </div>
            </section>

            <section
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="dchp-problem-heading"
            >
              <div className={cardClass}>
                <p className={eyebrowClass}>The problem</p>
                <h2 id="dchp-problem-heading" className={`${titleClass} mt-4 md:mt-5`}>
                  Existing patient portal home
                </h2>
                <p className={`${bodyClass} mt-5 md:mt-6`}>
                  Before redesign, the Dell Children&apos;s portal greeted members with a
                  generic, impersonal message—closer to e-commerce than a trusted health
                  platform. Plan overview and quick links were overloaded with redundant or
                  unclear content, and the experience offered little personalized guidance for
                  managing care.
                </p>
              </div>
            </section>

            <section
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="dchp-before-after-heading"
            >
              <p className={eyebrowClass}>Before and after</p>
              <h2 id="dchp-before-after-heading" className={`${titleClass} mt-4 md:mt-5`}>
                A clearer first impression
              </h2>
              <div className="mt-8 grid w-full grid-cols-1 gap-8 md:mt-10 md:grid-cols-2 md:gap-10">
                <div className="rounded-2xl border border-black/10 bg-white/60 p-6 md:p-8">
                  <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-black/45">
                    Before
                  </p>
                  <p className={`${bodyClass} mt-3 text-[18px] md:text-[20px]`}>
                    The logged-in experience felt cold and generic, with unclear plan info and
                    disorganized links that confused more than helped.
                  </p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white/60 p-6 md:p-8">
                  <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-black/45">
                    After
                  </p>
                  <p className={`${bodyClass} mt-3 text-[18px] md:text-[20px]`}>
                    The dashboard feels personal and purposeful—greeting members by name and
                    surfacing the most relevant tools and actions up front.
                  </p>
                </div>
              </div>
            </section>

            <section
              className="mt-16 w-full md:mt-20 lg:mt-24"
              aria-labelledby="dchp-mobile-heading"
            >
              <p className={eyebrowClass}>A mobile-first experience</p>
              <h2 id="dchp-mobile-heading" className={`${titleClass} mt-4 md:mt-5`}>
                Mobile-first, member-centered
              </h2>
              <p className={`${bodyClass} mt-5 md:mt-6`}>
                Built for parents managing children&apos;s care on the go: clear hierarchy,
                personalization, and immediate utility—care teams, claims, ID cards, and other
                tasks—within Ascension&apos;s brand system.
              </p>
              <p className={`${bodyClass} mt-6 md:mt-8`}>
                <span className="font-semibold text-black/90">Streamlined access, real-world tasks.</span>{" "}
                From choosing a primary care provider to downloading ID cards, flows were
                simplified for small screens with member names and action-driven labels to
                reduce friction.
              </p>
            </section>

            <CaseStudyNextProjectButton currentPath="/case-studies/dell-childrens" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
