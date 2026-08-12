import { useTranslation } from 'react-i18next'
import usePageMeta from '../seo/usePageMeta'
import {
  ANALYTICS,
  DEFAULT_LOCALE,
  LOCALES,
  PERSON,
  pagePath,
  pageUrl,
  SITE_ORIGIN,
} from '../seo/siteConfig'
import './StaticPage.css'

/** Sections rendered in order; each is a heading + one body paragraph. */
const SECTIONS = ['controller', 'data', 'analytics', 'hosting', 'rights', 'retention', 'contact']

export default function PrivacyPage() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  usePageMeta({
    title: t('privacyPage.metaTitle'),
    description: t('privacyPage.metaDesc'),
    canonical: pageUrl('privacy', lng),
    alternates: Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_ORIGIN}${pagePath('privacy', l)}`]),
    ),
  })

  const usesAnalytics = Boolean(ANALYTICS.plausibleDomain || ANALYTICS.umamiSrc)

  return (
    <article className="staticpage">
      <div className="container staticpage__inner staticpage__inner--narrow">
        <span className="section-label">{t('privacyPage.label')}</span>
        <h1 className="staticpage__title staticpage__title--sm">{t('privacyPage.title')}</h1>
        <p className="staticpage__lead">{t('privacyPage.lead')}</p>

        <div className="staticpage__body">
          {SECTIONS.map((key) => (
            <section key={key}>
              <h2>{t(`privacyPage.${key}Title`)}</h2>
              <p>
                {key === 'analytics'
                  ? t(usesAnalytics ? 'privacyPage.analyticsOn' : 'privacyPage.analyticsOff')
                  : t(`privacyPage.${key}`)}
              </p>
            </section>
          ))}

          <p className="staticpage__note">
            {t('privacyPage.contactLine')}{' '}
            <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
          </p>
        </div>
      </div>
    </article>
  )
}
