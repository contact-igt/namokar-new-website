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
          heading={<>Speak to the centre <span className="title-secondary">about your eyes.</span></>}
          desc="Contact the centre to plan your visit or arrange an eye consultation."
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
        heading={<>When an eyelid turns <span className="title-secondary">inwards or outwards</span></>}
        intro="A comparison of a typical eyelid, an inward-turning eyelid (entropion) and an outward-turning eyelid (ectropion)."
      />
    </ServiceLayout>
  );
}
