/**
 * Every URL the site owns, in one place.
 *
 * The React router registers the pattern form; scripts/prerender.mjs walks the
 * concrete form to emit one static HTML file per entry. Keeping both derived
 * from the same source means a new project or locale can never be prerendered
 * without a route, or routed without being prerendered.
 */
// Explicit .js extensions: this module is imported both through Vite and
// directly by scripts/prerender.mjs under plain Node ESM, which does not do
// extensionless resolution.
import {
  LOCALES,
  pathForLocale,
  projectsIndexPath,
  projectPath,
  pagePath,
  servicesIndexPath,
  servicePath,
  blogIndexPath,
  postPath,
} from './seo/siteConfig.js'
import { PROJECTS } from './data/projects.js'
import { SERVICES, SERVICE_LOCALES } from './data/services.js'
import { POSTS } from './data/posts.js'

/** Standalone pages that exist once per locale. */
const STATIC_PAGES = ['about', 'contact', 'privacy']

/** Services are Croatian and English only; see SERVICE_LOCALES for why. */
export const hasServices = (lng) => SERVICE_LOCALES.includes(lng)

/** Route patterns for react-router, per locale. */
export const routePatterns = LOCALES.flatMap((lng) => [
  { lng, type: 'home', pattern: pathForLocale(lng) },
  { lng, type: 'projects', pattern: projectsIndexPath(lng) },
  { lng, type: 'project', pattern: `${projectsIndexPath(lng)}:slug` },
  ...STATIC_PAGES.map((type) => ({ lng, type, pattern: pagePath(type, lng) })),
  ...(hasServices(lng)
    ? [
        { lng, type: 'services', pattern: servicesIndexPath(lng) },
        { lng, type: 'service', pattern: `${servicesIndexPath(lng)}:slug` },
        { lng, type: 'pricing', pattern: pagePath('pricing', lng) },
        { lng, type: 'blog', pattern: blogIndexPath(lng) },
        { lng, type: 'post', pattern: `${blogIndexPath(lng)}:slug` },
      ]
    : []),
])

/** Concrete URLs, one per page that gets prerendered and listed in the sitemap. */
export const allPages = LOCALES.flatMap((lng) => [
  { lng, type: 'home', path: pathForLocale(lng), priority: lng === 'hr' ? '1.0' : '0.9' },
  { lng, type: 'projects', path: projectsIndexPath(lng), priority: '0.8' },
  ...PROJECTS.map((p) => ({
    lng,
    type: 'project',
    slug: p.slug,
    path: projectPath(lng, p.slug),
    priority: '0.7',
  })),
  { lng, type: 'about', path: pagePath('about', lng), priority: '0.8' },
  { lng, type: 'contact', path: pagePath('contact', lng), priority: '0.7' },
  // Legally required, but not something to spend crawl budget or rank on.
  { lng, type: 'privacy', path: pagePath('privacy', lng), priority: '0.2' },
  // Highest priority after the homepage: these carry the commercial queries.
  ...(hasServices(lng)
    ? [
        { lng, type: 'services', path: servicesIndexPath(lng), priority: '0.9' },
        { lng, type: 'pricing', path: pagePath('pricing', lng), priority: '0.9' },
        { lng, type: 'blog', path: blogIndexPath(lng), priority: '0.7' },
        ...POSTS.map((b) => ({
          lng,
          type: 'post',
          slug: b.slug[lng],
          postId: b.id,
          path: postPath(lng, b.slug[lng]),
          priority: '0.7',
        })),
        ...SERVICES.map((s) => ({
          lng,
          type: 'service',
          slug: s.slug[lng],
          serviceId: s.id,
          path: servicePath(lng, s.slug[lng]),
          priority: '0.9',
        })),
      ]
    : []),
])

/**
 * The same page in another language.
 *
 * Lets the language switcher be a real `<a href>` that keeps the visitor where
 * they are (a German project page links to the Croatian one, not the homepage),
 * which is also what the hreflang tags promise search engines.
 */
export function equivalentPath(pathname, targetLng) {
  const normalised = pathname.endsWith('/') ? pathname : `${pathname}/`
  const current = allPages.find((p) => p.path === normalised)

  if (!current) return pathForLocale(targetLng)
  if (current.type === 'projects') return projectsIndexPath(targetLng)
  if (current.type === 'project') return projectPath(targetLng, current.slug)
  if (STATIC_PAGES.includes(current.type)) return pagePath(current.type, targetLng)
  if (current.type === 'blog') {
    return hasServices(targetLng) ? blogIndexPath(targetLng) : pathForLocale(targetLng)
  }
  if (current.type === 'post') {
    if (!hasServices(targetLng)) return pathForLocale(targetLng)
    const post = POSTS.find((b) => b.id === current.postId)
    return post ? postPath(targetLng, post.slug[targetLng]) : pathForLocale(targetLng)
  }
  if (current.type === 'pricing') {
    return hasServices(targetLng) ? pagePath('pricing', targetLng) : pathForLocale(targetLng)
  }

  // Services only exist in some locales; fall back to that locale's home
  // rather than linking to a URL that was never built.
  if (current.type === 'services') {
    return hasServices(targetLng) ? servicesIndexPath(targetLng) : pathForLocale(targetLng)
  }
  if (current.type === 'service') {
    if (!hasServices(targetLng)) return pathForLocale(targetLng)
    const service = SERVICES.find((s) => s.id === current.serviceId)
    return service ? servicePath(targetLng, service.slug[targetLng]) : pathForLocale(targetLng)
  }

  return pathForLocale(targetLng)
}
