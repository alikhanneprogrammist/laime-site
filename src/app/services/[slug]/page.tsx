import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/dictionaries';
import { getCase, getService, getServices } from '@/lib/content';
import { buildMetadata, faqJsonLd, serviceJsonLd } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { CaseCard } from '@/components/cards/CaseCard';
import { JsonLd } from '@/components/seo/JsonLd';
import styles from './page.module.css';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const dict = getDictionary();
  const labels = dict.servicesPage.labels;
  const relatedCases = service.relatedCaseSlugs
    .map((caseSlug) => getCase(caseSlug))
    .filter((c) => c !== undefined);

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd data={faqJsonLd(service.faq)} />

      <Section bg="ink" className={styles.hero}>
        <Container>
          <p className={`mono-label text-muted ${styles.heroLabel}`}>{dict.common.nav.services}</p>
          <h1 className={`h1 ${styles.title}`}>{service.h1}</h1>
          <p className={`body-l text-secondary ${styles.intro}`}>{service.intro}</p>
        </Container>
      </Section>

      <Section bg="bone">
        <Container>
          <div className={styles.columns}>
            <Reveal className={styles.column}>
              <p className="mono-label text-muted">{labels.forWho}</p>
              <ul className={styles.points}>
                {service.forWho.map((item) => (
                  <li key={item} className={`body text-secondary ${styles.point}`}>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal index={1} className={styles.column}>
              <p className="mono-label text-muted">{labels.included}</p>
              <ul className={styles.points}>
                {service.included.map((item) => (
                  <li key={item} className={`body text-secondary ${styles.point}`}>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal index={2} className={styles.column}>
              <p className="mono-label text-muted">{labels.howWeMeasure}</p>
              <ul className={styles.points}>
                {service.howWeMeasure.map((item) => (
                  <li key={item} className={`body text-secondary ${styles.point}`}>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section bg="ink">
        <Container>
          <Reveal>
            <p className={`mono-label text-muted ${styles.blockLabel}`}>{labels.relatedCases}</p>
          </Reveal>
          <div className={styles.cases}>
            {relatedCases.map((caseStudy, i) => (
              <Reveal key={caseStudy.slug} index={i}>
                <CaseCard caseStudy={caseStudy} niches={dict.niches} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="bone">
        <Container>
          <Reveal>
            <p className={`mono-label text-muted ${styles.blockLabel}`}>{labels.faq}</p>
          </Reveal>
          <Accordion items={service.faq} />
          <Reveal className={styles.cta}>
            <Button href="/contacts">{labels.ctaTitle}</Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
