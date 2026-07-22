'use client';

import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/shared/SectionHeader';

// Direct port from .extracted-source/007.
const ITEMS = [
  {
    n: '01',
    title: 'Architecture',
    body: 'The 6-layer revenue OS is the documented AOS-001 framework. The framework is consistent; its workflows, tools, and controls are configured to the business.',
    tag: 'Method',
  },
  {
    n: '02',
    title: 'Interactive demos, not claims',
    body: 'Explore three clickable concept kiosks built with synthetic data. They demonstrate interface and workflow patterns without presenting sample numbers as client results.',
    tag: 'Clarity',
  },
  {
    n: '03',
    title: 'Founder-led',
    body: 'You talk to the architect who builds it. No PMs. No juniors. No handoffs. The person who scopes is the person who installs.',
    tag: 'Trust',
  },
] as const;

export default function Pillars() {
  return (
    <section style={{ padding: '160px 0' }}>
      <div className="container">
        <SectionHeader
          eyebrow="Why Manhaj"
          title="Three commitments."
          sub="A documented method, inspectable concept demos, and direct access to the architect."
        />

        <div
          className="manhaj-home-pillars-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {ITEMS.map((p, i) => (
            <Reveal key={p.n} delay={i * 120}>
              <PillarCard {...p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ n, title, body, tag }: { n: string; title: string; body: string; tag: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      data-cursor-hover
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        padding: 36,
        minHeight: 360,
        background: hover ? 'var(--bg-subtle)' : 'var(--bg-elevated)',
        border: '1px solid',
        borderColor: hover ? 'var(--accent)' : 'var(--line)',
        transition: 'all 500ms var(--ease)',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            color: 'var(--accent)',
            letterSpacing: '0.08em',
          }}
        >
          {n}
        </span>
        <span className="t-mono" style={{ fontSize: 9 }}>◊ {tag}</span>
      </div>
      <h3 className="t-display" style={{ fontSize: 32, lineHeight: 1.1 }}>{title}</h3>
      <p style={{ fontSize: 15, color: 'var(--ink-secondary)', lineHeight: 1.7, marginTop: 'auto' }}>
        {body}
      </p>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 1,
          width: hover ? '100%' : '24%',
          background: 'var(--accent)',
          transition: 'width 600ms var(--ease)',
        }}
      />
    </div>
  );
}
