'use client';

import { useEffect, useState } from 'react';
import { NAV_LINKS, SITE } from '@/lib/content';
import { useScrolled } from '@/lib/hooks';
import { CallNumberButton } from '@/components/primitives/CallButton';
import Logo from '@/components/layout/Logo';

export function Header() {
  const scrolled = useScrolled(10);
  const [open, setOpen] = useState(false);

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-brand ${
        scrolled
          ? 'border-b border-slate-200/80 bg-white/88 shadow-[0_1px_20px_-8px_rgba(11,18,32,0.18)] backdrop-blur-xl'
          : 'border-b border-transparent bg-white/70 backdrop-blur-md'
      }`}
    >
      <div className="container-x">
        <div className="flex h-[68px] items-center justify-between gap-2 sm:gap-4">
          <a href="#hero" className="min-w-0 shrink" aria-label="Back to top">
            <Logo compact />
          </a>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative rounded-full px-4 py-2 text-[0.9rem] font-semibold text-slate-600 transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-4 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full grad-brand transition-transform duration-300 ease-brand group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <CallNumberButton
              variant="primary"
              source="header"
              className="hidden !px-5 !py-2.5 !text-[0.875rem] !shadow-[0_1px_2px_rgba(11,18,32,0.06),0_4px_12px_-4px_rgba(0,133,51,0.45)] sm:inline-flex"
            />

            {/* Compact call affordance for the smallest screens */}
            <a
              href={SITE.phoneHref}
              data-call-cta
              data-call-source="header-compact"
              aria-label={`Call ${SITE.phoneDisplay}`}
              className="btn-primary !p-2.5 !shadow-[0_1px_2px_rgba(11,18,32,0.06),0_4px_12px_-4px_rgba(0,133,51,0.45)] sm:hidden"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-slate-900/10 text-ink transition-colors hover:border-fidium/40 lg:hidden"
            >
              <span className="relative block h-4 w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 block h-[2.5px] w-5 rounded-full bg-current transition-all duration-300 ease-brand ${
                    open ? 'top-[7px] rotate-45' : 'top-0.5'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] block h-[2.5px] w-5 rounded-full bg-current transition-all duration-200 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[2.5px] w-5 rounded-full bg-current transition-all duration-300 ease-brand ${
                    open ? 'top-[7px] -rotate-45' : 'top-[13.5px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-slate-200/70 bg-white/97 backdrop-blur-xl transition-[max-height,opacity] duration-400 ease-brand lg:hidden ${
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="container-x py-4">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${i * 45 + 60}ms` : '0ms' }}
                  className={`flex items-center justify-between border-b border-slate-100 py-3.5 text-[1.02rem] font-semibold text-ink transition-all duration-400 ease-brand ${
                    open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
                  }`}
                >
                  {link.label}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-fidium"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <CallNumberButton
            variant="primary"
            source="mobile-nav"
            className="mt-5 w-full"
          />
          <p className="mt-3 text-center text-[0.76rem] font-medium text-slate-500">
            {SITE.hours}
          </p>
        </nav>
      </div>
    </header>
  );
}

export default Header;
