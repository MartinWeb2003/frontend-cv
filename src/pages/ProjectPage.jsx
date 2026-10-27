import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { FiExternalLink, FiGithub, FiArrowUpRight, FiCheck } from 'react-icons/fi'
import { PROJECTS, projectBySlug } from '../data/projects'
import { imgAttrs, SIZES } from '../data/imageAttrs'
import PageHeader from '../components/PageHeader'
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

/** Hostname for the browser-frame address bar, e.g. "sottomonte.hr". */
const host = (url) => (url ? new URL(url).hostname.replace(/^www\./, '') : '')

export default function ProjectPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const lng = LOCALES.includes(i18n.language) ? i18n.language : DEFAULT_LOCALE
  const project = projectBySlug(slug)
  const heroRef = useRef(null)
  const reduce = useReducedMotion()

  /*
   * The page's scroll moment: the screenshot frame grows from inset to full
   * container width as it scrolls into place. Transform only.
   */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'start 0.25'] })
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.9, 1])

  if (!project) return <NotFoundPage />

  const k = project.key
  const tp = (field) => t(`projects.${k}${field}`)

  const index = PROJECTS.findIndex((p) => p.slug === project.slug)
  const next = PROJECTS[(index + 1) % PROJECTS.length]

  const features = ['F1', 'F2', 'F3', 'F4'].map(tp)

  return (
    <>
      <ProjectMeta project={project} lng={lng} title={tp('MetaTitle')} description={tp('MetaDesc')} />

      <article className="pagewrap pdetail">
        <div className="container">
          <PageHeader
            crumbs={[
              { label: t('projectPage.crumbHome'), href: pathForLocale(lng) },
              { label: t('projectPage.crumbProjects'), href: projectsIndexPath(lng) },
              { label: project.title },
            ]}
            title={project.title}
            lead={tp('Subtitle')}
          >
            <div className="pdetail__bar">
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
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <FiExternalLink size={15} aria-hidden="true" /> {t('projectPage.visitLive')}
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    <FiGithub size={15} aria-hidden="true" /> GitHub
                  </a>
                )}
              </div>
            </div>
          </PageHeader>

          <motion.figure ref={heroRef} className="pdetail__frame" style={{ scale }}>
            <div className="pdetail__chrome" aria-hidden="true">
              <span /><span /><span />
              {project.liveUrl && <span className="pdetail__url">{host(project.liveUrl)}</span>}
            </div>
            <img
              alt={`${project.title}, ${tp('Subtitle')}`}
              {...imgAttrs(project.images[0], SIZES.hero)}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </motion.figure>

          <div className="pdetail__layout">
            <p className="pdetail__lead">{tp('Intro')}</p>

            <div className="pdetail__sections">
              <section className="pdetail__section">
                <h2>{t('projectPage.challengeTitle')}</h2>
                <p>{tp('Challenge')}</p>
              </section>
              <section className="pdetail__section">
                <h2>{t('projectPage.approachTitle')}</h2>
                <p>{tp('Approach')}</p>
              </section>
              <section className="pdetail__section">
                <h2>{t('projectPage.deliveredTitle')}</h2>
                <p>{tp('Delivered')}</p>
              </section>
            </div>
          </div>

          <section className="psection">
            <h2 className="psection__title">{t('projectPage.featuresTitle')}</h2>
            <ul className="pdetail__features">
              {features.map((f, i) => (
                <li key={f}>
                  <span className="pdetail__feature-num">{String(i + 1).padStart(2, '0')}</span>
                  <FiCheck size={18} aria-hidden="true" />
                  <p>{f}</p>
                </li>
              ))}
            </ul>
          </section>

          {project.images.length > 1 && (
            <section className="psection">
              <h2 className="psection__title">{t('projectPage.galleryTitle')}</h2>
              <div className="pdetail__gallery">
                {project.images.slice(1).map((src, i) => (
                  <img
                    key={src}
                    alt={`${project.title}, ${t('projects.screenshotAlt', { n: i + 2 })}`}
                    {...imgAttrs(src, SIZES.projectRow)}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </section>
          )}

          <Link to={projectPath(lng, next.slug)} className="pdetail__next" data-theme="ink">
            <span className="pdetail__next-text">
              <span className="pdetail__next-label">{t('projectPage.nextProject')}</span>
              <span className="pdetail__next-title">{next.title}</span>
              <span className="pdetail__next-sub">{t(`projects.${next.key}Subtitle`)}</span>
            </span>
            <span className="pdetail__next-media">
              <img alt="" {...imgAttrs(next.images[0], SIZES.projectRow)} loading="lazy" decoding="async" />
            </span>
            <span className="pdetail__next-go" aria-hidden="true">
              <FiArrowUpRight size={26} />
            </span>
          </Link>

          <p className="pdetail__back">
            <Link to={projectsIndexPath(lng)} className="link-draw">
              {t('projectPage.backToProjects')}
            </Link>
          </p>
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
