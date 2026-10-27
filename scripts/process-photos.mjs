/**
 * Optimises the licensed photos listed in src/data/photos.js:
 * assets-original/photos/<src> -> public/photos/<key>.webp (max 1600 wide)
 * plus an 800px srcset variant, and records dimensions in imageMeta.json so
 * imgAttrs() can prevent layout shift. Cutouts keep their alpha channel.
 *
 * Background removal itself is a one-off step done on the masters (rembg for
 * objects, an OpenCV sky mask for the cypresses); its outputs are the
 * `*-cut.png` files in assets-original/photos/.
 *
 *   node scripts/process-photos.mjs
 */
import fs from 'node:fs/promises'
import sharp from 'sharp'
import { PHOTOS } from '../src/data/photos.js'

const META = 'src/data/imageMeta.json'
const MAX = 1600

const meta = JSON.parse(await fs.readFile(META, 'utf8'))
await fs.mkdir('public/photos', { recursive: true })

for (const [key, p] of Object.entries(PHOTOS)) {
  const file = `assets-original/photos/${p.src}`
  // `trim` strips a scanned or exported border before anything else.
  const src = p.trim ? await sharp(file).trim({ threshold: 40 }).toBuffer() : file
  const { width } = await sharp(src).metadata()
  const w = Math.min(width, p.max ?? MAX)
  const opts = p.cutout ? { quality: 82, alphaQuality: 90, effort: 5 } : { quality: 78, effort: 5 }

  const info = await sharp(src).resize({ width: w }).webp(opts).toFile(`public/photos/${key}.webp`)
  const widths = [w]
  if (w > 900) {
    await sharp(src).resize({ width: 800 }).webp(opts).toFile(`public/photos/${key}-800.webp`)
    widths.unshift(800)
  }
  meta[`/photos/${key}.webp`] = { width: info.width, height: info.height, widths }
  console.log(`  /photos/${key}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`)
}

const sorted = Object.fromEntries(Object.entries(meta).sort(([a], [b]) => a.localeCompare(b)))
await fs.writeFile(META, JSON.stringify(sorted, null, 2) + '\n', 'utf8')
