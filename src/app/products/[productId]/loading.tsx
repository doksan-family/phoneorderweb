import { ProductDetailSkeleton } from "@/views/products/ui/ProductDetailSkeleton";

/** 상세도 서버 prefetch를 기다리므로 loading 경계가 있어야 클릭 즉시 전환된다. */
export default function ProductDetailLoading() {
  return <ProductDetailSkeleton />;
}
