import type { Metadata } from 'next';
import LegalShell from '../_layout-shared';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: `How ${SITE.name} collects, uses, and protects information.`,
  alternates: { canonical: `${SITE.url}/privacy` },
  robots: { index: true, follow: true },
};

// REPLACE: paste real privacy policy from Termly here. The blocks below
// are scaffold placeholders so the page renders cleanly until then.
export default function PrivacyPage() {
  return (
    <LegalShell eyebrow="Legal · Privacy" title="Privacy policy" updatedAt="29 April 2026">
      <p>
        <strong>This is a placeholder.</strong> Replace the content of this
        file with the privacy policy generated for {SITE.domain} via Termly (or
        your preferred legal tool). Keep the surrounding shell — only swap the
        body copy.
      </p>

      <h2>1. What we collect</h2>
      <p>
        Lead-form submissions (name, email, company, role, revenue band,
        timing, optional notes), audit-call transcripts (with consent), and
        standard analytics signals via Google Tag Manager (GA4, Meta Pixel,
        LinkedIn Insight). Cookie banner consent is gated through CookieYes.
      </p>

      <h2>2. How we use it</h2>
      <p>
        To respond to audit requests, run the AOS-001 install lifecycle, and
        improve the site. We do not sell or share lead data with third parties
        outside the explicit processors listed below.
      </p>

      <h2>3. Processors</h2>
      <ul>
        <li>Vercel — hosting</li>
        <li>Resend — transactional email</li>
        <li>Supabase — durable lead record</li>
        <li>Cal.com — booking</li>
        <li>Google Tag Manager / Google Analytics 4 — analytics</li>
        <li>Meta Pixel, LinkedIn Insight — advertising attribution (consent-gated)</li>
        <li>CookieYes — consent management</li>
      </ul>

      <h2>4. Your rights</h2>
      <p>
        Email <a href="mailto:hello@manhaj.ai">hello@manhaj.ai</a> for access,
        correction, or deletion. We&apos;ll respond inside 30 days.
      </p>

      <h2>5. Contact</h2>
      <p>
        {SITE.founder} · <a href="mailto:hello@manhaj.ai">hello@manhaj.ai</a>
      </p>
    </LegalShell>
  );
}
