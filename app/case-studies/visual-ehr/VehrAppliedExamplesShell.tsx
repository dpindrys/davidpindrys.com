import type { ReactNode } from "react";

import { vehrEyebrowClass, vehrSectionGapClass } from "./vehrCaseStudySectionTokens";

export default function VehrAppliedExamplesShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section
      className={vehrSectionGapClass}
      aria-label="The clinical story across domains"
    >
      <p className={vehrEyebrowClass}>The clinical story across domains</p>

      <div className="mt-4 flex flex-col gap-16 md:mt-5 md:gap-20 lg:gap-24">
        {children}
      </div>
    </section>
  );
}
