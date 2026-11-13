import type { PlayerProps } from "@/lib/videoProps";
import VideoPlayer from "./VideoPlayer";

/**
 * "Step Inside Our Centre": one featured walkthrough video, wide, under a short heading. Replaces
 * the two separate facility cards. The video is click-to-play (nothing loads or plays on arrival;
 * the poster is a local still), with the browser's own controls for play, pause, seeking and
 * fullscreen. Renders nothing when the walkthrough is not cleared, so a normal build has no empty
 * dark section. The supporting line says only what the footage shows: the entrance, reception
 * and examinations.
 */
export default function WalkthroughSection({
  video,
  id = "explore",
  lead = "Take a short walkthrough of Namokar Eye & Oculoplasty Centre, from the entrance and reception to the consultation and examination areas.",
  note,
  eyebrow = "Explore Namokar",
  heading = "Step Inside Our Centre",
  showDescription = true,
}: { video: PlayerProps | undefined; id?: string; lead?: string; note?: string; eyebrow?: string; heading?: string; showDescription?: boolean }) {
  if (!video) return null;
  return (
    <section id={id} className={`section section--graphite wt${id === "about-video" ? " wt--about" : ""}`} aria-labelledby={`${id}-h`}>
      <div className="container wt-layout">
        <div className="wt-head reveal">
          <p className="kicker">{eyebrow}</p>
          <h2 id={`${id}-h`} className="h2">{heading}</h2>
          <p className="lead">{lead}</p>
        </div>
        <div className="wt-stage">
          <VideoPlayer v={video} sizes="(min-width: 1240px) 1100px, 100vw" />
        </div>
        {showDescription && <p className="wt-sub">{video.description}</p>}
        {note && <p className="wt-sub">{note}</p>}
      </div>
    </section>
  );
}
