import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LOCALE_TAGS, DEFAULT_LOCALE, OG_IMAGE, SITE_ORIGIN } from './siteConfig'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Rewrite the hreflang set to this page's per-locale equivalents. */
function syncAlternates(alternates) {
  if (!alternates) return
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove())

  for (const [lng, href] of Object.entries(alternates)) {
    const el = document.createElement('link')
    el.setAttribute('rel', 'alternate')
    el.setAttribute('hreflang', LOCALE_TAGS[lng] ?? lng)
    el.setAttribute('href', href)
    document.head.appendChild(el)
  }
  const xd = document.createElement('link')
  xd.setAttribute('rel', 'alternate')
  xd.setAttribute('hreflang', 'x-default')
  xd.setAttribute('href', alternates[DEFAULT_LOCALE])
  document.head.appendChild(xd)
}

/**
 * Applies per-page metadata after client-side navigation.
 *
 * The prerendered HTML is already correct on first paint, so this exists purely
 * so that router navigations (home -> project) and runtime language switches do
 * not leave stale tags behind.
 *
 * @param {{title: string, description: string, canonical: string,
 *          alternates?: Record<string,string>, image?: string, imageAlt?: string}} meta
 */
export default function usePageMeta(meta) {
  const { t, i18n } = useTranslation()
  const lng = LOCALE_TAGS[i18n.language] ? i18n.language : DEFAULT_LOCALE

  const { title, description, canonical, alternates, image, imageAlt } = meta
  const ogImage = image ? `${SITE_ORIGIN}${image}` : OG_IMAGE
  const alt = imageAlt ?? t('seo.ogImageAlt')
  const altKey = alternates ? JSON.stringify(alternates) : ''

  useEffect(() => {
    document.title = title
    document.documentElement.setAttribute('lang', lng)

    upsertMeta('name', 'description', description)

    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:locale', LOCALE_TAGS[lng])
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:image:alt', alt)

    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)
    upsertMeta('name', 'twitter:image:alt', alt)

    upsertCanonical(canonical)
    // altKey is the serialised form of `alternates`; depending on the string
    // keeps the effect from re-running on every render just because the object
    // identity changed.
    syncAlternates(JSON.parse(altKey || '{}'))
  }, [lng, title, description, canonical, ogImage, alt, altKey])
}
