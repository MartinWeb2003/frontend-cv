/**
 * Blog posts.
 *
 * Deliberately a topic cluster rather than scattered articles: each post is
 * problem-aware content that answers a question a buyer actually types, and
 * each one feeds exactly one service page. That gives every service a
 * supporting article linking into it, which is the structure that builds
 * topical authority.
 *
 *   post                          -> service it supports
 *   zasto-je-web-stranica-spora   -> maintenance-seo
 *   wordpress-ili-react           -> website-development
 *   web-stranica-za-apartmane     -> tourism-websites
 *
 * Croatian and English only, matching SERVICE_LOCALES: a translated stub in a
 * market with no client history is worse than no page.
 *
 * Imported by the React app AND scripts/prerender.mjs, so keep it plain data.
 */
export const POST_LOCALES = ['hr', 'en']

/**
 * `date` is the publication date in ISO form, used for `datePublished`.
 * All three start on the same date because that is when they were written;
 * adjust as you actually publish them rather than backdating.
 */
export const POSTS = [
  {
    id: 'slow-website',
    key: 'b1',
    date: '2026-08-12',
    updated: '2026-08-12',
    slug: {
      hr: 'zasto-je-web-stranica-spora',
      en: 'why-your-website-is-slow',
    },
    service: 'maintenance-seo',
    relatedProjects: ['sottomonte'],
    image: '/sotto2.webp',
    tags: ['Performance', 'Core Web Vitals', 'SEO'],
  },
  {
    id: 'wordpress-vs-react',
    key: 'b2',
    date: '2026-08-12',
    updated: '2026-08-12',
    slug: {
      hr: 'wordpress-ili-react',
      en: 'wordpress-or-react',
    },
    service: 'website-development',
    relatedProjects: ['sabioncello-grafika', 'sottomonte'],
    image: '/grafica1.webp',
    tags: ['WordPress', 'React', 'CMS'],
  },
  {
    id: 'tourism-website',
    key: 'b3',
    date: '2026-08-12',
    updated: '2026-08-12',
    slug: {
      hr: 'web-stranica-za-apartmane-i-kampove',
      en: 'websites-for-holiday-rentals',
    },
    service: 'tourism-websites',
    relatedProjects: ['camping-loviste-paradise', 'visit-eva-orebic'],
    image: '/camping1.webp',
    tags: ['Turizam', 'UX', 'Multilingual'],
  },
]

export const postById = (id) => POSTS.find((p) => p.id === id)
export const postBySlug = (lng, slug) => POSTS.find((p) => p.slug[lng] === slug)

/** Newest first, for the index. */
export const postsByDate = () => [...POSTS].sort((a, b) => b.date.localeCompare(a.date))
