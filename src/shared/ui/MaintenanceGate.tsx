"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { siteSettingsQueryOptions } from "@/entities/site-settings/model/queries";

type MaintenanceGateProps = {
  children: ReactNode;
};

/** 관리자 화면은 점검 중에도 접근할 수 있어야 설정을 다시 끌 수 있다. */
const bypassPathPrefixes = ["/po-console"];

function isBypassPath(pathname: string) {
  return bypassPathPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function MaintenanceGate({ children }: MaintenanceGateProps) {
  const pathname = usePathname();
  const { data } = useQuery(siteSettingsQueryOptions.public());

  if (!isBypassPath(pathname) && data?.maintenance_enabled) {
    return <MaintenanceScreen message={data.maintenance_message} />;
  }

  return <>{children}</>;
}

function MaintenanceScreen({ message }: { message: string | null }) {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-center text-white">
      <div className="grid max-w-md gap-3">
        <p className="m-0 text-2xl font-black">서비스 점검 중입니다</p>
        <p className="m-0 text-sm leading-relaxed text-slate-400">
          {message || "더 나은 서비스를 위해 점검 중입니다. 잠시 후 다시 이용해 주세요."}
        </p>
      </div>
    </main>
  );
}
