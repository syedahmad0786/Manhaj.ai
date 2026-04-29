import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/shared/SectionHeader';
import LayerDiagram from '@/components/home/LayerDiagram';

// Direct port from .extracted-source/007 — home-page foundation section
// wrapping the interactive LayerDiagram.
export default function FoundationSection() {
  return (
    <section style={{ padding: '160px 0', borderTop: '1px solid var(--line-soft)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="AOS-001 · The Foundation"
          title={
            <>
              Universal foundation.
              <br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Bespoke modules.</span>
            </>
          }
          sub="Six layers. Every Manhaj install carries them. The orchestration inside each layer — the tools, the models, the workflows — is engineered for you alone."
        />
        <Reveal>
          <LayerDiagram />
        </Reveal>
        <div style={{ marginTop: 64, textAlign: 'center' }}>
          <Link
            href="/foundation"
            className="btn btn-secondary"
            data-magnetic
            style={{ textDecoration: 'none' }}
          >
            See the full architecture <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
