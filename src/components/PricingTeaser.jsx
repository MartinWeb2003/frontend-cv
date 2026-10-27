import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { CURRENCY_SYMBOL, commissionPaid } from '../data/pricing'
import { hasServices } from '../routes'
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, pagePath } from '../seo/siteConfig'
import './PricingTeaser.css'

/** Sourced stats from the cost guide, shown here by their copy keys (earn2..4). */
const STATS = [2, 3, 4]

/*
 * The home page's route into the cost guide, led by what a website earns
 * rather than what it costs. Every figure is the same sourced figure shown
 * (with its source) on the cost guide, read from the same data and copy, so
 * the two can never disagree. Only where the cost guide exists (hr, en).
 */
export default function PricingTeaser() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE
  if (!hasServices(lng)) return null

  const fmt = new Intl.NumberFormat(LOCALE_TAGS[lng], { maximumFractionDigits: 0 })

  return (
    <section className="pteaser" aria-labelledby="pteaser-title" data-theme="ink">
      <div className="container">
        <div className="pteaser__band">
          <div className="pteaser__copy">
            <h2 id="pteaser-title" className="pteaser__title">{t('home.priceCtaTitle')}</h2>
            <p className="pteaser__text">{t('home.priceCtaText')}</p>
            <Link to={pagePath('pricing', lng)} className="btn btn-lg pteaser__btn">
              {t('home.priceCtaBtn')} <FiArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="pteaser__prices">
            <p className="pteaser__from">{t('home.priceCtaFrom')}</p>
            <p className="pteaser__figure">
              {fmt.format(commissionPaid())}
              <span> {CURRENCY_SYMBOL}</span>
            </p>
            <p className="pteaser__label">{t('pricingPage.earnHeroLabel')}</p>
            <ul className="pteaser__list">
              {STATS.map((n) => (
                <li key={n}>
                  <span className="pteaser__stat">{t(`pricingPage.earn${n}Value`)}</span>
                  <span>{t(`pricingPage.earn${n}Title`)}</span>
                </li>
              ))}
            </ul>
            <p className="pteaser__note">{t('home.priceCtaNote')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
