/**
 * Makes display order and featured selection explicit and data-driven.
 *
 * Previously `num` and `featured` were hand-written on each entry, so changing
 * which projects are featured meant renumbering everything by hand. Now a
 * single ORDER list drives both, and `num` is derived, so it cannot drift.
 *
 *   node scripts/refactor-project-order.mjs
 */
import fs from 'node:fs'

const p = 'src/data/projects.js'
const raw = fs.readFileSync(p, 'utf8')
const crlf = raw.includes('\r\n')
let s = raw.replace(/\r\n/g, '\n')

const before = s

// The array becomes internal; the exported list is derived from it.
s = s.replace('export const PROJECTS = [', 'const CATALOGUE = [')

// Drop the hand-maintained fields.
const numCount = (s.match(/^ {4}num: '\d+',\n/gm) || []).length
const featCount = (s.match(/^ {4}featured: true,\n/gm) || []).length
s = s.replace(/^ {4}num: '\d+',\n/gm, '')
s = s.replace(/^ {4}featured: true,\n/gm, '')

if (s === before) {
  console.error('FAIL: nothing matched, projects.js is not in the expected shape')
  process.exit(1)
}

const derived = `
/**
 * Display order, featured first. This is the single place to change which
 * projects lead the home page or in what order the index lists them.
 */
const ORDER = [
  'sottomonte',
  'sabioncello',
  'bmfit',
  'sabioncello-grafika',
  'camping-loviste-paradise',
  'visit-eva-orebic',
  'dani-cvjetnog',
]

/** The three that get full-width rows on the home page. */
const FEATURED = new Set(['sottomonte', 'sabioncello', 'bmfit'])

const missing = ORDER.filter((slug) => !CATALOGUE.some((p) => p.slug === slug))
if (missing.length) {
  throw new Error(\`ORDER references unknown project slug(s): \${missing.join(', ')}\`)
}
if (ORDER.length !== CATALOGUE.length) {
  throw new Error(
    \`ORDER lists \${ORDER.length} projects but the catalogue has \${CATALOGUE.length}\`,
  )
}

/**
 * \`num\` is derived from position, so it can never disagree with the order the
 * visitor actually sees.
 */
export const PROJECTS = ORDER.map((slug, i) => {
  const project = CATALOGUE.find((p) => p.slug === slug)
  return {
    ...project,
    num: String(i + 1).padStart(2, '0'),
    featured: FEATURED.has(slug),
  }
})
`

s = s.replace('\nexport const FEATURED_PROJECTS', `${derived}\nexport const FEATURED_PROJECTS`)

fs.writeFileSync(p, crlf ? s.replace(/\n/g, '\r\n') : s, 'utf8')
console.log(`ok: removed ${numCount} num fields and ${featCount} featured flags, added derived order`)
