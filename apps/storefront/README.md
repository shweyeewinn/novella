# Novella storefront

Next.js 16 app for the Novella online bookstore (physical books). Part of the [Novella monorepo](../../README.md).

## Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS v4** — Cozy Book theme in `src/app/globals.css`
- **Zustand** — cart and wishlist (`localStorage`)
- **next/image** — WebP/AVIF, optimized covers

## Quick start

```bash
# From repo root
npm install
npm run dev

# Or from this folder
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run optimize:images` | Compress `public/covers`, `public/categories`, logo → WebP |
| `npm run perf:lighthouse` | Run Lighthouse (requires dev server) |

## Docs

- **[CODING_STANDARDS.md](./CODING_STANDARDS.md)** — core rules and L0–L4 feature scales
- **[Git & release workflow](../../docs/GIT_AND_RELEASE.md)** — branches, commits, PRs, secrets

## Key directories

| Path | Purpose |
|------|---------|
| `src/app/` | Routes (home, shop, search, PDP, cart, checkout, blog, …) |
| `src/features/books/` | Catalog: `preOrderBooks`, `newReleaseBooks`, `catalog.ts` |
| `src/features/home/` | Home sections, carousels, browse categories |
| `src/features/shop/` | Server shop: `getShopPageData`, filters, pagination |
| `src/shared/components/` | Header, logo, book cards, search, UI primitives |
| `public/covers/` | Jacket WebP assets (`pre-order/`, `new-releases/`) |
| `public/categories/` | Browse-by-category tile images |
| `scripts/optimize-images.mjs` | Sharp-based asset pipeline |

## Catalog (current)

- **5 pre-orders** — `preOrderBooks.ts`, images in `public/covers/pre-order/`
- **8 new arrivals** — `newReleaseBooks.ts`, images in `public/covers/new-releases/`
- Only titles with `coverImageSrc` appear in the shop (`catalog.ts` filters placeholders out)
- Demo `mockBooks` array is empty

## Notable behavior

- **Home:** Pre-Orders + New Arrivals carousels; Browse by category (8 tiles). Extra shelves commented in `homeSections.ts`.
- **Shop:** Server-rendered; 20 books per page; filters in URL (`formats`, `categories`, `sort`, `page`, `collection`).
- **Search:** Dedicated `/search?q=` page (shop is browse/filters only).
- **Header:** Logo image, top-bar search on mobile, active route highlighted in primary color.
- **Performance:** See [PERFORMANCE.md](./PERFORMANCE.md) (CDN cache headers, font subsetting, Strapi env template).

## Configuration

- **Site:** `src/config/site.ts` (name, tagline, logo path, owner email)
- **Nav:** `src/shared/config/nav.ts`
- **Strapi (future):** `src/config/strapi.ts` + env vars documented in PERFORMANCE.md
- **Next:** `next.config.ts` (image formats, static cache headers, remote image patterns)

## Adding a book

1. Add cover PNG/JPEG under `public/covers/…`
2. Run `npm run optimize:images`
3. Add entry to `preOrderBooks.ts` or `newReleaseBooks.ts` with `.webp` `coverImageSrc` and `collections` as needed
4. Rebuild — PDP routes are generated from `getAllBooks()` in `generateStaticParams`

## Environment (production / Strapi)

```env
STRAPI_API_URL=
NEXT_PUBLIC_STRAPI_IMAGE_HOST=
STRAPI_REVALIDATE_SECONDS=60
```

## Related docs

- [Monorepo README](../../README.md) — architecture, checkout flow, design tokens
- [PERFORMANCE.md](./PERFORMANCE.md) — images, Lighthouse, CDN, Strapi checklist
