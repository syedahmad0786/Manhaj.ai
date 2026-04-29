'use client';

import { useEffect, useRef, useState } from 'react';
import GridBackdrop from '@/components/shared/GridBackdrop';
import Reveal from '@/components/ui/Reveal';
import CTAButton from '@/components/ui/CTAButton';
import { LAYERS, type Layer } from '@/lib/data/layers';

// Direct port from .extracted-source/000 — Hero with 3D stacked layered planes
// (CSS 3D, slow Y-rotation, mouse-parallax). Inline styles are runtime-driven
// by RAF callbacks; do NOT replace with Tailwind.
export default function Hero() {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    let yaw = 0;
    let scrollSep = 0;
    const tick = () => {
      yaw += 0.0009;
      scrollSep = Math.min(1, window.scrollY / window.innerHeight);
      const stack = stackRef.current;
      if (stack) {
        const baseRotY = ((yaw * 180) / Math.PI) % 360;
        const px = tilt.x * 12;
        const py = tilt.y * -8;
        stack.style.transform = `rotateX(${56 + py + scrollSep * -10}deg) rotateZ(${baseRotY + px}deg)`;
        const planes = stack.querySelectorAll<HTMLDivElement>('.plane');
        planes.forEach((p, i) => {
          const idx = i - (planes.length - 1) / 2;
          const baseZ = idx * 60;
          const sepZ = idx * scrollSep * 80;
          p.style.transform = `translateZ(${baseZ + sepZ}px)`;
          p.style.opacity = String(1 - scrollSep * 0.4);
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [tilt]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const node = heroRef.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        paddingTop: 120,
        paddingBottom: 80,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <GridBackdrop />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          perspective: 2000,
          perspectiveOrigin: '50% 30%',
          pointerEvents: 'none',
        }}
      >
        <div
          ref={stackRef}
          className="layer-stack"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {LAYERS.map((l, i) => (
            <div
              key={l.id}
              className="plane"
              style={{
                position: 'absolute',
                top: -160,
                left: -440,
                width: 880,
                height: 320,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }}
            >
              <PlaneSurface index={i} layer={l} />
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 4 }}>
        <div style={{ maxWidth: 1100 }}>
          <Reveal delay={100}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <span style={{ width: 24, height: 1, background: 'var(--accent)' }} />
              <span className="t-eyebrow">AOS-001 · The AI Operating System</span>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <h1
              className="t-display"
              style={{
                fontSize: 'clamp(52px, 7.6vw, 108px)',
                lineHeight: 0.96,
                letterSpacing: '-0.035em',
                maxWidth: 1200,
              }}
            >
              The AI Operating System{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--accent)' }}>
                architected uniquely
              </span>{' '}
              for your business.
            </h1>
          </Reveal>

          <Reveal delay={360}>
            <p
              style={{
                marginTop: 36,
                fontSize: 19,
                lineHeight: 1.6,
                color: 'var(--ink-secondary)',
                maxWidth: 620,
              }}
            >
              Built on a proven 6-layer revenue foundation. Configured to how you actually run. Owned by you.
            </p>
          </Reveal>

          <Reveal delay={520}>
            <div
              style={{
                marginTop: 16,
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 17,
                color: 'var(--accent)',
              }}
            >
              Your OS is no one else&apos;s.
            </div>
          </Reveal>

          <Reveal delay={680}>
            <div style={{ marginTop: 56, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <CTAButton primary path="/audit" label="Book an audit" />
              <CTAButton path="/kiosks/" label="See a live demo" />
            </div>
          </Reveal>

          <Reveal delay={900}>
            <div
              style={{
                marginTop: 80,
                paddingTop: 32,
                borderTop: '1px solid var(--line-soft)',
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                maxWidth: 760,
                flexWrap: 'wrap',
              }}
            >
              <span className="t-mono" style={{ color: 'var(--ink-tertiary)' }}>● Currently powering</span>
              <span style={{ fontSize: 14, color: 'var(--ink-secondary)' }}>
                Operator-led businesses across healthcare, education, and B2B services.
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          zIndex: 5,
        }}
      >
        <div className="t-mono" style={{ fontSize: 10 }}>Scroll · Explore architecture</div>
        <div
          style={{
            width: 1,
            height: 36,
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
            animation: 'scrollPulse 2.4s var(--ease) infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          50% { transform: scaleY(0.4); opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}

function PlaneSurface({ index, layer }: { index: number; layer: Layer }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(180deg, rgba(201,169,97,0.06) 0%, rgba(20,20,24,0.5) 60%, rgba(10,10,11,0.85) 100%)',
        border: '1px solid rgba(201, 169, 97, 0.32)',
        boxShadow: '0 0 60px rgba(201, 169, 97, 0.06), inset 0 0 60px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
        <defs>
          <pattern id={`g${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(201,169,97,0.18)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#g${index})`} />
      </svg>

      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 20,
          display: 'flex',
          gap: 14,
          alignItems: 'baseline',
          fontFamily: 'var(--font-mono)',
          color: 'var(--accent)',
        }}
      >
        <span style={{ fontSize: 14, letterSpacing: '0.1em' }}>{layer.id}</span>
        <span
          style={{
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--ink-secondary)',
          }}
        >
          {layer.name}
        </span>
      </div>

      {[0, 1, 2, 3].map((c) => (
        <span
          key={c}
          style={{
            position: 'absolute',
            width: 6,
            height: 6,
            border: '1px solid var(--accent)',
            ...(c < 2 ? { top: 8 } : { bottom: 8 }),
            ...(c % 2 === 0 ? { left: 8 } : { right: 8 }),
          }}
        />
      ))}

      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <line
          x1="20%" y1="60%" x2="80%" y2="60%"
          stroke="rgba(201,169,97,0.4)" strokeWidth="0.5" strokeDasharray="2 4"
        />
        <circle cx="20%" cy="60%" r="3" fill="var(--accent)" />
        <circle cx="50%" cy="60%" r="2" fill="var(--accent)" opacity="0.6" />
        <circle cx="80%" cy="60%" r="3" fill="var(--accent)" />
      </svg>
    </div>
  );
}
