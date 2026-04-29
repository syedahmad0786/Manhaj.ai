import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';

const DEMOS = [
  {
    label: 'Kiosk 01',
    title: 'Command Center',
    layer: 'Layer 06 · Intelligence',
    href: '/kiosks/command-center/',
  },
  {
    label: 'Kiosk 02',
    title: 'ErrorLens · Observability',
    layer: 'Layer 06 · Intelligence (Alerts)',
    href: '/kiosks/errorlens/',
  },
  {
    label: 'Kiosk 03',
    title: 'Operator Onboarding',
    layer: 'Layer 04 · Convert',
    href: '/kiosks/onboarding/',
  },
] as const;

export default function DemosCallout() {
  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="mx-auto max-w-(--container-wide) px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <div>
            <Reveal>
              <Eyebrow>Live Kiosks · Anonymized</Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-6 font-serif text-4xl leading-[1.04] text-cream md:text-5xl">
                No slides.<br />No logos.<br />
                <em className="not-italic text-gold">Just running systems.</em>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-md font-sans text-base leading-relaxed text-cream-dim">
                Two operator-led businesses are running on Manhaj-style
                architecture today. Click through anonymized, dummy-data
                versions — every click is real. The shape of the system is
                what you&apos;ll get.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-10">
                <ButtonLink href="/kiosks/" variant="primary">
                  Open the kiosk hub
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <ul className="grid gap-4">
            {DEMOS.map((demo, i) => (
              <Reveal key={demo.href} delay={140 + i * 100}>
                <li>
                  <a
                    href={demo.href}
                    className="group flex items-center justify-between gap-6 border border-line bg-ink-2/30 px-7 py-6 transition-colors hover:border-gold"
                  >
                    <span className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold">
                        ◊ {demo.label}
                      </span>
                      <span className="font-serif text-2xl text-cream md:text-3xl">
                        {demo.title}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-mute">
                        {demo.layer}
                      </span>
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold transition-transform group-hover:translate-x-1">
                      Enter →
                    </span>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
