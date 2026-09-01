'use client';

import { useState } from 'react';
import type { CaseStudy, Niche, NicheDictionary } from '@/content/types';
import { Tag } from '@/components/ui/Tag';
import { CaseCard } from '@/components/cards/CaseCard';
import styles from './CasesFilter.module.css';

interface CasesFilterProps {
  cases: CaseStudy[];
  niches: NicheDictionary;
  filterAll: string;
}

/** Все кейсы присутствуют в HTML (SEO); фильтр только скрывает карточки. */
export function CasesFilter({ cases, niches, filterAll }: CasesFilterProps) {
  const [activeNiche, setActiveNiche] = useState<Niche | null>(null);
  const usedNiches = [...new Set(cases.map((c) => c.niche))];

  return (
    <div>
      <div className={styles.filters} role="group" aria-label="Фильтр по нише">
        <Tag interactive isActive={activeNiche === null} onClick={() => setActiveNiche(null)}>
          {filterAll}
        </Tag>
        {usedNiches.map((niche) => (
          <Tag
            key={niche}
            interactive
            isActive={activeNiche === niche}
            onClick={() => setActiveNiche(niche)}
          >
            {niches.labels[niche]}
          </Tag>
        ))}
      </div>
      <div className={styles.grid}>
        {cases.map((caseStudy) => (
          <div
            key={caseStudy.slug}
            className={styles.item}
            hidden={activeNiche !== null && caseStudy.niche !== activeNiche}
          >
            <CaseCard caseStudy={caseStudy} niches={niches} />
          </div>
        ))}
      </div>
    </div>
  );
}
