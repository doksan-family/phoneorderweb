import Image from "next/image";
import Link from "next/link";
import type { PublicBanner } from "@/entities/banner/model/types";

type HomeEventBannerProps = {
  banner: PublicBanner;
};

export function HomeEventBanner({ banner }: HomeEventBannerProps) {
  const inner = (
    <>
      <div>
        <p className="eyebrow">Event</p>
        <h2>{banner.title}</h2>
      </div>
      {banner.image_url && (
        <Image
          alt=""
          src={banner.image_url}
          width={920}
          height={360}
          sizes="(max-width: 900px) 100vw, 920px"
          style={{ width: "100%", height: "auto" }}
        />
      )}
    </>
  );

  if (banner.link_url) {
    return (
      <Link className="event-banner" href={banner.link_url}>
        {inner}
      </Link>
    );
  }

  return <article className="event-banner">{inner}</article>;
}
