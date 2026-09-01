import type { Dictionary, Locale } from '@/content/types';
import { common, niches } from '@/content/ru/common';
import { home } from '@/content/ru/home';
import { bookingOs } from '@/content/ru/booking-os';
import { about, casesPage, contacts, privacy, servicesPage } from '@/content/ru/pages';

const ru: Dictionary = {
  common,
  niches,
  home,
  bookingOs,
  about,
  contacts,
  privacy,
  casesPage,
  servicesPage,
};

/** Пока только RU; /kk/ и /en/ добавляются словарями без правок компонентов. */
export function getDictionary(locale: Locale = 'ru'): Dictionary {
  void locale;
  return ru;
}
