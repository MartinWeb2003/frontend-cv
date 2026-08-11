/**
 * Structural pass: crawlable internal links, normalised anchor ids, lazy
 * three.js, and the above-the-fold LCP fix.
 *
 *   node scripts/apply-structure.mjs
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

/* ---------- Anchor ids ---------- */
sub('src/components/Education.jsx', 'id="obrazovanje"', 'id="education"', 'id-education')
sub('src/components/Contact.jsx', 'id="kontakt"', 'id="contact"', 'id-contact')

/* ---------- Hero: real anchors + LCP fix ---------- */
const H = 'src/components/Hero.jsx'
sub(H, "import { Link } from 'react-scroll'", "import SectionLink from './SectionLink'", 'hero-import')
sub(
  H,
  '                <Link to="projekti" smooth duration={800} offset={-70}>\n' +
    '                  <button className="btn btn-primary">\n' +
    "                    {t('hero.ctaProjects')} <FiArrowDown size={13} />\n" +
    '                  </button>\n' +
    '                </Link>\n' +
    '                <Link to="kontakt" smooth duration={800} offset={-70}>\n' +
    '                  <button className="btn btn-outline">{t(\'hero.ctaContact\')}</button>\n' +
    '                </Link>',
  '                <SectionLink to="projects" className="btn btn-primary">\n' +
    "                  {t('hero.ctaProjects')} <FiArrowDown size={13} />\n" +
    '                </SectionLink>\n' +
    '                <SectionLink to="contact" className="btn btn-outline">\n' +
    "                  {t('hero.ctaContact')}\n" +
    '                </SectionLink>',
  'hero-ctas',
)
// The hero name is the LCP element; animating opacity from 0 delayed its paint
// until hydration. Transform-only keeps the text visible from first paint.
sub(H, 'initial={{ opacity: 0, x: -60 }}\n          animate={{ opacity: 1, x: 0 }}', 'initial={{ x: -60 }}\n          animate={{ x: 0 }}', 'hero-lcp-first')
sub(H, 'initial={{ opacity: 0, x: 60 }}\n          animate={{ opacity: 1, x: 0 }}', 'initial={{ x: 60 }}\n          animate={{ x: 0 }}', 'hero-lcp-last')

/* ---------- Footer: react-scroll -> real anchors ---------- */
const F = 'src/components/Footer.jsx'
sub(F, "import { Link } from 'react-scroll'", "import SectionLink from './SectionLink'", 'footer-import')
sub(
  F,
  '<Link to="hero" smooth duration={600} className="footer__wordmark">MARTIN BOGOJE</Link>',
  '<SectionLink to="hero" className="footer__wordmark">MARTIN BOGOJE</SectionLink>',
  'footer-wordmark',
)
sub(
  F,
  "<Link to={l.to} smooth duration={700} offset={-70} className=\"footer__nav-link\">{t(l.labelKey)}</Link>",
  '<SectionLink to={l.to} className="footer__nav-link">{t(l.labelKey)}</SectionLink>',
  'footer-nav',
)
sub(F, "{ labelKey: 'nav.projects',   to: 'projekti' },", "{ labelKey: 'nav.projects',   to: 'projects' },", 'footer-to-projects')
sub(F, "{ labelKey: 'nav.contact',    to: 'kontakt' },", "{ labelKey: 'nav.contact',    to: 'contact' },", 'footer-to-contact')

/* ---------- StaggeredMenu: <button> -> <a href> ---------- */
sub(
  'src/bits/StaggeredMenu.jsx',
  '                    <button\n' +
    '                      className="smenu-link"\n' +
    '                      onClick={() => { link.onClick(); onClose() }}\n' +
    '                    >\n' +
    '                      <span className="smenu-link__num">0{i + 1}</span>\n' +
    '                      <span className="smenu-link__label">{link.label}</span>\n' +
    '                    </button>',
  '                    <a\n' +
    '                      className="smenu-link"\n' +
    '                      href={link.href}\n' +
    '                      onClick={(e) => { link.onClick(e); onClose() }}\n' +
    '                    >\n' +
    '                      <span className="smenu-link__num">0{i + 1}</span>\n' +
    '                      <span className="smenu-link__label">{link.label}</span>\n' +
    '                    </a>',
  'staggered-anchor',
)

/* ---------- Education/Navbar link targets ---------- */
const N = 'src/components/Navbar.jsx'
sub(N, "{ label: t('nav.education'),  to: 'obrazovanje' },", "{ label: t('nav.education'),  to: 'education' },", 'nav-education')
sub(N, "{ label: t('nav.projects'),   to: 'projekti' },", "{ label: t('nav.projects'),   to: 'projects' },", 'nav-projects')
sub(N, "{ label: t('nav.contact'),    to: 'kontakt' },", "{ label: t('nav.contact'),    to: 'contact' },", 'nav-contact')

/* ---------- About: lazy-load three.js ---------- */
const A = 'src/components/About.jsx'
sub(A, "import ThreeScene from './ThreeScene'\n", '', 'about-drop-three-import')
sub(A, "import { useRef } from 'react'", "import { useRef, useState, useEffect, lazy, Suspense } from 'react'", 'about-react-imports')
sub(
  A,
  '            <ThreeScene />',
  '            {showScene && (\n' +
    '              <Suspense fallback={null}>\n' +
    '                <ThreeScene />\n' +
    '              </Suspense>\n' +
    '            )}',
  'about-three-guard',
)

if (fail) {
  console.error(`\n${fail} replacement(s) failed, nothing written.`)
  process.exit(1)
}
for (const [p, s] of Object.entries(files)) {
  fs.writeFileSync(p, wasCrlf[p] ? s.replace(/\n/g, '\r\n') : s, 'utf8')
}
console.log(`\nWrote ${Object.keys(files).length} files.`)
