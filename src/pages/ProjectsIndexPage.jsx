import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { PROJECTS } from '../data/projects'
import { imgAttrs, SIZES } from '../data/imageAttrs'
import PageHeader from '../components/PageHeader'
import usePageMeta from '../seo/usePageMeta'
import {
  DEFAULT_LOCALE,
  LOCALES,
  SITE_ORIGIN,
  pathForLocale,
  projectPath,
  projectsIndexPath,
} from '../seo/siteConfig'
import './ProjectsIndexPage.css'

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
    <div className="pagewrap pindex">
      <div className="container">
        <PageHeader
          crumbs={[
            { label: t('projectPage.crumbHome'), href: pathForLocale(lng) },
            { label: t('projectPage.crumbProjects') },
          ]}
          title={t('projectPage.indexTitle')}
          lead={t('projectPage.indexIntro')}
        />

        <ul className="pindex__grid">
          {PROJECTS.map((project, i) => (
            <li key={project.slug} className={`pindex__item${i === 0 ? ' pindex__item--wide' : ''}`}>
              <Link to={projectPath(lng, project.slug)} className="pindex__card">
                <span className="pindex__media">
                  <img
                    alt={`${project.title}, ${t(`projects.${project.key}Subtitle`)}`}
                    {...imgAttrs(project.images[0], i === 0 ? SIZES.hero : SIZES.projectRow)}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </span>
                <span className="pindex__body">
                  <span className="pindex__meta">
                    <span>{project.num}</span>
                    <span>{project.year}</span>
                  </span>
                  <h2 className="pindex__title">{project.title}</h2>
                  <span className="pindex__sub">{t(`projects.${project.key}Subtitle`)}</span>
                  <span className="pindex__foot">
                    <span className="pindex__tags">
                      {project.stack.slice(0, 3).map((s) => (
                        <span key={s} className="tag">{s}</span>
                      ))}
                    </span>
                    <span className="pindex__go" aria-hidden="true">
                      <FiArrowUpRight size={20} />
                    </span>
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
