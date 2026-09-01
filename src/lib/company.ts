/**
 * Данные компании. Источник — переменные окружения (.env.local, см. .env.example):
 * правятся без изменения кода. NEXT_PUBLIC_* вшиваются в бандл на этапе сборки,
 * поэтому после правки нужен перезапуск dev-сервера или пересборка.
 */

function env(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

/** '+77786430699' → '+7 778 643 06 99'; нестандартная длина возвращается как есть. */
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length !== 11) return raw;
  return `+${digits[0]} ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9)}`;
}

const phoneRaw = env(process.env.NEXT_PUBLIC_COMPANY_PHONE, '+77786430699');
const instagramHandle = env(process.env.NEXT_PUBLIC_COMPANY_INSTAGRAM, 'laimeagency');
const telegramHandle = env(process.env.NEXT_PUBLIC_COMPANY_TELEGRAM, 'laime_agency');

export const company = {
  phoneDisplay: formatPhone(phoneRaw),
  whatsappUrl: `https://wa.me/${phoneRaw.replace(/\D/g, '')}`,
  instagramHandle,
  instagramUrl: `https://instagram.com/${instagramHandle}`,
  telegramHandle: `@${telegramHandle}`,
  telegramUrl: `https://t.me/${telegramHandle}`,
  email: env(process.env.NEXT_PUBLIC_COMPANY_EMAIL, 'hello@laime.kz'),
  address: env(process.env.NEXT_PUBLIC_COMPANY_ADDRESS, 'Астана, Казахстан'),
  requisites: env(
    process.env.NEXT_PUBLIC_COMPANY_REQUISITES,
    'ТОО «L\'aime Agency» · БИН 000000000000 · Астана',
  ),
} as const;
