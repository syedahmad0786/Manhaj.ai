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
      <LegalShell eyebrow="Legal · Cookies" title="Cookie policy" updatedAt="22 July 2026">
      <p>
        Cookies and similar technologies are small files or browser storage
        used to operate websites, remember choices, and understand usage. This
        page describes the categories that may be used on {SITE.domain}.
      </p>

      <h2>1. Categories that may be used</h2>
      <ul>
        <li>
          <strong>Essential</strong> — support site security, core functionality,
          and consent preferences where a consent tool is configured.
        </li>
        <li>
          <strong>Analytics</strong> — help us understand aggregate page usage
          and performance. Vercel Analytics is used; other analytics tags run
          only when they are configured.
        </li>
        <li>
          <strong>Embedded services</strong> — Cal.com and other embedded tools
          may set their own cookies when you use those features.
        </li>
      </ul>

      <h2>2. Managing cookies</h2>
      <p>
        Where a consent banner is available, use it to manage optional cookies.
        You can also block or delete cookies in your browser settings. Blocking
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
