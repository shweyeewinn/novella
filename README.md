# Novella

Book commerce platform — Next.js storefront, Strapi CMS, Stripe checkout.

**Owner:** Shwe Yee Winn · [yonngelay@gmail.com](mailto:yonngelay@gmail.com)

## Structure

| Path | Purpose |
|------|---------|
| `apps/storefront` | Next.js shop (Zustand cart, Modern Library theme) |
| `apps/strapi` | *(planned)* CMS, checkout validation, Stripe webhooks |

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Storefront pages

| Route | Description |
|-------|-------------|
| `/` | Home — featured books, categories |
| `/shop` | Catalog with search, filters, sort |
| `/books/[slug]` | Book detail + add to cart |
| `/cart` | Cart (Zustand + localStorage) |
| `/checkout` | Review order → server validates prices |
| `/checkout/success` | Thank you (demo until Stripe) |
| `/checkout/cancel` | Payment abandoned |
| `/about` | About Novella |
| `/contact` | Contact form |

Checkout calls `POST /api/checkout` with `{ items: [{ id, quantity }] }` only — prices are computed on the server from mock catalog data (Strapi later).

## Git identity (local to this machine)

```bash
cd "/Users/yemaung/Documents/Shwe Portfolio/novella"
git config user.name "Shwe Yee Winn"
git config user.email "yonngelay@gmail.com"
```
