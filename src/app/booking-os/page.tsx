import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import { buildMetadata, faqJsonLd } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading, HeadingLines } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { MetricBeforeAfter } from '@/components/ui/MetricBeforeAfter';
import { Screenshot } from '@/components/ui/Screenshot';
import { LeadForm } from '@/components/form/LeadForm';
import { ProcessSteps } from '@/components/blocks/ProcessSteps';
import { JsonLd } from '@/components/seo/JsonLd';
import styles from './page.module.css';

export const metadata: Metadata = buildMetadata({
  title: 'Booking OS — система бронирований для объектов с посадкой по времени',
  description:
    'Единый календарь броней, предоплаты, источник каждого гостя и панель выручки. Данные на вашем сервере, 19 отраслей в конфигураторе.',
  path: '/booking-os',
});

export default function BookingOsPage() {
  const dict = getDictionary();
  const d = dict.bookingOs;

  return (
    <>
      <JsonLd data={faqJsonLd(d.faq)} />

      {/* Hero продукта */}
      <Section bg="ink" className={styles.hero}>
        <Container>
          <p className={`mono-label text-muted ${styles.heroLabel}`}>{d.hero.label}</p>
          <h1 className="h1">
            <HeadingLines lines={d.hero.h1Lines} />
          </h1>
          <p className={`body-l text-secondary ${styles.heroSubtitle}`}>{d.hero.subtitle}</p>
        </Container>
      </Section>

      {/* Проблема */}
      <Section bg="bone">
        <Container>
          <Reveal>
            <SectionHeading label={d.problems.heading.label} lines={d.problems.heading.lines} />
          </Reveal>
          <div className={styles.problems}>
            {d.problems.items.map((item, i) => (
              <Reveal key={item.title} index={i} className={styles.problem}>
                <h3 className="h3">{item.title}</h3>
                <p className={`body text-secondary ${styles.problemText}`}>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8 функций */}
      <Section bg="ink">
        <Container>
          <Reveal>
            <SectionHeading label={d.features.heading.label} lines={d.features.heading.lines} />
          </Reveal>
          {/* Zig-zag: чередование текст/скриншот вместо однородной сетки */}
          <div className={styles.features}>
            {d.features.items.map((feature, i) => (
              <Reveal key={feature.title} className={styles.feature}>
                <div className={styles.featureMock}>
                  <Screenshot shot={feature.shot} priority={i === 0} />
                </div>
                <div className={styles.featureBody}>
                  <p className="mono-label text-muted">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="h3">{feature.title}</h3>
                  <p className={`body text-secondary ${styles.featureText}`}>{feature.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Интерфейс — крупные кадры */}
      <Section bg="bone">
        <Container>
          <Reveal>
            <SectionHeading label={d.screens.heading.label} lines={d.screens.heading.lines} />
          </Reveal>
          <p className={`caption text-muted ${styles.screensNote}`}>{d.screens.note}</p>
          <div className={styles.screens}>
            {d.screens.items.map((item, i) => (
              <Reveal key={item.shot.src} index={i} className={i === 0 ? styles.screenWide : undefined}>
                <Screenshot shot={item.shot} caption={item.caption} sizes="(max-width: 900px) 100vw, 50vw" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Результаты внедрения */}
      <Section bg="bone">
        <Container>
          <Reveal>
            <SectionHeading label={d.results.heading.label} lines={d.results.heading.lines} />
          </Reveal>
          <div className={styles.results}>
            {d.results.metrics.map((metric, i) => (
              <Reveal key={metric.label} index={i}>
                <MetricBeforeAfter metric={metric} size="compact" />
              </Reveal>
            ))}
          </div>
          <p className={`caption text-muted ${styles.source}`}>{d.results.source}</p>
        </Container>
      </Section>

      {/* 19 отраслей */}
      <Section bg="ink">
        <Container>
          <Reveal>
            <SectionHeading label={d.industries.heading.label} lines={d.industries.heading.lines} />
          </Reveal>
          <p className={`body text-secondary ${styles.industriesNote}`}>{d.industries.note}</p>
          <div className={styles.industries}>
            {d.industries.items.map((industry) => (
              <Tag key={industry}>{industry}</Tag>
            ))}
          </div>
        </Container>
      </Section>

      {/* Внедрение */}
      <ProcessSteps heading={d.rollout.heading} steps={d.rollout.steps} bg="bone" />

      {/* Безопасность данных */}
      <Section bg="ink">
        <Container>
          <Reveal className={styles.security}>
            <h2 className="h2">{d.security.title}</h2>
            <ul className={styles.securityPoints}>
              {d.security.points.map((point) => (
                <li key={point} className={`body text-secondary ${styles.securityPoint}`}>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* Демо-форма — единственный lime-фон страницы */}
      <Section bg="lime" id="demo">
        <Container>
          <div className={styles.demoSplit}>
            <Reveal>
              <SectionHeading label={d.demo.heading.label} lines={d.demo.heading.lines} layout="stack" />
              <p className={`body-l ${styles.demoSubtitle}`}>{d.demo.subtitle}</p>
            </Reveal>
            <Reveal index={1}>
              <LeadForm dict={dict.common} variant="demo" />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
