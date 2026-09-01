import type { HomeDictionary } from '@/content/types';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import styles from './AdsTimeline.module.css';

/** Блок 06: 4 этапа рекламы + юридически важная плашка о раздельном бюджете. */
export function AdsTimeline({ dict }: { dict: HomeDictionary['ads'] }) {
  return (
    <Section bg="ink">
      <Container>
        <Reveal>
          <SectionHeading label={dict.heading.label} lines={dict.heading.lines} />
        </Reveal>
        <ol className={styles.timeline}>
          {dict.steps.map((step, i) => (
            <Reveal key={step.title} index={i} as="li" className={styles.step}>
              <p className="mono-label text-muted">{String(i + 1).padStart(2, '0')}</p>
              <h3 className={`h3 ${styles.stepTitle}`}>{step.title}</h3>
              <p className={`body text-secondary ${styles.stepText}`}>{step.text}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className={styles.plate}>
          <h3 className="h3">{dict.plate.title}</h3>
          <ul className={styles.platePoints}>
            {dict.plate.points.map((point) => (
              <li key={point} className={`body text-secondary ${styles.platePoint}`}>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
