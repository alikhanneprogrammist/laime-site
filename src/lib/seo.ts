import type { Metadata } from 'next';
import type { CaseStudy, FaqItem, Service } from '@/content/types';
import { company } from '@/lib/company';

/** Пустое или некорректное значение env не должно ронять сборку (metadataBase = new URL). */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return 'https://laime.kz';
  const withScheme = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withScheme).origin;
  } catch {
    return 'https://laime.kz';
  }
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = "L'aime Agency";

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

export function buildMetadata({ title, description, path }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'ru_RU',
      type: 'website',
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    sameAs: [company.instagramUrl],
  };
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url: SITE_URL,
    telephone: company.phoneDisplay,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Астана',
      addressCountry: 'KZ',
    },
    priceRange: '$$',
  };
}

export function serviceJsonLd(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.h1,
    description: service.seo.description,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    areaServed: 'Астана',
    url: `${SITE_URL}/services/${service.slug}`,
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function articleJsonLd(caseStudy: CaseStudy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.seo.title,
    description: caseStudy.seo.description,
    url: `${SITE_URL}/cases/${caseStudy.slug}`,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };
}
