'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { CommonDictionary } from '@/content/types';
import { useScrolled } from '@/lib/hooks/useScrolled';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';
import styles from './Header.module.css';

export function Header({ dict }: { dict: CommonDictionary }) {
  const isScrolled = useScrolled();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: '/services', label: dict.nav.services },
    { href: '/cases', label: dict.nav.cases },
    { href: '/booking-os', label: dict.nav.bookingOs },
    { href: '/about', label: dict.nav.about },
  ];

  return (
    <header className={[styles.header, isScrolled ? styles.scrolled : ''].join(' ')} data-bg="ink">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={dict.brand}>
          {dict.brand}
        </Link>
        <nav className={styles.nav} aria-label="Основная навигация">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <Button variant="secondary" href="/contacts" className={styles.cta}>
            {dict.cta.lead}
          </Button>
          <button
            type="button"
            className={styles.burger}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? dict.menuClose : dict.menuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        </div>
      </div>
      <MobileMenu
        dict={dict}
        links={links}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
}
