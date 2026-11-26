import type { Metadata } from "next";
import BookButton from "@/components/BookButton";
import PageHero from "@/components/PageHero";
import { LINKS, serviceByKey } from "@/config/site";
import { onlineBookingAvailable } from "@/lib/booking";
import { pageMeta, withBrand } from "@/lib/seo";

const service = serviceByKey("retina");

export const metadata: Metadata = pageMeta("retina", {
  title: withBrand(service.title),
  description: service.blurb,
});

export default function Page() {
  return (
    <main id="main">
      <PageHero
        crumb={service.title}
        trail={[{ label: "Our Services", href: LINKS.allServices }]}
        title={service.title}
        lead={service.blurb}
        actions={<BookButton online={onlineBookingAvailable()} />}
      />
    </main>
  );
}
