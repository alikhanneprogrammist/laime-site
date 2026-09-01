/** Цели аналитики — ТЗ §11.4. Пока заглушка: GA4/Метрика/пиксели подключаются позже. */
export type AnalyticsEvent =
  | 'form_submit'
  | 'whatsapp_click'
  | 'telegram_click'
  | 'demo_request'
  | 'pdf_download'
  | 'scroll_50'
  | 'scroll_cases';

export function trackEvent(event: AnalyticsEvent, params?: Record<string, string>): void {
  if (process.env.NODE_ENV === 'development') {
    console.info('[analytics]', event, params ?? {});
  }
}
