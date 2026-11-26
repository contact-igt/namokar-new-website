import ServiceVideoCarousel from "@/components/ServiceVideoCarousel";
import HeadingText from "@/components/HeadingText";
import type { ReactNode } from "react";
import type { VideoItem } from "@/content/videos";
import { CATEGORY_LABEL } from "@/content/videos";
import CataractVideoCard from "@/app/stitchless-cataract-surgery/CataractVideoCard";
import styles from "./AestheticVideosSection.module.css";

interface AestheticVideosSectionProps {
  id?: string;
  videos?: VideoItem[];
  kicker?: string;
  heading?: ReactNode;
  lead?: string;
  note?: string;
  youtubeUrl?: string;
}

const DEFAULT_VIDEOS = [
  { videoId: "_urlz_Hk7bM", title: "Dark Circles? 3 Daily Habits? Random Home Remedies?" },
  { videoId: "Kc4AGn2i-Uk", title: "Not every under-eye trend online is harmless" },
];

export default function AestheticVideosSection({
  id = "watch",
  videos,
  kicker = "WATCH",
  heading = "Videos on this topic",
  lead = "Dr. Poonam Jain's centre shares short videos on its YouTube channel and in its own footage.",
  note = "Videos are general information, not a substitute for an examination. They complement the written information on this page.",
}: AestheticVideosSectionProps) {
  const items = videos && videos.length >= 2
    ? videos.slice(0, 2).map((video, index) => ({
        videoId: ("videoId" in video ? video.videoId : undefined) || DEFAULT_VIDEOS[index].videoId,
        title: video.title,
        description: video.description,
        category: CATEGORY_LABEL[video.category],
      }))
    : DEFAULT_VIDEOS.map((video) => ({ ...video, description: "", category: "Treatment Explainers" }));

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-h`}>
      <div className={styles.bgGlowTopRight} aria-hidden="true" />
      <div className={styles.bgIllustrationTopRight} aria-hidden="true" />
      <div className={styles.bgWaveBottomLeft} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.kickerRow}>
            <span className={styles.kickerLine} aria-hidden="true" />
            <span className={styles.kickerText}>{kicker}</span>
          </div>
          <h2 id={`${id}-h`} className={styles.heading}><HeadingText>{heading}</HeadingText></h2>
          <p className={styles.lead}>{lead}</p>
        </div>
        <div className={styles.grid}>
          <ServiceVideoCarousel>
            {items.map((item) => (
              <CataractVideoCard
                key={item.videoId}
                videoId={item.videoId}
                title={item.title}
                description={item.description}
                category={item.category}
                poster={`https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`}
                watchUrl={`https://www.youtube.com/watch?v=${item.videoId}`}
              />
            ))}
          </ServiceVideoCarousel>
        </div>
        <p className={styles.note}>
          {note}
        </p>
      </div>
    </section>
  );
}
