'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import type { CommonDictionary } from '@/content/types';
import { Button } from '@/components/ui/Button';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  dict: CommonDictionary;
  links: { href: string; label: string }[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ dict, links, isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} data-bg="ink">
      <nav className={styles.nav} aria-label="Мобильная навигация">
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className={`h2 ${styles.link}`}
            style={{ transitionDelay: `${i * 60}ms` }}
            onClick={onClose}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className={styles.bottom}>
        <Button href="/contacts" onClick={onClose}>
          {dict.cta.lead}
        </Button>
        <p className={`mono-label text-muted ${styles.contacts}`}>
          <a href={dict.contacts.whatsappUrl}>{dict.contacts.whatsappLabel}</a>
          {' · '}
          <a href={dict.contacts.instagramUrl}>{dict.contacts.instagramLabel}</a>
          {' · '}
          <a href={`mailto:${dict.contacts.email}`}>{dict.contacts.email}</a>
        </p>
      </div>
    </div>
  );
}
