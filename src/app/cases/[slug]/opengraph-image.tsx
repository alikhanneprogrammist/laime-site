import { getCase, getCases } from '@/lib/content';
import { OG_SIZE, ogCard } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Кейс L\'aime Agency';

export function generateStaticParams() {
  return getCases().map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = getCase(slug);
  return ogCard({
    label: 'Кейс',
    title: caseStudy?.title ?? 'Кейс',
    accent: caseStudy?.seo.ogMetric,
  });
}
