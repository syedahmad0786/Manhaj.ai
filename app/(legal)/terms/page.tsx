import type { Metadata } from 'next';
import LegalShell from '../_layout-shared';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of service',
  description: `${SITE.name} terms of service.`,
  alternates: { canonical: `${SITE.url}/terms` },
  robots: { index: true, follow: true },
};

// REPLACE: paste real terms of service from Termly here.
export default function TermsPage() {
  return (
    <LegalShell eyebrow="Legal · Terms" title="Terms of service" updatedAt="29 April 2026">
      <p>
        <strong>This is a placeholder.</strong> Replace with terms of service
        generated for {SITE.domain} via Termly. Keep the surrounding shell —
        swap the body copy.
      </p>

      <h2>1. Use of the site</h2>
      <p>
        The site is informational. Booking an audit constitutes intent to
        evaluate, not engagement; the install agreement (separate document)
        governs any paid work.
      </p>

      <h2>2. Intellectual property</h2>
      <p>
        AOS-001, the kiosk hub design system, and the brand marks are owned by
        {SITE.founder}. Live demos are anonymized client systems shown with
        permission and dummy data.
      </p>

      <h2>3. Limitation of liability</h2>
      <p>
        The site is provided as-is. We&apos;re not liable for indirect,
        incidental, or consequential damages from use of the site.
      </p>

      <h2>4. Contact</h2>
      <p>
        {SITE.founder} · <a href="mailto:hello@manhaj.ai">hello@manhaj.ai</a>
      </p>
    </LegalShell>
  );
}
