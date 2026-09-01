import type { CaseStudy, CommonDictionary, HomeDictionary, NicheDictionary } from '@/content/types';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { CaseCard } from '@/components/cards/CaseCard';
import styles from './CasesPreview.module.css';

interface CasesPreviewProps {
  dict: HomeDictionary['cases'];
  common: CommonDictionary;
  niches: NicheDictionary;
  cases: CaseStudy[];
}

export function CasesPreview({ dict, common, niches, cases }: CasesPreviewProps) {
  return (
    <Section bg="bone" id="cases">
      <Container>
        <Reveal>
          <SectionHeading label={dict.heading.label} lines={dict.heading.lines} />
        </Reveal>
        <div className={styles.grid}>
          {cases.slice(0, 3).map((caseStudy, i) => (
            <Reveal key={caseStudy.slug} index={i}>
              <CaseCard caseStudy={caseStudy} niches={niches} />
            </Reveal>
          ))}
        </div>
        <Reveal className={styles.all}>
          <Button variant="secondary" href="/cases">
            {common.cta.allCases} →
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
