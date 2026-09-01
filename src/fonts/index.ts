import localFont from 'next/font/local';

/*
 * display: 'optional' — H1 набран Unbounded и является LCP-элементом:
 * при swap Chrome перезаписывает LCP моментом перерисовки шрифтом.
 * С optional шрифт применяется только если успел загрузиться к первой
 * отрисовке (с preload успевает почти всегда), иначе остаётся fallback
 * до следующей навигации — зато LCP фиксируется по первому пейнту.
 */
export const display = localFont({
  src: [
    { path: './unbounded-500.woff2', weight: '500', style: 'normal' },
    { path: './unbounded-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'optional',
});

/*
 * preload: false — прелоадится только display-шрифт: H1 (LCP-элемент) набран им,
 * и его swap-перерисовка задаёт LCP. Manrope и mono догружаются без конкуренции
 * за канал, текст до этого показывается системным fallback с size-adjust.
 */
export const body = localFont({
  src: [
    { path: './manrope-400.woff2', weight: '400', style: 'normal' },
    { path: './manrope-500.woff2', weight: '500', style: 'normal' },
    { path: './manrope-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
});

export const mono = localFont({
  src: [{ path: './jetbrains-mono-400.woff2', weight: '400', style: 'normal' }],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});
