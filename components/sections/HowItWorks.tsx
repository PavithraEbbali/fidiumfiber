import Image from 'next/image';
import { HOW_IT_WORKS, HOW_IT_WORKS_SECTION, HERO_PLAN } from '@/lib/content';
import { IMAGES, imageSrc } from '@/lib/images';
import { hasImage } from '@/lib/images.server';
import CallButton from '@/components/primitives/CallButton';
import Reveal, { RevealText } from '@/components/primitives/Reveal';

/**
 * The ordering process, as a static four-step sequence.
 *
 * This is a server component: no scroll listeners, no canvas, no client-side
 * JavaScript beyond the shared entrance reveal.
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-ink py-16 text-white sm:py-20 lg:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-[0.07]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-1/3 h-[460px] w-[460px] rounded-full bg-fidium/12 blur-[130px]"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-[46rem] text-center">
          <Reveal y={14}>
            <span className="eyebrow rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-lime">
              {HOW_IT_WORKS_SECTION.eyebrow}
            </span>
          </Reveal>

          <h2 className="h-section mt-4 text-white">
            <RevealText as="span" text={HOW_IT_WORKS_SECTION.heading} stagger={30} />
          </h2>

          <Reveal delay={140} y={16}>
            <p className="body-lg mx-auto mt-4 max-w-[40rem] text-white/65">
              {HOW_IT_WORKS_SECTION.subheading}
            </p>
          </Reveal>
        </div>

        {/* ----------------------------------------------------- the steps */}
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step, i) => (
            <Reveal
              key={step.n}
              as="li"
              delay={i * 90}
              y={26}
              className="min-w-0"
            >
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 ease-brand hover:border-lime/40 hover:bg-white/8">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full grad-brand text-[0.88rem] font-extrabold text-white">
                  {step.n}
                </span>

                <h3 className="mt-5 text-[1.02rem] font-extrabold leading-snug tracking-[-0.02em] text-white">
                  {step.title}
                </h3>

                <p className="mt-2.5 text-[0.88rem] leading-[1.65] text-white/60">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* ------------------------------------------------------- closing */}
        <Reveal delay={120} y={22}>
          <div
            className={`mt-6 grid gap-6 overflow-hidden rounded-2xl border border-white/10 bg-white/6 ${
              hasImage('install')
                ? 'lg:grid-cols-[1fr_0.85fr] lg:gap-0'
                : ''
            }`}
          >
            <div className="flex flex-col justify-center gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7 lg:flex-col lg:items-start lg:justify-center lg:p-8">
              <div className="min-w-0">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-lime">
                  Start an order
                </p>
                <p className="mt-2 max-w-[38rem] text-[0.95rem] leading-relaxed text-white/80">
                  Provide the service address and we will confirm availability,
                  review the speed tiers and schedule installation on a single
                  call.
                </p>
              </div>

              <CallButton
                plan={HERO_PLAN}
                variant="primary"
                source="how-it-works"
                className="shrink-0"
              />
            </div>

            {/* Installation photo — appears once the file is in public/images/ */}
            {hasImage('install') ? (
              <figure className="relative min-h-[220px] w-full lg:min-h-[280px]">
                <Image
                  src={imageSrc('install')}
                  alt={IMAGES.install.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/15 to-transparent lg:from-ink/80"
                />
              </figure>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default HowItWorks;
