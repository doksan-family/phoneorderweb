import { VisibleProductGrid } from "@/features/product-list/ui/VisibleProductGrid";
import { MarketingConsentNotice } from "@/shared/ui/MarketingConsentNotice";
import { HomeCtaBand } from "./HomeCtaBand";
import { HomeEventBannerSection } from "./HomeEventBannerSection";
import { HomeHero } from "./HomeHero";
import { HomeReviewPreview } from "./HomeReviewPreview";
import { HomeSectionHeading } from "./HomeSectionHeading";
import { HomeValueProps } from "./HomeValueProps";

const sectionClass = "site-container pt-[72px] max-[560px]:pt-10";

const FIRST_ROW_CARD_COUNT = 4;

export function HomeView() {
  return (
    <main className="pb-0">
      <HomeHero />

      <section className={`${sectionClass} max-[560px]:pt-8`}>
        <HomeSectionHeading
          eyebrow="이달의 추천"
          title="가장 잘나가는 상품"
          moreHref="/products"
        />
        <VisibleProductGrid firstRowCardCount={FIRST_ROW_CARD_COUNT} />
      </section>

      <HomeEventBannerSection />

      <HomeValueProps />

      <section className={sectionClass}>
        <HomeSectionHeading
          eyebrow="실제 고객 후기"
          title="먼저 개통한 분들 이야기"
          moreHref="/reviews"
        />
        <HomeReviewPreview />
      </section>

      <section className={sectionClass}>
        <MarketingConsentNotice />
      </section>

      <HomeCtaBand />
    </main>
  );
}
