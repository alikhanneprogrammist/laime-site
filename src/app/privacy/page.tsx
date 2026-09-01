import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import styles from './page.module.css';

export const metadata: Metadata = buildMetadata({
  title: 'Политика обработки персональных данных',
  description:
    'Политика обработки персональных данных L\'aime Agency в соответствии с Законом РК №94-V.',
  path: '/privacy',
});

export default function PrivacyPage() {
  const dict = getDictionary();
  const d = dict.privacy;

  return (
    <Section bg="ink" className={styles.page}>
      <Container>
        <div className={styles.content}>
          <h1 className="h2">{d.h1}</h1>
          <p className={`caption text-muted ${styles.updated}`}>{d.updated}</p>
          {d.sections.map((section) => (
            <section key={section.title} className={styles.section}>
              <h2 className="h3">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="body text-secondary">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
