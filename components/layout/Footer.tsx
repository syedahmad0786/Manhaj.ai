import Link from 'next/link';
import Wordmark from '@/components/ui/Wordmark';

// Direct port from .extracted-source/004 — Footer block.
type FooterItem = readonly [label: string, path: string | null];

const SITE: readonly FooterItem[] = [
  ['Home', '/'],
  ['Foundation', '/foundation'],
  ['Demos', '/kiosks/'],
  ['Process', '/process'],
];
const ENGAGE: readonly FooterItem[] = [
  ['Pricing', '/pricing'],
  ['About', '/about'],
  ['Book audit', '/audit'],
];
const ARCHITECT: readonly FooterItem[] = [
  ['ahmad@manhaj.ai', null],
  ['LinkedIn ↗', null],
  ['Twitter ↗', null],
];
const LEGAL: readonly FooterItem[] = [
  ['Privacy', '/privacy'],
  ['Terms', '/terms'],
  ['Cookie policy', '/cookie-policy'],
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--line)',
        padding: '80px 0 40px',
        background: 'var(--bg-deep)',
      }}
    >
      <div className="container">
        <div
          className="manhaj-footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            gap: 48,
            paddingBottom: 64,
            borderBottom: '1px solid var(--line-soft)',
          }}
        >
          <div>
            <Wordmark size="lg" />
            <p
              style={{
                marginTop: 24,
                maxWidth: 360,
                color: 'var(--ink-secondary)',
                fontSize: 15,
                lineHeight: 1.6,
              }}
            >
              The AI Operating System architected uniquely for your business. Built on a proven 6-layer
              revenue foundation. Owned by you.
            </p>
            <div style={{ marginTop: 32 }}>
              <span className="t-mono">Tagline</span>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 18,
                  color: 'var(--accent)',
                  marginTop: 8,
                }}
              >
                Your OS is no one else&apos;s.
              </p>
            </div>
          </div>

          <FooterCol title="Site" items={SITE} />
          <FooterCol title="Engage" items={ENGAGE} />
          <FooterCol title="Architect" items={ARCHITECT} />
          <FooterCol title="Legal" items={LEGAL} />
        </div>

        <div
          style={{
            paddingTop: 32,
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--ink-tertiary)',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <span>manhaj.ai · architected by ahmad bukhari · {new Date().getFullYear()}</span>
          <span style={{ display: 'flex', gap: 24 }}>
            <span>◊ AOS-001</span>
            <span>v.1.0</span>
            <span style={{ color: 'var(--success)' }}>● online</span>
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .manhaj-footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: readonly FooterItem[] }) {
  return (
    <div>
      <div className="t-mono" style={{ marginBottom: 18, color: 'var(--accent)' }}>{title}</div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(([label, path]) => (
          <li key={label}>
            {path ? (
              <Link
                href={path}
                className="manhaj-footer-link"
                style={{
                  color: 'var(--ink-secondary)',
                  fontSize: 14,
                  textDecoration: 'none',
                  transition: 'color 300ms var(--ease)',
                }}
              >
                {label}
              </Link>
            ) : (
              <span
                className="manhaj-footer-link"
                style={{
                  color: 'var(--ink-secondary)',
                  fontSize: 14,
                  cursor: 'default',
                }}
              >
                {label}
              </span>
            )}
          </li>
        ))}
      </ul>
      <style>{`
        .manhaj-footer-link:hover { color: var(--accent) !important; }
      `}</style>
    </div>
  );
}
