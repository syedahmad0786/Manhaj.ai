import type { Metadata } from 'next';
import PageHeader from '@/components/shared/PageHeader';
import Reveal from '@/components/ui/Reveal';
import FinalCTA from '@/components/home/FinalCTA';
import JsonLd from '@/components/shared/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { pageSchema } from '@/lib/schema';

// Direct port from .extracted-source/009 — ProcessPage.

const title = 'The MANHAJ Installation Process: Six Stages';
const description =
  'See how a founder-led MANHAJ implementation moves from discovery and synthesis through build, installation, validation, optimization, and ongoing modules.';

export const metadata: Metadata = pageMetadata({ title, description, path: '/process' });

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
      "Context OS, Data OS, and the Intelligence layer are assembled remotely. We orchestrate the existing stack, add what is missing, integrate the agreed layers end-to-end, and test each path against the signed architecture specification.",
    out: ['Configured stack', 'End-to-end integration tests', 'Owner walkthrough video', 'Rollback plan'],
  },
  {
    n: '04',
    label: 'Install on-site',
    sub: 'Deployment + training · 2 days',
    body:
      "Install on-site or remotely. Train the affected team on what is changing, what is automated, and where human decisions remain. Route alerts to the agreed channels, connect production integrations, and validate representative end-to-end scenarios.",
    out: ['Live in production', 'Team trained + documented', 'Alert routing live', 'First-lead validation'],
  },
  {
    n: '05',
    label: 'Optimize & monitor',
    sub: 'First 30 days · daily check-ins',
    body:
      'During the initial monitoring period, we review drift, patch surfaced edge cases, and document observed outcomes. Stability and adoption are evaluated against agreed acceptance criteria rather than assumed on a fixed date.',
    out: ['Drift corrections', 'Edge-case patches', 'First wins doc', '30-day stability report'],
  },
  {
    n: '06',
    label: 'Ongoing modular requests',
    sub: 'Retainer · indefinite',
    body:
      'New business needs can be scoped as modules on top of the foundation. A new product line, channel, or ICP may extend the surface while preserving the documented core where the architecture allows.',
    out: ['Module roadmap', 'Quarterly architecture review', 'Cost-of-AI-spend report', 'Owner-direct line'],
  },
] as const;

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={pageSchema({ name: title, description, path: '/process' })} />
      <PageHeader
        eyebrow="The Install · Methodology"
        title={
          <>
            Six stages. A defined path.
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>One install.</span>
          </>
        }
        sub="A transparent operating sequence, with timing and delivery mode confirmed in the signed scope."
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
              className="manhaj-process-step-grid"
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
                  className="manhaj-process-deliverables"
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
