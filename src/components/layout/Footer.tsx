import Link from 'next/link';
import type { CommonDictionary } from '@/content/types';
import styles from './Footer.module.css';

export function Footer({ dict }: { dict: CommonDictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} data-bg="ink">
      <div className={styles.inner}>
        <div className={styles.top}>
          <p className={styles.logo}>{dict.brand}</p>
          <nav className={styles.col} aria-label="Направления">
            <p className={`mono-label text-muted ${styles.colTitle}`}>{dict.footer.directionsTitle}</p>
            <Link href="/services" className={styles.link}>
              {dict.nav.services}
            </Link>
            <Link href="/cases" className={styles.link}>
              {dict.nav.cases}
            </Link>
            <Link href="/booking-os" className={styles.link}>
              {dict.nav.bookingOs}
            </Link>
            <Link href="/about" className={styles.link}>
              {dict.nav.about}
            </Link>
          </nav>
          <div className={styles.col}>
            <p className={`mono-label text-muted ${styles.colTitle}`}>{dict.footer.contactsTitle}</p>
            <a href={dict.contacts.whatsappUrl} className={styles.link}>
              {dict.contacts.whatsappLabel}
            </a>
            <a href={dict.contacts.instagramUrl} className={styles.link}>
              {dict.contacts.instagramLabel}
            </a>
            <a href={`mailto:${dict.contacts.email}`} className={styles.link}>
              {dict.contacts.email}
            </a>
            <p className={`${styles.link} ${styles.address}`}>{dict.contacts.address}</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className="caption text-muted">
            © {year} · {dict.footer.requisites}
          </p>
          <Link href="/privacy" className={`caption ${styles.privacy}`}>
            {dict.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
