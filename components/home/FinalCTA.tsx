import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';

export default function FinalCTA() {
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-(--container-narrow) px-6 text-center md:px-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
            ◊ Founder-led · Bespoke · Yours alone
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-8 font-serif text-5xl leading-[1.04] text-cream md:text-6xl">
            Most agencies sell automations.<br />
            <em className="not-italic text-gold">
              I architect operating systems.
            </em>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 mx-auto max-w-xl font-sans text-base leading-relaxed text-cream-dim">
            45-minute audit, founder to founder. We map the existing stack, find
            the breaks, and tell you whether AOS-001 fits — or doesn&apos;t.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/audit" variant="primary">
              Book an audit
            </ButtonLink>
            <ButtonLink href="/kiosks/" variant="outline">
              See a live demo first
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
