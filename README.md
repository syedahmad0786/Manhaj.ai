# Manhaj

Production source for [manhaj.ahmadbukhari.com](https://manhaj.ahmadbukhari.com).

The site is a self-contained static HTML application with clean client-side routes for the foundation, process, pricing, founder story, audit, and three interactive demo kiosks. Vercel rewrites those routes to `index.html`, while the browser router preserves direct links and back/forward navigation.

The primary booking CTA is the same Cal.com event used by AhmadBukhari.com:

`https://cal.com/ahmad-bukhari/ai-consultancy-call-with-ab`

No build step or environment variables are required.

Vercel automatically deploys the production site from the `main` branch.
