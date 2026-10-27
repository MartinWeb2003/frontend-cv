/**
 * Location landing pages.
 *
 * These exist for one reason the blog cannot serve: "izrada web stranica
 * Orebić" is a commercial query, and Google answers commercial queries with
 * service and location pages, not articles. The blog post that supports this
 * page targets the informational side of the same intent and links up into it.
 *
 * A location page is only honest if there is real work behind it. Five of the
 * seven production projects are for businesses on Pelješac, which is what this
 * page is built on:
 *
 *   visit-eva-orebic           accommodation in Orebić
 *   camping-loviste-paradise   campsite in the bay at Lovište
 *   sabioncello                Pelješac destination guide
 *   sabioncello-grafika        graphic services on Pelješac
 *   sottomonte                 real estate on Pelješac
 *
 * Do NOT add a location here without projects to put under it. A page claiming
 * a town where nothing was ever delivered is the local-SEO version of a
 * fabricated metric, and section 0.7 rules it out.
 *
 * Croatian and English only, matching SERVICE_LOCALES: Croatian carries the
 * local search, English serves the foreign owners who hold a lot of the
 * property on the peninsula.
 *
 * Imported by the React app AND scripts/prerender.mjs, so keep it plain data.
 */
import { photo } from './photos.js'

export const LOCATION_LOCALES = ['hr', 'en']

export const LOCATIONS = [
  {
    id: 'orebic',
    key: 'l1',
    /**
     * Top level rather than nested under /usluge/: this is a landing page for
     * a commercial query, and the shorter path keeps the town in the first
     * path segment where it carries the most weight.
     */
    slug: {
      hr: 'izrada-web-stranica-orebic',
      en: 'website-development-orebic',
    },
    /** Real delivered work in this area, in the order it is shown as proof. */
    relatedProjects: [
      'visit-eva-orebic',
      'camping-loviste-paradise',
      'sabioncello',
      'sottomonte',
      'sabioncello-grafika',
    ],
    /** The services this page funnels into; order matters, first is primary. */
    services: ['website-development', 'tourism-websites', 'maintenance-seo'],
    /** Supporting articles, so the page is not a dead end. */
    relatedPosts: ['peljesac-web', 'tourism-website', 'local-seo'],
    image: photo('peljesac-panorama'),
  },
]

export const locationById = (id) => LOCATIONS.find((l) => l.id === id)

/** Find a location from a localised slug, e.g. "izrada-web-stranica-orebic". */
export const locationBySlug = (lng, slug) => LOCATIONS.find((l) => l.slug[lng] === slug)
