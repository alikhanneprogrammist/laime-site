import type { Metadata } from 'next';
import { display, body, mono } from '@/fonts';
import { getDictionary } from '@/lib/dictionaries';
import { SITE_NAME, SITE_URL, localBusinessJsonLd, organizationJsonLd } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFab } from '@/components/layout/WhatsAppFab';
import { JsonLd } from '@/components/seo/JsonLd';
import { Analytics } from '@/components/seo/Analytics';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — маркетинг, который заканчивается заявкой`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'Бренд, контент, реклама, CRM и собственные IT-продукты. Один контур — от первого касания до заявки. Астана.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const dict = getDictionary();

  return (
    <html
      lang="ru"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      /* Инлайн-скрипт ниже добавляет класс .js до гидрации — расхождение ожидаемое */
      suppressHydrationWarning
    >
      <body>
        {/* Инлайн до первого пейнта: класс .js включает скрытое состояние
            reveal-анимаций сразу, без поздней перерисовки страницы */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={localBusinessJsonLd()} />
        <Header dict={dict.common} />
        <main>{children}</main>
        <Footer dict={dict.common} />
        <WhatsAppFab dict={dict.common} />
        <Analytics />
      </body>
    </html>
  );
}
