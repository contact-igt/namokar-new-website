"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { VideoItem } from "@/content/videos";
import styles from "./AestheticVideosSection.module.css";

interface AestheticVideosSectionProps {
  id?: string;
  videos?: VideoItem[];
  kicker?: string;
  heading?: string;
  lead?: string;
  youtubeUrl?: string;
}

const DEFAULT_VIDEOS = [
  {
    videoId: "_urlz_Hk7bM",
    title: "Dark Circles? 3 Daily Habits? Random Home Remedies?",
  },
  {
    videoId: "Kc4AGn2i-Uk",
    title: "Not every under-eye trend online is harmless",
  },
];

export default function AestheticVideosSection({
  id = "watch",
  videos,
  kicker = "WATCH",
  heading = "Videos on this topic",
  lead = "Dr. Poonam Jain's centre shares short videos on its YouTube channel and in its own footage.",
  youtubeUrl = "https://www.youtube.com/@dr.poonamjain-NamokarEyeCentre",
}: AestheticVideosSectionProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Default YouTube thumbnail directly from YouTube CDN for each video
  const items = (videos && videos.length >= 2)
    ? videos.slice(0, 2).map((v, idx) => {
        const videoId = ("videoId" in v ? v.videoId : undefined) || DEFAULT_VIDEOS[idx].videoId;
        return {
          videoId,
          title: v.title || DEFAULT_VIDEOS[idx].title,
          thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        };
      })
    : DEFAULT_VIDEOS.map((v) => ({
        ...v,
        thumbnail: `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
      }));

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-h`}>
      {/* Background visual art */}
      <div className={styles.bgGlowTopRight} aria-hidden="true" />
      <div className={styles.bgIllustrationTopRight} aria-hidden="true" />
      <div className={styles.bgWaveBottomLeft} aria-hidden="true" />

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.kickerRow}>
            <span className={styles.kickerLine} aria-hidden="true" />
            <span className={styles.kickerText}>{kicker}</span>
          </div>
          <h2 id={`${id}-h`} className={styles.heading}>
            {heading}
          </h2>
          <p className={styles.lead}>{lead}</p>
        </div>

        {/* Two Video Cards */}
        <div className={styles.grid}>
          {items.map((item) => {
            const isPlaying = activeVideoId === item.videoId;

            return (
              <div
                key={item.videoId}
                className={styles.videoItem}
              >
                <div className={styles.card}>
                {isPlaying ? (
                  <div className={styles.thumbnailWrapper}>
                    <iframe
                      className={styles.iframe}
                      src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0&playsinline=1`}
                      title={item.title}
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <button type="button" className={`${styles.thumbnailWrapper} ${styles.thumbnailButton}`} onClick={() => setActiveVideoId(item.videoId)} aria-label={`Play video: ${item.title}`}>
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      unoptimized
                      sizes="(min-width: 900px) 560px, 100vw"
                      className={styles.thumbnailImage}
                    />

                    {/* Play button in center */}
                    <span className={styles.playButton} aria-hidden="true">
                      <svg viewBox="0 0 24 24" className={styles.playIcon}>
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </span>

                  </button>
                )}
                </div>
                <div className={styles.cardCaption}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered Watch on YouTube Button */}
        <div className={styles.ctaWrapper}>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.youtubeButton}
          >
            <svg
              viewBox="0 0 28 20"
              fill="none"
              className={styles.btnYoutubeIcon}
              aria-hidden="true"
            >
              <path
                d="M27.4 3.1c-.3-1.2-1.2-2.1-2.4-2.4C22.9.2 14 .2 14 .2s-8.9 0-11 .5C1.8.9.9 1.9.6 3.1.1 5.2.1 9.6.1 9.6s0 4.4.5 6.5c.3 1.2 1.2 2.1 2.4 2.4 2.1.5 11 .5 11 .5s8.9 0 11-.5c1.2-.3 2.1-1.2 2.4-2.4.5-2.1.5-6.5.5-6.5s0-4.4-.5-6.5z"
                fill="#FF0000"
              />
              <polygon points="11.2,13.7 18.2,9.6 11.2,5.5" fill="#FFFFFF" />
            </svg>
            <span>Watch on YouTube</span>
            <span className={styles.btnArrow} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></span>
          </a>
        </div>
      </div>
    </section>
  );
}
