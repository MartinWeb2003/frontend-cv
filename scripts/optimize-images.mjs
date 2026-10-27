/**
 * Converts the portfolio screenshots to WebP and records their intrinsic
 * dimensions so every <img> can ship width/height (kills layout shift).
 *
 * Originals are MOVED to assets-original/ rather than deleted: they stay in the
 * repo and in git, but leave public/ so Vite stops copying ~10 MB into dist/.
 *
 *   node scripts/optimize-images.mjs
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const PUBLIC = 'public'
const ARCHIVE = 'assets-original'
const META_OUT = 'src/data/imageMeta.json'

const MAX_WIDTH = 1600
const QUALITY = 80

/** logo.png stays a PNG too — it is the favicon and needs universal support. */
const LOGO = 'logo.png'
const ICONS = new Set(['apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'])
const LOGO_MAX = 512

const bytes = (n) => `${(n / 1024).toFixed(0)} KB`

async function main() {
  await fs.mkdir(ARCHIVE, { recursive: true })
  await fs.mkdir(path.dirname(META_OUT), { recursive: true })

  const entries = await fs.readdir(PUBLIC, { withFileTypes: true })
  const pngs = entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.png'))
    // Favicon PNGs from generate-icons.mjs must stay PNG and stay in public/.
    .filter((e) => !ICONS.has(e.name))
    .map((e) => e.name)

  // Merge into the existing metadata: covers, art and photos are recorded
  // there by their own scripts and must survive a re-run of this one.
  const meta = JSON.parse(await fs.readFile(META_OUT, 'utf8').catch(() => '{}'))
  let before = 0
  let after = 0

  for (const name of pngs) {
    const src = path.join(PUBLIC, name)
    const stat = await fs.stat(src)
    before += stat.size

    const isLogo = name === LOGO
    const base = name.replace(/\.png$/i, '')
    const outName = `${base}.webp`
    const out = path.join(PUBLIC, outName)

    const pipeline = sharp(src).rotate()
    const { width } = await pipeline.metadata()
    const cap = isLogo ? LOGO_MAX : MAX_WIDTH

    const info = await sharp(src)
      .rotate()
      .resize({ width: Math.min(width, cap), withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(out)

    after += info.size
    meta[`/${outName}`] = { width: info.width, height: info.height }
    console.log(`  ${name} ${bytes(stat.size)} -> ${outName} ${bytes(info.size)}`)

    if (isLogo) {
      // Re-encode the PNG favicon smaller, in place, and keep it in public/.
      const buf = await sharp(src)
        .rotate()
        .resize({ width: LOGO_MAX, withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true })
        .toBuffer()
      await fs.writeFile(src, buf)
      console.log(`  ${name} re-encoded in place -> ${bytes(buf.length)} (favicon)`)
      continue
    }

    await fs.rename(src, path.join(ARCHIVE, name))
  }

  // The social card now follows the colour tokens: scripts/brand-assets.mjs.

  await fs.writeFile(META_OUT, JSON.stringify(meta, null, 2) + '\n', 'utf8')
  console.log(`\nwrote ${META_OUT} (${Object.keys(meta).length} entries)`)
  console.log(`public/ PNG payload ${bytes(before)} -> WebP ${bytes(after)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
