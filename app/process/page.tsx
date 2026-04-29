import type { Metadata } from 'next';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { PROCESS } from '@/lib/data/process';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Process — How an install runs',
  description:
    'The five steps a Manhaj install runs through. Audit, architect, install, calibrate, operate. Founder-led from start to finish.',
  alternates: { canonical: `${SITE.url}/process` },
  openGraph: {
    title: 'Manhaj — How an install runs',
    description:
      'Audit → architect → install → calibrate → operate. Founder-led from first call to ongoing retainer.',
  },
};

export default function ProcessPage() {
  return (
    <article>
      <header className="border-b border-line pt-32 pb-20 md:pt-40">
        <div className="mx-auto max-w-(--container-wide) px-6 md:px-10">
          <Eyebrow>Install lifecycle</Eyebrow>
          <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.04] text-cream md:text-7xl">
            How a Manhaj install{' '}
            <em className="not-italic text-gold">actually runs.</em>
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-cream-dim">
            Five steps. No PMs. No juniors. No handoffs. You talk to the
            architect — same person, every step.
          </p>
        </div>
      </header>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-(--container-narrow) px-6 md:px-10">
          <ol className="space-y-px overflow-hidden border border-line bg-line">
            {PROCESS.map((step) => (
              <Reveal key={step.num}>
                <li className="flex flex-col gap-6 bg-ink p-9 md:flex-row md:gap-12 md:p-12">
                  <div className="md:w-32">
                    <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
                      STEP {step.num}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-serif text-4xl font-medium text-cream md:text-5xl">
                      {step.title}
                    </h2>
                    <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-cream-dim">
                      {step.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-32">
        <div className="mx-auto max-w-(--container-narrow) px-6 text-center md:px-10">
          <h3 className="font-serif text-4xl text-cream md:text-5xl">
            Step 01 starts with a 45-minute call.
          </h3>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/audit" variant="primary">
              Book the audit
            </ButtonLink>
          </div>
        </div>
      </section>
    </article>
  );
}
