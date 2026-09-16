import React from 'react';

interface MarqueeProps {
  items: string[];
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  onDark?: boolean;
  className?: string;
}

function Dot({ onDark }: { onDark: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`mx-5 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
        onDark ? 'bg-lime' : 'bg-fidium/60'
      }`}
    />
  );
}

/**
 * Infinite ticker. The track holds the item list twice and translates -50%, so
 * the loop is seamless. Pure CSS — no scroll listener, no JS per frame.
 */
export function Marquee({
  items,
  duration = 38,
  reverse = false,
  onDark = false,
  className = '',
}: MarqueeProps) {
  const run = [...items, ...items];

  return (
    <div
      className={`marquee-mask relative overflow-hidden ${
        reverse ? 'marquee-reverse' : ''
      } ${className}`}
      style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
    >
      <div className="marquee-track" aria-hidden="true">
        {run.map((item, i) => (
          <div key={`${item}-${i}`} className="flex shrink-0 items-center">
            <span
              className={`whitespace-nowrap text-[0.82rem] font-bold uppercase tracking-[0.13em] ${
                onDark ? 'text-white/75' : 'text-slate-600'
              }`}
            >
              {item}
            </span>
            <Dot onDark={onDark} />
          </div>
        ))}
      </div>

      {/* Screen readers get the list once, not the duplicated track. */}
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Marquee;
