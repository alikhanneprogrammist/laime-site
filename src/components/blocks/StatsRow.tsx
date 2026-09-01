import type { HomeDictionary } from '@/content/types';
import { Container } from '@/components/ui/Container';
import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';
import styles from './StatsRow.module.css';

/** Блок 02: только типографика и разделительные линии, без карточек. */
export function StatsRow({ dict }: { dict: HomeDictionary['stats'] }) {
  return (
    <section data-bg="ink" className={styles.section}>
      <Container>
        <div className={styles.row}>
          {dict.items.map((item, i) => (
            <Reveal key={item.label} index={i} className={styles.item}>
              <Counter value={item.value} className={`metric ${styles.value}`} />
              <p className={`caption text-secondary ${styles.label}`}>{item.label}</p>
            </Reveal>
          ))}
        </div>
        <p className={`caption text-muted ${styles.source}`}>{dict.source}</p>
      </Container>
    </section>
  );
}
