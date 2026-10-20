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
export default function WalkthroughSection({ video }: { video: PlayerProps | undefined }) {
  if (!video) return null;
  return (
    <section id="explore" className="section section--graphite wt" aria-labelledby="explore-h">
      <div className="container">
        <div className="wt-head reveal">
          <p className="kicker">Explore Namokar</p>
          <h2 id="explore-h" className="h2">Step Inside Our Centre</h2>
          <p className="lead">Take a short walkthrough of Namokar Eye &amp; Oculoplasty Centre, from the entrance and reception to the consultation and examination areas.</p>
        </div>
        <div className="wt-stage">
          <VideoPlayer v={video} sizes="(min-width: 1240px) 1100px, 100vw" />
        </div>
        <p className="wt-sub">{video.description}</p>
      </div>
    </section>
  );
}
