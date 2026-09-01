import { OG_SIZE, ogCard } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = "L'aime Agency — маркетинг, который заканчивается заявкой";

export default function Image() {
  return ogCard({
    label: 'Агентство · Астана',
    title: 'Маркетинг, который заканчивается заявкой, а не отчётом об охватах',
  });
}
