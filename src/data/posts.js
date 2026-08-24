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
 *   zasto-se-ne-pojavljujem       -> maintenance-seo
 *
 * maintenance-seo carries two spokes on purpose: it is the one service with
 * recurring revenue behind it, and "why am I not on Google" and "why is my
 * site slow" are different queries with different answers. The visibility
 * post touches speed in a single sentence and leaves the rest to b1, so the
 * two do not compete for the same term.
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
    id: 'comparing-quotes',
    key: 'b4',
    date: '2026-08-12',
    updated: '2026-08-12',
    slug: {
      hr: 'zasto-se-ponude-za-web-stranicu-razlikuju',
      en: 'why-website-quotes-vary',
    },
    /**
     * Supports the pricing page rather than a service: /cjenik/ was the one
     * money page with no article feeding it. `ctaPricing` swaps the closing
     * call to action from a service to the cost guide.
     */
    service: 'website-development',
    ctaPage: 'pricing',
    relatedProjects: ['sabioncello-grafika', 'dani-cvjetnog'],
    image: '/cvjetnog1.webp',
    tags: ['Cijene', 'Ponude', 'Proces'],
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
  {
    id: 'local-seo',
    key: 'b6',
    date: '2026-08-24',
    updated: '2026-08-24',
    slug: {
      hr: 'zasto-se-moja-stranica-ne-pojavljuje-na-googleu',
      en: 'why-your-website-does-not-show-up-on-google',
    },
    service: 'maintenance-seo',
    relatedProjects: ['sottomonte', 'sabioncello'],
    /**
     * A Croatian listing page from sottomonte.hr: it shows a real page title
     * naming the property and the place, which is exactly what S3 argues a
     * page has to do to be findable. sotto2 is taken by b1.
     */
    image: '/sotto3.webp',
    /**
     * Tags are raw strings shared by both locales, so this post uses ones
     * that read the same in Croatian and English. The older posts predate
     * that and still show Croatian tags on their EN pages.
     */
    tags: ['SEO', 'Google', 'Search Console'],
  },
]

/**
 * The pillar. Unlike the spokes it is not tied to a single service: it links
 * out to every post and every money page, which is what turns four sibling
 * articles into a hub-and-spoke cluster.
 */
POSTS.push({
  id: 'choosing-developer',
  key: 'b5',
  date: '2026-08-12',
  updated: '2026-08-12',
  slug: {
    hr: 'kako-odabrati-web-developera',
    en: 'how-to-choose-a-web-developer',
  },
  service: null,
  ctaPage: 'services',
  pillar: true,
  relatedPosts: [
    'slow-website',
    'wordpress-vs-react',
    'tourism-website',
    'comparing-quotes',
    'local-seo',
  ],
  relatedProjects: ['sottomonte', 'camping-loviste-paradise'],
  image: '/eva1.webp',
  tags: ['Vodič', 'Proces', 'Odabir'],
})

export const postById = (id) => POSTS.find((p) => p.id === id)
export const postBySlug = (lng, slug) => POSTS.find((p) => p.slug[lng] === slug)

/** Newest first, for the index. */
export const postsByDate = () => [...POSTS].sort((a, b) => b.date.localeCompare(a.date))
