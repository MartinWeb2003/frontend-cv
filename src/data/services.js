/**
 * Service offering. One page per service, each targeting a distinct commercial
 * query, which is the whole point: a single combined "Services" page ranks for
 * none of them.
 *
 * Imported by the React app AND by scripts/prerender.mjs, so keep this plain
 * data with no browser/JSX dependencies.
 */

/**
 * Services exist in Croatian and English only, deliberately.
 *
 * HR carries the real local search volume and the weakest competition; EN
 * covers international enquiries. DE and PL have no client history behind them
 * yet, and a thin translated service page is worse than no page. The rest of
 * the site stays four-language; only this branch is partial, and every
 * hreflang set, sitemap entry and language link is derived from this list so
 * nothing ever points at a page that does not exist.
 */
export const SERVICE_LOCALES = ['hr', 'en']

export const SERVICES = [
  {
    id: 'website-development',
    key: 's1',
    num: '01',
    slug: {
      hr: 'izrada-web-stranica',
      en: 'website-development',
    },
    /** Real projects used as proof, by project slug. */
    relatedProjects: ['sabioncello-grafika', 'bmfit', 'dani-cvjetnog'],
    stack: ['React', 'Vite', 'WordPress', 'JavaScript', 'CSS'],
  },
  {
    id: 'tourism-websites',
    key: 's2',
    num: '02',
    slug: {
      hr: 'web-stranice-za-turizam',
      en: 'websites-for-tourism',
    },
    relatedProjects: ['camping-loviste-paradise', 'visit-eva-orebic', 'sabioncello'],
    stack: ['WordPress', 'React', 'Multilingual', 'SEO'],
  },
  {
    id: 'maintenance-seo',
    key: 's3',
    num: '03',
    slug: {
      hr: 'odrzavanje-i-optimizacija',
      en: 'maintenance-and-seo',
    },
    relatedProjects: ['sottomonte', 'sabioncello'],
    stack: ['Technical SEO', 'Core Web Vitals', 'Hosting', 'Analytics'],
  },
]

export const serviceById = (id) => SERVICES.find((s) => s.id === id)

/** Find a service from a localised slug, e.g. "izrada-web-stranica". */
export const serviceBySlug = (lng, slug) => SERVICES.find((s) => s.slug[lng] === slug)
