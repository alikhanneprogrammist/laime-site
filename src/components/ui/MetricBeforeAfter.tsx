import type { Metric } from '@/content/types';
import styles from './MetricBeforeAfter.module.css';

interface MetricBeforeAfterProps {
  metric: Metric;
  /** compact — карточки-превью, large — сетка кейса и блоки результатов. */
  size?: 'compact' | 'large';
}

/** Метрика «было → стало» — ТЗ §8.5. Источник выводится сноской на уровне сетки. */
export function MetricBeforeAfter({ metric, size = 'large' }: MetricBeforeAfterProps) {
  return (
    <div className={[styles.metric, size === 'compact' ? styles.compact : ''].join(' ')}>
      <p className={`mono-label text-muted ${styles.label}`}>{metric.label}</p>
      <p className={styles.row}>
        {metric.before && (
          <>
            <s className={styles.before}>{metric.before}</s>
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </>
        )}
        <span className={size === 'compact' ? styles.afterCompact : `metric ${styles.after}`}>
          {metric.after}
        </span>
        {metric.delta && <span className={styles.delta}>{metric.delta}</span>}
      </p>
    </div>
  );
}
