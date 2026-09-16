'use client';

import { formatSpeed, type PlanItem } from '@/lib/content';
import { useTilt } from '@/lib/hooks';
import PriceLockup from '@/components/primitives/PriceLockup';
import CallButton from '@/components/primitives/CallButton';

function Check() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-[3px] shrink-0 text-fidium"
    >
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

/**
 * A single plan card. Every value shown here is read off the PlanItem, so a
 * price or feature change in lib/content.ts propagates with no edit to this file.
 */
export function PlanCard({ plan }: { plan: PlanItem }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLDivElement>(6);

  return (
    <div className="tilt-scene h-full">
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        data-active="0"
        className={`tilt-body relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-shadow sm:p-7 ${
          plan.isPopular
            ? 'border-fidium/45 shadow-pop'
            : 'border-slate-200 shadow-card hover:shadow-cardHover'
        }`}
      >
        <span className="tilt-sheen" aria-hidden="true" />

        {plan.isPopular ? (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 grad-brand"
          />
        ) : null}

        {/* ------------------------------------------------------ header */}
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-slate-400">
              {plan.audience}
            </p>
            {/*
              Speed-tier plans lead with the speed. A service without one — the
              home phone add-on — leads with its name instead, so the card never
              renders an empty heading.
            */}
            <h3 className="mt-1.5 text-[1.5rem] font-extrabold leading-tight tracking-[-0.035em] text-ink">
              {formatSpeed(plan.speedDown) || plan.name}
            </h3>
            {plan.speedUp ? (
              <p className="mt-2 text-[0.8rem] font-semibold text-slate-500">
                {formatSpeed(plan.speedUp)} upload · symmetrical
              </p>
            ) : (
              <p className="mt-2 text-[0.8rem] font-semibold text-slate-500">
                Runs over your fiber connection
              </p>
            )}
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1.5">
            {plan.isPopular ? (
              <span className="rounded-full grad-brand px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.1em] text-white">
                Best value
              </span>
            ) : null}
            {plan.badge ? (
              <span className="rounded-full border border-navy/25 bg-navy/6 px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.1em] text-navy">
                {plan.badge}
              </span>
            ) : null}
          </div>
        </div>

        {/* ------------------------------------------------------- price */}
        <div className="relative mt-6 border-y border-slate-100 py-5">
          <PriceLockup plan={plan} size="md" />
        </div>

        {/* ------------------------------------------------------- blurb */}
        {plan.blurb ? (
          <p className="relative mt-5 text-[0.88rem] leading-[1.65] text-slate-600">
            {plan.blurb}
          </p>
        ) : null}

        {/* ---------------------------------------------------- features */}
        <ul className="relative mt-5 flex flex-1 flex-col gap-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-2.5 text-[0.86rem] leading-[1.5] text-slate-700">
              <Check />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* --------------------------------------------------------- cta */}
        <div className="relative mt-7 tilt-lift">
          <CallButton
            plan={plan}
            variant={plan.isPopular ? 'primary' : 'ghost'}
            source={`plan-${plan.id}`}
            fullWidth
            magnetic={false}
          />

          {plan.promoQualifier ? (
            <p className="mt-3 text-[0.7rem] leading-[1.5] text-slate-400">
              {plan.promoQualifier}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PlanCard;
