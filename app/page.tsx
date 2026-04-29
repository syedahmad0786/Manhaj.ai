import Hero from '@/components/home/Hero';
import Manifesto from '@/components/home/Manifesto';
import Pillars from '@/components/home/Pillars';
import LayerDiagram from '@/components/home/LayerDiagram';
import DemosCallout from '@/components/home/DemosCallout';
import ProcessMini from '@/components/home/ProcessMini';
import FinalCTA from '@/components/home/FinalCTA';
import { SITE } from '@/lib/site';
import type { Metadata } from 'next';

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
      <LayerDiagram />
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
