/**
 * Removes the counter/stats bento block from the Skills section: markup, data,
 * the now-unused import, its CSS rules and its translation strings.
 *
 *   node scripts/remove-skills-stats.mjs
 */
import fs from 'node:fs'

let fail = 0
function edit(p, fn) {
  const raw = fs.readFileSync(p, 'utf8')
  const crlf = raw.includes('\r\n')
  const before = raw.replace(/\r\n/g, '\n')
  const after = fn(before)
  if (after === null) {
    fail++
    return
  }
  fs.writeFileSync(p, crlf ? after.replace(/\n/g, '\r\n') : after, 'utf8')
}

function cut(s, from, to, label) {
  const n = s.split(from).length - 1
  if (n !== 1) {
    console.error(`FAIL [${label}]: matched ${n}x, expected 1`)
    return null
  }
  console.log(`ok   [${label}]`)
  return s.replace(from, to)
}

/* ---------- Skills.jsx ---------- */
edit('src/components/Skills.jsx', (s) => {
  let out = s

  out = cut(
    out,
    `const BENTO_STATS_DEF = [
  { to: 16, suffix: '+', labelKey: 'skills.stat1Label', subKey: 'skills.stat1Sub' },
  { to: 3,  suffix: '+', labelKey: 'skills.stat2Label', subKey: 'skills.stat2Sub' },
  { to: 8,  suffix: '+', labelKey: 'skills.stat3Label', subKey: 'skills.stat3Sub' },
  { to: 3,  suffix: '',  labelKey: 'skills.stat4Label', subKey: 'skills.stat4Sub' },
]

`,
    '',
    'stats-data',
  )
  if (out === null) return null

  const blockStart = out.indexOf('      <motion.div\n        className="skills__bento-section"')
  const blockEnd = out.indexOf('      </motion.div>\n', blockStart)
  if (blockStart === -1 || blockEnd === -1) {
    console.error('FAIL [stats-markup]: block not found')
    return null
  }
  out = out.slice(0, blockStart) + out.slice(blockEnd + '      </motion.div>\n'.length)
  console.log('ok   [stats-markup]')

  out = cut(out, "import MagicBento from '../bits/MagicBento'\n", '', 'magicbento-import')
  if (out === null) return null

  // Tidy the blank lines left behind.
  out = out.replace(/\n{3,}(\s*<\/section>)/, '\n\n$1')
  return out
})

/* ---------- Skills.css ---------- */
edit('src/components/Skills.css', (s) => {
  const lines = s.split('\n')
  const kept = []
  let depth = 0
  let dropping = false
  let removed = 0

  for (const line of lines) {
    if (!dropping && /^\s*\.skills__bento[^{]*\{/.test(line)) {
      dropping = true
      depth = 0
      removed++
    }
    if (dropping) {
      depth += (line.match(/\{/g) || []).length
      depth -= (line.match(/\}/g) || []).length
      if (depth <= 0) dropping = false
      continue
    }
    kept.push(line)
  }
  console.log(`ok   [skills-css] removed ${removed} .skills__bento rule(s)`)
  return kept.join('\n').replace(/\n{3,}/g, '\n\n')
})

if (fail) {
  console.error(`\n${fail} file(s) failed`)
  process.exit(1)
}

/* ---------- locale strings ---------- */
for (const lng of ['hr', 'en', 'de', 'pl']) {
  const p = `src/locales/${lng}.json`
  const j = JSON.parse(fs.readFileSync(p, 'utf8'))
  let n = 0
  for (const k of Object.keys(j.skills)) {
    if (/^stat[1-4](Label|Sub)$/.test(k)) {
      delete j.skills[k]
      n++
    }
  }
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')
  console.log(`ok   [${lng}] removed ${n} stat string(s)`)
}
