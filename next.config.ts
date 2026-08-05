import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
    // 상품 이미지는 한 번 최적화하면 잘 바뀌지 않으므로 길게 캐시한다.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    formats: ["image/avif", "image/webp"],
    // 카드(2~4열)와 상세 갤러리에서 실제로 요청되는 폭만 남겨 변형 수를 줄인다.
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1920],
    imageSizes: [74, 96, 128, 192, 256, 384],
  },
};

export default nextConfig;
