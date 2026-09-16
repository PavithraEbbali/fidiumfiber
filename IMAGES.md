# Image Brief

Everything you need to generate and drop in the site's photography.

## Where the files go

```
public/images/
```

That folder already exists and is empty. Save each file there using the **exact
filename** below — lowercase, hyphens, `.jpg`. Filenames are case-sensitive on
most hosting, so `Hero-Home.JPG` will not be found.

Nothing else needs editing. Each slot is checked at build time, so a file that
isn't there yet simply falls back to the current design — the site never shows a
broken image. Add a file, run `npm run build`, and it appears.

## The five images

| # | Save as | Size (px) | Ratio | Where it shows |
|---|---|---|---|---|
| 1 | `hero-home.jpg` | 2400 × 1350 | 16:9 | Full-bleed behind the hero headline |
| 2 | `family-connected.jpg` | 1800 × 1000 | 16:9 | Wide band in the "Why fiber" section |
| 3 | `wifi-gateway.jpg` | 1600 × 1200 | 4:3 | Equipment band above the specs table |
| 4 | `technician-install.jpg` | 1600 × 1200 | 4:3 | Beside "Start an order" in How it works |
| 5 | `og-cover.jpg` | 1200 × 630 | 1.91:1 | Social share preview (not shown on the page) |

Export as **JPEG, quality 80–85, sRGB**. Don't bother optimising further —
`next/image` re-encodes to AVIF/WebP and generates every responsive size itself.

---

## Rules that apply to all five

These matter legally and for how real the images look.

**Never include:**
- Any Fidium logo, wordmark, colour-branded van, or branded uniform. You are an
  independent retailer, not the carrier — depicting Fidium branding misrepresents
  the relationship and is a genuine Google Ads and trademark risk.
- Any other ISP or competitor branding.
- Readable text on laptop or TV screens, or any legible signage.
- Recognisable real people or public figures.

**Always ask for:**
- Natural, available light — not studio lighting or a "cinematic" grade.
- Candid framing. Nobody looking at or posing for the camera.
- A lived-in room: a mug, a cushion out of place, a cable visible.

**Words to avoid in your prompt.** These push the model toward the glossy,
plastic, obviously-AI look: *8k, ultra detailed, hyperrealistic, masterpiece,
cinematic, award-winning, perfect, stunning, vibrant, professional photography.*

**Words that help.** Naming a real camera body, a real lens, an aperture and an
ISO is the single most effective way to get a photographic result:
*shot on a Canon EOS R6 with a 35mm lens at f/4, ISO 400, available light only,
slight sensor grain, no colour grading.*

---

## 1. `hero-home.jpg` — 2400 × 1350

This sits behind the headline under a white scrim, so roughly 70% of it is
washed out. Give it **simple shapes and a calm, bright composition** — fussy
detail will disappear. A dim or high-contrast photo will fight the dark text.

> A candid documentary photograph of a bright open-plan living room in an
> ordinary suburban American house on a clear weekday morning. Tall windows
> along the left wall flood the room with soft natural daylight and the far wall
> is pale and largely empty. In the mid-ground a woman in her thirties sits on a
> light grey sofa with a laptop on her knees, turned away from the camera and
> looking down at the screen, slightly out of focus. A child's backpack leans
> against an armchair and a half-finished mug sits on the coffee table. The room
> is lived-in rather than styled. Shot on a Canon EOS R6 with a 35mm lens at f/4,
> ISO 400, available window light only, no flash. Cool neutral white balance,
> soft natural shadows, gentle sensor grain, no colour grading. Wide horizontal
> framing with a lot of calm empty space through the middle of the frame. No
> text, no logos, no brand names anywhere, no readable screens.

---

## 2. `family-connected.jpg` — 1800 × 1000

Shows the core benefit: several people, several devices, one connection. The
bottom of this image is darkened for a caption, so keep the important content in
the upper two-thirds.

> A candid documentary photograph of a family of four in one open-plan living
> room on a weekday evening, each absorbed in something different. A teenage boy
> sits on the floor with a game controller, a girl of about ten lies on the rug
> with a tablet, a father works at a laptop at the dining table in the
> background, and a mother on the sofa is on a video call holding a phone. Nobody
> looks at the camera. Warm lamplight mixed with the cool glow of screens, the
> room slightly untidy with cushions and a throw blanket out of place. Shot on a
> Sony A7 III with a 35mm lens at f/2.8, ISO 1600, available light only. Natural
> mixed white balance, visible grain in the shadows, no colour grading. No
> readable screen content, no logos, no brand names.

---

## 3. `wifi-gateway.jpg` — 1600 × 1200

The router, in a real home rather than on a white studio backdrop. **The device
must be completely unbranded** — no logo, no model name, no printed text.

> A close product photograph of a plain matte-white cylindrical WiFi router
> standing on a light oak console table against a soft pale grey wall. The device
> is completely unbranded with no logo, no printed text and no model number — a
> single small green status light on the front is its only marking. A slim white
> cable runs down behind the table. A ceramic bowl and a folded newspaper sit
> just out of focus to one side. Shot on a Fujifilm X-T4 with a 56mm lens at
> f/2.8, ISO 200, soft natural daylight from a window to the left, no flash and
> no studio lighting. Shallow depth of field, gentle falloff into shadow on the
> right, neutral white balance, faint sensor grain. Domestic setting, not a
> studio.

---

## 4. `technician-install.jpg` — 1600 × 1200

Builds trust in the install process. The left side is darkened by a gradient, so
keep your subject **right of centre**. **Plain uniform, no company branding.**

> A candid documentary photograph of a field technician kneeling beside the
> exterior wall of a suburban house, terminating a fiber optic cable into a small
> white network enclosure. He wears a plain navy work shirt with no logo,
> no badge and no company name, and safety gloves. A basic open tool bag sits on
> the grass beside him. He is concentrating on the connection and not looking at
> the camera. Late afternoon daylight, slightly overcast, soft shadows. Shot on a
> Nikon Z6 with a 50mm lens at f/4, ISO 320, available light only, no flash.
> Natural colour, mild grain, no colour grading. Subject positioned to the right
> of the frame with the wall and grass filling the left side. No logos, no text,
> no branded vehicle.

---

## 5. `og-cover.jpg` — 1200 × 630

The thumbnail when the site is shared on WhatsApp, iMessage, LinkedIn, Slack.
Some platforms crop the edges, so keep the subject centred.

> A candid photograph of a modern suburban American house at dusk, viewed from
> the front garden. Warm light glows from the downstairs windows and the sky
> behind is a deep even blue just after sunset. The house is ordinary and
> well-kept rather than a luxury property, with a paved path and low planting.
> Shot on a Canon EOS R6 with a 35mm lens at f/5.6, ISO 800, available light
> only, tripod, no flash. Natural colour, soft even exposure, no colour grading,
> faint grain in the sky. Centred horizontal composition with the house filling
> the middle of the frame. No text, no logos, no house numbers, no people.

---

## After you add the files

```bash
npm run build
npm run start
```

If a picture is too prominent or too faint behind the hero headline, adjust the
middle stop of the scrim in `components/sections/Hero.tsx`:

```
from-white/92 via-white/72 to-white
                      ^^ lower = more photo, higher = more contrast for the text
```

## Adding more images later

Add an entry to `IMAGES` in `lib/images.ts`:

```ts
newSlot: {
  file: 'my-photo.jpg',
  alt: 'Describe what the photo shows',
  width: 1600,
  height: 1200,
},
```

Then in a **server** component, guard the markup with `hasImage('newSlot')` from
`lib/images.server.ts` and render it with `next/image` using `imageSrc('newSlot')`.
If the component is a client component, resolve `hasImage` in its server parent
and pass the boolean down as a prop, the way `app/page.tsx` does for the hero.
