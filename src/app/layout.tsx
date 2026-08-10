import type { Metadata } from "next";
import type { ReactNode } from "react";
import { QueryProvider } from "@/shared/lib/react-query/QueryProvider";
import { LegacyStorageCleanup } from "@/shared/ui/LegacyStorageCleanup";
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

export default function RootLayout({ children }: RootLayoutProps) {
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
          <LegacyStorageCleanup />
          <SiteHeaderGate />
          {children}
          <SiteFooterGate />
        </QueryProvider>
      </body>
    </html>
  );
}
