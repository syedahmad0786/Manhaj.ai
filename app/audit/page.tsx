import type { Metadata } from 'next';
import PageHeader from '@/components/shared/PageHeader';
import AuditForm from '@/components/audit/AuditForm';
import AuditSidebar from '@/components/audit/AuditSidebar';
import JsonLd from '@/components/shared/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { pageSchema } from '@/lib/schema';

// Direct port of the visual layout from .extracted-source/006 — AuditPage.
// The form submit logic + Cal embed are kept from the existing wiring; the
// chrome around them matches the original 1.2fr/1fr split.

const title = 'Book a MANHAJ AI Operating System Discovery Call';
const description =
  'Book a free 30-minute call with Ahmad Bukhari to diagnose your operating stack. A paid audit week is $1,500 and is credited toward an install.';

export const metadata: Metadata = pageMetadata({ title, description, path: '/audit' });

export default function AuditPage() {
  return (
    <>
      <JsonLd data={pageSchema({ name: title, description, path: '/audit' })} />
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
