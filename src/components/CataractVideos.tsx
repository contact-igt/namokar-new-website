import { videosFor } from "@/content/videos";
import { playerProps } from "@/lib/videoProps";
import VideoPlayer from "./VideoPlayer";

export default function CataractVideos() {
  const vids = videosFor("cataract");
  if (!vids.length) return null;

  return (
    <section id="watch" className="section cataract-videos-section" aria-labelledby="watch-h">
      <div className="container">
        <div className="cataract-video-intro reveal">
          <p className="kicker">Watch</p>
          <h2 id="watch-h" className="h2">Videos on this topic</h2>
          <p className="lead">
            Dr. Poonam Jain&apos;s centre shares short videos on its YouTube channel and in its own footage.
          </p>
          <p className="cataract-video-note">
            Videos are general information, not a substitute for an examination. They complement the written information on this page.
          </p>
        </div>

        <div className="cataract-video-grid">
          {vids.map((v) => {
            const baseProps = playerProps(v);
            const uniformProps = {
              ...baseProps,
              aspect: "16:9" as const,
              ratio: "16 / 9",
            };
            return (
              <div key={v.id} className="cataract-video-card reveal">
                <VideoPlayer
                  v={uniformProps}
                  sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

