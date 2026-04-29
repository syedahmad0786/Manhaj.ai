export const PRIMARY_NAV = [
  { href: '/foundation', label: 'Foundation' },
  { href: '/process',    label: 'Process' },
  { href: '/pricing',    label: 'Pricing' },
  { href: '/about',      label: 'About' },
  { href: '/kiosks/',    label: 'Live demos', external: true },
] as const;

export const FOOTER_NAV = [
  {
    heading: 'Product',
    items: [
      { href: '/foundation', label: 'AOS-001 foundation' },
      { href: '/process',    label: 'Install process' },
      { href: '/kiosks/',    label: 'Live demos', external: true },
    ],
  },
  {
    heading: 'Company',
    items: [
      { href: '/about',   label: 'About Ahmad' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/audit',   label: 'Book an audit' },
    ],
  },
  {
    heading: 'Legal',
    items: [
      { href: '/privacy',        label: 'Privacy' },
      { href: '/terms',          label: 'Terms' },
      { href: '/cookie-policy',  label: 'Cookie policy' },
    ],
  },
] as const;
