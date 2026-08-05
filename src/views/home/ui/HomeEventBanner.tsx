import Image from "next/image";
import Link from "next/link";
import type { PublicBanner } from "@/entities/banner/model/types";
import { isExternalHref } from "@/shared/lib/url";

type HomeEventBannerProps = {
  banner: PublicBanner;
};

const bannerCls =
  "brand-card grid grid-cols-[1fr_auto] items-center gap-8 overflow-hidden p-8 transition hover:border-[var(--brand-primary-strong)] max-[560px]:grid-cols-1";

export function HomeEventBanner({ banner }: HomeEventBannerProps) {
  const inner = (
    <>
      <div>
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

  if (banner.link_url && isExternalHref(banner.link_url)) {
    return (
      <a className={bannerCls} href={banner.link_url}>
        {inner}
      </a>
    );
  }

  if (banner.link_url) {
    return (
      <Link className={bannerCls} href={banner.link_url}>
        {inner}
      </Link>
    );
  }

  return <article className={bannerCls}>{inner}</article>;
}
