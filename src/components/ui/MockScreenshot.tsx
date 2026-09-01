import styles from './MockScreenshot.module.css';

type MockKind = 'stats' | 'calendar' | 'feed' | 'crm';

interface MockScreenshotProps {
  kind: MockKind;
  alt: string;
}

/**
 * SVG-мок интерфейса в стиле дизайн-системы — заглушка до реальных
 * скриншотов (ТЗ §8.6: реальные интерфейсы, персональные данные размыты).
 * Рамка устройства без «дизайнерских» подложек.
 */
export function MockScreenshot({ kind, alt }: MockScreenshotProps) {
  return (
    <figure className={styles.frame}>
      <svg
        viewBox="0 0 640 420"
        role="img"
        aria-label={alt}
        className={styles.svg}
        width={640}
        height={420}
      >
        <rect width="640" height="420" fill="#121714" />
        <rect x="0" y="0" width="640" height="44" fill="#0B0F0D" />
        <circle cx="22" cy="22" r="5" fill="rgba(242,241,237,.2)" />
        <circle cx="40" cy="22" r="5" fill="rgba(242,241,237,.2)" />
        <circle cx="58" cy="22" r="5" fill="rgba(242,241,237,.2)" />
        <rect x="90" y="15" width="180" height="14" rx="3" fill="rgba(242,241,237,.12)" />
        {kind === 'calendar' && <CalendarMock />}
        {kind === 'stats' && <StatsMock />}
        {kind === 'feed' && <FeedMock />}
        {kind === 'crm' && <CrmMock />}
      </svg>
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}

function CalendarMock() {
  const cells = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 7; col++) {
      cells.push(
        <rect
          key={`${row}-${col}`}
          x={32 + col * 84}
          y={92 + row * 76}
          width={72}
          height={64}
          rx={4}
          fill={row === 1 && col === 3 ? '#C4F04C' : 'rgba(242,241,237,.06)'}
          stroke="rgba(242,241,237,.1)"
        />,
      );
    }
  }
  return (
    <>
      <rect x="32" y="60" width="140" height="16" rx="3" fill="rgba(242,241,237,.25)" />
      {cells}
      <rect x="46" y="182" width="44" height="8" rx="2" fill="#0B0F0D" />
      <rect x="130" y="106" width="44" height="8" rx="2" fill="rgba(242,241,237,.3)" />
      <rect x="298" y="258" width="44" height="8" rx="2" fill="rgba(242,241,237,.3)" />
      <rect x="466" y="334" width="44" height="8" rx="2" fill="rgba(242,241,237,.3)" />
    </>
  );
}

function StatsMock() {
  const bars = [120, 88, 150, 96, 180, 210, 168, 250, 232, 290];
  return (
    <>
      <rect x="32" y="64" width="180" height="16" rx="3" fill="rgba(242,241,237,.25)" />
      <rect x="32" y="96" width="90" height="30" rx="3" fill="rgba(242,241,237,.1)" />
      <rect x="136" y="96" width="90" height="30" rx="3" fill="rgba(242,241,237,.1)" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={40 + i * 58}
          y={380 - h}
          width={36}
          height={h}
          rx={3}
          fill={i === bars.length - 1 ? '#C4F04C' : 'rgba(242,241,237,.18)'}
        />
      ))}
      <line x1="32" y1="380" x2="608" y2="380" stroke="rgba(242,241,237,.15)" />
    </>
  );
}

function FeedMock() {
  return (
    <>
      {[0, 1, 2].map((col) => (
        <g key={col}>
          <rect x={32 + col * 200} y={70} width={184} height={230} rx={4} fill="rgba(242,241,237,.08)" />
          <rect x={48 + col * 200} y={314} width={120} height={10} rx={2} fill="rgba(242,241,237,.2)" />
          <rect x={48 + col * 200} y={334} width={80} height={8} rx={2} fill="rgba(242,241,237,.12)" />
        </g>
      ))}
      <rect x="32" y="370" width="100" height="10" rx="2" fill="#C4F04C" />
    </>
  );
}

function CrmMock() {
  return (
    <>
      {[0, 1, 2, 3].map((col) => (
        <g key={col}>
          <rect x={32 + col * 150} y={64} width={134} height={14} rx={3} fill="rgba(242,241,237,.22)" />
          {[0, 1, 2].map((row) => (
            <rect
              key={row}
              x={32 + col * 150}
              y={94 + row * 74}
              width={134}
              height={62}
              rx={4}
              fill={col === 0 && row === 0 ? 'rgba(196,240,76,.16)' : 'rgba(242,241,237,.07)'}
              stroke="rgba(242,241,237,.1)"
            />
          ))}
        </g>
      ))}
    </>
  );
}
