import { SITE } from '@/lib/content';

/**
 * Persistent, non-dismissable retailer disclosure.
 *
 * Rendered server-side at the very top of the document so it is present in the
 * initial HTML — there is no dismiss control and no client state behind it.
 */
export function DisclosureBar() {
  return (
    <div className="relative z-50 bg-ink">
      <div className="container-x">
        <p className="flex items-center justify-center gap-2 py-2 text-center text-[0.72rem] font-semibold leading-tight tracking-[0.04em] text-white/85 sm:text-[0.78rem]">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-lime"
          />
          {SITE.disclosure}
        </p>
      </div>
      <div className="h-px w-full grad-brand opacity-70" aria-hidden="true" />
    </div>
  );
}

export default DisclosureBar;
