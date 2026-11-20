import Link from "next/link";

import { PRIMARY_FILLED_INTERACTIVE } from "./buttonTokens";

const primaryCtaClass = `inline-flex items-center gap-2 rounded-[8px] px-4 py-2.5 font-sans text-[14px] font-medium leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F2EE] ${PRIMARY_FILLED_INTERACTIVE}`;

const disabledPrimaryButtonClass = `inline-flex cursor-not-allowed items-center gap-2 rounded-[8px] px-4 py-2.5 font-sans text-[14px] font-medium leading-none opacity-45 ${PRIMARY_FILLED_INTERACTIVE} hover:bg-[#1F2621]`;

export default function CaseStudyCardCtas({ href }: { href?: string }) {
  return (
    <div className="flex flex-col items-start gap-3 md:justify-self-end md:items-end">
      {href ? (
        <Link href={href} className={primaryCtaClass}>
          View case study
        </Link>
      ) : (
        <>
          <button type="button" disabled className={disabledPrimaryButtonClass}>
            View case study
          </button>
          <span className="border border-black/15 px-2.5 py-1 font-sans text-[13px] leading-none text-black/70">
            Case study coming soon
          </span>
        </>
      )}
    </div>
  );
}
