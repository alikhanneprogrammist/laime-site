import type { CaseStudy, Service } from '@/content/types';
import { cases } from '@/content/ru/cases';
import { services } from '@/content/ru/services';

/*
 * Единственная точка доступа к контенту: при переходе на CMS
 * меняются только эти функции, страницы остаются как есть.
 */

export function getCases(): CaseStudy[] {
  return cases;
}

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

export function getServices(): Service[] {
  return services;
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
