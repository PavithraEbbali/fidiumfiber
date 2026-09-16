import Image from 'next/image';
import {
  FINE_PRINT,
  FINE_PRINT_ROWS,
  formatSpeed,
  plansFor,
} from '@/lib/content';
import { IMAGES, imageSrc } from '@/lib/images';
import { hasImage } from '@/lib/images.server';
import Reveal, { RevealText } from '@/components/primitives/Reveal';
import PriceLockup from '@/components/primitives/PriceLockup';
import CallButton from '@/components/primitives/CallButton';

/**
 * Hardware, fees and inclusions for every tier.
 *
 * Both the desktop table and the mobile stack read the same FINE_PRINT_ROWS
 * accessors against the same PLANS array, so the two views can never drift and
 * neither needs editing when pricing changes.
 */
export function FinePrint() {
  // Fiber tiers only — this table compares speeds and hardware.
  const PLANS = plansFor('fiber');

  return (
    <section id="hardware" className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-[46rem] text-center">
          <Reveal y={14}>
            <span className="eyebrow rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-slate-600">
              {FINE_PRINT.eyebrow}
            </span>
          </Reveal>

          <h2 className="h-section mt-4 text-ink">
            <RevealText as="span" text={FINE_PRINT.heading} stagger={30} />
          </h2>

          <Reveal delay={140} y={16}>
            <p className="body-lg mx-auto mt-4 max-w-[40rem] text-slate-600">
              {FINE_PRINT.subheading}
            </p>
          </Reveal>
        </div>

        {/* Equipment band — renders only once the file is in public/images/ */}
        {hasImage('gateway') ? (
          <Reveal delay={160} y={26} className="mt-12">
            <div className="grid items-center gap-8 rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12">
              <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
                <Image
                  src={imageSrc('gateway')}
                  alt={IMAGES.gateway.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover object-center"
                />
              </figure>

              <div className="min-w-0">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Equipment
                </p>
                <h3 className="mt-2.5 text-[1.3rem] font-extrabold leading-snug tracking-[-0.025em] text-ink sm:text-[1.5rem]">
                  The gateway is included, not a line item
                </h3>
                <p className="mt-3 text-[0.92rem] leading-[1.7] text-slate-600">
                  Gig and faster plans ship with a managed whole-home WiFi
                  gateway. The 5 Gig and 8 Gig tiers add WiFi 7 and extenders for
                  full-house coverage. If you would rather use hardware you
                  already own, bringing your own router is supported.
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {['No rental fee', 'Professionally installed', 'App controls'].map(
                    (item) => (
                      <li key={item}>
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
                          {item}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </Reveal>
        ) : null}

        {/* ------------------------------------------------ desktop table */}
        <Reveal delay={160} y={26} className="mt-11 hidden lg:block">
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-card">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Monthly price, speeds, equipment, data policy and term for every
                Fidium Fiber plan
              </caption>

              <thead>
                <tr className="bg-slate-50">
                  <th
                    scope="col"
                    className="w-[19%] border-b border-slate-200 px-5 py-5 align-bottom text-[0.72rem] font-bold uppercase tracking-[0.13em] text-slate-400"
                  >
                    Plan detail
                  </th>

                  {PLANS.map((plan) => (
                    <th
                      key={plan.id}
                      scope="col"
                      className={`border-b border-l border-slate-200 px-4 py-5 align-bottom ${
                        plan.isPopular ? 'bg-fidium/6' : ''
                      }`}
                    >
                      <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-slate-400">
                        {plan.audience}
                      </span>
                      <span className="mt-1 block text-[1.15rem] font-extrabold tracking-[-0.03em] text-ink">
                        {formatSpeed(plan.speedDown)}
                      </span>
                      <PriceLockup
                        plan={plan}
                        size="sm"
                        showPromo={false}
                        className="mt-2.5"
                      />
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {FINE_PRINT_ROWS.map((row, r) => (
                  <tr key={row.label} className={r % 2 ? 'bg-slate-50/55' : 'bg-white'}>
                    <th
                      scope="row"
                      className="border-b border-slate-100 px-5 py-4 align-top"
                    >
                      <span className="block text-[0.86rem] font-bold text-ink">
                        {row.label}
                      </span>
                      {row.hint ? (
                        <span className="mt-0.5 block text-[0.72rem] font-medium text-slate-400">
                          {row.hint}
                        </span>
                      ) : null}
                    </th>

                    {PLANS.map((plan) => (
                      <td
                        key={plan.id}
                        className={`border-b border-l border-slate-100 px-4 py-4 align-top text-[0.85rem] font-semibold leading-snug text-slate-700 ${
                          plan.isPopular ? 'bg-fidium/4' : ''
                        }`}
                      >
                        {row.value(plan)}
                      </td>
                    ))}
                  </tr>
                ))}

                <tr>
                  <td className="px-5 py-5" />
                  {PLANS.map((plan) => (
                    <td
                      key={plan.id}
                      className={`border-l border-slate-100 px-4 py-5 align-top ${
                        plan.isPopular ? 'bg-fidium/4' : ''
                      }`}
                    >
                      <CallButton
                        plan={plan}
                        variant={plan.isPopular ? 'primary' : 'ghost'}
                        source={`table-${plan.id}`}
                        fullWidth
                        magnetic={false}
                        showIcon={false}
                        className="!px-3 !py-2.5 !text-[0.78rem]"
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* ------------------------------------------------- mobile stack */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 70} y={24} className="min-w-0">
              <div
                className={`h-full overflow-hidden rounded-2xl border bg-white shadow-card ${
                  plan.isPopular ? 'border-fidium/45' : 'border-slate-200'
                }`}
              >
                <div
                  className={`flex items-center justify-between gap-3 px-5 py-4 ${
                    plan.isPopular ? 'bg-fidium/8' : 'bg-slate-50'
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-[0.66rem] font-bold uppercase tracking-[0.12em] text-slate-400">
                      {plan.audience}
                    </p>
                    <p className="mt-0.5 text-[1.1rem] font-extrabold tracking-[-0.03em] text-ink">
                      {formatSpeed(plan.speedDown)}
                    </p>
                  </div>
                  <PriceLockup plan={plan} size="sm" showPromo={false} />
                </div>

                <dl className="divide-y divide-slate-100">
                  {FINE_PRINT_ROWS.map((row) => (
                    <div
                      key={row.label}
                      // Wrapping keeps the label at full width: when a long
                      // value cannot sit beside it, the value drops to its own
                      // line instead of squeezing the label to nothing.
                      className="flex flex-wrap items-start justify-between gap-x-4 px-5 py-3"
                    >
                      <dt className="shrink-0 text-[0.8rem] font-semibold text-slate-500">
                        {row.label}
                      </dt>
                      <dd className="min-w-0 grow text-right text-[0.8rem] font-bold leading-snug text-ink">
                        {row.value(plan)}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="px-5 pb-5 pt-4">
                  <CallButton
                    plan={plan}
                    variant={plan.isPopular ? 'primary' : 'ghost'}
                    source={`table-mobile-${plan.id}`}
                    fullWidth
                    magnetic={false}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} y={14}>
          <p className="mx-auto mt-8 max-w-[52rem] text-center text-[0.76rem] leading-[1.7] text-slate-400">
            {FINE_PRINT.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default FinePrint;
