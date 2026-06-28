import { type NextRequest, NextResponse } from "next/server";
import { apiFetch } from "@/shared/api/client";
import type { PublicBannerListResponse } from "@/entities/banner/model/types";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") ?? "main";

  try {
    const result = await apiFetch<PublicBannerListResponse>(
      `/functions/v1/public-banners?type=${type}`
    );
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "fetch failed";
    return NextResponse.json({ data: [], error: message }, { status: 500 });
  }
}
