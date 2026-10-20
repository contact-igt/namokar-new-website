"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Slider, { type Settings } from "react-slick";
import type { PlayerProps } from "@/lib/videoProps";
import Link from "next/link";
import VideoPlayer from "./VideoPlayer";
import { ArrowRightIcon } from "./Icons";

/** One staged player with a responsive React Slick thumbnail rail. */
export default function VideoShelf({ videos }: { videos: PlayerProps[] }) {
  const [sel, setSel] = useState(0);
  const [playing, setPlaying] = useState(false);
  const slider = useRef<Slider>(null);
  if (!videos.length) return null;
  const cur = videos[Math.min(sel, videos.length - 1)];
  const settings: Settings = {
    arrows: false,
    infinite: videos.length > 3,
    speed: 350,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 960, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="videos" className="section section--porcelain" aria-labelledby="videos-h">
      <div className="container">
        <div className="vsec-text vsec-text--wide reveal">
          <p className="kicker">From the doctor</p>
          <h2 id="videos-h" className="h2">Eye Care Videos &amp; Clinic Stories.</h2>
          <p className="lead">Videos from the centre&rsquo;s own YouTube channel. Choose one, then press Play.</p>
        </div>
        <div className="shelf">
          <div className="shelf-stage" data-aspect={cur.aspect}>
            <VideoPlayer key={cur.id} v={cur} sizes="(min-width: 960px) 54vw, 100vw" playing={playing} onPlay={() => setPlaying(true)} />
            {cur.learn && (
              <Link href={cur.learn.href} className="text-link shelf-learn">
                {cur.learn.label}
                <ArrowRightIcon width={18} height={18} />
              </Link>
            )}
          </div>
          <div className="shelf-carousel-wrap" aria-label="Choose a video">
            {videos.length > 1 && (
              <div className={`shelf-carousel-controls${videos.length > 3 ? " shelf-carousel-controls--desktop" : ""}`}>
                <button type="button" className="shelf-arrow" onClick={() => slider.current?.slickPrev()} aria-label="Previous videos"><span aria-hidden="true" /></button>
                <button type="button" className="shelf-arrow" onClick={() => slider.current?.slickNext()} aria-label="Next videos"><span aria-hidden="true" /></button>
              </div>
            )}
            <Slider ref={slider} {...settings} className="shelf-slider">
              {videos.map((v, i) => (
                <div key={v.id}>
                  <div className="shelf-slide">
                    <button
                      type="button"
                      className="shelf-item"
                      aria-pressed={i === sel}
                      aria-label={`Choose video: ${v.title}`}
                      onClick={() => {
                        setSel(i);
                        setPlaying(false);
                      }}
                    >
                      <span className="shelf-thumb">
                        {v.poster && <Image src={v.poster} alt="" fill sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw" style={{ objectFit: "contain" }} />}
                        <span className="shelf-card-play" aria-hidden="true" />
                      </span>
                    </button>
                    <h3 className="shelf-title">{v.title}</h3>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        {/* <p className="vsec-note">Videos are general information from the centre&rsquo;s own channel, not a substitute for an examination. They open in YouTube&rsquo;s privacy-enhanced player.</p> */}
      </div>
    </section>
  );
}
