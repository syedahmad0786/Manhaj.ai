import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';

export const metadata = {
  title: 'Not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <div className="mx-auto max-w-(--container-narrow) px-6 py-32 text-center md:px-10">
        <Eyebrow>Error · 404</Eyebrow>
        <h1 className="mt-8 font-serif text-6xl leading-[1.04] text-cream md:text-7xl">
          That route isn&apos;t in the foundation.
        </h1>
        <p className="mt-6 mx-auto max-w-md font-sans text-base leading-relaxed text-cream-dim">
          Either it moved or it never shipped. The home page is the safest
          place to start over.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" variant="primary">
            Back to home
          </ButtonLink>
          <Link
            href="/kiosks/"
            className="inline-flex items-center gap-2 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cream-dim hover:text-gold"
          >
            Or open a kiosk →
          </Link>
        </div>
      </div>
    </section>
  );
}
