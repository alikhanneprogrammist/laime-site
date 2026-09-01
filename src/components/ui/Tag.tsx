import type { ReactNode } from 'react';
import styles from './Tag.module.css';

interface TagProps {
  children: ReactNode;
  /** Крупные строки-теги ниш (блок 07) против компактных меток. */
  size?: 'md' | 'lg';
  interactive?: boolean;
  onClick?: () => void;
  isActive?: boolean;
}

export function Tag({ children, size = 'md', interactive, onClick, isActive }: TagProps) {
  const cls = [
    styles.tag,
    size === 'lg' && styles.lg,
    interactive && styles.interactive,
    isActive && styles.active,
  ]
    .filter(Boolean)
    .join(' ');

  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick} aria-pressed={isActive}>
        {children}
      </button>
    );
  }
  return <span className={cls}>{children}</span>;
}
