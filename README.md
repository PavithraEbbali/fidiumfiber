# Fidium Authorized Retailer

A one-page, Google Ads-compliant landing site for an independent authorized
retailer of Fidium Fiber. Next.js 14 (App Router), TypeScript, Tailwind CSS.

```bash
npm install
npm run dev      # http://localhost:3000
```

## The one file that matters

Everything the site displays — prices, speeds, equipment fees, promotions,
FAQ copy, legal disclosures, the phone number — lives in **`lib/content.ts`**.

Change a price there and the hero lockup, the plan card, both the desktop and
mobile comparison tables, the structured data and the footer all update. No JSX
file contains a price, a speed, or a CTA label.

```ts
{
  id: 'fiber-2g',
  name: 'Fidium Fiber 2 Gig',
  serviceLine: 'fiber',
  speedDown: 2000,
  speedUp: 2000,
  price: 60,          // ← change this, the whole site follows
  cents: '00',
  isPopular: true,
  promoHeadline: '+ 1 month free',
  ...
}
```

Omit `price` entirely and that plan's lockup and CTA switch themselves to
"Call for pricing".

## Before launch

Replace the placeholders in the `SITE` object at the top of `lib/content.ts`:
`entity`, `shortName`, `phoneDisplay`, `phoneHref`, `address`, `domain`.

## Structure

```
lib/content.ts              Single source of truth
lib/hooks.ts                Animation hooks (in-view, scroll, parallax, tilt, magnetic)
components/primitives/      PriceLockup, CallButton, Reveal, Marquee, SectionWipe
components/layout/          DisclosureBar, Header, Footer, Logo, LegalPage
components/sections/        Hero, PlanCard, ServiceLineSection, Features,
                            FinePrint, HowItWorks, Faq, FiberField
app/                        Routes, global CSS, metadata, sitemap, robots
ai.wing                     Change log and revert guide
```

## Notes on performance

The homepage ships **101 kB** of First Load JS. Every animation — scroll-scrubbed
assembly, parallax, path draws, tilt, magnetic buttons, marquees, clip-path
wipes, the canvas fiber field — is custom-built on IntersectionObserver,
`requestAnimationFrame` and CSS. The only runtime dependency beyond React is
Lenis, and it is dynamically imported after hydration.

All motion is disabled under `prefers-reduced-motion: reduce`. Entrance
animations are armed by a `.anim` class that only JavaScript can set, so if a
script ever fails to load the page still renders fully rather than blank.

## Compliance

- Persistent, non-dismissable "Independent Authorized Retailer of Fidium." bar.
- Reseller disclosure and trademark attribution in the footer.
- Privacy Policy, Terms, Accessibility and Do Not Sell routes.
- Advertised pricing carries its AutoPay and paperless-billing qualifier.
- Every `tel:` link carries `data-call-cta` for call tracking.

## Deploying to Vercel

The project is a standard Next.js App Router app, so Vercel detects everything
automatically — no `vercel.json` is needed.

1. **Import the repository** at [vercel.com/new](https://vercel.com/new).
   Framework preset: **Next.js**. Build command, output directory and install
   command are all detected; leave them on the defaults.

2. **Set one environment variable** once your domain is attached:

   | Name | Value | Environments |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | Production only |

   Leave it unset for Preview and Development. `siteUrl()` in `lib/content.ts`
   falls back to `VERCEL_URL`, so preview deployments advertise their own URL
   instead of claiming production's canonical.

3. **Deploy.** All 18 routes prerender as static HTML at build time.

### What is already configured

- `sharp` is a dependency, so `next/image` optimises on Vercel without a cold-start penalty.
- AVIF and WebP output, with a one-year cache on optimised variants.
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS) via `next.config.mjs`.
- `engines.node` pinned to `>=18.18.0`.
- `/sitemap.xml` and `/robots.txt` generate from the live content and follow the deployment URL.

### Note on `image-source/`

The original full-resolution PNGs are kept in `image-source/` and are
**gitignored** — they are ~41 MB and are not needed to build or serve the site.
`public/images/` holds the processed JPEGs that the site actually uses.
