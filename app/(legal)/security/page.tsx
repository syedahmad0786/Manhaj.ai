import type { Metadata } from 'next';
import LegalShell from '../_layout-shared';
import JsonLd from '@/components/shared/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { pageSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';

const title = `Private AI Governance and Security | ${SITE.name}`;
const description =
  'How Manhaj approaches private AI operating system governance, client-owned infrastructure, access control, data minimization, human oversight, and incident reporting.';

export const metadata: Metadata = pageMetadata({ title, description, path: '/security' });

export default function SecurityPage() {
  return (
    <>
      <JsonLd data={pageSchema({ name: title, description, path: '/security' })} />
      <LegalShell eyebrow="Trust · Governance" title="Security and AI governance" updatedAt="22 July 2026">
        <p>
          Manhaj is designed as a private AI operating system for a specific
          business, not a shared template that takes control of the client&apos;s
          infrastructure. The exact controls for an install are documented in
          its architecture specification and depend on the client&apos;s selected providers.
        </p>

        <h2>1. Client ownership and isolation</h2>
        <ul>
          <li>Production code, configurations, integrations, and business data are intended to live in client-owned accounts.</li>
          <li>Credentials and access remain under client control, with separate environments used where the selected stack supports them.</li>
          <li>Stopping an engagement does not require surrendering the installed system; handover terms are documented in the client agreement.</li>
        </ul>

        <h2>2. Access and secrets</h2>
        <p>
          Installations are designed around least-privilege access, scoped API
          credentials, protected environment variables, and access removal when
          it is no longer needed. Secrets should not be embedded in source code
          or demonstrations.
        </p>

        <h2>3. Data handling</h2>
        <p>
          Architecture begins with data minimization: only the data needed for
          an approved workflow should be collected or sent to a provider.
          Encryption in transit and at rest is supplied by the infrastructure
          providers chosen for an install and is verified as part of the stack review.
        </p>

        <h2>4. AI governance and human oversight</h2>
        <ul>
          <li>High-impact decisions should have a named human owner and an escalation path.</li>
          <li>AI outputs are treated as probabilistic and are tested against defined acceptance criteria before production use.</li>
          <li>Logs, alerts, and review checkpoints are included where the workflow and underlying tools support them.</li>
          <li>Permissions, retention, model providers, and failure modes are documented in the architecture specification.</li>
        </ul>

        <h2>5. Demonstrations and claims</h2>
        <p>
          Public kiosks use anonymized or dummy data. This page describes the
          engineering approach; it does not claim a certification, regulatory
          approval, or absolute security guarantee. Contract-specific controls
          take precedence for a client engagement.
        </p>

        <h2>6. Report a concern</h2>
        <p>
          Send suspected security issues to{' '}
          <a href={`mailto:${SITE.email}?subject=Manhaj%20security%20report`}>{SITE.email}</a>
          {' '}with “Manhaj security report” in the subject. Do not include live
          credentials, personal data, or exploit details beyond what is needed
          to identify the affected surface; we will arrange a secure follow-up channel.
        </p>
      </LegalShell>
    </>
  );
}
