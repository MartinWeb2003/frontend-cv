/**
 * Final pass: CSS for the new anchor-based links, 404 strings, self-hosted
 * fonts in the HTML shell, and the three.js chunk split.
 *
 *   node scripts/apply-polish.mjs
 */
import fs from 'node:fs'

let fail = 0
const files = {}
const wasCrlf = {}

function load(p) {
  if (files[p] === undefined) {
    const raw = fs.readFileSync(p, 'utf8')
    wasCrlf[p] = raw.includes('\r\n')
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
function append(p, css, label) {
  files[p] = load(p) + css
  console.log(`ok   [${label}]`)
}

/* ---------- CSS for anchor-based links ---------- */
append(
  'src/components/Projects.css',
  `

/* ─── Anchor-based card links (added with the project detail pages) ─── */
.proj-row { position: relative; }

/* Stretched link: the title is the real <a>, its ::after covers the row so the
   whole card is clickable without nesting interactive elements. */
.proj-row__link {
  color: inherit;
  text-decoration: none;
}
.proj-row__link::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
}
.proj-row__link:hover { color: var(--crimson); }

/* Keep the external buttons above the stretched link. */
.proj-row__actions { position: relative; z-index: 2; }

.projects-all {
  display: flex;
  justify-content: center;
  padding: 48px 24px 8px;
}
.projects-all__link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  padding: 14px 26px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  transition: border-color 0.3s ease, color 0.3s ease;
}
.projects-all__link:hover { border-color: var(--crimson); color: var(--crimson); }
`,
  'projects-css',
)

append(
  'src/bits/StaggeredMenu.css',
  `

/* The menu entries became real <a href> links; keep the button styling. */
.smenu-link {
  display: flex;
  width: 100%;
  text-decoration: none;
  color: inherit;
}
`,
  'staggered-css',
)

append(
  'src/components/LanguageSwitcher.css',
  `

/* Locale options are anchors to the prerendered locale URLs. */
.lang-switcher__option {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}
`,
  'lang-css',
)

append(
  'src/components/Navbar.css',
  `

/* The logo is a router <Link> now. */
.navbar__logo { text-decoration: none; }
`,
  'navbar-css',
)

/* ---------- index.html: self-hosted fonts + verification slot ---------- */
const H = 'index.html'
sub(
  H,
  `    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Cormorant+Garamond:ital,wght@1,300;1,400&display=swap"
      rel="stylesheet"
    />
`,
  `    <!-- Fonts are self-hosted via src/fonts.css (fontsource); no third-party
         request sits on the critical path. -->
`,
  'html-fonts',
)
sub(H, '    <!--seo-head-->', '    <!--seo-verification-->\n    <!--seo-head-->', 'html-verification-slot')

/* ---------- vite: split three.js and the router out of the main chunk ---------- */
sub(
  'vite.config.js',
  `          if (id.includes('node_modules/gsap')) return 'gsap'`,
  `          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/three')) return 'three'
          if (id.includes('node_modules/react-router')) return 'router'`,
  'vite-chunks',
)

if (fail) {
  console.error(`\n${fail} replacement(s) failed, nothing written.`)
  process.exit(1)
}
for (const [p, s] of Object.entries(files)) {
  fs.writeFileSync(p, wasCrlf[p] ? s.replace(/\n/g, '\r\n') : s, 'utf8')
}

/* ---------- 404 strings ---------- */
const NOT_FOUND = {
  hr: {
    title: 'Stranica nije pronađena',
    text: 'Tražena stranica ne postoji ili je premještena. Vratite se na početnu ili pogledajte projekte.',
  },
  en: {
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has moved. Head back home or browse the projects.',
  },
  de: {
    title: 'Seite nicht gefunden',
    text: 'Die gesuchte Seite existiert nicht oder wurde verschoben. Zurück zur Startseite oder zu den Projekten.',
  },
  pl: {
    title: 'Nie znaleziono strony',
    text: 'Szukana strona nie istnieje lub została przeniesiona. Wróć na stronę główną albo zobacz projekty.',
  },
}
for (const [lng, block] of Object.entries(NOT_FOUND)) {
  const p = `src/locales/${lng}.json`
  const j = JSON.parse(fs.readFileSync(p, 'utf8'))
  j.notFound = block
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')
  console.log(`ok   [404-${lng}]`)
}

/* ---------- delete dead code ---------- */
for (const dead of ['src/components/ImageTrailSection.jsx', 'src/components/ImageTrailSection.css']) {
  if (fs.existsSync(dead)) {
    fs.unlinkSync(dead)
    console.log(`ok   [deleted] ${dead}`)
  }
}

console.log('\nDone.')
