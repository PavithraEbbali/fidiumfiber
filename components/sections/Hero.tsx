'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  CTA,
  HERO,
  HERO_PLAN,
  MARQUEE_ITEMS,
  formatSpeed,
} from '@/lib/content';
import { IMAGES, imageSrc } from '@/lib/images';
import { useParallax } from '@/lib/hooks';
import PriceLockup from '@/components/primitives/PriceLockup';
import CallButton from '@/components/primitives/CallButton';
import Marquee from '@/components/primitives/Marquee';
import Reveal, { RevealText } from '@/components/primitives/Reveal';

/* -------------------------------------------------------------------------- */
/*  ZIP availability checker                                                  */
/* -------------------------------------------------------------------------- */
/*  Front-end only: it validates the ZIP format and routes the visitor to the  */
/*  sales line. No network request, no backend, no data stored.                */
/* -------------------------------------------------------------------------- */

function ZipChecker() {
  const [zip, setZip] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'ok'>('idle');

  const valid = /^\d{5}$/.test(zip.trim());

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) {
      setStatus('error');
      return;
    }
    setStatus('ok');
  };

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} noValidate className="w-full">
        <label htmlFor="zip" className="sr-only">
          {HERO.zipPlaceholder}
        </label>

        <div
          className={`flex flex-col gap-2 rounded-2xl border-2 bg-white p-2 shadow-card transition-colors duration-300 sm:flex-row sm:items-center sm:rounded-full ${
            status === 'error' ? 'border-promo/60' : 'border-slate-200'
          }`}
        >
          <div className="flex flex-1 items-center gap-2.5 px-3 py-1.5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0 text-fidium"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>

            <input
              id="zip"
              name="zip"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder={HERO.zipPlaceholder}
              value={zip}
              onChange={(e) => {
                setZip(e.target.value.replace(/\D/g, '').slice(0, 5));
                setStatus('idle');
              }}
              aria-invalid={status === 'error'}
              aria-describedby="zip-help"
              className="w-full min-w-0 bg-transparent text-left text-[1rem] font-semibold text-ink outline-none placeholder:font-medium placeholder:text-slate-400"
            />
          </div>

          <button type="submit" className="btn-primary shrink-0 sm:!px-6">
            {CTA.zip}
          </button>
        </div>
      </form>

      <div id="zip-help" aria-live="polite" className="mt-2.5 min-h-[20px] px-1">
        {status === 'idle' ? (
          <p className="text-[0.78rem] font-semibold text-slate-700">
            {HERO.zipHelper}
          </p>
        ) : null}

        {status === 'error' ? (
          <p className="text-[0.78rem] font-semibold text-promo">
            Enter a 5-digit ZIP code to continue.
          </p>
        ) : null}

        {status === 'ok' ? (
          <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-fidium/30 bg-fidium/6 p-3.5 text-left">
            <p className="min-w-0 flex-1 text-[0.82rem] font-semibold leading-snug text-fidium-700">
              Checking {zip}. One call confirms which plans are available at your
              address.
            </p>
            <CallButton
              plan={HERO_PLAN}
              variant="primary"
              source="zip-result"
              magnetic={false}
              className="!px-4 !py-2.5 !text-[0.82rem]"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export function Hero({ hasHeroImage = false }: { hasHeroImage?: boolean }) {
  const parallaxRef = useParallax<HTMLDivElement>(48);

  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      {/*
        Parallax background stack.

        This layer must NOT use a negative z-index. The section is
        `position: relative` with `z-index: auto`, so it does not create a
        stacking context — a `-z-10` child would paint behind the section's own
        opaque `bg-white` and disappear entirely. Instead both layers are
        positioned and ordered explicitly: background at z-0, content at z-10.
      */}
      <div
        ref={parallaxRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{ transform: 'translate3d(0, var(--py, 0px), 0)' }}
      >
        {hasHeroImage ? (
          <>
            {/*
              The photograph carries no wash. Legibility is handled on the text
              side instead: the eyebrow sits on a solid pill and the supporting
              copy runs at slate-700. Measured against this image the headline
              reads 10.1:1 and the sub-copy 6.5:1, both clear of WCAG AA.

              `priority` because this is the LCP element; `sizes="100vw"` so
              Next serves a width-appropriate file.
            */}
            <Image
              src={imageSrc('hero')}
              alt={IMAGES.hero.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[68%_46%] sm:object-[60%_50%] lg:object-center"
            />

            {/* No white wash over the photograph — it shows at full strength. */}
          </>
        ) : (
          <>
            <div className="absolute inset-0 grid-lines opacity-[0.55]" />
            {/* Decorative colour wash, only when there is no photograph to show. */}
            <div className="absolute -left-40 -top-32 h-[520px] w-[520px] rounded-full bg-lime/18 blur-[110px]" />
            <div className="absolute -right-32 top-24 h-[440px] w-[440px] rounded-full bg-fidium/16 blur-[110px]" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
          </>
        )}
      </div>

      <div className="container-x relative z-10">
        <div className="mx-auto flex max-w-[46rem] flex-col items-center py-10 text-center sm:py-16 lg:py-20">
          <Reveal y={14}>
            <span className="eyebrow rounded-full border border-fidium/30 bg-white px-3 py-1.5 text-fidium-600 shadow-[0_1px_3px_rgba(11,18,32,0.08)]">
              <span className="relative inline-flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-fidium animate-pulseRing" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fidium" />
              </span>
              {HERO.eyebrow}
            </span>
          </Reveal>

          <h1 className="h-display mt-4 text-ink sm:mt-5">
            <RevealText as="span" text={HERO.h1a} stagger={38} />
            <span className="block">
              <RevealText
                as="span"
                text={HERO.h1b}
                stagger={38}
                delay={HERO.h1a.split(' ').length * 38}
                gradient
              />
            </span>
          </h1>

          <Reveal delay={180} y={18}>
            <p className="body-lg mt-4 max-w-[38rem] font-medium text-slate-700 sm:mt-5">
              {HERO.subline}
            </p>
          </Reveal>

          {/* --------------------------------------------- price anchor */}
          <Reveal delay={260} y={18}>
            <div className="mt-6 inline-flex flex-wrap items-end justify-center gap-x-6 gap-y-4 rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 shadow-card backdrop-blur-sm sm:mt-8 sm:px-6 sm:py-5">
              <div className="text-left">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                  {HERO_PLAN.audience}
                </p>
                <p className="mt-1 text-[0.98rem] font-extrabold text-ink">
                  {formatSpeed(HERO_PLAN.speedDown)}
                  <span className="ml-1.5 text-[0.82rem] font-semibold text-slate-500">
                    up &amp; down
                  </span>
                </p>
              </div>

              <span
                aria-hidden="true"
                className="hidden h-12 w-px bg-slate-200 sm:block"
              />

              <PriceLockup plan={HERO_PLAN} size="lg" className="text-left" />
            </div>
          </Reveal>

          {/* --------------------------------- zip + call, side by side */}
          <Reveal delay={340} y={18} className="w-full">
            <div className="mx-auto mt-6 w-full max-w-[34rem] sm:mt-8">
              <ZipChecker />
            </div>
          </Reveal>

          {/* ---------------------------------------------- trust chips */}
          <Reveal delay={420} y={16}>
            <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8">
              {HERO.trustChips.map((chip) => (
                <li key={chip}>
                  <span className="chip">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="text-fidium"
                    >
                      <path d="m20 6-11 11-5-5" />
                    </svg>
                    {chip}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

        </div>
      </div>

      {/* Trust ticker */}
      <div className="relative z-10 border-y border-slate-200/80 bg-slate-50/70 py-3.5">
        <Marquee items={MARQUEE_ITEMS} duration={42} />
      </div>
    </section>
  );
}

export default Hero;
