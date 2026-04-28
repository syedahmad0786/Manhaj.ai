# Manhaj.ai

Marketing site for Manhaj — *the AI Operating System architected uniquely for your business.*

The site is a single self-contained `index.html` that unpacks its assets at runtime. No build step.

## Routes

| Route | What it serves |
|---|---|
| `/` | Marketing site (`index.html`) |
| `/kiosks/` | Live demo hub — Manhaj-branded landing for the three kiosks |
| `/kiosks/command-center/` | Kiosk 01 · Command Center (AOS-001 · Layer 06) |
| `/kiosks/errorlens/` | Kiosk 02 · ErrorLens Observability (AOS-001 · Layer 06) |
| `/kiosks/onboarding/` | Kiosk 03 · Operator Onboarding (AOS-001 · Layer 04) |

The marketing site shows a discreet floating **Live Demos →** pill (bottom-right) that links to `/kiosks/`. Kiosks are not embedded on the main page.

## Kiosk architecture

Each kiosk is a thin Manhaj-branded shell (`kiosks/<name>/index.html`) wrapping the original dashboard bundle in a sandboxed iframe (`kiosks/_app/<name>.html`). The shell carries the brand: black/gold/cream chrome, AOS-001 layer tag, exit nav, "Anonymized · Dummy data" footer. The dashboard inside is preserved as a real running client system — that is the brand promise (see `Manhaj-Brand-Positioning-One-Pager.md`, §03 "Live demos, not logos").

Shared kiosk assets live in `kiosks/_assets/` (`kiosk.css`, `kiosk.js`).

### Anonymization
The dashboard bundles are unpacked at build time, their embedded JSX/CSS assets are
patched to swap client identifiers (names, logos, brand palettes) for Manhaj
equivalents, and the bundles are repacked. See `tools/rebrand.py`. Run it any time
the originals at the repo root change:

```bash
python3 tools/rebrand.py
```

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
#         and http://localhost:8000/kiosks/
```

## Deploy — your personal accounts

> All steps below use **your personal** GitHub / Vercel / Supabase accounts. Do not connect under an organization.

### 1. GitHub (done)

Source lives at `https://github.com/syedahmad0786/Manhaj.ai`.

### 2. Vercel (one-click import)

1. Sign in to [vercel.com](https://vercel.com) with your **personal** GitHub (`syedahmad0786`).
2. **Add New → Project → Import** the `syedahmad0786/Manhaj.ai` repo.
3. Framework preset: **Other**. Build command: *leave blank*. Output dir: `.` (root).
4. (Optional) Add the env vars from `.env.example` if/when you wire up Supabase.
5. Deploy. `vercel.json` sets clean URLs, security headers, and cache rules for kiosk assets.

To use a custom domain (`manhaj.ai`):
- Vercel → Project → Settings → Domains → Add `manhaj.ai`.
- Point your DNS A record to `76.76.21.21` (or the CNAME Vercel shows).

### 3. Supabase (only if you need a backend)

The current site is fully static and **does not call Supabase**. Skip this step unless you plan to add forms / auth / a waitlist.

When you do:
1. Sign in to [supabase.com](https://supabase.com) with your **personal** account.
2. Create a new project (free tier is fine).
3. Copy the project URL and anon key into Vercel → Settings → Environment Variables (matching the names in `.env.example`).
4. Redeploy on Vercel so the new env vars are picked up.

## Files

| File / dir | Purpose |
|---|---|
| `index.html` | Deployable marketing site, with kiosk-link injection script. |
| `kiosks/index.html` | Manhaj-branded kiosk hub. |
| `kiosks/<name>/index.html` | Manhaj-branded kiosk shell (header, iframe, footer). |
| `kiosks/_app/<name>.html` | Dashboard bundle served inside kiosk iframe. |
| `kiosks/_assets/kiosk.css` | Shared kiosk chrome styles (Manhaj palette). |
| `kiosks/_assets/kiosk.js` | Iframe loader + fade-in. |
| `*_standalone_.html` (root) | Original source bundles, kept for reference. |
| `vercel.json` | Hosting config — clean URLs, security headers, cache. |
| `.env.example` | Placeholder env vars for future Supabase wiring. |
| `Manhaj-Brand-Positioning-One-Pager.md` | Brand reference. |
