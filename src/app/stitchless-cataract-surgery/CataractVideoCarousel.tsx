import type { ComponentProps } from "react";
import ServiceVideoCarousel from "@/components/ServiceVideoCarousel";
import CataractVideoCard from "./CataractVideoCard";

type Video = ComponentProps<typeof CataractVideoCard> & { id: string };

export default function CataractVideoCarousel({ videos }: { videos: Video[] }) {
  return (
    <ServiceVideoCarousel>
      {videos.map(({ id, ...video }) => (
        <CataractVideoCard key={id} {...video} />
      ))}
    </ServiceVideoCarousel>
  );
}
