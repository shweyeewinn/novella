# Novella CMS (Strapi 5)

Content API for the Novella storefront: books, blog posts, browse categories, and site settings.

## URLs

| Service | URL |
|---------|-----|
| REST API | http://localhost:1337/api |
| Admin panel | http://localhost:1337/admin |

## First-time setup

```bash
cd apps/strapi
cp .env.example .env   # if needed
npm install
npm run develop
```

1. Open http://localhost:1337/admin and create your administrator account.
2. On first boot, seed data loads from `database/seed/` (exported from the storefront catalog).
3. Public **find** / **findOne** permissions are applied automatically for catalog types.

## Re-export seed data from storefront

```bash
cd apps/storefront
npm run export:cms-seed
```

Then restart Strapi (empty DB only — seed runs when tables are empty).

## Content types

| Type | API path | Purpose |
|------|----------|---------|
| Book | `/api/books` | Shop catalog, checkout prices |
| Blog post | `/api/blog-posts` | `/blog` |
| Browse category | `/api/browse-categories` | Home + `/categories` tiles |
| Site setting | `/api/site-setting` | Tagline, contact, bank transfer copy |

## Storefront env

In `apps/storefront/.env.local`:

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_URL=http://localhost:1337
STRAPI_REVALIDATE_SECONDS=60
```

Optional read token: `STRAPI_API_TOKEN` (Settings → API Tokens in Strapi).
