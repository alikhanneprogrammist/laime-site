import type { CommonDictionary, HomeDictionary } from '@/content/types';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import styles from './FormatsColumns.module.css';

/** Блок 09: три формата сотрудничества, цены не публикуются (ТЗ §6.09). */
export function FormatsColumns({
  dict,
  common,
}: {
  dict: HomeDictionary['formats'];
  common: CommonDictionary;
}) {
  return (
    <Section bg="bone">
      <Container>
        <Reveal>
          <SectionHeading label={dict.heading.label} lines={dict.heading.lines} />
        </Reveal>
        <div className={styles.grid}>
          {dict.columns.map((column, i) => (
            <Reveal key={column.title} index={i} className={styles.column}>
              <h3 className="h3">{column.title}</h3>
              <p className={`body text-secondary ${styles.subtitle}`}>{column.subtitle}</p>
              <ul className={styles.points}>
                {column.points.map((point) => (
                  <li key={point} className={`body text-secondary ${styles.point}`}>
                    {point}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" href="/contacts" className={styles.button}>
                {common.cta.discuss}
              </Button>
            </Reveal>
          ))}
        </div>
        <p className={`caption text-muted ${styles.priceNote}`}>{dict.priceNote}</p>
      </Container>
    </Section>
  );
}
