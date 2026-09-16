import Image from 'next/image';
import { FEATURES, FEATURES_SECTION, type FeatureIcon } from '@/lib/content';
import { IMAGES, imageSrc } from '@/lib/images';
import { hasImage } from '@/lib/images.server';
import Reveal, { RevealText } from '@/components/primitives/Reveal';

const ICONS: Record<FeatureIcon, React.ReactNode> = {
  bolt: <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />,
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  infinity: (
    <path d="M6.5 8.5c-2 0-3.5 1.6-3.5 3.5s1.5 3.5 3.5 3.5c3.5 0 4.5-7 8-7 2 0 3.5 1.6 3.5 3.5s-1.5 3.5-3.5 3.5c-3.5 0-4.5-7-8-7Z" />
  ),
  wifi: (
    <>
      <path d="M2 8.8a17 17 0 0 1 20 0" />
      <path d="M5 12.5a12 12 0 0 1 14 0" />
      <path d="M8.5 16a7 7 0 0 1 7 0" />
      <path d="M12 20h.01" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.1 2.1 0 0 1-3-3l9.4-9.4a4 4 0 0 0-5-5" />
  ),
  chart: (
    <>
      <path d="M3 21h18" />
      <path d="M6 21V11" />
      <path d="M11 21V6" />
      <path d="M16 21v-7" />
      <path d="M21 21V3" />
    </>
  ),
};

export function Features() {
  const photo = hasImage('lifestyle');

  return (
    <section
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-24 ${
        photo ? 'bg-ink text-white' : 'bg-slate-50/70'
      }`}
    >
      {photo ? (
        /*
          The photograph fills the section from `lg` up, where the section is
          wide enough for a full-bleed crop to still read as a room.

          Below that it is hidden and shown as a band instead (further down).
          A phone section is roughly 0.2:1, so object-cover would crop this
          1.63:1 photo to a ~12% vertical slice — an abstract texture rather
          than a picture of a family.
        */
        <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
          <Image
            src={imageSrc('lifestyle')}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          {/*
            A dark scrim, not a white one: the photograph is a dimly lit evening
            room, so the copy above it has to be light. Kept just heavy enough
            for text contrast while the room stays clearly readable.
          */}
          <div className="absolute inset-0 bg-ink/72" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/40 to-ink/90" />
        </div>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-40" />
      )}

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-[46rem] text-center">
          <Reveal y={14}>
            <span
              className={`eyebrow rounded-full px-3 py-1.5 ${
                photo
                  ? 'border border-white/25 bg-white/10 text-lime'
                  : 'border border-navy/20 bg-navy/6 text-navy'
              }`}
            >
              {FEATURES_SECTION.eyebrow}
            </span>
          </Reveal>

          <h2 className={`h-section mt-4 ${photo ? 'text-white' : 'text-ink'}`}>
            <RevealText as="span" text={FEATURES_SECTION.heading} stagger={32} />
          </h2>

          <Reveal delay={140} y={16}>
            <p
              className={`body-lg mx-auto mt-4 max-w-[40rem] ${
                photo ? 'text-white/70' : 'text-slate-600'
              }`}
            >
              {FEATURES_SECTION.subheading}
            </p>
          </Reveal>
        </div>

        {/*
          Below `lg` the same photograph runs as a band at its own aspect ratio,
          so it stays a readable picture instead of a cropped sliver.
        */}
        {photo ? (
          <Reveal delay={180} y={26} scale={0.985} className="mt-10 lg:hidden">
            <figure className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-white/12 sm:aspect-[16/9]">
              <Image
                src={imageSrc('lifestyle')}
                alt={IMAGES.lifestyle.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
              />
            </figure>
          </Reveal>
        ) : null}

        {/* Staggered entrance grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-11 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 75} y={26} scale={0.98} className="min-w-0">
              <article
                className={`group h-full rounded-2xl p-6 transition-all duration-400 ease-brand hover:-translate-y-1 ${
                  photo
                    ? 'border border-white/12 bg-ink/55 backdrop-blur-md hover:border-lime/45 hover:bg-ink/70'
                    : 'border border-slate-200 bg-white shadow-card hover:border-fidium/35 hover:shadow-cardHover'
                }`}
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${
                    photo
                      ? 'bg-white/10 text-lime group-hover:bg-lime group-hover:text-ink'
                      : 'bg-fidium/10 text-fidium-600 group-hover:bg-fidium group-hover:text-white'
                  }`}
                >
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONS[f.icon]}
                  </svg>
                </span>

                <h3
                  className={`mt-4 text-[1.05rem] font-extrabold leading-snug tracking-[-0.02em] ${
                    photo ? 'text-white' : 'text-ink'
                  }`}
                >
                  {f.title}
                </h3>

                <p
                  className={`mt-2.5 text-[0.88rem] leading-[1.65] ${
                    photo ? 'text-white/70' : 'text-slate-600'
                  }`}
                >
                  {f.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
