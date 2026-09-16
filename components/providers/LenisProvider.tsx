'use client';

import { useEffect } from 'react';

/**
 * Lenis smooth scrolling.
 *
 * Loaded dynamically after hydration so it never blocks first paint or lands in
 * the critical bundle. Disabled outright when the visitor prefers reduced
 * motion, and on coarse pointers where native momentum scrolling already feels
 * better than any JS substitute.
 */
export function LenisProvider() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || coarse) return;

    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let cancelled = false;

    import('lenis')
      .then(({ default: Lenis }) => {
        if (cancelled) return;

        const instance = new Lenis({
          duration: 1.05,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.6,
          autoResize: true,
        });

        lenis = instance as unknown as typeof lenis;

        const loop = (time: number) => {
          instance.raf(time);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        // Anchor links must route through Lenis to stay smooth.
        const onClick = (e: MouseEvent) => {
          const target = (e.target as HTMLElement | null)?.closest?.(
            'a[href^="#"]'
          ) as HTMLAnchorElement | null;
          if (!target) return;

          const hash = target.getAttribute('href');
          if (!hash || hash === '#') return;

          const el = document.querySelector(hash);
          if (!el) return;

          e.preventDefault();
          instance.scrollTo(el as HTMLElement, { offset: -88, duration: 1.15 });
          history.replaceState(null, '', hash);
        };

        document.addEventListener('click', onClick);
        (instance as unknown as { __onClick?: typeof onClick }).__onClick = onClick;
      })
      .catch(() => {
        /* Smooth scroll is an enhancement; native scrolling still works. */
      });

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      const withHandler = lenis as unknown as {
        __onClick?: (e: MouseEvent) => void;
      } | null;
      if (withHandler?.__onClick) {
        document.removeEventListener('click', withHandler.__onClick);
      }
      lenis?.destroy();
    };
  }, []);

  return null;
}

export default LenisProvider;
