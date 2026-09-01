import { OG_SIZE, ogCard } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Booking OS — система бронирований';

export default function Image() {
  return ogCard({
    label: 'Продукт',
    title: 'Booking OS — брони без тетрадей и потерянных предоплат',
    accent: 'Выручка +40%',
  });
}
