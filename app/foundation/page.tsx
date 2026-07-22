import type { Metadata } from 'next';
import PageHeader from '@/components/shared/PageHeader';
import SectionHeader from '@/components/shared/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import CTAButton from '@/components/ui/CTAButton';
import LayerDiagram from '@/components/home/LayerDiagram';
import JsonLd from '@/components/shared/JsonLd';
import { LAYERS, type Layer } from '@/lib/data/layers';
import { pageMetadata } from '@/lib/seo';
import { pageSchema } from '@/lib/schema';

// Direct port from .extracted-source/009 — FoundationPage.

const title = 'AOS-001 Foundation: The Six-Layer Revenue Architecture | MANHAJ';
const description =
  'Explore the six-layer foundation behind a MANHAJ implementation: Capture, Qualify, Engage, Convert, Retain, and Intelligence, with bespoke orchestration on top.';

export const metadata: Metadata = pageMetadata({ title, description, path: '/foundation' });

export default function FoundationPage() {
  return (
    <>
      <JsonLd data={pageSchema({ name: title, description, path: '/foundation' })} />
      <PageHeader
        eyebrow="AOS-001 · Specification"
        title={
          <>
            The 6-layer revenue foundation,
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>specified in full.</span>
          </>
        }
        sub="Every Manhaj install carries this stack. The interface is universal. The orchestration is not."
      />

      <section style={{ padding: '0 0 120px' }}>
        <div className="container">
          <Reveal>
            <LayerDiagram />
          </Reveal>
        </div>
      </section>

      {LAYERS.map((l, i) => (
        <LayerDeepSection key={l.id} layer={l} flip={i % 2 === 1} index={i} />
      ))}

      <UniversalVsBespoke />

      <section style={{ padding: '160px 0', borderTop: '1px solid var(--line-soft)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2
              className="t-display"
              style={{
                fontSize: 'clamp(40px, 6vw, 80px)',
                marginBottom: 40,
                maxWidth: 880,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Walk through the spec with the architect.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <CTAButton primary path="/audit" label="Book an architecture review" />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function LayerDeepSection({ layer, flip, index }: { layer: Layer; flip: boolean; index: number }) {
  return (
    <section
      style={{
        padding: '120px 0',
        borderTop: '1px solid var(--line-soft)',
        background: index % 2 === 0 ? 'transparent' : 'var(--bg-deep)',
      }}
    >
      <div className="container">
        <div
          className="manhaj-foundation-layer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          <div style={{ order: flip ? 2 : 1 }}>
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 28 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 48, color: 'var(--accent)' }}>
                  {layer.id}
                </span>
                <span className="t-mono">◊ Layer</span>
              </div>
              <h2
                className="t-display"
                style={{ fontSize: 'clamp(40px, 6vw, 72px)', marginBottom: 18, lineHeight: 1 }}
              >
                {layer.name}
              </h2>
              <div className="t-mono" style={{ marginBottom: 32, fontSize: 12 }}>{layer.sub}</div>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-secondary)', maxWidth: 520 }}>
                {layer.detail}
              </p>
              <div style={{ marginTop: 40 }}>
                <div className="t-eyebrow" style={{ marginBottom: 14 }}>Orchestrated tools</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {layer.tools.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        padding: '8px 14px',
                        border: '1px solid var(--line)',
                        color: 'var(--ink-primary)',
                        background: 'var(--bg-elevated)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <div style={{ order: flip ? 1 : 2 }}>
            <Reveal delay={150}>
              <LayerSchematic layer={layer} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function LayerSchematic({ layer }: { layer: Layer }) {
  return (
    <div
      className="manhaj-foundation-schematic"
      style={{
        border: '1px solid var(--line)',
        background: 'var(--bg-elevated)',
        padding: 40,
        position: 'relative',
        minHeight: 480,
      }}
    >
      {[0, 1, 2, 3].map((c) => (
        <span
          key={c}
          style={{
            position: 'absolute',
            width: 8,
            height: 8,
            border: '1px solid var(--accent)',
            ...(c < 2 ? { top: 12 } : { bottom: 12 }),
            ...(c % 2 === 0 ? { left: 12 } : { right: 12 }),
          }}
        />
      ))}

      <div className="t-mono" style={{ marginBottom: 28, color: 'var(--accent)' }}>
        ◊ Layer.{layer.id} · Modules
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--line)' }}>
        {layer.modules.map((m, i) => (
          <div
            key={m}
            className="manhaj-foundation-module-row"
            style={{
              background: 'var(--bg-elevated)',
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--ink-tertiary)',
                minWidth: 32,
              }}
            >
              {`m.${String(i + 1).padStart(2, '0')}`}
            </span>
            <span style={{ fontSize: 14, color: 'var(--ink-primary)', flex: 1 }}>{m}</span>
            <span
              className="manhaj-foundation-module-line"
              style={{ width: 24, height: 1, background: 'var(--accent)', opacity: 0.6 }}
            />
            <span
              className="manhaj-foundation-module-status"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: 'var(--success)',
                letterSpacing: '0.14em',
              }}
            >
              ● ACTIVE
            </span>
          </div>
        ))}
      </div>

      <div
        className="manhaj-foundation-schematic-meta"
        style={{
          marginTop: 32,
          paddingTop: 20,
          borderTop: '1px solid var(--line-soft)',
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--ink-tertiary)',
          letterSpacing: '0.14em',
        }}
      >
        <span>UNIVERSAL: SHAPE</span>
        <span>BESPOKE: ORCHESTRATION</span>
      </div>
    </div>
  );
}

function UniversalVsBespoke() {
  return (
    <section
      style={{
        padding: '160px 0',
        borderTop: '1px solid var(--line-soft)',
        background: 'var(--bg-deep)',
      }}
    >
      <div className="container">
        <SectionHeader eyebrow="The split" title="What's universal. What's yours." />
        <div
          className="manhaj-foundation-split-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}
        >
          <SplitCard
            title="Universal"
            kicker="The shape of every Manhaj install"
            items={[
              'Six-layer architecture (Capture → Intelligence)',
              'Founder-grade dashboard + alerting',
              'Measurable response-time targets',
              'Single-source-of-truth lead intake',
              'Pipeline progression automation',
              'Behavioural retention engine',
            ]}
            tone="muted"
          />
          <SplitCard
            title="Bespoke"
            kicker="Configured uniquely for you"
            items={[
              'ICP scoring rubric — your customer, not a generic one',
              'Tool orchestration — your existing stack, augmented',
              'Voice + tone of every AI agent — your brand',
              "Routing rules — your team's actual structure",
              'Dashboards — the metrics you wake up thinking about',
              "Retention cadence — your customer's real lifecycle",
            ]}
            tone="accent"
          />
        </div>
      </div>
    </section>
  );
}

function SplitCard({
  title,
  kicker,
  items,
  tone,
}: {
  title: string;
  kicker: string;
  items: string[];
  tone: 'accent' | 'muted';
}) {
  const accent = tone === 'accent';
  return (
    <div
      className="manhaj-foundation-split-card"
      style={{
        padding: 40,
        background: 'var(--bg-elevated)',
        border: '1px solid',
        borderColor: accent ? 'var(--accent)' : 'var(--line)',
      }}
    >
      <div
        className="t-mono"
        style={{
          color: accent ? 'var(--accent)' : 'var(--ink-tertiary)',
          marginBottom: 16,
        }}
      >
        {accent ? '◆ MODULE' : '◇ FOUNDATION'}
      </div>
      <h3 className="t-display" style={{ fontSize: 40, marginBottom: 8 }}>{title}</h3>
      <div
        style={{
          fontSize: 14,
          color: 'var(--ink-secondary)',
          marginBottom: 32,
          fontStyle: 'italic',
          fontFamily: 'var(--font-display)',
        }}
      >
        {kicker}
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map((it) => (
          <li
            key={it}
            style={{
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
              paddingBottom: 14,
              borderBottom: '1px solid var(--line-soft)',
              fontSize: 14,
              color: 'var(--ink-primary)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                background: accent ? 'var(--accent)' : 'var(--ink-tertiary)',
                marginTop: 8,
                flexShrink: 0,
              }}
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
