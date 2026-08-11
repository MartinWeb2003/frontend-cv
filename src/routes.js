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
} from './seo/siteConfig.js'
import { PROJECTS } from './data/projects.js'

/** Route patterns for react-router, per locale. */
export const routePatterns = LOCALES.flatMap((lng) => [
  { lng, type: 'home', pattern: pathForLocale(lng) },
  { lng, type: 'projects', pattern: projectsIndexPath(lng) },
  { lng, type: 'project', pattern: `${projectsIndexPath(lng)}:slug` },
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
  return pathForLocale(targetLng)
}
