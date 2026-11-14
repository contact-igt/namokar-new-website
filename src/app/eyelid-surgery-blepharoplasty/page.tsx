import UpperEyelidPositionSection from "@/components/UpperEyelidPositionSection";
import ServiceLayout, { serviceMetadata } from "@/components/ServiceLayout";
import FunctionalOrCosmeticSection from "@/components/FunctionalOrCosmeticSection";

export const metadata = serviceMetadata("eyelid");

export default function Page() {
  return (
    <ServiceLayout serviceKey="eyelid">
      {/* Exact Pixel-Perfect "Functional or Cosmetic?" Comparison Section */}
      <FunctionalOrCosmeticSection id="reasons" />

      {/* Enhanced Upper Eyelid Position Comparison Section with Table UI & Decorative Background */}
      <UpperEyelidPositionSection
        id="eyelidPosition"
        heading="Upper eyelid position"
        intro="Three simple pictures: a typical lid, a drooping lid and excess skin. They can look alike, which is why an examination matters."
      />
    </ServiceLayout>
  );
}
