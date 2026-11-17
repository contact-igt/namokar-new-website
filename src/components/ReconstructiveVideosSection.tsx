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
          <p className={styles.eyebrow}>Watch</p>
          <h2 id="watch-h">Videos on <span className="title-secondary">this topic</span></h2>
          <p className={styles.leadText}>
            Dr. Poonam Jain&apos;s centre shares short videos on its YouTube channel and in its own footage. Videos are general information, not a substitute for an examination. They complement the written information on this page.
          </p>
        </div>
        <div className={styles.videoGrid}>
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
        </div>
      </div>
    </section>
  );
}
