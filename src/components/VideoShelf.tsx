"use client";

import { useState } from "react";
import type { PlayerProps } from "@/lib/videoProps";
import Link from "next/link";
import VideoPlayer from "./VideoPlayer";
import { ArrowRightIcon } from "./Icons";

/**
 * A small doctor-led video shelf for the homepage: the clinic's own YouTube videos, one player at
 * a time. Choosing a video only changes which one is staged; nothing loads from YouTube until the
 * visitor presses Play, and choosing another video removes the player that was loaded, so there is
 * never more than one YouTube frame on the page. Renders nothing when no video is cleared.
 */
export default function VideoShelf({ videos }: { videos: PlayerProps[] }) {
  const [sel, setSel] = useState(0);
  const [playing, setPlaying] = useState(false);
  if (!videos.length) return null;
  const cur = videos[Math.min(sel, videos.length - 1)];

  return (
    <section id="videos" className="section section--porcelain" aria-labelledby="videos-h">
      <div className="container">
        <div className="vsec-text vsec-text--wide reveal">
          <p className="kicker">From the doctor</p>
          <h2 id="videos-h" className="h2">Eye Care Videos &amp; Clinic Stories.</h2>
          <p className="lead">
            Videos from the centre&rsquo;s own YouTube channel. Choose one, then press Play.
          </p>
        </div>
        <div className="shelf">
          <div className="shelf-stage" data-aspect={cur.aspect}>
            <VideoPlayer
              key={cur.id}
              v={cur}
              sizes="(min-width: 960px) 54vw, 100vw"
              playing={playing}
              onPlay={() => setPlaying(true)}
            />
            {cur.learn && (
              <Link href={cur.learn.href} className="text-link shelf-learn">
                {cur.learn.label}
                <ArrowRightIcon width={18} height={18} />
              </Link>
            )}
          </div>
          <ul className="shelf-list" aria-label="Choose a video">
            {videos.map((v, i) => (
              <li key={v.id}>
                <button
                  type="button"
                  className="shelf-item"
                  aria-pressed={i === sel}
                  onClick={() => {
                    setSel(i);
                    setPlaying(false);
                  }}
                >
                  <span className="shelf-kind">{v.aspect === "9:16" ? "Short" : "Video"}</span>
                  <span className="shelf-title">{v.title}</span>
                  <span className="shelf-meta">{v.duration}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="vsec-note">
          Videos are general information from the clinic&rsquo;s own channel, not a substitute for an
          examination. They open in YouTube&rsquo;s privacy-enhanced player.
        </p>
      </div>
    </section>
  );
}
