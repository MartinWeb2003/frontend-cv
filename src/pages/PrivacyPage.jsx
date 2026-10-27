import { useTranslation } from 'react-i18next'
import { PHOTOS } from '../data/photos'
import PageHeader from '../components/PageHeader'
import usePageMeta from '../seo/usePageMeta'
import {
  ANALYTICS,
  DEFAULT_LOCALE,
  LOCALES,
  PERSON,
  pagePath,
  pageUrl,
  pathForLocale,
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
    <article className="pagewrap staticpage">
      <div className="container staticpage__inner staticpage__inner--narrow">
        <PageHeader
          crumbs={[
            { label: t('projectPage.crumbHome'), href: pathForLocale(lng) },
            { label: t('privacyPage.label') },
          ]}
          title={t('privacyPage.title')}
          lead={t('privacyPage.lead')}
          size="lg"
        />

        <div className="prose staticpage__body">
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

          <section>
            <h2>{t('privacyPage.photosTitle')}</h2>
            <p>{t('privacyPage.photosText')}</p>
            <ul className="credits">
              {Object.entries(PHOTOS).map(([key, p]) => (
                <li key={key}>
                  <a href={p.source} target="_blank" rel="noopener noreferrer license">
                    {p.place ?? key}
                  </a>
                  {`: ${p.author}, ${p.license}`}
                </li>
              ))}
            </ul>
          </section>

          <p className="staticpage__note">
            {t('privacyPage.contactLine')}{' '}
            <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
          </p>
        </div>
      </div>
    </article>
  )
}
