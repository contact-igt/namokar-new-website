import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";
import RealisticExpectationsSection from "@/components/RealisticExpectationsSection";
import styles from "./aesthetic-backgrounds.module.css";

export const metadata = serviceMetadata("aesthetic");

export default function Page() {
  return (
    <ServiceLayout serviceKey="aesthetic" className={styles.page}>
      {/* Combined Realistic Expectations & Consultation Questions Section */}
      <RealisticExpectationsSection id="expectations" />
    </ServiceLayout>
  );
}
