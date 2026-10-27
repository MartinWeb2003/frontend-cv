import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiArrowRight } from 'react-icons/fi'
import { imgAttrs } from '../data/imageAttrs'
import { SERVICES, SERVICE_LOCALES, serviceCover } from '../data/services'
import PageHeader from '../components/PageHeader'
import usePageMeta from '../seo/usePageMeta'
import {
  DEFAULT_LOCALE,
  LOCALES,
  SITE_ORIGIN,
  pagePath,
  pathForLocale,
  servicePath,
  servicesIndexPath,
} from '../seo/siteConfig'
import '../components/Services.css'

export default function ServicesIndexPage() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  usePageMeta({
    title: t('services.indexMetaTitle'),
    description: t('services.indexMetaDesc'),
    canonical: `${SITE_ORIGIN}${servicesIndexPath(lng)}`,
    alternates: Object.fromEntries(
      SERVICE_LOCALES.map((l) => [l, `${SITE_ORIGIN}${servicesIndexPath(l)}`]),
    ),
  })

  return (
    <div className="pagewrap">
      <div className="container">
        <PageHeader
          crumbs={[
            { label: t('projectPage.crumbHome'), href: pathForLocale(lng) },
            { label: t('services.crumbServices') },
          ]}
          title={t('services.indexTitle')}
          lead={t('services.indexLead')}
        />

        <ol className="services__grid">
          {SERVICES.map((s) => (
            <li key={s.id} className="services__item">
              <Link to={servicePath(lng, s.slug[lng])} className="services__card">
                <span className="services__media">
                  <img alt="" {...imgAttrs(serviceCover(s.id), '(max-width: 1000px) 90vw, 30vw')} loading="lazy" decoding="async" />
                </span>
                <span className="services__num">{s.num}</span>
                <h2 className="h3 services__name">{t(`services.${s.key}Name`)}</h2>
                <p className="services__lead">{t(`services.${s.key}Lead`)}</p>
                <ul className="services__stack">
                  {s.stack.slice(0, 3).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <span className="services__go" aria-hidden="true">
                  <FiArrowUpRight size={20} />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <section className="pband" data-theme="ink">
          <h2 className="pband__title">{t('services.ctaTitle')}</h2>
          <p className="pband__text">{t('services.ctaText')}</p>
          <div className="pband__actions">
            <Link to={pagePath('contact', lng)} className="btn btn-primary btn-lg">
              {t('services.ctaBtn')} <FiArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link to={pagePath('pricing', lng)} className="btn btn-outline btn-lg">
              {t('pricingPage.label')}
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
