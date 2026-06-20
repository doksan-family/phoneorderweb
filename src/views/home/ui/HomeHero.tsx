import { heroBanners } from "@/entities/content/model/mock-content";
import { HeroBannerSlider } from "@/features/hero-banner/ui/HeroBannerSlider";

export function HomeHero() {
  return <HeroBannerSlider banners={heroBanners} />;
}
