import { VisibleProductGrid } from "@/features/product-list/ui/VisibleProductGrid";
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
          eyebrow="Monthly Pick"
          title="Bestsellers"
          moreHref="/products"
        />
        <VisibleProductGrid firstRowCardCount={FIRST_ROW_CARD_COUNT} />
      </section>

      <HomeEventBannerSection />

      <HomeValueProps />

      <section className={sectionClass}>
        <HomeSectionHeading
          eyebrow="Samsung"
          title="Galaxy"
          moreHref="/products?brand=samsung"
        />
        <VisibleProductGrid
          brandId="samsung"
          firstRowCardCount={FIRST_ROW_CARD_COUNT}
          limit={FIRST_ROW_CARD_COUNT}
        />
      </section>

      <section className={sectionClass}>
        <HomeSectionHeading
          eyebrow="Apple"
          title="iPhone"
          moreHref="/products?brand=apple"
        />
        <VisibleProductGrid
          brandId="apple"
          firstRowCardCount={FIRST_ROW_CARD_COUNT}
          limit={FIRST_ROW_CARD_COUNT}
        />
      </section>

      <section className={sectionClass}>
        <HomeSectionHeading
          eyebrow="실제 고객 후기"
          title="먼저 개통한 분들 이야기"
          moreHref="/reviews"
        />
        <HomeReviewPreview />
      </section>

      <HomeCtaBand />
    </main>
  );
}
