import { NextResponse, type NextRequest } from 'next/server';
import type { LeadPayload } from '@/lib/leads';

/**
 * Приём заявки: серверная валидация + honeypot + rate limit по IP,
 * отправка в Telegram-бот агентства (ТЗ §11.3). amoCRM подключается
 * здесь же вторым шагом, когда появится доступ к аккаунту.
 */

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_FIELD_LENGTH = 500;

/** Достаточно для одного инстанса на VPS; при масштабировании заменить на Redis. */
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  requestLog.set(ip, [...recent, now]);
  if (requestLog.size > 10_000) requestLog.clear();
  return recent.length >= RATE_LIMIT_MAX_REQUESTS;
}

function clip(value: unknown): string {
  return typeof value === 'string' ? value.slice(0, MAX_FIELD_LENGTH).trim() : '';
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildTelegramMessage(lead: LeadPayload, leadId: string): string {
  const title = lead.variant === 'demo' ? 'Запрос демо Booking OS' : 'Заявка на разбор воронки';
  const lines = [
    `<b>${title}</b>`,
    '',
    `Имя: ${escapeHtml(lead.name)}`,
    `Контакт: ${escapeHtml(lead.messenger)}`,
  ];
  if (lead.niche) lines.push(`Ниша: ${escapeHtml(lead.niche)}`);
  if (lead.link) lines.push(`Ссылка: ${escapeHtml(lead.link)}`);
  if (lead.comment) lines.push(`Комментарий: ${escapeHtml(lead.comment)}`);
  lines.push('', `Страница: ${escapeHtml(lead.page)}`);
  if (lead.referrer) lines.push(`Referrer: ${escapeHtml(lead.referrer)}`);
  const utmPairs = Object.entries(lead.utm ?? {});
  if (utmPairs.length > 0) {
    lines.push(`UTM: ${utmPairs.map(([k, v]) => `${k}=${escapeHtml(v)}`).join(' · ')}`);
  }
  lines.push(`ID заявки: <code>${leadId}</code>`);
  return lines.join('\n');
}

async function sendToTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    throw new Error('TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы в окружении');
  }
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram API ${response.status}: ${body}`);
  }
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Слишком много запросов' }, { status: 429 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Некорректный запрос' }, { status: 400 });
  }

  // Боту, заполнившему скрытое поле, отвечаем «успехом», ничего не отправляя.
  if (clip(raw.honeypot)) {
    return NextResponse.json({ ok: true });
  }

  const utm: Record<string, string> = {};
  if (raw.utm && typeof raw.utm === 'object') {
    for (const [key, value] of Object.entries(raw.utm as Record<string, unknown>)) {
      if (typeof value === 'string' && key.startsWith('utm_')) utm[key] = clip(value);
    }
  }

  const lead: LeadPayload = {
    variant: raw.variant === 'demo' ? 'demo' : 'lead',
    name: clip(raw.name),
    messenger: clip(raw.messenger),
    niche: clip(raw.niche),
    link: clip(raw.link),
    comment: clip(raw.comment),
    honeypot: '',
    page: clip(raw.page),
    referrer: clip(raw.referrer),
    utm,
    device: clip(raw.device),
  };

  if (!lead.name || !lead.messenger) {
    return NextResponse.json(
      { ok: false, error: 'Заполните имя и контакт' },
      { status: 400 },
    );
  }

  const leadId = crypto.randomUUID();
  try {
    await sendToTelegram(buildTelegramMessage(lead, leadId));
  } catch (error) {
    console.error('[lead] отправка не удалась:', error);
    return NextResponse.json(
      { ok: false, error: 'Не получилось отправить заявку' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, leadId });
}
