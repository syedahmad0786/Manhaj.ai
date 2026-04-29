'use client';

import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import SectionHeader from '@/components/shared/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import CTAButton from '@/components/ui/CTAButton';

// Direct port from .extracted-source/009 — PricingPage.

type Tier = {
  name: string;
  price: string;
  retainer: string;
  kicker: string;
  desc: string;
  includes: string[];
  featured?: boolean;
};

const TIERS: readonly Tier[] = [
  {
    name: 'Foundation',
    price: '$5,000',
    retainer: '$2,000',
    kicker: 'For operators with one offer + one channel',
    desc: 'The 6-layer foundation, installed. Two channels orchestrated. Single dashboard.',
    includes: [
      '6-layer AOS-001 install',
      '2 capture channels',
      'Single ICP scoring model',
      'Voice + SMS engagement',
      'Founder dashboard',
      'Monthly architecture review',
    ],
  },
  {
    name: 'Operator',
    price: '$10,000',
    retainer: '$3,500',
    kicker: 'For operator-led businesses with multi-channel pipelines',
    desc:
      'Everything in Foundation. Multi-channel intake. Custom retention engine. Quarterly module roadmap.',
    includes: [
      'Everything in Foundation',
      '5 capture channels',
      'Multi-ICP routing',
      'WhatsApp + Email + SMS + Voice',
      'Retention engine (custom)',
      'Quarterly module roadmap',
      'Slack channel · 24h response',
    ],
    featured: true,
  },
  {
    name: 'Architect',
    price: '$15,000',
    retainer: '$5,000',
    kicker: 'For multi-location, multi-offer operations',
    desc:
      'Everything in Operator. Multi-entity architecture. Cross-location intelligence. Direct line to Ahmad.',
    includes: [
      'Everything in Operator',
      'Unlimited capture channels',
      'Multi-entity routing',
      'Cross-location intelligence',
      'Custom integrations (any API)',
      'White-glove modular requests',
      'Direct architect line · 4h response',
    ],
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Engagement"
        title={
          <>
            Three tiers.
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>One foundation.</span>
          </>
        }
        sub="Setup is one-time. Retainer is monthly. Both scale with the surface area of what you're running, not the value we deliver."
      />

      <section style={{ padding: '0 0 120px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {TIERS.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <PricingCard tier={t} />
              </Reveal>
            ))}
          </div>

          <div
            style={{
              marginTop: 64,
              padding: 32,
              border: '1px solid var(--line)',
              background: 'var(--bg-elevated)',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 32,
              alignItems: 'center',
            }}
          >
            <div>
              <div className="t-mono" style={{ marginBottom: 8, color: 'var(--accent)' }}>◊ DISCOVERY</div>
              <p style={{ fontSize: 16, color: 'var(--ink-primary)' }}>
                Discovery audit week is{' '}
                <span style={{ color: 'var(--accent)' }}>$1,500</span>, credited to your install if you
                proceed. The first 30-minute discovery call is free.
              </p>
            </div>
            <CTAButton primary path="/audit" label="Start with discovery" />
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
}

function PricingCard({ tier }: { tier: Tier }) {
  const [hover, setHover] = useState(false);
  const featured = !!tier.featured;
  return (
    <div
      data-cursor-hover
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        padding: 40,
        minHeight: 640,
        background: featured
          ? 'linear-gradient(180deg, rgba(201,169,97,0.08), var(--bg-elevated))'
          : 'var(--bg-elevated)',
        border: '1px solid',
        borderColor: featured ? 'var(--accent)' : 'var(--line)',
        boxShadow: featured ? '0 0 80px rgba(201,169,97,0.12)' : 'none',
        transition: 'all 500ms var(--ease)',
        transform: hover ? 'translateY(-6px)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {featured && (
        <div
          style={{
            position: 'absolute',
            top: -1,
            right: 24,
            padding: '4px 12px',
            background: 'var(--accent)',
            color: 'var(--bg-base)',
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          ◊ Recommended
        </div>
      )}
      <div>
        <div className="t-mono" style={{ marginBottom: 8 }}>◊ Tier</div>
        <h3 className="t-display" style={{ fontSize: 40, marginBottom: 8 }}>{tier.name}</h3>
        <div
          style={{
            fontSize: 13,
            color: 'var(--ink-secondary)',
            fontStyle: 'italic',
            fontFamily: 'var(--font-display)',
          }}
        >
          {tier.kicker}
        </div>
      </div>

      <div style={{ paddingBottom: 24, borderBottom: '1px solid var(--line-soft)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span className="t-display" style={{ fontSize: 56 }}>{tier.price}</span>
          <span className="t-mono" style={{ fontSize: 11 }}>setup</span>
        </div>
        <div style={{ marginTop: 8, fontSize: 14, color: 'var(--ink-secondary)' }}>
          + <span style={{ color: 'var(--ink-primary)', fontFamily: 'var(--font-display)' }}>{tier.retainer}</span>
          <span style={{ color: 'var(--ink-tertiary)' }}> /mo retainer</span>
        </div>
      </div>

      <p style={{ fontSize: 14, color: 'var(--ink-secondary)', lineHeight: 1.6 }}>{tier.desc}</p>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {tier.includes.map((it) => (
          <li
            key={it}
            style={{
              display: 'flex',
              gap: 12,
              fontSize: 13,
              color: 'var(--ink-primary)',
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent)',
                fontSize: 11,
                marginTop: 2,
              }}
            >
              +
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>

      <CTAButton primary={featured} path="/audit" label={featured ? 'Engage Operator' : 'Begin'} />
    </div>
  );
}

function FAQSection() {
  const faqs: ReadonlyArray<{ q: string; a: string }> = [
    {
      q: 'Why a setup fee + retainer?',
      a: 'Setup buys the architecture and install. Retainer covers monitoring, modular requests, and the ongoing tuning every operating system needs. You can pause the retainer; the system keeps running. We just stop building new modules.',
    },
    {
      q: 'Do I own the system?',
      a: "Yes. Code, configurations, integrations, and data live in your accounts under your credentials. If you stop working with us, you keep everything. We don't hold infrastructure hostage — that's an agency tell.",
    },
    {
      q: 'How is this different from an automation agency?',
      a: 'Most agencies sell hours. We sell architecture. Most agencies build per-request. We install a foundation. Most agencies have account managers between you and the builder. Manhaj is founder-led; you talk to the architect.',
    },
    {
      q: 'What if I already have an existing stack?',
      a: "Better. We orchestrate what you have, augment what's missing, and replace only what's broken. The audit identifies what to keep, augment, and automate. We don't do rip-and-replace unless your tools genuinely can't do the job.",
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section
      style={{
        padding: '160px 0',
        borderTop: '1px solid var(--line-soft)',
        background: 'var(--bg-deep)',
      }}
    >
      <div className="container-narrow">
        <SectionHeader eyebrow="Common questions" title="Before you book." align="left" />
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--line)' }}>
              <button
                data-cursor-hover
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: '100%',
                  padding: '28px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  font: 'inherit',
                  textAlign: 'left',
                  color: 'inherit',
                }}
              >
                <span className="t-display" style={{ fontSize: 22, color: 'var(--ink-primary)' }}>
                  {f.q}
                </span>
                <span
                  style={{
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 18,
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 400ms var(--ease)',
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: open === i ? 200 : 0,
                  overflow: 'hidden',
                  transition: 'all 500ms var(--ease)',
                }}
              >
                <p
                  style={{
                    paddingBottom: 28,
                    fontSize: 15,
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.7,
                    maxWidth: 720,
                  }}
                >
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
