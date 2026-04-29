import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import { LAYERS } from '@/lib/data/layers';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-(--container-wide) gap-16 px-6 pt-24 pb-28 md:grid-cols-[1.4fr_1fr] md:gap-24 md:px-10 md:pt-32">
        <div>
          <Eyebrow>AOS-001 · Architecture</Eyebrow>
          <h1 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tight text-cream sm:text-6xl md:text-7xl">
            The AI Operating System{' '}
            <em className="not-italic text-gold">architected uniquely</em> for
            your business.
          </h1>
          <p className="mt-8 max-w-[44ch] font-sans text-lg leading-relaxed text-cream-dim">
            Built on a proven 6-layer revenue foundation. Configured to how you
            actually run. Owned by you.
          </p>
          <p className="mt-6 font-serif text-2xl italic text-gold">
            Your OS is no one else&apos;s.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href="/kiosks/" variant="primary">
              See a live demo
            </ButtonLink>
            <ButtonLink href="/audit" variant="outline">
              Book an audit
            </ButtonLink>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3 font-mono text-[11px] uppercase tracking-[0.28em] text-mute">
            <span>◊ B2B SERVICE &amp; EDUCATION</span>
            <span>◊ $1M–$10M ARR</span>
            <span>◊ FOUNDER-LED</span>
          </div>
        </div>

        <aside aria-label="AOS-001 stack" className="relative">
          <Link
            href="/foundation"
            className="block group"
            aria-label="Open the AOS-001 6-layer foundation"
          >
            <div className="border border-line bg-ink-2/40 px-7 py-7 backdrop-blur-sm transition-colors group-hover:border-gold">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold">
                ◊ AOS-001 · 6-LAYER FOUNDATION
              </p>
              <ol className="mt-7 space-y-3">
                {LAYERS.map((layer) => (
                  <li
                    key={layer.num}
                    className="flex items-center justify-between border-b border-line/60 pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-mute">
                        {layer.num}
                      </span>
                      <span className="font-serif text-2xl font-medium text-cream">
                        {layer.name}
                      </span>
                    </span>
                    <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-cream-dim sm:inline">
                      {layer.channels.join(' · ')}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-gold transition-transform group-hover:translate-x-1">
                Open the foundation <span aria-hidden>→</span>
              </p>
            </div>
          </Link>
        </aside>
      </div>
    </section>
  );
}
