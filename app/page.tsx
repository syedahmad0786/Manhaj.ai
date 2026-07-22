import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import FoundationSection from '@/components/home/FoundationSection';
import Pillars from '@/components/home/Pillars';
import DemosCallout from '@/components/home/DemosCallout';
import Manifesto from '@/components/home/Manifesto';
import ProcessMini from '@/components/home/ProcessMini';
import FinalCTA from '@/components/home/FinalCTA';
import JsonLd from '@/components/shared/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { pageSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';

const title = `${SITE.name} — AI Operating Systems for Operator-Led Businesses`;
const description =
  'MANHAJ is a founder-led AI operating system for B2B service and education businesses: a six-layer revenue foundation, configured to your workflows and owned by you.';

export const metadata: Metadata = pageMetadata({ title, description, path: '/' });

export default function Home() {
  return (
    <>
      <JsonLd data={pageSchema({ name: title, description, path: '/' })} />
      <Hero />
      <FoundationSection />
      <Pillars />
      <DemosCallout />
      <Manifesto />
      <ProcessMini />
      <FinalCTA />
    </>
  );
}
