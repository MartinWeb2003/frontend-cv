/**
 * Generates a narrow variant of every screenshot so phones stop downloading a
 * 1600px image into a ~390px slot.
 *
 * Reads the archived full-resolution PNGs (never the already-compressed WebP,
 * which would be lossy-on-lossy) and writes <name>-800.webp beside the existing
 * <name>.webp. imageMeta.json gains a `widths` array per entry, which
 * src/data/imageAttrs.js turns into srcset/sizes.
 *
 *   node scripts/generate-srcset.mjs
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const PUBLIC = 'public'
const ARCHIVE = 'assets-original'
const META = 'src/data/imageMeta.json'

/** 800 covers a full-width phone slot at 2x DPR; 1600 stays the desktop source. */
const NARROW = 800
const QUALITY = 80

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

async function main() {
  const meta = JSON.parse(await fs.readFile(META, 'utf8'))
  const archived = await fs.readdir(ARCHIVE)

  let before = 0
  let after = 0
  let made = 0

  for (const [key, entry] of Object.entries(meta)) {
    if (!key.endsWith('.webp')) continue

    const base = path.basename(key, '.webp')
    const source = archived.find((n) => n === `${base}.png`)
    if (!source) {
      // logo and anything without an archived original keeps a single width.
      entry.widths = [entry.width]
      continue
    }

    if (entry.width <= NARROW) {
      entry.widths = [entry.width]
      continue
    }

    const out = path.join(PUBLIC, `${base}-${NARROW}.webp`)
    const info = await sharp(path.join(ARCHIVE, source))
      .rotate()
      .resize({ width: NARROW, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(out)

    const full = await fs.stat(path.join(PUBLIC, `${base}.webp`))
    before += full.size
    after += info.size
    made++

    entry.widths = [info.width, entry.width]
    console.log(`  ${base}-${NARROW}.webp  ${info.width}x${info.height}  ${kb(info.size)}  (full: ${kb(full.size)})`)
  }

  const ordered = Object.fromEntries(Object.entries(meta).sort(([a], [b]) => a.localeCompare(b)))
  await fs.writeFile(META, JSON.stringify(ordered, null, 2) + '\n', 'utf8')

  console.log(`\n${made} narrow variants written`)
  console.log(`phone payload for these images: ${kb(before)} -> ${kb(after)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
