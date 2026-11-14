import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";
import RealisticExpectationsSection from "@/components/RealisticExpectationsSection";

export const metadata = serviceMetadata("aesthetic");

export default function Page() {
  return (
    <ServiceLayout serviceKey="aesthetic">
      {/* Combined Realistic Expectations & Consultation Questions Section */}
      <RealisticExpectationsSection id="expectations" />
    </ServiceLayout>
  );
}
