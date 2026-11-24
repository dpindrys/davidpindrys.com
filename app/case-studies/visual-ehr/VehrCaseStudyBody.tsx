import type { ReactNode } from "react";

import {
  frxCenteredIntroBlockClass,
  frxCenteredIntroSectionClass,
  frxSectionBodyClass,
  frxStrategyHeadlineClass,
} from "../frx/frxCaseStudyTypography";
import VehrAppliedExamplesShell from "./VehrAppliedExamplesShell";
import VehrBelowHero from "./VehrBelowHero";
import VehrChallengeCard from "./VehrChallengeCard";
import VehrClosingSections from "./VehrClosingSections";
import VehrGroundworkSection from "./VehrGroundworkSection";
import VehrSymptomsOnTimelineSection from "./VehrPatientReportedOutcomesSection";
import VehrStrategySection from "./VehrStrategySection";
import { vehrProductContext } from "./vehrBelowHeroData";
import { vehrNavScrollMtClass } from "./vehrCaseStudyNav";

function NavAnchor({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div id={id} data-vehr-case-study-section="" className={vehrNavScrollMtClass}>
      {children}
    </div>
  );
}

/** Overview → Challenge → Strategy → Groundwork → Examples → Prototype. */
export default function VehrCaseStudyBody() {
  return (
    <>
      <NavAnchor id="vehr-nav-overview">
        <VehrBelowHero />
        <section
          className={frxCenteredIntroSectionClass}
          aria-labelledby="vehr-product-context-heading"
        >
          <div className={frxCenteredIntroBlockClass}>
            <h2
              id="vehr-product-context-heading"
              className={frxStrategyHeadlineClass}
            >
              {vehrProductContext.title}
            </h2>
            <p className={frxSectionBodyClass}>{vehrProductContext.body}</p>
          </div>
        </section>
      </NavAnchor>

      <VehrChallengeCard />

      <VehrStrategySection />

      <VehrGroundworkSection />

      <NavAnchor id="vehr-nav-examples">
        <VehrAppliedExamplesShell>
          <VehrSymptomsOnTimelineSection />
        </VehrAppliedExamplesShell>
      </NavAnchor>

      <NavAnchor id="vehr-nav-prototype">
        <VehrClosingSections />
      </NavAnchor>
    </>
  );
}
