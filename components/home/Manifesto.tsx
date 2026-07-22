'use client';

import { useEffect, useRef, useState } from 'react';
import GridBackdrop from '@/components/shared/GridBackdrop';
import Reveal from '@/components/ui/Reveal';
import ArabicMark from '@/components/shared/ArabicMark';

// Manifesto block — typed reveal in mono + editorial close. Direct port from
// .extracted-source/003.
export default function Manifesto() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const lines = [
    'No two businesses run the same.',
    'Templates fail because of it.',
    'Manhaj architects the AI operating system your business actually needs —',
    'yours alone, configured to how you run.',
  ];

  return (
    <section
      ref={ref}
      className="manhaj-ink-section"
      style={{
        padding: '160px 0',
        position: 'relative',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--line-soft)',
        borderBottom: '1px solid var(--line-soft)',
        overflow: 'hidden',
      }}
    >
      <GridBackdrop />

      <div className="container" style={{ position: 'relative' }}>
        <div
          className="manhaj-manifest-terminal"
          style={{
            maxWidth: 720,
            marginBottom: 72,
            padding: 24,
            background: 'rgba(10,10,11,0.6)',
            border: '1px solid var(--line)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            lineHeight: 1.8,
          }}
        >
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'center' }}>
            <span style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%' }} />
            <span
              style={{
                color: 'var(--ink-tertiary)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              manhaj // manifest.md
            </span>
            <span style={{ marginLeft: 'auto', color: 'var(--ink-tertiary)', fontSize: 10 }}>
              v.1.0 · ratified 2026.04.28
            </span>
          </div>

          <div style={{ color: 'var(--accent)', marginBottom: 18 }}>$ cat /etc/manhaj/manifest.md</div>

          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                color: 'var(--ink-primary)',
                opacity: active ? 1 : 0,
                transform: active ? 'translateY(0)' : 'translateY(8px)',
                transition: `all 600ms var(--ease) ${i * 240 + 200}ms`,
              }}
            >
              <span style={{ color: 'var(--ink-tertiary)', marginRight: 12 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {line}
            </div>
          ))}

          <div
            style={{
              marginTop: 20,
              color: 'var(--accent)',
              opacity: active ? 1 : 0,
              transition: 'opacity 400ms 1400ms',
            }}
          >
            $ <span style={{ animation: 'cur 1s steps(2) infinite' }}>▌</span>
          </div>
        </div>

        <div
          style={{
            marginTop: 80,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 64,
            flexWrap: 'wrap',
          }}
        >
          <Reveal delay={200}>
            <ArabicMark />
          </Reveal>

          <Reveal
            delay={400}
            className="manhaj-manifest-copy-wrap"
            style={{ flex: 1, minWidth: 320, maxWidth: 720 }}
          >
            <p
              className="t-display manhaj-manifest-copy"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                lineHeight: 1.15,
                color: 'var(--ink-primary)',
              }}
            >
              <span style={{ fontStyle: 'italic', color: 'var(--ink-tertiary)' }}>Manhaj.</span>{' '}
              Arabic for system or methodology — used in classical scholarship for the systematic methodology
              of inquiry.{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                Not a tool. A method, installed as software.
              </span>
            </p>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes cur { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
      `}</style>
    </section>
  );
}
