/**
 * Replaces the Sottomonte project screenshots with fresh captures of the
 * current sottomonte.hr, taken with headless Chrome.
 *
 * Old sources are moved to assets-original/superseded/, never deleted.
 *
 *   node scripts/update-sottomonte-shots.mjs <shots-dir>
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SHOTS = process.argv[2]
if (!SHOTS) {
  console.error('usage: node scripts/update-sottomonte-shots.mjs <shots-dir>')
  process.exit(1)
}

const PUBLIC = 'public'
const ARCHIVE = 'assets-original'
const SUPERSEDED = path.join(ARCHIVE, 'superseded')
const META = 'src/data/imageMeta.json'

const MAX_WIDTH = 1600
const QUALITY = 80

/**
 * Ordered so images[0] (the card and hero image) is the homepage.
 * `cropTop` trims the transparent-header strip that sits over the white
 * background on interior pages and reads as a rendering artefact.
 */
const SHOTS_IN_ORDER = [
  { file: 'test-home.png', out: 'sotto1' },
  { file: 'p2-nekretnine.png', out: 'sotto2' },
  { file: 'p3-detalj.png', out: 'sotto3', cropTop: 72 },
  { file: 'p4-lokacija.png', out: 'sotto4' },
  { file: 'p5-kupnja.png', out: 'sotto5' },
]

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

async function main() {
  await fs.mkdir(SUPERSEDED, { recursive: true })

  // Archive the outdated sources and their derived WebP files.
  for (const dir of [ARCHIVE, PUBLIC]) {
    for (const name of await fs.readdir(dir)) {
      if (/^sotto\d+\.(png|webp)$/i.test(name)) {
        await fs.rename(path.join(dir, name), path.join(SUPERSEDED, name))
        console.log(`  archived ${path.join(dir, name)}`)
      }
    }
  }

  const meta = JSON.parse(await fs.readFile(META, 'utf8'))
  for (const key of Object.keys(meta)) {
    if (/^\/sotto\d+\.webp$/.test(key)) delete meta[key]
  }

  console.log('')
  for (const shot of SHOTS_IN_ORDER) {
    const src = path.join(SHOTS, shot.file)
    const base = sharp(src).rotate()
    const { width, height } = await base.metadata()

    let pipeline = sharp(src).rotate()
    if (shot.cropTop) {
      pipeline = pipeline.extract({
        left: 0,
        top: shot.cropTop,
        width,
        height: height - shot.cropTop,
      })
    }

    const info = await pipeline
      .resize({ width: Math.min(width, MAX_WIDTH), withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(path.join(PUBLIC, `${shot.out}.webp`))

    meta[`/${shot.out}.webp`] = { width: info.width, height: info.height }

    // Keep the full-resolution capture as the archived source.
    await fs.copyFile(src, path.join(ARCHIVE, `${shot.out}.png`))

    console.log(`  ${shot.out}.webp  ${info.width}x${info.height}  ${kb(info.size)}   <- ${shot.file}`)
  }

  const ordered = Object.fromEntries(Object.entries(meta).sort(([a], [b]) => a.localeCompare(b)))
  await fs.writeFile(META, JSON.stringify(ordered, null, 2) + '\n', 'utf8')
  console.log(`\nupdated ${META}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
