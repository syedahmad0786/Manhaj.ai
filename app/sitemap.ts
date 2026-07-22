import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${SITE.contentUpdatedAt}T00:00:00.000Z`);
  const routes = [
    { path: '/',              priority: 1.0,  changeFrequency: 'weekly' as const },
    { path: '/foundation',    priority: 0.9,  changeFrequency: 'monthly' as const },
    { path: '/process',       priority: 0.8,  changeFrequency: 'monthly' as const },
    { path: '/pricing',       priority: 0.8,  changeFrequency: 'monthly' as const },
    { path: '/about',         priority: 0.7,  changeFrequency: 'monthly' as const },
    { path: '/audit',         priority: 0.9,  changeFrequency: 'monthly' as const },
    { path: '/kiosks',        priority: 0.9,  changeFrequency: 'monthly' as const },
    { path: '/privacy',       priority: 0.3,  changeFrequency: 'yearly' as const },
    { path: '/terms',         priority: 0.3,  changeFrequency: 'yearly' as const },
    { path: '/cookie-policy', priority: 0.3,  changeFrequency: 'yearly' as const },
    { path: '/security',      priority: 0.6,  changeFrequency: 'monthly' as const },
  ];
  return routes.map((r) => ({
    url: r.path === '/' ? SITE.url : `${SITE.url}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
