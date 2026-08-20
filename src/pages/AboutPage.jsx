import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiDownload, FiArrowRight } from 'react-icons/fi'
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

export default function AboutPage() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  usePageMeta({
    title: t('aboutPage.metaTitle'),
    description: t('aboutPage.metaDesc'),
    canonical: pageUrl('about', lng),
    alternates: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_ORIGIN}${pagePath('about', l)}`])),
    image: PERSON.photo || undefined,
  })

  const paragraphs = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].map((k) => t(`aboutPage.${k}`))
  const facts = ['fact1', 'fact2', 'fact3', 'fact4'].map((k) => t(`aboutPage.${k}`))

  return (
    <article className="staticpage">
      <div className="container staticpage__inner">
        <span className="section-label">{t('aboutPage.label')}</span>
        <h1 className="staticpage__title">{t('aboutPage.title')}</h1>
        <p className="staticpage__lead">{t('aboutPage.lead')}</p>

        <div className="staticpage__split">
          <div className="staticpage__body">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}

            <h2>{t('aboutPage.howTitle')}</h2>
            <p>{t('aboutPage.how')}</p>

            <h2>{t('aboutPage.factsTitle')}</h2>
            <ul className="staticpage__facts">
              {facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <aside className="staticpage__aside">
            {PERSON.photo && (
              <img
                className="staticpage__photo"
                src={PERSON.photo}
                alt={`${PERSON.name}, ${t('aboutPage.label')}`}
                width="640"
                height="800"
                loading="eager"
                decoding="async"
              />
            )}

            <ul className="staticpage__contactlist">
              <li>
                <a href={`mailto:${PERSON.email}`}>
                  <FiMail size={14} /> {PERSON.email}
                </a>
              </li>
              {PERSON.phone && (
                <li>
                  <a href={phoneHref()}>
                    <FiPhone size={14} /> {PERSON.phone}
                  </a>
                </li>
              )}
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
              <li>
                <a href={cvPath(lng)} download={cvFilename(lng)}>
                  <FiDownload size={14} /> {t('contact.cvBtn')}
                </a>
              </li>
            </ul>

            <div className="staticpage__cta">
              <Link to={projectsIndexPath(lng)} className="btn btn-outline">
                {t('projectPage.crumbProjects')} <FiArrowRight size={13} />
              </Link>
              <Link to={pagePath('contact', lng)} className="btn btn-primary">
                {t('aboutPage.ctaContact')}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
