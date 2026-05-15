import VehrCoreProblemBlock from "./VehrCoreProblemSection";
import VehrManifestationsBlock from "./VehrManifestationsSection";
import {
  vehrProblemCardClass,
  vehrSectionGapClass,
} from "./vehrCaseStudySectionTokens";

export default function VehrProblemArcSection() {
  return (
    <section
      className={vehrSectionGapClass}
      aria-labelledby="vehr-master-problem-heading"
    >
      <div className={vehrProblemCardClass}>
        <VehrCoreProblemBlock />
        <VehrManifestationsBlock />
      </div>
    </section>
  );
}
