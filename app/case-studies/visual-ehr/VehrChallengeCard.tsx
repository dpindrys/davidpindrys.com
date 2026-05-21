import { vehrChallengeClusters, vehrChallengeIntro } from "./vehrChallengeData";
import VehrChallengeProblemCarousel from "./VehrChallengeProblemCarousel";
import {
  frxPaddedEyebrowClass,
  frxSectionBodyClass,
} from "../frx/frxCaseStudyTypography";

const vehrChallengeTitleClass =
  "font-sans text-[clamp(22px,2.8vw,32px)] font-semibold leading-[1.25] tracking-[-0.01em] text-black";

export default function VehrChallengeCard() {
  return (
    <section
      className="relative mt-24 w-[calc(100%+4rem)] max-w-none -mx-8 rounded-2xl bg-[#E8E6E1] py-12 md:mt-32 md:py-16 lg:mt-40 lg:py-20 lg:w-[calc(100%+8rem)] lg:-mx-16"
      aria-labelledby="vehr-challenge-heading"
    >
      <p className={`left-8 lg:left-16 ${frxPaddedEyebrowClass}`}>Challenge</p>

      <div className="px-8 lg:px-16">
        <header className="w-full">
          <h2 id="vehr-challenge-heading" className={vehrChallengeTitleClass}>
            {vehrChallengeIntro.title}
          </h2>
          <p className={`${frxSectionBodyClass} mt-5 max-w-none md:mt-6`}>
            {vehrChallengeIntro.body}
          </p>
        </header>

        <VehrChallengeProblemCarousel clusters={vehrChallengeClusters} />
      </div>
    </section>
  );
}
