import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { imgAttrs } from '../data/imageAttrs'
import { SERVICES, serviceCover } from '../data/services'
import { hasServices } from '../routes'
import { DEFAULT_LOCALE, LOCALES, pagePath, servicePath } from '../seo/siteConfig'
import './Services.css'

/*
 * Driven by src/data/services.js so the home page can never advertise
 * something the site does not sell. Linked where the service pages exist
 * (hr, en), plain cards where they do not (de, pl). Static by design: the
 * page has spent its motion budget on the hero, manifesto and showcase.
 */
export default function Services() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE
  const linked = hasServices(lng)

  return (
    <section id="about" className="services section" aria-labelledby="services-title">
      <div className="container">
        <div className="services__head">
          <div>
            <h2 id="services-title" className="h2">{t('about.heading')}</h2>
          </div>
          <p className="lead services__intro">{t('about.para1')}</p>
        </div>

        <ol className="services__grid">
          {SERVICES.map((s) => {
            const inner = (
              <>
                <span className="services__media">
                  <img alt="" {...imgAttrs(serviceCover(s.id), '(max-width: 1000px) 90vw, 30vw')} loading="lazy" decoding="async" />
                </span>
                <span className="services__num">{s.num}</span>
                <h3 className="h3 services__name">{t(`services.${s.key}Name`)}</h3>
                <p className="services__lead">{t(`services.${s.key}Lead`)}</p>
                <ul className="services__stack">
                  {s.stack.slice(0, 3).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                {linked && (
                  <span className="services__go" aria-hidden="true">
                    <FiArrowUpRight size={20} />
                  </span>
                )}
              </>
            )
            return (
              <li key={s.id} className="services__item">
                {linked ? (
                  <Link to={servicePath(lng, s.slug[lng])} className="services__card">
                    {inner}
                  </Link>
                ) : (
                  <div className="services__card">{inner}</div>
                )}
              </li>
            )
          })}
        </ol>

        {linked && (
          <p className="services__foot">
            {t('home.pricingNote')}{' '}
            <Link to={pagePath('pricing', lng)} className="link-draw accent">
              {t('pricingPage.label')} <FiArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
