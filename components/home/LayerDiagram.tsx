'use client';

import { useState } from 'react';
import { LAYERS, type Layer } from '@/lib/data/layers';

// Direct port from .extracted-source/005 — interactive 6-layer diagram with
// hover preview and click-to-open side panel.
export default function LayerDiagram({ compact = false }: { compact?: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [opened, setOpened] = useState<string | null>(null);

  const detailLayer =
    (opened && LAYERS.find((l) => l.id === opened)) ||
    (hovered && LAYERS.find((l) => l.id === hovered)) ||
    null;

  return (
    <div style={{ position: 'relative' }}>
      <div
        className="manhaj-layer-diagram-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: compact ? '1fr' : 'minmax(420px, 540px) 1fr',
          gap: 64,
          alignItems: 'start',
        }}
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              border: '1px solid var(--line)',
              padding: 4,
              background: 'var(--bg-deep)',
            }}
          >
            {LAYERS.map((l) => {
              const isHover = hovered === l.id;
              const isOpen = opened === l.id;
              const isDim = (hovered && !isHover) || (opened && !isOpen);
              return (
                <button
                  key={l.id}
                  className="manhaj-layer-button"
                  data-cursor-hover
                  onMouseEnter={() => setHovered(l.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setOpened(isOpen ? null : l.id)}
                  style={{
                    cursor: 'pointer',
                    textAlign: 'left',
                    background: isHover || isOpen ? 'var(--bg-elevated)' : 'var(--bg-base)',
                    border: '1px solid',
                    borderColor: isOpen ? 'var(--accent)' : 'var(--line)',
                    padding: '22px 24px',
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr auto',
                    gap: 20,
                    alignItems: 'center',
                    transition: 'all 400ms var(--ease)',
                    opacity: isDim ? 0.36 : 1,
                    transform: isHover ? 'translateX(4px)' : 'translateX(0)',
                    color: 'inherit',
                    font: 'inherit',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 13,
                      color: isHover || isOpen ? 'var(--accent)' : 'var(--ink-tertiary)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {l.id}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 22,
                        fontWeight: 400,
                        color: 'var(--ink-primary)',
                        marginBottom: 4,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {l.name}
                    </div>
                    <div className="t-mono" style={{ fontSize: 10 }}>{l.sub}</div>
                  </div>
                  <span
                    style={{
                      color: isOpen ? 'var(--accent)' : 'var(--ink-tertiary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 18,
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 400ms var(--ease)',
                    }}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="manhaj-layer-axis"
            style={{
              position: 'absolute',
              left: -24,
              top: 30,
              bottom: 30,
              width: 16,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              pointerEvents: 'none',
            }}
          >
            <span
              className="t-mono"
              style={{
                fontSize: 9,
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                color: 'var(--ink-tertiary)',
              }}
            >
              FOUNDATION → INTELLIGENCE
            </span>
          </div>
        </div>

        <DetailPanel layer={detailLayer} opened={!!opened} />
      </div>
    </div>
  );
}

function DetailPanel({ layer, opened }: { layer: Layer | null; opened: boolean }) {
  if (!layer) {
    return (
      <div
        className="manhaj-layer-detail"
        style={{
          border: '1px solid var(--line-soft)',
          padding: 40,
          background: 'var(--bg-elevated)',
          minHeight: 480,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div className="t-eyebrow" style={{ marginBottom: 24 }}>◊ AOS-001 specification</div>
          <p className="t-display" style={{ fontSize: 32, lineHeight: 1.2, marginBottom: 32 }}>
            Hover any layer to preview. Click to open its detail.
          </p>
          <p style={{ fontSize: 15, color: 'var(--ink-secondary)', maxWidth: 480, lineHeight: 1.7 }}>
            Six layers. Universal foundation. Each layer is bespoke — orchestrated to your stack, your ICP,
            your team&apos;s actual workflows.
          </p>
        </div>
        <SchematicLines />
      </div>
    );
  }
  return (
    <div
      key={layer.id}
      className="manhaj-layer-detail"
      style={{
        border: '1px solid var(--accent)',
        padding: 40,
        background: 'var(--bg-elevated)',
        animation: 'panelIn 400ms var(--ease)',
        minHeight: 480,
      }}
    >
      <div
        className="manhaj-layer-detail-heading"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <div className="manhaj-layer-detail-title" style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 36, color: 'var(--accent)' }}>
            {layer.id}
          </span>
          <h3 className="t-display" style={{ fontSize: 36, color: 'var(--ink-primary)' }}>
            {layer.name}
          </h3>
        </div>
        <div className="t-mono" style={{ color: 'var(--accent)' }}>
          {opened ? '● expanded' : '○ preview'}
        </div>
      </div>

      <div className="t-mono" style={{ marginBottom: 28, fontSize: 11 }}>{layer.sub}</div>

      <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-primary)', marginBottom: 32 }}>
        {layer.detail}
      </p>

      <div
        className="manhaj-layer-detail-columns"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}
      >
        <div>
          <div className="t-mono" style={{ marginBottom: 14, color: 'var(--accent)' }}>◊ Modules</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {layer.modules.map((m) => (
              <li
                key={m}
                style={{ fontSize: 13, color: 'var(--ink-secondary)', display: 'flex', gap: 10, alignItems: 'center' }}
              >
                <span style={{ width: 4, height: 4, background: 'var(--accent)' }} />
                {m}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="t-mono" style={{ marginBottom: 14, color: 'var(--accent)' }}>◊ Orchestrated tools</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {layer.tools.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  padding: '6px 10px',
                  border: '1px solid var(--line)',
                  color: 'var(--ink-secondary)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <SchematicLines />

      <style>{`
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function SchematicLines() {
  return (
    <svg width="100%" height="48" style={{ marginTop: 12, opacity: 0.6 }}>
      <line
        x1="0" y1="24" x2="100%" y2="24"
        stroke="var(--accent)" strokeOpacity="0.3" strokeDasharray="2 6"
      />
      <circle cx="6" cy="24" r="3" fill="var(--accent)" />
      <circle cx="50%" cy="24" r="2" fill="var(--accent)" opacity="0.5" />
      <text
        x="98%" y="28" textAnchor="end"
        fontFamily="var(--font-mono)" fontSize="9"
        fill="var(--ink-tertiary)" letterSpacing="0.14em"
      >
        SCHEMATIC · INDEX
      </text>
    </svg>
  );
}
