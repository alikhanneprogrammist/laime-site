import type { ReactNode } from 'react';
import styles from './Section.module.css';

export type SectionBg = 'ink' | 'bone' | 'lime';

interface SectionProps {
  bg: SectionBg;
  id?: string;
  children: ReactNode;
  className?: string;
}

/** Владелец ритма тёмное/светлое: смена фона — единственный разделитель секций (ТЗ §8.1). */
export function Section({ bg, id, children, className }: SectionProps) {
  return (
    <section data-bg={bg} id={id} className={[styles.section, className].filter(Boolean).join(' ')}>
      {children}
    </section>
  );
}
