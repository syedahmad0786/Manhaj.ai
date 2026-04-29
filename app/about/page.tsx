import type { Metadata } from 'next';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { SITE } from '@/lib/site';

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
    <article>
      <header className="border-b border-line pt-32 pb-20 md:pt-40">
        <div className="mx-auto max-w-(--container-wide) px-6 md:px-10">
          <Eyebrow>About · Founder</Eyebrow>
          <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.04] text-cream md:text-7xl">
            I&apos;m an AI Architect.{' '}
            <em className="not-italic text-gold">Not an agency.</em>
          </h1>
        </div>
      </header>

      <section className="border-b border-line py-24 md:py-32">
        <div className="mx-auto grid max-w-(--container-wide) gap-16 px-6 md:grid-cols-[1fr_360px] md:gap-20 md:px-10">
          <div className="space-y-8 font-sans text-lg leading-relaxed text-cream-dim">
            <Reveal>
              <p>
                I install AI operating systems for B2B service and education
                companies — built on a proven 6-layer revenue foundation,
                configured to how each business actually runs.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="font-serif text-3xl leading-[1.18] text-cream md:text-4xl">
                Most AI agencies sell automations.{' '}
                <em className="not-italic text-gold">
                  I architect operating systems.
                </em>
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p>
                Manhaj (منهج) is the Arabic word for{' '}
                <em className="text-cream">system / methodology</em> — used in
                classical Arabic scholarship for the systematic methodology of
                inquiry. The brand is a promise: we don&apos;t sell tools, we
                install methodology as software.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p>
                You talk to the architect who builds it. No PMs. No juniors. No
                handoffs.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <ButtonLink href="/audit" variant="primary">
                Book a 45-minute audit
              </ButtonLink>
            </Reveal>
          </div>

          <aside className="border border-line bg-ink-2/40 p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold">
              ◊ ICP · Who Manhaj fits
            </p>
            <ul className="mt-6 space-y-4 font-sans text-sm leading-relaxed text-cream-dim">
              <li>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream">Revenue band</span>
                <br />$1M – $10M annually
              </li>
              <li>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream">Profile</span>
                <br />Operator-led — founder is in the business
              </li>
              <li>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream">Examples</span>
                <br />Training &amp; cohort programs, B2B service agencies, healthcare clinics, education platforms, multi-location service businesses.
              </li>
              <li>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream">Not the ICP</span>
                <br />Solo creators, pre-revenue founders, low-ticket coaches, generic e-commerce, enterprise (&gt;$50M).
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </article>
  );
}
