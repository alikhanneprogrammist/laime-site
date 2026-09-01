import Image from 'next/image';
import type { ScreenshotRef } from '@/content/types';
import styles from './Screenshot.module.css';

interface ScreenshotProps {
  shot: ScreenshotRef;
  /** Подпись под кадром (mono-label). */
  caption?: string;
  /** Загружать сразу (первый экран). */
  priority?: boolean;
  /** Hint для next/image — ширина кадра в вёрстке. */
  sizes?: string;
}

/**
 * Реальный скриншот интерфейса Booking OS (ТЗ §8.6): рамка устройства,
 * без «дизайнерских» подложек. Демо-данные, персональных данных нет.
 */
export function Screenshot({ shot, caption, priority, sizes = '(max-width: 900px) 100vw, 60vw' }: ScreenshotProps) {
  const isMobile = shot.height > shot.width;
  return (
    <figure className={`${styles.frame} ${isMobile ? styles.mobile : ''}`}>
      <div className={styles.bar} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        priority={priority}
        className={styles.img}
      />
      {caption ? <figcaption className={`mono-label text-muted ${styles.caption}`}>{caption}</figcaption> : null}
    </figure>
  );
}
