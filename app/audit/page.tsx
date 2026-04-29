import type { Metadata } from 'next';
import PageHeader from '@/components/shared/PageHeader';
import AuditForm from '@/components/audit/AuditForm';
import AuditSidebar from '@/components/audit/AuditSidebar';
import { SITE } from '@/lib/site';

// Direct port of the visual layout from .extracted-source/006 — AuditPage.
// The form submit logic + Cal embed are kept from the existing wiring; the
// chrome around them matches the original 1.2fr/1fr split.

export const metadata: Metadata = {
  title: 'Book an audit',
  description:
    "30 minutes. We diagnose your stack. You walk away with a strategy doc — whether you sign or not. The discovery call is free; the audit week is paid ($1,500), credited to your install if you proceed.",
  alternates: { canonical: `${SITE.url}/audit` },
  openGraph: {
    title: 'Manhaj — Book a discovery audit',
    description:
      'Founder-led audit. Map the stack, find the breaks, see whether the AOS-001 install fits.',
  },
};

export default function AuditPage() {
  return (
    <>
      <PageHeader
        eyebrow="Discovery"
        title={
          <>
            30 minutes. We diagnose your stack.
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
              You walk away with a strategy doc
            </span>{' '}
            — whether you sign or not.
          </>
        }
        sub="The discovery call is free. The audit week is paid ($1,500), credited to your install if you proceed."
      />

      <section style={{ padding: '0 0 120px' }}>
        <div className="container">
          <div
            className="manhaj-audit-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: 64,
              alignItems: 'flex-start',
            }}
          >
            <AuditForm />
            <AuditSidebar />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 960px) {
          .manhaj-audit-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
