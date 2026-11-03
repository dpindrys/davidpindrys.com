const quotes = [
  {
    quote:
      "David didn’t just hand off designs—he stayed engaged through the pilot, tackled edge cases, and iterated until the solution worked in the real world, not just in Figma.",
    name: "Mahesh",
    title: "Lead Salesforce Engineer",
    company: "Fresenius Medical Care",
    avatarSrc: "/images/mahesh.png",
    href: "https://www.linkedin.com/in/sai-mahesh-0525/",
  },
  {
    quote:
      "As a first-time founder, David’s guidance was crucial. His work greatly advanced our team’s quality and timeline.",
    name: "Dr. Cole Marolf",
    title: "Practicing clinician & Founder",
    company: "VEHR Technologies",
    avatarSrc: "/images/cole.png",
    href: "https://health.usnews.com/doctors/cole-marolf-1431490",
    linkIconSrc: "/images/pluscase.png",
  },
  {
    quote:
      "David took the time to deeply understand my workflow, challenges, and goals, ensuring the application wasn’t just functional—it was useful and intuitive for our team.",
    name: "Samantha Ramsey",
    title: "Nursing Informatics Director",
    company: "Fresenius Medical Care",
    avatarSrc: "/images/samantha.png",
    href: "https://www.linkedin.com/in/samantha-ramsey-msn-rn-cnn-02bb8880/",
  },
  {
    quote:
      "David’s remarkable initiative in building our UI/UX architecture from scratch has been nothing short of impressive.",
    name: "Larissa Doronina",
    title: "Principal UX Architect",
    company: "Fresenius Medical Care",
    avatarSrc: "/images/larissa.png",
    href: "https://www.linkedin.com/in/ldoronina/",
  },
  {
    quote:
      "David designed previously unavailable Ascension portal workflows (care team/PCP designation, ID card requests, prior auth) and partnered effectively across product, engineering, and data to keep delivery moving.",
    name: "Steven Long",
    title: "Product Manager",
    company: "Ascension Studio",
    avatarSrc: "/images/steven.png",
    href: "https://www.linkedin.com/in/steven-long-5a040419/",
  },
  {
    quote:
      "Knowing David had already done the hard work to create a trustworthy design freed me to focus on implementation and helped streamline our team’s workflow.",
    name: "Clint Smith",
    title: "Backend Software Engineer",
    company: "Included Health",
    avatarSrc: "/images/clint.png",
    href: "https://www.linkedin.com/in/clintsmithmaui/",
  },
] as const;

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function ColleagueQuotes() {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {quotes.map((item) => {
        const linkedIn = item.href.includes("linkedin.com");
        return (
          <li key={item.name} className="flex">
            <figure className="relative flex h-full w-full flex-col border border-black/10 bg-white p-5">
              <blockquote className="font-sans text-[15px] leading-[1.55] text-black/80">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 pr-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.avatarSrc}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="font-sans text-[15px] font-medium leading-[1.35] text-black">{item.name}</p>
                  <p className="font-sans text-[13px] leading-[1.4] text-black/55">{item.title}</p>
                  <p className="font-sans text-[13px] leading-[1.4] text-black/55">{item.company}</p>
                </div>
              </figcaption>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={linkedIn ? `${item.name} on LinkedIn` : `${item.name} profile`}
                className="group absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center text-[#0A66C2] hover:text-[#004182]"
              >
                {"linkIconSrc" in item ? (
                  <span
                    aria-hidden
                    className="h-[22px] w-[22px] shrink-0 bg-current opacity-85 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                    style={{
                      maskImage: `url(${item.linkIconSrc})`,
                      WebkitMaskImage: `url(${item.linkIconSrc})`,
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                    }}
                  />
                ) : (
                  <LinkedInIcon />
                )}
              </a>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
