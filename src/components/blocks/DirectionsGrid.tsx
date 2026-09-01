import Link from 'next/link';
import type { HomeDictionary } from '@/content/types';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import styles from './DirectionsGrid.module.css';

export function DirectionsGrid({ dict }: { dict: HomeDictionary['directions'] }) {
  return (
    <Section bg="bone">
      <Container>
        <Reveal>
          <SectionHeading label={dict.heading.label} lines={dict.heading.lines} />
        </Reveal>
        <div className={styles.grid}>
          {dict.cards.map((card, i) => (
            <Reveal key={card.num} index={i} className={styles.card}>
              <p className="mono-label text-muted">{card.num}</p>
              <h3 className={`h3 ${styles.cardTitle}`}>{card.title}</h3>
              <p className={`body text-secondary ${styles.cardSubtitle}`}>{card.subtitle}</p>
              <ul className={styles.points}>
                {card.points.map((point) => (
                  <li key={point} className={`body text-secondary ${styles.point}`}>
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={card.href} className={styles.link}>
                Подробнее →
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
