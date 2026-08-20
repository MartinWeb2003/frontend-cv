import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi'
import usePageMeta from '../seo/usePageMeta'
import {
  cvFilename,
  cvPath,
  DEFAULT_LOCALE,
  LOCALES,
  PERSON,
  phoneHref,
  pagePath,
  pageUrl,
  projectsIndexPath,
  SITE_ORIGIN,
} from '../seo/siteConfig'
import './StaticPage.css'

export default function ContactPage() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  usePageMeta({
    title: t('contactPage.metaTitle'),
    description: t('contactPage.metaDesc'),
    canonical: pageUrl('contact', lng),
    alternates: Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_ORIGIN}${pagePath('contact', l)}`]),
    ),
  })

  const steps = ['step1', 'step2', 'step3'].map((k) => t(`contactPage.${k}`))

  return (
    <article className="staticpage">
      <div className="container staticpage__inner">
        <span className="section-label">{t('contactPage.label')}</span>
        <h1 className="staticpage__title">{t('contactPage.title')}</h1>
        <p className="staticpage__lead">{t('contactPage.lead')}</p>

        <div className="staticpage__split">
          <div className="staticpage__body">
            <h2>{t('contactPage.directTitle')}</h2>
            <ul className="staticpage__contactlist staticpage__contactlist--large">
              <li>
                <a href={`mailto:${PERSON.email}`}>
                  <FiMail size={16} /> {PERSON.email}
                </a>
              </li>
              {PERSON.phone ? (
                <li>
                  <a href={phoneHref()}>
                    <FiPhone size={16} /> {PERSON.phone}
                  </a>
                </li>
              ) : null}
              <li className="staticpage__plain">
                <FiMapPin size={16} /> {t('contactPage.location')}
              </li>
            </ul>

            <h2>{t('contactPage.expectTitle')}</h2>
            <ol className="staticpage__steps">
              {steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>

            <h2>{t('contactPage.briefTitle')}</h2>
            <p>{t('contactPage.brief')}</p>
            <ul className="staticpage__facts">
              {['brief1', 'brief2', 'brief3', 'brief4'].map((k) => (
                <li key={k}>{t(`contactPage.${k}`)}</li>
              ))}
            </ul>
          </div>

          <aside className="staticpage__aside">
            <div className="staticpage__cta staticpage__cta--stack">
              <a href={`mailto:${PERSON.email}`} className="btn btn-primary">
                <FiMail size={14} /> {t('contact.emailBtn')}
              </a>
              <a href={cvPath(lng)} download={cvFilename(lng)} className="btn btn-outline">
                <FiDownload size={14} /> {t('contact.cvBtn')}
              </a>
            </div>

            <ul className="staticpage__contactlist">
              {PERSON.github && (
                <li>
                  <a href={PERSON.github} target="_blank" rel="noopener noreferrer me">
                    <FiGithub size={14} /> GitHub
                  </a>
                </li>
              )}
              {PERSON.linkedin && (
                <li>
                  <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer me">
                    <FiLinkedin size={14} /> LinkedIn
                  </a>
                </li>
              )}
            </ul>

            <p className="staticpage__note">
              <Link to={projectsIndexPath(lng)}>{t('contactPage.seeWork')}</Link>
            </p>
          </aside>
        </div>
      </div>
    </article>
  )
}
