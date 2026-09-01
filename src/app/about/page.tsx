import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { ProcessSteps } from '@/components/blocks/ProcessSteps';
import styles from './page.module.css';

export const metadata: Metadata = buildMetadata({
  title: 'Об агентстве — процесс, команда, принципы',
  description:
    'Как работает L\'aime Agency: процесс от диагностики до цифр, состав команды по ролям и принципы — реальные данные, раздельный бюджет, доступы у клиента.',
  path: '/about',
});

export default function AboutPage() {
  const dict = getDictionary();
  const d = dict.about;

  return (
    <>
      <Section bg="ink" className={styles.hero}>
        <Container>
          <SectionHeading as="h1" label={dict.common.nav.about} lines={d.h1Lines} />
          <p className={`body-l text-secondary ${styles.intro}`}>{d.intro}</p>
        </Container>
      </Section>

      <ProcessSteps heading={d.process.heading} steps={d.process.steps} bg="bone" />

      <Section bg="ink">
        <Container>
          <Reveal>
            <SectionHeading label={d.team.heading.label} lines={d.team.heading.lines} />
          </Reveal>
          <ul className={styles.roles}>
            {d.team.roles.map((member, i) => (
              <Reveal key={member.role} index={i} as="li" className={styles.role}>
                <p className="h3">{member.role}</p>
                <p className={`body text-secondary ${styles.roleArea}`}>{member.area}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section bg="bone">
        <Container>
          <Reveal>
            <SectionHeading label={d.principles.heading.label} lines={d.principles.heading.lines} />
          </Reveal>
          <div className={styles.principles}>
            {d.principles.items.map((principle, i) => (
              <Reveal key={principle.title} index={i} className={styles.principle}>
                <h3 className="h3">{principle.title}</h3>
                <p className={`body text-secondary ${styles.principleText}`}>{principle.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className={styles.cta}>
            <Button href="/contacts">{dict.common.cta.lead}</Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
