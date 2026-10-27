import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiArrowRight } from 'react-icons/fi'
import { HOME_PROJECTS } from '../data/projects'
import { imgAttrs } from '../data/imageAttrs'
import { DEFAULT_LOCALE, LOCALES, projectPath, projectsIndexPath } from '../seo/siteConfig'
import './WorkIndex.css'

/** "sottomonte.hr" from "https://www.sottomonte.hr". */
const host = (url) => new URL(url).hostname.replace(/^www\./, '')

/*
 * The highlighted projects, one row each: the hero screenshot of the live
 * site on the left, the facts on the right. The full list is the projects
 * index, linked below. Static apart from hover.
 */
export default function WorkIndex() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  return (
    <section id="projects" className="workindex section" aria-labelledby="workindex-title">
      <div className="container">
        <div className="workindex__head">
          <h2 id="workindex-title" className="h2">{t('home.indexTitle')}</h2>
          <p className="lead">{t('projects.sectionIntro')}</p>
        </div>

        <ol className="workrows">
          {HOME_PROJECTS.map((p, i) => (
            <li key={p.slug} className="workrow">
              <Link to={projectPath(lng, p.slug)} className="workrow__media" tabIndex={-1} aria-hidden="true">
                <img
                  alt=""
                  {...imgAttrs(p.images[0], '(max-width: 900px) 92vw, 56vw')}
                  loading="lazy"
                  decoding="async"
                />
              </Link>

              <div className="workrow__info">
                <p className="workrow__meta">
                  <span className="workrow__num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{p.year}</span>
                </p>
                <h3 className="workrow__title">
                  <Link to={projectPath(lng, p.slug)}>{p.title}</Link>
                </h3>
                <p className="workrow__sub">{t(`projects.${p.key}Subtitle`)}</p>
                <p className="workrow__desc">{t(`projects.${p.key}Desc`)}</p>
                <ul className="workrow__tags">
                  {p.stack.slice(0, 4).map((s) => (
                    <li key={s} className="tag">{s}</li>
                  ))}
                </ul>
                <div className="workrow__actions">
                  <Link to={projectPath(lng, p.slug)} className="btn btn-primary">
                    {t('home.caseStudy')} <FiArrowRight size={16} aria-hidden="true" />
                  </Link>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="link-draw">
                      {host(p.liveUrl)} <FiArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <Link to={projectsIndexPath(lng)} className="btn btn-ink btn-lg workindex__all">
          {t('projects.viewAll')} <FiArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
