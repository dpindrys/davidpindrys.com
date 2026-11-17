import { companyNameClass } from "../lib/pageStyles";

export default function CaseStudyCardHeader({
  id,
  client,
  tagline,
  taglineClass,
}: {
  id: string;
  client: string;
  tagline: string;
  taglineClass: string;
}) {
  return (
    <div className="min-w-0">
      <h3 id={`${id}-title`} className={companyNameClass}>
        {client}
      </h3>
      <p className={taglineClass}>{tagline}</p>
    </div>
  );
}
