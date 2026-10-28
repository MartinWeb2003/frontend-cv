/**
 * Backdrops for the 3D showcase: each project's hero screenshot reduced to a
 * tiny, heavily blurred colour field, so behind the laptop the section takes
 * on the mood of the site on screen. Blurring happens here, once, so the
 * page ships ~1-2 KB images and never runs a live CSS blur.
 *
 *   node scripts/showcase-backdrops.mjs
 *
 * Output: public/showcase/<slug>.webp for every SHOWCASE_PROJECTS entry.
 */
import fs from 'node:fs/promises'
import sharp from 'sharp'
import { SHOWCASE_PROJECTS } from '../src/data/projects.js'

await fs.mkdir('public/showcase', { recursive: true })

for (const p of SHOWCASE_PROJECTS) {
  const src = `public${p.images[0].replace(/\.webp$/, '-800.webp')}`
  const out = `public/showcase/${p.slug}.webp`
  const info = await sharp(src)
    .resize(64, 40, { fit: 'cover' })
    .blur(3)
    .modulate({ saturation: 1.25 })
    .webp({ quality: 70 })
    .toFile(out)
  console.log(`  ${out}  ${info.size} B`)
}
