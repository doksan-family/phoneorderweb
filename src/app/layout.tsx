import type { Metadata } from "next";
import type { ReactNode } from "react";
import { QueryProvider } from "@/shared/lib/react-query/QueryProvider";
import { InteractiveCursorStyle } from "@/shared/ui/InteractiveCursorStyle";
import { SiteFooterGate } from "@/shared/ui/SiteFooterGate";
import { SiteHeaderGate } from "@/shared/ui/SiteHeaderGate";
import "./globals.css";

export const metadata: Metadata = {
  title: "핵폰 · 핸드폰도 인터넷도 핵 싸게",
  description:
    "삼성·애플 최신폰부터 키즈폰, 인터넷+TV 결합까지 실시간 최저가를 상담으로 확인하세요."
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
          <InteractiveCursorStyle />
          <SiteHeaderGate />
          {children}
          <SiteFooterGate />
        </QueryProvider>
      </body>
    </html>
  );
}
