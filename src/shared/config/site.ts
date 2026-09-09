/**
 * 절대 URL 조립 기준값. OG 이미지·canonical·sitemap·robots·JSON-LD가 모두 이 값을 쓴다.
 *
 * 우선순위:
 * 1. NEXT_PUBLIC_SITE_URL — 커스텀 도메인을 붙이면 여기에 명시한다.
 * 2. VERCEL_PROJECT_PRODUCTION_URL — Vercel이 프로덕션 도메인을 주입한다(예: xxx.vercel.app).
 * 3. localhost — 로컬 개발 폴백.
 *
 * 죽은 도메인을 기본값으로 두면 소셜 미리보기 이미지가 통째로 깨지므로 하드코딩 도메인은 두지 않는다.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelHost) return `https://${vercelHost}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
