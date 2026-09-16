'use client';

import { useState } from 'react';
import { FAQ, HERO_PLAN, SITE } from '@/lib/content';
import CallButton from '@/components/primitives/CallButton';
import Reveal, { RevealText } from '@/components/primitives/Reveal';

function Item({
  q,
  a,
  index,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white transition-all duration-400 ease-brand ${
        open
          ? 'border-fidium/40 shadow-card'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
        >
          <span className="text-[0.96rem] font-bold leading-snug tracking-[-0.01em] text-ink sm:text-[1.02rem]">
            {q}
          </span>

          <span
            aria-hidden="true"
            className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-400 ease-brand ${
              open ? 'grad-brand text-white' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <span className="absolute h-[2.5px] w-3.5 rounded-full bg-current" />
            <span
              className={`absolute h-[2.5px] w-3.5 rounded-full bg-current transition-transform duration-400 ease-brand ${
                open ? 'rotate-0' : 'rotate-90'
              }`}
            />
          </span>
        </button>
      </h3>

      <div className="acc-panel" data-open={open ? '1' : '0'}>
        <div className="acc-inner">
          <div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="px-5 pb-5 sm:px-6 sm:pb-6"
          >
            <p className="border-t border-slate-100 pt-4 text-[0.9rem] leading-[1.72] text-slate-600">
              {a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-slate-50/70 py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* --------------------------------------------------- intro */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Reveal y={14}>
              <span className="eyebrow rounded-full border border-fidium/25 bg-fidium/8 px-3 py-1.5 text-fidium-600">
                FAQ
              </span>
            </Reveal>

            <h2 className="h-section mt-4 text-ink">
              <RevealText as="span" text="Questions worth asking" stagger={32} />
            </h2>

            <Reveal delay={140} y={16}>
              <p className="body-lg mt-4 max-w-[30rem] text-slate-600">
                Hardware, installation and speeds, answered plainly. If something
                here is not covered, the fastest route is a short phone call.
              </p>
            </Reveal>

            <Reveal delay={220} y={16}>
              <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <p className="text-[0.95rem] font-bold text-ink">
                  Still deciding on a speed?
                </p>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-slate-600">
                  We will size the plan around how your household actually uses
                  the connection.
                </p>

                <CallButton
                  plan={HERO_PLAN}
                  variant="primary"
                  source="faq"
                  fullWidth
                  className="mt-5"
                />

                <p className="mt-3 text-center text-[0.76rem] font-semibold text-slate-500">
                  {SITE.phoneDisplay}
                </p>
              </div>
            </Reveal>
          </div>

          {/* ----------------------------------------------- accordion */}
          <div className="flex flex-col gap-3">
            {FAQ.map((item, i) => (
              <Reveal key={item.q} delay={i * 55} y={20} className="min-w-0">
                <Item
                  q={item.q}
                  a={item.a}
                  index={i}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
