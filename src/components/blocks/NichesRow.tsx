import type { HomeDictionary } from '@/content/types';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import styles from './NichesRow.module.css';

/** Блок 07: строки-теги ниш; логотипы клиентов — только после письменного согласия. */
export function NichesRow({ dict }: { dict: HomeDictionary['niches'] }) {
  return (
    <Section bg="bone">
      <Container>
        <Reveal>
          <SectionHeading label={dict.heading.label} lines={dict.heading.lines} />
        </Reveal>
        <ul className={styles.list}>
          {dict.items.map((niche, i) => (
            <Reveal key={niche} index={i} as="li" className={styles.item}>
              <span className={styles.tag}>{niche}</span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
