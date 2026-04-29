import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { PROCESS } from '@/lib/data/process';

export default function ProcessMini() {
  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="mx-auto max-w-(--container-wide) px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow>How an install runs</Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.04] text-cream md:text-5xl">
                Five steps. Founder-led from audit to operate.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={180}>
            <ButtonLink href="/process" variant="ghost">
              Full process
            </ButtonLink>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-5">
          {PROCESS.map((step, i) => (
            <Reveal key={step.num} delay={140 + i * 80}>
              <li className="flex h-full flex-col bg-ink p-7 md:p-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold">
                  ◊ {step.num}
                </span>
                <h3 className="mt-5 font-serif text-2xl text-cream">
                  {step.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-cream-dim">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
