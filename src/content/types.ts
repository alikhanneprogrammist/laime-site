export type Locale = 'ru' | 'kk' | 'en';

export type Niche =
  | 'horeca'
  | 'auto'
  | 'medicine'
  | 'logistics'
  | 'outdoor'
  | 'gov'
  | 'education'
  | 'services';

/** Каждая цифра на сайте сопровождается источником — ТЗ §10. */
export interface Metric {
  label: string;
  /** Старое значение — рендерится приглушённо, зачёркнуто/со стрелкой. */
  before?: string;
  after: string;
  /** Дельта — лаймовый mono-акцент, например «×6,8». */
  delta?: string;
  source: string;
}

/** Реальный скриншот интерфейса (public/…): размеры нужны next/image. */
export interface ScreenshotRef {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CaseVisual {
  /** Ключ SVG-мока (MockScreenshot) до появления реальных скриншотов. */
  kind: 'stats' | 'calendar' | 'feed' | 'crm';
  caption: string;
}

export interface CaseStudy {
  slug: string;
  niche: Niche;
  /** Анонимизированное название до письменного согласия клиента — ТЗ §10. */
  title: string;
  client: string;
  period: string;
  tags: string[];
  task: string;
  actions: string[];
  metrics: Metric[];
  sourceNote: string;
  visuals: CaseVisual[];
  relatedSlug: string;
  previewMetrics: Metric[];
  seo: { title: string; description: string; ogMetric: string };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type ServiceSlug = 'brand' | 'smm' | 'ads' | 'dev' | 'crm';

export interface Service {
  slug: ServiceSlug;
  navLabel: string;
  h1: string;
  intro: string;
  forWho: string[];
  included: string[];
  howWeMeasure: string[];
  relatedCaseSlugs: [string, string];
  faq: FaqItem[];
  seo: { title: string; description: string };
}

/* ---------- Словари интерфейсных текстов ---------- */

export interface CommonDictionary {
  brand: string;
  nav: { services: string; cases: string; bookingOs: string; about: string; contacts: string };
  cta: { lead: string; discuss: string; demo: string; allCases: string; watchCases: string };
  contacts: {
    whatsappUrl: string;
    whatsappLabel: string;
    instagramUrl: string;
    instagramLabel: string;
    telegramUrl: string;
    telegramHandle: string;
    email: string;
    phone: string;
    address: string;
  };
  form: {
    name: string;
    messenger: string;
    niche: string;
    industry: string;
    link: string;
    comment: string;
    consentPrefix: string;
    consentLink: string;
    submitLead: string;
    submitDemo: string;
    orWhatsapp: string;
    successTitle: string;
    successText: string;
    errors: { required: string; consent: string; phone: string; submit: string };
    nicheOptions: string[];
  };
  footer: {
    directionsTitle: string;
    contactsTitle: string;
    privacy: string;
    requisites: string;
  };
  whatsappFabLabel: string;
  menuOpen: string;
  menuClose: string;
}

export interface HomeBlockHeading {
  label: string;
  /** Заголовок с ручными переносами строк — ТЗ §8.3. */
  lines: string[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface HomeDictionary {
  hero: {
    h1Lines: string[];
    subtitle: string;
    scrollLink: string;
  };
  stats: { items: StatItem[]; source: string };
  directions: {
    heading: HomeBlockHeading;
    cards: {
      num: string;
      title: string;
      subtitle: string;
      points: string[];
      href: string;
    }[];
  };
  product: {
    heading: HomeBlockHeading;
    problems: string[];
    problemsTitle: string;
    results: Metric[];
    resultsSource: string;
    industriesNote: string;
    cta: string;
  };
  cases: { heading: HomeBlockHeading };
  ads: {
    heading: HomeBlockHeading;
    steps: { title: string; text: string }[];
    plate: { title: string; points: string[] };
  };
  niches: { heading: HomeBlockHeading; items: string[] };
  process: {
    heading: HomeBlockHeading;
    steps: { num: string; title: string; text: string }[];
  };
  formats: {
    heading: HomeBlockHeading;
    priceNote: string;
    columns: { title: string; subtitle: string; points: string[] }[];
  };
  stack: { label: string; tools: string[] };
  finalCta: { heading: HomeBlockHeading; subtitle: string };
}

export interface BookingOsDictionary {
  hero: { label: string; h1Lines: string[]; subtitle: string };
  problems: { heading: HomeBlockHeading; items: { title: string; text: string }[] };
  features: { heading: HomeBlockHeading; items: { title: string; text: string; shot: ScreenshotRef }[] };
  screens: { heading: HomeBlockHeading; note: string; items: { shot: ScreenshotRef; caption: string }[] };
  results: { heading: HomeBlockHeading; metrics: Metric[]; source: string };
  industries: { heading: HomeBlockHeading; note: string; items: string[] };
  rollout: { heading: HomeBlockHeading; steps: { num: string; title: string; text: string }[] };
  security: { title: string; points: string[] };
  demo: { heading: HomeBlockHeading; subtitle: string };
  faq: FaqItem[];
}

export interface AboutDictionary {
  h1Lines: string[];
  intro: string;
  process: { heading: HomeBlockHeading; steps: { num: string; title: string; text: string }[] };
  team: { heading: HomeBlockHeading; roles: { role: string; area: string }[] };
  principles: { heading: HomeBlockHeading; items: { title: string; text: string }[] };
}

export interface ContactsDictionary {
  h1Lines: string[];
  subtitle: string;
  formTitle: string;
}

export interface PrivacyDictionary {
  h1: string;
  updated: string;
  sections: { title: string; paragraphs: string[] }[];
}

export interface CasesPageDictionary {
  h1Lines: string[];
  subtitle: string;
  filterAll: string;
  caseLabels: {
    task: string;
    actions: string;
    metrics: string;
    visuals: string;
    related: string;
    ctaTitle: string;
    ctaText: string;
    period: string;
    client: string;
  };
}

export interface ServicesPageDictionary {
  h1Lines: string[];
  subtitle: string;
  labels: {
    forWho: string;
    included: string;
    howWeMeasure: string;
    relatedCases: string;
    faq: string;
    ctaTitle: string;
  };
}

export interface NicheDictionary {
  labels: Record<Niche, string>;
}

export interface Dictionary {
  common: CommonDictionary;
  niches: NicheDictionary;
  home: HomeDictionary;
  bookingOs: BookingOsDictionary;
  about: AboutDictionary;
  contacts: ContactsDictionary;
  privacy: PrivacyDictionary;
  casesPage: CasesPageDictionary;
  servicesPage: ServicesPageDictionary;
}
