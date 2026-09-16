import { CTA, type PlanItem } from '@/lib/content';

type Size = 'sm' | 'md' | 'lg';

const SIZES: Record<Size, { dollar: string; int: string; cents: string; term: string }> = {
  sm: {
    dollar: 'text-[1.05rem] mt-[0.32em]',
    int: 'text-[2.5rem]',
    cents: 'text-[0.95rem]',
    term: 'text-[0.78rem]',
  },
  md: {
    dollar: 'text-[1.2rem] mt-[0.36em]',
    int: 'text-[3rem]',
    cents: 'text-[1.02rem]',
    term: 'text-[0.82rem]',
  },
  lg: {
    dollar: 'text-[1.35rem] mt-[0.4em]',
    int: 'text-[3.5rem]',
    cents: 'text-[1.1rem]',
    term: 'text-[0.88rem]',
  },
};

interface PriceLockupProps {
  plan: PlanItem;
  size?: Size;
  /** Renders light-on-dark. */
  onDark?: boolean;
  /** Shows the promo strip ("+ 1 month free") beneath the figure. */
  showPromo?: boolean;
  className?: string;
}

/**
 * The single price renderer for the entire site.
 *
 * Every dollar figure — hero anchor, plan card, comparison table header — comes
 * through here, reading straight off the PlanItem. Change a price in
 * lib/content.ts and every lockup on the page follows.
 */
export function PriceLockup({
  plan,
  size = 'md',
  onDark = false,
  showPromo = true,
  className = '',
}: PriceLockupProps) {
  const s = SIZES[size];
  const hasPrice = typeof plan.price === 'number';

  // No published price: the CTA language changes, so the lockup must too.
  if (!hasPrice) {
    return (
      <div className={className}>
        <div
          className={`font-extrabold tracking-[-0.03em] ${
            onDark ? 'text-white' : 'text-ink'
          } text-[1.5rem] leading-none`}
        >
          {CTA.pricing}
        </div>
        <p
          className={`mt-2 ${s.term} font-medium ${
            onDark ? 'text-white/65' : 'text-slate-500'
          }`}
        >
          Availability and rates vary by address.
        </p>
      </div>
    );
  }

  const cents = plan.cents ?? '00';

  return (
    <div className={className}>
      <div className="flex items-start gap-1">
        <span
          className={`${s.dollar} font-bold leading-none ${
            onDark ? 'text-lime' : 'text-fidium-600'
          }`}
          aria-hidden="true"
        >
          $
        </span>

        <span
          className={`${s.int} font-extrabold leading-[0.82] tracking-[-0.045em] ${
            onDark ? 'text-white' : 'text-ink'
          }`}
        >
          {plan.price}
        </span>

        <span
          className={`${s.cents} mt-[0.3em] font-semibold leading-none ${
            onDark ? 'text-white/60' : 'text-slate-400'
          }`}
          aria-hidden="true"
        >
          {cents}
        </span>

        <span
          className={`${s.term} mt-[0.95em] ml-1 font-semibold leading-none ${
            onDark ? 'text-white/70' : 'text-slate-500'
          }`}
        >
          /mo
        </span>

        {/* Accessible equivalent of the visual lockup. */}
        <span className="sr-only">
          {`$${plan.price}.${cents} per month`}
        </span>
      </div>

      {showPromo && plan.promoHeadline ? (
        <div className="mt-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-promo/10 px-3 py-1 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-promo">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />
            </svg>
            {plan.promoHeadline}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export default PriceLockup;
