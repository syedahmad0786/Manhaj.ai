import type { Metadata } from 'next';
import LegalShell from '../_layout-shared';
import JsonLd from '@/components/shared/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { pageSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';

const title = `Privacy Policy | ${SITE.name}`;
const description =
  `How ${SITE.name} and ${SITE.companyName} collect, use, retain, and protect information submitted through this website and its booking flow.`;

export const metadata: Metadata = pageMetadata({ title, description, path: '/privacy' });

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={pageSchema({ name: title, description, path: '/privacy' })} />
      <LegalShell eyebrow="Legal · Privacy" title="Privacy policy" updatedAt="22 July 2026">
      <p>
        This notice explains how information is handled when you use {SITE.domain},
        request an audit, or book a call. {SITE.name} is a product and service of{' '}
        <a href={SITE.companyUrl}>{SITE.companyName}</a>, led by{' '}
        <a href={SITE.founderUrl}>{SITE.founder}</a>.
      </p>

      <h2>1. Information we collect</h2>
      <p>
        If you submit the audit form, we collect the details you provide, such
        as your name, email address, company, role, revenue band, current tools,
        timing, and notes. Cal.com separately processes information you provide
        when booking a call under its own privacy terms.
      </p>
      <p>
        The site may also receive basic technical and usage information, such
        as pages viewed, device and browser type, approximate location, and
        referral source. Vercel Analytics is used for aggregate site analytics.
        Additional analytics or consent tools run only when configured.
      </p>

      <h2>2. How we use it</h2>
      <p>
        We use information to respond to enquiries, evaluate whether an audit
        or install is a fit, schedule and deliver calls, operate and secure the
        site, improve our services, and meet legal obligations. We do not sell
        information submitted through the audit form.
      </p>

      <h2>3. Service providers</h2>
      <p>Depending on which features are configured or used, providers may include:</p>
      <ul>
        <li>Vercel for hosting and aggregate analytics;</li>
        <li>Cal.com for scheduling;</li>
        <li>Resend for email delivery;</li>
        <li>Supabase for secure lead storage; and</li>
        <li>n8n for configured workflow automation.</li>
      </ul>
      <p>
        These providers process information for the purposes described above
        and under their own contractual and privacy obligations. Information
        may also be disclosed where required by law or to protect rights and security.
      </p>

      <h2>4. Retention and security</h2>
      <p>
        We keep information only as long as reasonably needed for the purpose
        collected, legitimate business records, security, and legal obligations.
        We use administrative and technical safeguards appropriate to the
        information, but no internet service can guarantee absolute security.
      </p>

      <h2>5. Your choices and rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct,
        delete, restrict, or object to processing of personal information.
        Contact <a href={`mailto:${SITE.email}`}>{SITE.email}</a> to make a request.
        We may need to verify your identity before acting on it.
      </p>

      <h2>6. International processing and changes</h2>
      <p>
        Providers may process information in countries other than your own.
        Where required, appropriate transfer safeguards are used. We may update
        this notice as the site or services change; the date above identifies
        the current version.
      </p>

      <h2>7. Contact</h2>
      <p>
        {SITE.founder} · <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
      </LegalShell>
    </>
  );
}
