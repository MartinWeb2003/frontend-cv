// Pass 2: Lighthouse 13.5.0, mobile, default simulated throttling (the same
// configuration PageSpeed Insights uses), on a seeded random sample of the
// sites that responded in pass 1. Writes lh.jsonl incrementally so a crash
// loses nothing and a re-run resumes.
import fs from 'node:fs/promises'

const N = 400
const CONCURRENCY = 3
const SEED = 2026

// Mulberry32: tiny seeded PRNG, so the sample is reproducible.
function rng(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const survey = JSON.parse(await fs.readFile('survey.json', 'utf8'))
const pool = survey.filter((r) => r.ok).sort((a, b) => a.domain.localeCompare(b.domain))
const rand = rng(SEED)
for (let i = pool.length - 1; i > 0; i--) {
  const j = Math.floor(rand() * (i + 1))
  ;[pool[i], pool[j]] = [pool[j], pool[i]]
}
const sample = pool.slice(0, N)

const done = new Set()
try {
  for (const line of (await fs.readFile('lh.jsonl', 'utf8')).split('\n').filter(Boolean)) done.add(JSON.parse(line).domain)
} catch { /* first run */ }
const queue = sample.filter((s) => !done.has(s.domain))
console.log(`sample ${sample.length}, remaining ${queue.length}`)

/*
 * Each audit runs as its own Lighthouse CLI process: Lighthouse keeps global
 * performance marks, so several runs inside one Node process corrupt each
 * other ("performance mark has not been set").
 */
import { execFile } from 'node:child_process'
import path from 'node:path'
const CLI = path.resolve('node_modules/lighthouse/cli/index.js')

function runCli(url, out) {
  return new Promise((resolve) => {
    execFile(
      process.execPath,
      [CLI, url, '--output=json', `--output-path=${out}`, '--only-categories=performance', '--quiet',
        '--chrome-flags=--headless=new --no-sandbox --disable-gpu --mute-audio', '--max-wait-for-load=45000'],
      { timeout: 150000, windowsHide: true },
      (err) => resolve(err ? String(err.message).slice(0, 80) : null),
    )
  })
}

async function audit(site) {
  const url = site.finalUrl || site.recovered || `https://${site.domain}/`
  const out = path.resolve('tmp', `${site.domain}.json`)
  const err = await runCli(url, out)
  try {
    const lhr = JSON.parse(await fs.readFile(out, 'utf8'))
    await fs.unlink(out)
    const a = lhr.audits
    const num = (id) => (a[id] && typeof a[id].numericValue === 'number' ? a[id].numericValue : null)
    return {
      domain: site.domain, type: site.type, county: site.county, platform: site.platform,
      score: lhr.categories.performance.score,
      lcp: num('largest-contentful-paint'), fcp: num('first-contentful-paint'), tbt: num('total-blocking-time'),
      cls: num('cumulative-layout-shift'), si: num('speed-index'), bytes: num('total-byte-weight'),
      runtimeError: lhr.runtimeError?.code ?? null, lhVersion: lhr.lighthouseVersion,
    }
  } catch {
    return { domain: site.domain, type: site.type, county: site.county, error: err || 'no-report' }
  }
}

await fs.mkdir('tmp', { recursive: true })

let n = 0
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const s = queue.shift()
      const row = await audit(s)
      await fs.appendFile('lh.jsonl', JSON.stringify(row) + '\n')
      if (++n % 25 === 0) console.log(new Date().toISOString().slice(11, 19), n)
    }
  }),
)
console.log('finished', n)
