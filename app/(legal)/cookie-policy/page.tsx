import type { Metadata } from 'next';
import LegalShell from '../_layout-shared';
import JsonLd from '@/components/shared/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { pageSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';

const title = `Cookie Policy | ${SITE.name}`;
const description =
  `Learn about essential, analytics, consent, and embedded-service cookies that may be used on ${SITE.domain}, plus how to manage them.`;

export const metadata: Metadata = pageMetadata({ title, description, path: '/cookie-policy' });

export default function CookiePolicyPage() {
  return (
    <>
      <JsonLd data={pageSchema({ name: title, description, path: '/cookie-policy' })} />
      <LegalShell eyebrow="Legal · Cookies" title="Cookie policy" updatedAt="2 October 2026">
      <p>
        Cookies and similar technologies are small files or browser storage
        used to operate websites, remember choices, and understand usage. This
        page describes the categories that may be used on {SITE.domain}.
      </p>

      <h2>1. Categories that may be used</h2>
      <ul>
        <li>
          <strong>Essential</strong> — support site security, core functionality,
          and consent preferences.
        </li>
        <li>
          <strong>Analytics</strong> — help us understand aggregate page usage
          and performance. Vercel Analytics is used. Google Analytics is
          optional and loads only after you accept analytics. Its cookies on this
          site use the site_ga prefix and a 180-day expiration that may refresh
          when you visit. Google advertising storage and personalization are disabled.
        </li>
        <li>
          <strong>Embedded services</strong> — Cal.com and other embedded tools
          may set their own cookies when you use those features.
        </li>
      </ul>

      <h2>2. Managing cookies</h2>
      <p>
        Use Analytics choices at the lower-left of the page to accept or reject
        Google Analytics, or withdraw your choice later. Your choice is stored in
        first-party local storage for up to 180 days and applies separately to
        this website. Rejecting prevents the Google tag from loading; withdrawing
        stops future measurement and removes this tag&apos;s cookies on this site,
        without removing data already sent. You can also block or delete cookies
        in your browser settings. Blocking
        essential storage may affect site or embedded booking functionality.
      </p>

      <h2>3. Updates</h2>
      <p>
        Cookie use can change when site features or providers change. The date
        above identifies the current version of this policy.
      </p>

      <h2>4. Contact</h2>
      <p>
        Questions? <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
      </LegalShell>
    </>
  );
}
