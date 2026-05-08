import Link from "next/link";

import { PRIMARY_FILLED_INTERACTIVE } from "./buttonTokens";
import type { CaseStudyPath } from "../lib/caseStudyLoop";
import { nextCaseStudyPath } from "../lib/caseStudyLoop";

export default function CaseStudyNextProjectButton({
  currentPath,
}: {
  currentPath: CaseStudyPath;
}) {
  const href = nextCaseStudyPath(currentPath);

  return (
    <div className="mt-16 flex w-full justify-center md:mt-20">
      <Link
        href={href}
        className={`inline-flex h-12 items-center gap-2 rounded-2xl px-5 font-sans text-[16px] font-semibold leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] ${PRIMARY_FILLED_INTERACTIVE}`}
      >
        <span>Next project</span>
        <span aria-hidden className="text-[18px] font-normal leading-none">
          →
        </span>
      </Link>
    </div>
  );
}
