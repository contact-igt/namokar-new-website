"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./refractive.module.css";

interface RefractiveVideoCardProps {
  videoId: string;
  title: string;
  description: string;
  poster: string;
  watchUrl: string;
  category?: string;
}

export default function RefractiveVideoCard({
  videoId,
  title,
  description,
  poster,
  watchUrl,
  category = "Clinical Video Guide",
}: RefractiveVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <article className={styles.videoCard}>
      <div className={styles.videoFrame}>
        {isPlaying ? (
          <iframe
            className={styles.videoIframe}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={styles.videoPosterBtn}
            onClick={() => setIsPlaying(true)}
            aria-label={`Play educational video: ${title}`}
          >
            <Image
              src={poster}
              alt={title}
              fill
              sizes="(min-width: 960px) 45vw, 100vw"
              className={styles.videoThumb}
              unoptimized
            />
            <span className={styles.playButton} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6,3 20,12 6,21" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <div className={styles.videoBody}>
        {category && <span className={styles.videoKicker}>{category}</span>}
        <h3 className={styles.videoTitle}>{title}</h3>
        {description && <p className={styles.videoDesc}>{description}</p>}
        <div className={styles.videoAction}>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.youtubeLink}
          >
            <svg
              width="20"
              height="15"
              viewBox="0 0 24 17"
              fill="none"
              aria-hidden="true"
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
      </div>
    </article>
  );
}
