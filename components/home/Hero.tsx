'use client';

import { useState } from 'react';
import GridBackdrop from '@/components/shared/GridBackdrop';
import Reveal from '@/components/ui/Reveal';
import CTAButton from '@/components/ui/CTAButton';
import { LAYERS } from '@/lib/data/layers';

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <section
      className="manhaj-paper-hero manhaj-paper-grid"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTilt({
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        position: 'relative',
        minHeight: '100svh',
        overflow: 'hidden',
        paddingTop: 132,
        paddingBottom: 72,
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid var(--ink-primary)',
      }}
    >
      <GridBackdrop />

      <span className="manhaj-hero-margin-note manhaj-hero-note-left" aria-hidden="true">
        AOS-001 · REVENUE ARCHITECTURE · MANHAJ
      </span>
      <span className="manhaj-hero-margin-note manhaj-hero-note-right" aria-hidden="true">
        REV. A / 2026
      </span>

      <div className="container manhaj-paper-hero-layout" style={{ position: 'relative', zIndex: 2 }}>
        <div className="manhaj-paper-hero-copy">
          <Reveal delay={80}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
              <span style={{ width: 44, height: 2, background: 'var(--accent)' }} />
              <span className="t-eyebrow">AI operating systems · AOS-001</span>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <h1
              className="t-display"
              style={{
                fontSize: 'clamp(58px, 6.4vw, 96px)',
                lineHeight: 0.91,
                letterSpacing: '-0.047em',
                maxWidth: 760,
              }}
            >
              Your business has a method.{' '}
              <span style={{ display: 'block', color: 'var(--accent)', fontStyle: 'italic', fontWeight: 400 }}>
                Now give it a system.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p
              style={{
                marginTop: 30,
                fontSize: 'clamp(16px, 1.25vw, 19px)',
                lineHeight: 1.65,
                color: 'var(--ink-secondary)',
                maxWidth: 650,
              }}
            >
              MANHAJ architects a private AI operating system for B2B service and education businesses:
              six governed revenue layers, configured to your workflows, installed with your team, and owned by you.
            </p>
          </Reveal>

          <Reveal delay={440}>
            <div className="manhaj-paper-hero-actions" style={{ marginTop: 44, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <CTAButton primary path="/audit" label="Book a discovery audit" />
              <CTAButton path="/kiosks" label="Explore working demos" />
            </div>
          </Reveal>

          <Reveal delay={560}>
            <div
              className="manhaj-paper-proof-line"
              style={{
                marginTop: 48,
                padding: '16px 0',
                borderTop: '1px solid var(--line)',
                borderBottom: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                flexWrap: 'wrap',
                maxWidth: 680,
              }}
            >
              <b style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)', fontSize: 20 }}>6</b>
              <span className="t-mono" style={{ color: 'var(--ink-secondary)' }}>governed layers</span>
              <i style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />
              <span className="t-mono" style={{ color: 'var(--ink-secondary)' }}>one owned system</span>
              <i style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />
              <span className="t-mono" style={{ color: 'var(--ink-secondary)' }}>architect-led install</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={240} style={{ minWidth: 0 }}>
          <div
            className="manhaj-paper-architecture-map"
            aria-hidden="true"
            style={{
              position: 'relative',
              minHeight: 620,
              padding: '64px 28px 54px',
              borderLeft: '1px solid var(--line)',
              borderRight: '1px solid var(--line)',
              background: 'rgba(246, 240, 227, 0.54)',
              transform: `perspective(1400px) rotateX(${tilt.y * -3}deg) rotateY(${tilt.x * 4}deg)`,
              transition: 'transform 180ms ease-out',
              boxShadow: '18px 18px 0 rgba(195, 60, 31, 0.08)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 18,
                left: 28,
                right: 28,
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--ink-tertiary)',
              }}
            >
              <span>Revenue foundation</span>
              <span>Universal shape / bespoke orchestration</span>
            </div>

            <div style={{ display: 'grid', gap: 8, position: 'relative', zIndex: 2 }}>
              {LAYERS.map((layer, index) => (
                <div
                  key={layer.id}
                  className="manhaj-paper-map-layer"
                  style={{
                    minHeight: 76,
                    display: 'grid',
                    gridTemplateColumns: '46px minmax(170px, 1fr) minmax(126px, 0.72fr)',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      color: index === 3 ? 'var(--accent)' : 'var(--ink-primary)',
                      fontFamily: 'var(--font-display)',
                      fontSize: 24,
                    }}
                  >
                    {layer.id}
                  </span>
                  <span
                    style={{
                      height: 66,
                      position: 'relative',
                      display: 'grid',
                      placeItems: 'center',
                      border: '1px solid var(--ink-primary)',
                      clipPath: 'polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)',
                      background: index === 3 ? 'rgba(195, 60, 31, 0.11)' : 'rgba(246, 240, 227, 0.64)',
                    }}
                  >
                    <i style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: 'var(--line)' }} />
                    <b
                      style={{
                        position: 'relative',
                        width: 20,
                        height: 20,
                        border: '1px solid var(--accent)',
                        background: index === 3 ? 'var(--accent)' : 'var(--bg-base)',
                        transform: 'rotate(45deg)',
                        boxShadow: index === 3 ? '0 0 0 7px rgba(195, 60, 31, 0.10)' : 'none',
                      }}
                    />
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <strong
                      style={{
                        display: 'block',
                        color: 'var(--ink-primary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {layer.name}
                    </strong>
                    <small
                      style={{
                        display: 'block',
                        marginTop: 6,
                        color: 'var(--ink-tertiary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 8,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {layer.sub}
                    </small>
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                position: 'absolute',
                left: '10%',
                right: '10%',
                bottom: 28,
                paddingTop: 8,
                borderTop: '1px solid var(--ink-primary)',
                display: 'flex',
                justifyContent: 'space-between',
                color: 'var(--ink-tertiary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 8,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              <span>Capture</span>
              <b style={{ color: 'var(--accent)' }}>AOS-001</b>
              <span>Intelligence</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
