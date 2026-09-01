'use client';

import { useEffect, useRef } from 'react';

const COUNTER_DURATION_MS = 800; // ТЗ §6: счётчик ≤ 800 мс, один раз

interface CounterProps {
  /** Финальное значение как строка: «716 760», «×6,8», «+23%», «0». */
  value: string;
  className?: string;
}

/**
 * SSR рендерит финальное значение (SEO, no-JS); при появлении в вьюпорте
 * число один раз анимируется от нуля с сохранением формата.
 */
export function Counter({ value, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const match = value.match(/(\d[\d\s]*(?:[.,]\d+)?)/);
    if (!match || match.index === undefined) return;

    const numericText = match[1];
    const prefix = value.slice(0, match.index);
    const suffix = value.slice(match.index + numericText.length);
    const decimalSeparator = numericText.includes(',') ? ',' : '.';
    const target = parseFloat(numericText.replace(/\s/g, '').replace(',', '.'));
    if (!isFinite(target) || target === 0) return;
    const decimals = numericText.includes(decimalSeparator)
      ? numericText.split(decimalSeparator)[1].length
      : 0;
    const useThousandsSpace = /\d\s\d/.test(numericText);

    const format = (n: number) => {
      let text = n.toFixed(decimals);
      if (decimals > 0) text = text.replace('.', decimalSeparator);
      if (useThousandsSpace) {
        const [intPart, fracPart] = text.split(decimalSeparator);
        const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        text = fracPart ? grouped + decimalSeparator + fracPart : grouped;
      }
      return prefix + text + suffix;
    };

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / COUNTER_DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = format(target * eased);
        if (progress < 1) raf = requestAnimationFrame(tick);
        else el.textContent = value;
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
