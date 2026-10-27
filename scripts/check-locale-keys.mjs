/**
 * Fails the build when a translation key used in the source is missing from a
 * locale, or when any locale string contains an em dash. CLAUDE.md treats
 * both as build failures, not warnings.
 *
 * Only static keys, t('ns.key'), can be checked. Keys built from templates
 * (t(`projects.${key}Title`)) are covered by the data-driven prerender, which
 * renders every one of them.
 *
 * Services, pricing, the blog and location pages exist in hr and en only (see
 * SERVICE_LOCALES), so their namespaces are only required there.
 *
 *   node scripts/check-locale-keys.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const LOCALES = ['hr', 'en', 'de', 'pl']
const PARTIAL = ['pricingPage.', 'blog.', 'locations.', 'services.']
const PARTIAL_LOCALES = ['hr', 'en']

const files = []
;(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (/\.(jsx?|mjs)$/.test(e.name)) files.push(p)
  }
})('src')

const used = new Map()
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8')
  for (const m of src.matchAll(/\bt\(\s*['"]([A-Za-z0-9_]+\.[A-Za-z0-9_.]+)['"]/g)) {
    if (!used.has(m[1])) used.set(m[1], f)
  }
}

const get = (obj, key) => key.split('.').reduce((o, k) => (o == null ? o : o[k]), obj)

let failures = 0
for (const lng of LOCALES) {
  const data = JSON.parse(fs.readFileSync(`src/locales/${lng}.json`, 'utf8'))
  for (const [key, file] of used) {
    const partial = PARTIAL.some((p) => key.startsWith(p))
    if (partial && !PARTIAL_LOCALES.includes(lng)) continue
    if (typeof get(data, key) !== 'string') {
      console.error(`  missing  ${lng}  ${key}  (${file})`)
      failures++
    }
  }
  const raw = fs.readFileSync(`src/locales/${lng}.json`, 'utf8')
  const dashes = raw.split('\n').filter((l) => l.includes('—'))
  for (const l of dashes) {
    console.error(`  em dash  ${lng}  ${l.trim().slice(0, 100)}`)
    failures++
  }
}

if (failures) {
  console.error(`\n${failures} locale problem(s).`)
  process.exit(1)
}
console.log(`  ${used.size} static keys present in every locale that needs them; no em dashes.`)
