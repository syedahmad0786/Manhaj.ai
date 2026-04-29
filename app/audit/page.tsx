import type { Metadata } from 'next';
import Eyebrow from '@/components/ui/Eyebrow';
import AuditForm from '@/components/audit/AuditForm';
import CalEmbed from '@/components/audit/CalEmbed';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Book an audit',
  description:
    "45-minute audit, founder to founder. We map the existing stack, find the breaks, and tell you whether AOS-001 fits — or doesn't.",
  alternates: { canonical: `${SITE.url}/audit` },
  openGraph: {
    title: 'Manhaj — Book a 45-minute audit',
    description:
      'Founder-led audit. Map the stack, find the breaks, see whether the AOS-001 install fits.',
  },
};

export default function AuditPage() {
  return (
    <article>
      <header className="border-b border-line pt-32 pb-20 md:pt-40">
        <div className="mx-auto max-w-(--container-wide) px-6 md:px-10">
          <Eyebrow>Step 01 · Audit</Eyebrow>
          <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.04] text-cream md:text-7xl">
            45 minutes.{' '}
            <em className="not-italic text-gold">Founder to founder.</em>
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-cream-dim">
            Send the brief below, or pick a slot directly. Either gets you on a
            call with Ahmad — same person who&apos;d build the install.
          </p>
        </div>
      </header>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-(--container-wide) gap-12 px-6 md:grid-cols-[1fr_1fr] md:gap-16 md:px-10">
          <div>
            <Eyebrow>Brief</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-cream md:text-4xl">
              Tell us where you&apos;re running.
            </h2>
            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-cream-dim">
              All optional except name &amp; email. The more context you share,
              the more useful the call.
            </p>
            <div className="mt-8">
              <AuditForm />
            </div>
          </div>

          <div>
            <Eyebrow>Calendar</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-cream md:text-4xl">
              Or pick a slot.
            </h2>
            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-cream-dim">
              Live availability via Cal.com. The form above is for context — if
              you book here you&apos;ll get a follow-up brief.
            </p>
            <div className="mt-8">
              <CalEmbed />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
