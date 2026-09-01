import { getDictionary } from '@/lib/dictionaries';
import { getCases } from '@/lib/content';
import { Hero } from '@/components/blocks/Hero';
import { StatsRow } from '@/components/blocks/StatsRow';
import { DirectionsGrid } from '@/components/blocks/DirectionsGrid';
import { ProductTeaser } from '@/components/blocks/ProductTeaser';
import { CasesPreview } from '@/components/blocks/CasesPreview';
import { AdsTimeline } from '@/components/blocks/AdsTimeline';
import { NichesRow } from '@/components/blocks/NichesRow';
import { ProcessSteps } from '@/components/blocks/ProcessSteps';
import { FormatsColumns } from '@/components/blocks/FormatsColumns';
import { StackRow } from '@/components/blocks/StackRow';
import { FinalCta } from '@/components/blocks/FinalCta';

export default function HomePage() {
  const dict = getDictionary();
  const cases = getCases();

  return (
    <>
      <Hero dict={dict.home.hero} common={dict.common} />
      <StatsRow dict={dict.home.stats} />
      <DirectionsGrid dict={dict.home.directions} />
      <ProductTeaser dict={dict.home.product} />
      <CasesPreview
        dict={dict.home.cases}
        common={dict.common}
        niches={dict.niches}
        cases={cases}
      />
      <AdsTimeline dict={dict.home.ads} />
      <NichesRow dict={dict.home.niches} />
      <ProcessSteps heading={dict.home.process.heading} steps={dict.home.process.steps} bg="ink" />
      <FormatsColumns dict={dict.home.formats} common={dict.common} />
      <StackRow dict={dict.home.stack} />
      <FinalCta dict={dict.home.finalCta} common={dict.common} />
    </>
  );
}
