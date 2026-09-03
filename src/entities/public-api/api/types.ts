import type { PublicProductCategory } from "@/entities/product/api/categories";
import type { PublicProductCard } from "@/entities/product/api/public";
import type { PublicBanner } from "@/entities/banner/model/types";
import type { SiteSettings } from "@/entities/site-settings/api/public";

/** fetchPublicApiBootstrap가 배너를 배열로 정규화해 돌려주는 형태 */
export type PublicApiBootstrapData = {
  banners: {
    main: PublicBanner[];
    event: PublicBanner[];
  };
  products: PublicProductCard[];
  categories: { items: PublicProductCategory[] };
  site_settings: SiteSettings;
};

/**
 * 명세상 banners.main/event는 `additionalProperties: true` 불투명 객체다.
 * 실제로 배열이 오기도 하고 `{ data: [...] }` 래핑이 오기도 하므로 unknown으로 받아
 * fetch 단계에서 배열로 좁힌다.
 */
export type PublicApiBootstrapResponse = {
  ok: boolean;
  data: {
    banners?: { main?: unknown; event?: unknown } | null;
    products?: PublicProductCard[] | null;
    categories?: { items?: PublicProductCategory[] | null } | null;
    site_settings: SiteSettings;
  };
};
