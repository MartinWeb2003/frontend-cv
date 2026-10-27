import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { FiCheck, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { LOCATIONS, LOCATION_LOCALES, locationBySlug } from '../data/locations'
import { serviceById } from '../data/services'
import { postById } from '../data/posts'
import { projectBySlug } from '../data/projects'
import { imgAttrs, SIZES } from '../data/imageAttrs'
import PageHeader from '../components/PageHeader'
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

function Checks({ items }) {
  return (
    <ul className="service__checks">
      {items.map((g) => (
        <li key={g}>
          <FiCheck size={17} aria-hidden="true" />
          <span>{g}</span>
        </li>
      ))}
    </ul>
  )
}

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

      <article className="pagewrap service">
        <div className="container">
          <PageHeader
            crumbs={[
              { label: t('projectPage.crumbHome'), href: pathForLocale(lng) },
              { label: tl('Name') },
            ]}
            title={tl('Title')}
            lead={tl('Lead')}
            size="lg"
          >
            <div className="service__head-cta">
              <Link to={pagePath('contact', lng)} className="btn btn-primary btn-lg">
                {t('services.ctaBtn')} <FiArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </PageHeader>

          <figure className="partband">
            <img
              alt=""
              {...imgAttrs(location.image, SIZES.hero)}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </figure>

          <div className="service__intro">
            <div className="prose">
              <p>{tl('Intro1')}</p>
              <p>{tl('Intro2')}</p>
              <p>{tl('Intro3')}</p>
            </div>
            <aside className="service__panel">
              <h2 className="service__panel-title">{tl('GetTitle')}</h2>
              <Checks items={gets} />
            </aside>
          </div>

          <div className="service__pair psection">
            <section>
              <h2 className="service__pair-title">{tl('ForTitle')}</h2>
              <Checks items={fors} />
            </section>
            {/* Descriptive anchors into the money pages, never "click here". */}
            <section>
              <h2 className="service__pair-title">{tl('ServicesTitle')}</h2>
              <ul className="service__links">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link to={servicePath(lng, s.slug[lng])} className="service__link">
                      <span>{t(`services.${s.key}Name`)}</span>
                      <FiArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* The whole justification for the page: real work in this area. */}
          {related.length > 0 && (
            <section className="psection">
              <h2 className="psection__title">{tl('ProofTitle')}</h2>
              <ul className="pgrid">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link to={projectPath(lng, p.slug)} className="pcard">
                      <span className="pcard__media">
                        <img
                          alt={`${p.title}, ${t(`projects.${p.key}Subtitle`)}`}
                          {...imgAttrs(p.images[0], SIZES.card)}
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <span className="pcard__body">
                        <span className="pcard__title">{p.title}</span>
                        <span className="pcard__text">{t(`projects.${p.key}Subtitle`)}</span>
                        <span className="pcard__go">
                          {t('home.caseStudy')} <FiArrowUpRight size={15} aria-hidden="true" />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Plain Q&A, not FAQPage schema, for the reason given on ServicePage. */}
          <section className="psection">
            <h2 className="psection__title">{tl('FaqTitle')}</h2>
            <div className="faq">
              {faqs.map(({ q, a }, i) => (
                <details key={q} open={i === 0}>
                  <summary><h3>{q}</h3></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>

          {posts.length > 0 && (
            <section className="psection">
              <h2 className="service__pair-title">{tl('ReadTitle')}</h2>
              <ul className="service__links">
                {posts.map((p) => (
                  <li key={p.id}>
                    <Link to={postPath(lng, p.slug[lng])} className="service__link">
                      <span>{t(`blog.${p.key}Title`)}</span>
                      <FiArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="pband" data-theme="ink">
            <h2 className="pband__title">{tl('CtaTitle')}</h2>
            <p className="pband__text">{tl('CtaText')}</p>
            <div className="pband__actions">
              <Link to={pagePath('contact', lng)} className="btn btn-primary btn-lg">
                {t('services.ctaBtn')} <FiArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link to={pathForLocale(lng)} className="btn btn-outline btn-lg">
                {t('projectPage.crumbHome')}
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
