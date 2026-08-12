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
  BING_SITE_VERIFICATION,
  ANALYTICS,
  PERSON,
  urlForLocale,
  projectUrl,
  projectsIndexPath,
  pagePath,
  pageUrl,
  pathForLocale,
  personSchema,
  websiteSchema,
  breadcrumbSchema,
  creativeWorkSchema,
  collectionSchema,
  profilePageSchema,
  contactPageSchema,
  webPageSchema,
  localBusinessSchema,
  serviceSchema,
  serviceListSchema,
  servicePath,
  servicesIndexPath,
  blogIndexPath,
  postPath,
  blogPostingSchema,
  blogSchema,
} from '../src/seo/siteConfig.js'
import { allPages } from '../src/routes.js'
import { PROJECTS, projectBySlug } from '../src/data/projects.js'
import { SERVICES, SERVICE_LOCALES, serviceById } from '../src/data/services.js'
import { POSTS, POST_LOCALES, postById } from '../src/data/posts.js'

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
      schemas: [
        personSchema(lng, L.seo),
        websiteSchema(lng, L.seo),
        localBusinessSchema(lng, L.seo),
      ].filter(Boolean),
    }
  }

  /* Standalone pages: about, contact, privacy. */
  if (type === 'about' || type === 'contact' || type === 'privacy') {
    const block = { about: 'aboutPage', contact: 'contactPage', privacy: 'privacyPage' }[type]
    const copy = { title: L[block].metaTitle, description: L[block].metaDesc }

    const schemaFor = {
      about: () => [
        profilePageSchema(lng, copy),
        breadcrumbSchema([
          { name: L.projectPage.crumbHome, url: urlForLocale(lng) },
          { name: L.aboutPage.title, url },
        ]),
      ],
      contact: () => [
        contactPageSchema(lng, copy),
        breadcrumbSchema([
          { name: L.projectPage.crumbHome, url: urlForLocale(lng) },
          { name: L.contactPage.title, url },
        ]),
      ],
      privacy: () => [webPageSchema(lng, copy, url)],
    }

    return {
      title: copy.title,
      description: copy.description,
      url,
      image: type === 'about' && PERSON.photo ? `${SITE_ORIGIN}${PERSON.photo}` : OG_IMAGE,
      imageAlt: L.seo.ogImageAlt,
      alternates: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_ORIGIN}${pagePath(type, l)}`]),
      ),
      schemas: schemaFor[type](),
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

  /* Blog index. hr/en only. */
  if (type === 'blog') {
    const copy = { title: L.blog.indexMetaTitle, description: L.blog.indexMetaDesc }
    return {
      title: copy.title,
      description: copy.description,
      url,
      image: OG_IMAGE,
      imageAlt: L.seo.ogImageAlt,
      alternates: Object.fromEntries(
        POST_LOCALES.map((l) => [l, `${SITE_ORIGIN}${blogIndexPath(l)}`]),
      ),
      schemas: [
        blogSchema(
          lng,
          copy,
          POSTS.map((b) => ({
            title: L.blog[`${b.key}Title`],
            url: `${SITE_ORIGIN}${postPath(lng, b.slug[lng])}`,
            date: b.date,
          })),
        ),
        breadcrumbSchema([
          { name: L.projectPage.crumbHome, url: urlForLocale(lng) },
          { name: L.blog.crumb, url },
        ]),
      ],
    }
  }

  if (type === 'post') {
    const post = postById(page.postId)
    const copy = {
      title: L.blog[`${post.key}MetaTitle`],
      description: L.blog[`${post.key}MetaDesc`],
    }
    return {
      title: copy.title,
      description: copy.description,
      url,
      image: `${SITE_ORIGIN}${post.image}`,
      imageAlt: L.blog[`${post.key}Title`],
      alternates: Object.fromEntries(
        POST_LOCALES.map((l) => [l, `${SITE_ORIGIN}${postPath(l, post.slug[l])}`]),
      ),
      schemas: [
        blogPostingSchema(post, lng, { title: L.blog[`${post.key}Title`], description: copy.description }),
        breadcrumbSchema([
          { name: L.projectPage.crumbHome, url: urlForLocale(lng) },
          { name: L.blog.crumb, url: `${SITE_ORIGIN}${blogIndexPath(lng)}` },
          { name: L.blog[`${post.key}Title`], url },
        ]),
      ],
    }
  }

  /* Cost guide. hr/en only, like services. */
  if (type === 'pricing') {
    const copy = { title: L.pricingPage.metaTitle, description: L.pricingPage.metaDesc }
    return {
      title: copy.title,
      description: copy.description,
      url,
      image: OG_IMAGE,
      imageAlt: L.seo.ogImageAlt,
      alternates: Object.fromEntries(
        SERVICE_LOCALES.map((l) => [l, `${SITE_ORIGIN}${pagePath('pricing', l)}`]),
      ),
      schemas: [
        webPageSchema(lng, copy, url),
        breadcrumbSchema([
          { name: L.projectPage.crumbHome, url: urlForLocale(lng) },
          { name: L.pricingPage.label, url },
        ]),
      ],
    }
  }

  /* Services hub. Alternates only cover SERVICE_LOCALES, never de/pl. */
  if (type === 'services') {
    const copy = { title: L.services.indexMetaTitle, description: L.services.indexMetaDesc }
    return {
      title: copy.title,
      description: copy.description,
      url,
      image: OG_IMAGE,
      imageAlt: L.seo.ogImageAlt,
      alternates: Object.fromEntries(
        SERVICE_LOCALES.map((l) => [l, `${SITE_ORIGIN}${servicesIndexPath(l)}`]),
      ),
      schemas: [
        serviceListSchema(
          lng,
          SERVICES.map((s) => ({
            name: L.services[`${s.key}Name`],
            url: `${SITE_ORIGIN}${servicePath(lng, s.slug[lng])}`,
          })),
          copy,
        ),
        breadcrumbSchema([
          { name: L.projectPage.crumbHome, url: urlForLocale(lng) },
          { name: L.services.crumbServices, url },
        ]),
      ],
    }
  }

  if (type === 'service') {
    const service = serviceById(page.serviceId)
    const copy = {
      title: L.services[`${service.key}MetaTitle`],
      description: L.services[`${service.key}MetaDesc`],
      name: L.services[`${service.key}Name`],
    }
    return {
      title: copy.title,
      description: copy.description,
      url,
      image: OG_IMAGE,
      imageAlt: L.seo.ogImageAlt,
      alternates: Object.fromEntries(
        SERVICE_LOCALES.map((l) => [l, `${SITE_ORIGIN}${servicePath(l, service.slug[l])}`]),
      ),
      schemas: [
        serviceSchema(service, lng, copy),
        breadcrumbSchema([
          { name: L.projectPage.crumbHome, url: urlForLocale(lng) },
          { name: L.services.crumbServices, url: `${SITE_ORIGIN}${servicesIndexPath(lng)}` },
          { name: copy.name, url },
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

/**
 * Preload the two font faces used above the fold.
 *
 * fontsource is imported from CSS, so the browser only discovers the woff2
 * after the stylesheet parses, which delays the first text paint and therefore
 * LCP. Preloading the exact hashed files pulls that discovery forward.
 *
 * Only latin 400 (body) and latin 900 (the hero h1, which is the LCP element)
 * are preloaded; preloading more would compete for bandwidth.
 */
async function fontPreloads() {
  let assets
  try {
    assets = await fs.readdir(path.join(DIST, 'assets'))
  } catch {
    return ''
  }

  const wanted = [/^inter-latin-400-normal-.*\.woff2$/, /^inter-latin-900-normal-.*\.woff2$/]
  return wanted
    .map((re) => assets.find((f) => re.test(f)))
    .filter(Boolean)
    .map(
      (file) =>
        `    <link rel="preload" as="font" type="font/woff2" href="/assets/${file}" crossorigin />`,
    )
    .join('\n')
}

/**
 * Cookieless analytics, deferred so it never sits on the critical path.
 * Returns an empty string when nothing is configured.
 */
function analyticsTag() {
  if (ANALYTICS.plausibleDomain) {
    return `    <script defer data-domain="${attr(ANALYTICS.plausibleDomain)}" src="https://plausible.io/js/script.js"></script>`
  }
  if (ANALYTICS.umamiSrc && ANALYTICS.umamiId) {
    return `    <script defer src="${attr(ANALYTICS.umamiSrc)}" data-website-id="${attr(ANALYTICS.umamiId)}"></script>`
  }
  return ''
}

function buildHtml(template, lng, meta, appHtml, opts = {}) {
  const verification = [
    GOOGLE_SITE_VERIFICATION
      ? `<meta name="google-site-verification" content="${attr(GOOGLE_SITE_VERIFICATION)}" />`
      : '<!-- Set GOOGLE_SITE_VERIFICATION in src/seo/siteConfig.js to emit the Search Console tag. -->',
    BING_SITE_VERIFICATION
      ? `    <meta name="msvalidate.01" content="${attr(BING_SITE_VERIFICATION)}" />`
      : '    <!-- Set BING_SITE_VERIFICATION in src/seo/siteConfig.js for Bing Webmaster Tools. -->',
    analyticsTag(),
    opts.fontPreloads,
  ]
    .filter(Boolean)
    .join('\n')

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
  const preloads = await fontPreloads()

  let count = 0
  for (const page of allPages) {
    const meta = await describe(page)
    const appHtml = await render(page.lng, page.path)
    const html = buildHtml(template, page.lng, meta, appHtml, { fontPreloads: preloads })

    const outDir = path.join(DIST, page.path)
    await fs.mkdir(outDir, { recursive: true })
    await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8')
    count++
    console.log(`  ${page.path.padEnd(34)} ${String((Buffer.byteLength(html) / 1024).toFixed(0)).padStart(4)} KB`)
  }

  await write404(template, render, preloads)
  await writeRobots()
  await writeSitemap()
  console.log(`\n${count} pages prerendered.`)
}

/**
 * Static-host fallbacks, one per locale. noindex so they never compete in
 * search. The host maps /de/* to dist/de/404.html (see netlify.toml), so a
 * German visitor hitting a bad URL gets a German error page rather than a
 * Croatian one.
 */
async function write404(template, render, preloads) {
  for (const lng of LOCALES) {
    const L = await locale(lng)
    const appHtml = await render(lng, `${pathForLocale(lng)}__not-found__`)
    const meta = {
      title: `${L.notFound.title} | Martin Bogoje`,
      description: L.notFound.text,
      url: `${SITE_ORIGIN}${pathForLocale(lng)}404.html`,
      image: OG_IMAGE,
      imageAlt: L.seo.ogImageAlt,
      alternates: Object.fromEntries(LOCALES.map((l) => [l, urlForLocale(l)])),
      schemas: [],
    }
    const html = buildHtml(template, lng, meta, appHtml, {
      noindex: true,
      fontPreloads: preloads,
    })

    const out =
      lng === DEFAULT_LOCALE ? path.join(DIST, '404.html') : path.join(DIST, lng, '404.html')
    await fs.mkdir(path.dirname(out), { recursive: true })
    await fs.writeFile(out, html, 'utf8')
    console.log(`  ${out} (noindex)`)
  }
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
