"use client";

import { Children, type ReactNode } from "react";
import Slider from "react-slick";
import { usePrefersReducedMotion, useQuery } from "./motion/useMedia";
import styles from "./ExpertEyeCareSection.module.css";

export default function RelatedServicesCarousel({
  children,
  className,
  mobileOnly = false,
}: {
  children: ReactNode;
  className: string;
  mobileOnly?: boolean;
}) {
  const compact = useQuery(mobileOnly ? "(width <= 640px)" : "(width < 992px)");
  const singleCard = useQuery("(width < 680px)");
  const reducedMotion = usePrefersReducedMotion();
  const slidesToShow = mobileOnly || singleCard ? 1 : 2;

  if (!compact || Children.count(children) <= slidesToShow) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Slider
      className={styles.relatedCarousel}
      arrows={false}
      dots
      appendDots={(dots) => <ul>{dots}</ul>}
      customPaging={(index) => <button type="button" aria-label={`Show service ${index + 1}`} />}
      infinite
      slidesToShow={slidesToShow}
      slidesToScroll={1}
      autoplay={!reducedMotion}
      autoplaySpeed={5000}
      speed={reducedMotion ? 0 : 400}
      pauseOnHover
      pauseOnFocus
    >
      {children}
    </Slider>
  );
}
