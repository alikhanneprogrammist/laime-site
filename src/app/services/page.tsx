import type { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import { getServices } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import styles from './page.module.css';

export const metadata: Metadata = buildMetadata({
  title: 'Услуги — маркетинг, разработка, CRM',
  description:
    'Бренд и стратегия, SMM и контент, таргет Meta и TikTok, разработка сайтов и ботов, внедрение CRM. Один контур от бренда до продаж.',
  path: '/services',
});

export default function ServicesPage() {
  const dict = getDictionary();
  const services = getServices();

  return (
    <Section bg="ink" className={styles.page}>
      <Container>
        <SectionHeading
          as="h1"
          label={dict.common.nav.services}
          lines={dict.servicesPage.h1Lines}
        />
        <p className={`body-l text-secondary ${styles.subtitle}`}>{dict.servicesPage.subtitle}</p>
        <div className={styles.list}>
          {services.map((service, i) => (
            <Reveal key={service.slug} index={i} as="div">
              <Link href={`/services/${service.slug}`} className={styles.row}>
                <span className="mono-label text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.rowBody}>
                  <span className={`h3 ${styles.rowTitle}`}>{service.navLabel}</span>
                  <span className={`body text-secondary ${styles.rowIntro}`}>{service.intro}</span>
                </span>
                <span className={styles.rowArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
