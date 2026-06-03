# Novella storefront — performance guide

## What is already configured

| Item | Location |
|------|----------|
| WebP/AVIF via Next Image | `next.config.ts` → `images.formats` |
| Long-cache static assets (CDN-friendly) | `next.config.ts` → `headers()` for `/covers`, `/categories`, logo/favicons |
| Compressed WebP assets | `public/covers`, `public/categories` — regenerate with `npm run optimize:images` |
| Trimmed Google Fonts (400 + 600 only) | `src/app/layout.tsx` |
| Server-rendered shop (20 books/page) | `src/app/shop/page.tsx`, `getShopPageData.ts` |
| Strapi-ready config | `src/config/strapi.ts`, `NEXT_PUBLIC_STRAPI_IMAGE_HOST` |

## Compress images after adding new covers

```bash
cd apps/storefront
npm run optimize:images
```

Then point catalog `coverImageSrc` / category `imageSrc` at the generated `.webp` paths.

## Measure with Lighthouse

1. Start the app: `npm run dev`
2. In another terminal:

```bash
npm run perf:lighthouse
```

Also run **Chrome DevTools → Lighthouse** (Mobile) on `/`, `/shop`, and one book page. Compare scores before/after asset changes.

## Production / CDN

- Deploy on **Vercel** (or any CDN in front of static files).
- `Cache-Control: public, max-age=31536000, immutable` is set for covers and categories; bump filenames when images change.
- Enable compression (Brotli/gzip) at the host — Vercel does this by default.

## When Strapi is connected

Set environment variables:

```env
STRAPI_API_URL=https://cms.example.com
NEXT_PUBLIC_STRAPI_IMAGE_HOST=cms.example.com
STRAPI_REVALIDATE_SECONDS=60
```

Implementation checklist:

1. Fetch books with `pagination[pageSize]=20` and `pagination[page]=…`.
2. Use Strapi media URLs as `coverImageSrc`; `next/image` will optimize via `remotePatterns`.
3. Replace `getShopPageData` catalog source with Strapi fetch + `revalidate: strapiConfig.revalidateSeconds`.
4. Run `npm run optimize:images` only for local fallbacks; prefer Strapi transforms or a CDN (Cloudinary, Imgix) for delivery sizes.
