"use client";

import { Children, Fragment, useRef, useState, type ReactNode } from "react";
import Slider from "react-slick";
import { usePrefersReducedMotion, useQuery } from "./motion/useMedia";
import { ServiceVideoPlaybackContext } from "./serviceVideoPlayback";
import styles from "./ServiceVideoCarousel.module.css";

export default function ServiceVideoCarousel({ children }: { children: ReactNode }) {
  const mobile = useQuery("(width < 640px)");
  const tablet = useQuery("(width < 960px)");
  const reducedMotion = usePrefersReducedMotion();
  const slider = useRef<Slider>(null);
  const playing = useRef(false);
  const [playbackVersion, setPlaybackVersion] = useState(0);
  const slideCount = Children.toArray(children).length;
  const slidesToShow = Math.min(slideCount, mobile ? 1 : tablet ? 2 : 3);
  const canScroll = slideCount > slidesToShow;

  if (slideCount <= 1) return children;

  return (
    <ServiceVideoPlaybackContext.Provider value={() => {
      playing.current = true;
      slider.current?.slickPause();
    }}>
      <Slider
        ref={slider}
        className={styles.videoCarousel}
        arrows={false}
        dots={canScroll}
        appendDots={(dots) => <ul>{dots}</ul>}
        customPaging={(index) => <button type="button" aria-label={`Show video ${index + 1}`} />}
        infinite={canScroll}
        slidesToShow={slidesToShow}
        slidesToScroll={1}
        autoplay={canScroll && !reducedMotion}
        autoplaySpeed={5000}
        speed={reducedMotion ? 0 : 400}
        pauseOnHover
        pauseOnFocus
        afterChange={() => {
          if (!playing.current) return;
          playing.current = false;
          setPlaybackVersion((version) => version + 1);
          if (!reducedMotion) slider.current?.slickPlay();
        }}
      >
        {Children.map(children, (child) => child && (
          <div className={styles.videoSlide}>
            <div className={styles.videoContent}>
              <Fragment key={playbackVersion}>{child}</Fragment>
            </div>
          </div>
        ))}
      </Slider>
    </ServiceVideoPlaybackContext.Provider>
  );
}
