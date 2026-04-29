import type { ReactNode } from 'react';
import Reveal from '@/components/ui/Reveal';
import GridBackdrop from '@/components/shared/GridBackdrop';

// Direct port from .extracted-source/006 — used at the top of every inner page.
export default function PageHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <section style={{ padding: '180px 0 80px', position: 'relative', overflow: 'hidden' }}>
      <GridBackdrop />
      <div className="container" style={{ position: 'relative' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent)' }} />
            <span className="t-eyebrow">{eyebrow}</span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h1
            className="t-display"
            style={{
              fontSize: 'clamp(48px, 7vw, 96px)',
              lineHeight: 0.98,
              letterSpacing: '-0.035em',
              maxWidth: 1100,
              marginBottom: sub ? 36 : 0,
            }}
          >
            {title}
          </h1>
        </Reveal>
        {sub && (
          <Reveal delay={260}>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--ink-secondary)', maxWidth: 680 }}>
              {sub}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
