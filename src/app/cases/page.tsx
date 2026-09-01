import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import { getCases } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CasesFilter } from './CasesFilter';
import styles from './page.module.css';

export const metadata: Metadata = buildMetadata({
  title: 'Кейсы с цифрами до/после',
  description:
    'Кейсы L\'aime Agency: задача, действия, метрики до/после и источник данных по каждому проекту.',
  path: '/cases',
});

export default function CasesPage() {
  const dict = getDictionary();
  const cases = getCases();

  return (
    <Section bg="ink" className={styles.page}>
      <Container>
        <SectionHeading as="h1" label={dict.common.nav.cases} lines={dict.casesPage.h1Lines} />
        <p className={`body-l text-secondary ${styles.subtitle}`}>{dict.casesPage.subtitle}</p>
        <CasesFilter cases={cases} niches={dict.niches} filterAll={dict.casesPage.filterAll} />
      </Container>
    </Section>
  );
}
