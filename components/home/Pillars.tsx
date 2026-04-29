import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import { PILLARS } from '@/lib/data/pillars';

export default function Pillars() {
  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="mx-auto max-w-(--container-wide) px-6 md:px-10">
        <Reveal>
          <Eyebrow>03 · Why Manhaj</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.04] text-cream md:text-5xl">
            Three things make Manhaj different.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-10">
          {PILLARS.map((p, i) => (
            <Reveal key={p.num} delay={120 + i * 100}>
              <article className="border border-line bg-ink-2/30 p-8 transition-colors hover:border-gold">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold">
                  ◊ {p.num}
                </p>
                <h3 className="mt-5 font-serif text-3xl text-cream">
                  {p.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-cream-dim">
                  {p.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
