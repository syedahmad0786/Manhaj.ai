import type { ReactNode } from 'react';

// Shared frame for legal pages. Uses the same token system as the rest of
// the site so font/colors stay consistent.
export default function LegalShell({
  eyebrow,
  title,
  updatedAt,
  children,
}: {
  eyebrow: string;
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <article>
      <header style={{ padding: '180px 0 60px', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent)' }} />
            <span className="t-eyebrow">{eyebrow}</span>
          </div>
          <h1
            className="t-display"
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
              marginBottom: 18,
            }}
          >
            {title}
          </h1>
          <p className="t-mono" style={{ fontSize: 11 }}>◊ Last updated {updatedAt}</p>
        </div>
      </header>

      <section style={{ padding: '64px 0 120px' }}>
        <div
          className="container-narrow legal-prose"
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: 'var(--ink-secondary)',
          }}
        >
          {children}
        </div>
      </section>

      <style>{`
        .legal-prose h2 {
          font-family: var(--font-display);
          font-size: 28px;
          color: var(--ink-primary);
          margin: 48px 0 16px;
          letter-spacing: -0.015em;
        }
        .legal-prose h3 {
          font-family: var(--font-display);
          font-size: 22px;
          color: var(--ink-primary);
          margin: 32px 0 12px;
        }
        .legal-prose p { margin: 16px 0; }
        .legal-prose a {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .legal-prose ul {
          padding-left: 24px;
          margin: 16px 0;
          list-style: disc;
        }
        .legal-prose li { margin: 8px 0; }
        .legal-prose strong { color: var(--ink-primary); }
        .legal-prose em { color: var(--ink-primary); }
      `}</style>
    </article>
  );
}
