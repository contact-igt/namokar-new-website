import { MAP, MAPS_LINK } from "@/config/site";

/**
 * The contact page shows the map immediately. It states plainly whether the pin is a
 * verified business listing or only an address search.
 */
export default function MapEmbed() {
  const verified = MAP.verifiedPinUrl !== null;

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
