'use client';

import { useEffect, useRef } from 'react';

interface SectionWipeProps {
  /** Colour the wipe reveals — should match the section that follows. */
  to: 'ink' | 'white' | 'slate';
  /** Colour the wipe leaves behind — should match the section above. */
  from?: 'ink' | 'white' | 'slate';
  /** Draws animated fiber strands across the transition. */
  strands?: boolean;
}

const FILL: Record<string, string> = {
  ink: '#0B1220',
  white: '#FFFFFF',
  slate: '#F8FAFC',
};

/**
 * Clip-path wipe between two major sections.
 *
 * As the divider enters the viewport its clip-path opens from a diagonal edge,
 * so the incoming section appears to sweep across the outgoing one. Optional
 * fiber strands draw themselves along the seam.
 */
export function SectionWipe({ to, from = 'white', strands = true }: SectionWipeProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative h-16 w-full overflow-hidden sm:h-20"
      style={{ background: FILL[from] }}
    >
      {/* The incoming surface, revealed by the clip-path sweep */}
      <div
        className="wipe-diagonal absolute inset-0"
        style={{ background: FILL[to] }}
      />

      {strands ? (
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id={`strand-${to}-${from}`} x1="0" y1="0" x2="1200" y2="0">
              <stop offset="0%" stopColor="#00AE42" stopOpacity="0" />
              <stop offset="35%" stopColor="#00AE42" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#93D500" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#93D500" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[
            { d: 'M0 58 C 300 58, 380 20, 640 20 S 980 54, 1200 54', w: 2, delay: 0 },
            { d: 'M0 70 C 340 70, 420 38, 700 38 S 1010 66, 1200 66', w: 1.4, delay: 220 },
          ].map((s, i) => (
            <path
              key={i}
              d={s.d}
              stroke={`url(#strand-${to}-${from})`}
              strokeWidth={s.w}
              strokeLinecap="round"
              fill="none"
              className="path-draw"
              style={
                { '--len': '1500', '--draw-d': `${s.delay}ms` } as React.CSSProperties
              }
            />
          ))}
        </svg>
      ) : null}
    </div>
  );
}

export default SectionWipe;
