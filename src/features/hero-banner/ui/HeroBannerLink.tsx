import Link from "next/link";
import type { PublicBanner } from "@/entities/banner/model/types";
import { isExternalHref } from "@/shared/lib/url";

type HeroBannerLinkProps = {
  banner: PublicBanner;
};

export function HeroBannerLink({ banner }: HeroBannerLinkProps) {
  if (!banner.link_url) return null;

  if (isExternalHref(banner.link_url)) {
    return (
      <a
        aria-label={banner.title}
        className="absolute inset-0 z-10"
        href={banner.link_url}
      />
    );
  }

  return (
    <Link
      aria-label={banner.title}
      className="absolute inset-0 z-10"
      href={banner.link_url}
    />
  );
}
