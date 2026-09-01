import type { CommonDictionary, HomeDictionary } from '@/content/types';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { HeadingLines } from '@/components/ui/SectionHeading';
import styles from './Hero.module.css';

export function Hero({ dict, common }: { dict: HomeDictionary['hero']; common: CommonDictionary }) {
  return (
    <section className={styles.hero} data-bg="ink">
      <div className={styles.grid} aria-hidden="true" />
      <Container className={styles.container}>
        {/* Вход hero — чистый CSS без JS: H1 (LCP-элемент) не должен ждать гидрации */}
        <div className={styles.content}>
          <h1 className={`h1 ${styles.title} ${styles.enter}`}>
            <HeadingLines lines={dict.h1Lines} />
          </h1>
          <p
            className={`body-l text-secondary ${styles.subtitle} ${styles.enter}`}
            style={{ animationDelay: '60ms' }}
          >
            {dict.subtitle}
          </p>
          <div className={`${styles.actions} ${styles.enter}`} style={{ animationDelay: '120ms' }}>
            <Button href="/contacts">{common.cta.lead}</Button>
            <Button variant="link" href="#cases">
              {dict.scrollLink}
            </Button>
          </div>
        </div>
        <p className={`mono-label text-muted ${styles.contacts}`}>
          <a href={common.contacts.whatsappUrl}>{common.contacts.whatsappLabel}</a>
          {' · '}
          <a href={common.contacts.instagramUrl}>{common.contacts.instagramLabel}</a>
          {' · '}
          <a href={`mailto:${common.contacts.email}`}>{common.contacts.email}</a>
        </p>
      </Container>
    </section>
  );
}
