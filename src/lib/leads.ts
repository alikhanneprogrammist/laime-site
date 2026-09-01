/**
 * Отправка заявки в /api/lead (Telegram-бот; amoCRM — вторым шагом, ТЗ §11.3).
 */
export interface LeadPayload {
  variant: 'lead' | 'demo';
  name: string;
  messenger: string;
  niche: string;
  link: string;
  comment: string;
  /** Скрытое поле-ловушка: у людей всегда пустое. */
  honeypot: string;
  page: string;
  referrer: string;
  utm: Record<string, string>;
  device: string;
}

export function collectContext(): Pick<LeadPayload, 'page' | 'referrer' | 'utm' | 'device'> {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return {
    page: window.location.pathname,
    referrer: document.referrer,
    utm,
    device: navigator.userAgent,
  };
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Отправка заявки не удалась: ${response.status}`);
  }
}
