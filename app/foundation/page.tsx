import type { Metadata } from 'next';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { LAYERS } from '@/lib/data/layers';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AOS-001 Foundation',
  description:
    'The 6-layer revenue foundation every Manhaj install runs on. Capture, Qualify, Engage, Convert, Retain, Intelligence.',
  alternates: { canonical: `${SITE.url}/foundation` },
  openGraph: {
    title: 'AOS-001 — The 6-layer revenue foundation',
    description:
      'Universal 6-layer foundation. Bespoke modules on top. The architecture behind every Manhaj install.',
  },
};

export default function FoundationPage() {
  return (
    <article>
      <header className="border-b border-line pt-32 pb-20 md:pt-40">
        <div className="mx-auto max-w-(--container-wide) px-6 md:px-10">
          <Eyebrow>The Offer · 02</Eyebrow>
          <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.04] text-cream md:text-7xl">
            AOS-001 — the 6-layer{' '}
            <em className="not-italic text-gold">revenue foundation.</em>
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-cream-dim">
            Every Manhaj install runs on the same six universal layers. Modules
            on top are bespoke. That&apos;s what makes the OS yours.
          </p>
        </div>
      </header>

      <section className="border-b border-line py-20 md:py-28">
        <div className="mx-auto max-w-(--container-wide) px-6 md:px-10">
          <div className="grid gap-px overflow-hidden border border-line bg-line">
            {LAYERS.map((layer) => (
              <Reveal key={layer.num}>
                <div className="grid grid-cols-1 gap-8 bg-ink p-9 md:grid-cols-[120px_1fr_320px] md:gap-10">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.32em] text-gold">
                      LAYER {layer.num}
                    </p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-mute">
                      ◊ AOS-001
                    </p>
                  </div>
                  <div>
                    <h2 className="font-serif text-4xl font-medium text-cream md:text-5xl">
                      {layer.name}
                    </h2>
                    <p className="mt-4 font-sans text-base leading-relaxed text-cream-dim">
                      {layer.detail}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold">
                      Channels
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {layer.channels.map((c) => (
                        <span
                          key={c}
                          className="border border-line-2 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-cream-dim"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-(--container-narrow) px-6 text-center md:px-10">
          <h3 className="font-serif text-4xl text-cream md:text-5xl">
            Foundation universal. Modules bespoke.
          </h3>
          <p className="mt-6 font-sans text-base leading-relaxed text-cream-dim">
            See the foundation running inside two anonymized client systems —
            then book a 45-minute audit if you&apos;d like one of your own.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/kiosks/" variant="primary">
              Open the kiosks
            </ButtonLink>
            <ButtonLink href="/audit" variant="outline">
              Book an audit
            </ButtonLink>
          </div>
        </div>
      </section>
    </article>
  );
}
