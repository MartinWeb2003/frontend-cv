/**
 * Brand assets that follow the colour tokens in src/index.css:
 *
 *   public/logo.png, public/logo.webp   the mark, filled with --accent
 *   public/og-image.jpg                  1200x630 social card (og:image)
 *
 * The logo is recoloured from its own alpha channel, so the shape is never
 * redrawn: change --accent, run this, and the mark follows. The original
 * crimson master is kept in assets-original/logo-crimson.png.
 *
 * Run `node scripts/generate-icons.mjs` afterwards for the favicon set.
 *
 *   node scripts/brand-assets.mjs
 */
import fs from 'node:fs/promises'
import sharp from 'sharp'

const META = 'src/data/imageMeta.json'
const css = await fs.readFile('src/index.css', 'utf8')
const tok = (name) => {
  const m = css.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`))
  if (!m) throw new Error(`token ${name} not found`)
  return m[1]
}
const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))

const ACCENT = tok('--accent')
const LIFT = tok('--accent-lift')
const INK = tok('--ink')
const INK3 = tok('--ink-3')
const ONINK = tok('--on-ink')
const ONINK2 = tok('--on-ink-2')

/* ── Logo: keep the alpha, replace the colour ── */
try {
  await fs.access('assets-original/logo-crimson.png')
} catch {
  await fs.copyFile('public/logo.png', 'assets-original/logo-crimson.png')
}
const master = sharp('assets-original/logo-crimson.png').ensureAlpha()
const { width, height } = await master.metadata()
const alpha = await master.clone().extractChannel('alpha').toBuffer()
const [r, g, b] = hexToRgb(ACCENT)
const recoloured = sharp({ create: { width, height, channels: 3, background: { r, g, b } } }).joinChannel(alpha)
await recoloured.clone().png({ compressionLevel: 9 }).toFile('public/logo.png')
const webp = await recoloured.clone().webp({ quality: 90, alphaQuality: 100 }).toFile('public/logo.webp')
console.log(`  logo.png / logo.webp recoloured to ${ACCENT}`)

/* ── Social card: the mark, the name, what the site does ── */
const W = 1200
const H = 630
const markPng = await sharp('public/logo.png').resize(150, 150).png().toBuffer()
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <circle cx="1040" cy="560" r="300" fill="${INK3}"/>
  <circle cx="1040" cy="560" r="190" fill="none" stroke="${LIFT}" stroke-opacity="0.35" stroke-width="3"/>
  <rect x="80" y="430" width="420" height="6" rx="3" fill="${LIFT}"/>
  <text x="80" y="300" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="104" font-weight="700" fill="${ONINK}" letter-spacing="-4">Martin Bogoje</text>
  <text x="80" y="372" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="34" font-weight="500" fill="${ONINK2}">Web stranice za turizam, nekretnine i lokalne tvrtke</text>
  <text x="80" y="500" font-family="Consolas, Courier New, monospace" font-size="24" fill="${ONINK2}" letter-spacing="3">BOGOJEMARTIN.COM</text>
</svg>`
const og = await sharp(Buffer.from(svg))
  .composite([{ input: markPng, left: 80, top: 80 }])
  .jpeg({ quality: 88 })
  .toFile('public/og-image.jpg')
console.log(`  og-image.jpg ${og.width}x${og.height}`)

const meta = JSON.parse(await fs.readFile(META, 'utf8'))
meta['/logo.webp'] = { width: webp.width, height: webp.height }
meta['/og-image.jpg'] = { width: og.width, height: og.height }
const sorted = Object.fromEntries(Object.entries(meta).sort(([a], [b2]) => a.localeCompare(b2)))
await fs.writeFile(META, JSON.stringify(sorted, null, 2) + '\n', 'utf8')
