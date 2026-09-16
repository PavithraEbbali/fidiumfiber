import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { IMAGES, type ImageKey } from './images';

/* =============================================================================
 *  lib/images.server.ts  —  BUILD-TIME IMAGE PRESENCE
 * =============================================================================
 *  Separated from lib/images.ts because it touches the filesystem, which cannot
 *  be bundled into a client component. The manifest itself stays client-safe.
 *
 *  These run during the build (and during `next dev` renders), so the result is
 *  baked into the static HTML. Call from a server component and pass the
 *  booleans down as props.
 * ---------------------------------------------------------------------------*/

/** True when the file actually exists in public/images/. */
export function hasImage(key: ImageKey): boolean {
  try {
    return fs.existsSync(
      path.join(process.cwd(), 'public', 'images', IMAGES[key].file)
    );
  } catch {
    return false;
  }
}

/** Which slots are currently filled. */
export function imageFlags(): Record<ImageKey, boolean> {
  return Object.fromEntries(
    (Object.keys(IMAGES) as ImageKey[]).map((k) => [k, hasImage(k)])
  ) as Record<ImageKey, boolean>;
}
