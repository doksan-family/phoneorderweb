"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";

const hiddenHeaderPathPrefixes = ["/po-console"];

function isHiddenHeaderPath(pathname: string) {
  return hiddenHeaderPathPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function SiteHeaderGate() {
  const pathname = usePathname();

  if (isHiddenHeaderPath(pathname)) {
    return null;
  }

  return <SiteHeader />;
}
