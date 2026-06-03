/**
 * Strapi / CMS integration — used when the catalog moves off static JSON.
 * Set env vars in production (see PERFORMANCE.md).
 */
export const strapiConfig = {
  apiUrl: process.env.STRAPI_API_URL ?? "",
  /** Hostname only, e.g. cms.example.com — enables next/image remotePatterns */
  imageHost: process.env.NEXT_PUBLIC_STRAPI_IMAGE_HOST ?? "",
  defaultPageSize: 20,
  /** ISR seconds for shop/home when fetching from Strapi */
  revalidateSeconds: Number(process.env.STRAPI_REVALIDATE_SECONDS ?? "60"),
} as const;

export function strapiImageRemotePattern() {
  if (!strapiConfig.imageHost) return [];
  return [
    {
      protocol: "https" as const,
      hostname: strapiConfig.imageHost,
      pathname: "/uploads/**",
    },
  ];
}
