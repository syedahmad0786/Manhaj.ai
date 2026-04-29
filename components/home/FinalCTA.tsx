import Reveal from '@/components/ui/Reveal';
import CTAButton from '@/components/ui/CTAButton';

// Direct port from .extracted-source/007 — Final CTA with rotating cube backdrop.
export default function FinalCTA() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '180px 0',
        overflow: 'hidden',
        borderTop: '1px solid var(--line-soft)',
        background: 'var(--bg-deep)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-100px',
          transform: 'translateY(-50%)',
          width: 480,
          height: 480,
          perspective: 1400,
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            animation: 'rotCube 30s linear infinite',
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: '20%',
                border: '1px solid var(--accent)',
                opacity: 0.15 + i * 0.05,
                transform: `rotateX(${i * 30}deg) rotateY(${i * 24}deg) translateZ(${i * 14}px)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container" style={{ position: 'relative' }}>
        <Reveal>
          <div className="t-eyebrow" style={{ marginBottom: 36 }}>◊ Begin the audit</div>
        </Reveal>
        <Reveal delay={120}>
          <h2
            className="t-display"
            style={{
              fontSize: 'clamp(56px, 8vw, 132px)',
              lineHeight: 0.96,
              letterSpacing: '-0.04em',
              maxWidth: 1200,
              marginBottom: 56,
            }}
          >
            Your OS is{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>no one else&apos;s.</span>
            <br />
            Build it.
          </h2>
        </Reveal>
        <Reveal delay={300}>
          <CTAButton primary path="/audit" label="Book a discovery audit" />
        </Reveal>
      </div>
      <style>{`
        @keyframes rotCube { to { transform: rotateY(360deg) rotateX(360deg); }}
      `}</style>
    </section>
  );
}
