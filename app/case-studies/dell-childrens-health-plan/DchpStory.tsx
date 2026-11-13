import Image from "next/image";
import type { ReactNode } from "react";

import { eyebrowClass } from "../../lib/pageStyles";
import { versionedSrc } from "../../lib/versionedSrc";

const caseBodyClass = "font-sans text-[16px] leading-[1.6] text-black md:text-[20px]";
const storyTitleClass = "w-full text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.04em]";

export type StoryPanel = { label: string; body: ReactNode };

/**
 * Pixel values are from the screenshot file. `cardLeft` and `cardWidth` locate the portal card inside
 * the transparent margins so every example’s card fills the same 380px column. `cropHeight` shows only
 * the top of a long screen.
 */
export type StoryExample = {
  title: string;
  caption: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  cardLeft: number;
  cardWidth: number;
  cropHeight?: number;
};

export default function DchpStory({
  eyebrow,
  title,
  titleId,
  headingLevel: Heading = "h2",
  panels,
  examples,
}: {
  eyebrow?: string;
  title: string;
  titleId: string;
  headingLevel?: "h2" | "h3";
  panels: readonly StoryPanel[];
  examples: readonly StoryExample[];
}) {
  const ExampleHeading = Heading === "h2" ? "h3" : "h4";

  return (
    <>
      {eyebrow ? <p className={`${eyebrowClass} mb-4`}>{eyebrow}</p> : null}
      <Heading id={titleId} className={storyTitleClass}>
        {title}
      </Heading>
      <dl className="mt-10 grid grid-cols-1 gap-4 md:mt-12 lg:grid-cols-3 lg:gap-5">
        {panels.map((panel) => (
          <div key={panel.label} className="rounded-[12px] border border-black/15 bg-white p-6">
            <dt className="font-sans text-[13px] font-bold uppercase leading-none tracking-[0.12em] text-black">
              {panel.label}
            </dt>
            <dd className={`${caseBodyClass} mt-4 [&_strong]:font-bold`}>{panel.body}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-x-8 md:gap-y-0 lg:gap-x-12">
        {examples.map((example) => {
          const imageSpan = {
            width: `${(example.width / example.cardWidth) * 100}%`,
            marginLeft: `${(-example.cardLeft / example.cardWidth) * 100}%`,
          };
          return (
            <figure key={example.src} className="m-0 grid min-w-0 gap-6 md:row-span-2 md:grid-rows-subgrid">
              <figcaption>
                <ExampleHeading className="font-sans text-[16px] font-bold leading-[1.4] text-black">
                  {example.title}
                </ExampleHeading>
                <p className={`${caseBodyClass} mt-2`}>{example.caption}</p>
              </figcaption>
              <div className="flex h-full flex-col items-center rounded-[12px] border border-black/15 bg-white p-5 sm:p-8">
                <div
                  className="relative min-h-0 w-full max-w-[380px]"
                  style={
                    example.cropHeight
                      ? {
                          aspectRatio: `${example.cardWidth} / ${example.cropHeight}`,
                          clipPath: "inset(0 -12% 0 -12%)",
                        }
                      : undefined
                  }
                >
                  <Image
                    src={versionedSrc(example.src)}
                    alt={example.alt}
                    width={example.width}
                    height={example.height}
                    sizes="(min-width: 768px) 420px, 90vw"
                    className="block h-auto max-w-none"
                    style={imageSpan}
                  />
                  {example.cropHeight ? (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-0 h-16 bg-gradient-to-b from-white/0 to-white"
                      style={imageSpan}
                    />
                  ) : null}
                </div>
              </div>
            </figure>
          );
        })}
      </div>
    </>
  );
}
