import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { FiCheck, FiArrowRight, FiArrowLeft, FiMail } from 'react-icons/fi'
import { SERVICES, SERVICE_LOCALES, serviceBySlug } from '../data/services'
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
  servicesIndexPath,
  serviceUrl,
} from '../seo/siteConfig'
import './ServicePage.css'

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

      <article className="service">
        <div className="container">
          <nav className="service__crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to={pathForLocale(lng)}>{t('projectPage.crumbHome')}</Link>
              </li>
              <li>
                <Link to={servicesIndexPath(lng)}>{t('services.crumbServices')}</Link>
              </li>
              <li aria-current="page">{ts('Name')}</li>
            </ol>
          </nav>

          <header className="service__header">
            <span className="service__num">{service.num}</span>
            <h1 className="service__title">{ts('Title')}</h1>
            <p className="service__lead">{ts('Lead')}</p>
          </header>

          <div className="service__body">
            <p>{ts('Intro1')}</p>
            <p>{ts('Intro2')}</p>
            <p>{ts('Intro3')}</p>

            <section className="service__section">
              <h2>{t('services.getTitle')}</h2>
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
              <h2>{t('services.processTitle')}</h2>
              <ol className="service__steps">
                {steps.map((s, i) => (
                  <li key={s}>
                    <span className="service__step-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="service__section">
              <h2>{t('services.forTitle')}</h2>
              <ul className="service__checks">
                {fors.map((f) => (
                  <li key={f}>
                    <FiCheck size={15} aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="service__section">
              <h2>{ts('NoteTitle')}</h2>
              <ul className="service__checks">
                {notes.map((n) => (
                  <li key={n}>
                    <FiCheck size={15} aria-hidden="true" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="service__section">
              <h2>{t('services.stackTitle')}</h2>
              <div className="service__tags">
                {service.stack.map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </section>
          </div>

          {/* Real projects as proof, and a strong internal link into the case studies. */}
          {related.length > 0 && (
            <section className="service__proof">
              <h2>{t('services.proofTitle')}</h2>
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

          {/*
            Written as plain Q&A, not FAQPage schema: Google restricted FAQ rich
            results to authority sites in 2023, so the markup would earn nothing
            while risking a mismatch. The content still answers the questions.
          */}
          <section className="service__section service__faq">
            <h2>{t('services.faqTitle')}</h2>
            {faqs.map(({ q, a }) => (
              <div key={q} className="service__faq-item">
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </section>

          <section className="service__cta">
            <h2>{t('services.ctaTitle')}</h2>
            <p>{t('services.ctaText')}</p>
            <div className="service__cta-actions">
              <Link to={pagePath('contact', lng)} className="btn btn-primary">
                <FiMail size={14} /> {t('services.ctaBtn')}
              </Link>
              <Link to={servicesIndexPath(lng)} className="btn btn-outline">
                <FiArrowLeft size={13} /> {t('services.crumbServices')}
              </Link>
            </div>
          </section>

          <nav className="service__pager">
            <Link to={servicePath(lng, next.slug[lng])} className="service__pager-link">
              {t('services.next')}: {t(`services.${next.key}Name`)} <FiArrowRight size={14} />
            </Link>
          </nav>
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
