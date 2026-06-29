---
name: project-nextjs-migration
description: Baterias Santa Fe was migrated from Vite/React to Next.js 15 App Router with Drizzle + Turso
metadata:
  type: project
---

The project was fully migrated from Vite + React SPA to Next.js 15 (App Router).

**Why:** User wants admin panel to manage batteries published to the site, with SQLite/Turso database.

**Stack:**
- Next.js 15, App Router, TypeScript
- Tailwind CSS v4 (same CSS, just changed build tool: `@tailwindcss/postcss` instead of `@tailwindcss/vite`)
- Drizzle ORM + `@libsql/client` for Turso (local SQLite file `dev.db` in development)
- `jose` for JWT auth (httpOnly cookie `auth_token`)

**Auth (hardcoded for now):**
- Credentials in `.env.local`: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`
- Default: admin / baterias2026
- Middleware at `middleware.ts` protects all `/admin/*` routes
- Login page at `/admin/login`

**DB:**
- Schema at `lib/db/schema.ts`, client at `lib/db/index.ts`
- `npm run db:push` creates tables (uses local `dev.db` if no Turso URL set)
- `npm run db:seed` populates initial 9 products
- For Turso production: set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in `.env.local`

**Structure:**
- `app/` — Next.js pages and API routes
- `components/` — Client components with `'use client'` (migrated from `src/components/`)
- `lib/db/` — Drizzle schema, client, seed
- `lib/auth.ts` — JWT helpers
- `middleware.ts` — Auth protection

**Admin panel:**
- `/admin` — Dashboard with product stats
- `/admin/productos` — Product list (edit/delete)
- `/admin/productos/nuevo` — Create product
- `/admin/productos/[id]` — Edit product

**How to apply:** When suggesting changes to auth, db, or admin features, remember the full flow above.
