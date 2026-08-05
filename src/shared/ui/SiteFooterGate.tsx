"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./SiteFooter";

const hiddenFooterPathPrefixes = ["/po-console"];

function isHiddenFooterPath(pathname: string) {
  return hiddenFooterPathPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function SiteFooterGate() {
  const pathname = usePathname();

  if (isHiddenFooterPath(pathname)) {
    return null;
  }

  return <SiteFooter />;
}
