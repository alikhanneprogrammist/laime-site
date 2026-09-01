import type { HomeBlockHeading } from '@/content/types';
import { Section, type SectionBg } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import styles from './ProcessSteps.module.css';

interface ProcessStepsProps {
  heading: HomeBlockHeading;
  steps: { num: string; title: string; text: string }[];
  bg?: SectionBg;
}

/** Нумерованные строки с крупными цифрами Unbounded, разделённые линиями (ТЗ §6.08). */
export function ProcessSteps({ heading, steps, bg = 'ink' }: ProcessStepsProps) {
  return (
    <Section bg={bg}>
      <Container>
        <Reveal>
          <SectionHeading label={heading.label} lines={heading.lines} />
        </Reveal>
        <ol className={styles.list}>
          {steps.map((step, i) => (
            <Reveal key={step.num} index={i} as="li" className={styles.row}>
              <span className={`metric text-muted ${styles.num}`}>{step.num}</span>
              <div className={styles.body}>
                <h3 className="h3">{step.title}</h3>
                <p className={`body text-secondary ${styles.text}`}>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
