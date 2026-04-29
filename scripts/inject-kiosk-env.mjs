#!/usr/bin/env node
/**
 * Build-time substitution for the kiosk static HTML files.
 *
 * The kiosks live under /public/kiosks/ and are served verbatim, so they
 * can't read NEXT_PUBLIC_* env vars at runtime. This script runs before
 * `next build`, replaces tokens in those files, and writes them back.
 *
 * Idempotent: if NEXT_PUBLIC_GTM_ID isn't set, the token is left untouched
 * and a warning is logged so the deploy still succeeds.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const KIOSK_DIR = join(ROOT, '..', 'public', 'kiosks');
const TARGETS = [
  'index.html',
  'command-center/index.html',
  'errorlens/index.html',
  'onboarding/index.html',
];

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

if (!gtmId) {
  console.warn(
    '[kiosk-env] NEXT_PUBLIC_GTM_ID not set — leaving __GTM_ID__ tokens untouched. ' +
      'Kiosks will not fire GTM events until the env var is configured.'
  );
}

let touched = 0;
for (const rel of TARGETS) {
  const path = join(KIOSK_DIR, rel);
  try {
    const original = await readFile(path, 'utf8');
    if (!gtmId) continue;
    const next = original.replaceAll('__GTM_ID__', gtmId);
    if (next !== original) {
      await writeFile(path, next, 'utf8');
      touched++;
      console.log(`[kiosk-env] injected GTM into ${rel}`);
    }
  } catch (err) {
    console.error(`[kiosk-env] failed on ${rel}:`, err);
  }
}

if (gtmId) console.log(`[kiosk-env] done, touched=${touched}`);
