import type { CommonDictionary, HomeDictionary } from '@/content/types';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { LeadForm } from '@/components/form/LeadForm';
import styles from './FinalCta.module.css';

/** Блок 11: единственный экран с лаймовым фоном на странице (ТЗ §8.1, правило 3). */
export function FinalCta({
  dict,
  common,
}: {
  dict: HomeDictionary['finalCta'];
  common: CommonDictionary;
}) {
  return (
    <Section bg="lime" id="lead">
      <Container>
        <div className={styles.split}>
          <Reveal>
            <SectionHeading label={dict.heading.label} lines={dict.heading.lines} layout="stack" />
            <p className={`body-l ${styles.subtitle}`}>{dict.subtitle}</p>
          </Reveal>
          <Reveal index={1}>
            <LeadForm dict={common} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
