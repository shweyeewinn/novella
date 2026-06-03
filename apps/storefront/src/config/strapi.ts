/**
 * Strapi / CMS integration — used when the catalog moves off static JSON.
 * Set env vars in production (see PERFORMANCE.md).
 */
function resolveApiUrl(): string {
  return process.env.STRAPI_API_URL?.trim() || process.env.NEXT_PUBLIC_STRAPI_URL?.trim() || "";
}

export const strapiConfig = {
  apiUrl: resolveApiUrl(),
  /** Hostname only, e.g. cms.example.com — enables next/image remotePatterns */
  imageHost: process.env.NEXT_PUBLIC_STRAPI_IMAGE_HOST ?? "",
  defaultPageSize: 20,
  /** ISR seconds for shop/home when fetching from Strapi */
  revalidateSeconds: Number(process.env.STRAPI_REVALIDATE_SECONDS ?? "60"),
} as const;

export function strapiImageRemotePattern() {
  const patterns: {
    protocol: "http" | "https";
    hostname: string;
    port?: string;
    pathname: string;
  }[] = [];

  if (strapiConfig.imageHost) {
    patterns.push({
      protocol: "https",
      hostname: strapiConfig.imageHost,
      pathname: "/uploads/**",
    });
  }

  const apiUrl = strapiConfig.apiUrl;
  if (apiUrl) {
    try {
      const parsed = new URL(apiUrl);
      patterns.push({
        protocol: parsed.protocol === "https:" ? "https" : "http",
        hostname: parsed.hostname,
        ...(parsed.port ? { port: parsed.port } : {}),
        pathname: "/uploads/**",
      });
    } catch {
      /* ignore invalid URL */
    }
  }

  return patterns;
}
