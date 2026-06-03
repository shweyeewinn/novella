# Novella storefront — coding standards

How we structure code, how strict each layer should be, and what “done” means for a change.

**Git & releases:** see [`../../docs/GIT_AND_RELEASE.md`](../../docs/GIT_AND_RELEASE.md).

## Core rules (always)

1. **Server owns truth** — Prices, stock, orders, auth, and reviews are validated in `src/lib/*` and `src/app/api/*`. The client sends IDs and quantities only; never trust cart prices from the browser.

2. **Layer boundaries**
   - `src/types/` — shared TypeScript shapes only (no runtime logic).
   - `src/lib/` — server-safe data access, auth, repositories, business rules.
   - `src/app/` — routes, metadata, thin page components (fetch → pass props).
   - `src/features/` — route-specific UI and client flows (forms, carousels, views).
   - `src/shared/` — reusable UI with no knowledge of `.data` or API secrets.
   - Prefer `@/lib/*` and `@/types/*` over duplicating logic in `features/`.

3. **Client state is narrow** — Zustand + `localStorage` only for **cart** and **wishlist**. Accounts, orders, and reviews use HTTP APIs and cookies.

4. **One visual language** — Reuse `PageHeader`, `Field`, `Input`, `Button` / `ButtonLink`, `StatusBadge`, `SectionHeading`, and tokens from `globals.css`.

5. **Accessible interactions** — Buttons for actions; `aria-label` on icon-only controls; `role="alert"` / `role="status"` for errors.

6. **Quiet commerce UX** — No toast spam or “added to cart” lines under cards; header cart count is enough feedback.

7. **Security defaults** — HttpOnly session cookie; generic forgot-password messages; `ADMIN_SECRET` for admin routes; `.data/` gitignored; no secrets in `NEXT_PUBLIC_*`.

8. **Small diffs** — Match existing naming and file placement. Extend repositories instead of duplicating JSON read/write.

9. **API route shape** — Use `lib/api/response.ts` (`jsonError`, `jsonOk`, `parseJsonBody`).

10. **Pages stay thin** — Server components load data; `"use client"` only for forms, carousels, and stores.

## Scales (maturity levels)

Use when planning or reviewing work. New code should target **L2** minimum; checkout/auth/reviews target **L3**.

| Level  | Name         | Meaning                                                               |
| ------ | ------------ | --------------------------------------------------------------------- |
| **L0** | Prototype    | UI works with mocks; rules optional                                   |
| **L1** | Interactive  | Works in browser; client or static data (cart, static catalog)        |
| **L2** | App-standard | `lib/` repos, shared UI, typed APIs                                   |
| **L3** | Production   | Auth gates, purchase checks, env secrets, clean `typecheck` + `build` |
| **L4** | Operated     | Strapi, transactional email, Stripe/bank ops in CMS, monitoring       |

**Promotion checklist**

- L1 → L2: move data access to `lib/`, types to `types/`, use shared UI.
- L2 → L3: server validation, eligibility rules, document env in `.env.example`.
- L3 → L4: Strapi (or managed DB), email, role-based admin.

## Folder cheat sheet

```
src/
  types/          # Book, Order, User, BookReview, …
  lib/
    catalog/      # via features/books/catalog.ts (static until Strapi)
    orders/       # Order repository → .data/orders.json (dev)
    auth/         # Users, session, password, shipping helpers
    reviews/      # Reviews + purchase eligibility
    data/         # jsonStore
    api/          # Route handler helpers
  app/            # Next.js App Router + API routes
  features/       # Page-level UI & client flows
  shared/         # Design system & layout
  config/         # site.ts, strapi.ts
```

## PR checklist (copy into PRs)

- [ ] `npm run typecheck` and `npm run build` pass in `apps/storefront`
- [ ] No `.env` or `.data/` files staged
- [ ] Matches core rules and appropriate scale (L2+)
- [ ] New env vars documented in root `.env.example`
- [ ] Test plan run (checkout path if touched)

## Local backend users (dev only)

```bash
npm run seed:user
# Default: demo@novella.local / novella-demo
```

Users live in `.data/users.json` — never commit this folder.
