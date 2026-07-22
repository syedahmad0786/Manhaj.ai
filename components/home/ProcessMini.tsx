import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/shared/SectionHeader';

// Direct port from .extracted-source/007.
const STEPS = [
  { n: '01', label: 'Audit', sub: 'Discovery week' },
  { n: '02', label: 'Synthesis', sub: 'Plain-English doc' },
  { n: '03', label: 'Build', sub: 'Off-site assembly' },
  { n: '04', label: 'Install', sub: 'Train your team' },
  { n: '05', label: 'Optimize', sub: 'Monitored rollout' },
  { n: '06', label: 'Modular', sub: 'Modules on top' },
] as const;

export default function ProcessMini() {
  return (
    <section style={{ padding: '160px 0' }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 80,
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <SectionHeader eyebrow="The install" title="Six stages. A defined path." />
          <Link
            href="/process"
            className="btn btn-ghost"
            data-magnetic
            style={{ textDecoration: 'none' }}
          >
            Read the full process <span className="arrow">→</span>
          </Link>
        </div>

        <div
          className="manhaj-home-process-grid"
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 0,
          }}
        >
          <div
            className="manhaj-home-process-line"
            style={{
              position: 'absolute',
              top: 18,
              left: '8%',
              right: '8%',
              height: 1,
              background: 'var(--accent)',
              opacity: 0.4,
            }}
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div
                className="manhaj-home-process-step"
                style={{
                  position: 'relative',
                  textAlign: 'left',
                  padding: '0 12px',
                  borderLeft: i === 0 ? 'none' : '1px solid var(--line-soft)',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    border: '1px solid var(--accent)',
                    background: 'var(--bg-base)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--accent)',
                    marginBottom: 24,
                    marginLeft: i === 0 ? 0 : 8,
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22,
                    color: 'var(--ink-primary)',
                    marginBottom: 6,
                    marginLeft: i === 0 ? 0 : 8,
                  }}
                >
                  {s.label}
                </div>
                <div className="t-mono" style={{ fontSize: 10, marginLeft: i === 0 ? 0 : 8 }}>
                  {s.sub}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
