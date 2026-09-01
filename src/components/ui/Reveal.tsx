'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Индекс для стаггера 60 мс внутри группы (ТЗ §8.7). */
  index?: number;
  className?: string;
  as?: 'div' | 'li';
}

/** Появление один раз при 20% видимости; скрытое состояние применяется только при html.js. */
export function Reveal({ children, index = 0, className, as = 'div' }: RevealProps) {
  const Tag = as;
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{ '--stagger-index': index } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
