import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { SERVICES, SERVICE_LOCALES } from '../data/services'
import usePageMeta from '../seo/usePageMeta'
import {
  DEFAULT_LOCALE,
  LOCALES,
  SITE_ORIGIN,
  servicePath,
  servicesIndexPath,
} from '../seo/siteConfig'
import './ServicePage.css'

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
    <div className="service service--hub">
      <div className="container">
        <span className="section-label">{t('services.crumbServices')}</span>
        <h1 className="service__title">{t('services.indexTitle')}</h1>
        <p className="service__lead">{t('services.indexLead')}</p>

        <ul className="service__hub-grid">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <Link to={servicePath(lng, s.slug[lng])} className="service__hub-card">
                <span className="service__num">{s.num}</span>
                <h2 className="service__hub-title">{t(`services.${s.key}Name`)}</h2>
                <p className="service__hub-sub">{t(`services.${s.key}Lead`)}</p>
                <span className="service__hub-tags">
                  {s.stack.slice(0, 3).map((x) => (
                    <span key={x} className="tag">{x}</span>
                  ))}
                </span>
                <span className="service__hub-cta">
                  {t('services.viewService')} <FiArrowUpRight size={14} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
