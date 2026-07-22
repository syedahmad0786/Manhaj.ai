import type { Metadata } from 'next';
import LegalShell from '../_layout-shared';
import JsonLd from '@/components/shared/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { pageSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';

const title = `Website Terms | ${SITE.name}`;
const description =
  `Terms governing use of ${SITE.domain}, its educational content, audit request form, booking links, and anonymized product demonstrations.`;

export const metadata: Metadata = pageMetadata({ title, description, path: '/terms' });

export default function TermsPage() {
  return (
    <>
      <JsonLd data={pageSchema({ name: title, description, path: '/terms' })} />
      <LegalShell eyebrow="Legal · Terms" title="Website terms" updatedAt="22 July 2026">
      <p>
        These terms govern your use of {SITE.domain}. By using the site, you
        agree to use it lawfully and in accordance with these terms. If you do
        not agree, please do not use the site.
      </p>

      <h2>1. Use of the site</h2>
      <p>
        The site describes {SITE.name}, an AI operating system implementation
        service. Its content is informational and is not legal, financial,
        accounting, or other professional advice. You may not interfere with
        the site, attempt unauthorized access, introduce malicious code, or use
        its content unlawfully.
      </p>

      <h2>2. Enquiries, bookings, and paid work</h2>
      <p>
        Submitting the audit form or booking a discovery call does not create a
        client relationship or require either party to proceed. Any paid audit,
        implementation, support, deliverables, fees, and ownership terms are
        governed by a separate written agreement.
      </p>

      <h2>3. Intellectual property</h2>
      <p>
        Unless stated otherwise, the site, its design, copy, AOS-001 materials,
        and brand elements belong to {SITE.companyName}, {SITE.founder}, or
        their licensors. You may view and share links to the site, but may not
        reproduce or commercially exploit its content without permission.
      </p>

      <h2>4. Kiosks and third-party services</h2>
      <p>
        Kiosk demonstrations use anonymized or dummy data and are provided to
        illustrate system patterns, not a specific client&apos;s current operations.
        Links and embeds from third parties, including Cal.com, are governed by
        those providers&apos; terms. We are not responsible for third-party services.
      </p>

      <h2>5. Availability and liability</h2>
      <p>
        The site is provided on an “as is” and “as available” basis. We do not
        guarantee uninterrupted availability or that all content will always be
        complete or current. To the maximum extent permitted by law, we are not
        liable for indirect, incidental, special, or consequential loss arising
        from use of, or reliance on, the site.
      </p>

      <h2>6. Changes</h2>
      <p>
        We may update the site and these terms. The date above identifies the
        current version. Continued use after an update means you accept the revised terms.
      </p>

      <h2>7. Contact</h2>
      <p>
        {SITE.founder} · <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
      </LegalShell>
    </>
  );
}
