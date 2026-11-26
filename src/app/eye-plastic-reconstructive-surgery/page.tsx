import { TriangleAlert } from "lucide-react";
import ClinicalFigure from "@/components/clinical/ClinicalFigure";
import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";
import ReconstructiveTermsSection from "@/components/ReconstructiveTermsSection";
import TearPathwaySection from "@/components/TearPathwaySection";
import HomeCta from "@/components/HomeCta";
import styles from "./reconstructive-backgrounds.module.css";

export const metadata = serviceMetadata("reconstructive");

export default function Page() {
  return (
    <ServiceLayout
      serviceKey="reconstructive"
      className={styles.page}
      closing={
        <HomeCta
          id="reconstructive-cta"
          kicker="Specialised Reconstructive Eye Care"
          heading={<>Book Your <span className="title-secondary">Reconstructive Oculoplasty Consultation</span></>}
          desc="Experiencing drooping eyelids, persistent watering, inward or outward-turning eyelids, or other functional eye concerns? Consult Dr. Poonam Jain for a detailed oculoplastic assessment and personalised treatment guidance."
          onlineBookingLabel="Request a Consultation"
          showContactDetails
          callLabel="Call the Centre"
        />
      }
    >
      <ReconstructiveTermsSection id="terms" />

      {/* Exact UI: How tears drain, and what a blockage can mean */}
      <TearPathwaySection id="tearPathway" />

      <ClinicalFigure
        id="lidMalposition"
        eyebrow="Understanding Eyelid Malposition"
        heading={<>When an eyelid turns <span className="title-secondary">inwards or outwards</span></>}
        intro="The eyelids help protect the surface of the eye, distribute tears and maintain comfort. This comparison shows a typical eyelid, entropion and ectropion. An eye examination is needed to determine the cause, severity and appropriate treatment."
      />
      <div className="container">
        <aside className={styles.urgentCare} aria-labelledby="urgent-eye-care">
          <span className={styles.urgentIcon}><TriangleAlert aria-hidden="true" /></span>
          <div>
            <h2 id="urgent-eye-care">When should you seek urgent eye care?</h2>
            <p>Seek immediate emergency assessment for sudden eyelid drooping, sudden vision loss, new double vision, severe eye pain, rapidly increasing swelling or bulging of the eye, or fever with painful swelling around the eye.</p>
            <p>Pain with eye movement or a significant eye or eyelid injury also needs urgent assessment.</p>
            <p><strong>Do not wait for a routine appointment.</strong></p>
          </div>
        </aside>
      </div>
    </ServiceLayout>
  );
}
