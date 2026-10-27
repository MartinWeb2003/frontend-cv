import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiCheck, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { PRICES, COST_FACTORS, SHOW_PRICES, CURRENCY_SYMBOL } from '../data/pricing'
import { SERVICE_LOCALES } from '../data/services'
import { imgAttrs, SIZES } from '../data/imageAttrs'
import PageHeader from '../components/PageHeader'
import EarnSection from '../components/EarnSection'
import usePageMeta from '../seo/usePageMeta'
import {
  DEFAULT_LOCALE,
  LOCALES,
  SITE_ORIGIN,
  pagePath,
  pageUrl,
  PERSON,
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
    <article className="pagewrap pricing">
      <div className="container">
        <PageHeader
          crumbs={[
            { label: t('projectPage.crumbHome'), href: pathForLocale(lng) },
            { label: t('pricingPage.label') },
          ]}
          title={t('pricingPage.title')}
          lead={t('pricingPage.lead')}
          size="lg"
        />

        <figure className="partband">
          <img
            alt=""
            {...imgAttrs('/covers/page-pricing.svg', SIZES.hero)}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </figure>

        <div className="prose pricing__intro">
          <p>{t('pricingPage.intro1')}</p>
          <p>{t('pricingPage.intro2')}</p>
        </div>

        {/* Value before cost: what a site earns, then what it costs. */}
        <EarnSection />

        {SHOW_PRICES && (
          <section className="psection">
            <h2 className="psection__title">{t('pricingPage.tableTitle')}</h2>
            <p className="pricing__note">{t('pricingPage.tableNote')}</p>
            <table className="pricing__table">
              <thead className="sr-only">
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
                      <span className="pricing__from">{t('pricingPage.from')}</span>
                      <span className="pricing__price">
                        {p.price} {CURRENCY_SYMBOL}
                      </span>
                      {unitLabel[p.unit] ? <span className="pricing__unit">{unitLabel[p.unit]}</span> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <section className="psection pricing__split">
          <div>
            <h2 className="psection__title">{t('pricingPage.factorsTitle')}</h2>
            <p className="lead">{t('pricingPage.factorsIntro')}</p>
          </div>
          <ul className="pricing__factors">
            {COST_FACTORS.map((f, i) => (
              <li key={f}>
                <span className="pricing__factor-num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{t(`pricingPage.${f}Title`)}</h3>
                  <p>{t(`pricingPage.${f}Text`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="psection pricing__pair">
          <div className="pricing__panel">
            <h2 className="pricing__panel-title">{t('pricingPage.includedTitle')}</h2>
            <ul className="pricing__checks">
              {['inc1', 'inc2', 'inc3', 'inc4'].map((k) => (
                <li key={k}>
                  <FiCheck size={17} aria-hidden="true" />
                  <span>{t(`pricingPage.${k}`)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pricing__panel pricing__panel--line">
            <h2 className="pricing__panel-title">{t('pricingPage.extraTitle')}</h2>
            <p>{t('pricingPage.extra')}</p>
          </div>
        </section>

        <section className="psection">
          <h2 className="psection__title">{t('pricingPage.faqTitle')}</h2>
          <div className="faq">
            {[1, 2, 3, 4].map((n) => (
              <details key={n} open={n === 1}>
                <summary><h3>{t(`pricingPage.faq${n}Q`)}</h3></summary>
                <p>{t(`pricingPage.faq${n}A`)}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="pcta" data-theme="ink">
          <div className="pcta__copy">
            <h2 className="pcta__title">{t('pricingPage.ctaTitle')}</h2>
            <p className="pcta__text">{t('pricingPage.ctaText')}</p>
            <ul className="pcta__points">
              {[1, 2, 3].map((n) => (
                <li key={n}>
                  <FiCheck size={16} aria-hidden="true" />
                  {t(`pricingPage.ctaPoint${n}`)}
                </li>
              ))}
            </ul>
          </div>
          <div className="pcta__actions">
            <a href={`mailto:${PERSON.email}`} className="pcta__mail">
              <span className="pcta__mail-label">{t('pricingPage.ctaMailLabel')}</span>
              <span className="pcta__mail-row">
                <span className="pcta__mail-text">{PERSON.email}</span>
                <span className="pcta__mail-go" aria-hidden="true">
                  <FiArrowUpRight size={22} />
                </span>
              </span>
            </a>
            <div className="pcta__buttons">
              <Link to={pagePath('contact', lng)} className="btn btn-primary btn-lg">
                {t('pricingPage.ctaBtn')} <FiArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link to={servicesIndexPath(lng)} className="btn btn-outline btn-lg">
                {t('services.crumbServices')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}
