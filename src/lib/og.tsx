import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const OG_SIZE = { width: 1200, height: 630 };

interface OgCardProps {
  label: string;
  title: string;
  /** Одна крупная цифра/метрика — единственный лаймовый акцент карточки. */
  accent?: string;
}

/** Единый шаблон OG-изображений: Ink-фон, Unbounded, один lime-акцент. */
export async function ogCard({ label, title, accent }: OgCardProps): Promise<ImageResponse> {
  const fontData = await readFile(
    path.join(process.cwd(), 'src', 'fonts', 'unbounded-600.woff'),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          backgroundColor: '#0B0F0D',
          color: '#F2F1ED',
          fontFamily: 'Unbounded',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 28,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(242,241,237,0.4)',
          }}
        >
          <span>L&apos;aime</span>
          <span>{label}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {accent && <div style={{ fontSize: 88, color: '#C4F04C' }}>{accent}</div>}
          <div style={{ fontSize: accent ? 44 : 64, lineHeight: 1.1, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: 'Unbounded', data: fontData, style: 'normal', weight: 600 }],
    },
  );
}
