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
import { PERSON } from '../src/seo/siteConfig.js'

const PUBLIC = 'public'
const ARCHIVE = 'assets-original'
const META_OUT = 'src/data/imageMeta.json'

const MAX_WIDTH = 1600
const QUALITY = 80

/** logo.png stays a PNG too — it is the favicon and needs universal support. */
const LOGO = 'logo.png'
const LOGO_MAX = 512

const bytes = (n) => `${(n / 1024).toFixed(0)} KB`

async function main() {
  await fs.mkdir(ARCHIVE, { recursive: true })
  await fs.mkdir(path.dirname(META_OUT), { recursive: true })

  const entries = await fs.readdir(PUBLIC, { withFileTypes: true })
  const pngs = entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.png'))
    .map((e) => e.name)

  const meta = {}
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

  await buildOgImage(meta)

  await fs.writeFile(META_OUT, JSON.stringify(meta, null, 2) + '\n', 'utf8')
  console.log(`\nwrote ${META_OUT} (${Object.keys(meta).length} entries)`)
  console.log(`public/ PNG payload ${bytes(before)} -> WebP ${bytes(after)}`)
}

/** 1200x630 social card referenced by og:image / twitter:image. */
async function buildOgImage(meta) {
  const W = 1200
  const H = 630
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#0A0A0A"/>
  <rect x="0" y="0" width="${W}" height="8" fill="#A51C30"/>
  <text x="80" y="250" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="112" font-weight="800" fill="#FFFFFF" letter-spacing="-3">Martin</text>
  <text x="80" y="370" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="112" font-weight="800" fill="#A51C30" letter-spacing="-3">Bogoje</text>
  <text x="80" y="452" font-family="Consolas, Courier New, monospace" font-size="27" fill="#9A9A9A" letter-spacing="4">SOFTWARE DEVELOPER</text>
  <text x="80" y="540" font-family="Consolas, Courier New, monospace" font-size="23" fill="#6E6E6E" letter-spacing="2">${esc(PERSON.locality)} · React · Full-Stack · UI/UX</text>
</svg>`

  const out = path.join(PUBLIC, 'og-image.jpg')
  const info = await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(out)
  meta['/og-image.jpg'] = { width: info.width, height: info.height }
  console.log(`  og-image.jpg generated ${info.width}x${info.height} ${bytes(info.size)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
