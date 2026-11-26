import HeadingText from "@/components/HeadingText";
import type { VideoItem } from "@/content/videos";
import { playerProps } from "@/lib/videoProps";
import ServiceVideoCarousel from "./ServiceVideoCarousel";
import VideoPlayer from "./VideoPlayer";

export default function VideoSection({
  videos,
  id,
  kicker,
  heading,
  lead,
  note,
  dark = false,
  showMeta = false,
}: {
  videos: VideoItem[];
  id: string;
  kicker: string;
  heading: string;
  lead: string;
  note?: string;
  dark?: boolean;
  showMeta?: boolean;
}) {
  if (!videos.length) return null;
  const [first] = videos;
  const vertical = first.aspect === "9:16";
  const fp = playerProps(first);

  if (videos.length > 1) {
    return (
      <section id={id} className={`section${dark ? " section--graphite" : ""}`} aria-labelledby={`${id}-h`}>
        <div className="container">
          <div className="vsec-text vsec-text--wide reveal">
            <p className="kicker">{kicker}</p>
            <h2 id={`${id}-h`} className="h2"><HeadingText>{heading}</HeadingText></h2>
            <p className="lead">{lead}</p>
            {note && <p className="vsec-note">{note}</p>}
          </div>
          <ServiceVideoCarousel>
            {videos.map((video) => (
              <VideoPlayer key={video.id} v={playerProps(video)} showMeta={showMeta} />
            ))}
          </ServiceVideoCarousel>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`section${dark ? " section--graphite" : ""}`} aria-labelledby={`${id}-h`}>
      <div className="container">
        <div className={`vsec ${vertical ? "vsec--splitv" : "vsec--split"}`}>
          <div className="vsec-text reveal">
            <p className="kicker">{kicker}</p>
            <h2 id={`${id}-h`} className="h2"><HeadingText>{heading}</HeadingText></h2>
            <p className="lead">{lead}</p>
            {note && <p className="vsec-note">{note}</p>}
          </div>
          <VideoPlayer v={fp} sizes={vertical ? "360px" : "(min-width: 768px) 50vw, 100vw"} />
        </div>
      </div>
    </section>
  );
}
