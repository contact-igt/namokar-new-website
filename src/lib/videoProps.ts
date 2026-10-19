import { ASSETS, srcOf } from "@/config/assets";
import { CATEGORY_LABEL, CHANNEL, type VideoItem, previewOnlyVideo } from "@/content/videos";

/** Plain, serialisable description of a playable video for the client player. */
export type PlayerProps = {
  id: string;
  kind: "local" | "youtube";
  title: string;
  category: string;
  aspect: "16:9" | "9:16";
  duration: string;
  hasAudio: boolean;
  language: "en" | "hi";
  description: string;
  preview: boolean;
  src?: string;
  poster?: string;
  captions?: string;
  videoId?: string;
  watchUrl?: string;
};

/** Only call for videos that passed `playable()`. */
export function playerProps(v: VideoItem): PlayerProps {
  const base = {
    id: v.id,
    title: v.title,
    category: CATEGORY_LABEL[v.category],
    aspect: v.aspect,
    duration: v.duration,
    hasAudio: v.hasAudio,
    language: v.language,
    description: v.description,
    preview: previewOnlyVideo(v),
  };
  if (v.source === "local") {
    return {
      ...base,
      kind: "local",
      src: srcOf(ASSETS[v.video]),
      poster: srcOf(ASSETS[v.poster]),
      captions: v.captions ? srcOf(ASSETS[v.captions]) : undefined,
    };
  }
  return {
    ...base,
    kind: "youtube",
    videoId: v.videoId,
    watchUrl: `https://www.youtube.com/watch?v=${v.videoId}`,
  };
}

export { CHANNEL };
