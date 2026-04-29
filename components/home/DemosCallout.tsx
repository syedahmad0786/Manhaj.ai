'use client';

import Link from 'next/link';
import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/shared/SectionHeader';

// Direct port from .extracted-source/007's DemoTeasers — adapted to point at
// the real kiosk routes that ship in /public/kiosks/.
const DEMOS = [
  {
    slug: 'command-center',
    title: 'Multi-location service ops',
    sub: 'Command Center · Lead-to-revenue OS',
    kpi: { leads: '1,284', conv: '34.2%', rt: '47s' },
    type: 'dashboard' as const,
    href: '/kiosks/command-center/',
  },
  {
    slug: 'onboarding',
    title: 'Operator onboarding flow',
    sub: 'Convert · activation engine',
    kpi: { leads: '612', conv: '41.8%', rt: '52s' },
    type: 'schematic' as const,
    href: '/kiosks/onboarding/',
  },
  {
    slug: 'errorlens',
    title: 'Cross-stack observability',
    sub: 'Intelligence · alerts layer',
    kpi: { leads: '283', conv: '52.1%', rt: '38s' },
    type: 'dashboard' as const,
    href: '/kiosks/errorlens/',
  },
] as const;

export default function DemosCallout() {
  return (
    <section
      style={{
        padding: '160px 0',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--line-soft)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 64,
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <SectionHeader
            eyebrow="The closer"
            title={
              <>
                Don&apos;t trust pitches.
                <br />
                <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Touch the system.</span>
              </>
            }
            sub="Three anonymized live versions of real Manhaj installs. Real workflows. Real interfaces. Dummy data. Open in a new window — break things if you want."
          />
          <Link
            href="/kiosks/"
            className="btn btn-ghost"
            data-magnetic
            style={{ textDecoration: 'none' }}
          >
            All demos <span className="arrow">→</span>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {DEMOS.map((d, i) => (
            <Reveal key={d.slug} delay={i * 100}>
              <DemoCard {...d} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type DemoCardProps = {
  slug: string;
  title: string;
  sub: string;
  kpi: { leads: string; conv: string; rt: string };
  type: 'dashboard' | 'schematic';
  href: string;
};

function DemoCard({ slug, title, sub, kpi, type, href }: DemoCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={href}
      data-cursor-hover
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textDecoration: 'none',
        textAlign: 'left',
        background: 'var(--bg-elevated)',
        border: '1px solid',
        borderColor: hover ? 'var(--accent)' : 'var(--line)',
        transform: hover ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hover ? '0 20px 60px rgba(0,0,0,0.4), 0 0 60px rgba(201,169,97,0.08)' : 'none',
        transition: 'all 500ms var(--ease)',
        color: 'inherit',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          aspectRatio: '16 / 10',
          background: 'var(--bg-deep)',
          position: 'relative',
          borderBottom: '1px solid var(--line)',
          overflow: 'hidden',
        }}
      >
        {type === 'dashboard' ? (
          <DashboardPreview slug={slug} active={hover} />
        ) : (
          <SchematicPreview slug={slug} active={hover} />
        )}
      </div>

      <div
        style={{
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          flex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 16,
          }}
        >
          <div style={{ flex: 1 }}>
            <div className="t-mono" style={{ marginBottom: 12, fontSize: 10 }}>◊ Live · anonymized</div>
            <h3 className="t-display" style={{ fontSize: 22, lineHeight: 1.2, marginBottom: 6 }}>
              {title}
            </h3>
            <div style={{ fontSize: 13, color: 'var(--ink-secondary)' }}>{sub}</div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
            paddingTop: 16,
            borderTop: '1px solid var(--line-soft)',
          }}
        >
          <KPI label="Leads / 30d" value={kpi.leads} />
          <KPI label="Qual → Book" value={kpi.conv} />
          <KPI label="Avg response" value={kpi.rt} />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: hover ? 'var(--accent)' : 'var(--ink-tertiary)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              transition: 'color 300ms var(--ease)',
            }}
          >
            Walk through
          </span>
          <span
            style={{
              color: hover ? 'var(--accent)' : 'var(--ink-tertiary)',
              transform: hover ? 'translateX(6px)' : 'translateX(0)',
              transition: 'all 400ms var(--ease)',
            }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="t-mono" style={{ fontSize: 9, marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ink-primary)' }}>
        {value}
      </div>
    </div>
  );
}

// Stylized dashboard preview — port of DashboardPreview in 007.
function DashboardPreview({ slug, active }: { slug: string; active: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: 16,
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--ink-tertiary)' }}>
        <span style={{ width: 6, height: 6, background: 'var(--success)', borderRadius: '50%' }} />
        <span style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>{slug}.manhaj.ai/ops</span>
        <span style={{ marginLeft: 'auto' }}>↻ live · 30d</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
        {(['Pipeline', 'CAC', 'SLA', 'MRR'] as const).map((l, i) => (
          <div
            key={l}
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--line-soft)',
              padding: 8,
            }}
          >
            <div style={{ color: 'var(--ink-tertiary)', fontSize: 8, letterSpacing: '0.1em' }}>{l}</div>
            <div
              style={{
                color: 'var(--ink-primary)',
                fontFamily: 'var(--font-display)',
                fontSize: 16,
                marginTop: 2,
              }}
            >
              {(['$284K', '$48', '47s', '$31K'] as const)[i]}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          flex: 1,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--line-soft)',
          padding: 10,
          position: 'relative',
        }}
      >
        <div style={{ color: 'var(--ink-tertiary)', fontSize: 8, marginBottom: 6 }}>◊ INTAKE · last 30d</div>
        <svg width="100%" height="76" preserveAspectRatio="none" viewBox="0 0 200 80">
          <defs>
            <linearGradient id={`g-${slug}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={genChart(slug)} fill={`url(#g-${slug})`} stroke="none" />
          <path d={genChartLine(slug)} fill="none" stroke="var(--accent)" strokeWidth="1" />
          {[20, 60, 100, 140, 180].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="80" stroke="var(--line)" strokeOpacity="0.4" />
          ))}
        </svg>
        {active && (
          <div style={{ position: 'absolute', bottom: 8, right: 10, color: 'var(--accent)', fontSize: 8 }}>
            ● streaming
          </div>
        )}
      </div>
    </div>
  );
}

function genChart(slug: string) {
  const seed = slug.length;
  let path = 'M 0 80';
  for (let x = 0; x <= 200; x += 10) {
    const y = 60 - 20 * Math.sin((x + seed * 8) / 28) - x * 0.12;
    path += ` L ${x} ${Math.max(10, y)}`;
  }
  path += ' L 200 80 Z';
  return path;
}
function genChartLine(slug: string) {
  const seed = slug.length;
  let path = '';
  for (let x = 0; x <= 200; x += 10) {
    const y = 60 - 20 * Math.sin((x + seed * 8) / 28) - x * 0.12;
    path += (x === 0 ? 'M' : 'L') + ` ${x} ${Math.max(10, y)} `;
  }
  return path;
}

// Schematic / wireframe abstraction preview — port of SchematicPreview in 007.
function SchematicPreview({ slug, active }: { slug: string; active: boolean }) {
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 18 }}>
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 16,
          right: 16,
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          color: 'var(--ink-tertiary)',
        }}
      >
        <span style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>{slug}.architecture</span>
        <span>◊ schema · v.2</span>
      </div>
      <svg width="100%" height="100%" viewBox="0 0 400 250" style={{ overflow: 'visible' }}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const y = 50 + i * 28;
          return (
            <g key={i}>
              <line
                x1="40" y1={y} x2="360" y2={y}
                stroke={active ? 'var(--accent)' : 'rgba(201,169,97,0.4)'}
                strokeOpacity={1 - i * 0.06}
                strokeWidth="0.7"
              />
              <text
                x="32" y={y + 3} textAnchor="end"
                fontFamily="var(--font-mono)" fontSize="7"
                fill="var(--ink-tertiary)" letterSpacing="0.12em"
              >
                {String(i + 1).padStart(2, '0')}
              </text>
              <text
                x="368" y={y + 3}
                fontFamily="var(--font-mono)" fontSize="7"
                fill="var(--ink-tertiary)" letterSpacing="0.1em"
              >
                {(['CAP', 'QUA', 'ENG', 'CNV', 'RET', 'INT'] as const)[i]}
              </text>
              {[80, 140, 200, 260, 320].map((x) => (
                <circle
                  key={x} cx={x} cy={y} r={x === 200 ? 3 : 2}
                  fill="var(--accent)" opacity={x === 200 ? 1 : 0.5}
                />
              ))}
            </g>
          );
        })}
        {[80, 140, 200, 260, 320].map((x) => (
          <line
            key={x} x1={x} y1="50" x2={x} y2="190"
            stroke="var(--accent)" strokeOpacity="0.15" strokeDasharray="2 4"
          />
        ))}
        <text
          x="200" y="220" textAnchor="middle"
          fontFamily="var(--font-display)" fontStyle="italic"
          fontSize="11" fill="var(--ink-secondary)"
        >
          your bespoke configuration
        </text>
      </svg>
    </div>
  );
}
