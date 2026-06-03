import type { NextConfig } from "next";
import { strapiImageRemotePattern } from "./src/config/strapi";

const staticAssetCache = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [...strapiImageRemotePattern()],
  },
  async headers() {
    return [
      {
        source: "/covers/:path*",
        headers: staticAssetCache,
      },
      {
        source: "/categories/:path*",
        headers: staticAssetCache,
      },
      {
        source: "/:file(favicon-16.png|favicon-32.png|favicon-48.png|favicon-192.png|apple-touch-icon.png)",
        headers: staticAssetCache,
      },
    ];
  },
};

export default nextConfig;
