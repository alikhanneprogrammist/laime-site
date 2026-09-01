import type { FaqItem } from '@/content/types';
import styles from './Accordion.module.css';

/** FAQ на нативных details/summary — доступно с клавиатуры без JS. */
export function Accordion({ items }: { items: FaqItem[] }) {
  return (
    <div className={styles.accordion}>
      {items.map((item) => (
        <details key={item.question} className={styles.item}>
          <summary className={styles.summary}>
            <span className="h3">{item.question}</span>
            <span className={styles.marker} aria-hidden="true" />
          </summary>
          <p className={`body-l text-secondary ${styles.answer}`}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
