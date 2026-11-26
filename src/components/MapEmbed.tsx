import { MAP, MAPS_LINK, SITE } from "@/config/site";

/**
 * Displays the map and the centre's configured directions link.
 */
export default function MapEmbed() {
  return (
    <div className="map">
      <div className="map-frame">
        <iframe
          title="Map showing the location of Namokar Eye & Oculoplasty Centre"
          src={MAP.embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <p className="map-note">
        Find {SITE.name} on Google Maps for directions.{" "}
        <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="text-link">
          Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </div>
  );
}
