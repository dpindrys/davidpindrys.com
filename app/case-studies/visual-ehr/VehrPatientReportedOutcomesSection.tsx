import ZoomableProblemImage from "../../components/ZoomableProblemImage";
import { mediaCardClass } from "../frx/FrxExtendedSections";
import {
  frxCenteredIntroBlockClass,
  frxSectionBodyClass,
  frxSectionIntroStackClass,
  frxSectionTitleClass,
} from "../frx/frxCaseStudyTypography";

const imageShellClass = "flex min-h-0 min-w-0 w-full [&_button]:w-full";

const imageClass = "block w-full rounded-md border-0 object-contain";

export default function VehrSymptomsOnTimelineSection() {
  return (
    <article
      aria-labelledby="vehr-symptoms-on-timeline-heading"
      className="flex w-full flex-col gap-10 md:gap-12 lg:gap-14"
    >
      <div className={frxCenteredIntroBlockClass}>
        <div className={frxSectionIntroStackClass}>
          <h3
            id="vehr-symptoms-on-timeline-heading"
            className={`scroll-mt-28 ${frxSectionTitleClass}`}
          >
            Symptoms on the Timeline
          </h3>
          <p className={frxSectionBodyClass}>
            Fatigue, thirst, and insomnia align to the same visit columns as
            encounters, labs, and medications. Burden intensifies into Sep 09 and
            eases across PCP and telehealth—so patient-reported change reads with
            the clinical events around it.
          </p>
        </div>
      </div>

      <div className={`${mediaCardClass} w-full min-w-0`}>
        <ZoomableProblemImage
          src="/images/vehr/diagnoses-encounters.png"
          alt="Diagnoses and encounters aligned on shared timeline visit columns"
          shellClassName={imageShellClass}
          imgClassName={imageClass}
          elevateOnHover={false}
        />
      </div>

      <div className={frxCenteredIntroBlockClass}>
        <div className={frxSectionIntroStackClass}>
          <h3
            id="vehr-glanceable-signal-heading"
            className={`scroll-mt-28 ${frxSectionTitleClass}`}
          >
            Reducing trend interpretation into glanceable signal
          </h3>
          <p className={frxSectionBodyClass}>
            Traditional EHRs present labs as tables or overlapping trend lines,
            forcing clinicians to mentally reconstruct severity, direction, and
            timing. I redesigned longitudinal vitals and labs as an aligned
            heatmap so abnormality, improvement, and persistence become visually
            scannable across visits.
          </p>
        </div>
      </div>

      <div className={`${mediaCardClass} w-full min-w-0`}>
        <ZoomableProblemImage
          src="/images/vehr/vitalsandlabs.png"
          alt="Longitudinal vitals and labs as an aligned heatmap across visits"
          shellClassName={imageShellClass}
          imgClassName={imageClass}
          elevateOnHover={false}
        />
      </div>

      <div className={`${mediaCardClass} w-full min-w-0`}>
        <ZoomableProblemImage
          src="/images/vehr/patientreported.png"
          alt="Patient-reported outcomes aligned on the shared timeline heatmap"
          shellClassName={imageShellClass}
          imgClassName={imageClass}
          elevateOnHover={false}
        />
      </div>
    </article>
  );
}
