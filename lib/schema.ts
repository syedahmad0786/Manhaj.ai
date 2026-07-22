import { SITE } from '@/lib/site';

export const SCHEMA_IDS = {
  organization: `${SITE.companyUrl}/#organization`,
  person: 'https://ahmadbukhari.com/#person',
  offering: `${SITE.url}/#service`,
  website: `${SITE.url}/#website`,
} as const;

export function globalSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': SCHEMA_IDS.organization,
        name: SITE.companyName,
        url: SITE.companyUrl,
        founder: { '@id': SCHEMA_IDS.person },
        sameAs: [SITE.companyUrl],
      },
      {
        '@type': 'Person',
        '@id': SCHEMA_IDS.person,
        name: SITE.founder,
        url: SITE.founderUrl,
        email: `mailto:${SITE.email}`,
        worksFor: { '@id': SCHEMA_IDS.organization },
        sameAs: [SITE.founderUrl, SITE.githubUrl, SITE.linkedinUrl],
      },
      {
        '@type': 'Service',
        '@id': SCHEMA_IDS.offering,
        name: SITE.name,
        alternateName: ['Manhaj', 'منهج'],
        url: SITE.url,
        description: SITE.positioning,
        serviceType: 'Private AI operating system architecture and implementation',
        provider: { '@id': SCHEMA_IDS.organization },
        creator: { '@id': SCHEMA_IDS.person },
        areaServed: 'Worldwide',
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'Operator-led B2B service and education companies',
        },
      },
      {
        '@type': 'WebSite',
        '@id': SCHEMA_IDS.website,
        name: SITE.name,
        url: SITE.url,
        description: SITE.positioning,
        inLanguage: 'en',
        about: { '@id': SCHEMA_IDS.offering },
        publisher: { '@id': SCHEMA_IDS.organization },
        creator: { '@id': SCHEMA_IDS.person },
      },
    ],
  };
}

type Breadcrumb = { name: string; path: `/${string}` | '/' };

export function pageSchema({
  name,
  description,
  path,
  breadcrumbs,
}: {
  name: string;
  description: string;
  path: `/${string}` | '/';
  breadcrumbs?: readonly Breadcrumb[];
}) {
  const url = path === '/' ? SITE.url : `${SITE.url}${path}`;
  const trail = breadcrumbs ?? [
    { name: 'Home', path: '/' as const },
    ...(path === '/' ? [] : [{ name, path }]),
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: 'en',
        isPartOf: { '@id': SCHEMA_IDS.website },
        about: { '@id': SCHEMA_IDS.offering },
        author: { '@id': SCHEMA_IDS.person },
        publisher: { '@id': SCHEMA_IDS.organization },
        dateModified: SITE.contentUpdatedAt,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: trail.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.path === '/' ? SITE.url : `${SITE.url}${item.path}`,
        })),
      },
    ],
  };
}
