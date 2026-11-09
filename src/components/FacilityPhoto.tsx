import Image from "next/image";
import type { PhotoItem } from "@/lib/photos";

/** Shared card for the homepage carousel and the About page's static gallery. */
export default function FacilityPhoto({
  item,
  sizes = "(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  item: PhotoItem;
  sizes?: string;
}) {
  return (
    <article className="fg-card">
      <span className="fg-frame">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizes}
          className="fg-img"
          style={{ objectPosition: item.position }}
        />
      </span>
      <div className="fg-cap">
        <strong className="fg-title">{item.title ?? item.caption}</strong>
        {item.title ? <p className="fg-desc">{item.caption}</p> : null}
      </div>
    </article>
  );
}
