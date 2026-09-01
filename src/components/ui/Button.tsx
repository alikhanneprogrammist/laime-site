import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'link';
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  href,
  type = 'button',
  onClick,
  disabled,
  children,
  className,
}: ButtonProps) {
  const cls = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  if (href) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClick}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
