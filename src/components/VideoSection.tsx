import type { VideoItem } from "@/content/videos";
import { playerProps } from "@/lib/videoProps";
import VideoPlayer from "./VideoPlayer";

/**
 * A titled block with one lead video and, optionally, further videos beneath it. Renders nothing
 * when the list is empty, so a page without a playable video simply has no video section.
 * The first video decides the layout: vertical footage sits beside the text; 16:9 sits in a split
 * or full width.
 */
export default function VideoSection({
  videos,
  id,
  kicker,
  heading,
  lead,
  note,
  dark = false,
}: {
  videos: VideoItem[];
  id: string;
  kicker: string;
  heading: string;
  lead: string;
  note?: string;
  dark?: boolean;
}) {
  if (!videos.length) return null;
  const [first, ...rest] = videos;
  const vertical = first.aspect === "9:16";
  const fp = playerProps(first);
  // A wide lead video with a vertical clip next to it: heading above, the two side by side below,
  // so the vertical clip never sits alone in a half-empty row.
  const duo = !vertical && rest[0]?.aspect === "9:16";
  if (duo) {
    const extra = rest.slice(1);
    return (
      <section id={id} className={`section${dark ? " section--graphite" : ""}`} aria-labelledby={`${id}-h`}>
        <div className="container">
          <div className="vsec-text vsec-text--wide reveal">
            <p className="kicker">{kicker}</p>
            <h2 id={`${id}-h`} className="h2">{heading}</h2>
            <p className="lead">{lead}</p>
            {note && <p className="vsec-note">{note}</p>}
          </div>
          <div className="vsec-duo">
            <VideoPlayer v={fp} sizes="(min-width: 960px) 62vw, 100vw" />
            <VideoPlayer v={playerProps(rest[0])} sizes="320px" />
          </div>
          {extra.length > 0 && (
            <div className="vsec-more">
              {extra.map((v) => (
                <VideoPlayer key={v.id} v={playerProps(v)} sizes={v.aspect === "9:16" ? "360px" : "(min-width: 768px) 50vw, 100vw"} />
              ))}
            </div>
          )}
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
            <h2 id={`${id}-h`} className="h2">{heading}</h2>
            <p className="lead">{lead}</p>
            {note && <p className="vsec-note">{note}</p>}
          </div>
          <VideoPlayer v={fp} sizes={vertical ? "360px" : "(min-width: 768px) 50vw, 100vw"} />
        </div>
        {rest.length > 0 && (
          <div className="vsec-more">
            {rest.map((v) => (
              <VideoPlayer key={v.id} v={playerProps(v)} sizes={v.aspect === "9:16" ? "360px" : "(min-width: 768px) 50vw, 100vw"} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
