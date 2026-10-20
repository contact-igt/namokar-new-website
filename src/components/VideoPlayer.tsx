"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { PlayerProps } from "@/lib/videoProps";
import { ArrowRightIcon } from "./Icons";

/**
 * One player for both kinds of source.
 *
 *  local    a native <video> with controls, created only after the visitor presses play
 *           (preload is none before that). The poster is a local image.
 *  youtube  a branded poster and nothing else until play is pressed. Only then is a privacy-enhanced
 *           (youtube-nocookie.com) iframe created, so no request goes to YouTube before that.
 *           The iframe cannot report errors, so a "Watch on YouTube" link is always offered.
 *
 * No autoplay without a user action, and an audio video starts only because the visitor asked.
 */
export default function VideoPlayer({
  v,
  showMeta = false,
  sizes = "(min-width: 960px) 40vw, 100vw",
  playing,
  onPlay,
}: {
  v: PlayerProps;
  showMeta?: boolean;
  sizes?: string;
  /** Controlled mode (a shelf that allows one player at a time). Omit for a self-contained player. */
  playing?: boolean;
  onPlay?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [own, setOwn] = useState(false);
  const started = playing ?? own;
  const [failed, setFailed] = useState(false);
  const vertical = v.aspect === "9:16";

  const start = () => {
    setOwn(true);
    onPlay?.();
    if (v.kind === "local") requestAnimationFrame(() => ref.current?.play().catch(() => {}));
  };

  const label = `Play video: ${v.title} (${v.duration}${v.hasAudio ? "" : ", no sound"})`;

  return (
    <figure className={`vp${vertical ? " vp--vertical" : ""}`}>
      <div className={`vp-frame vp-frame--${vertical ? "v" : "h"}`} style={v.ratio ? { aspectRatio: v.ratio } : undefined}>
        {!started && v.kind === "local" && v.poster && (
          <Image src={v.poster} alt="" fill sizes={sizes} className="vp-poster" />
        )}
        {!started && v.kind === "youtube" && (
          <div className="vp-thumb" aria-hidden="true">
            {v.poster ? (
              <Image src={v.poster} alt="" fill sizes={sizes} className="vp-poster" />
            ) : (
              <Image src="/images/namokar-logo.webp" alt="" width={220} height={62} className="vp-thumb-mark" />
            )}
          </div>
        )}

        {started && v.kind === "local" && !failed && (
          <video
            ref={ref}
            className="vp-video"
            src={v.src}
            poster={v.poster}
            controls
            playsInline
            preload="metadata"
            muted={!v.hasAudio}
            onError={() => setFailed(true)}
            aria-label={v.title}
          >
            {v.captions && <track kind="captions" src={v.captions} srcLang={v.language} label="Captions" default />}
          </video>
        )}

        {started && v.kind === "youtube" && (
          <iframe
            className="vp-iframe"
            src={`https://www.youtube-nocookie.com/embed/${v.videoId}?autoplay=1&rel=0&playsinline=1&cc_load_policy=1`}
            title={v.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}

        {failed && (
          <p className="vp-fail" role="status">
            The video could not be loaded. Please try again later, or call the centre.
          </p>
        )}

        {!started && (
          <button type="button" className="vp-play" onClick={start} aria-label={label}>
            <span className="vp-play-icon" aria-hidden="true" />
            <span className="vp-play-text">
              Play
              <span className="vp-play-meta">
                {v.duration}
                {v.hasAudio ? "" : " · no sound"}
              </span>
            </span>
          </button>
        )}
      </div>

      {v.sensitive && !started && (
        <p className="vp-warn">This video may show an eye procedure. Press Play only if you are comfortable.</p>
      )}

      {showMeta ? (
        <figcaption className="vp-cap">
          <span className="vp-cap-cat">{v.category}</span>
          <strong>{v.title}{v.language === "hi" && " (in Hindi)"}</strong>
          <span>{v.description}</span>
        </figcaption>
      ) : (
        <figcaption className="vp-cap vp-cap--min">
          {v.title}
          {v.kind === "youtube" && v.language === "hi" && " (in Hindi)"}
        </figcaption>
      )}

      {v.kind === "youtube" && (
        <p className="vp-note">
          {started
            ? "Playing in YouTube's privacy-enhanced player."
            : "Pressing play loads YouTube's player (privacy-enhanced mode)."}{" "}
          <a href={v.watchUrl} target="_blank" rel="noopener noreferrer" className="text-link">
            Watch on YouTube <ArrowRightIcon width={16} height={16} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      )}
    </figure>
  );
}
