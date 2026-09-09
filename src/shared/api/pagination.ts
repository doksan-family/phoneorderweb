/**
 * 목록 API 공통 페이지 정보(PaginationMeta) 파서.
 * 서버는 응답에 pagination(또는 bootstrap의 product_pagination)을 실어 주며
 * page/page_size가 limit/offset보다 우선한다.
 */

export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

function num(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function readPaginationMeta(response: unknown): PaginationMeta | null {
  const record =
    response && typeof response === "object"
      ? (response as Record<string, unknown>)
      : null;
  const raw = record?.pagination ?? record?.product_pagination;
  if (!raw || typeof raw !== "object") return null;

  const meta = raw as Record<string, unknown>;
  const page = num(meta.page, 1);
  const pageSize = num(meta.page_size ?? meta.limit, 20) || 20;
  const total = num(meta.total);

  return {
    page,
    pageSize,
    total,
    totalPages: num(meta.total_pages, Math.ceil(total / pageSize) || 0),
    hasPrevious:
      typeof meta.has_previous === "boolean" ? meta.has_previous : page > 1,
    hasNext:
      typeof meta.has_next === "boolean"
        ? meta.has_next
        : page * pageSize < total,
  };
}

/** pagination 필드가 없을 때 offset·현재까지 로드한 수·total로 다음 페이지 유무를 계산한다. */
export function hasMoreByOffset(
  offset: number,
  loadedCount: number,
  total: number
): boolean {
  return offset + loadedCount < total;
}

export const DEFAULT_PAGE_SIZE = 20;
/** 관리자 목록을 페이지 루프로 한 번에 받을 때 쓰는 페이지 크기. */
export const BULK_PAGE_SIZE = 100;
/** 페이지 루프 안전장치. 이 이상은 돌지 않는다. */
export const MAX_PAGE_LOOP = 50;
