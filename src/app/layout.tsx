import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { productCategoryQueryOptions } from "@/entities/product/model/categoryQueries";
import { siteSettingsQueryOptions } from "@/entities/site-settings/model/queries";
import { makeQueryClient } from "@/shared/lib/react-query";
import { QueryProvider } from "@/shared/lib/react-query/QueryProvider";
import { LegacyStorageCleanup } from "@/shared/ui/LegacyStorageCleanup";
import { MaintenanceGate } from "@/shared/ui/MaintenanceGate";
import { SiteFooterGate } from "@/shared/ui/SiteFooterGate";
import { SiteHeaderGate } from "@/shared/ui/SiteHeaderGate";
import "./globals.css";

const siteTitle = "핵폰 · 핸드폰도 인터넷도 핵 싸게";
const siteDescription =
  "삼성·애플 최신폰부터 키즈폰, 인터넷+TV 결합까지 실시간 최저가를 상담으로 확인하세요.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: "핵폰",
    title: siteTitle,
    description: siteDescription,
    locale: "ko_KR",
    images: [{ url: "/images/logo/og-image.png", width: 1200, height: 630, alt: siteTitle }]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/logo/og-image.png"]
  }
};

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  // 헤더 메뉴·푸터는 모든 페이지에 뜨므로 여기서 미리 채워야 첫 렌더에서
  // 깜박이지 않는다. 상품·배너처럼 페이지별로만 쓰는 데이터는 넣지 않는다.
  const queryClient = makeQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(productCategoryQueryOptions.publicList("main_menu")),
    queryClient.prefetchQuery(siteSettingsQueryOptions.public()),
  ]);

  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <QueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <LegacyStorageCleanup />
            <MaintenanceGate>
              <SiteHeaderGate />
              {children}
              <SiteFooterGate />
            </MaintenanceGate>
          </HydrationBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
