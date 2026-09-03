/**
 * Цели аналитики — ТЗ §11.4. Событие уходит во все подключённые счётчики:
 * GA4, Яндекс.Метрика (reachGoal), а конверсии — ещё и в Meta/TikTok Pixel.
 * Счётчики загружаются в <Analytics />, только если задан их ID в env.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ym?: (id: number, action: string, target?: string, params?: object) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, params?: object) => void; page: () => void };
  }
}

export type AnalyticsEvent =
  | 'form_submit'
  | 'whatsapp_click'
  | 'telegram_click'
  | 'demo_request'
  | 'pdf_download'
  | 'scroll_50'
  | 'scroll_cases';

/** События-конверсии, дублируемые в рекламные пиксели как Lead. */
const LEAD_EVENTS: AnalyticsEvent[] = ['form_submit', 'demo_request'];

export const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID) || 0;

export function trackEvent(event: AnalyticsEvent, params?: Record<string, string>): void {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', event, params ?? {});
  if (YM_ID) window.ym?.(YM_ID, 'reachGoal', event, params);
  if (LEAD_EVENTS.includes(event)) {
    window.fbq?.('track', 'Lead', params);
    window.ttq?.track('SubmitForm', params);
  }
  if (process.env.NODE_ENV === 'development') {
    console.info('[analytics]', event, params ?? {});
  }
}
