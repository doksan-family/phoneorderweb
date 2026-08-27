import type { MetadataRoute } from "next";
import { fetchPublicProducts } from "@/entities/product/api/public";
import { SITE_URL } from "@/shared/config/site";

const staticRoutes = [
  "",
  "/products",
  "/consultation",
  "/applications",
  "/reviews",
  "/notices",
  "/support",
  "/terms",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await fetchPublicProducts({ limit: 100 }).catch(() => []);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.6,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.id}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
