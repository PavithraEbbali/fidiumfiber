'use client';

import React, { useEffect, useRef } from 'react';

type As = 'div' | 'section' | 'span' | 'li' | 'article' | 'header' | 'footer';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Milliseconds of entrance delay — used to stagger grids. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  /** Entrance scale, e.g. 0.96. */
  scale?: number;
  as?: As;
  threshold?: number;
  id?: string;
}

/**
 * Entrance animation driven by a single IntersectionObserver plus a CSS
 * transition. No animation library, no layout thrash, no bundle cost.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
  scale,
  as = 'div',
  threshold = 0.12,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.setAttribute('data-reveal', 'is-in');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-reveal', 'is-in');
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      className={className}
      style={
        {
          '--reveal-d': `${delay}ms`,
          '--reveal-y': `${y}px`,
          ...(scale ? { '--reveal-s': String(scale) } : {}),
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/*  Word-by-word text reveal                                                  */
/* -------------------------------------------------------------------------- */

interface RevealTextProps {
  text: string;
  className?: string;
  /** Per-word stagger in ms. */
  stagger?: number;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  /** Renders the words in the brand gradient. */
  gradient?: boolean;
}

export function RevealText({
  text,
  className = '',
  stagger = 42,
  delay = 0,
  as = 'span',
  gradient = false,
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.setAttribute('data-reveal', 'is-in');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-reveal', 'is-in');
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  /**
   * Gradient text and per-word transforms cannot share an element tree:
   * `background-clip: text` on a parent repaints incorrectly once a descendant
   * is transformed, which smears the words together. So each word carries its
   * own gradient, and we stretch that gradient across the full line and offset
   * it per word — the ramp stays continuous and every word stays transformable.
   */
  useEffect(() => {
    const el = ref.current;
    if (!el || !gradient) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const lineRect = el.getBoundingClientRect();
      if (!lineRect.width) return;

      el.querySelectorAll<HTMLElement>('.reveal-word').forEach((word) => {
        const r = word.getBoundingClientRect();
        word.style.setProperty('--bg-w', `${Math.round(lineRect.width)}px`);
        word.style.setProperty('--bg-x', `${Math.round(lineRect.x - r.x)}px`);
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();

    // Fonts land after first paint and change every word's width.
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(schedule).catch(() => {});
    }

    const ro = new ResizeObserver(schedule);
    ro.observe(el);

    return () => {
      ro.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [gradient, text]);

  const Tag = as as React.ElementType;
  const words = text.split(' ');

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={`reveal-line ${className}`}
      style={{ opacity: 1, transform: 'none' } as React.CSSProperties}
    >
      {/* The visible text is the real text — screen readers get it verbatim. */}
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`reveal-word ${gradient ? 'grad-word' : ''}`}
          style={{ '--w-delay': `${delay + i * stagger}ms` } as React.CSSProperties}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}

export default Reveal;
