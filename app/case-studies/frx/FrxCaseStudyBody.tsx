import type { ReactNode } from "react";

import FrxBelowHero from "./FrxBelowHero";
import FrxChallengeCard from "./FrxChallengeCard";
import { FrxSectionsBeforeSolution } from "./FrxExtendedSections";
import FrxImpactSection from "./FrxImpactSection";
import { frxNavScrollMtClass } from "./frxCaseStudyNav";

function NavAnchor({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div id={id} data-frx-case-study-section="" className={frxNavScrollMtClass}>
      {children}
    </div>
  );
}

/** Overview → Challenge → Strategy/Prototyping → Impact (hero lives in FrxCaseStudyView). */
export default function FrxCaseStudyBody() {
  return (
    <>
      <NavAnchor id="frx-nav-overview">
        <FrxBelowHero />
      </NavAnchor>

      <FrxChallengeCard />

      <FrxSectionsBeforeSolution />

      <FrxImpactSection />
    </>
  );
}
