/**
 * Blog and service covers: one geometric composition per post or service, flat shapes only, in the
 * brand palette. Each is drawn as SVG and rasterised with sharp, so there is
 * no browser step and the covers are exactly reproducible.
 *
 * The compositions are loosely about their post (bars that shorten for a slow
 * site, three columns for comparing quotes, a timeline for build time) but
 * carry no text, so one image serves every language.
 *
 * Colours are read from the tokens in src/index.css, never repeated here.
 *
 *   node scripts/render-covers.mjs
 *
 * Output: public/covers/<post id>.webp (1600x1000) + -800 variant, and the
 * dimensions merged into src/data/imageMeta.json for imgAttrs().
 */
import fs from 'node:fs/promises'
import sharp from 'sharp'
import { LOGO_POLYGONS, LOGO_SIZE } from '../src/data/logoShape.js'

const W = 1600
const H = 1000
const META = 'src/data/imageMeta.json'

const css = await fs.readFile('src/index.css', 'utf8')
const tok = (name) => {
  const m = css.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`))
  if (!m) throw new Error(`token ${name} not found`)
  return m[1]
}
const C = {
  ink: tok('--ink'),
  ink2: tok('--ink-2'),
  ink3: tok('--ink-3'),
  paper: tok('--paper'),
  paper2: tok('--paper-2'),
  paper3: tok('--paper-3'),
  crimson: tok('--accent'),
  deep: tok('--accent-deep'),
  lift: tok('--accent-lift'),
  dim: tok('--on-ink-3'),
}

const svg = (bg, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
  `<rect width="${W}" height="${H}" fill="${bg}"/>${body}</svg>`

const circle = (cx, cy, r, fill, extra = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${extra}/>`
const rect = (x, y, w, h, fill, rx = 0, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`
const poly = (pts, fill) => `<polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="${fill}"/>`
const line = (x1, y1, x2, y2, stroke, w) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round"/>`

/** Post id -> SVG. */
const COVERS = {
  // Why your website is slow: speed bars that shorten toward a crimson sun.
  'slow-website': () =>
    svg(
      C.ink,
      circle(1170, 500, 260, C.crimson) +
        [900, 760, 620, 480, 340, 200]
          .map((len, i) => rect(170, 290 + i * 80, len, 34, i === 2 ? C.lift : C.paper, 17, `opacity="${1 - i * 0.12}"`))
          .join(''),
    ),

  // WordPress or React: a circle and a square, either side of one seam.
  'wordpress-vs-react': () =>
    svg(
      C.paper,
      rect(0, 0, 800, H, C.ink) +
        circle(400, 500, 210, C.paper) +
        rect(1000, 300, 400, 400, C.ink, 8) +
        circle(800, 500, 46, C.crimson),
    ),

  // Comparing quotes: three columns of different height on one baseline.
  'comparing-quotes': () =>
    svg(
      C.paper2,
      line(260, 800, 1340, 800, C.ink, 6) +
        rect(400, 540, 180, 260, C.ink3, 6) +
        rect(710, 300, 180, 500, C.crimson, 6) +
        rect(1020, 430, 180, 370, C.ink, 6) +
        circle(800, 220, 34, C.lift),
    ),

  // A tourism website: a sun setting into rows of waves.
  'tourism-website': () => {
    const waves = (y, color, op) => {
      let d = `M 0 ${y}`
      for (let x = 0; x < W; x += 160) d += ` q 40 -34 80 0 t 80 0`
      return `<path d="${d}" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round" opacity="${op}"/>`
    }
    return svg(
      C.deep,
      `<clipPath id="sky"><rect width="${W}" height="620"/></clipPath>` +
        circle(800, 620, 250, C.paper, 'clip-path="url(#sky)"') +
        rect(0, 620, W, H - 620, C.ink) +
        waves(710, C.lift, 0.9) +
        waves(800, C.paper, 0.35) +
        waves(890, C.paper, 0.18),
    )
  },

  // Local SEO: a location found, radar rings around a crimson point.
  'local-seo': () =>
    svg(
      C.ink,
      [440, 330, 220, 120]
        .map((r, i) => `<circle cx="1060" cy="500" r="${r}" fill="none" stroke="${C.paper}" stroke-width="3" opacity="${0.12 + i * 0.1}"/>`)
        .join('') +
        line(1060, 30, 1060, 970, C.ink3, 3) +
        line(560, 500, 1560, 500, C.ink3, 3) +
        circle(1060, 500, 58, C.crimson) +
        circle(1060, 500, 20, C.paper) +
        [0, 1, 2]
          .flatMap((r) => [0, 1, 2].map((c) => circle(230 + c * 70, 400 + r * 70, 14, r === 1 && c === 2 ? C.lift : C.ink3)))
          .join(''),
    ),

  // How long does a website take: a timeline, three steps done, one current.
  'build-timeline': () =>
    svg(
      C.paper,
      `<path d="M ${W} ${H} L ${W - 380} ${H} A 380 380 0 0 1 ${W} ${H - 380} Z" fill="${C.paper3}"/>` +
        line(200, 500, 1400, 500, C.ink3, 6) +
        line(200, 500, 1000, 500, C.ink, 10) +
        [260, 510, 760].map((x) => circle(x, 500, 36, C.ink)).join('') +
        circle(1010, 500, 58, C.crimson) +
        circle(1010, 500, 22, C.paper) +
        `<circle cx="1300" cy="500" r="36" fill="${C.paper}" stroke="${C.ink}" stroke-width="8"/>`,
    ),

  // Five websites on Pelješac: two peaks, a sun, and the sea.
  'peljesac-web': () =>
    svg(
      C.paper,
      circle(1170, 300, 96, C.lift) +
        poly([[260, 780], [720, 290], [1180, 780]], C.ink) +
        poly([[860, 780], [1150, 450], [1440, 780]], C.deep) +
        line(200, 830, 1400, 830, C.ink, 8) +
        line(360, 880, 1240, 880, C.ink3, 6) +
        line(520, 925, 1080, 925, C.ink3, 4),
    ),

  // Choosing a developer: a grid of identical dots, one chosen.
  'choosing-developer': () =>
    svg(
      C.ink,
      [0, 1, 2, 3]
        .flatMap((r) =>
          [0, 1, 2, 3, 4, 5, 6].map((c) => {
            const cx = 380 + c * 140
            const cy = 290 + r * 140
            return r === 2 && c === 4
              ? `<circle cx="${cx}" cy="${cy}" r="62" fill="none" stroke="${C.paper}" stroke-width="4"/>` + circle(cx, cy, 44, C.crimson)
              : circle(cx, cy, 34, C.ink3)
          }),
        )
        .join(''),
    ),
}

/*
 * The speed study: a wall of tiny browser windows, each loading to a
 * different point, with roughly one in five crossed out as dead. The pattern
 * is fixed (no randomness) so the cover is reproducible.
 */
COVERS['web-speed-study'] = () => {
  const cols = 7
  const rows = 4
  const w = 168
  const h = 118
  const gap = 26
  const x0 = (W - (cols * w + (cols - 1) * gap)) / 2
  const y0 = (H - (rows * h + (rows - 1) * gap)) / 2
  const dead = new Set([3, 9, 15, 19, 24])
  const fill = [0.9, 0.35, 0.6, 0, 0.2, 0.75, 0.45, 0.3, 0.95, 0, 0.55, 0.25, 0.7, 0.4, 0, 0.85, 0.15, 0.5, 0, 0.65, 0.3, 0.8, 0.2, 0, 0.6, 0.35, 0.45, 0.9]
  let out = ''
  for (let i = 0; i < cols * rows; i++) {
    const x = x0 + (i % cols) * (w + gap)
    const y = y0 + Math.floor(i / cols) * (h + gap)
    out += rect(x, y, w, h, C.ink2, 12, `stroke="${C.ink3}" stroke-width="2"`)
    out += circle(x + 16, y + 16, 4, C.ink3) + circle(x + 30, y + 16, 4, C.ink3)
    if (dead.has(i)) {
      out += line(x + 56, y + 46, x + 112, y + 96, C.crimson, 8) + line(x + 112, y + 46, x + 56, y + 96, C.crimson, 8)
    } else {
      const f = fill[i]
      out += rect(x + 16, y + 52, w - 32, 12, C.ink3, 6)
      out += rect(x + 16, y + 52, Math.max(14, (w - 32) * f), 12, f > 0.8 ? C.lift : C.paper, 6, f > 0.8 ? '' : 'opacity="0.55"')
      out += rect(x + 16, y + 78, 70, 8, C.ink3, 4)
    }
  }
  return svg(C.ink, out)
}

/* ── Service covers: the same style with more detail, one per service id ── */

/** A dot grid as one SVG pattern, so the file stays small. */
const dotGrid = (color, op, step = 44) =>
  `<defs><pattern id="dots" width="${step}" height="${step}" patternUnits="userSpaceOnUse">` +
  `<circle cx="${step / 2}" cy="${step / 2}" r="2" fill="${color}" opacity="${op}"/></pattern></defs>` +
  `<rect width="${W}" height="${H}" fill="url(#dots)"/>`
const wave = (y, x0, x1, color, w, op) => {
  let d = `M ${x0} ${y}`
  for (let x = x0; x < x1; x += 160) d += ' q 40 -30 80 0 t 80 0'
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" opacity="${op}"/>`
}

/*
 * Service covers are animated. Each is written twice: a static WebP (the
 * base frame, for social cards and any context that ignores CSS) and an SVG
 * with a <style> block whose CSS animations browsers run even when the SVG
 * is used as a plain <img>. Animation classes wrap groups of shapes; the
 * base frame without them is the finished composition.
 */
const REDUCE = '@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }'

const SERVICE_CSS = {
  'service-website-development': `
    .float { animation: float 5s ease-in-out infinite; }
    .drift { animation: drift 9s ease-in-out infinite; }
    .shimmer { animation: shimmer 3.2s ease-in-out infinite; }
    .shimmer.d2 { animation-delay: 0.5s; }
    .pulse { animation: shimmer 2.4s ease-in-out infinite 0.8s; }
    @keyframes float { 50% { transform: translateY(-16px); } }
    @keyframes drift { 50% { transform: translate(-34px, 20px); } }
    @keyframes shimmer { 50% { opacity: 0.4; } }`,
  'service-tourism-websites': `
    .sun { animation: sun 9s ease-in-out infinite; }
    .wave1 { animation: roll 3.2s linear infinite; }
    .wave2 { animation: roll 4.4s linear infinite; }
    .wave3 { animation: roll 6s linear infinite; }
    .pin { animation: pin 2.6s ease-in-out infinite; }
    .booked { animation: booked 2.4s ease-in-out infinite; }
    @keyframes sun { 0%, 100% { transform: translateY(40px); } 50% { transform: translateY(-4px); } }
    @keyframes roll { to { transform: translateX(-160px); } }
    @keyframes pin { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
    @keyframes booked { 50% { opacity: 0.55; } }`,
  'service-maintenance-seo': `
    .needle { transform-origin: 540px 650px; animation: needle 6s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
    .arc { stroke-dasharray: 760; animation: arc 6s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
    .bar { transform-box: fill-box; transform-origin: bottom; animation: bar 6s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
    .trend { animation: fade 6s ease infinite; }
    .lens { transform-origin: 1290px 250px; animation: lens 5s ease-in-out infinite; }
    @keyframes needle { 0% { transform: rotate(-150deg); } 45% { transform: rotate(4deg); } 55% { transform: rotate(-2deg); } 65%, 100% { transform: rotate(0deg); } }
    @keyframes arc { 0% { stroke-dashoffset: 760; } 45%, 100% { stroke-dashoffset: 0; } }
    @keyframes bar { 0% { transform: scaleY(0.25); } 40%, 100% { transform: scaleY(1); } }
    @keyframes fade { 0%, 35% { opacity: 0; } 55%, 100% { opacity: 1; } }
    @keyframes lens { 50% { transform: rotate(-8deg) translate(-6px, 4px); } }`,
}

const SERVICE_COVERS = {
  // Website development: a full page layout in a browser, and the same site
  // on a phone beside it.
  'service-website-development': () => {
    const card = (x, accent) =>
      rect(x, 510, 252, 140, C.ink3, 12) +
      rect(x + 24, 534, 40, 40, accent, 8, accent === C.lift ? 'class="pulse"' : 'opacity="0.35"') +
      rect(x + 24, 600, 160, 10, C.paper, 5, 'opacity="0.35"') +
      rect(x + 24, 622, 110, 10, C.paper, 5, 'opacity="0.2"')
    return svg(
      C.ink,
      dotGrid(C.ink3, 0.9) +
        rect(240, 170, 900, 640, C.ink2, 24, `stroke="${C.ink3}" stroke-width="2"`) +
        line(240, 228, 1140, 228, C.ink3, 2) +
        circle(282, 199, 8, C.lift) +
        circle(310, 199, 8, C.paper3, 'opacity="0.5"') +
        circle(338, 199, 8, C.paper3, 'opacity="0.3"') +
        rect(420, 187, 380, 24, C.ink3, 12) +
        `<clipPath id="hero"><rect x="280" y="260" width="820" height="220" rx="14"/></clipPath>` +
        rect(280, 260, 820, 220, C.crimson, 14) +
        `<g clip-path="url(#hero)"><g class="drift">` +
        circle(980, 370, 82, C.paper, 'opacity="0.18"') +
        circle(1040, 300, 36, C.paper, 'opacity="0.12"') +
        `</g></g>` +
        rect(320, 306, 360, 26, C.paper, 13, 'class="shimmer"') +
        rect(320, 348, 260, 26, C.paper, 13, 'opacity="0.75" class="shimmer d2"') +
        rect(320, 410, 140, 40, C.paper, 20) +
        card(280, C.lift) +
        card(564, C.paper3) +
        card(848, C.paper3) +
        rect(280, 688, 500, 12, C.paper, 6, 'opacity="0.18"') +
        rect(280, 714, 360, 12, C.paper, 6, 'opacity="0.12"') +
        `<g class="float">` +
        rect(1060, 330, 300, 560, C.ink, 42, `stroke="${C.paper3}" stroke-opacity="0.35" stroke-width="3"`) +
        rect(1078, 350, 264, 520, C.ink2, 28) +
        rect(1175, 362, 70, 14, C.ink, 7) +
        rect(1094, 392, 232, 150, C.crimson, 14) +
        rect(1114, 430, 130, 16, C.paper, 8) +
        rect(1114, 458, 90, 16, C.paper, 8, 'opacity="0.75"') +
        rect(1114, 498, 70, 24, C.paper, 12) +
        rect(1094, 560, 232, 90, C.ink3, 12) +
        rect(1094, 664, 232, 90, C.ink3, 12) +
        rect(1112, 580, 30, 30, C.lift, 6) +
        rect(1112, 684, 30, 30, C.paper3, 6, 'opacity="0.35"') +
        rect(1094, 784, 232, 46, C.lift, 23) +
        `</g>`,
    )
  },

  // Tourism websites: sunset over the sea, a location pin, and a phone with
  // a booking calendar.
  'service-tourism-websites': () => {
    let cal = ''
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 7; c++) {
        const inRange = r === 1 && c >= 2 && c <= 4
        const fill = r === 1 && c === 4 ? C.lift : inRange ? C.crimson : C.paper3
        cal += rect(1060 + c * 38, 520 + r * 38, 28, 28, fill, 7, inRange ? 'class="booked"' : '')
      }
    }
    // Waves run 160px past the edge so the roll loops seamlessly.
    return svg(
      C.deep,
      `<clipPath id="sky"><rect width="${W}" height="640"/></clipPath>` +
        `<clipPath id="pic"><rect x="1056" y="210" width="268" height="180" rx="16"/></clipPath>` +
        `<g clip-path="url(#sky)"><g class="sun">` +
        circle(520, 640, 240, C.paper) +
        circle(520, 640, 320, 'none', `stroke="${C.paper}" stroke-opacity="0.12" stroke-width="3"`) +
        `</g></g>` +
        rect(0, 640, W, H - 640, C.ink) +
        `<g class="wave1">${wave(720, 0, 1160, C.lift, 12, 0.9)}</g>` +
        `<g class="wave2">${wave(800, 0, 1160, C.paper, 12, 0.35)}</g>` +
        `<g class="wave3">${wave(880, 0, 1160, C.paper, 12, 0.18)}</g>` +
        `<g class="pin">` +
        circle(250, 230, 36, C.paper) +
        poly([[218, 246], [282, 246], [250, 316]], C.paper) +
        circle(250, 230, 14, C.deep) +
        `</g>` +
        rect(1020, 150, 340, 700, C.ink, 46, `stroke="${C.paper}" stroke-opacity="0.25" stroke-width="3"`) +
        rect(1040, 172, 300, 656, C.paper, 30) +
        rect(1150, 184, 80, 14, C.ink, 7) +
        rect(1056, 210, 268, 180, C.deep, 16) +
        circle(1190, 330, 52, C.lift, 'clip-path="url(#pic)"') +
        rect(1056, 330, 268, 60, C.ink, 0, 'clip-path="url(#pic)"') +
        `<path d="M 1066 356 q 20 -14 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke="${C.lift}" stroke-width="6" stroke-linecap="round" clip-path="url(#pic)"/>` +
        rect(1060, 412, 200, 18, C.ink, 9) +
        rect(1060, 442, 140, 14, C.ink3, 7, 'opacity="0.6"') +
        rect(1060, 482, 120, 12, C.ink3, 6, 'opacity="0.35"') +
        cal +
        rect(1056, 762, 268, 50, C.crimson, 25) +
        rect(1150, 783, 80, 8, C.paper, 4),
    )
  },

  // Maintenance and SEO: a speed gauge sweeping up, a rising chart with its
  // trend, and a magnifying glass over the results.
  'service-maintenance-seo': () => {
    const cx = 540
    const cy = 650
    const R = 290
    const at = (deg, r) => [cx + r * Math.cos((deg * Math.PI) / 180), cy - r * Math.sin((deg * Math.PI) / 180)]
    const [ex, ey] = at(30, R)
    const [nx, ny] = at(30, 210)
    let ticks = ''
    for (let d = 180; d >= 0; d -= 15) {
      const [x1, y1] = at(d, R - 50)
      const [x2, y2] = at(d, R - (d % 45 === 0 ? 82 : 66))
      ticks += line(x1, y1, x2, y2, C.ink3, d % 45 === 0 ? 5 : 3)
    }
    const bars = [120, 170, 230, 300, 390]
    const bx = (i) => 1010 + i * 82
    const tops = bars.map((h, i) => [bx(i) + 28, 770 - h - 34])
    return svg(
      C.paper,
      dotGrid(C.paper3, 1) +
        `<path d="M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}" fill="none" stroke="${C.paper3}" stroke-width="46" stroke-linecap="round"/>` +
        `<path class="arc" d="M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="${C.crimson}" stroke-width="46" stroke-linecap="round"/>` +
        ticks +
        `<g class="needle">${line(cx, cy, nx, ny, C.ink, 12)}</g>` +
        circle(cx, cy, 30, C.ink) +
        circle(cx, cy, 11, C.paper) +
        rect(cx - 130, cy + 70, 260, 22, C.ink, 11) +
        rect(cx - 90, cy + 108, 180, 14, C.ink3, 7, 'opacity="0.5"') +
        line(990, 770, 1430, 770, C.ink, 5) +
        bars
          .map((h, i) =>
            rect(bx(i), 770 - h, 56, h, i === bars.length - 1 ? C.crimson : i % 2 ? C.ink : C.ink3, 6, `class="bar" style="animation-delay:${i * 0.12}s"`),
          )
          .join('') +
        `<g class="trend">` +
        `<polyline points="${tops.map(([x, y]) => `${x},${y}`).join(' ')}" fill="none" stroke="${C.lift}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>` +
        tops.map(([x, y]) => circle(x, y, 11, C.lift)).join('') +
        `</g>` +
        `<g class="lens">` +
        line(1356, 316, 1450, 410, C.ink, 30) +
        circle(1290, 250, 92, C.paper2, `stroke="${C.ink}" stroke-width="18"`) +
        rect(1236, 220, 108, 16, C.crimson, 8) +
        rect(1236, 250, 76, 14, C.ink3, 7) +
        rect(1236, 276, 92, 14, C.ink3, 7, 'opacity="0.5"') +
        `</g>`,
    )
  },
}

Object.assign(COVERS, SERVICE_COVERS)

/*
 * Page hero covers, animated like the service covers: a static WebP base
 * frame plus an SVG whose CSS animation runs in an <img>. Compositions keep
 * to the middle band so the wide 21:8 crop on the page loses nothing.
 */

// Cost guide: coin stacks grow toward a trend arrow that draws itself, and
// the price tag swings on its string.
SERVICE_CSS['page-pricing'] = `
    .stack { transform-box: fill-box; transform-origin: bottom; animation: grow 7s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
    .trend { stroke-dasharray: 740; animation: draw 7s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
    .head { animation: head 7s ease infinite; }
    .swing { transform-origin: 445px 500px; animation: swing 4.5s ease-in-out infinite; }
    @keyframes grow { 0% { transform: scaleY(0.15); } 35%, 100% { transform: scaleY(1); } }
    @keyframes draw { 0%, 18% { stroke-dashoffset: 740; } 55%, 100% { stroke-dashoffset: 0; } }
    @keyframes head { 0%, 50% { opacity: 0; transform: translate(-30px, 20px); } 60%, 100% { opacity: 1; transform: none; } }
    @keyframes swing { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }`

COVERS['page-pricing'] = () => {
  const stack = (x, n, top, delay) => {
    let out = `<g class="stack" style="animation-delay:${delay}s">`
    for (let i = 0; i < n; i++) {
      const y = 760 - i * 46
      const lead = i === n - 1 && top
      out += rect(x, y - 30, 150, 46, lead ? C.crimson : C.ink3, 10, `stroke="${lead ? C.lift : C.dim}" stroke-opacity="0.35" stroke-width="2"`)
      out += `<ellipse cx="${x + 75}" cy="${y - 30}" rx="75" ry="14" fill="${lead ? C.lift : C.dim}" opacity="${lead ? 1 : 0.55}"/>`
    }
    return out + '</g>'
  }
  return svg(
    C.ink,
    dotGrid(C.ink3, 0.8) +
      line(560, 790, 1420, 790, C.ink3, 4) +
      stack(620, 3, false, 0) +
      stack(820, 5, false, 0.15) +
      stack(1020, 7, false, 0.3) +
      stack(1220, 9, true, 0.45) +
      `<polyline class="trend" points="600,560 840,470 1040,380 1260,250" fill="none" stroke="${C.lift}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<g class="head">${poly([[1300, 210], [1232, 226], [1284, 278]], C.lift)}</g>` +
      `<g transform="rotate(-14 330 500)"><g class="swing">` +
      poly([[180, 380], [440, 380], [520, 500], [440, 620], [180, 620]], C.paper) +
      circle(445, 500, 22, C.ink) +
      rect(220, 430, 150, 24, C.crimson, 12) +
      rect(220, 474, 110, 18, C.ink3, 9) +
      rect(220, 506, 170, 18, C.ink3, 9, 'opacity="0.5"') +
      rect(220, 552, 90, 34, C.ink, 8) +
      `</g></g>` +
      `<path d="M 445 478 C 520 330 600 300 640 300" fill="none" stroke="${C.paper}" stroke-width="4" stroke-opacity="0.5"/>`,
  )
}

// About: the work (a code editor typing itself), the person (the logo mark
// at the centre of an orbit of skills), and the coffee that keeps both going.
SERVICE_CSS['page-about'] = `
    .type { transform-box: fill-box; transform-origin: left; animation: type 8s steps(12, end) infinite; }
    .cursor { animation: blink 1s steps(1) infinite; }
    .orb1 { transform-origin: 1150px 500px; animation: spin 18s linear infinite; }
    .orb2 { transform-origin: 1150px 500px; animation: spin 30s linear infinite reverse; }
    .orb3 { transform-origin: 1150px 500px; animation: spin 11s linear infinite; }
    .core { transform-origin: 1150px 500px; animation: breathe 5s ease-in-out infinite; }
    .steam { animation: steam 3s ease-in-out infinite; }
    .steam.s2 { animation-delay: 1s; }
    .steam.s3 { animation-delay: 2s; }
    @keyframes type { 0% { transform: scaleX(0); } 30%, 92% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
    @keyframes blink { 50% { opacity: 0; } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes breathe { 50% { transform: scale(1.04); } }
    @keyframes steam { 0% { opacity: 0; transform: translateY(10px); } 40% { opacity: 0.6; } 100% { opacity: 0; transform: translateY(-36px); } }`

COVERS['page-about'] = () => {
  // Code lines: [indent, width, colour]
  const lines = [
    [0, 220, C.lift], [40, 300, C.paper], [40, 180, C.crimson], [80, 260, C.paper],
    [80, 140, C.dim], [40, 240, C.paper], [0, 120, C.lift], [0, 330, C.paper], [40, 200, C.crimson],
  ]
  const code = lines
    .map(([ind, w, col], i) =>
      rect(250 + ind, 330 + i * 42, w, 16, col, 8, `class="type" opacity="${col === C.paper ? 0.55 : 0.9}" style="animation-delay:${i * 0.35}s"`),
    )
    .join('')
  const s = 130 / LOGO_SIZE
  const mark = LOGO_POLYGONS.map(
    (p) => `<polygon points="${p.map(([x, y]) => `${(1150 + (x - 256) * s).toFixed(1)},${(500 + (y - 256) * s).toFixed(1)}`).join(' ')}" fill="${C.paper}"/>`,
  ).join('')
  const ring = (r, op) => `<circle cx="1150" cy="500" r="${r}" fill="none" stroke="${C.paper}" stroke-opacity="${op}" stroke-width="2"/>`
  const steam = (x, cls) => `<path class="steam ${cls}" d="M ${x} 600 q -14 -18 0 -36 t 0 -36" fill="none" stroke="${C.paper}" stroke-width="5" stroke-linecap="round" opacity="0"/>`
  return svg(
    C.ink,
    dotGrid(C.ink3, 0.8) +
      // Editor window.
      rect(170, 240, 620, 520, C.ink2, 22, `stroke="${C.ink3}" stroke-width="2"`) +
      line(170, 290, 790, 290, C.ink3, 2) +
      circle(206, 265, 8, C.lift) +
      circle(232, 265, 8, C.dim, 'opacity="0.5"') +
      circle(258, 265, 8, C.dim, 'opacity="0.3"') +
      [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => rect(204, 330 + i * 42, 22, 16, C.ink3, 4)).join('') +
      code +
      rect(250, 330 + lines.length * 42, 14, 26, C.lift, 2, 'class="cursor"') +
      // Coffee.
      steam(880, 's1') +
      steam(905, 's2') +
      steam(930, 's3') +
      rect(850, 610, 110, 130, C.paper, 14) +
      `<path d="M 960 640 q 46 0 46 32 t -46 32" fill="none" stroke="${C.paper}" stroke-width="14"/>` +
      rect(850, 640, 110, 16, C.crimson, 0) +
      // Orbit of skills around the mark.
      ring(150, 0.14) +
      ring(230, 0.1) +
      ring(310, 0.07) +
      `<g class="orb3">${circle(1150 + 150, 500, 12, C.dim)}</g>` +
      `<g class="orb1">${circle(1150, 500 - 230, 20, C.lift)}</g>` +
      `<g class="orb2">${circle(1150 - 310, 500, 14, C.paper, 'opacity="0.8"')}${circle(1150 + 219, 500 + 219, 9, C.crimson)}</g>` +
      `<g class="core">${circle(1150, 500, 96, C.crimson)}${mark}</g>`,
  )
}

const meta = JSON.parse(await fs.readFile(META, 'utf8'))
await fs.mkdir('public/covers', { recursive: true })

for (const [id, draw] of Object.entries(COVERS)) {
  const buf = Buffer.from(draw())
  if (buf.includes('—')) throw new Error('em dash in cover')
  await sharp(buf).webp({ quality: 88, effort: 6 }).toFile(`public/covers/${id}.webp`)
  await sharp(buf).resize({ width: 800 }).webp({ quality: 86, effort: 6 }).toFile(`public/covers/${id}-800.webp`)
  meta[`/covers/${id}.webp`] = { width: W, height: H, widths: [800, W] }
  if (SERVICE_CSS[id]) {
    const animated = draw().replace('>', `><style>${SERVICE_CSS[id]}\n${REDUCE}</style>`)
    await fs.writeFile(`public/covers/${id}.svg`, animated, 'utf8')
    meta[`/covers/${id}.svg`] = { width: W, height: H }
  }
  const { size } = await fs.stat(`public/covers/${id}.webp`)
  console.log(`  /covers/${id}.webp  ${(size / 1024).toFixed(0)} KB`)
}

const sorted = Object.fromEntries(Object.entries(meta).sort(([a], [b]) => a.localeCompare(b)))
await fs.writeFile(META, JSON.stringify(sorted, null, 2) + '\n', 'utf8')
