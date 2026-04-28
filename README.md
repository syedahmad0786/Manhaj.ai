# Manhaj.ai

Marketing site for Manhaj — *the AI Operating System architected uniquely for your business.*

The site is a single self-contained `index.html` that unpacks its assets at runtime. No build step.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
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
5. Deploy. `vercel.json` already sets clean URLs and security headers.

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

| File | Purpose |
|---|---|
| `index.html` | The deployable site (copy of the standalone bundle). |
| `Manhaj.ai Website _standalone_.html` | Original source bundle, kept for reference. |
| `vercel.json` | Hosting config — clean URLs + security headers. |
| `.env.example` | Placeholder env vars for future Supabase wiring. |
| `Manhaj-Brand-Positioning-One-Pager.md` | Brand reference. |
