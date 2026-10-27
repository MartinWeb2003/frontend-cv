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
 *   koliko-traje-izrada           -> website-development
 *   web-stranice-peljesac         -> the Orebić location page
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
 * Tags are ids, not display strings: the label for each lives under
 * `blog.tags.<id>` in every locale, so an English page never shows a Croatian
 * tag. Adding a tag means adding the id here and the label in hr.json and
 * en.json.
 *
 * Imported by the React app AND scripts/prerender.mjs, so keep it plain data.
 */
/*
 * Covers are geometric compositions drawn by scripts/render-covers.mjs, one
 * per post id, not project screenshots: a post is about a question, not
 * about one client's site.
 */
const cover = (id) => `/covers/${id}.webp`

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
    image: cover('slow-website'),
    tags: ['performance', 'core-web-vitals', 'seo'],
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
    image: cover('wordpress-vs-react'),
    tags: ['wordpress', 'react', 'cms'],
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
    image: cover('comparing-quotes'),
    tags: ['pricing', 'quotes', 'process'],
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
    image: cover('tourism-website'),
    tags: ['tourism', 'ux', 'multilingual'],
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
    image: cover('local-seo'),
    tags: ['seo', 'google', 'search-console'],
  },
  {
    id: 'build-timeline',
    key: 'b7',
    date: '2026-08-24',
    updated: '2026-08-24',
    slug: {
      hr: 'koliko-traje-izrada-web-stranice',
      en: 'how-long-does-a-website-take',
    },
    /**
     * The second spoke into website-development, and the counterpart to b4:
     * that post explains why prices differ, this one why deadlines do.
     *
     * The thesis is not new to the site. s1Faq1A, s1Faq4A and the pricing
     * page's `contentText` all already assert that content readiness, not
     * development, is the critical path. Each says it in two sentences on a
     * commercial page. This is the article that actually argues it.
     *
     * Deliberately carries no week counts: there are no real per-project
     * durations on record to publish, and inventing them would be a §0.7
     * violation. S4 is where real ranges belong if they are ever supplied.
     */
    service: 'website-development',
    relatedProjects: ['sabioncello-grafika', 'bmfit', 'dani-cvjetnog'],
    /**
     * A schedule page from the Dani Cvjetnog site: dense with real content,
     * times and places, which is what the article argues a page is made of.
     *
     * grafica2 and grafica3 were rejected on purpose. Both are Sabioncello
     * Grafica marketing sections, one carrying round claims ("20+ godina",
     * "500+ zadovoljnih klijenata") and the other five-star Google reviews.
     * Sitting above the article text they read as this site's own claims,
     * which is exactly what section 0.7 rules out. grafica2 also has an em
     * dash baked into the pixels.
     */
    image: cover('build-timeline'),
    tags: ['process', 'content', 'timeline'],
  },
  {
    id: 'peljesac-web',
    key: 'b8',
    date: '2026-08-24',
    updated: '2026-08-24',
    slug: {
      hr: 'web-stranice-za-poslove-na-peljescu',
      en: 'websites-for-businesses-on-peljesac',
    },
    /**
     * Supports the Orebić location page rather than a service: that page
     * carries the commercial query, this one carries the informational half
     * of the same local intent and links up into it.
     *
     * Written as five real projects rather than as advice, on purpose. The
     * neighbouring posts already own the how-to angles (b3 tourism content,
     * b6 Google visibility), so a sixth set of tips would cannibalise them.
     * Everything here is drawn from the project pages, nothing is new.
     */
    service: 'website-development',
    ctaPage: 'location',
    ctaLocation: 'orebic',
    relatedProjects: ['visit-eva-orebic', 'camping-loviste-paradise', 'sabioncello'],
    relatedPosts: ['tourism-website', 'local-seo'],
    image: cover('peljesac-web'),
    tags: ['peljesac', 'tourism', 'process'],
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
    'build-timeline',
    'peljesac-web',
  ],
  relatedProjects: ['sottomonte', 'camping-loviste-paradise'],
  image: cover('choosing-developer'),
  tags: ['guide', 'process', 'choosing'],
})

/**
 * Original research: a speed and health check of Croatian coastal tourism
 * websites. The sample frame is every accommodation, campsite and estate
 * agency with a website in OpenStreetMap for the seven Adriatic counties
 * (Geofabrik extract of 26 October 2026); the method is in the post and the
 * anonymised data is downloadable. Written to be cited: its numbers exist
 * nowhere else.
 */
POSTS.push({
  id: 'web-speed-study',
  key: 'b9',
  date: '2026-10-27',
  updated: '2026-10-27',
  slug: {
    hr: 'brzina-turistickih-web-stranica-hrvatska-2026',
    en: 'croatian-tourism-website-speed-study-2026',
  },
  service: 'maintenance-seo',
  ctaPage: 'pricing',
  relatedPosts: ['slow-website', 'tourism-website', 'local-seo'],
  relatedProjects: ['sottomonte', 'camping-loviste-paradise'],
  image: cover('web-speed-study'),
  tags: ['research', 'performance', 'tourism'],
  findings: 4,
  dataset: '/data/croatian-tourism-websites-2026.csv',
  study: {
    measured: '2026-10-27',
    area: 'Adriatic counties of Croatia',
    basedOn: 'https://www.openstreetmap.org/',
    variables: [
      'website reachability',
      'HTTPS',
      'mobile viewport',
      'CMS platform',
      'booking engine detected',
      'Lighthouse mobile performance score',
      'Largest Contentful Paint',
      'Total Blocking Time',
      'Cumulative Layout Shift',
      'page weight',
    ],
  },
})

export const postById = (id) => POSTS.find((p) => p.id === id)
export const postBySlug = (lng, slug) => POSTS.find((p) => p.slug[lng] === slug)

/** Newest first, for the index. */
export const postsByDate = () => [...POSTS].sort((a, b) => b.date.localeCompare(a.date))
