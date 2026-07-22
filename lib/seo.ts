import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | '/';
  index?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: PageMetadataInput): Metadata {
  const url = path === '/' ? SITE.url : `${SITE.url}${path}`;
  const socialImage = `${SITE.url}${SITE.socialImage}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `${SITE.name} — ${SITE.motto}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage],
    },
  };
}
