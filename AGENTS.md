# Novella monorepo — agent guide

## Docs (read before large changes)

| Doc | Purpose |
|-----|---------|
| [`docs/GIT_AND_RELEASE.md`](docs/GIT_AND_RELEASE.md) | Branches, atomic commits, push checklist, secrets, PRs |
| [`apps/storefront/CODING_STANDARDS.md`](apps/storefront/CODING_STANDARDS.md) | Layer boundaries, core rules, L0–L4 scales |

## Storefront (`apps/storefront`)

- Catalog: `@/features/books/catalog` (static until Strapi)
- Server persistence (dev): `src/lib/*` + `apps/storefront/.data/` (gitignored)
- Cart/wishlist: Zustand only — not orders/auth
- Checkout today: bank transfer + Messenger; Stripe is planned

## Commands

```bash
# Repo root
npm install && npm run dev

# Storefront only
cd apps/storefront
npm run typecheck && npm run lint && npm run build
npm run seed:user
```

## Next.js

Next.js 16 in this repo may differ from older docs. Check `node_modules/next/dist/docs/` when unsure.
