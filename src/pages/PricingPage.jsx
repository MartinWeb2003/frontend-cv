import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiCheck, FiMail, FiArrowRight } from 'react-icons/fi'
import { PRICES, COST_FACTORS, SHOW_PRICES, CURRENCY_SYMBOL } from '../data/pricing'
import { SERVICE_LOCALES } from '../data/services'
import usePageMeta from '../seo/usePageMeta'
import {
  DEFAULT_LOCALE,
  LOCALES,
  SITE_ORIGIN,
  pagePath,
  pageUrl,
  pathForLocale,
  servicesIndexPath,
} from '../seo/siteConfig'
import './PricingPage.css'

export default function PricingPage() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  usePageMeta({
    title: t('pricingPage.metaTitle'),
    description: t('pricingPage.metaDesc'),
    canonical: pageUrl('pricing', lng),
    alternates: Object.fromEntries(
      SERVICE_LOCALES.map((l) => [l, `${SITE_ORIGIN}${pagePath('pricing', l)}`]),
    ),
  })

  const unitLabel = { project: '', month: t('pricingPage.perMonth'), hour: t('pricingPage.perHour') }

  return (
    <article className="pricing">
      <div className="container">
        <nav className="pricing__crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to={pathForLocale(lng)}>{t('projectPage.crumbHome')}</Link>
            </li>
            <li aria-current="page">{t('pricingPage.label')}</li>
          </ol>
        </nav>

        <header className="pricing__header">
          <span className="section-label">{t('pricingPage.label')}</span>
          <h1 className="pricing__title">{t('pricingPage.title')}</h1>
          <p className="pricing__lead">{t('pricingPage.lead')}</p>
        </header>

        <div className="pricing__body">
          <p>{t('pricingPage.intro1')}</p>
          <p>{t('pricingPage.intro2')}</p>
        </div>

        {SHOW_PRICES && (
          <section className="pricing__section">
            <h2>{t('pricingPage.tableTitle')}</h2>
            <p className="pricing__note">{t('pricingPage.tableNote')}</p>
            <div className="pricing__table-wrap">
              <table className="pricing__table">
                <thead>
                  <tr>
                    <th scope="col">{t('pricingPage.colService')}</th>
                    <th scope="col">{t('pricingPage.colFrom')}</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICES.map((p) => (
                    <tr key={p.id}>
                      <th scope="row">
                        <span className="pricing__item-name">{t(`pricingPage.${p.id}Name`)}</span>
                        <span className="pricing__item-desc">{t(`pricingPage.${p.id}Desc`)}</span>
                      </th>
                      <td className="pricing__amount">
                        <span className="pricing__from">{t('pricingPage.from')}</span>{' '}
                        {p.price} {CURRENCY_SYMBOL}
                        {unitLabel[p.unit] ? (
                          <span className="pricing__unit">{unitLabel[p.unit]}</span>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="pricing__section pricing__narrow">
          <h2>{t('pricingPage.factorsTitle')}</h2>
          <p>{t('pricingPage.factorsIntro')}</p>
          <ul className="pricing__factors">
            {COST_FACTORS.map((f) => (
              <li key={f}>
                <FiCheck size={15} aria-hidden="true" />
                <span>
                  <strong>{t(`pricingPage.${f}Title`)}</strong> {t(`pricingPage.${f}Text`)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="pricing__section pricing__narrow">
          <h2>{t('pricingPage.includedTitle')}</h2>
          <ul className="pricing__factors">
            {['inc1', 'inc2', 'inc3', 'inc4'].map((k) => (
              <li key={k}>
                <FiCheck size={15} aria-hidden="true" />
                <span>{t(`pricingPage.${k}`)}</span>
              </li>
            ))}
          </ul>
          <h2>{t('pricingPage.extraTitle')}</h2>
          <p>{t('pricingPage.extra')}</p>
        </section>

        <section className="pricing__section pricing__narrow">
          <h2>{t('pricingPage.faqTitle')}</h2>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="pricing__faq-item">
              <h3>{t(`pricingPage.faq${n}Q`)}</h3>
              <p>{t(`pricingPage.faq${n}A`)}</p>
            </div>
          ))}
        </section>

        <section className="pricing__cta">
          <h2>{t('pricingPage.ctaTitle')}</h2>
          <p>{t('pricingPage.ctaText')}</p>
          <div className="pricing__cta-actions">
            <Link to={pagePath('contact', lng)} className="btn btn-primary">
              <FiMail size={14} /> {t('services.ctaBtn')}
            </Link>
            <Link to={servicesIndexPath(lng)} className="btn btn-outline">
              {t('services.crumbServices')} <FiArrowRight size={13} />
            </Link>
          </div>
        </section>
      </div>
    </article>
  )
}
