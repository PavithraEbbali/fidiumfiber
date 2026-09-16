import { FOOTER, SITE } from '@/lib/content';
import { LEGAL_LINKS } from '@/lib/legal';
import { CallNumberButton } from '@/components/primitives/CallButton';
import Logo from '@/components/layout/Logo';

const [plansColumn, exploreColumn] = FOOTER.columns;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-[0.06]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-fidium/10 blur-[120px]"
      />

      <div className="container-x relative">
        {/* -------------------------------------------------- column grid */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="min-w-0 lg:col-span-4">
            <Logo onDark />

            <p className="mt-5 max-w-[26rem] text-[0.86rem] leading-[1.72] text-white/55">
              {FOOTER.blurb}
            </p>

            <address className="mt-5 not-italic text-[0.82rem] leading-relaxed text-white/45">
              {SITE.address}
            </address>
          </div>

          {/* Plans */}
          <nav aria-label="Plans" className="min-w-0 lg:col-span-3">
            <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-lime">
              {plansColumn.title}
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {plansColumn.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[0.86rem] font-medium text-white/60 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Explore */}
          <nav aria-label="Explore" className="min-w-0 lg:col-span-2">
            <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-lime">
              {exploreColumn.title}
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {exploreColumn.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[0.86rem] font-medium text-white/60 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Talk to a human */}
          <div className="min-w-0 lg:col-span-3">
            <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-lime">
              Talk to a human
            </h3>

            <a
              href={SITE.phoneHref}
              data-call-cta
              data-call-source="footer-number"
              className="mt-5 block text-[1.35rem] font-extrabold tracking-[-0.03em] text-white transition-colors duration-200 hover:text-lime"
            >
              {SITE.phoneDisplay}
            </a>

            <p className="mt-2 text-[0.82rem] font-medium leading-relaxed text-white/50">
              {SITE.hours}
            </p>

            <CallNumberButton
              variant="onDark"
              source="footer"
              className="mt-5 w-full !text-[0.85rem]"
            />
          </div>
        </div>

        {/* ------------------------------------------------------- legal */}
        <div className="border-t border-white/10 py-9">
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[0.8rem] font-semibold text-white/55 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-6 flex flex-col gap-3">
            {FOOTER.legal.map((line) => (
              <p
                key={line.slice(0, 40)}
                className="max-w-[62rem] text-[0.74rem] leading-[1.75] text-white/40"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
