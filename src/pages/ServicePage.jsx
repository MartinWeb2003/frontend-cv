import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { FiCheck, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { projectBySlug } from '../data/projects'
import { SERVICES, SERVICE_LOCALES, serviceBySlug, serviceCover } from '../data/services'
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
  servicesIndexPath,
  serviceUrl,
} from '../seo/siteConfig'
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

export default function ServicePage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE
  const service = serviceBySlug(lng, slug)

  if (!service) return <NotFoundPage />

  const k = service.key
  const ts = (field) => t(`services.${k}${field}`)

  const gets = ['Get1', 'Get2', 'Get3', 'Get4', 'Get5'].map(ts)
  const steps = ['Step1', 'Step2', 'Step3', 'Step4'].map(ts)
  const fors = ['For1', 'For2', 'For3', 'For4'].map(ts)
  const faqs = [1, 2, 3, 4, 5, 6].map((n) => ({ q: ts(`Faq${n}Q`), a: ts(`Faq${n}A`) }))
  const notes = ['Note1', 'Note2', 'Note3'].map(ts)

  const related = service.relatedProjects.map(projectBySlug).filter(Boolean)
  const index = SERVICES.findIndex((s) => s.id === service.id)
  const next = SERVICES[(index + 1) % SERVICES.length]

  return (
    <>
      <ServiceMeta service={service} lng={lng} title={ts('MetaTitle')} description={ts('MetaDesc')} />

      <article className="pagewrap service">
        <div className="container">
          <PageHeader
            crumbs={[
              { label: t('projectPage.crumbHome'), href: pathForLocale(lng) },
              { label: t('services.crumbServices'), href: servicesIndexPath(lng) },
              { label: ts('Name') },
            ]}
            title={ts('Title')}
            lead={ts('Lead')}
            size="lg"
          >
            <div className="service__head-cta">
              <Link to={pagePath('contact', lng)} className="btn btn-primary btn-lg">
                {t('services.ctaBtn')} <FiArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link to={pagePath('pricing', lng)} className="btn btn-outline btn-lg">
                {t('pricingPage.label')}
              </Link>
            </div>
          </PageHeader>

          <figure className="partband">
            <img
              alt=""
              {...imgAttrs(serviceCover(service.id), SIZES.hero)}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </figure>

          <div className="service__intro">
            <div className="prose">
              <p>{ts('Intro1')}</p>
              <p>{ts('Intro2')}</p>
              <p>{ts('Intro3')}</p>
            </div>
            <aside className="service__panel">
              <h2 className="service__panel-title">{t('services.getTitle')}</h2>
              <Checks items={gets} />
            </aside>
          </div>

          <section className="psection">
            <h2 className="psection__title">{t('services.processTitle')}</h2>
            <ol className="service__steps">
              {steps.map((s, i) => (
                <li key={s}>
                  <span className="service__step-num">{String(i + 1).padStart(2, '0')}</span>
                  <p>{s}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className="service__pair psection">
            <section>
              <h2 className="service__pair-title">{t('services.forTitle')}</h2>
              <Checks items={fors} />
            </section>
            <section>
              <h2 className="service__pair-title">{ts('NoteTitle')}</h2>
              <Checks items={notes} />
              <h3 className="service__stack-title">{t('services.stackTitle')}</h3>
              <div className="service__tags">
                {service.stack.map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </section>
          </div>

          {/* Real projects as proof, and a strong internal link into the case studies. */}
          {related.length > 0 && (
            <section className="psection">
              <h2 className="psection__title">{t('services.proofTitle')}</h2>
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

          {/*
            Plain Q&A, not FAQPage schema: Google restricted FAQ rich results to
            authority sites in 2023, so the markup would earn nothing while
            risking a mismatch. The answers are in the DOM either way.
          */}
          <section className="psection">
            <h2 className="psection__title">{t('services.faqTitle')}</h2>
            <div className="faq">
              {faqs.map(({ q, a }, i) => (
                <details key={q} open={i === 0}>
                  <summary><h3>{q}</h3></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="pband" data-theme="ink">
            <h2 className="pband__title">{t('services.ctaTitle')}</h2>
            <p className="pband__text">{t('services.ctaText')}</p>
            <div className="pband__actions">
              <Link to={pagePath('contact', lng)} className="btn btn-primary btn-lg">
                {t('services.ctaBtn')} <FiArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link to={servicePath(lng, next.slug[lng])} className="btn btn-outline btn-lg">
                {t('services.next')}: {t(`services.${next.key}Name`)}
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  )
}

/** Separated so hook order stays stable when the slug is unknown. */
function ServiceMeta({ service, lng, title, description }) {
  usePageMeta({
    title,
    description,
    canonical: serviceUrl(lng, service.slug[lng]),
    // Only the locales that actually have this page.
    alternates: Object.fromEntries(
      SERVICE_LOCALES.map((l) => [l, `${SITE_ORIGIN}${servicePath(l, service.slug[l])}`]),
    ),
  })
  return null
}
