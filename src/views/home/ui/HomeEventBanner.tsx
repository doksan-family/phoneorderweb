import Image from "next/image";
import Link from "next/link";
import type { PublicBanner } from "@/entities/banner/model/types";
import { isExternalHref } from "@/shared/lib/url";

type HomeEventBannerProps = {
  banner: PublicBanner;
};

const bannerCls =
  "grid grid-cols-[1fr_auto] gap-8 items-center p-8 border border-slate-200 rounded-2xl bg-white max-[560px]:grid-cols-1";

export function HomeEventBanner({ banner }: HomeEventBannerProps) {
  const inner = (
    <>
      <div>
        <p className="m-0 mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-blue-700">Event</p>
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
