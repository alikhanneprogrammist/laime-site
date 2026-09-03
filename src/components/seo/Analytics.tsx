'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { trackEvent, YM_ID } from '@/lib/analytics';

/**
 * Счётчики (ТЗ §11.4): каждый грузится, только если задан его ID в env.
 * Здесь же — сквозные цели: scroll_50, scroll_cases и клики по мессенджерам
 * (делегированный слушатель, чтобы не вешать обработчики в серверных компонентах).
 */

function sanitizeId(raw: string | undefined): string {
  const value = raw?.trim() ?? '';
  return /^[A-Za-z0-9_-]+$/.test(value) ? value : '';
}

const GA4_ID = sanitizeId(process.env.NEXT_PUBLIC_GA4_ID);
const META_PIXEL_ID = sanitizeId(process.env.NEXT_PUBLIC_META_PIXEL_ID);
const TIKTOK_PIXEL_ID = sanitizeId(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID);

export function Analytics() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  /* Пейджвью при клиентской навигации (первый визит счётчики фиксируют сами). */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.gtag?.('event', 'page_view', { page_path: pathname });
    if (YM_ID) window.ym?.(YM_ID, 'hit', pathname);
    window.fbq?.('track', 'PageView');
    window.ttq?.page();
  }, [pathname]);

  /* Цель scroll_50: один раз за сессию страницы. */
  useEffect(() => {
    let isFired = false;
    const onScroll = () => {
      if (isFired) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= 0.5) {
        isFired = true;
        trackEvent('scroll_50', { page: pathname });
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  /* Цель scroll_cases: блок кейсов на главной (#cases) показался на 20%. */
  useEffect(() => {
    const target = document.getElementById('cases');
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          trackEvent('scroll_cases');
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  /* Клики по WhatsApp / Telegram / PDF — по href, где бы ссылка ни стояла. */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest?.('a[href]');
      if (!(link instanceof HTMLAnchorElement)) return;
      const placement = link.dataset.placement ?? 'page';
      if (link.href.includes('wa.me/')) trackEvent('whatsapp_click', { placement });
      else if (link.href.includes('t.me/')) trackEvent('telegram_click', { placement });
      else if (link.href.endsWith('.pdf')) trackEvent('pdf_download', { placement });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return (
    <>
      {GA4_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];
window.gtag=function(){dataLayer.push(arguments)};
gtag('js',new Date());
gtag('config','${GA4_ID}');`}
          </Script>
        </>
      )}
      {YM_ID > 0 && (
        <Script id="ym-init" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],
k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
ym(${YM_ID},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}
        </Script>
      )}
      {META_PIXEL_ID && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`}
        </Script>
      )}
      {TIKTOK_PIXEL_ID && (
        <Script id="tiktok-pixel-init" strategy="afterInteractive">
          {`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
var o=d.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;
var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
ttq.load('${TIKTOK_PIXEL_ID}');
ttq.page();
}(window,document,'ttq');`}
        </Script>
      )}
    </>
  );
}
