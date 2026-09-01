import type { HomeDictionary } from '@/content/types';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import styles from './StackRow.module.css';

/** Блок 10: монохромная строка инструментов на 40% непрозрачности (ТЗ §6.10). */
export function StackRow({ dict }: { dict: HomeDictionary['stack'] }) {
  return (
    <section data-bg="ink" className={styles.section}>
      <Container>
        <Reveal>
          <p className={`mono-label text-muted ${styles.label}`}>{dict.label}</p>
          <ul className={styles.list}>
            {dict.tools.map((tool) => (
              <li key={tool} className={`mono-label ${styles.tool}`}>
                {tool}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
