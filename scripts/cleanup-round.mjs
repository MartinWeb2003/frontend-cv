/**
 * Batch cleanup:
 *   1. heavier travelling stroke on the drawn titles
 *   2. remove the top scroll-progress bar
 *   3. remove the numeric index from the side-menu links
 *   4. remove the CurveSplit overlay from the 3D section
 *   5. remove the coloured tint overlay from the project row images
 *
 *   node scripts/cleanup-round.mjs
 */
import fs from 'node:fs'

let fail = 0
const files = {}
const crlfMap = {}

function load(p) {
  if (files[p] === undefined) {
    const raw = fs.readFileSync(p, 'utf8')
    crlfMap[p] = raw.includes('\r\n')
    files[p] = raw.replace(/\r\n/g, '\n')
  }
  return files[p]
}
function sub(p, from, to, label, expect = 1) {
  const s = load(p)
  const n = s.split(from).length - 1
  if (n !== expect) {
    console.error(`FAIL [${label}] ${p}: matched ${n}x, expected ${expect}`)
    fail++
    return
  }
  files[p] = s.split(from).join(to)
  console.log(`ok   [${label}]`)
}
function append(p, text, label) {
  files[p] = load(p) + text
  console.log(`ok   [${label}]`)
}

/** Remove whole CSS rules whose selector matches, brace-matched. */
function dropRules(p, pattern, label) {
  const lines = load(p).split('\n')
  const kept = []
  let depth = 0
  let dropping = false
  let removed = 0
  for (const line of lines) {
    if (!dropping && pattern.test(line) && line.includes('{')) {
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
  files[p] = kept.join('\n').replace(/\n{3,}/g, '\n\n')
  console.log(`ok   [${label}] removed ${removed} rule(s)`)
}

/* ---------- 1. Heavier travelling stroke ---------- */
append(
  'src/components/Projects.css',
  `
/* Heavier stroke while the title draws itself; it settles to the resting
   width once the outline has travelled. */
.projects-header__title .drawtitle__line {
  --drawtitle-stroke-draw: 8px;
}
`,
  'draw-stroke-home',
)
append(
  'src/pages/ProjectsIndexPage.css',
  `
.pindex__title .drawtitle__line {
  --drawtitle-stroke-draw: 6px;
}
`,
  'draw-stroke-index',
)

/* ---------- 2. Scroll progress bar ---------- */
sub('src/App.jsx', "import ScrollProgress from './components/ScrollProgress'\n", '', 'scrollprogress-import')
sub('src/App.jsx', '      <ScrollProgress />\n', '', 'scrollprogress-usage')

/* ---------- 3. Side-menu numbers ---------- */
sub(
  'src/bits/StaggeredMenu.jsx',
  '                      <span className="smenu-link__num">0{i + 1}</span>\n',
  '',
  'menu-numbers',
)
dropRules('src/bits/StaggeredMenu.css', /^\s*\.smenu-link__num\b/, 'menu-number-css')

/* ---------- 4. CurveSplit ---------- */
sub('src/components/About.jsx', "import CurveSplit from '../bits/CurveSplit'\n", '', 'curvesplit-import')
sub('src/components/About.jsx', '            <CurveSplit id="about-3d-curve" />\n', '', 'curvesplit-usage')
sub(
  'src/components/About.css',
  '  /* Contains the CurveSplit blend so it cannot reach the rest of the page. */\n  isolation: isolate;\n',
  '',
  'curvesplit-isolation',
)

/* ---------- 5. Project image tint ---------- */
sub(
  'src/components/Projects.jsx',
  '          <div className="proj-row__pattern" style={{ background: PLACEHOLDER_ACCENT[project.id] }} />\n',
  '',
  'image-tint-markup',
)
dropRules('src/components/Projects.css', /^\s*\.proj-row__pattern\b/, 'image-tint-css')

if (fail) {
  console.error(`\n${fail} replacement(s) failed, nothing written.`)
  process.exit(1)
}
for (const [p, s] of Object.entries(files)) {
  fs.writeFileSync(p, crlfMap[p] ? s.replace(/\n/g, '\r\n') : s, 'utf8')
}

for (const dead of [
  'src/components/ScrollProgress.jsx',
  'src/components/ScrollProgress.css',
  'src/bits/CurveSplit.jsx',
  'src/bits/CurveSplit.css',
]) {
  if (fs.existsSync(dead)) {
    fs.unlinkSync(dead)
    console.log(`ok   [deleted] ${dead}`)
  }
}
console.log('\nDone.')
