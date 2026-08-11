/**
 * Canonical project list. Imported by the React app AND by the Node prerender
 * script, so keep this plain data with no browser/JSX dependencies.
 *
 * `key` is the prefix for this project's translation strings, e.g. `p4` ->
 * projects.p4Subtitle / p4Desc / p4Intro / p4Challenge / p4Approach /
 * p4Feature1..3 / p4Stack.
 *
 * `slug` is a URL segment and must never change once indexed.
 *
 * `featured` selects which projects appear as full-width rows on the home page;
 * the rest are reachable from the projects index. See FEATURED_PROJECTS below.
 */
export const PROJECTS = [
  {
    id: 4,
    key: 'p4',
    num: '01',
    year: '2026',
    featured: true,
    slug: 'sabioncello-grafika',
    title: 'Sabioncello Grafika',
    tags: ['React', 'Web dizajn', 'Grafički dizajn'],
    stack: ['React', 'Vite', 'CSS', 'Responsive design'],
    images: ['/grafica1.webp', '/grafica2.webp', '/grafica3.webp', '/grafica4.webp'],
    liveUrl: 'https://sabioncello-grafica.hr',
    githubUrl: null,
  },
  {
    id: 6,
    key: 'p6',
    num: '02',
    year: '2026',
    featured: true,
    slug: 'camping-loviste-paradise',
    title: 'Camping Lovište Paradise',
    tags: ['React', 'Vite', 'Web dizajn', 'Turizam'],
    stack: ['React', 'Vite', 'Multilingual', 'Responsive design'],
    // Captured from the live site: hero, facilities, sanitary block,
    // activities, location and map.
    images: [
      '/camping1.webp',
      '/camping2.webp',
      '/camping3.webp',
      '/camping4.webp',
      '/camping5.webp',
    ],
    liveUrl: 'https://campinglovisteparadise.com',
    githubUrl: null,
  },
  {
    id: 7,
    key: 'p7',
    num: '03',
    year: '2026',
    featured: true,
    slug: 'bmfit',
    title: 'BMFit',
    tags: ['HTML/CSS/JS', 'Landing page', 'Web dizajn', 'Konverzije'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Landing page'],
    // Captured from the live site: hero, problem framing, the three-step
    // system, the coach bio and the FAQ.
    images: [
      '/bmfit1.webp',
      '/bmfit2.webp',
      '/bmfit3.webp',
      '/bmfit4.webp',
      '/bmfit5.webp',
    ],
    liveUrl: 'https://bmfit.hr',
    githubUrl: null,
  },
  {
    id: 1,
    key: 'p1',
    num: '04',
    year: '2026',
    slug: 'sottomonte',
    title: 'Sottomonte',
    tags: ['WordPress', 'Web dizajn', 'SEO', 'Responzivan dizajn'],
    stack: ['WordPress', 'PHP', 'SEO', 'Responsive design'],
    // Captured from the live sottomonte.hr: home, listings, listing detail,
    // location page, buying guide.
    images: [
      '/sotto1.webp',
      '/sotto2.webp',
      '/sotto3.webp',
      '/sotto4.webp',
      '/sotto5.webp',
    ],
    liveUrl: 'https://www.sottomonte.hr',
    githubUrl: null,
  },
  {
    id: 2,
    key: 'p2',
    num: '05',
    year: '2026',
    slug: 'visit-eva-orebic',
    title: 'Visit Eva Orebić',
    tags: ['WordPress', 'Web dizajn', 'SEO', 'Turizam'],
    stack: ['WordPress', 'PHP', 'SEO', 'Responsive design'],
    images: ['/eva1.webp', '/eva2.webp', '/eva3.webp', '/eva4.webp'],
    liveUrl: 'https://www.visit-eva-orebic.com',
    githubUrl: null,
  },
  {
    id: 3,
    key: 'p3',
    num: '06',
    year: '2025',
    slug: 'sabioncello',
    title: 'Sabioncello',
    tags: ['WordPress', 'Web dizajn', 'SEO', 'Turizam'],
    stack: ['WordPress', 'PHP', 'SEO', 'Multilingual'],
    images: ['/sabioncello1.webp', '/sabioncello2.webp', '/sabioncello3.webp', '/sabioncello4.webp'],
    liveUrl: 'https://sabioncello.org',
    githubUrl: null,
  },
  {
    id: 5,
    key: 'p5',
    num: '07',
    year: '2025',
    slug: 'dani-cvjetnog',
    title: 'Dani Cvjetnog',
    tags: ['HTML/CSS/JS', 'Web dizajn', 'Forme', 'Event'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Forms'],
    images: ['/cvjetnog1.webp', '/cvjetnog2.webp', '/cvjetnog3.webp'],
    liveUrl: 'https://dani-cvjetnog.netlify.app',
    githubUrl: null,
  },
]

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured)

export const projectBySlug = (slug) => PROJECTS.find((p) => p.slug === slug)

/** Card background tints, keyed by project id. */
export const PLACEHOLDER_BG = { 1: '#1a0a0c', 2: '#0a0e1a', 3: '#0a1210', 4: '#0e0a1a', 5: '#0f1a0a', 6: '#0a1418', 7: '#140a0c' }
export const PLACEHOLDER_ACCENT = { 1: '#3d0f17', 2: '#0f1a3d', 3: '#0f3d2a', 4: '#1a0f3d', 5: '#1a3d0f', 6: '#0f2f3d', 7: '#3d0f14' }
