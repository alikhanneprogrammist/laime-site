import type { CommonDictionary, NicheDictionary } from '../types';
import { company } from '@/lib/company';

export const common: CommonDictionary = {
  brand: "L'aime",
  nav: {
    services: 'Услуги',
    cases: 'Кейсы',
    bookingOs: 'Booking OS',
    about: 'О нас',
    contacts: 'Контакты',
  },
  cta: {
    lead: 'Разобрать воронку бесплатно',
    discuss: 'Обсудить',
    demo: 'Запросить демо',
    allCases: 'Все кейсы',
    watchCases: 'Смотреть кейсы ↓',
  },
  contacts: {
    whatsappUrl: company.whatsappUrl,
    whatsappLabel: 'WhatsApp',
    instagramUrl: company.instagramUrl,
    instagramLabel: 'Instagram',
    telegramUrl: company.telegramUrl,
    telegramHandle: company.telegramHandle,
    email: company.email,
    phone: company.phoneDisplay,
    address: company.address,
  },
  form: {
    name: 'Имя',
    messenger: 'WhatsApp или Telegram',
    niche: 'Ниша',
    industry: 'Тип объекта',
    link: 'Ссылка на аккаунт или сайт',
    comment: 'Комментарий',
    consentPrefix: 'Согласен на обработку персональных данных — ',
    consentLink: 'политика',
    submitLead: 'Отправить заявку',
    submitDemo: 'Запросить демо',
    orWhatsapp: 'Или напишите сразу в WhatsApp',
    successTitle: 'Заявка принята',
    successText: 'Отвечаем в течение рабочего дня. Разбор воронки — бесплатно.',
    errors: {
      required: 'Заполните это поле',
      consent: 'Без согласия отправка невозможна',
      phone: 'Укажите номер в формате +7',
      submit: 'Не получилось отправить. Попробуйте ещё раз или напишите в WhatsApp.',
    },
    nicheOptions: [
      'HoReCa',
      'Авто',
      'Медицина',
      'Логистика',
      'Образование',
      'Госсектор',
      'Наружная реклама',
      'Другое',
    ],
  },
  footer: {
    directionsTitle: 'Направления',
    contactsTitle: 'Контакты',
    privacy: 'Политика обработки персональных данных',
    requisites: company.requisites,
  },
  whatsappFabLabel: 'Написать в WhatsApp',
  menuOpen: 'Открыть меню',
  menuClose: 'Закрыть меню',
};

export const niches: NicheDictionary = {
  labels: {
    horeca: 'HoReCa',
    auto: 'Авто',
    medicine: 'Медицина',
    logistics: 'Логистика',
    outdoor: 'Наружная реклама',
    gov: 'Госсектор',
    education: 'Образование',
    services: 'Услуги',
  },
};
