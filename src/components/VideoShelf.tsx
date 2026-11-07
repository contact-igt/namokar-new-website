"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Slider, { type Settings } from "react-slick";
import { CHANNEL, type PlayerProps } from "@/lib/videoProps";
import VideoPlayer from "./VideoPlayer";
import { ArrowRightIcon } from "./Icons";

function ShelfFeatureIcon({ type }: { type: "tour" | "eye" | "care" }) {
  const paths = {
    tour: <><rect x="3" y="6" width="12" height="12" rx="2" /><path d="m15 10 5-3v10l-5-3" /></>,
    eye: <><path d="M2.5 12s3.3-5 9.5-5 9.5 5 9.5 5-3.3 5-9.5 5-9.5-5-9.5-5Z" /><circle cx="12" cy="12" r="2.5" /></>,
    care: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2.5 19c.5-3.5 2.6-5.3 5.5-5.3s5 1.8 5.5 5.3M13.5 19c.3-2.4 1.7-3.9 4.2-3.9 2.1 0 3.4 1.2 3.8 3.9" /></>,
  };
  return <svg className="shelf-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}

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
    <section id="videos" className="section section--porcelain video-showcase" aria-labelledby="videos-h">
      <div className="container">
        <div className="vsec-text vsec-text--wide reveal">
          <p className="kicker">From the doctor</p>
          <h2 id="videos-h" className="h2">Eye Care, Explained by <span>Dr. Poonam Jain.</span></h2>
          <p className="lead">Clear, doctor-led videos about common eye concerns, treatments and life at Namokar. Choose one, then press Play.</p>
        </div>
        <div className="shelf video-showcase-main">
          <div className="shelf-stage" data-aspect={cur.aspect}>
            <VideoPlayer key={cur.id} v={cur} sizes="(min-width: 960px) 54vw, 100vw" playing={playing} onPlay={() => setPlaying(true)} />
          </div>
          <aside className="video-showcase-intro" aria-label="Video topics">
            <h3>A closer look inside<br />Namokar Eye &amp; Oculoplasty Centre</h3>
            <p>See how we examine, diagnose and care for our patients at our Delhi centre.</p>
            <div className="video-showcase-features">
              <span><ShelfFeatureIcon type="tour" /><b>Clinic Tour</b><small>Our facilities</small></span>
              <span><ShelfFeatureIcon type="eye" /><b>Eye Treatments</b><small>In simple terms</small></span>
              <span><ShelfFeatureIcon type="care" /><b>Patient Care</b><small>Our approach</small></span>
            </div>
            <a href={cur.watchUrl} target="_blank" rel="noopener noreferrer" className="video-youtube-link">
              <span className="video-youtube-mark" aria-hidden="true" /> Visit Our Channel <ArrowRightIcon width={21} height={21} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </aside>
        </div>
        <div className="shelf-more-head">
          <h3>More Videos from Dr. Poonam Jain</h3>
          <a href={CHANNEL.url} target="_blank" rel="noopener noreferrer" className="text-link">View All Videos <ArrowRightIcon width={18} height={18} /><span className="sr-only"> (opens in a new tab)</span></a>
        </div>
        <div className="shelf">
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
