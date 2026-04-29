# Manhaj.ai

Marketing site for Manhaj — *the AI Operating System architected uniquely for your business.*

This is a **Next.js 15 (App Router) + TypeScript + Tailwind 4** application, deployed on Vercel. The three live demo kiosks are static HTML served from `/public/kiosks/` so they boot instantly and don't go through Next's React render path.

---

## Quick start

```bash
cp .env.example .env.local        # then fill in the keys you have
npm install
npm run dev                       # http://localhost:3000
```

Production build:

```bash
npm run build && npm start
```

The `prebuild` step runs `scripts/inject-kiosk-env.mjs`, which substitutes `__GTM_ID__` placeholders in the static kiosk HTML with whatever `NEXT_PUBLIC_GTM_ID` you've set — so the kiosks fire the same GTM container as the rest of the site.

---

## Routes

### Marketing (Next.js)
| Route | Page |
|---|---|
| `/` | Home — hero, foundation, pillars, demos, manifesto, process, CTA |
| `/foundation` | AOS-001 6-layer deep dive |
| `/process` | Five-step install lifecycle |
| `/pricing` | Foundation / Operator / Architect tiers |
| `/about` | Founder narrative + ICP |
| `/audit` | Lead-form + Cal.com inline embed |
| `/privacy` · `/terms` · `/cookie-policy` | Legal (Termly placeholders — see below) |

### Kiosks (static HTML in `/public/kiosks/`)
| Route | What it is |
|---|---|
| `/kiosks/` | Manhaj-branded hub listing the three demos |
| `/kiosks/command-center/` | Kiosk 01 — Command Center (Layer 06 · Intelligence) |
| `/kiosks/errorlens/` | Kiosk 02 — ErrorLens Observability (Layer 06 · Alerts) |
| `/kiosks/onboarding/` | Kiosk 03 — Operator Onboarding (Layer 04 · Convert) |

### API
| Route | Method | What it does |
|---|---|---|
| `/api/lead` | POST | Validates payload (zod) → triple-writes to Resend + Supabase + n8n |

---

## Architecture

```
app/
  layout.tsx        — root layout, fonts, GTM, CookieYes, Nav, Footer
  page.tsx          — home composition
  (legal)/...       — privacy, terms, cookie-policy
  api/lead/route.ts — POST handler
  sitemap.ts · robots.ts · not-found.tsx · opengraph-image.tsx
components/
  layout/{Nav,Footer}.tsx
  home/{Hero,Manifesto,Pillars,LayerDiagram,DemosCallout,ProcessMini,FinalCTA}.tsx
  audit/{AuditForm,CalEmbed}.tsx
  ui/{Button,Eyebrow,Reveal}.tsx
lib/
  site.ts           — top-level brand strings
  data/             — single source of truth: layers, pricing, pillars, process, nav
  {supabase,resend,analytics,lead}.ts
public/
  kiosks/           — static demos (do not edit HTML directly; regenerate via tools/rebrand.py)
scripts/
  inject-kiosk-env.mjs — prebuild step that substitutes __GTM_ID__ in kiosk HTML
tools/
  rebrand.py        — anonymizes the source dashboards into public/kiosks/_app/
  sources/          — archived original Antigravity bundle (reference only)
*_standalone_.html  — original dashboard sources at repo root (rebrand.py reads these)
```

---

## Design tokens

The single source of truth is `app/globals.css`:

```css
@theme {
  --color-ink:   #0A0A0B;   /* backgrounds */
  --color-gold:  #C9A961;   /* accents */
  --color-cream: #F5F2EA;   /* text */
  /* …gold-soft, gold-mute, ink-2/3, line, line-2, mute */
}
```

Use Tailwind utilities directly: `bg-ink`, `text-cream`, `border-gold`, `font-serif`, `font-mono`. Don't add new CSS files unless absolutely required — extend `@theme` instead.

Type stack:
- **Cormorant Garamond** for display headlines (`font-serif`)
- **Inter** for body (`font-sans`, default)
- **JetBrains Mono** for eyebrows, AOS-001 tags, and system labels (`font-mono`)

All three are loaded via `next/font/google` in `app/layout.tsx` — no FOUT.

---

## Kiosk regeneration

The kiosks under `public/kiosks/_app/` are generated from the originals at the repo root. Re-run any time you replace the source bundles:

```bash
npm run rebrand     # equivalent to: python3 tools/rebrand.py
```

The script anonymizes the embedded React bundles (text, logos, palette) and writes the rebranded copies into `public/kiosks/_app/`. The wrapper pages at `public/kiosks/{name}/index.html` and the hub at `public/kiosks/index.html` are hand-authored — edit them directly if you want to tweak the chrome.

---

## Deploy — your personal accounts

> All steps below use **your personal** GitHub / Vercel / Supabase / Resend / Cal.com accounts. Do not connect under an organization.

### GitHub (done)
Source lives at `https://github.com/syedahmad0786/Manhaj.ai`. Vercel watches `main`.

### Vercel — Project settings
| Setting | Value |
|---|---|
| Framework preset | **Next.js** |
| Build command | `npm run build` (default) |
| Output directory | leave blank |
| Install command | `npm install` |

Add these environment variables (see `.env.example` for the full list):
- `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- `N8N_WEBHOOK_URL`
- `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_COOKIEYES_ID`, `NEXT_PUBLIC_CAL_LINK`

### Supabase — leads table

```sql
create table public.leads (
  id          bigint generated always as identity primary key,
  name        text not null,
  email       text not null,
  company     text,
  role        text,
  revenue     text,
  stack       text,
  when_band   text,
  notes       text,
  source      text default 'audit-form',
  created_at  timestamptz default now()
);
```

### Resend
Verify the sending domain (`manhaj.ai` or your chosen sender). Use the API key in `RESEND_API_KEY`.

### Cal.com
Set up the discovery event type (45 min). Note the slug — the public link is `https://cal.com/<your-slug>`. Put `<your-slug>` (without the prefix) in `NEXT_PUBLIC_CAL_LINK`.

### Termly (legal)
Generate Privacy / Terms / Cookie Policy for `manhaj.ahmadbukhari.com`. Paste the body content into the three pages under `app/(legal)/`. Each page already has a `// REPLACE:` marker — keep the surrounding `<LegalShell>` wrapper.

### CookieYes
Sign up, scan `manhaj.ahmadbukhari.com`, copy the script ID into `NEXT_PUBLIC_COOKIEYES_ID`. The banner loads via `next/script` with `beforeInteractive` strategy so consent is captured before GTM fires.

---

## Files at root

| File | Purpose |
|---|---|
| `Manhaj-Brand-Positioning-One-Pager.md` | Brand reference — copy source for the marketing pages. **Don't paraphrase**, lift verbatim. |
| `*_standalone_.html` | Original dashboard sources (rebrand input). Don't delete. |
| `tools/sources/` | Archived original Antigravity index.html bundle. |
| `vercel.json` | Hosting headers (security, kiosk caching). |
| `.env.example` | Env var template — fill in `.env.local` for dev, Vercel UI for prod. |
