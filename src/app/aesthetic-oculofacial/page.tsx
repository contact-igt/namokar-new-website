import ServiceLayout from "@/components/ServiceLayout";
import RealisticExpectationsSection from "@/components/RealisticExpectationsSection";
import WhatIsAestheticOculoplasty from "@/components/WhatIsAestheticOculoplasty";
import AestheticConditionsSection from "@/components/AestheticConditionsSection";
import AssessmentJourneySection from "@/components/AssessmentJourneySection";
import AestheticVideosSection from "@/components/AestheticVideosSection";
import HomeCta from "@/components/HomeCta";
import { LINKS, TEL_HREF } from "@/config/site";
import { SERVICE_CONTENT } from "@/content/services";
import { videosFor } from "@/content/videos";
import { onlineBookingAvailable } from "@/lib/booking";
import { pageMeta } from "@/lib/seo";
import styles from "./aesthetic-backgrounds.module.css";
import RisksAndRecovery from "./RisksAndRecovery";

const content = SERVICE_CONTENT.aesthetic;
export const metadata = pageMeta("aesthetic", {
  title: `${content.metaTitle} | Namokar`,
  description: content.metaDescription,
});

export default function Page() {
  const online = onlineBookingAvailable();
  const bookingHref = online ? `${LINKS.contact}#request` : TEL_HREF;
  return (
    <ServiceLayout
      serviceKey="aesthetic"
      className={styles.page}
      overview={<WhatIsAestheticOculoplasty id="overview" paragraphs={content.intro} buttonHref={bookingHref} />}
      afterEditorial={
        <>
          <AestheticConditionsSection
            kicker="Understanding Your Concerns"
            heading={content.seekHelp.heading}
            lead="Explore common concerns involving the eyelids and surrounding eye area. An assessment helps identify the cause and whether treatment may be appropriate."
            note={content.seekHelp.note}
          />
          <AssessmentJourneySection
            id="journey"
            kicker="Your Aesthetic Care Journey"
            heading="What an Aesthetic Oculoplasty Assessment Involves"
            lead={content.journeyLead}
            journey={content.journey}
          />
          <RisksAndRecovery />
        </>
      }
      video={<AestheticVideosSection
        videos={videosFor("aesthetic")}
        kicker="Insights from Your Doctor"
        heading="Understanding Aesthetic Eye Care with Dr. Poonam Jain"
        lead="Explore educational videos about periocular concerns, under-eye changes, dark circles and medically appropriate treatment."
        note=""
      />}
      closing={<HomeCta
        online={online}
        id="aesthetic-cta"
        kicker="Specialised Periocular Care"
        heading="Book Your Aesthetic Oculoplasty Consultation"
        desc="Considering treatment for heavy eyelids, under-eye bags, hollowness or age-related changes around your eyes? Consult Dr. Poonam Jain for a detailed assessment and personalised guidance on suitable options."
        note="See Better. Look Better."
        onlineBookingLabel="Request a Consultation"
      />}
    >
      <RealisticExpectationsSection id="expectations" bookingHref={bookingHref} />
    </ServiceLayout>
  );
}
