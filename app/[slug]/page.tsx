import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LEGAL_DOCS, getLegalDoc, resolveTokens } from '@/lib/legal';
import LegalPage from '@/components/layout/LegalPage';

/**
 * Every compliance route renders through here.
 *
 * The slugs come from LEGAL_DOCS in lib/legal.ts, so adding a document there
 * creates its page, its metadata, its sitemap entry and its footer link with no
 * new route file. `dynamicParams = false` means any other path still 404s.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_DOCS.map((doc) => ({ slug: doc.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const doc = getLegalDoc(params.slug);
  if (!doc) return {};

  return {
    title: doc.navLabel,
    description: resolveTokens(doc.description),
    alternates: { canonical: `/${doc.slug}` },
    robots: { index: true, follow: true },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const doc = getLegalDoc(params.slug);
  if (!doc) notFound();

  return <LegalPage doc={doc} />;
}
