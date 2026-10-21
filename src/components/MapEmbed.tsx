"use client";

import { useState } from "react";
import { MAP, MAPS_LINK } from "@/config/site";
import { PinIcon } from "./Icons";

/**
 * Click-to-load map: nothing from Google is requested until the visitor asks for it,
 * which keeps the first mobile load light. States plainly whether the map is a verified
 * business pin or only an address search.
 */
export default function MapEmbed() {
  const [shown, setShown] = useState(false);
  const verified = MAP.verifiedPinUrl !== null;

  return (
    <div className="map">
      <div className="map-frame">
        {shown ? (
          <iframe
            title="Map showing the location of Namokar Eye & Oculoplasty Centre"
            src={MAP.embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="map-ph">
            <PinIcon width={28} height={28} />
            <p>Ashok Vihar, New Delhi</p>
            <button type="button" className="btn btn--secondary" onClick={() => setShown(true)}>
              Show map
            </button>
            <p className="map-hint">Loading the map connects to Google.</p>
          </div>
        )}
      </div>
      <p className="map-note">
        {verified
          ? "Map position from the centre's Google listing."
          : "The map pin uses the position published on the centre's existing website, not a confirmed Google business listing, so it may not land exactly on the entrance."}{" "}
        <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="text-link">
          Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </div>
  );
}
