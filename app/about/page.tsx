import type { Metadata } from 'next';
import PageHeader from '@/components/shared/PageHeader';
import SectionHeader from '@/components/shared/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import CTAButton from '@/components/ui/CTAButton';
import ArabicMark from '@/components/shared/ArabicMark';
import { SITE } from '@/lib/site';

// Direct port from .extracted-source/006 — AboutPage.

export const metadata: Metadata = {
  title: `About ${SITE.founder}`,
  description:
    `${SITE.founder} architects AI operating systems for B2B service and education companies. Founder-led, bespoke, yours alone.`,
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: `${SITE.founder} — Architect of Manhaj`,
    description:
      'Most agencies sell automations. I architect operating systems. Founder-led delivery, no PMs, no juniors, no handoffs.',
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The architect"
        title={
          <>
            Ahmad Bukhari.
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Architect, not consultant.</span>
          </>
        }
      />

      <section style={{ padding: '40px 0 120px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              gap: 80,
              alignItems: 'flex-start',
            }}
          >
            <Reveal>
              <Portrait />
            </Reveal>
            <Reveal delay={150}>
              <div style={{ paddingTop: 24 }}>
                <div className="t-eyebrow" style={{ marginBottom: 28 }}>◊ Origin</div>
                <p
                  className="t-display"
                  style={{
                    fontSize: 28,
                    lineHeight: 1.3,
                    color: 'var(--ink-primary)',
                    marginBottom: 32,
                  }}
                >
                  Trained in economics. Built systems for operator-led businesses before AI was a feature. Now
                  installs them in five weeks.
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24,
                    fontSize: 16,
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.7,
                  }}
                >
                  <p>
                    I started in the back rooms of operator-led businesses — the kind that grow from $1M to
                    $10M not because they have a good product, but because they have a good system. Watching
                    them, I noticed the bottleneck was always the same: the system grew faster than the
                    people running it could think about it.
                  </p>
                  <p>
                    AI changed that. Not as a chatbot, not as a feature. As infrastructure. Suddenly the
                    system could think about itself. The owner could finally stop being the bottleneck and
                    start being the architect.
                  </p>
                  <p>
                    Manhaj is the methodology I built doing this — installed inside real businesses before it
                    had a name. AOS-001 is its first published specification.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <BrandEtymology />

      <BeliefSection />

      <section
        style={{
          padding: '160px 0',
          borderTop: '1px solid var(--line-soft)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <Reveal>
            <h2 className="t-display" style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginBottom: 40 }}>
              Talk to the architect directly.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <CTAButton primary path="/audit" label="Book the discovery call" />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Portrait() {
  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '4/5',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--line)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 50% 35%, rgba(201,169,97,0.18), transparent 55%),
            linear-gradient(180deg, #1A1A1F 0%, #0A0A0B 100%)
          `,
        }}
      />
      <svg
        width="100%" height="100%" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0 }}
      >
        <ellipse cx="200" cy="190" rx="68" ry="80" fill="#1F1F25" />
        <path d="M 60 500 L 80 380 Q 110 320 200 320 Q 290 320 320 380 L 340 500 Z" fill="#16161A" />
        <ellipse cx="180" cy="170" rx="30" ry="40" fill="rgba(201,169,97,0.06)" />
        <path d="M 248 200 Q 260 240 245 280" stroke="rgba(201,169,97,0.3)" strokeWidth="1" fill="none" />
      </svg>

      {[0, 1, 2, 3].map((c) => (
        <span
          key={c}
          style={{
            position: 'absolute',
            width: 12,
            height: 12,
            border: '1px solid var(--accent)',
            ...(c < 2 ? { top: 16 } : { bottom: 16 }),
            ...(c % 2 === 0 ? { left: 16 } : { right: 16 }),
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 28,
          right: 28,
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-tertiary)',
        }}
      >
        <span>◊ A. BUKHARI</span>
        <span>2026 / portrait_01</span>
      </div>
    </div>
  );
}

function BrandEtymology() {
  return (
    <section
      style={{
        padding: '160px 0',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--line-soft)',
        borderBottom: '1px solid var(--line-soft)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          <Reveal>
            <ArabicMark />
          </Reveal>
          <Reveal delay={200}>
            <div className="t-eyebrow" style={{ marginBottom: 28 }}>◊ Etymology</div>
            <h2
              className="t-display"
              style={{
                fontSize: 'clamp(36px, 5vw, 60px)',
                marginBottom: 32,
                lineHeight: 1.1,
              }}
            >
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Manhaj</span> · منهج
            </h2>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: 'var(--ink-primary)',
                maxWidth: 640,
                marginBottom: 18,
              }}
            >
              Arabic for <span style={{ color: 'var(--accent)' }}>system</span> or{' '}
              <span style={{ color: 'var(--accent)' }}>methodology</span> — used in classical scholarship for
              the systematic methodology of inquiry.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-secondary)', maxWidth: 640 }}>
              It names what we deliver. Not a tool. Not a stack. Not a snapshot. A methodology, installed as
              software, architected for the way your business actually runs.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BeliefSection() {
  const beliefs = [
    {
      n: '01',
      title: 'Templates are theft of context.',
      body:
        'Every operator-led business is a unique configuration of constraints, customers, and team. A template throws that away. Manhaj reads it.',
    },
    {
      n: '02',
      title: 'Owners should be architects, not operators.',
      body:
        "Your job is to design the system. The system's job is to run the business. We install the layer between.",
    },
    {
      n: '03',
      title: 'Speed is a feature of architecture, not effort.',
      body: "Sub-60s response is not aggressive — it's default, when the system is shaped right.",
    },
    {
      n: '04',
      title: 'AI is infrastructure, not a feature.',
      body:
        'It belongs in the foundation, not the marketing slide. Inside Manhaj, every layer assumes intelligence as plumbing.',
    },
  ] as const;
  return (
    <section style={{ padding: '160px 0' }}>
      <div className="container">
        <SectionHeader eyebrow="Operating principles" title="Four beliefs the OS is built on." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {beliefs.map((b, i) => (
            <Reveal key={b.n} delay={i * 100}>
              <div
                style={{
                  padding: 36,
                  border: '1px solid var(--line)',
                  background: 'var(--bg-elevated)',
                  minHeight: 240,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 24,
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--accent)' }}>
                    {b.n}
                  </span>
                  <span className="t-mono" style={{ fontSize: 9 }}>◊ AXIOM</span>
                </div>
                <h3 className="t-display" style={{ fontSize: 26, lineHeight: 1.2, marginBottom: 18 }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--ink-secondary)', lineHeight: 1.7 }}>{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
