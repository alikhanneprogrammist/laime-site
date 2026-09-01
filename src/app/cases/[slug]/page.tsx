import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/dictionaries';
import { getCase, getCases } from '@/lib/content';
import { articleJsonLd, buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { MetricBeforeAfter } from '@/components/ui/MetricBeforeAfter';
import { MockScreenshot } from '@/components/ui/MockScreenshot';
import { CaseCard } from '@/components/cards/CaseCard';
import { JsonLd } from '@/components/seo/JsonLd';
import styles from './page.module.css';

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCase(slug);
  if (!caseStudy) return {};
  return buildMetadata({
    title: caseStudy.seo.title,
    description: caseStudy.seo.description,
    path: `/cases/${caseStudy.slug}`,
  });
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const caseStudy = getCase(slug);
  if (!caseStudy) notFound();

  const dict = getDictionary();
  const labels = dict.casesPage.caseLabels;
  const related = getCase(caseStudy.relatedSlug);

  return (
    <>
      <JsonLd data={articleJsonLd(caseStudy)} />

      {/* Шапка: ниша, клиент, период, теги */}
      <Section bg="ink" className={styles.header}>
        <Container>
          <p className={`mono-label text-muted ${styles.niche}`}>
            {dict.niches.labels[caseStudy.niche]}
          </p>
          <h1 className={`h1 ${styles.title}`}>{caseStudy.title}</h1>
          <div className={styles.meta}>
            <div>
              <p className="mono-label text-muted">{labels.client}</p>
              <p className="body">{caseStudy.client}</p>
            </div>
            <div>
              <p className="mono-label text-muted">{labels.period}</p>
              <p className="body">{caseStudy.period}</p>
            </div>
            <div className={styles.tags}>
              {caseStudy.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Задача и действия */}
      <Section bg="bone">
        <Container>
          <div className={styles.split}>
            <Reveal>
              <p className="mono-label text-muted">{labels.task}</p>
              <p className={`body-l ${styles.task}`}>{caseStudy.task}</p>
            </Reveal>
            <Reveal index={1}>
              <p className="mono-label text-muted">{labels.actions}</p>
              <ol className={styles.actions}>
                {caseStudy.actions.map((action, i) => (
                  <li key={action} className={styles.action}>
                    <span className={`mono-label text-muted ${styles.actionNum}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="body">{action}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Цифры до/после + источник */}
      <Section bg="ink">
        <Container>
          <Reveal>
            <p className={`mono-label text-muted ${styles.blockLabel}`}>{labels.metrics}</p>
          </Reveal>
          <div className={styles.metricsGrid}>
            {caseStudy.metrics.map((metric, i) => (
              <Reveal key={metric.label} index={i}>
                <MetricBeforeAfter metric={metric} />
              </Reveal>
            ))}
          </div>
          <p className={`caption text-muted ${styles.source}`}>{caseStudy.sourceNote}</p>
        </Container>
      </Section>

      {/* Визуалы */}
      <Section bg="bone">
        <Container>
          <Reveal>
            <p className={`mono-label text-muted ${styles.blockLabel}`}>{labels.visuals}</p>
          </Reveal>
          <div className={styles.visuals}>
            {caseStudy.visuals.map((visual, i) => (
              <Reveal key={visual.caption} index={i} className={styles.visual}>
                <MockScreenshot kind={visual.kind} alt={visual.caption} />
                <p className="caption text-muted">{visual.caption}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Похожий кейс + CTA */}
      <Section bg="ink">
        <Container>
          <div className={styles.bottomSplit}>
            {related && (
              <Reveal>
                <p className={`mono-label text-muted ${styles.blockLabel}`}>{labels.related}</p>
                <CaseCard caseStudy={related} niches={dict.niches} />
              </Reveal>
            )}
            <Reveal index={1}>
              <SectionHeading label={labels.ctaTitle} lines={[labels.ctaText]} layout="stack" />
              <div className={styles.cta}>
                <Button href="/contacts">{dict.common.cta.lead}</Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
