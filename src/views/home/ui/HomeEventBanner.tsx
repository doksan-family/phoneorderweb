import Image from "next/image";
import type { Banner } from "@/entities/content/model/types";

type HomeEventBannerProps = {
  banner: Banner;
};

export function HomeEventBanner({ banner }: HomeEventBannerProps) {
  return (
    <article className="event-banner">
      <div>
        <p className="eyebrow">Event</p>
        <h2>{banner.title}</h2>
        <p>{banner.description}</p>
      </div>
      <Image alt="" height={360} src={banner.imageUrl} width={920} />
    </article>
  );
}
