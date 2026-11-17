import ClinicalFigure from "@/components/clinical/ClinicalFigure";
import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";
import FunctionalOrCosmeticSection from "@/components/FunctionalOrCosmeticSection";
import styles from "./blepharoplasty-backgrounds.module.css";

export const metadata = serviceMetadata("eyelid");

export default function Page() {
  return (
    <ServiceLayout serviceKey="eyelid" className={styles.page}>
      {/* Exact Pixel-Perfect "Functional or Cosmetic?" Comparison Section */}
      <FunctionalOrCosmeticSection id="reasons" />

      {/* Clinical Figure with matching Reconstructive-style comparison table */}
      <ClinicalFigure
        id="eyelidPosition"
        heading={<>Upper eyelid <span className="title-secondary">position</span></>}
        intro="Three simple pictures: a typical lid, a drooping lid and excess skin. They can look alike, which is why an examination matters."
      />
    </ServiceLayout>
  );
}
