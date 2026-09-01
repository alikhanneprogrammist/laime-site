# L'aime Agency — сайт

Next.js (App Router) + TypeScript, статическая генерация. Дизайн-система по ТЗ
(`../Laime-Website-TZ-2026.md`): Ink / Bone / Lime, Unbounded + Manrope + JetBrains Mono.

## Команды

```bash
npm run dev     # разработка (http://localhost:3000)
npm run build   # прод-сборка (все страницы статические)
npm run start   # прод-сервер
npm run lint    # ESLint
```

## Где что лежит

| Путь | Что это |
|---|---|
| `src/content/ru/` | Весь контент сайта: словари, кейсы, услуги. Компоненты контента не содержат. |
| `src/lib/content.ts`, `src/lib/dictionaries.ts` | Единственная точка доступа к контенту — при переходе на CMS меняются только эти файлы. |
| `src/styles/tokens.css` | Дизайн-токены из ТЗ §8 (цвет, сетка, анимация). |
| `src/components/ui/Section.tsx` | Владелец ритма Ink/Bone/Lime (`data-bg`). |
| `src/lib/leads.ts` | Заглушка отправки заявок: payload уже в формате будущего `/api/lead` (Telegram + amoCRM). |
| `src/lib/analytics.ts` | Заглушка целей аналитики (§11.4). |
| `src/lib/og.tsx` | Шаблон OG-изображений (Ink, Unbounded, один lime-акцент). |

## Что нужно заменить перед запуском (черновой контент)

- [ ] Цифры кейсов, не входящие в ТЗ, помечены `// ЧЕРНОВИК` в `src/content/ru/cases/*` — заменить на согласованные, получить письменные согласия клиентов.
- [ ] Контакты в `src/content/ru/common.ts`: номер WhatsApp, Instagram, e-mail, реквизиты ТОО/ИП.
- [ ] Текст `/privacy` — утвердить у юриста (Закон РК №94-V).
- [ ] SVG-моки (`MockScreenshot`) заменить реальными скриншотами Booking OS с обезличенными данными.
- [ ] Домен: переменная `NEXT_PUBLIC_SITE_URL` (по умолчанию `https://laime.kz`).
- [ ] Интеграции форм: реализовать `/api/lead` (Telegram-бот + amoCRM webhook), включить в `src/lib/leads.ts`.
- [ ] Аналитика: GA4, Яндекс.Метрика, Meta/TikTok Pixel — подключить в `src/lib/analytics.ts`.

## Мультиязычность

Тексты только в словарях (`src/content/ru/`). Для KZ: добавить `src/content/kk/`,
расширить `getDictionary(locale)` и обернуть маршруты в сегмент `[locale]`.
