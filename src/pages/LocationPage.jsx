import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { FiCheck, FiArrowLeft, FiMail, FiArrowUpRight } from 'react-icons/fi'
import { LOCATIONS, LOCATION_LOCALES, locationBySlug } from '../data/locations'
import { serviceById } from '../data/services'
import { postById } from '../data/posts'
import { projectBySlug, PLACEHOLDER_BG } from '../data/projects'
import { imgAttrs, SIZES } from '../data/imageAttrs'
import usePageMeta from '../seo/usePageMeta'
import NotFoundPage from './NotFoundPage'
import {
  DEFAULT_LOCALE,
  LOCALES,
  SITE_ORIGIN,
  pagePath,
  pathForLocale,
  projectPath,
  servicePath,
  postPath,
  locationPath,
  locationUrl,
} from '../seo/siteConfig'
/*
 * Deliberately reuses the service page stylesheet rather than shipping a
 * near-duplicate of it. A location page is the same document shape as a
 * service page (crumbs, header, prose, checklists, proof grid, Q&A, CTA) and
 * has to look identical to it; a second copy of those rules would drift.
 */
import './ServicePage.css'

export default function LocationPage() {
  const { pathname } = useLocation()
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  /*
   * Resolved from the pathname, not from a :slug param: these pages are
   * registered at concrete top-level paths so an unknown path still 404s.
   */
  const slug = pathname.replace(/^\/(?:en|de|pl)\//, '/').replace(/^\/|\/$/g, '')
  const location = locationBySlug(lng, slug)

  if (!location) return <NotFoundPage />

  const k = location.key
  const tl = (field) => t(`locations.${k}${field}`)

  const gets = ['Get1', 'Get2', 'Get3', 'Get4', 'Get5'].map(tl)
  const fors = ['For1', 'For2', 'For3', 'For4'].map(tl)
  const faqs = [1, 2, 3, 4, 5].map((n) => ({ q: tl(`Faq${n}Q`), a: tl(`Faq${n}A`) }))

  const services = location.services.map(serviceById).filter(Boolean)
  const related = location.relatedProjects.map(projectBySlug).filter(Boolean)
  const posts = location.relatedPosts.map(postById).filter(Boolean)

  return (
    <>
      <LocationMeta
        location={location}
        lng={lng}
        title={tl('MetaTitle')}
        description={tl('MetaDesc')}
      />

      <article className="service">
        <div className="container">
          <nav className="service__crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to={pathForLocale(lng)}>{t('projectPage.crumbHome')}</Link>
              </li>
              <li aria-current="page">{tl('Name')}</li>
            </ol>
          </nav>

          <header className="service__header">
            <h1 className="service__title">{tl('Title')}</h1>
            <p className="service__lead">{tl('Lead')}</p>
          </header>

          <div className="service__body">
            <p>{tl('Intro1')}</p>
            <p>{tl('Intro2')}</p>
            <p>{tl('Intro3')}</p>

            <section className="service__section">
              <h2>{tl('GetTitle')}</h2>
              <ul className="service__checks">
                {gets.map((g) => (
                  <li key={g}>
                    <FiCheck size={15} aria-hidden="true" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="service__section">
              <h2>{tl('ForTitle')}</h2>
              <ul className="service__checks">
                {fors.map((f) => (
                  <li key={f}>
                    <FiCheck size={15} aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Descriptive anchors into the money pages, never "click here". */}
            <section className="service__section">
              <h2>{tl('ServicesTitle')}</h2>
              <ul className="service__checks">
                {services.map((s) => (
                  <li key={s.id}>
                    <FiCheck size={15} aria-hidden="true" />
                    <Link to={servicePath(lng, s.slug[lng])}>
                      {t(`services.${s.key}Name`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* The whole justification for the page: real work in this area. */}
          {related.length > 0 && (
            <section className="service__proof">
              <h2>{tl('ProofTitle')}</h2>
              <ul className="service__proof-grid">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to={projectPath(lng, p.slug)}
                      className="service__proof-card"
                      style={{ background: PLACEHOLDER_BG[p.id] }}
                    >
                      <img
                        src={p.images[0]}
                        alt={`${p.title}, ${t(`projects.${p.key}Subtitle`)}`}
                        {...imgAttrs(p.images[0], SIZES.card)}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="service__proof-body">
                        <span className="service__proof-title">{p.title}</span>
                        <span className="service__proof-sub">
                          {t(`projects.${p.key}Subtitle`)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Plain Q&A, not FAQPage schema, for the reason given on ServicePage. */}
          <section className="service__section service__faq">
            <h2>{tl('FaqTitle')}</h2>
            {faqs.map(({ q, a }) => (
              <div key={q} className="service__faq-item">
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </section>

          {posts.length > 0 && (
            <section className="service__section">
              <h2>{tl('ReadTitle')}</h2>
              <ul className="service__checks">
                {posts.map((p) => (
                  <li key={p.id}>
                    <FiArrowUpRight size={15} aria-hidden="true" />
                    <Link to={postPath(lng, p.slug[lng])}>{t(`blog.${p.key}Title`)}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="service__cta">
            <h2>{tl('CtaTitle')}</h2>
            <p>{tl('CtaText')}</p>
            <div className="service__cta-actions">
              <Link to={pagePath('contact', lng)} className="btn btn-primary">
                <FiMail size={14} /> {t('services.ctaBtn')}
              </Link>
              <Link to={pathForLocale(lng)} className="btn btn-outline">
                <FiArrowLeft size={13} /> {t('projectPage.crumbHome')}
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  )
}

/** Separated so hook order stays stable when the slug is unknown. */
function LocationMeta({ location, lng, title, description }) {
  usePageMeta({
    title,
    description,
    canonical: locationUrl(lng, location.slug[lng]),
    // Only the locales that actually have this page.
    alternates: Object.fromEntries(
      LOCATION_LOCALES.map((l) => [l, `${SITE_ORIGIN}${locationPath(l, location.slug[l])}`]),
    ),
  })
  return null
}

export { LOCATIONS }
