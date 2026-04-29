import type { Metadata } from 'next';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { TIERS } from '@/lib/data/pricing';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pricing — Foundation, Operator, Architect',
  description:
    'Three tiers. Foundation $5K + $2K/mo. Operator $10K + $3.5K/mo. Architect $15K + $5K/mo. Founder-led, bespoke, yours alone.',
  alternates: { canonical: `${SITE.url}/pricing` },
  openGraph: {
    title: 'Manhaj — Pricing tiers',
    description: 'Foundation · Operator · Architect. Setup + retainer pricing for the AOS-001 install.',
  },
};

export default function PricingPage() {
  return (
    <article>
      <header className="border-b border-line pt-32 pb-20 md:pt-40">
        <div className="mx-auto max-w-(--container-wide) px-6 md:px-10">
          <Eyebrow>06 · Pricing</Eyebrow>
          <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.04] text-cream md:text-7xl">
            Three tiers.{' '}
            <em className="not-italic text-gold">One foundation.</em>
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-cream-dim">
            Setup + retainer. Every tier ships the AOS-001 6-layer foundation;
            scope above that scales by modules and intelligence depth.
          </p>
        </div>
      </header>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-(--container-wide) px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {TIERS.map((tier) => (
              <Reveal key={tier.name}>
                <article
                  className={`relative flex h-full flex-col border p-9 ${
                    tier.featured
                      ? 'border-gold bg-gold/[0.03]'
                      : 'border-line bg-ink-2/30'
                  }`}
                >
                  {tier.featured && (
                    <span className="absolute -top-3 left-9 bg-gold px-3 py-1 font-mono text-[9px] uppercase tracking-[0.32em] text-ink">
                      ◊ Most fit
                    </span>
                  )}
                  <h2 className="font-serif text-4xl text-cream">
                    {tier.name}
                  </h2>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-mute">
                    ◊ AOS-001 install
                  </p>
                  <div className="mt-8 space-y-1">
                    <p className="font-serif text-3xl text-gold">
                      {tier.setup}
                      <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.32em] text-mute">
                        SETUP
                      </span>
                    </p>
                    <p className="font-serif text-2xl text-cream">
                      {tier.retainer}
                      <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.32em] text-mute">
                        RETAINER
                      </span>
                    </p>
                  </div>
                  <p className="mt-6 font-sans text-sm leading-relaxed text-cream-dim">
                    {tier.scope}
                  </p>
                  <ul className="mt-8 space-y-3">
                    {tier.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 font-sans text-sm text-cream-dim"
                      >
                        <span aria-hidden className="text-gold">◊</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 flex-1" />
                  <ButtonLink
                    href="/audit"
                    variant={tier.featured ? 'primary' : 'outline'}
                  >
                    Book audit
                  </ButtonLink>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-12 max-w-2xl font-mono text-[10px] uppercase tracking-[0.28em] text-mute">
            ◊ Pricing range $5K–$15K setup + $2K–$5K/mo · Tier breakdown is a
            current draft — final scope is locked on the audit call.
          </p>
        </div>
      </section>
    </article>
  );
}
