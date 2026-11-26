"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";
import RelatedServicesCarousel from "./RelatedServicesCarousel";
import styles from "./ServicesUnifiedList.module.css";

export type ServiceCardItem = {
  key: string;
  title: string;
  category: "vision" | "oculoplasty";
  blurb: string;
  href: string;
  image: string;
  alt: string;
};

interface ServicesUnifiedListProps {
  items: ServiceCardItem[];
}

export default function ServicesUnifiedList({ items }: ServicesUnifiedListProps) {
  const [activeTab, setActiveTab] = useState<"all" | "vision" | "oculoplasty">("all");

  const filteredItems = activeTab === "all"
    ? items
    : items.filter((item) => item.category === activeTab);

  const visionCount = items.filter((i) => i.category === "vision").length;
  const oculoCount = items.filter((i) => i.category === "oculoplasty").length;

  return (
    <div className={styles.wrapper}>
      {/* Category Filter Tabs */}
      <div className={styles.filterTabs} role="tablist" aria-label="Filter medical services">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "all"}
          className={`${styles.tabBtn} ${activeTab === "all" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("all")}
        >
          <span>All Services</span>
          <span className={styles.tabCount}>{items.length}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "vision"}
          className={`${styles.tabBtn} ${activeTab === "vision" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("vision")}
        >
          <span>Comprehensive Eye Care</span>
          <span className={styles.tabCount}>{visionCount}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "oculoplasty"}
          className={`${styles.tabBtn} ${activeTab === "oculoplasty" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("oculoplasty")}
        >
          <span>Specialised Oculoplasty</span>
          <span className={styles.tabCount}>{oculoCount}</span>
        </button>
      </div>

      <RelatedServicesCarousel key={activeTab} className={styles.cardsGrid} mobileOnly>
        {filteredItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={styles.card}
            aria-label={`${item.title} - ${item.blurb}`}
          >
            {/* Visual Header with Photo & Floating Badge */}
            <div className={styles.photoContainer}>
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                className={styles.cardPhoto}
              />
              <div className={styles.photoOverlay} aria-hidden="true" />

              {/* Floating Pill Badge at top-left */}
              <div className={styles.floatingBadge}>
                <span className={styles.badgeText}>{item.title}</span>
              </div>
            </div>

            {/* Bottom Rounded Ice-Blue Bubble */}
            <div className={styles.bubble}>
              <p className={styles.bubbleText}>{item.blurb}</p>
              <div className={styles.bubbleAction}>
                <span className={styles.actionText}>Learn More</span>
                <span className={styles.actionIcon} aria-hidden="true">
                  <ArrowRightIcon width={16} height={16} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </RelatedServicesCarousel>
    </div>
  );
}
