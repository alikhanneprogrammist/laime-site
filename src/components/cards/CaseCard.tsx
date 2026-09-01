import Link from 'next/link';
import type { CaseStudy, NicheDictionary } from '@/content/types';
import { MetricBeforeAfter } from '@/components/ui/MetricBeforeAfter';
import styles from './CaseCard.module.css';

interface CaseCardProps {
  caseStudy: CaseStudy;
  niches: NicheDictionary;
}

export function CaseCard({ caseStudy, niches }: CaseCardProps) {
  return (
    <Link href={`/cases/${caseStudy.slug}`} className={styles.card}>
      <p className="mono-label text-muted">{niches.labels[caseStudy.niche]}</p>
      {/* p, а не h3: карточка-ссылка не участвует в иерархии заголовков страницы */}
      <p className={`h3 ${styles.title}`}>{caseStudy.title}</p>
      <div className={styles.metrics}>
        {caseStudy.previewMetrics.map((metric) => (
          <MetricBeforeAfter key={metric.label} metric={metric} size="compact" />
        ))}
      </div>
      <span className={styles.link}>Смотреть кейс →</span>
    </Link>
  );
}
