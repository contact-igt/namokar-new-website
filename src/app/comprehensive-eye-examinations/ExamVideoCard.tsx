"use client";

import { useServiceVideoPlayback } from "@/components/serviceVideoPlayback";
import Image from "next/image";
import { useState } from "react";
import styles from "./exams.module.css";

interface ExamVideoCardProps {
  videoId: string;
  title: string;
  description: string;
  poster: string;
  watchUrl: string;
  language?: "en" | "hi";
  category?: string;
}

export default function ExamVideoCard({
  videoId,
  title,
  description,
  poster,
  watchUrl,
  language,
  category,
}: ExamVideoCardProps) {
  const onCarouselPlay = useServiceVideoPlayback();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={styles.refVideoCard}>
      <div className={styles.refVideoFrame}>
        {isPlaying ? (
          <iframe
            className={styles.refVideoIframe}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={styles.refVideoPosterBtn}
            onClick={() => {
              setIsPlaying(true);
              onCarouselPlay?.();
            }}
            aria-label={`Play video: ${title}`}
          >
            <Image
              src={poster}
              alt={title}
              fill
              sizes="(min-width: 960px) 45vw, 92vw"
              className={styles.refVideoThumb}
              unoptimized
            />
            <span className={styles.refPlayButton} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6,3 20,12 6,21" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <div className={styles.refVideoBody}>
        {category && <span className={styles.refVideoKicker}>{category}</span>}
        <h3 className={styles.refVideoTitle}>
          {title}
          {language === "hi" && " (in Hindi)"}
        </h3>
        {description && <p className={styles.refVideoDesc}>{description}</p>}
        <div className={styles.refVideoAction}>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.refYoutubeBtn}
          >
            <svg
              width="22"
              height="16"
              viewBox="0 0 24 17"
              fill="none"
              aria-hidden="true"
              className={styles.youtubeSvg}
            >
              <path
                d="M23.498 2.627a3.016 3.016 0 0 0-2.122-2.136C19.505 0 12 0 12 0s-7.505 0-9.377.491A3.017 3.017 0 0 0 .502 2.627C0 4.515 0 8.448 0 8.448s0 3.933.502 5.82a3.016 3.016 0 0 0 2.122 2.137c1.871.503 9.376.503 9.376.503s7.505 0 9.377-.503a3.015 3.015 0 0 0 2.122-2.137c.502-1.887.502-5.82.502-5.82s0-3.933-.502-5.82z"
                fill="#FF0000"
              />
              <polygon points="9.6 12.07 15.82 8.45 9.6 4.82 9.6 12.07" fill="#FFFFFF" />
            </svg>
            <span>Watch on YouTube</span>
          </a>
        </div>
        <p className={styles.refVideoNote}>
          {isPlaying
            ? "Playing in YouTube's privacy-enhanced player."
            : "Pressing play loads YouTube's player (privacy-enhanced mode)."}
        </p>
      </div>
    </div>
  );
}
