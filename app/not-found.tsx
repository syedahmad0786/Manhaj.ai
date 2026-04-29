import Link from 'next/link';
import CTAButton from '@/components/ui/CTAButton';

export const metadata = {
  title: 'Not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container-narrow" style={{ padding: '160px 32px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, justifyContent: 'center' }}>
          <span style={{ width: 24, height: 1, background: 'var(--accent)' }} />
          <span className="t-eyebrow">Error · 404</span>
        </div>
        <h1 className="t-display" style={{ fontSize: 'clamp(48px, 7vw, 96px)', marginBottom: 24 }}>
          That route isn&apos;t in the foundation.
        </h1>
        <p
          style={{
            fontSize: 17,
            color: 'var(--ink-secondary)',
            lineHeight: 1.6,
            maxWidth: 540,
            margin: '0 auto',
          }}
        >
          Either it moved or it never shipped. The home page is the safest place to start over.
        </p>
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <CTAButton primary path="/" label="Back to home" />
          <Link
            href="/kiosks/"
            className="btn btn-ghost"
            style={{ textDecoration: 'none' }}
          >
            Or open a kiosk <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
