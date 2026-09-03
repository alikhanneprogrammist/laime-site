'use client';

import type { CommonDictionary } from '@/content/types';
import { useScrollDepth } from '@/lib/hooks/useScrollDepth';
import styles from './WhatsAppFab.module.css';

/** Плавающая кнопка WhatsApp: появляется после 30% скролла — ТЗ §9. */
export function WhatsAppFab({ dict }: { dict: CommonDictionary }) {
  const isVisible = useScrollDepth(0.3);

  return (
    <a
      href={dict.contacts.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.whatsappFabLabel}
      className={[styles.fab, isVisible ? styles.visible : ''].join(' ')}
      data-placement="fab"
    >
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.2-.7l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7a11 11 0 0 0 4.2 3.7c.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.4-.3Z" />
      </svg>
    </a>
  );
}
