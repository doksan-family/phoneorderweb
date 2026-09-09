const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

/**
 * Supabase Storage 공개 버킷의 상대 경로를 브라우저에서 바로 볼 수 있는 URL로 바꾼다.
 * 관리자 응답은 image_url 없이 image_path만 주는 경우가 있어 화면에서 조립한다.
 */
export function storagePublicUrl(
  bucket: string,
  path: string | null | undefined
): string | null {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.replace(/^\/+/, "");
  return `${BASE_URL}/storage/v1/object/public/${bucket}/${clean}`;
}
