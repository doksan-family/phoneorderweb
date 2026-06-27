import { fetchBanners } from "@/entities/banner/api";
import { HeroBannerSlider } from "@/features/hero-banner/ui/HeroBannerSlider";

export async function HomeHero() {
  const banners = await fetchBanners("main");
  return <HeroBannerSlider banners={banners} />;
}
