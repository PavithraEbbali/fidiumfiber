/* =============================================================================
 *  lib/content.ts  —  SINGLE SOURCE OF TRUTH
 * =============================================================================
 *  Every price, speed, fee, promo qualifier, disclosure and piece of legal copy
 *  that appears anywhere on this site is declared in this file and nowhere else.
 *
 *  To update the site when Fidium changes pricing or promotions, edit ONLY this
 *  file. The hero lockup, plan cards, comparison table, fine print grid, FAQ
 *  answers, footer disclosures and every CTA re-render automatically. No JSX or
 *  TSX layout file ever needs to be touched.
 *
 *  Plan data verified against the official Fidium price-card data published on
 *  fidiumfiber.com.
 * ---------------------------------------------------------------------------*/

/* -------------------------------------------------------------------------- */
/*  TYPES                                                                      */
/* -------------------------------------------------------------------------- */

export type ServiceLine =
  | 'fiber'
  | 'cable'
  | 'bundle'
  | 'tv'
  | 'mobile'
  | 'phone';

export interface PlanItem {
  id: string;
  name: string;
  serviceLine: ServiceLine;
  speedDown?: number;
  speedUp?: number;
  price?: number;
  cents?: string;
  promoQualifier?: string;
  equipmentFee?: string;
  dataPolicy?: string;
  contractTerm?: string;
  features: string[];
  isPopular?: boolean;
  /** Small pill rendered on the card shoulder, e.g. "WIFI 7". */
  badge?: string;
  /** One-line plain-language summary of who the tier suits. */
  blurb?: string;
  /** Short audience label, e.g. "Busy homes". */
  audience?: string;
  /** Marketing promo strip, e.g. "+ 1 month free". */
  promoHeadline?: string;
  /** Whether the tier ships with WiFi extenders for whole-home coverage. */
  wholeHomeWifi?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

/* -------------------------------------------------------------------------- */
/*  SITE / RETAILER IDENTITY                                                   */
/* -------------------------------------------------------------------------- */

export const SITE = {
  /** Legal entity of the authorized retailer operating this site. */
  entity: 'FidiumFiber',
  /** Short display name used in body copy. */
  shortName: 'FidiumFiber',
  /** Wordmark shown in the header. */
  wordmark: 'Fidium',
  wordmarkSuffix: 'Fiber',

  /** Sales line. Replace with your tracking number. */
  phoneDisplay: '(888) 425-0568',
  phoneHref: 'tel:+18884250568',

  domain: 'fidium-authorized-retailer.com',

  /** Business address shown in the footer. Replace with your registered address. */
  address: '1 Commerce Way, Suite 200, Manchester, NH 03101',

  /**
   * Mailboxes referenced by the legal pages. Create these (or repoint them)
   * when the production domain is set.
   */
  email: {
    general: 'hello',
    privacy: 'privacy',
    legal: 'legal',
    security: 'security',
    marketing: 'marketing',
    optout: 'optout',
    support: 'support',
  },

  /** Persistent, non-dismissable top bar. */
  disclosure: 'Independent Authorized Retailer of Fidium.',

  hours: 'Mon-Fri 8am-9pm ET | Sat-Sun 9am-6pm ET',

  seo: {
    title: 'Fidium Fiber Plans & Pricing | Authorized Retailer',
    description:
      'Order Fidium Fiber symmetrical internet from an independent authorized retailer. Plans from $30/mo with unlimited data, no contracts and free professional installation.',
    keywords: [
      'Fidium Fiber',
      'fiber internet plans',
      'symmetrical fiber internet',
      'gigabit internet',
      'authorized retailer',
    ],
  },
} as const;

/**
 * Absolute origin for canonical URLs, the sitemap and social card images.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL   — set this to the production domain on Vercel
 *   2. VERCEL_URL             — so preview deployments get correct absolute URLs
 *   3. SITE.domain            — local default
 *
 * Without this, every preview deployment would advertise the production
 * canonical and point social cards at a domain that is not live yet.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');

  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return `https://${SITE.domain}`;
}

/* -------------------------------------------------------------------------- */
/*  CTA LABELS — enforced globally                                             */
/* -------------------------------------------------------------------------- */

export const CTA = {
  /** Used on every plan card and section CTA that has a published price. */
  order: 'Call to order',
  /** Used automatically whenever a plan has no published price. */
  pricing: 'Call for pricing',
  zip: 'Check availability',
} as const;

/** Resolves the correct CTA label for a plan. Never hardcode this in JSX. */
export function ctaLabelFor(plan: PlanItem): string {
  return typeof plan.price === 'number' ? CTA.order : CTA.pricing;
}

/* -------------------------------------------------------------------------- */
/*  SHARED PLAN TERMS                                                          */
/* -------------------------------------------------------------------------- */

const TERMS = {
  promoGigPlus:
    'New residential customers. Requires AutoPay with bank account and paperless billing.',
  promoEntry: 'Requires AutoPay with bank account and paperless billing.',
  equipmentIncluded: 'Included',
  equipmentBYO: 'Included, or bring your own router',
  unlimited: 'Unlimited data, no caps',
  noContract: 'No contract',
} as const;

/* -------------------------------------------------------------------------- */
/*  PLANS                                                                      */
/* -------------------------------------------------------------------------- */
/*  Audited against fidiumfiber.com. Fidium sells fiber internet and a digital  */
/*  home phone add-on. It does NOT sell cable, TV, mobile or bundles, so those  */
/*  service lines hold no plans and their sections never render.                */
/*                                                                              */
/*  Fidium publishes no price for home phone, so that plan carries no `price`.  */
/*  The lockup and its CTA switch themselves to "Call for pricing".             */
/* -------------------------------------------------------------------------- */

export const PLANS: PlanItem[] = [
  {
    id: 'fiber-300',
    name: 'Fidium Fiber 300 Mbps',
    serviceLine: 'fiber',
    audience: 'Light use',
    speedDown: 300,
    speedUp: 300,
    price: 30,
    cents: '00',
    promoQualifier: TERMS.promoEntry,
    equipmentFee: TERMS.equipmentBYO,
    dataPolicy: TERMS.unlimited,
    contractTerm: TERMS.noContract,
    blurb:
      'A simple, reliable plan for everyday browsing, email, streaming and a handful of connected devices.',
    features: [
      '300 Mbps download and 300 Mbps upload',
      'Unlimited data with no overage charges',
      'No annual contract or early termination fee',
      'Free professional installation',
      'Bring your own router or use a Fidium gateway',
    ],
  },
  {
    id: 'fiber-1g',
    name: 'Fidium Fiber 1 Gig',
    serviceLine: 'fiber',
    audience: 'Busy homes',
    speedDown: 1000,
    speedUp: 1000,
    price: 50,
    cents: '00',
    promoHeadline: '+ 1 month free',
    promoQualifier: TERMS.promoGigPlus,
    equipmentFee: TERMS.equipmentIncluded,
    dataPolicy: TERMS.unlimited,
    contractTerm: TERMS.noContract,
    blurb:
      'Fast, flexible fiber for families with several people streaming, working, learning and gaming at once.',
    features: [
      '1 Gig download and 1 Gig upload',
      'Whole-home WiFi gateway included',
      'Unlimited data with no overage charges',
      'No annual contract or early termination fee',
      'Free professional installation',
    ],
  },
  {
    id: 'fiber-2g',
    name: 'Fidium Fiber 2 Gig',
    serviceLine: 'fiber',
    audience: 'Power users',
    speedDown: 2000,
    speedUp: 2000,
    price: 60,
    cents: '00',
    isPopular: true,
    promoHeadline: '+ 1 month free',
    promoQualifier: TERMS.promoGigPlus,
    equipmentFee: TERMS.equipmentIncluded,
    dataPolicy: TERMS.unlimited,
    contractTerm: TERMS.noContract,
    blurb:
      'Excellent value for homes with more connected devices, heavier streaming and smoother gaming.',
    features: [
      '2 Gig download and 2 Gig upload',
      'Whole-home WiFi gateway included',
      'Unlimited data with no overage charges',
      'No annual contract or early termination fee',
      'Free professional installation',
    ],
  },
  {
    id: 'fiber-5g',
    name: 'Fidium Fiber 5 Gig',
    serviceLine: 'fiber',
    audience: 'Creators & pros',
    badge: 'WIFI 7',
    speedDown: 5000,
    speedUp: 5000,
    price: 80,
    cents: '00',
    wholeHomeWifi: true,
    promoHeadline: '+ 1 month free',
    promoQualifier: TERMS.promoGigPlus,
    equipmentFee: 'WiFi 7 gateway and extenders included',
    dataPolicy: TERMS.unlimited,
    contractTerm: TERMS.noContract,
    blurb:
      'Next-level speed and WiFi for super users with serious bandwidth and performance demands.',
    features: [
      '5 Gig download and 5 Gig upload',
      'WiFi 7 gateway and extenders included',
      'Whole-home WiFi coverage included',
      'Unlimited data with no overage charges',
      'Free professional installation',
    ],
  },
  {
    id: 'fiber-8g',
    name: 'Fidium Fiber 8 Gig',
    serviceLine: 'fiber',
    audience: 'Future ready',
    badge: 'WIFI 7',
    speedDown: 8000,
    speedUp: 8000,
    price: 130,
    cents: '00',
    wholeHomeWifi: true,
    promoHeadline: '+ 1 month free',
    promoQualifier: TERMS.promoGigPlus,
    equipmentFee: 'WiFi 7 gateway and extenders included',
    dataPolicy: TERMS.unlimited,
    contractTerm: TERMS.noContract,
    blurb:
      'The ultimate fiber experience, with industry-leading speeds and WiFi for the most connected homes.',
    features: [
      '8 Gig download and 8 Gig upload',
      'WiFi 7 gateway and extenders included',
      'Whole-home WiFi coverage included',
      'Unlimited data with no overage charges',
      'Free professional installation',
    ],
  },

  /* ---------------------------------------------------------- home phone */
  {
    id: 'phone-home',
    name: 'Fidium Home Phone',
    serviceLine: 'phone',
    audience: 'Add-on',
    // Fidium publishes no rate for this service, so `price` is deliberately
    // omitted. Everything downstream switches to "Call for pricing" on its own.
    equipmentFee: 'No special equipment required',
    contractTerm: TERMS.noContract,
    blurb:
      'A digital home phone line that runs over the same fiber connection, with more than 20 calling features included.',
    features: [
      'More than 20 calling features included',
      'Voicemail, with voice-to-email delivery',
      'Caller ID, call waiting and call forwarding',
      'Call rejection and a do not disturb setting',
      'No special equipment needed, other than optional battery backup',
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  SERVICE LINE REGISTRY                                                      */
/* -------------------------------------------------------------------------- */
/*  Sections render ONLY when the matching service line has at least one plan.  */
/*  Fidium currently sells fiber internet only, so every other line resolves     */
/*  to an empty array and its section is omitted from the page entirely.        */
/* -------------------------------------------------------------------------- */

export function plansFor(line: ServiceLine): PlanItem[] {
  return PLANS.filter((p) => p.serviceLine === line);
}

export function hasServiceLine(line: ServiceLine): boolean {
  return plansFor(line).length > 0;
}

export interface ServiceSectionConfig {
  line: ServiceLine;
  eyebrow: string;
  heading: string;
  subheading: string;
}

/** Ordered exactly: fiber -> cable -> bundle -> tv -> mobile -> phone. */
export const SERVICE_SECTIONS: ServiceSectionConfig[] = [
  {
    line: 'fiber',
    eyebrow: 'Fiber internet',
    heading: 'Compare speeds and pricing',
    subheading:
      'Every Fidium Fiber plan runs on a 100% fiber-optic connection with matching upload and download speeds, unlimited data and no annual contract.',
  },
  {
    line: 'cable',
    eyebrow: 'Cable internet',
    heading: 'Cable internet plans',
    subheading: 'Cable internet options.',
  },
  {
    line: 'bundle',
    eyebrow: 'Bundles',
    heading: 'Bundle and save',
    subheading: 'Combined service packages.',
  },
  {
    line: 'tv',
    eyebrow: 'TV',
    heading: 'Television packages',
    subheading: 'Channel lineups and streaming.',
  },
  {
    line: 'mobile',
    eyebrow: 'Mobile',
    heading: 'Mobile plans',
    subheading: 'Wireless lines and data.',
  },
  {
    line: 'phone',
    eyebrow: 'Home phone',
    heading: 'Add a digital home phone line',
    subheading:
      'Fidium offers a digital home phone service that runs over the same fiber connection. Pricing is not published, so we confirm it with you on the call.',
  },
];

/** Only the service lines Fidium actually sells. Drives the page order. */
export const ACTIVE_SERVICE_SECTIONS: ServiceSectionConfig[] =
  SERVICE_SECTIONS.filter((s) => hasServiceLine(s.line));

/* -------------------------------------------------------------------------- */
/*  DERIVED VALUES — used by the hero, headings and disclosures                */
/* -------------------------------------------------------------------------- */

const priced = PLANS.filter(
  (p): p is PlanItem & { price: number } => typeof p.price === 'number'
);

/** Cheapest published plan. Drives "starting at" copy everywhere. */
export const ENTRY_PLAN: PlanItem =
  priced.slice().sort((a, b) => a.price - b.price)[0] ?? PLANS[0];

/** Fastest published plan. Drives "up to X" copy everywhere. */
export const TOP_PLAN: PlanItem = PLANS.slice().sort(
  (a, b) => (b.speedDown ?? 0) - (a.speedDown ?? 0)
)[0];

/** The plan whose lockup anchors the hero. Falls back to the entry plan. */
export const HERO_PLAN: PlanItem = PLANS.find((p) => p.isPopular) ?? ENTRY_PLAN;

/** Formats 300 -> "300 Mbps", 2000 -> "2 Gig". Never hardcode speed strings. */
export function formatSpeed(mbps?: number): string {
  if (!mbps) return '';
  return mbps >= 1000 ? `${mbps / 1000} Gig` : `${mbps} Mbps`;
}

/** "$30" — integer dollars only, for inline prose. */
export function formatPrice(price?: number): string {
  return typeof price === 'number' ? `$${price}` : '';
}

/* -------------------------------------------------------------------------- */
/*  HERO                                                                       */
/* -------------------------------------------------------------------------- */

export const HERO = {
  eyebrow: 'Authorized Retailer',
  h1a: 'Symmetrical fiber internet',
  h1b: 'for the connected home.',
  get subline() {
    return `Fidium Fiber delivers matching upload and download speeds from ${formatSpeed(
      ENTRY_PLAN.speedDown
    )} to ${formatSpeed(
      TOP_PLAN.speedDown
    )} over a 100% fiber-optic line, with unlimited data, no annual contract and free professional installation.`;
  },
  trustChips: ['No Data Caps', 'No Contracts', 'Symmetrical Speeds'],
  zipPlaceholder: 'Enter your ZIP code',
  zipHelper: 'Availability varies by address.',
} as const;

/* -------------------------------------------------------------------------- */
/*  TRUST MARQUEE                                                              */
/* -------------------------------------------------------------------------- */

export const MARQUEE_ITEMS: string[] = [
  'Symmetrical upload & download',
  'Unlimited data',
  'No annual contract',
  '100% fiber-optic network',
  'Free professional installation',
  'Whole-home WiFi gateway',
  '24/7 network monitoring',
  'WiFi 7 available',
];

/* -------------------------------------------------------------------------- */
/*  WHY FIBER — staggered feature grid                                         */
/* -------------------------------------------------------------------------- */

export type FeatureIcon =
  | 'bolt'
  | 'shield'
  | 'infinity'
  | 'wifi'
  | 'wrench'
  | 'chart';

export interface FeatureItem {
  icon: FeatureIcon;
  title: string;
  body: string;
}

export const FEATURES_SECTION = {
  eyebrow: 'Why fiber',
  heading: 'The advantages of a fiber-optic connection',
  subheading:
    'Fiber-optic lines carry data as light through glass rather than electrical signal through copper. The result is stable throughput during peak hours and upload speeds that match download speeds.',
} as const;

export const FEATURES: FeatureItem[] = [
  {
    icon: 'bolt',
    title: 'Uploads as fast as downloads',
    body: 'Symmetrical speeds mean a 4K upload, a cloud backup or a video call gets the same bandwidth as a download, in both directions, at the same time.',
  },
  {
    icon: 'infinity',
    title: 'Unlimited data, every month',
    body: 'No caps, no throttling thresholds and no overage line items. Stream, game and work as much as the household needs.',
  },
  {
    icon: 'shield',
    title: 'No annual contract',
    body: 'Service is month to month. There is no term commitment and no early termination fee if your plans change.',
  },
  {
    icon: 'wifi',
    title: 'Whole-home WiFi included',
    body: 'Gig-and-above plans include a managed WiFi gateway. The 5 Gig and 8 Gig tiers add WiFi 7 and extenders for full-house coverage.',
  },
  {
    icon: 'wrench',
    title: 'Free professional installation',
    body: 'A technician runs the fiber, mounts the equipment and confirms your speeds before leaving. Scheduling is booked around you.',
  },
  {
    icon: 'chart',
    title: 'Built for what comes next',
    body: 'Fiber capacity scales without rewiring your home, so moving from 1 Gig to 8 Gig is a plan change rather than a construction project.',
  },
];

/* -------------------------------------------------------------------------- */
/*  HOW IT WORKS — scroll-scrubbed assembly sequence                           */
/* -------------------------------------------------------------------------- */

export interface StepItem {
  n: string;
  title: string;
  body: string;
}

export const HOW_IT_WORKS_SECTION = {
  eyebrow: 'How it works',
  heading: 'From availability check to installation',
  subheading:
    'Four steps, handled by a representative who confirms what is available at your service address before any order is placed.',
} as const;

export const HOW_IT_WORKS: StepItem[] = [
  {
    n: '01',
    title: 'Confirm the address',
    body: 'Fiber availability is decided street by street. Give us the service address and we confirm which Fidium plans are live there before anything is ordered.',
  },
  {
    n: '02',
    title: 'Choose a speed tier',
    body: 'We walk through how many people and devices share the connection, then match that to the right tier. You pay the same published price either way.',
  },
  {
    n: '03',
    title: 'Book the installation',
    body: 'Professional installation is included. Pick a window that works for you, and a technician runs the fiber and sets up the gateway.',
  },
  {
    n: '04',
    title: 'Get connected',
    body: 'The technician verifies your speeds on site and walks you through the app controls. Your account and billing live directly with Fidium from day one.',
  },
];

/* -------------------------------------------------------------------------- */
/*  FINE PRINT GRID — comparison table                                         */
/* -------------------------------------------------------------------------- */
/*  Rows read their values off each PlanItem, so this table updates itself.     */
/* -------------------------------------------------------------------------- */

export interface FinePrintRow {
  label: string;
  hint?: string;
  value: (plan: PlanItem) => string;
}

export const FINE_PRINT_ROWS: FinePrintRow[] = [
  {
    label: 'Monthly price',
    hint: 'Before taxes and fees',
    value: (p) =>
      typeof p.price === 'number' ? `${formatPrice(p.price)}/mo` : CTA.pricing,
  },
  {
    label: 'Download speed',
    value: (p) => formatSpeed(p.speedDown) || '—',
  },
  {
    label: 'Upload speed',
    hint: 'Symmetrical on every tier',
    value: (p) => formatSpeed(p.speedUp) || '—',
  },
  {
    label: 'Equipment',
    hint: 'Gateway and WiFi hardware',
    value: (p) => p.equipmentFee ?? '—',
  },
  {
    label: 'Data allowance',
    value: (p) => p.dataPolicy ?? '—',
  },
  {
    label: 'Term commitment',
    value: (p) => p.contractTerm ?? '—',
  },
  {
    label: 'Professional installation',
    value: () => 'Included',
  },
  {
    label: 'Current promotion',
    hint: 'Conditions apply',
    value: (p) => p.promoHeadline ?? 'None',
  },
];

export const FINE_PRINT = {
  eyebrow: 'Plan details',
  heading: 'Complete specifications, side by side',
  subheading:
    'Hardware, monthly rate, data policy and term commitment for every Fidium Fiber tier, side by side. Taxes, government fees and surcharges are billed separately by Fidium.',
  get footnote() {
    return `Advertised rates require AutoPay with a bank account and paperless billing. The one month free promotion applies to ${formatSpeed(
      1000
    )} and higher residential plans for new customers and is credited on the first or second bill. Pricing, promotions and availability vary by service address.`;
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export const FAQ: FaqItem[] = [
  {
    q: 'What does symmetrical speed actually mean for my household?',
    a: `Your upload speed matches your download speed. On a ${formatSpeed(
      1000
    )} plan that is ${formatSpeed(
      1000
    )} in both directions, so backing up photos, sending large files and staying sharp on a video call do not slow down when someone else is streaming.`,
  },
  {
    q: 'Is a router included, or do I need to buy my own?',
    a: `A whole-home WiFi gateway is included on ${formatSpeed(
      1000
    )} and faster plans. The ${formatSpeed(5000)} and ${formatSpeed(
      8000
    )} tiers include a WiFi 7 gateway plus extenders for full-house coverage. If you would rather use hardware you already own, Fidium supports bringing your own router.`,
  },
  {
    q: 'How long does professional installation take?',
    a: 'Most standard installations are completed in two to four hours. The technician runs the fiber to the home, installs the gateway, tests the line and confirms you are getting the speeds on your plan before leaving. Installation is included at no additional charge.',
  },
  {
    q: 'Am I locked into a contract?',
    a: 'No. Every Fidium Fiber plan is month to month with no term commitment and no early termination fee. You can change your speed tier as your needs change.',
  },
  {
    q: 'Are there data caps or overage charges?',
    a: 'No. All plans include unlimited data. There are no usage caps, no throttling thresholds and no overage charges on your bill.',
  },
  {
    q: 'Why do AutoPay and paperless billing matter?',
    a: 'The advertised rates on this page reflect the best available Fidium pricing, which requires AutoPay using a bank account together with paperless billing. Without both enrolled, standard pricing applies.',
  },
  {
    q: 'Which speed should I choose?',
    a: `A ${formatSpeed(
      300
    )} plan comfortably handles browsing, email and a few streams. Households with several people working, gaming and streaming at once are better served by ${formatSpeed(
      1000
    )} or ${formatSpeed(
      2000
    )}. Creators moving large files every day should look at ${formatSpeed(
      5000
    )} or ${formatSpeed(8000)}.`,
  },
  {
    q: 'Will my price change after the promotional period?',
    a: 'The one month free credit applies once, on the first or second bill. Your monthly rate is the plan price shown on this page, and any future rate changes come directly from Fidium with advance notice on your bill.',
  },
  {
    q: 'Do I get the same plan and price ordering through a retailer?',
    a: `Yes. ${SITE.entity} is an authorized retailer, so you receive the same Fidium plans, hardware and published pricing. Your account and monthly billing are held directly with Fidium.`,
  },
];

/* -------------------------------------------------------------------------- */
/*  COVERAGE                                                                   */
/* -------------------------------------------------------------------------- */

export const SERVICE_STATES: string[] = [
  'California',
  'Illinois',
  'Maine',
  'Minnesota',
  'New Hampshire',
  'Pennsylvania',
  'Texas',
  'Vermont',
];

/* -------------------------------------------------------------------------- */
/*  NAVIGATION                                                                 */
/* -------------------------------------------------------------------------- */

export const NAV_LINKS = [
  { label: 'Plans', href: '#plans' },
  { label: 'Hardware', href: '#hardware' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
] as const;

/* -------------------------------------------------------------------------- */
/*  FOOTER                                                                     */
/* -------------------------------------------------------------------------- */

export const FOOTER = {
  blurb:
    'An independent authorized retailer of Fidium Fiber. We help households confirm availability, choose the right speed tier and place a new residential order over the phone.',
  columns: [
    {
      title: 'Plans',
      links: PLANS.map((p) => ({ label: p.name, href: '#plans' })),
    },
    {
      title: 'Explore',
      links: [
        { label: 'Hardware & fine print', href: '#hardware' },
        { label: 'How it works', href: '#how-it-works' },
        { label: 'Frequently asked questions', href: '#faq' },
        { label: 'Check availability', href: '#hero' },
      ],
    },
  ],
  get legal(): string[] {
    return [
      `${SITE.entity} is an independent authorized retailer of Fidium Fiber. Fidium, Fidium Fiber and all related marks are trademarks of their respective owners and are used here for identification purposes only.`,
      'Advertised pricing requires AutoPay with a bank account and paperless billing. Prices shown exclude taxes, government fees and surcharges, which are billed separately by Fidium.',
      'Speeds referenced are the maximum wired speeds of each plan. Actual speeds vary with equipment, wiring, WiFi conditions and simultaneous usage. Service availability, pricing and promotions vary by service address and are subject to change.',
    ];
  },
} as const;
