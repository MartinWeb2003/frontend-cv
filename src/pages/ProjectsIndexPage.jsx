import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { PROJECTS, PLACEHOLDER_BG } from '../data/projects'
import IMAGE_META from '../data/imageMeta.json'
import DrawTitle from '../bits/DrawTitle'
import usePageMeta from '../seo/usePageMeta'
import {
  DEFAULT_LOCALE,
  LOCALES,
  SITE_ORIGIN,
  projectPath,
  projectsIndexPath,
} from '../seo/siteConfig'
import './ProjectsIndexPage.css'

const imgDim = (src) => IMAGE_META[src] ?? {}

export default function ProjectsIndexPage() {
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE

  usePageMeta({
    title: t('projectPage.indexMetaTitle'),
    description: t('projectPage.indexMetaDesc'),
    canonical: `${SITE_ORIGIN}${projectsIndexPath(lng)}`,
    alternates: Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_ORIGIN}${projectsIndexPath(l)}`]),
    ),
  })

  return (
    <div className="pindex">
      <div className="container pindex__inner">
        <span className="section-label">{t('projectPage.crumbProjects')}</span>
        <DrawTitle
          as="h1"
          className="pindex__title"
          lines={[{ text: t('projectPage.indexTitle'), fill: true }]}
        />
        <p className="pindex__intro">{t('projectPage.indexIntro')}</p>

        <ul className="pindex__grid">
          {PROJECTS.map((project) => (
            <li key={project.slug} className="pindex__item">
              <Link
                to={projectPath(lng, project.slug)}
                className="pindex__card"
                style={{ background: PLACEHOLDER_BG[project.id] }}
              >
                <span className="pindex__media">
                  <img
                    src={project.images[0]}
                    alt={`${project.title}, ${t(`projects.${project.key}Subtitle`)}`}
                    {...imgDim(project.images[0])}
                    loading="lazy"
                    decoding="async"
                    className="pindex__img"
                  />
                </span>
                <span className="pindex__body">
                  <span className="pindex__meta">
                    <span className="pindex__num">{project.num}</span>
                    <span className="pindex__year">{project.year}</span>
                  </span>
                  <h2 className="pindex__card-title">{project.title}</h2>
                  <span className="pindex__sub">{t(`projects.${project.key}Subtitle`)}</span>
                  <span className="pindex__tags">
                    {project.stack.slice(0, 3).map((s) => (
                      <span key={s} className="tag">{s}</span>
                    ))}
                  </span>
                  <span className="pindex__cta">
                    {t('projects.liveBtn')} <FiArrowUpRight size={14} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
