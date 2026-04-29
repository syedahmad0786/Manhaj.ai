import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';

export default function Manifesto() {
  return (
    <section className="border-b border-line py-28 md:py-36">
      <div className="mx-auto max-w-(--container-narrow) px-6 md:px-10">
        <Reveal>
          <Eyebrow>05 · Manifesto</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-10 font-serif text-3xl leading-[1.18] text-cream md:text-4xl md:leading-[1.16]">
            <span className="block">No two businesses run the same.</span>
            <span className="block">Templates fail because of it.</span>
            <span className="mt-6 block text-gold">
              Manhaj architects the AI operating system your business actually
              needs —
            </span>
            <span className="block">yours alone, configured to how you run.</span>
          </p>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.32em] text-mute">
            ◊ Manhaj (منهج) · Arabic for system / methodology — used in
            classical scholarship for the systematic methodology of inquiry.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
