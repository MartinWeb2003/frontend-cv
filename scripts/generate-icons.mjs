/**
 * The favicon set from public/logo.png: favicon.ico (16/32/48), a 180px
 * apple-touch-icon on the paper background (iOS fills transparency with
 * black), and 192/512 PNGs for the web manifest, including a maskable 512
 * with the safe-zone padding Android expects.
 *
 *   node scripts/generate-icons.mjs
 */
import fs from 'node:fs/promises'
import sharp from 'sharp'

const SRC = 'public/logo.png'
const PAPER = '#F6F3EE' // --paper in src/index.css

const square = (size, pad, background) =>
  sharp(SRC)
    .resize(Math.round(size * (1 - pad * 2)), Math.round(size * (1 - pad * 2)), { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: Math.round(size * pad),
      bottom: size - Math.round(size * (1 - pad * 2)) - Math.round(size * pad),
      left: Math.round(size * pad),
      right: size - Math.round(size * (1 - pad * 2)) - Math.round(size * pad),
      background: background ?? { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .flatten(background ? { background } : false)
    .png()

await square(180, 0.14, PAPER).toFile('public/apple-touch-icon.png')
await square(192, 0.06).toFile('public/icon-192.png')
await square(512, 0.06).toFile('public/icon-512.png')
await square(512, 0.2, PAPER).toFile('public/icon-maskable-512.png')

/* favicon.ico: PNG-compressed entries, which every current browser reads. */
const sizes = [16, 32, 48]
const pngs = await Promise.all(sizes.map((s) => square(s, 0.04).toBuffer()))
const header = Buffer.alloc(6 + 16 * sizes.length)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(sizes.length, 4)
let offset = header.length
sizes.forEach((s, i) => {
  const e = 6 + i * 16
  header.writeUInt8(s, e)
  header.writeUInt8(s, e + 1)
  header.writeUInt8(0, e + 2)
  header.writeUInt8(0, e + 3)
  header.writeUInt16LE(1, e + 4)
  header.writeUInt16LE(32, e + 6)
  header.writeUInt32LE(pngs[i].length, e + 8)
  header.writeUInt32LE(offset, e + 12)
  offset += pngs[i].length
})
await fs.writeFile('public/favicon.ico', Buffer.concat([header, ...pngs]))

console.log('  favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png, icon-maskable-512.png')
