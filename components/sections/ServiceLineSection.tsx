import {
  ACTIVE_SERVICE_SECTIONS,
  ENTRY_PLAN,
  SERVICE_STATES,
  formatPrice,
  plansFor,
  type ServiceSectionConfig,
} from '@/lib/content';
import Reveal, { RevealText } from '@/components/primitives/Reveal';
import PlanCard from '@/components/sections/PlanCard';

function ServiceLine({ config }: { config: ServiceSectionConfig }) {
  const plans = plansFor(config.line);

  // A service line with no plans never renders. Nothing is stubbed out.
  if (plans.length === 0) return null;

  return (
    <div className="mt-16 first:mt-0">
      <div className="mx-auto max-w-[46rem] text-center">
        <Reveal y={14}>
          <span className="eyebrow rounded-full border border-fidium/25 bg-fidium/8 px-3 py-1.5 text-fidium-600">
            {config.eyebrow}
          </span>
        </Reveal>

        <h2 className="h-section mt-4 text-ink">
          <RevealText as="span" text={config.heading} stagger={32} />
        </h2>

        <Reveal delay={140} y={16}>
          <p className="body-lg mx-auto mt-4 max-w-[38rem] text-slate-600">
            {config.subheading}
          </p>
        </Reveal>
      </div>

      {/* Cards stagger in as a grid */}
      <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal
            key={plan.id}
            delay={i * 85}
            y={30}
            scale={0.975}
            className="min-w-0"
          >
            <PlanCard plan={plan} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/**
 * Renders every service line Fidium actually sells, in the canonical order
 * declared in lib/content.ts (fiber → cable → bundle → tv → mobile → phone).
 *
 * Lines with no plans are absent from ACTIVE_SERVICE_SECTIONS entirely, so no
 * empty section, placeholder card or heading is ever produced.
 */
export function ServiceLineSections() {
  return (
    <section id="plans" className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-slate-50 to-transparent"
      />

      <div className="container-x relative">
        {ACTIVE_SERVICE_SECTIONS.map((config) => (
          <ServiceLine key={config.line} config={config} />
        ))}

        {/* Coverage note */}
        <Reveal delay={120} y={18}>
          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Where Fidium builds
                </p>
                <p className="mt-2 text-[0.95rem] font-semibold leading-relaxed text-slate-700">
                  Fidium Fiber serves communities across{' '}
                  {SERVICE_STATES.slice(0, -1).join(', ')} and{' '}
                  {SERVICE_STATES[SERVICE_STATES.length - 1]}.
                </p>
              </div>

              <p className="shrink-0 text-[0.82rem] font-medium leading-relaxed text-slate-500 sm:max-w-[16rem] sm:text-right">
                Plans start at {formatPrice(ENTRY_PLAN.price)}/mo. Availability is
                confirmed per address.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default ServiceLineSections;
