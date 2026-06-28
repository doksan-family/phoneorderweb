import { getVisibleProducts } from "@/entities/product/model/mock-products";
import { ProductCard } from "@/shared/ui/ProductCard";
import { MarketingConsentNotice } from "@/shared/ui/MarketingConsentNotice";
import { HomeEventBannerSection } from "./HomeEventBannerSection";
import { HomeHero } from "./HomeHero";
import { HomeReviewPreview } from "./HomeReviewPreview";

export function HomeView() {
  const visibleProducts = getVisibleProducts();

  return (
    <main>
      <HomeHero />

      <section className="section">
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <HomeEventBannerSection />

      <section className="section section--split">
        <div>
          <p className="eyebrow">Reviews</p>
          <h2>최근 구매후기</h2>
          <p style={{ color: "var(--muted)", marginTop: 8, fontSize: "0.92rem" }}>
            실제 상담을 통해 개통한 고객분들의 후기입니다.
          </p>
        </div>
        <HomeReviewPreview />
      </section>

      <section className="section">
        <MarketingConsentNotice />
      </section>
    </main>
  );
}
