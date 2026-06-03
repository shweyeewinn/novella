# Git & release workflow (Novella)

How to move local work to the remote repository without breaking the storefront, leaking secrets, or cluttering history. Written for the **current** Novella stack and the **planned** Strapi + payment integrations.

## What we ship today vs later

| Area | Today (local / staging) | Production target |
|------|-------------------------|-------------------|
| Storefront | Next.js 16, `apps/storefront` | Vercel or similar + preview URLs per PR |
| Catalog | Static TS modules + `public/covers/` | Strapi `Book` collection |
| Cart / wishlist | Zustand + `localStorage` (client only) | Unchanged |
| Auth / orders (dev) | `.data/*.json` under storefront | **Must not** rely on JSON files in prod |
| Checkout payment | Bank transfer + Messenger proof | Stripe (optional later) |
| CMS | `apps/strapi` (Strapi 5) | PostgreSQL + schema export in prod |

Commit and PR messages should describe **what is actually merged**, not future Stripe/Strapi work unless that PR implements it.

---

## Branch model

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready; protected |
| `staging` | Integration / QA before `main` |
| `feature/<scope>-<short-name>` | One feature or fix (e.g. `feature/checkout-server-orders`) |

Avoid long-lived branches. Rebase the feature onto `staging` before opening a PR.

### Commit author (backend vs storefront)

Default repo identity stays **Shwe Yee Winn** / **yonngelay@gmail.com** for UI and content work.

For **backend** branches (e.g. `feature/strapi-cms-backend`), local git loads `.gitconfig-author-backend` via:

```bash
git config --local includeIf.onbranch:feature/strapi-cms-backend.path "$(pwd)/.gitconfig-author-backend"
```

That sets commits on that branch to **Ye Maung Maung** / **yemaung.dev@gmail.com** automatically.

Override for a single commit (e.g. a small UI fix on the same branch):

```bash
git commit --author="Shwe Yee Winn <yonngelay@gmail.com>" -m "fix(storefront): ..."
```

One-off backend commit on another branch:

```bash
git commit --author="Ye Maung Maung <yemaung.dev@gmail.com>" -m "feat(cms): ..."
```

---

## Atomic commits

One commit = one logical change. Split unrelated work.

**Good examples (current stack):**

```text
feat(checkout): persist orders and validate pre-order stock
fix(checkout): guard missing shipping on auth/me response
feat(auth): server session and seed:user script
docs: add git and release workflow
```

**Avoid:**

```text
fixed everything
wip
updates
```

Use [Conventional Commits](https://www.conventionalcommits.org/) prefixes: `feat`, `fix`, `docs`, `refactor`, `chore`, `test`.

**Scopes** (pick one per commit): `storefront`, `checkout`, `auth`, `cart`, `cms`, `docs`, `ci`.

---

## Push checklist (step-by-step)

### 1. Synchronize with remote

```bash
cd "/Users/yemaung/Documents/Shwe Portfolio/novella"
git fetch origin
git checkout staging
git pull origin staging
```

If your team uses `main` as the integration branch, replace `staging` with `main`.

### 2. Rebase your feature (prefer over merge)

```bash
git checkout feature/your-branch
git rebase staging
```

Resolve conflicts **on your machine**. Do not push conflict markers to the remote.

If you already pushed the branch and rebased, you may need a safe force push **only on your feature branch**:

```bash
git push --force-with-lease origin feature/your-branch
```

Never force-push `main` or `staging`.

### 3. Pre-push quality gate

From `apps/storefront`:

```bash
npm run typecheck
npm run lint
npm run build
```

From repo root (if workspaces are wired):

```bash
npm run check    # when defined at root
npm run build
```

### 4. Secret and local-data audit

Before every commit / PR, confirm **none** of these are staged:

| Never commit | Why |
|--------------|-----|
| `.env`, `.env.local`, `.env.*.local` | Secrets |
| `apps/storefront/.data/` | Dev users, orders, reviews |
| `node_modules/`, `.next/` | Build artifacts |
| Strapi `.tmp/`, `data.db`, `*.sqlite` (when CMS exists) | Local DB |

Only commit **`.env.example`** with dummy placeholders.

```bash
git status
git diff --cached --name-only
```

### 5. Push and open a Pull Request

```bash
git push -u origin feature/your-branch
```

Open a PR: **feature → staging** (then staging → main after QA).

**PR title:** same style as commits (e.g. `feat(checkout): persist orders server-side`).

**PR body should include:**

- **Summary** — 1–3 bullets, why not what-only
- **Test plan** — checkboxes a human can run
- **Env / migration notes** — new env vars in `.env.example`?

**Example test plan (storefront):**

- [ ] `npm run build` passes
- [ ] Guest: add pre-order + in-stock book → checkout → success URL + bank block
- [ ] Logged in: `/account` shows order after checkout
- [ ] Login / signup / logout; no console errors on `/checkout`

### 6. After merge to staging

- Smoke-test the **preview deployment** URL (if CI provides one)
- Run through checkout and auth on staging data (real DB when Strapi is live)
- Only then promote **staging → main** for production

---

## Pull Request size (Novella)

Align with feature maturity in [`apps/storefront/CODING_STANDARDS.md`](../apps/storefront/CODING_STANDARDS.md):

| PR type | Target |
|---------|--------|
| UI-only (spacing, copy, layout) | Small; screenshots welcome |
| New API + UI (auth, checkout) | One vertical slice; include test plan |
| Strapi schema | Schema/export only; no customer order data |
| Dependency bump | Isolated PR |

Do not mix “refactor entire auth” + “new blog layout” + “dependency upgrades” in one PR.

---

## Environment matrix

| Environment | Storefront data | Auth / orders | CMS |
|-------------|-----------------|---------------|-----|
| **Local** | Static catalog; `.data/*.json` OK | `npm run seed:user` | Optional local Strapi |
| **Staging** | Strapi or static (team choice) | Postgres or managed DB — **not** `.data/` | Strapi staging DB |
| **Production** | Strapi + CDN images | Postgres + secrets in host env | Strapi prod DB |

`SESSION_SECRET`, `ADMIN_SECRET`, future `STRIPE_*` and `STRAPI_*` keys are set in the hosting provider, not in git.

Copy templates from repo root [`.env.example`](../.env.example) into `apps/storefront/.env.local` locally.

---

## Strapi & database (when CMS is added)

- **Do** version content-type schemas (export, migration scripts, or Strapi Transfer for structure).
- **Do not** commit SQL dumps, SQLite files, or production customer/order rows.
- **Do not** run local seed scripts against production.
- Document schema changes in the PR and update `apps/strapi/schema/README.md` if types change.

---

## Pre-commit automation (recommended)

Seniors block broken code before it reaches the remote. Suggested setup (not yet required in all clones):

1. [Husky](https://typicode.github.io/husky/) at repo root
2. [lint-staged](https://github.com/lint-staged/lint-staged) on `apps/storefront/**/*.{ts,tsx}`:
   - `eslint --max-warnings 0`
   - `prettier --check` (or write on commit)
3. Optional: `npm run typecheck --workspace=storefront` on push via CI only if typecheck is slow locally

CI already runs check + build on PRs when `.github/workflows/ci.yml` is enabled — local hooks reduce failed PR cycles.

---

## Rollback strategy

Atomic history enables surgical rollback:

```bash
git log --oneline apps/storefront/src/app/api/checkout/
git revert <commit-sha>   # preferred on main/staging — no history rewrite
```

For production deploys, revert the merge commit on `main` and redeploy, or roll forward with a `fix:` commit. Avoid `git push --force` on shared branches.

---

## Quick reference

```bash
# Daily feature work
git checkout staging && git pull origin staging
git checkout -b feature/my-change
# ... edit, atomic commits ...
cd apps/storefront && npm run typecheck && npm run build
git push -u origin feature/my-change
# Open PR → staging

# Local dev user (backend JSON store)
cd apps/storefront && npm run seed:user
```

---

## Related docs

- [Storefront coding standards](../apps/storefront/CODING_STANDARDS.md) — layers, core rules, L0–L4 scales
- [Storefront README](../apps/storefront/README.md) — scripts and directories
- [Root README](../README.md) — architecture and implementation status
