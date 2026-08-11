import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { FiExternalLink, FiGithub, FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi'
import { PROJECTS, projectBySlug, PLACEHOLDER_BG } from '../data/projects'
import IMAGE_META from '../data/imageMeta.json'
import usePageMeta from '../seo/usePageMeta'
import NotFoundPage from './NotFoundPage'
import {
  DEFAULT_LOCALE,
  LOCALES,
  SITE_ORIGIN,
  projectPath,
  projectUrl,
  projectsIndexPath,
  pathForLocale,
} from '../seo/siteConfig'
import './ProjectPage.css'

const imgDim = (src) => IMAGE_META[src] ?? {}

export default function ProjectPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE
  const project = projectBySlug(slug)

  if (!project) return <NotFoundPage />

  const k = project.key
  const tp = (field) => t(`projects.${k}${field}`)

  const index = PROJECTS.findIndex((p) => p.slug === project.slug)
  const next = PROJECTS[(index + 1) % PROJECTS.length]

  const features = ['F1', 'F2', 'F3', 'F4'].map(tp)

  return (
    <>
      <ProjectMeta project={project} lng={lng} title={tp('MetaTitle')} description={tp('MetaDesc')} />

      <article className="pdetail">
        <div className="container">
          <nav className="pdetail__crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to={pathForLocale(lng)}>{t('projectPage.crumbHome')}</Link>
              </li>
              <li>
                <Link to={projectsIndexPath(lng)}>{t('projectPage.crumbProjects')}</Link>
              </li>
              <li aria-current="page">{project.title}</li>
            </ol>
          </nav>

          <header className="pdetail__header">
            <span className="pdetail__num">{project.num}</span>
            <h1 className="pdetail__title">{project.title}</h1>
            <p className="pdetail__sub">{tp('Subtitle')}</p>

            <dl className="pdetail__facts">
              <div>
                <dt>{t('projectPage.yearLabel')}</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>{t('projectPage.roleLabel')}</dt>
                <dd>{t('projectPage.roleValue')}</dd>
              </div>
              <div>
                <dt>{t('projectPage.stackTitle')}</dt>
                <dd>{project.stack.join(', ')}</dd>
              </div>
            </dl>

            <div className="pdetail__actions">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <FiExternalLink size={14} /> {t('projectPage.visitLive')}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FiGithub size={14} /> GitHub
                </a>
              )}
            </div>
          </header>

          <figure
            className="pdetail__hero"
            style={{ background: PLACEHOLDER_BG[project.id] }}
          >
            <img
              src={project.images[0]}
              alt={`${project.title}, ${tp('Subtitle')}`}
              {...imgDim(project.images[0])}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </figure>

          <div className="pdetail__body">
            <p className="pdetail__lead">{tp('Intro')}</p>

            <section className="pdetail__section">
              <h2>{t('projectPage.challengeTitle')}</h2>
              <p>{tp('Challenge')}</p>
            </section>

            <section className="pdetail__section">
              <h2>{t('projectPage.approachTitle')}</h2>
              <p>{tp('Approach')}</p>
            </section>

            <section className="pdetail__section">
              <h2>{t('projectPage.featuresTitle')}</h2>
              <ul className="pdetail__features">
                {features.map((f) => (
                  <li key={f}>
                    <FiCheck size={15} aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="pdetail__section">
              <h2>{t('projectPage.stackTitle')}</h2>
              <div className="pdetail__tags">
                {project.stack.map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </section>

            <section className="pdetail__section">
              <h2>{t('projectPage.deliveredTitle')}</h2>
              <p>{tp('Delivered')}</p>
            </section>
          </div>

          {project.images.length > 1 && (
            <section className="pdetail__section pdetail__gallery-wrap">
              <h2>{t('projectPage.galleryTitle')}</h2>
              <div className="pdetail__gallery">
                {project.images.slice(1).map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${project.title}, ${t('projects.screenshotAlt', { n: i + 2 })}`}
                    {...imgDim(src)}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </section>
          )}

          <nav className="pdetail__pager">
            <Link to={projectsIndexPath(lng)} className="pdetail__pager-link">
              <FiArrowLeft size={14} /> {t('projectPage.backToProjects')}
            </Link>
            <Link to={projectPath(lng, next.slug)} className="pdetail__pager-link pdetail__pager-link--next">
              {t('projectPage.nextProject')}: {next.title} <FiArrowRight size={14} />
            </Link>
          </nav>
        </div>
      </article>
    </>
  )
}

/** Separated so the hook order stays stable when the slug is unknown. */
function ProjectMeta({ project, lng, title, description }) {
  usePageMeta({
    title,
    description,
    canonical: projectUrl(lng, project.slug),
    alternates: Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_ORIGIN}${projectPath(l, project.slug)}`]),
    ),
    image: project.images[0],
    imageAlt: project.title,
  })
  return null
}
