import { getVisibleProducts } from "@/entities/product/model/mock-products";
import { ProductCard } from "@/shared/ui/ProductCard";
import { MarketingConsentNotice } from "@/shared/ui/MarketingConsentNotice";
import { HomeEventBannerSection } from "./HomeEventBannerSection";
import { HomeHero } from "./HomeHero";
import { HomeReviewPreview } from "./HomeReviewPreview";

const sectionClass =
  "mx-auto w-[min(1120px,calc(100%_-_40px))] pt-[72px] max-[560px]:w-[min(100%_-_28px,1120px)]";

const firstSectionClass =
  `${sectionClass} max-[560px]:pt-6`;

const productGridClass =
  "grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[900px]:gap-2.5";

export function HomeView() {
  const visibleProducts = getVisibleProducts();

  return (
    <main>
      <HomeHero />

      <section className={firstSectionClass}>
        <div className={productGridClass}>
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <HomeEventBannerSection />

      <section className={`${sectionClass} grid grid-cols-[0.8fr_1.2fr] items-start gap-6 max-[900px]:grid-cols-1`}>
        <div>
          <p className="m-0 mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-blue-700">
            Reviews
          </p>
          <h2 className="m-0 text-[clamp(1.4rem,3vw,2.1rem)] font-black tracking-[-0.02em] text-slate-950">
            최근 구매후기
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            실제 상담을 통해 개통한 고객분들의 후기입니다.
          </p>
        </div>
        <HomeReviewPreview />
      </section>

      <section className={sectionClass}>
        <MarketingConsentNotice />
      </section>
    </main>
  );
}
