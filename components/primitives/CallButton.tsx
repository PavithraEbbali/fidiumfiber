'use client';

import React from 'react';
import { CTA, SITE, ctaLabelFor, type PlanItem } from '@/lib/content';
import { useMagnetic } from '@/lib/hooks';

type Variant = 'primary' | 'dark' | 'ghost' | 'onDark';

const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'btn-primary',
  dark: 'btn-dark',
  ghost: 'btn-ghost',
  onDark: 'btn-onDark',
};

interface CallButtonProps {
  /**
   * When a plan is supplied the label resolves automatically:
   * priced plans get "Call to order", unpriced plans get "Call for pricing".
   */
  plan?: PlanItem;
  /** Explicit label override. Never pass a raw phone number here. */
  label?: string;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
  fullWidth?: boolean;
  /** Analytics hook value, e.g. "hero", "plan-card". */
  source?: string;
  showIcon?: boolean;
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

/**
 * The only component on the site that renders a `tel:` sales link.
 *
 * Every instance carries `data-call-cta`, so call tracking can bind to a single
 * selector. Labels come from lib/content.ts — the raw phone number is never
 * used as button text here (the header and footer render the number directly
 * through their own markup, by design).
 */
export function CallButton({
  plan,
  label,
  variant = 'primary',
  className = '',
  magnetic = true,
  fullWidth = false,
  source = 'generic',
  showIcon = true,
}: CallButtonProps) {
  const magneticRef = useMagnetic<HTMLAnchorElement>(magnetic ? 0.22 : 0, 70);

  const text = label ?? (plan ? ctaLabelFor(plan) : CTA.order);

  return (
    <a
      ref={magnetic ? magneticRef : undefined}
      href={SITE.phoneHref}
      data-call-cta
      data-call-source={source}
      data-plan={plan?.id ?? undefined}
      aria-label={`${text} — call ${SITE.phoneDisplay}`}
      className={`${VARIANT_CLASS[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {showIcon ? <PhoneIcon /> : null}
      <span>{text}</span>
    </a>
  );
}

/**
 * Header/footer variant: displays the actual phone number as the label.
 * Permitted only in the global chrome.
 */
export function CallNumberButton({
  variant = 'primary',
  className = '',
  source = 'header',
  magnetic = false,
}: {
  variant?: Variant;
  className?: string;
  source?: string;
  magnetic?: boolean;
}) {
  const magneticRef = useMagnetic<HTMLAnchorElement>(magnetic ? 0.2 : 0, 60);

  return (
    <a
      ref={magnetic ? magneticRef : undefined}
      href={SITE.phoneHref}
      data-call-cta
      data-call-source={source}
      aria-label={`Call ${SITE.phoneDisplay}`}
      className={`${VARIANT_CLASS[variant]} ${className}`}
    >
      <PhoneIcon />
      <span className="tabular-nums">{SITE.phoneDisplay}</span>
    </a>
  );
}

export default CallButton;
