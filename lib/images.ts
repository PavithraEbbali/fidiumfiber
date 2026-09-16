/* =============================================================================
 *  lib/images.ts  —  IMAGE MANIFEST
 * =============================================================================
 *  Every photograph used on the site is declared here: its filename, its alt
 *  text and the aspect ratio it is laid out at.
 *
 *  Drop the files into  public/images/  using exactly the `file` names below.
 *
 *  Nothing else needs changing. Each slot is checked at BUILD TIME by
 *  lib/images.server.ts, so a slot whose file is not present falls back to the
 *  existing gradient or solid treatment — the site never renders a broken
 *  image or an empty frame while you are still producing the artwork.
 * ---------------------------------------------------------------------------*/

export interface ImageSlot {
  /** Filename inside public/images/ */
  file: string;
  /** Alt text. Empty string marks a purely decorative image. */
  alt: string;
  /** Intended pixel dimensions, used for layout and to size the source file. */
  width: number;
  height: number;
}

export const IMAGES = {
  /** Full-bleed background behind the hero. Sits under a light scrim. */
  hero: {
    file: 'hero-home.jpg',
    alt: '',
    width: 2400,
    height: 1471,
  },

  /** Lifestyle band in the "Why fiber" section. */
  lifestyle: {
    file: 'family-connected.jpg',
    alt: 'A household using several connected devices at the same time',
    width: 1800,
    height: 1103,
  },

  /** The WiFi gateway, shown above the specifications table. */
  gateway: {
    file: 'wifi-gateway.jpg',
    alt: 'The whole-home WiFi gateway included with Fidium Fiber plans',
    width: 1600,
    height: 1164,
  },

  /** Installation photo beside the closing block in "How it works". */
  install: {
    file: 'technician-install.jpg',
    alt: 'A technician completing a fiber internet installation at a home',
    width: 1600,
    height: 1091,
  },

  /** Social sharing card. Metadata only — never rendered on the page. */
  og: {
    file: 'og-cover.jpg',
    alt: '',
    width: 1200,
    height: 628,
  },
} as const satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof IMAGES;

/** Public URL for a slot, e.g. "/images/hero-home.jpg". */
export function imageSrc(key: ImageKey): string {
  return `/images/${IMAGES[key].file}`;
}
