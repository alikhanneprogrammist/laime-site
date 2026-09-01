import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { LeadForm } from '@/components/form/LeadForm';
import styles from './page.module.css';

export const metadata: Metadata = buildMetadata({
  title: 'Контакты — заявка на разбор воронки',
  description:
    'Заявка на бесплатный разбор воронки: форма, WhatsApp, Telegram. Отвечаем в течение рабочего дня. Астана.',
  path: '/contacts',
});

export default function ContactsPage() {
  const dict = getDictionary();
  const d = dict.contacts;

  return (
    <Section bg="ink" className={styles.page}>
      <Container>
        <div className={styles.split}>
          <div>
            <SectionHeading as="h1" label={dict.common.nav.contacts} lines={d.h1Lines} />
            <p className={`body-l text-secondary ${styles.subtitle}`}>{d.subtitle}</p>
            <ul className={styles.channels}>
              <li>
                <a href={dict.common.contacts.whatsappUrl} className={styles.channel}>
                  <span className="mono-label text-muted">WhatsApp</span>
                  <span className="body-l">{dict.common.contacts.phone}</span>
                </a>
              </li>
              <li>
                <a href={dict.common.contacts.telegramUrl} className={styles.channel}>
                  <span className="mono-label text-muted">Telegram</span>
                  <span className="body-l">{dict.common.contacts.telegramHandle}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${dict.common.contacts.email}`} className={styles.channel}>
                  <span className="mono-label text-muted">E-mail</span>
                  <span className="body-l">{dict.common.contacts.email}</span>
                </a>
              </li>
              <li>
                <p className={styles.channel}>
                  <span className="mono-label text-muted">Адрес</span>
                  <span className="body-l">{dict.common.contacts.address}</span>
                </p>
              </li>
            </ul>
          </div>
          <Reveal>
            <p className={`mono-label text-muted ${styles.formTitle}`}>{d.formTitle}</p>
            <LeadForm dict={dict.common} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
