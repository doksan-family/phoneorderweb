import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/shared/ui/SiteFooter";
import { SiteHeader } from "@/shared/ui/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phone Order",
  description: "휴대폰 상품 상담 신청 웹사이트"
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
