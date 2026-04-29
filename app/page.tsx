import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import FoundationSection from '@/components/home/FoundationSection';
import Pillars from '@/components/home/Pillars';
import DemosCallout from '@/components/home/DemosCallout';
import Manifesto from '@/components/home/Manifesto';
import ProcessMini from '@/components/home/ProcessMini';
import FinalCTA from '@/components/home/FinalCTA';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.positioning,
  openGraph: {
    title: `${SITE.name} — ${SITE.motto}`,
    description: SITE.positioning,
    url: SITE.url,
    type: 'website',
  },
  alternates: { canonical: SITE.url },
};

export default function Home() {
  return (
    <>
      <Hero />
      <FoundationSection />
      <Pillars />
      <DemosCallout />
      <Manifesto />
      <ProcessMini />
      <FinalCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE.name,
            url: SITE.url,
            description: SITE.positioning,
            founder: { '@type': 'Person', name: SITE.founder },
            sameAs: [],
          }),
        }}
      />
    </>
  );
}
