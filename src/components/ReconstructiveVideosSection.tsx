import ServiceVideoCarousel from "@/components/ServiceVideoCarousel";
import type { VideoItem } from "@/content/videos";
import { playerProps } from "@/lib/videoProps";
import GlaucomaVideoCard from "@/app/glaucoma-management/GlaucomaVideoCard";
import styles from "@/app/glaucoma-management/glaucoma.module.css";
import VideoPlayer from "./VideoPlayer";

export default function ReconstructiveVideosSection({ videos }: { videos: VideoItem[] }) {
  if (!videos.length) return null;

  return (
    <section id="watch" className={`${styles.page} ${styles.videoSection}`} aria-labelledby="watch-h">
      <div className="container">
        <div className={styles.centerHead}>
          <p className={styles.eyebrow}>Insights from Your Doctor</p>
          <h2 id="watch-h">Understanding Reconstructive Oculoplasty <span className="title-secondary">with Dr. Poonam Jain</span></h2>
          <p className={styles.leadText}>
            Explore educational videos from Dr. Poonam Jain covering eyelid abnormalities, functional eye concerns, reconstructive procedures and the importance of timely ophthalmic assessment. These videos provide general educational information and do not replace an individual eye examination or medical consultation.
          </p>
        </div>
        <div className={styles.videoGrid}>
          <ServiceVideoCarousel>
            {videos.map((video) => {
              const props = playerProps(video);
              return props.kind === "youtube" ? (
                <GlaucomaVideoCard
                  key={video.id}
                  videoId={props.videoId!}
                  title={video.title}
                  description={video.description}
                  poster={props.poster || `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`}
                  watchUrl={props.watchUrl!}
                  language={video.language}
                  category={video.category}
                />
              ) : (
                <div key={video.id} className={styles.refVideoCard}>
                  <VideoPlayer v={props} showMeta />
                </div>
              );
            })}
          </ServiceVideoCarousel>
        </div>
      </div>
    </section>
  );
}
