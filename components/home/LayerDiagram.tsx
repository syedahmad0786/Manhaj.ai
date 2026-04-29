import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import { LAYERS } from '@/lib/data/layers';

export default function LayerDiagram() {
  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="mx-auto max-w-(--container-wide) px-6 md:px-10">
        <Reveal>
          <Eyebrow>02 · The Offer</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.04] text-cream md:text-5xl">
            The 6-layer foundation. Every install runs on it.
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-cream-dim">
            Modules on top are bespoke. That&apos;s what makes the OS yours.
            The foundation is universal; the architecture is operator-specific.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line">
          {LAYERS.map((layer, i) => (
            <Reveal key={layer.num} delay={120 + i * 60}>
              <article className="grid grid-cols-[auto_1fr] items-start gap-8 bg-ink p-7 md:grid-cols-[auto_1fr_auto] md:gap-10 md:p-9">
                <span className="font-mono text-[11px] tracking-[0.28em] text-gold pt-2">
                  {layer.num}
                </span>
                <div>
                  <h3 className="font-serif text-3xl font-medium text-cream md:text-4xl">
                    {layer.name}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-cream-dim md:text-base">
                    {layer.detail}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 md:justify-end md:pt-2">
                  {layer.channels.map((c) => (
                    <span
                      key={c}
                      className="border border-line-2 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-cream-dim"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Link
            href="/foundation"
            className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-gold hover:translate-x-1 transition-transform"
          >
            Read the AOS-001 deep dive <span aria-hidden>→</span>
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-mute">
            ◊ Foundation universal · Modules bespoke
          </span>
        </div>
      </div>
    </section>
  );
}
