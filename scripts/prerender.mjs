/**
 * Turns the SPA build into a fully static site: one prerendered HTML file per
 * URL, for every locale.
 *
 *   dist/index.html                          hr home (canonical root)
 *   dist/projekti/index.html                 hr projects index
 *   dist/projekti/<slug>/index.html          hr project detail  (x5)
 *   dist/en/... /de/... /pl/...              same tree per locale
 *   dist/404.html                            noindex fallback
 *
 * Each page ships translated title/description, Open Graph + Twitter cards, a
 * canonical URL, reciprocal hreflang alternates and JSON-LD, plus the real body
 * markup so crawlers that do not execute JavaScript see actual content.
 *
 * Also emits robots.txt and sitemap.xml.
 *
 * Run after `vite build` + `vite build --ssr`. See package.json.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import {
  SITE_ORIGIN,
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  GOOGLE_SITE_VERIFICATION,
  urlForLocale,
  projectUrl,
  projectsIndexPath,
  personSchema,
  websiteSchema,
  breadcrumbSchema,
  creativeWorkSchema,
  collectionSchema,
} from '../src/seo/siteConfig.js'
import { allPages } from '../src/routes.js'
import { PROJECTS, projectBySlug } from '../src/data/projects.js'

const DIST = 'dist'
const SSR_ENTRY = path.resolve('dist-ssr/entry-server.js')

const attr = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const text = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** `</script>` inside JSON-LD would close the tag early. */
const jsonLd = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')

const locales = {}
async function locale(lng) {
  if (!locales[lng]) {
    locales[lng] = JSON.parse(await fs.readFile(`src/locales/${lng}.json`, 'utf8'))
  }
  return locales[lng]
}

/** Per-page title, description, canonical, alternates, image and JSON-LD graphs. */
async function describe(page) {
  const { lng, type, slug } = page
  const L = await locale(lng)
  const url = `${SITE_ORIGIN}${page.path}`

  if (type === 'home') {
    return {
      title: L.seo.title,
      description: L.seo.description,
      url,
      imageAlt: L.seo.ogImageAlt,
      image: OG_IMAGE,
      alternates: Object.fromEntries(LOCALES.map((l) => [l, urlForLocale(l)])),
      schemas: [personSchema(lng, L.seo), websiteSchema(lng, L.seo)],
    }
  }

  if (type === 'projects') {
    return {
      title: L.projectPage.indexMetaTitle,
      description: L.projectPage.indexMetaDesc,
      url,
      imageAlt: L.seo.ogImageAlt,
      image: OG_IMAGE,
      alternates: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_ORIGIN}${projectsIndexPath(l)}`]),
      ),
      schemas: [
        collectionSchema(lng, L.projectPage && { title: L.projectPage.indexMetaTitle, description: L.projectPage.indexMetaDesc }, PROJECTS),
        breadcrumbSchema([
          { name: L.projectPage.crumbHome, url: urlForLocale(lng) },
          { name: L.projectPage.crumbProjects, url },
        ]),
      ],
    }
  }

  const project = projectBySlug(slug)
  const copy = {
    title: L.projects[`${project.key}MetaTitle`],
    description: L.projects[`${project.key}MetaDesc`],
  }
  return {
    title: copy.title,
    description: copy.description,
    url,
    image: `${SITE_ORIGIN}${project.images[0]}`,
    imageAlt: `${project.title}, ${L.projects[`${project.key}Subtitle`]}`,
    alternates: Object.fromEntries(LOCALES.map((l) => [l, projectUrl(l, slug)])),
    schemas: [
      creativeWorkSchema(project, lng, copy),
      breadcrumbSchema([
        { name: L.projectPage.crumbHome, url: urlForLocale(lng) },
        { name: L.projectPage.crumbProjects, url: `${SITE_ORIGIN}${projectsIndexPath(lng)}` },
        { name: project.title, url },
      ]),
    ],
  }
}

function headFor(lng, meta, { noindex = false } = {}) {
  const alternates = Object.entries(meta.alternates)
    .map(([code, href]) => `    <link rel="alternate" hreflang="${LOCALE_TAGS[code]}" href="${attr(href)}" />`)
    .join('\n')

  const ogAlts = LOCALES.filter((c) => c !== lng)
    .map((c) => `    <meta property="og:locale:alternate" content="${LOCALE_TAGS[c].replace('-', '_')}" />`)
    .join('\n')

  const robots = noindex
    ? '<meta name="robots" content="noindex, follow" />'
    : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />'

  return `
    <link rel="canonical" href="${attr(meta.url)}" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${attr(meta.alternates[DEFAULT_LOCALE])}" />

    ${robots}
    <meta name="author" content="Martin Bogoje" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Martin Bogoje" />
    <meta property="og:title" content="${attr(meta.title)}" />
    <meta property="og:description" content="${attr(meta.description)}" />
    <meta property="og:url" content="${attr(meta.url)}" />
    <meta property="og:image" content="${attr(meta.image)}" />
    <meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />
    <meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />
    <meta property="og:image:alt" content="${attr(meta.imageAlt)}" />
    <meta property="og:locale" content="${LOCALE_TAGS[lng].replace('-', '_')}" />
${ogAlts}

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${attr(meta.title)}" />
    <meta name="twitter:description" content="${attr(meta.description)}" />
    <meta name="twitter:image" content="${attr(meta.image)}" />
    <meta name="twitter:image:alt" content="${attr(meta.imageAlt)}" />
${meta.schemas.map((s) => `    <script type="application/ld+json">${jsonLd(s)}</script>`).join('\n')}`
}

function buildHtml(template, lng, meta, appHtml, opts) {
  const verification = GOOGLE_SITE_VERIFICATION
    ? `<meta name="google-site-verification" content="${attr(GOOGLE_SITE_VERIFICATION)}" />`
    : '<!-- Set GOOGLE_SITE_VERIFICATION in src/seo/siteConfig.js to emit the Search Console tag. -->'

  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${lng}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${text(meta.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${attr(meta.description)}" />`,
    )
    .replace('<!--seo-verification-->', verification)
    .replace('<!--seo-head-->', headFor(lng, meta, opts))
    .replace('<!--app-html-->', appHtml)
}

async function main() {
  const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8')
  for (const marker of ['<!--seo-head-->', '<!--app-html-->', '<!--seo-verification-->']) {
    if (!template.includes(marker)) throw new Error(`index.html is missing ${marker}`)
  }

  const { render } = await import(pathToFileURL(SSR_ENTRY).href)

  let count = 0
  for (const page of allPages) {
    const meta = await describe(page)
    const appHtml = await render(page.lng, page.path)
    const html = buildHtml(template, page.lng, meta, appHtml)

    const outDir = path.join(DIST, page.path)
    await fs.mkdir(outDir, { recursive: true })
    await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8')
    count++
    console.log(`  ${page.path.padEnd(34)} ${String((Buffer.byteLength(html) / 1024).toFixed(0)).padStart(4)} KB`)
  }

  await write404(template, render)
  await writeRobots()
  await writeSitemap()
  console.log(`\n${count} pages prerendered.`)
}

/** Static-host fallback. noindex so it never competes in search. */
async function write404(template, render) {
  const L = await locale(DEFAULT_LOCALE)
  const appHtml = await render(DEFAULT_LOCALE, '/__not-found__')
  const meta = {
    title: `${L.notFound.title} | Martin Bogoje`,
    description: L.notFound.text,
    url: `${SITE_ORIGIN}/404.html`,
    image: OG_IMAGE,
    imageAlt: L.seo.ogImageAlt,
    alternates: Object.fromEntries(LOCALES.map((l) => [l, urlForLocale(l)])),
    schemas: [],
  }
  const html = buildHtml(template, DEFAULT_LOCALE, meta, appHtml, { noindex: true })
  await fs.writeFile(path.join(DIST, '404.html'), html, 'utf8')
  console.log('  dist/404.html (noindex)')
}

async function writeRobots() {
  const body = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`
  await fs.writeFile(path.join(DIST, 'robots.txt'), body, 'utf8')
  console.log('  dist/robots.txt')
}

async function writeSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10)

  const urls = allPages
    .map((page) => {
      const alts = LOCALES.map((code) => {
        const sibling = allPages.find(
          (p) => p.lng === code && p.type === page.type && p.slug === page.slug,
        )
        return sibling
          ? `    <xhtml:link rel="alternate" hreflang="${LOCALE_TAGS[code]}" href="${attr(SITE_ORIGIN + sibling.path)}" />`
          : null
      })
        .filter(Boolean)
        .join('\n')

      const xDefault = allPages.find(
        (p) => p.lng === DEFAULT_LOCALE && p.type === page.type && p.slug === page.slug,
      )

      return `  <url>
    <loc>${attr(SITE_ORIGIN + page.path)}</loc>
${alts}
${xDefault ? `    <xhtml:link rel="alternate" hreflang="x-default" href="${attr(SITE_ORIGIN + xDefault.path)}" />` : ''}
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
  await fs.writeFile(path.join(DIST, 'sitemap.xml'), xml, 'utf8')
  console.log(`  dist/sitemap.xml (${allPages.length} URLs)`)
}

main().catch((err) => {
  console.error('\nPrerender failed:\n', err)
  process.exit(1)
})
