import type { MetadataRoute } from 'next';
import { getCases, getServices } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/services', '/booking-os', '/cases', '/about', '/contacts', '/privacy'];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.7,
    })),
    ...getServices().map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...getCases().map((caseStudy) => ({
      url: `${SITE_URL}/cases/${caseStudy.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
