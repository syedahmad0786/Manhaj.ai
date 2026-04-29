// Shared visual frame for the three legal pages — small wrapper so each route's
// page.tsx stays focused on copy.
import type { ReactNode } from 'react';
import Eyebrow from '@/components/ui/Eyebrow';

export default function LegalShell({
  eyebrow,
  title,
  updatedAt,
  children,
}: {
  eyebrow: string;
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <article>
      <header className="border-b border-line pt-32 pb-20 md:pt-40">
        <div className="mx-auto max-w-(--container-narrow) px-6 md:px-10">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-8 font-serif text-5xl leading-[1.04] text-cream md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.32em] text-mute">
            ◊ Last updated {updatedAt}
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-(--container-narrow) px-6 font-sans text-base leading-relaxed text-cream-dim md:px-10 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-cream [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-serif [&_h3]:text-2xl [&_h3]:text-cream [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:my-4 [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-2">
          {children}
        </div>
      </section>
    </article>
  );
}
