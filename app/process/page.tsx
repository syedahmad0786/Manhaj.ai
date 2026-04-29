import type { Metadata } from 'next';
import PageHeader from '@/components/shared/PageHeader';
import Reveal from '@/components/ui/Reveal';
import FinalCTA from '@/components/home/FinalCTA';
import { SITE } from '@/lib/site';

// Direct port from .extracted-source/009 — ProcessPage.

export const metadata: Metadata = {
  title: 'Process — How an install runs',
  description:
    'The five weeks of a Manhaj install: Audit, Synthesize, Build, Install, Optimize, then ongoing modular requests. Founder-led, no surprises.',
  alternates: { canonical: `${SITE.url}/process` },
  openGraph: {
    title: 'Manhaj — Six steps. Five weeks. One install.',
    description:
      'Founder-led methodology. Audit Discovery Week → Synthesis → Build → Install → Optimize → Ongoing modules.',
  },
};

const STEPS = [
  {
    n: '01',
    label: 'Audit Discovery Week',
    sub: 'On-site or remote · 5 days',
    body:
      "On-site or Zoom. Interviews with the owner and every team member. We shadow your team during real work, watch how leads flow today, instrument every existing tool, and document the process the business actually runs — not the one in the SOP.",
    out: ['Process map (the actual one)', 'Tooling inventory + costs', 'Bottleneck atlas', 'Owner-priority list'],
  },
  {
    n: '02',
    label: 'Process the Audit',
    sub: 'Synthesis · 5 days',
    body:
      'Findings synthesized into a plain-English document — no jargon, no diagrams that need translating. Every task in your business is mapped: keep, augment with AI, or fully automate. The owner reviews and signs the architecture spec before we build a single thing.',
    out: ['Plain-English audit doc', 'Keep / Augment / Automate map', 'Architecture spec (signed)', 'Module backlog'],
  },
  {
    n: '03',
    label: 'Build the AIOS at Home',
    sub: 'Off-site assembly · 3–7 days',
    body:
      "Context OS, Data OS, and Intelligence layer assembled remotely. We orchestrate the existing stack, add what's missing, integrate every layer end-to-end. You aren't paying for our learning — we've built every layer before. Most of this is configuration, not invention.",
    out: ['Configured stack', 'End-to-end integration tests', 'Owner walkthrough video', 'Rollback plan'],
  },
  {
    n: '04',
    label: 'Install on-site',
    sub: 'Deployment + training · 2 days',
    body:
      "On-site install. Train every team member on what's changing, what's automated, what to expect. Route alerts to Slack / SMS / email. Hook up live integrations to production. We don't leave until the first real lead has flowed through every layer.",
    out: ['Live in production', 'Team trained + documented', 'Alert routing live', 'First-lead validation'],
  },
  {
    n: '05',
    label: 'Optimize & monitor',
    sub: 'First 30 days · daily check-ins',
    body:
      'The first 30 days, we tune. Drift gets corrected. Edge cases surface and we patch. Early wins are captured and shared with the team. By day 30, the OS is stable, the team trusts it, and the dashboard tells you the story without you asking.',
    out: ['Drift corrections', 'Edge-case patches', 'First wins doc', '30-day stability report'],
  },
  {
    n: '06',
    label: 'Ongoing modular requests',
    sub: 'Retainer · indefinite',
    body:
      'Every new business need plugs in as a module on top. New product line? New channel? New ICP? Modules. Not rebuilds. The foundation stays; the surface evolves. Most clients add 2–4 modules per quarter.',
    out: ['Module roadmap', 'Quarterly architecture review', 'Cost-of-AI-spend report', 'Owner-direct line'],
  },
] as const;

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Install · Methodology"
        title={
          <>
            Six steps. Five weeks.
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>One install.</span>
          </>
        }
        sub="No surprises. Every Manhaj engagement runs this exact sequence — refined across real installs."
      />

      {STEPS.map((s, i) => (
        <section
          key={s.n}
          style={{
            padding: '120px 0',
            borderTop: '1px solid var(--line-soft)',
            background: i % 2 === 1 ? 'var(--bg-deep)' : 'transparent',
          }}
        >
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr 1fr',
                gap: 64,
                alignItems: 'flex-start',
              }}
            >
              <Reveal>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 80,
                    color: 'var(--accent)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    opacity: 0.85,
                  }}
                >
                  {s.n}
                </div>
                <div className="t-mono" style={{ marginTop: 16, fontSize: 10 }}>{s.sub}</div>
              </Reveal>
              <Reveal delay={120}>
                <h3
                  className="t-display"
                  style={{ fontSize: 'clamp(32px, 4vw, 52px)', marginBottom: 24, lineHeight: 1.05 }}
                >
                  {s.label}
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-secondary)' }}>{s.body}</p>
              </Reveal>
              <Reveal delay={240}>
                <div
                  style={{
                    padding: 28,
                    border: '1px solid var(--line)',
                    background: 'var(--bg-elevated)',
                  }}
                >
                  <div className="t-eyebrow" style={{ marginBottom: 18 }}>◊ Deliverables</div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {s.out.map((o) => (
                      <li
                        key={o}
                        style={{
                          display: 'flex',
                          gap: 12,
                          alignItems: 'flex-start',
                          fontSize: 14,
                          color: 'var(--ink-primary)',
                          paddingBottom: 12,
                          borderBottom: '1px solid var(--line-soft)',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--success)',
                            fontSize: 11,
                            marginTop: 2,
                          }}
                        >
                          ✓
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <FinalCTA />
    </>
  );
}
