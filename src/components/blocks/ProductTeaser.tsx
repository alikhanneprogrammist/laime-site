import type { HomeDictionary } from '@/content/types';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Screenshot } from '@/components/ui/Screenshot';
import { SHOTS } from '@/content/ru/booking-os';
import { MetricBeforeAfter } from '@/components/ui/MetricBeforeAfter';
import styles from './ProductTeaser.module.css';

/** Блок 04 — самый крупный блок главной: собственный продукт (ТЗ §6.04). */
export function ProductTeaser({ dict }: { dict: HomeDictionary['product'] }) {
  return (
    <Section bg="ink">
      <Container>
        <Reveal>
          <SectionHeading label={dict.heading.label} lines={dict.heading.lines} />
        </Reveal>
        <div className={styles.split}>
          <Reveal className={styles.text}>
            <p className={`body-l ${styles.problemsTitle}`}>{dict.problemsTitle}</p>
            <ul className={styles.problems}>
              {dict.problems.map((problem) => (
                <li key={problem} className={`body text-secondary ${styles.problem}`}>
                  {problem}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal index={1}>
            <Screenshot shot={SHOTS.calendarDay} sizes="(max-width: 900px) 100vw, 55vw" />
          </Reveal>
        </div>
        <div className={styles.results}>
          {dict.results.map((metric, i) => (
            <Reveal key={metric.label} index={i} className={styles.result}>
              <MetricBeforeAfter metric={metric} size="compact" />
            </Reveal>
          ))}
        </div>
        <p className={`caption text-muted ${styles.source}`}>{dict.resultsSource}</p>
        <Reveal className={styles.bottom}>
          <p className={`mono-label ${styles.industries}`}>{dict.industriesNote}</p>
          <Button variant="secondary" href="/booking-os">
            {dict.cta}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
