import type { PublicProductCategory } from "@/entities/product/api/categories";
import type { PublicProductCard } from "@/entities/product/api/public";
import type { PublicBanner } from "@/entities/banner/model/types";
import type { SiteSettings } from "@/entities/site-settings/api/public";

export type PublicApiBootstrapData = {
  banners: {
    main: PublicBanner[];
    event: PublicBanner[];
  };
  products: PublicProductCard[];
  categories: { items: PublicProductCategory[] };
  site_settings: SiteSettings;
};

export type PublicApiBootstrapResponse = {
  ok: boolean;
  data: PublicApiBootstrapData;
};
