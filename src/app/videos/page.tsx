import type { Metadata } from "next";
import { pageMeta, withBrand } from "@/lib/seo";
import { notFound } from "next/navigation";
import BookButton from "@/components/BookButton";
import CtaBand from "@/components/CtaBand";
import HelpPanel from "@/components/HelpPanel";
import PageHero from "@/components/PageHero";
import VideoPlayer from "@/components/VideoPlayer";

import { CATEGORY_LABEL, CHANNEL, type VideoCategory, allPlayable, libraryAvailable } from "@/content/videos";
import { onlineBookingAvailable } from "@/lib/booking";
import { playerProps } from "@/lib/videoProps";

export const metadata: Metadata = pageMeta("videos", {
  title: withBrand("Eye Care Videos & Insights"),
  description:
    "Videos from Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi: a look inside the centre, meeting the doctor and general eye-health information.",
});

const ORDER: VideoCategory[] = ["inside", "doctor", "education", "treatment"];

/**
 * Hidden (404, not in navigation or the sitemap) until at least three videos are approved.
 * Reviewers see it in the local preview, where every candidate carries a "Preview only" tag.
 */
export default function VideosPage() {
  if (!libraryAvailable()) notFound();
  const online = onlineBookingAvailable();
  const videos = allPlayable();
  return (
    <main id="main">
      <PageHero
        crumb="Videos"
        title="Eye Care Videos & Insights"
        lead="A look inside the centre, the doctor in her own words, and short general explanations of eye conditions and treatments."
        actions={<BookButton online={online} />}
        aside={<HelpPanel heading="Speak to the centre" />}
      />
      <section className="section section--tight" aria-label="Videos">
        <div className="container vlib">
          {ORDER.map((cat) => {
            const group = videos.filter((v) => v.category === cat);
            if (!group.length) return null;
            return (
              <div key={cat} className="vlib-group">
                <h2 className="h2 h2--sm">{CATEGORY_LABEL[cat]}</h2>
                <div className="vlib-grid">
                  {group.map((v) => (
                    <VideoPlayer key={v.id} v={playerProps(v)} showMeta sizes="(min-width: 960px) 30vw, (min-width: 768px) 45vw, 100vw" />
                  ))}
                </div>
              </div>
            );
          })}
          <p className="vsec-note">
            More on the centre&apos;s YouTube channel,{" "}
            <a href={CHANNEL.url} target="_blank" rel="noopener noreferrer" className="text-link">
              {CHANNEL.name}<span className="sr-only"> (opens in a new tab)</span>
            </a>
            . These videos are general information, not medical advice.
          </p>
        </div>
      </section>
      <CtaBand
        id="videos-cta-h"
        heading="Have a question about your eyes?"
        lead="Contact the centre to plan your visit or arrange an eye consultation."
        online={online}
      />
    </main>
  );
}
