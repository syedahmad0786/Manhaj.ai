// Lifted from Manhaj-Brand-Positioning-One-Pager.md §06.
// Tagged DRAFT — pricing is locked in the next session per the brand doc.
export type Tier = {
  name: string;
  setup: string;
  retainer: string;
  scope: string;
  highlights: string[];
  featured?: boolean;
};

export const TIERS: readonly Tier[] = [
  {
    name: 'Foundation',
    setup: '$5,000',
    retainer: '$2,000/mo',
    scope: '6-layer base + 1 vertical module',
    highlights: [
      'Full AOS-001 6-layer install',
      'One bespoke vertical module',
      'Standard reporting',
      'Founder-led delivery',
    ],
  },
  {
    name: 'Operator',
    setup: '$10,000',
    retainer: '$3,500/mo',
    scope: '6-layer base + 3 modules + custom dashboards',
    featured: true,
    highlights: [
      'Full AOS-001 6-layer install',
      'Three bespoke modules',
      'Custom command-center dashboards',
      'Quarterly architecture review',
    ],
  },
  {
    name: 'Architect',
    setup: '$15,000',
    retainer: '$5,000/mo',
    scope: 'Full bespoke build + intelligence layer + ongoing optimization',
    highlights: [
      'Full bespoke architecture',
      'Intelligence layer with attribution',
      'Ongoing optimization retainer',
      'Direct line to the architect',
    ],
  },
] as const;
