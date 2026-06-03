import { strapiConfig } from "@/config/strapi";

export type StrapiListResponse<T> = {
  data: T[];
  meta?: { pagination?: { page: number; pageCount: number; total: number } };
};

export type StrapiSingleResponse<T> = {
  data: T | null;
};

function apiBase(): string | null {
  const raw =
    strapiConfig.apiUrl?.trim() ||
    process.env.STRAPI_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_STRAPI_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/$/, "");
}

export function isStrapiEnabled(): boolean {
  return Boolean(apiBase());
}

export async function strapiFetch<T>(
  path: string,
  init?: RequestInit & { revalidate?: number }
): Promise<T | null> {
  const base = apiBase();
  if (!base) return null;

  const token = process.env.STRAPI_API_TOKEN?.trim();
  const { revalidate = strapiConfig.revalidateSeconds, ...rest } = init ?? {};

  try {
    const res = await fetch(`${base}/api${path}`, {
      ...rest,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...rest.headers,
      },
      next: { revalidate },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function strapiMediaUrl(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = apiBase();
  if (!base) return url;
  return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}
