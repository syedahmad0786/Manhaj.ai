import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { trackLeadSubmission } from '../lib/analytics.ts';

test('only a successful non-honeypot response emits the fixed lead event', () => {
  const events = [];
  globalThis.window = { siteAnalytics: { track: (name) => events.push(name) } };
  try {
    trackLeadSubmission(true, true); // The API deliberately returns 200 for bots.
    trackLeadSubmission(false, false);
    trackLeadSubmission(false, true);
    assert.deepEqual(events, []);
    trackLeadSubmission(true, false);
    assert.deepEqual(events, ['lead_form_submit']);
  } finally { delete globalThis.window; }
});

test('the live form passes the submitted honeypot to the helper and preserves success UI', async () => {
  const form = await readFile(new URL('../components/audit/AuditForm.tsx', import.meta.url), 'utf8');
  assert.match(form, /trackLeadSubmission\(res\.ok, Boolean\(payload\.website\)\);\s*setStatus\('sent'\)/);
  const route = await readFile(new URL('../app/api/lead/route.ts', import.meta.url), 'utf8');
  assert.match(route, /if \(data\.website\) \{\s*return NextResponse\.json\(\{ ok: true \}\)/);
});
