import { Fragment } from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  label?: string;
  /** Строки заголовка — переносы задаются контентом, не браузером (ТЗ §8.3). */
  lines: string[];
  as?: 'h1' | 'h2';
  /**
   * split — швейцарская редакционная сетка: лейбл в левой колонке,
   * заголовок со смещением. stack — для узких колонок (формы, split-блоки).
   */
  layout?: 'split' | 'stack';
}

export function HeadingLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}

export function SectionHeading({ label, lines, as: Tag = 'h2', layout = 'split' }: SectionHeadingProps) {
  return (
    <div className={[styles.wrap, layout === 'split' ? styles.split : ''].filter(Boolean).join(' ')}>
      {label && <p className={`mono-label text-muted ${styles.label}`}>{label}</p>}
      <Tag className={`${Tag === 'h1' ? 'h1' : 'h2'} ${styles.heading}`}>
        <HeadingLines lines={lines} />
      </Tag>
    </div>
  );
}
