#!/usr/bin/env node

const base = (process.argv[2] || process.env.SITE_BASE_URL || 'http://127.0.0.1:3002').replace(/\/$/, '');
const canonicalOrigin = 'https://manhaj.ahmadbukhari.com';
const indexNowKey = '9f9c710a340a48b0b596eeb78b7eda5f';
const failures = [];
const pages = new Map();

function fail(message) {
  failures.push(message);
}

async function fetchPath(path) {
  const response = await fetch(`${base}${path}`, {
    redirect: 'follow',
    headers: { 'user-agent': 'MANHAJ pre-publish verifier' },
  });
  const text = await response.text();
  return { response, text };
}

function matches(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

function decodeAttribute(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'");
}

const sitemapResult = await fetchPath('/sitemap.xml');
if (sitemapResult.response.status !== 200) fail(`sitemap.xml returned ${sitemapResult.response.status}`);
const canonicalUrls = matches(sitemapResult.text, /<loc>([^<]+)<\/loc>/g);
if (canonicalUrls.length !== 11) fail(`Expected 11 sitemap URLs; found ${canonicalUrls.length}`);

for (const canonicalUrl of canonicalUrls) {
  const canonical = new URL(canonicalUrl);
  const path = `${canonical.pathname}${canonical.search}`;
  const { response, text } = await fetchPath(path);
  pages.set(path, text);
  if (response.status !== 200) {
    fail(`${path} returned ${response.status}`);
    continue;
  }
  if (!/^text\/html/i.test(response.headers.get('content-type') || '')) {
    fail(`${path} did not return HTML`);
  }

  const titles = matches(text, /<title[^>]*>([\s\S]*?)<\/title>/gi);
  const descriptions = matches(text, /<meta\s+name=["']description["']\s+content=["']([^"']+)["'][^>]*>/gi);
  const canonicals = matches(text, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["'][^>]*>/gi);
  const h1s = matches(text, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi);
  if (titles.length !== 1 || !titles[0].trim()) fail(`${path} needs one non-empty title`);
  if (descriptions.length !== 1 || descriptions[0].trim().length < 70) fail(`${path} needs one useful meta description`);
  if (canonicals.length !== 1 || canonicals[0] !== canonicalUrl) fail(`${path} canonical mismatch: ${canonicals[0] || 'missing'}`);
  if (h1s.length !== 1) fail(`${path} has ${h1s.length} H1 elements`);
  if (/<meta\s+name=["']robots["'][^>]+noindex/i.test(text)) fail(`${path} is noindex despite being in the sitemap`);

  const jsonLdBlocks = matches(text, /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  if (!jsonLdBlocks.length) fail(`${path} has no JSON-LD`);
  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block);
    } catch (error) {
      fail(`${path} has invalid JSON-LD: ${error.message}`);
    }
  }
}

const internalPaths = new Set();
for (const [sourcePath, html] of pages) {
  for (const rawHref of matches(html, /<a\b[^>]*\shref=["']([^"']+)["'][^>]*>/gi)) {
    const href = decodeAttribute(rawHref);
    if (/^(?:mailto:|tel:|https?:\/\/|#|javascript:)/i.test(href)) continue;
    const url = new URL(href, `${canonicalOrigin}${sourcePath}`);
    if (url.origin !== canonicalOrigin || url.pathname.startsWith('/api/')) continue;
    internalPaths.add(url.pathname || '/');
  }
}
for (const path of internalPaths) {
  const { response } = await fetchPath(path);
  if (response.status >= 400) fail(`Internal link ${path} returned ${response.status}`);
}

for (const path of ['/kiosks/command-center', '/kiosks/errorlens', '/kiosks/onboarding']) {
  const { response, text } = await fetchPath(path);
  if (response.status !== 200) fail(`${path} returned ${response.status}`);
  if (!/<meta\s+name=["']robots["']\s+content=["']noindex,\s*follow["']/i.test(text)) {
    fail(`${path} must remain noindex,follow`);
  }
  if (!/Synthetic data|synthetic-data/i.test(text)) fail(`${path} lacks its synthetic-data disclosure`);
}
for (const path of ['/kiosks/_app/command-center.html', '/kiosks/_app/errorlens.html', '/kiosks/_app/onboarding.html']) {
  const { response, text } = await fetchPath(path);
  if (response.status !== 200) fail(`${path} returned ${response.status}`);
  if (!/<meta\s+name=["']robots["']\s+content=["']noindex,\s*nofollow["']/i.test(text)) {
    fail(`${path} must remain noindex,nofollow`);
  }
}

const robots = await fetchPath('/robots.txt');
if (robots.response.status !== 200) fail('robots.txt is unavailable');
for (const expected of ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', `${canonicalOrigin}/sitemap.xml`]) {
  if (!robots.text.includes(expected)) fail(`robots.txt is missing ${expected}`);
}

const llms = await fetchPath('/llms.txt');
if (llms.response.status !== 200 || !llms.text.startsWith('# MANHAJ')) fail('llms.txt is unavailable or malformed');

const keyFile = await fetchPath(`/${indexNowKey}.txt`);
if (keyFile.response.status !== 200 || keyFile.text.trim() !== indexNowKey) fail('IndexNow key file is unavailable or malformed');

const home = pages.get('/') || '';
if (!home.includes('https://ahmadbukhari.com/#person')) fail('Homepage schema lacks the canonical Ahmad Bukhari Person ID');
const audit = pages.get('/audit') || '';
if (!audit.includes('ahmad-bukhari/ai-consultancy-call-with-ab')) fail('Audit page lacks the canonical Cal.com booking slug');

const trustCorpus = [...pages.values()].join('\n');
for (const phrase of [
  'installed it last quarter',
  'Most clients add 2–4 modules',
  "we've built every layer before",
  'refined across real installs',
  'under 60 seconds, every time',
]) {
  if (trustCorpus.toLowerCase().includes(phrase.toLowerCase())) fail(`Unsupported claim remains: ${phrase}`);
}

if (failures.length) {
  console.error(`FAIL: ${failures.length} issue(s)`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`PASS: ${canonicalUrls.length} indexable URLs, ${internalPaths.size} internal routes, JSON-LD, discovery files, kiosks, booking, and entity IDs verified at ${base}.`);
