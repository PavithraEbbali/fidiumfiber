import { SITE } from '@/lib/content';

/**
 * Custom Fidium-styled wordmark.
 *
 * The glyph is an abstract fiber strand bending through a node — drawn here as
 * SVG rather than shipped as an image file so it stays crisp, themeable and
 * costs no extra network request.
 */
export function Logo({
  onDark = false,
  className = '',
  compact = false,
}: {
  onDark?: boolean;
  className?: string;
  /**
   * Drops the "Authorized Retailer" line below `sm`. Used in the header, where
   * the narrowest screens need the room for the call and menu buttons — the
   * persistent disclosure bar directly above still carries the same statement.
   */
  compact?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="h-9 w-9"
          role="img"
          aria-label={`${SITE.wordmark} ${SITE.wordmarkSuffix}`}
        >
          <defs>
            <linearGradient id="fidium-mark" x1="4" y1="36" x2="36" y2="4">
              <stop offset="0%" stopColor="#00AE42" />
              <stop offset="100%" stopColor="#93D500" />
            </linearGradient>
          </defs>

          <rect width="40" height="40" rx="11" fill="url(#fidium-mark)" />

          {/* Fiber strands converging on the node */}
          <path
            d="M9 28c5.2 0 7.4-4.2 10.4-8.2C22.2 16 24.6 12 31 12"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M9 20.5c4.4 0 6.6-3 9-6"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.55"
          />
          <circle cx="27.5" cy="25" r="3.4" fill="#FFFFFF" />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`text-[1.12rem] font-extrabold tracking-[-0.03em] ${
            onDark ? 'text-white' : 'text-ink'
          }`}
        >
          {SITE.wordmark}
          <span className="grad-text">{SITE.wordmarkSuffix}</span>
        </span>
        <span
          className={`mt-1 text-[0.58rem] font-bold uppercase tracking-[0.16em] ${
            compact ? 'hidden sm:block' : ''
          } ${onDark ? 'text-white/55' : 'text-slate-400'}`}
        >
          Authorized Retailer
        </span>
      </span>
    </span>
  );
}

export default Logo;
