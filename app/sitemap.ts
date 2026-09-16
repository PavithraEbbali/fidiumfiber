import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/content';
import { LEGAL_DOCS } from '@/lib/legal';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();

  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    ...LEGAL_DOCS.map((doc) => ({
      url: `${base}/${doc.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ];
}
